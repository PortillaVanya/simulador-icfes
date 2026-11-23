# Simulador ICFES

Backend del simulador de preguntas ICFES desarrollado con Node.js, Express, Sequelize y MySQL.

## Inicio rápido

1. Crea un archivo `.env` a partir de `.env.example` y configura el acceso a tu MySQL y un `JWT_SECRET` privado.
2. Ejecuta `npm install` si aún no están instaladas las dependencias.
3. Ejecuta `npm start` desde la carpeta de este proyecto.
4. Prueba las rutas desde Postman usando `http://localhost:3000`.

## Documentación de los cambios

Consulta [`README_ROLES_Y_MODELOS.md`](README_ROLES_Y_MODELOS.md) para ver los tres roles (`admin`, `estudiante` y `gestor`), la política de permisos, las asociaciones definidas en cada modelo, los endpoints de plantillas y cómo probar el rol gestor. Revisa [`CAMBIOS_REALIZADOS.md`](CAMBIOS_REALIZADOS.md) para el resumen técnico y las comprobaciones realizadas.

**Importante:** haz una copia de seguridad de la base de datos antes de iniciar una versión que modifica el esquema. No compartas tu archivo `.env`; contiene credenciales locales y secretos.
