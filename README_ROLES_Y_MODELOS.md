# Roles, evaluaciones y asociaciones de modelos

## Roles del sistema

| Rol | ID inicial | Permisos principales |
|---|---:|---|
| `admin` | 1 | Administra usuarios y todo el contenido. |
| `estudiante` | 2 | Consulta preguntas y presenta sus propios intentos de evaluación. |
| `gestor` | 3 | Crea, edita y elimina preguntas, áreas, información compartida, explicaciones, imágenes y plantillas de evaluación. No administra usuarios. |

El registro público (`POST /api/registro`) siempre crea estudiantes, aunque el cuerpo enviado contenga un `id_rol` distinto. Un administrador puede asignar otro rol desde las operaciones de administración de usuarios. Si `id_rol = 3` ya existe en tu base de datos con un nombre diferente, revisa esa fila: `findOrCreate` no cambia el nombre de una fila ya existente.

## Asociaciones Sequelize

Cada archivo de `src/models/` declara sus propias relaciones mediante `Modelo.associate(models)`. `src/models/index.js` solo carga los modelos y ejecuta esas funciones cuando todos están registrados; no define las relaciones en ese archivo. De esta manera se evitan importaciones circulares y se mantienen las asociaciones junto a los modelos relacionados.

El proyecto sincroniza los modelos al iniciar (`sequelize.sync({ alter: true })`), por lo que añade la tabla `plantilla_evaluacion` y el campo opcional `id_plantilla_evaluacion` a `evaluacion` en una base compatible. Haz una copia de seguridad de tu base de datos antes de arrancar una versión que cambia el esquema.

## Plantillas de evaluación e intentos

- **Plantilla**: configuración reutilizable creada por un gestor, con nombre, descripción, área, cantidad de preguntas, estado activo y usuario creador.
- **Intento**: evaluación que realiza un estudiante, con sus respuestas y puntaje. Si se inicia desde una plantilla, también guarda la referencia a esa plantilla.
- Las preguntas registradas en un intento deben pertenecer al área de ese intento.

Las plantillas configuran el área y la cantidad de preguntas; no mantienen una selección fija de preguntas individuales. La aplicación que consume la API puede obtener las preguntas del área y presentar la cantidad definida en la plantilla.

## Endpoints principales de plantillas

- `GET /api/evaluaciones/plantillas` — listar plantillas activas e inactivas.
- `GET /api/evaluaciones/plantillas/:id` — consultar una plantilla.
- `POST /api/evaluaciones/plantillas` — crear; requiere rol `admin` o `gestor`.
- `PUT /api/evaluaciones/plantillas/:id` — actualizar; requiere rol `admin` o `gestor`.
- `DELETE /api/evaluaciones/plantillas/:id` — eliminar; requiere rol `admin` o `gestor`.
- `POST /api/evaluaciones/plantillas/:id/iniciar` — un estudiante inicia un intento desde una plantilla activa; requiere token de estudiante.

Ejemplo de cuerpo para crear una plantilla:

```json
{
  "nombre": "Simulacro de Matemáticas 1",
  "descripcion": "Práctica de álgebra y geometría",
  "id_area": 1,
  "cantidad_preguntas": 10,
  "activa": true
}
```

El servidor usa el `id_usuario` del token para guardar el creador; no confía en un `id_creador` enviado en el cuerpo.

## Probar los permisos

1. Inicia sesión con la cuenta gestora para obtener un JWT nuevo.
2. En Postman configura `Authorization: Bearer <token>`.
3. Con ese token, `POST`, `PUT` y `DELETE` en preguntas, áreas, información compartida y explicaciones deben estar permitidos; también las operaciones de plantillas.
4. Con ese mismo token, `GET /api/usuarios` y las operaciones de administración de usuarios deben responder `403`.
5. El registro público debe seguir asignando el rol estudiante. Después de cambiar un usuario de rol en MySQL, vuelve a iniciar sesión para obtener un token con el rol actualizado.

## Configuración local

Usa `.env.example` como plantilla para crear tu propio `.env` dentro de la carpeta del proyecto. Conserva las credenciales de tu equipo local; el archivo `.env` no se distribuye en este ZIP. Instala dependencias con `npm install` si no tienes `node_modules` y arranca con `npm start`.

## Preparar una cuenta de gestor para probar en Postman

El servidor crea el rol `gestor` en el arranque. Para probar de forma rápida con una cuenta nueva en una base de desarrollo:

1. Registra una cuenta con `POST /api/registro`, por ejemplo:

```json
{
  "nombre": "Gestor de prueba",
  "correo": "gestor@prueba.com",
  "password": "Prueba123*"
}
```

2. En MySQL Workbench asigna el rol solo para la prueba local:

```sql
UPDATE usuarios
SET id_rol = 3
WHERE correo = 'gestor@prueba.com';
```

3. Inicia sesión otra vez con `POST /api/login` y copia el token nuevo. No reutilices el token anterior porque todavía puede contener `rol: estudiante`.
4. Usa el token nuevo para crear una plantilla y para probar que las rutas de gestión de contenido aceptan al gestor. Verifica también que `GET /api/usuarios` contesta `403`.

En producción, la asignación de roles debe hacerla un administrador autenticado, nunca el usuario por medio del registro público.


## Relaciones clave y auditoría

- `Usuario 1:1 Perfil`: `perfil.id_usuario` es único.
- `Explicacion 1:1 Pregunta`: `preguntas.id_explicacion` es opcional y único; una explicación solo puede pertenecer a una pregunta.
- `Evaluacion 1:N DetalleEvaluacion`; `Pregunta 1:N DetalleEvaluacion`. En conjunto, `Evaluacion` y `Pregunta` tienen una relación N:M resuelta por `detalle_evaluacion`.
- `InformacionCompartida 1:N Pregunta`: una lectura o situación puede ser utilizada por varias preguntas. La FK es `preguntas.id_informacion_compartida`.
- `auditoria` se crea como modelo Sequelize y se completa automáticamente con triggers `trg_auditoria_pregunta_insert`, `trg_auditoria_pregunta_update` y `trg_auditoria_pregunta_delete`.

La tabla `auditoria` registra acción, tabla y registro afectados, fecha/hora, cuenta MySQL y JSON de datos anteriores/nuevos. `id_usuario_actor` requiere que la conexión de la operación establezca la variable MySQL `@id_usuario_auditoria`; de lo contrario queda NULL y `usuario_bd` identifica la cuenta de base de datos.
