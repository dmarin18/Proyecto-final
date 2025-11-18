import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs"; // Para encriptar contraseñas
import jwt from "jsonwebtoken"; // Para crear tokens de sesión
// ⚠️ IMPORTANTE: Añadir la extensión .js aquí
import { connectDB } from "./db.js";
import User from "./User.js";

// --- Configuración Inicial ---
const app = express();
const PORT = 5001; // Puerto del Backend
const JWT_SECRET = "este-es-un-secreto-muy-secreto-y-largo"; // ⚠️ ¡Cámbialo!

// --- Middlewares ---
app.use(cors()); // Permite que React (en puerto 3000) hable con este servidor
app.use(express.json()); // Permite al servidor entender JSON

// --- RUTAS DE AUTENTICACIÓN ---

/**
 * RUTA: POST /api/auth/register
 * Propósito: Registrar un nuevo usuario
 */
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validar datos
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    // 2. Verificar si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // 3. Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Crear y guardar el nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    console.log("Nuevo usuario registrado:", newUser.email);
    res.status(201).json({ message: "¡Usuario registrado exitosamente!" });
  } catch (error) {
    console.error("Error en /register:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

/**
 * RUTA: POST /api/auth/login
 * Propósito: Iniciar sesión
 */
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validar datos
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son requeridos" });
    }

    // 2. Buscar al usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    // 3. Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    // 4. Crear un Token de Sesión (JWT)
    const token = jwt.sign({ userId: user._id, name: user.name }, JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Usuario ha iniciado sesión:", user.email);

    // 5. Enviar el token al cliente
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token: token,
      userName: user.name,
    });
  } catch (error) {
    console.error("Error en /login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// --- FUNCIÓN DE INICIO ASÍNCRONO (Estructura de inicio robusta) ---

const startServer = async () => {
  try {
    // 1. Conectar a la base de datos (Esperamos que se complete)
    await connectDB();

    // 2. Iniciar el servidor SOLO después de la conexión exitosa
    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    // Si la conexión falla (ej: MongoDB apagado), el error se captura aquí.
    console.error("Fallo al iniciar el servidor o la BD:", error);
    process.exit(1); // Detiene la aplicación si hay un error crítico
  }
};

// --- Llamada a la función de inicio ---
startServer();
