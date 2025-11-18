import React, { useState, useEffect } from "react";
import { AppView } from "../types";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

// Componente principal de la aplicación.
// Gestiona la vista actual y renderiza la página correspondiente.
const App: React.FC = () => {
  // Estado para controlar qué vista se muestra: 'landing', 'login', o 'register'.
  const [view, setView] = useState<AppView>("landing");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Efecto para animar la entrada de la aplicación.
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Función para renderizar el componente de la vista actual.
  const renderView = () => {
    switch (view) {
      case "login":
        return <LoginPage setView={setView} />;
      case "register":
        return <RegisterPage setView={setView} />;
      case "landing":
      default:
        return <LandingPage setView={setView} />;
    }
  };

  return (
    <div
      className={`transition-opacity duration-500 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {renderView()}
    </div>
  );
};

export default App;
