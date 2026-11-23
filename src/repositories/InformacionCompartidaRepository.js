const { InformacionCompartida } = require("../models");

class InformacionCompartidaRepository {

    async crear(informacionCompartida) {
        return await InformacionCompartida.create({
            titulo: informacionCompartida.titulo,
            contenido: informacionCompartida.contenido,
            url_imagen: informacionCompartida.url_imagen || null
        });
    }

    async obtenerTodos() {
        return await InformacionCompartida.findAll();
    }

    async obtenerPorId(id_informacion_compartida) {
        return await InformacionCompartida.findByPk(id_informacion_compartida);
    }

    async actualizar(id_informacion_compartida, informacionCompartida) {
        const [filasActualizadas] = await InformacionCompartida.update(
            {
                titulo: informacionCompartida.titulo,
                contenido: informacionCompartida.contenido,
                url_imagen: informacionCompartida.url_imagen
            },
            { where: { id_informacion_compartida } }
        );

        if (filasActualizadas === 0) return null;

        return await this.obtenerPorId(id_informacion_compartida);
    }

    async eliminar(id_informacion_compartida) {
        const filasEliminadas = await InformacionCompartida.destroy({ where: { id_informacion_compartida } });
        return filasEliminadas > 0;
    }

}

module.exports = InformacionCompartidaRepository;
