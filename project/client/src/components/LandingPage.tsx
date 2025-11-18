import React, { useState, useEffect } from "react";
import { ViewProps, Course } from "../../types";
import {
  LogoIcon,
  TwitterIcon,
  InstagramIcon,
  FacebookIcon,
  SearchIcon,
  CloseIcon,
} from "./icons";

// --- DATOS DE EJEMPLO PARA CURSOS ---
const sampleCourses: Course[] = [
  {
    id: 1,
    title: "Desarrollo Web Moderno",
    category: "Programación",
    description:
      "Aprende a crear aplicaciones web completas con React, Node.js y más.",
    imageUrl:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    longDescription:
      "Este curso te lleva desde los fundamentos de HTML, CSS y JavaScript hasta la creación de aplicaciones web interactivas y escalables con las tecnologías más demandadas del mercado como React para el frontend y Node.js con Express para el backend.",
    topics: [
      "HTML5 y CSS3 avanzado",
      "JavaScript ES6+",
      "React y State Management",
      "Node.js y Express",
      "Bases de Datos SQL y NoSQL",
      "Despliegue a producción",
    ],
  },
  {
    id: 2,
    title: "Diseño de UI/UX para Móviles",
    category: "Diseño",
    description:
      "Domina los principios del diseño de interfaces para crear apps intuitivas.",
    imageUrl:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    longDescription:
      "Aprende a diseñar experiencias de usuario que enamoren. Cubriremos todo el proceso de diseño, desde la investigación y definición de arquetipos de usuario, hasta el prototipado de alta fidelidad y las pruebas de usabilidad.",
    topics: [
      "Principios de UX y UI",
      "Investigación de Usuarios",
      "Arquitectura de la Información",
      "Diseño de Wireframes y Prototipos",
      "Design Systems",
      "Pruebas con Usuarios",
    ],
  },
  {
    id: 3,
    title: "Marketing en Redes Sociales",
    category: "Marketing",
    description:
      "Crea estrategias efectivas para crecer tu marca en el mundo digital.",
    imageUrl:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    longDescription:
      "Conviértete en un experto en redes sociales. Aprenderás a crear y gestionar campañas publicitarias exitosas en plataformas como Instagram, Facebook y TikTok, analizando métricas para optimizar tus resultados y construir una comunidad sólida.",
    topics: [
      "Estrategia de Contenidos",
      "Facebook e Instagram Ads",
      "TikTok Marketing",
      "Community Management",
      "Analítica y KPIs",
      "Marketing de Influencers",
    ],
  },
  {
    id: 4,
    title: "Python para Ciencia de Datos",
    category: "Programación",
    description:
      "Analiza datos y crea modelos de machine learning con Python, Pandas y Scikit-learn.",
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    longDescription:
      "Sumérgete en el análisis de datos con Python. Este curso práctico te enseñará a manipular grandes volúmenes de datos con Pandas, visualizarlos con Matplotlib y Seaborn, y construir tus primeros modelos predictivos con Scikit-learn.",
    topics: [
      "Introducción a Python y Jupyter",
      "Manipulación de datos con Pandas",
      "Visualización de datos",
      "Conceptos de Machine Learning",
      "Modelos de Regresión y Clasificación",
      "Análisis Exploratorio de Datos",
    ],
  },
  {
    id: 5,
    title: "Fundamentos de Branding",
    category: "Diseño",
    description:
      "Construye una identidad de marca sólida y memorable desde cero.",
    imageUrl:
      "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    longDescription:
      "Una marca es más que un logo. En este curso descubrirás cómo construir una identidad de marca coherente y potente, definiendo la misión, visión, valores, tono de voz y una identidad visual que conecte con tu audiencia objetivo.",
    topics: [
      "¿Qué es una marca?",
      "Arquetipos de Marca",
      "Estrategia de Posicionamiento",
      "Identidad Verbal y Visual",
      "Creación de un Brand Book",
      "Gestión de Marca",
    ],
  },
  {
    id: 6,
    title: "SEO y SEM: Guía Completa",
    category: "Marketing",
    description:
      "Posiciona tu sitio web en los primeros lugares de Google y gestiona campañas de pago.",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    longDescription:
      "Domina las dos caras del marketing en buscadores. Aprenderás a optimizar tu sitio web para el posicionamiento orgánico (SEO) y a crear y gestionar campañas de publicidad de pago (SEM) en Google Ads para atraer tráfico cualificado.",
    topics: [
      "Investigación de Palabras Clave",
      "SEO On-Page y Técnico",
      "Link Building",
      "Estructura de campañas en Google Ads",
      "Optimización de Landing Pages",
      "Medición y Reporte de Resultados",
    ],
  },
];

// --- COMPONENTES DE LA PÁGINA DE INICIO ---

