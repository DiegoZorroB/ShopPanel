# La Mesa — Recetario

 conexión a Supabase, la consulta a la API y la persistencia de favoritos.

## Requisitos

- Node.js instalado
- Acceso a internet para instalar dependencias y consumir los servicios
- Cuenta de Supabase

## Instalar y ejecutar

```bash
npm install
npm run dev
```

## Configuración de Supabase

1. Entrar a [Supabase](https://supabase.com/) e iniciar sesión o crear una cuenta.
2. Crear un proyecto llamado `la-mesa-recetario` y esperar a que termine de aprovisionarse.
3. En el panel del proyecto, abrir **Authentication → Users** y crear un usuario de prueba con correo y contraseña. Si el proyecto exige confirmar correo, marcar el usuario como confirmado para la prueba de clase.
4. Abrir **Project Settings → API** y copiar la **Project URL** y la clave pública (**anon** o **publishable**, según aparezca en el panel).
5. Crear `.env` a partir de `.env.example` y completar:

```env
VITE_SUPABASE_URL=URL_DEL_PROYECTO
VITE_SUPABASE_ANON_KEY=CLAVE_PUBLICABLE
```

5. Reiniciar el servidor de Vite después de cambiar `.env`.

No usar ni publicar la clave `service_role` en una aplicación React. Reiniciar Vite después de guardar `.env`.

## Archivos que se completan durante la clase

- `src/services/supabaseClient.js`: inicializar el cliente con las variables de entorno.
- `src/services/authService.js`: iniciar y cerrar sesión con Supabase.
- `src/context/AuthContext.jsx`: compartir y escuchar la sesión.
- `src/components/LoginModal.jsx`: validar el formulario y conectar el inicio de sesión.
- `src/components/ProtectedRoute.jsx`: permitir el acceso al catálogo solo con sesión.
- `src/services/recipeService.js`: definir la URL y consultar la API.
- `src/pages/RecipesPage.jsx`: ejecutar la consulta al cargar y mostrar carga/error/datos.
- `src/context/FavoritesContext.jsx`: compartir favoritos y persistirlos en `localStorage`.

API para la práctica: `https://dummyjson.com/recipes?limit=6`. Devuelve la colección bajo la propiedad `recipes`.

## Estructura

```text
src/
├── components/   # Navegación, modal, rutas protegidas y tarjetas
├── context/      # Sesión y favoritos compartidos
├── pages/        # Inicio, recetas, favoritas y página no encontrada
├── services/     # Supabase y peticiones HTTP
├── App.jsx
├── main.jsx
└── styles.css
```

## Alcance de la práctica

- Login y cierre de sesión con Supabase.
- Rutas públicas y protegidas con React Router.
- Consulta GET de seis recetas con `fetch`.
- Estados de carga, error y lista vacía.
- Favoritos compartidos con Context API y guardados localmente.

La protección de rutas en React controla la navegación de la interfaz. No sustituye las reglas de seguridad del servidor para proteger datos.
