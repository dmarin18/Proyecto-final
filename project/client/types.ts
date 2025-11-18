import React from 'react';

// Define los tipos de vistas que la aplicación puede mostrar.
export type AppView = 'landing' | 'login' | 'register';

// Define la estructura de las props para los componentes que necesitan cambiar la vista.
export interface ViewProps {
  setView: (view: AppView) => void;
}

// Define la estructura de un objeto de curso.
export interface Course {
  id: number;
  title: string;
  category: string;
  description: string; // Descripción corta para la tarjeta
  imageUrl: string;
  longDescription: string; // Descripción larga para el modal
  topics: string[]; // Lista de temas para el modal
}