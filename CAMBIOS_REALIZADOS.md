# Cambios realizados en el proyecto

## Funcionalidad

- Se añadió el rol `gestor` con ID inicial 3. Puede gestionar preguntas, áreas, información compartida, explicaciones, imágenes y plantillas de evaluación, pero no administrar usuarios.
- El registro público continúa forzando el rol `estudiante`.
- Se añadieron plantillas reutilizables de evaluación con nombre, descripción, área, cantidad de preguntas, estado activo y usuario creador.
- Se corrigió el enrutamiento de evaluaciones para usar `EvaluacionController` y se separaron las plantillas de los intentos realizados por estudiantes.
- Los intentos iniciados desde plantilla obtienen el usuario del JWT y solo pueden utilizar preguntas del área de ese intento.
- Se comprueba que una plantilla no solicite más preguntas de las disponibles en el área seleccionada.

## Modelos y relaciones

Las asociaciones están declaradas mediante `associate(models)` dentro de los archivos de `src/models/`. `src/models/index.js` registra todos los modelos y luego ejecuta sus funciones de asociación, pero no define en sí las relaciones.

El registro de `PlantillaEvaluacion` precede al de `Evaluacion` para que la clave foránea de `evaluacion.id_plantilla_evaluacion` tenga disponible la tabla referenciada cuando Sequelize sincronice las tablas.

## Verificación realizada

- Comprobación de sintaxis en los 55 archivos JavaScript.
- Carga de los 12 modelos y verificación de las asociaciones previstas.
- Instanciación de las nueve fábricas de rutas.
- Prueba aislada de la creación/validación de plantillas y del controlador para iniciar desde plantilla.

No se ejecutó una prueba de integración con la base MySQL real, porque las credenciales `.env` pertenecen al equipo local y no se incluyen en la entrega. Haz una copia de seguridad de la base antes de arrancar esta versión: `server.js` usa `sequelize.sync({ alter: true })` para adaptar las tablas.


## Ajustes de modelos para el segundo parcial

- Se renombró la entidad y tabla `contextos` a `InformacionCompartida` / `informacion_compartida`, y la FK de `preguntas` a `id_informacion_compartida`. La ruta correspondiente es `GET/POST/PUT/DELETE /api/informacion-compartida`.
- Se añadió el modelo `Auditoria`; Sequelize crea la tabla `auditoria` durante `sequelize.sync({ alter: true })`. Después de sincronizar, la inicialización crea triggers para registrar INSERT, UPDATE y DELETE sobre `preguntas`, con fecha/hora, usuario de base de datos y datos anteriores/nuevos.
- Se cambió la relación `Explicacion`–`Pregunta` a 1:1 usando `unique` en `preguntas.id_explicacion` y `hasOne` en Explicacion.
- Se aseguró la relación 1:1 entre `Usuario` y `Perfil` haciendo único `perfil.id_usuario`.
- Se eliminaron `reportes` e `historial` de `DetalleEvaluacion`. Se conserva la relación correcta `Evaluacion 1:N DetalleEvaluacion`, y cada detalle referencia una pregunta; esto resuelve la relación N:M entre evaluaciones y preguntas. Se agregó una restricción única para evitar repetir la misma pregunta dentro de un mismo intento.
- Se añadió una migración de nombres antiguos para renombrar `contextos` e `id_contexto` antes de sincronizar, procurando conservar los datos existentes.

**Importante:** antes de iniciar esta versión, haz una copia de seguridad. Si la base existente tiene explicaciones compartidas por varias preguntas, o más de un perfil por usuario, primero hay que corregir esos duplicados para poder aplicar las restricciones 1:1. Los triggers de auditoría guardan `CURRENT_USER()` como cuenta de base de datos; `id_usuario_actor` solo se llena cuando la conexión MySQL establece `@id_usuario_auditoria`. No se realizó una prueba contra la base MySQL local porque sus credenciales no vienen en el ZIP.
