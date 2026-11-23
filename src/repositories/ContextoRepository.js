const { Contexto } = require("../models");

class ContextoRepository {

    async crear(contexto) {
        return await Contexto.create({
            titulo: contexto.titulo,
            contenido: contexto.contenido,
            url_imagen: contexto.url_imagen || null
        });
    }

    async obtenerTodos() {
        return await Contexto.findAll();
    }

    async obtenerPorId(id_contexto) {
        return await Contexto.findByPk(id_contexto);
    }

    async actualizar(id_contexto, contexto) {
        const [filasActualizadas] = await Contexto.update(
            {
                titulo: contexto.titulo,
                contenido: contexto.contenido,
                url_imagen: contexto.url_imagen
            },
            { where: { id_contexto } }
        );

        if (filasActualizadas === 0) return null;

        return await this.obtenerPorId(id_contexto);
    }

    async eliminar(id_contexto) {
        const filasEliminadas = await Contexto.destroy({ where: { id_contexto } });
        return filasEliminadas > 0;
    }

}

module.exports = ContextoRepository;
