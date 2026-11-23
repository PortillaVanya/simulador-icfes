class InformacionCompartidaController {


constructor(informacionCompartidaService) {
    this.informacionCompartidaService = informacionCompartidaService;
}


async obtenerTodos(req, res) {
    try {

        const informacionesCompartidas =
            await this.informacionCompartidaService.obtenerTodos();

        return res.status(200).json(informacionesCompartidas);

    } catch (error) {

        console.error("Error al obtener información compartida:", error);

        return res.status(500).json({
            mensaje: "Error al obtener la información compartida"
        });

    }
}


async obtenerPorId(req, res) {
    try {

        const { id } = req.params;

        const informacionCompartida =
            await this.informacionCompartidaService.obtenerPorId(id);

        if (!informacionCompartida) {

            return res.status(404).json({
                mensaje: "Información compartida no encontrada"
            });

        }

        return res.status(200).json(informacionCompartida);

    } catch (error) {

        console.error("Error al obtener información compartida:", error);

        return res.status(500).json({
            mensaje: "Error al obtener la información compartida"
        });

    }
}


async crear(req, res) {
    try {

        const nuevaInformacionCompartida =
            await this.informacionCompartidaService.crear(req.body);

        return res.status(201).json({
            mensaje: "Información compartida creada correctamente",
            datos: nuevaInformacionCompartida
        });

    } catch (error) {

        console.error("Error al crear información compartida:", error);

        return res.status(400).json({
            mensaje: error.message
        });

    }
}


async actualizar(req, res) {
    try {

        const { id } = req.params;

        const informacionCompartidaActualizada =
            await this.informacionCompartidaService.actualizar(
                id,
                req.body
            );

        if (!informacionCompartidaActualizada) {

            return res.status(404).json({
                mensaje: "Información compartida no encontrada"
            });

        }

        return res.status(200).json({
            mensaje: "Información compartida actualizada correctamente",
            datos: informacionCompartidaActualizada
        });

    } catch (error) {

        console.error("Error al actualizar información compartida:", error);

        return res.status(400).json({
            mensaje: error.message
        });

    }
}


async eliminar(req, res) {
    try {

        const { id } = req.params;

        const eliminado =
            await this.informacionCompartidaService.eliminar(id);

        if (!eliminado) {

            return res.status(404).json({
                mensaje: "Información compartida no encontrada"
            });

        }

        return res.status(200).json({
            mensaje: "Información compartida eliminada correctamente"
        });

    } catch (error) {

        console.error("Error al eliminar información compartida:", error);

        return res.status(500).json({
            mensaje: "Error al eliminar la información compartida"
        });

    }
}


}

module.exports = InformacionCompartidaController;
