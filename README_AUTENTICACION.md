# Autenticación, roles y permisos

## Configuración
1. No compartas tu archivo `.env`. Si lo subiste a un repositorio, elimina las credenciales del historial y cambia las claves expuestas.
2. Copia `.env.example` como `.env` y configura MySQL.
3. Genera un secreto JWT largo y aleatorio; no uses el valor de ejemplo en producción.
4. Instala dependencias con `npm install` y ejecuta `npm start`.

## Endpoints
- `POST /api/registro`: registro público; siempre crea estudiantes (id_rol=2), ignora el rol solicitado.
- `POST /api/login`: recibe `{ "correo": "...", "password": "..." }` y devuelve `token` y `usuario`.
- Rutas privadas: enviar `Authorization: Bearer <token>`.
- `GET /api/usuarios`: solo admin.
- `GET /api/usuarios/:id`: el mismo usuario o admin.
- Crear/editar/eliminar usuarios: solo admin (el registro público está separado).
- Crear/editar/eliminar preguntas, áreas, información compartida y explicaciones; subir imágenes: admin o gestor.
- Lectura de preguntas y áreas: pública para permitir explorar el simulacro.
- Perfil: propietario o admin.
- Repaso: autenticado; lectura por usuario restringida al propietario/admin.

## Información compartida
La tabla que antes se llamaba `contextos` ahora se llama `informacion_compartida`; su endpoint es `/api/informacion-compartida` y la FK de preguntas es `id_informacion_compartida`.

## Crear el primer administrador
El registro público no permite elegir el rol. Registra tu cuenta normal y luego, desde MySQL, asigna el rol administrador de forma manual:

```sql
SELECT id_usuario, nombre, correo, id_rol FROM usuarios;
UPDATE usuarios SET id_rol = 1 WHERE correo = 'tu-correo@ejemplo.com';
```

Haz esto únicamente para tu propia cuenta. Los roles iniciales son `admin` (id_rol=1) y `estudiante` (id_rol=2).

## Probar el flujo
1. Registra usuario con `POST /api/registro`.
2. Inicia sesión con `POST /api/login` y copia `token`.
3. Prueba una ruta protegida enviando `Authorization: Bearer <token>`.
4. Un estudiante debe recibir HTTP 403 si intenta crear una pregunta; sin token debe recibir HTTP 401.

Nota: la protección de autorización de rutas se ha agregado al backend. Antes de publicar, revisa las reglas de propiedad en los controladores de repaso/evaluaciones y conecta el frontend para guardar y enviar el token. Nunca guardes contraseñas en texto plano.
