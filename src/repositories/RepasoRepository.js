const { Repaso, Pregunta, Area } = require("../models");

class RepasoRepository {

    async agregar(repaso) {
        return await Repaso.create({
            id_pregunta: repaso.id_pregunta,
            id_usuario: repaso.id_usuario,
            prioridad: repaso.prioridad
        });
    }

    async obtenerPorUsuario(id_usuario) {
        return await Repaso.findAll({
            where: { id_usuario },
            include: [{
                model: Pregunta,
                attributes: ["enunciado", "nivel_dificultad"],
                include: [{ model: Area, attributes: ["nombre_area"] }]
            }],
            order: [["fecha_agregado", "DESC"]]
        });
    }

    async eliminar(id_repaso, id_usuario = null) {
        const where = { id_repaso };
        if (id_usuario !== null) where.id_usuario = id_usuario;
        const filasEliminadas = await Repaso.destroy({ where });
        return filasEliminadas > 0;
    }

}

module.exports = RepasoRepository;
