const { Explicacion } = require("../models");

class ExplicacionRepository {

    async crear(explicacion) {
        return await Explicacion.create({
            texto_explicacion: explicacion.texto_explicacion,
            imagen_url: explicacion.imagen_url
        });
    }

    async obtenerPorId(id_explicacion) {
        return await Explicacion.findByPk(id_explicacion);
    }

    async actualizar(id_explicacion, explicacion) {
        const [filasActualizadas] = await Explicacion.update(
            {
                texto_explicacion: explicacion.texto_explicacion,
                imagen_url: explicacion.imagen_url
            },
            { where: { id_explicacion } }
        );

        if (filasActualizadas === 0) return null;

        return await this.obtenerPorId(id_explicacion);
    }

}

module.exports = ExplicacionRepository;
