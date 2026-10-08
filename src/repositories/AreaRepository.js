const { Area, Pregunta, Evaluacion, sequelize } = require("../models");

class AreaRepository {

    async obtenerTodas() {
        return await Area.findAll({ order: [["id_area", "ASC"]] });
    }

    async obtenerPorId(id_area) {
        return await Area.findByPk(id_area);
    }

    async obtenerPorNombre(nombre_area) {
        return await Area.findOne({ where: { nombre_area } });
    }

    async crear(area) {
        return await Area.create({
            nombre_area: area.nombre_area,
            descripcion: area.descripcion
        });
    }

    async actualizar(id_area, area) {
        const [filasActualizadas] = await Area.update(
            { nombre_area: area.nombre_area, descripcion: area.descripcion },
            { where: { id_area } }
        );

        if (filasActualizadas === 0) return null;

        return await this.obtenerPorId(id_area);
    }

    async eliminar(id_area) {
        const filasEliminadas = await Area.destroy({ where: { id_area } });
        return filasEliminadas > 0;
    }

    async obtenerEstadisticas(id_area) {
        const total_preguntas = await Pregunta.count({ where: { id_area } });
        const total_evaluaciones = await Evaluacion.count({ where: { id_area } });

        const promedio = await Evaluacion.findOne({
            where: { id_area },
            attributes: [
                [sequelize.fn("AVG", sequelize.col("puntaje_obtenido")), "promedio_puntaje"]
            ],
            raw: true
        });

        return {
            total_preguntas,
            total_evaluaciones,
            promedio_puntaje: promedio.promedio_puntaje
                ? Number(Number(promedio.promedio_puntaje).toFixed(2))
                : 0
        };
    }

}

module.exports = AreaRepository;
