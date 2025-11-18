import mongoose from "mongoose";

// Esta es la URL de conexión estándar de MongoDB local.
// 'eduplay_db' es el nombre que le daremos a tu base de datos.
const MONGODB_URI = "mongodb://127.0.0.1:27017/eduplay_db";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB conectado exitosamente (visto desde db.ts) 🚀");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1); // Detiene la app si no se puede conectar
  }
};
