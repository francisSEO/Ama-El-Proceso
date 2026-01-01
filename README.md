# Ama el Proceso

Bienvenido al repositorio de **Ama el Proceso**. Este proyecto es una aplicación web moderna construida con [Astro](https://astro.build), diseñada con una estética "Calm Tech" y enfocada en ofrecer una experiencia de usuario serena y de alto rendimiento.

## 🛠️ Tecnologías

Este proyecto utiliza una combinación robusta de tecnologías modernas:

- **Core & Framework:** [Astro](https://astro.build) (v5+) - Para un rendimiento web óptimo.
- **UI Components:** [React](https://react.dev) (v19) - Para interactividad y componentes complejos.
- **Backend & Auth:** [Firebase](https://firebase.google.com) - Para autenticación segura y base de datos.
- **Gráficos:** [Three.js](https://threejs.org/) - Para elementos visuales 3D inmersivos.

## � Estructura del Proyecto

La estructura principal del código fuente es la siguiente:

```text
/
├── public/          # Archivos estáticos y assets públicos
├── src/
│   ├── components/  # Componentes reutilizables (UI, Navegación, etc.)
│   ├── content/     # Colecciones de contenido y datos estáticos
│   ├── firebase/    # Configuración e inicialización de servicios de Firebase
│   ├── layouts/     # Plantillas de diseño principales (Layout base)
│   └── pages/       # Rutas de la aplicación (File-based routing)
│       ├── panel/   # Área de administración o panel de usuario
│       ├── login    # Página de autenticación
│       └── ...      # Páginas públicas (Inicio, Legales)
└── package.json
```

## 🚀 Configuración y Ejecución

Sigue estos pasos para levantar el proyecto en tu entorno local:

1.  **Instalar dependencias:**

    ```bash
    npm install
    ```

2.  **Variables de Entorno:**
    Asegúrate de configurar las variables de entorno necesarias (claves de Firebase, etc.) creando un archivo `.env` en la raíz del proyecto.

3.  **Iniciar el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

    El sitio estará disponible en `http://localhost:4321`.

## 📜 Scripts Disponibles

| Comando | Acción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local. |
| `npm run build` | Compila el sitio para producción en la carpeta `./dist/`. |
| `npm run preview` | Previsualiza la versión compilada (build) localmente. |

## ✨ Características Clave

- **Arquitectura de Islas**: Hidratación selectiva de componentes React para máxima velocidad.
- **Autenticación Segura**: Sistema de login integrado.
- **Cumplimiento Legal**: Páginas pre-configuradas para privacidad, cookies y aviso legal.
- **Estética Visual**: Diseño cuidado con enfoque en la usabilidad y la estética.

---

> _Hecho con ❤️ para amar el proceso._
