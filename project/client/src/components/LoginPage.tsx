// src/components/LoginPage.tsx
import React, { useState } from "react"; // <--- 1. Importa useState
import { ViewProps } from "../../types";
import { LogoIcon, CloseIcon } from "./icons";
import axios from "axios"; // <--- 2. Importa axios

const LoginPage: React.FC<ViewProps> = ({ setView }) => {
  // --- 3. Añade estados ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // --- 4. Crea la función handleSubmit ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        {
          email,
          password,
        }
      );

      // 5. Guarda el token y el nombre
      const { token, userName, message } = response.data;
      localStorage.setItem("authToken", token); // Guarda el token en el navegador
      localStorage.setItem("userName", userName); // Guarda el nombre

      console.log(message);
      alert(`¡Bienvenido de nuevo, ${userName}!`);

      // 6. Redirige a la landing page (ahora como usuario logueado)
      setView("landing");
    } catch (err: any) {
      console.error("Error en el login:", err);
      if (err.response && err.response.data) {
        setError(err.response.data.message); // "Credenciales incorrectas"
      } else {
        setError("Ocurrió un error inesperado.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
        <button
          onClick={() => setView("landing")}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Volver a la página de inicio"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <LogoIcon className="h-100 w-100 text-brand-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Bienvenido de Nuevo
          </h2>
          <p className="text-gray-500">
            Inicia sesión para continuar tu aventura de aprendizaje.
          </p>
        </div>

        {/* --- 7. Conecta el formulario --- */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                placeholder="tu@email.com"
                value={email} // <--- Conecta estado
                onChange={(e) => setEmail(e.target.value)} // <--- Actualiza estado
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                placeholder="••••••••"
                value={password} // <--- Conecta estado
                onChange={(e) => setPassword(e.target.value)} // <--- Actualiza estado
              />
            </div>
          </div>

          {/* --- 8. Muestra el error --- */}
          {error && (
            <p className="mt-4 text-center text-sm text-red-600">{error}</p>
          )}

          <div className="mt-8">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
            >
              Ingresar
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={() => setView("register")}
            className="font-medium text-brand-primary hover:underline"
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
