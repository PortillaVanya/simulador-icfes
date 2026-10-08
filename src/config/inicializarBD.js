const mysql = require("mysql2/promise");
const { sequelize, Rol } = require("../models");

// 1) Crea la base de datos si no existe
async function crearBaseDeDatos() {
    const conexion = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });

    await conexion.query(
        `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``
    );
    await conexion.end();
}

// 2) Datos iniciales
async function cargarDatosIniciales() {
    await Rol.findOrCreate({ where: { id_rol: 1 }, defaults: { nombre_rol: "admin" } });
    await Rol.findOrCreate({ where: { id_rol: 2 }, defaults: { nombre_rol: "estudiante" } });
}

// 3) Trigger, vista, función y procedimiento
async function crearObjetosSQL() {

    await sequelize.query(`DROP TRIGGER IF EXISTS trg_repaso_automatico`);
    await sequelize.query(`
        CREATE TRIGGER trg_repaso_automatico
        AFTER INSERT ON detalle_evaluacion
        FOR EACH ROW
        BEGIN
            DECLARE v_id_usuario INT;
            IF NEW.es_correcta = 0 THEN
                SELECT id_usuario INTO v_id_usuario
                FROM evaluacion
                WHERE id_evaluacion = NEW.id_evaluacion;

                INSERT INTO repaso (id_pregunta, id_usuario, prioridad, fecha_agregado)
                VALUES (NEW.id_pregunta, v_id_usuario, 'media', NOW());
            END IF;
        END
    `);

    await sequelize.query(`
        CREATE OR REPLACE VIEW vista_preguntas_completas AS
        SELECT p.id_pregunta, p.enunciado, p.opcion_a, p.opcion_b, p.opcion_c, p.opcion_d,
               p.respuesta_correcta, p.nivel_dificultad, p.url_imagen,
               a.id_area, a.nombre_area,
               c.id_contexto, c.titulo AS titulo_contexto, c.contenido AS contenido_contexto,
               e.id_explicacion, e.texto_explicacion, e.imagen_url AS imagen_explicacion
        FROM preguntas p
        INNER JOIN areas a ON p.id_area = a.id_area
        LEFT JOIN contextos c ON p.id_contexto = c.id_contexto
        LEFT JOIN explicaciones e ON p.id_explicacion = e.id_explicacion
    `);

    await sequelize.query(`DROP FUNCTION IF EXISTS fn_total_preguntas_area`);
    await sequelize.query(`
        CREATE FUNCTION fn_total_preguntas_area(p_id_area INT)
        RETURNS INT
        DETERMINISTIC
        READS SQL DATA
        BEGIN
            DECLARE v_total INT;
            SELECT COUNT(*) INTO v_total FROM preguntas WHERE id_area = p_id_area;
            RETURN v_total;
        END
    `);

    await sequelize.query(`DROP PROCEDURE IF EXISTS sp_crear_pregunta_con_explicacion`);
    await sequelize.query(`
        CREATE PROCEDURE sp_crear_pregunta_con_explicacion(
            IN p_id_area INT, IN p_id_contexto INT, IN p_enunciado TEXT,
            IN p_opcion_a VARCHAR(255), IN p_opcion_b VARCHAR(255),
            IN p_opcion_c VARCHAR(255), IN p_opcion_d VARCHAR(255),
            IN p_respuesta_correcta CHAR(1), IN p_nivel_dificultad VARCHAR(10),
            IN p_texto_explicacion TEXT
        )
        BEGIN
            DECLARE v_id_explicacion INT;

            INSERT INTO explicaciones (texto_explicacion) VALUES (p_texto_explicacion);
            SET v_id_explicacion = LAST_INSERT_ID();

            INSERT INTO preguntas (id_area, id_contexto, enunciado, opcion_a, opcion_b,
                opcion_c, opcion_d, respuesta_correcta, nivel_dificultad, id_explicacion)
            VALUES (p_id_area, p_id_contexto, p_enunciado, p_opcion_a, p_opcion_b,
                p_opcion_c, p_opcion_d, p_respuesta_correcta, p_nivel_dificultad, v_id_explicacion);

            SELECT p.*, e.texto_explicacion
            FROM preguntas p
            INNER JOIN explicaciones e ON p.id_explicacion = e.id_explicacion
            WHERE p.id_pregunta = LAST_INSERT_ID();
        END
    `);
}

module.exports = { crearBaseDeDatos, cargarDatosIniciales, crearObjetosSQL };