// Componente del Header (Barra de Navegación)
const Header = ({ setView }: ViewProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="relative flex items-center justify-between h-16">
        {/* Logo a la izquierda */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <LogoIcon className="h-50 w-60 relative top-1 left-[70px] text-brand-primary" />
         
        </div>

        {/* Navegación y acciones centradas en una "píldora" de cristal - VISTA DESKTOP */}
        <nav className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-1 bg-white/60 backdrop-blur-xl rounded-full shadow-lg border border-white/20 p-1.5">
            <button
              onClick={() => scrollToSection("inicio")}
              className="px-4 py-2 rounded-full text-sm text-gray-600 hover:bg-white hover:text-brand-primary transition-all duration-300 font-medium"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("cursos")}
              className="px-4 py-2 rounded-full text-sm text-gray-600 hover:bg-white hover:text-brand-primary transition-all duration-300 font-medium"
            >
              Cursos
            </button>
            <button
              onClick={() => scrollToSection("nosotros")}
              className="px-4 py-2 rounded-full text-sm text-gray-600 hover:bg-white hover:text-brand-primary transition-all duration-300 font-medium"
            >
              Nosotros
            </button>

            <div className="w-px h-5 bg-gray-300/80 mx-2"></div>

            <button
              onClick={() => setView("login")}
              className="px-4 py-2 rounded-full text-sm text-gray-600 hover:bg-white hover:text-brand-primary transition-all duration-300 font-medium"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setView("register")}
              className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-full text-sm shadow-sm hover:bg-orange-700 transition duration-150 ease-in-out"
            >
              Registrarse
            </button>
          </div>
        </nav>

        {/* Botones a la derecha - VISTA MÓVIL/TABLET (se ocultan en desktop) */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setView("login")}
            className="hidden sm:block text-gray-600 hover:text-brand-primary transition duration-150 ease-in-out font-medium"
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setView("register")}
            className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            Registrarse
          </button>
        </div>
      </div>
    </header>
  );
};

// Componente de la sección principal (Hero)
const HeroSection = ({ setView }: ViewProps) => (
  <section id="inicio" className="text-center py-20 md:py-32 px-4">
    <div
      className="max-w-4xl mx-auto animate-fadeIn"
      style={{ animationDelay: "0.2s" }}
    >
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
        Explora nuevos cursos,{" "}
        <span className="text-brand-primary">aprende a tu ritmo</span>, y juega
        mientras creces
      </h1>
      <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        Porque estudiar no tiene que ser aburrido
      </p>
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">¿Aún no tienes cuenta?</p>
          <button
            onClick={() => setView("register")}
            className="bg-brand-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-orange-700 transform hover:scale-105 transition-all duration-300"
          >
            Registrarse
          </button>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">¿Ya estás registrado?</p>
          <button
            onClick={() => setView("login")}
            className="bg-white text-brand-primary font-bold py-3 px-8 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transform hover:scale-105 transition-all duration-300"
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  </section>
);

