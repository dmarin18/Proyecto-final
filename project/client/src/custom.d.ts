// Declaración de módulos para archivos de imagen (.png, .jpg, .jpeg, .gif)
// Esto le dice a TypeScript que cuando importes uno de estos archivos,
// el valor importado será una cadena (string), que representará la URL de la imagen.
declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}

// Declaración de módulo para archivos SVG
// Esto es útil si en el futuro quieres importar SVGs de dos maneras:
// 1. Como una cadena (src): para usarlos directamente en un <img> tag.
// 2. Como un componente de React (ReactComponent): para usarlos como un componente SVG en línea.
declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
