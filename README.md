# Sopa de Letras

Este proyecto es una solución a la prueba técnica de desarrollo de software, que consiste en una aplicación full-stack para encontrar palabras en una sopa de letras. La aplicación cuenta con un backend en Node.js/Express para la lógica de búsqueda y un frontend interactivo en React.

![Captura de Pantalla de la App](URL_DE_LA_IMAGEN_DE_TU_APP_TERMINADA)

## ✨ Características

* **Backend**: API RESTful construida con Node.js y Express para procesar las búsquedas.
* **Frontend**: Interfaz de usuario creada con React y Vite, que permite editar la matriz de letras en tiempo real.
* **Búsqueda en 8 Direcciones**: El algoritmo de búsqueda encuentra palabras en horizontal, vertical y las cuatro diagonales (en ambos sentidos).
* **Validación y Pruebas**: El backend cuenta con validación de entradas y está cubierto al 100% por pruebas unitarias y de integración con Jest.
* **Documentación de API**: La API está documentada con Swagger para facilitar su entendimiento y prueba.

---

## 🛠️ Tecnologías Empleadas

### Backend
* **Lenguaje**: Node.js
* **Framework**: Express.js
* **Testing**: Jest
* **Documentación de API**: Swagger (swagger-jsdoc, swagger-ui-express)
* **Utilidades**: Nodemon, Dotenv, CORS

### Frontend
* **Librería**: React
* **Bundler**: Vite
* **Estilos**: Tailwind CSS (Si lo usaste)
* **Cliente HTTP**: Fetch API

---

## 🚀 Guía de Despliegue y Ejecución

Sigue estas instrucciones para ejecutar el proyecto en tu máquina local.

### Prerrequisitos
* Node.js (versión 20.x o superior)
* npm (o un gestor de paquetes similar)

### 1. Clonar el Repositorio
```bash
cd tu-repositorio
git clone https://github.com/Anthonylog13/word-search-solver.git
```

### 2. Configurar el Backend
```bash
# Navegar a la carpeta del backend
cd BACKEND

# Instalar dependencias
npm install

# Crear el archivo de variables de entorno
cp .env.template .env

# (Opcional) Modificar el puerto en .env si es necesario
# APP_PORT=3001

# Iniciar el servidor en modo desarrollo
npm run dev
```
El servidor del backend estará corriendo en `http://localhost:3001`.

### 3. Configurar el Frontend
```bash
# Desde la raíz del proyecto, navegar a la carpeta del frontend
cd FRONTEND

# Instalar dependencias
npm install

# Iniciar la aplicación de React
npm run dev
```
La aplicación web estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

---

## 📄 Guía de Usuario

Para una guía detallada sobre cómo utilizar la aplicación, por favor consulta el documento `Guia_de_Usuario.docx` adjunto en el repositorio.