// Componente para una tarjeta de curso individual
const CourseCard = ({
  course,
  onViewMore,
}: {
  course: Course;
  onViewMore: (course: Course) => void;
}) => {
  const { title, description, imageUrl, category } = course;

  const categoryColors: { [key: string]: string } = {
    Programación: "bg-blue-100 text-blue-800",
    Diseño: "bg-purple-100 text-purple-800",
    Marketing: "bg-green-100 text-green-800",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group flex flex-col">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 self-start ${
            categoryColors[category] || "bg-gray-100 text-gray-800"
          }`}
        >
          {category}
        </span>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm flex-grow">{description}</p>
        <button
          onClick={() => onViewMore(course)}
          className="mt-4 w-full bg-white text-brand-primary font-semibold py-2 px-4 rounded-lg border-2 border-brand-primary hover:bg-brand-primary hover:text-white transition-colors duration-300"
        >
          Ver más
        </button>
      </div>
    </div>
  );
};

// Componente de la sección de cursos
const CoursesSection = ({
  onViewMore,
}: {
  onViewMore: (course: Course) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredCourses, setFilteredCourses] =
    useState<Course[]>(sampleCourses);

  const categories = ["All", ...new Set(sampleCourses.map((c) => c.category))];

  useEffect(() => {
    let courses = sampleCourses;

    if (selectedCategory !== "All") {
      courses = courses.filter(
        (course) => course.category === selectedCategory
      );
    }

    if (searchTerm) {
      courses = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCourses(courses);
  }, [searchTerm, selectedCategory]);

  return (
    <section id="cursos" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Nuestros Cursos Populares
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Sumérgete en el conocimiento con nuestros cursos mejor valorados.
          </p>
          <div className="mt-4 inline-block w-24 h-1 bg-brand-primary rounded"></div>
        </div>

        {/* Filtros de Cursos */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 justify-center items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-brand-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Cursos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CourseCard course={course} onViewMore={onViewMore} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No se encontraron cursos con esos criterios.
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 italic">Más cursos próximamente...</p>
        </div>
      </div>
    </section>
  );
};

// Componente del Modal de Detalles del Curso
const CourseModal = ({
  course,
  onClose,
  setView,
}: {
  course: Course;
  onClose: () => void;
  setView: ViewProps["setView"];
}) => {
  if (!course) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()} // Evita que el clic se propague al fondo
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10"
          aria-label="Cerrar modal"
        >
          <CloseIcon className="w-8 h-8" />
        </button>

        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-64 object-cover rounded-t-2xl"
        />

        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {course.title}
          </h2>
          <p className="text-gray-600 mb-6">{course.longDescription}</p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Contenido del curso
          </h3>
          <ul className="space-y-2 list-disc list-inside text-gray-700">
            {course.topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <h4 className="text-lg font-semibold text-gray-800">
              ¿Listo para empezar?
            </h4>
            <p className="text-gray-500 mt-1 mb-4">
              Suscríbete para acceder al curso completo y a todos nuestros
              recursos.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setView("register")}
                className="bg-brand-primary text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transform hover:scale-105 transition-all"
              >
                Registrarse para empezar
              </button>
              <button
                onClick={() => setView("login")}
                className="bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-all"
              >
                Ya tengo una cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de la sección "Nosotros"
const AboutSection = () => (
  <section id="nosotros" className="py-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
        Nuestra Misión
      </h2>
      <p className="mt-4 text-lg text-gray-600">
        Creemos que el aprendizaje debe ser una aventura emocionante. Nuestra
        misión es transformar la educación combinando contenido de alta calidad
        con elementos de juego, haciendo que cada lección sea memorable y
        divertida.
      </p>
      <div className="mt-4 inline-block w-24 h-1 bg-brand-primary rounded"></div>
      <div className="text-center mt-12">
        <p className="text-gray-500 italic">
          Esta sección está en construcción.
        </p>
      </div>
    </div>
  </section>
);

// Componente del Footer
const Footer = () => (
   <footer className="bg-gradient-to-b from-orange-200 to-amber-300 text-gray-800">
    
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo e Info */}
        <div className="flex flex-col items-center md:items-start">
          {/* Aquí el LogoIcon también puede que necesite un cambio de color */}
          <div className="flex items-center gap-2 mb-4">
            <LogoIcon className="h-50 w-60 text-brand-primary" /> {/* Considera si text-brand-primary sigue siendo visible o si quieres cambiarlo aquí */}
          
          </div>
          <p className="text-black-900 text-center md:text-left"> {/* Esto también deberías cambiarlo a un text-gray-200 o similar */}
            Aprendizaje interactivo para la nueva generación.
          </p>
        </div>

        {/* Links */}
        <div className="text-center">
          <h4 className="font-bold mb-4">Links Rápidos</h4>
          <ul className="space-y-2">
            <li>
              <a href="#inicio" className="text-black-400 hover:text-white"> {/* Cambiar a text-gray-200 */}
                Inicio
              </a>
            </li>
            <li>
              <a href="#cursos" className="text-black-400 hover:text-white"> {/* Cambiar a text-gray-200 */}
                Cursos
              </a>
            </li>
            <li>
              <a href="#nosotros" className="text-black-400 hover:text-white"> {/* Cambiar a text-gray-200 */}
                Nosotros
              </a>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="text-center md:text-right">
          <h4 className="font-bold mb-4">Contacto</h4>
          <p className="text-black-400 mb-4">info@eduplay.com</p> {/* Cambiar a text-gray-200 */}
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="#" className="text-black-400 hover:text-white"> {/* Cambiar a text-gray-200 */}
              <TwitterIcon className="h-6 w-6" />
            </a>
            <a href="#" className="text-black-400 hover:text-white"> {/* Cambiar a text-gray-200 */}
              <InstagramIcon className="h-6 w-6" />
            </a>
            <a href="#" className="text-black-400 hover:text-white"> {/* Cambiar a text-gray-200 */}
              <FacebookIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-black-700 pt-8 text-center text-black-500"> {/* Cambiar border-gray-700 a un color que contraste con el nuevo fondo muy oscuro, y text-gray-500 a text-gray-300 o similar */}
        <p>
          &copy; {new Date().getFullYear()} EduPlay. Todos los derechos
          reservados.
        </p>
      </div>
    </div>
  </footer>
);

// --- COMPONENTE PRINCIPAL DE LA LANDING PAGE ---
const LandingPage: React.FC<ViewProps> = ({ setView }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-100 min-h-screen">
      <Header setView={setView} />
      <main>
        <HeroSection setView={setView} />
        <CoursesSection onViewMore={setSelectedCourse} />
        <AboutSection />
      </main>
      <Footer />
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          setView={setView}
        />
      )}
    </div>
  );
};

export default LandingPage;
