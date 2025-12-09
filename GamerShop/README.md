🎮 GamerShop - Examen Final
Aplicación web desarrollada con Vue.js 3, Bootstrap 5 y MockAPI, como evidencia del Examen Final de la asignatura Desarrollo de Aplicaciones Web.

📋 Descripción del Proyecto
GamerShop es una aplicación web completa para la gestión de una tienda de productos gamer que implementa todas las funcionalidades requeridas para el examen final:

✅ Autenticación de usuarios con validación en MockAPI

✅ Rutas protegidas mediante navigation guards

✅ CRUD completo para Usuarios y Productos

✅ Interfaz moderna con Bootstrap 5 y modales

✅ Conexión en tiempo real con MockAPI

✅ Arquitectura modular y componentes reutilizables

🎯 Objetivo del Proyecto
Demostrar competencias en el desarrollo de aplicaciones web modernas utilizando:

Vue.js 3 para la construcción de interfaces reactivas

Bootstrap 5 para diseño responsivo y componentes UI

Vue Router para navegación SPA y protección de rutas

MockAPI para persistencia de datos en la nube

CRUD completo con modales y alertas interactivas

🏗 Arquitectura del Proyecto
text
src/
├── components/
│   ├── FooterComponent.vue
│   ├── NavbarComponent.vue
│   └── SidebarComponent.vue
├── views/
│   ├── AboutView.vue
│   ├── DashboardView.vue
│   ├── LoginView.vue
│   ├── ProductView.vue
│   └── UsuariosView.vue
├── router/
│   └── index.js
├── services/
│   └── mockapi.js
├── App.vue
└── main.js
🔧 Funcionalidades Implementadas
🔐 Autenticación (5.1)
Formulario de Login con validación de campos

Verificación de credenciales en MockAPI

Almacenamiento de token en sessionStorage

Botón para cerrar sesión en Sidebar

🛡 Rutas Protegidas (5.2)
Navigation guards en Vue Router

Redirección automática a /login si no autenticado

Protección de rutas /dashboard/* y /about

Acceso condicional a vistas según estado de autenticación

👥 CRUD de Usuarios (5.3)
Listado de usuarios desde MockAPI

Creación mediante modal con formulario

Edición mediante modal con datos precargados

Eliminación con modal de confirmación

Alertas Bootstrap después de cada operación

🎮 CRUD de Productos (5.4)
Listado de productos con imágenes, precios y categorías

Creación mediante modal con validación

Edición mediante modal con datos del producto

Eliminación con modal de confirmación

Íconos Bootstrap en todas las acciones

🎨 Bootstrap 5 (5.5)
Sistema grid responsive para todas las vistas

Formularios estilizados en modales

Modales para todas las operaciones CRUD

Alertas de éxito, error y validación

Íconos consistentes en toda la aplicación

🔌 Conexión con MockAPI
Usuarios:   https://691cffcbd58e64bf0d34a9d7.mockapi.io/api/v1/usuarios
Productos:  https://691cffcbd58e64bf0d34a9d7.mockapi.io/api/v1/products
Servicios Implementados (src/services/mockapi.js)
javascript
// Autenticación
authService.login(usuario, contraseña)

// Usuarios CRUD
usuariosAPI.obtenerUsuarios()
usuariosAPI.crearUsuario(usuario)
usuariosAPI.actualizarUsuario(id, usuario)
usuariosAPI.eliminarUsuario(id)

// Productos CRUD
productosAPI.obtenerProductos()
productosAPI.crearProducto(producto)
productosAPI.actualizarProducto(id, producto)
productosAPI.eliminarProducto(id)

📱 Vistas de la Aplicación
1. Login (/login)
Formulario de acceso con validación

Mensajes de error contextuales

Diseño con gradiente profesional

2. Dashboard (/dashboard)
Layout principal con Sidebar, Navbar y Footer

Navegación a todas las secciones

Botón de cerrar sesión

3. Productos (/dashboard/productos)
Tabla responsive con listado de productos

Filtros por categoría

Botones de acción con íconos

Modales para CRUD

4. Usuarios (/dashboard/usuarios)
Gestión completa de usuarios

Campos: nombre, usuario, email, contraseña

Validación de formularios

Modales de confirmación

5. Acerca de (/about)
Información sobre la tienda

Diseño centrado y atractivo

Iconografía relacionada

📊 Credenciales de Prueba
Usuario: admin
Contraseña: admin123

🌐 URLs del Proyecto
MockAPI Usuarios: https://691cffcbd58e64bf0d34a9d7.mockapi.io/api/v1/usuarios
MockAPI Productos: https://691cffcbd58e64bf0d34a9d7.mockapi.io/api/v1/products
Repositorio GitHub: (https://github.com/santiago-30235/Examen_MockAPI.git)

📚 Aprendizajes y Conclusiones
Este proyecto demuestra la capacidad para:

Desarrollar aplicaciones SPA con Vue.js 3

Implementar autenticación y protección de rutas

Consumir APIs REST externas (MockAPI)

Crear interfaces responsivas con Bootstrap 5

Implementar operaciones CRUD completas

Utilizar modales y alertas para interacción

Organizar proyectos de forma modular

Manejar estados del navegador (sessionStorage)

👥 Autores
Nombre 1 - 192454

Nombre 2 - 192441

📅 Información Académica
Materia: Desarrollo de Aplicaciones Web

Examen: Final

Fecha: 09 de Diciembre 2023

Institución: Universidad Francisco de Paula Santander, Seccional Ocaña

Nota: Esta aplicación es desarrollada exclusivamente con fines educativos para demostrar competencias en desarrollo web frontend con Vue.js y tecnologías relacionadas.