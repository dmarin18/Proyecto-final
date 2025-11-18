import React, { useState, FormEvent } from "react";
import { ViewProps } from "../../types";
import { LogoIcon, CloseIcon, EyeIcon, EyeSlashIcon } from "./icons";
// ⚠️ Nota: Debes instalar Axios si aún no lo has hecho: npm install axios
import axios from "axios"; 

// Componente para la página de Registro
const RegisterPage: React.FC<ViewProps> = ({ setView }) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // Nuevo estado para mostrar/ocultar

  // Función de manejo del registro
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string; // Nuevo
    const email = formData.get("email") as string;
    const confirmEmail = formData.get("confirmEmail") as string; // Nuevo
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string; // Nuevo

    // --- 1. VALIDACIONES DE CAMPOS FRONTEND ---

    // a) Validar coincidencia de Contraseña
    if (password !== confirmPassword) {
      return setError("Las contraseñas no coinciden.");
    }
    
    // b) Validar coincidencia de Correo
    if (email !== confirmEmail) {
      return setError("Los correos electrónicos no coinciden.");
    }
    
    // c) Validar campos llenos (aunque ya tienen 'required', es una buena práctica aquí)
    if (!firstName || !lastName || !email || !password) {
        return setError("Por favor, complete todos los campos.");
    }

    // --- 2. LLAMADA AL BACKEND ---
    try {
      // Nota: El backend solo usa 'name' (nombre completo), así que los combinamos.
      const fullName = `${firstName} ${lastName}`; 
      
      const response = await axios.post("http://localhost:5001/api/auth/register", {
        name: fullName, 
        email: email,
        password: password,
      });

      setSuccess(response.data.message || "¡Registro exitoso!");
      
      // Esperar 2 segundos y cambiar a la vista de login
      setTimeout(() => setView("login"), 2000); 

    } catch (err) {
      // Manejo de errores de Axios (ej: email ya registrado, error de servidor)
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Error al registrar. Inténtelo de nuevo.");
      } else {
        setError("Error de red. Asegúrese de que el servidor esté funcionando.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
        
        <button
          onClick={() => setView("landing")}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Volver a la página de inicio"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <LogoIcon className="h-50 w-60 text-brand-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Crea tu Cuenta</h2>
          <p className="text-gray-500">
            Únete a nuestra comunidad y empieza a aprender hoy.
          </p>
        </div>
        
        {/* --- MENSAJES DE ESTADO --- */}
        {error && (
            <div className="mb-4 p-3 rounded-lg text-sm text-red-700 bg-red-100 border border-red-300">
                {error}
            </div>
        )}
        {success && (
            <div className="mb-4 p-3 rounded-lg text-sm text-green-700 bg-green-100 border border-green-300">
                {success}
            </div>
        )}

        {/* --- FORMULARIO DE REGISTRO --- */}
        <form onSubmit={handleRegister}>
          <div className="space-y-6">
            
            {/* Campos de Nombre y Apellido */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Apellido</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                    placeholder="Tu apellido"
                  />
                </div>
            </div>

            {/* Campo de Correo Electrónico */}
            <div>
              <label htmlFor="email-register" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                id="email-register"
                name="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                placeholder="ejemplo@correo.com"
              />
            </div>
            
            {/* Campo de Confirmación de Correo Electrónico */}
            <div>
              <label htmlFor="confirm-email" className="block text-sm font-medium text-gray-700">Confirmar Correo</label>
              <input
                type="email"
                id="confirm-email"
                name="confirmEmail"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                placeholder="Repita su correo"
              />
            </div>

            {/* Campo de Contraseña */}
            <div>
              <label htmlFor="password-register" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} // Controlado por el estado
                    id="password-register"
                    name="password"
                    autoComplete="new-password"
                    required
                    className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                    placeholder="Crea una contraseña segura"
                  />
                  <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                      {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
              </div>
            </div>
            
            {/* Campo de Confirmación de Contraseña */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
              <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} // Controlado por el estado
                    id="confirm-password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    required
                    className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                    placeholder="Repita la contraseña"
                  />
                  {/* El botón de ocultar/mostrar se aplica a ambos campos */}
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {/* El botón está en el campo superior, aquí solo dejamos espacio si es necesario */}
                  </div>
              </div>
            </div>
            
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
            >
              Crear Cuenta
            </button>
          </div>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <button
            onClick={() => setView("login")}
            className="font-medium text-brand-primary hover:underline"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;