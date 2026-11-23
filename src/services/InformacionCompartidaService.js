class InformacionCompartidaService {


constructor(informacionCompartidaRepository) {
    this.informacionCompartidaRepository = informacionCompartidaRepository;
}


async obtenerTodos() {

    return await this.informacionCompartidaRepository.obtenerTodos();

}


async obtenerPorId(id) {

    if (!id || isNaN(id)) {
        throw new Error("El ID de la información compartida no es válido");
    }

    return await this.informacionCompartidaRepository.obtenerPorId(id);

}


async crear(datos) {

    const {
        titulo,
        contenido,
        url_imagen
    } = datos;


    if (!contenido || contenido.trim() === "") {
        throw new Error(
            "El contenido de la información compartida es obligatorio"
        );
    }


    const nuevaInformacionCompartida = {
        titulo: titulo ? titulo.trim() : null,
        contenido: contenido.trim(),
        url_imagen: url_imagen || null
    };


    return await this.informacionCompartidaRepository.crear(
        nuevaInformacionCompartida
    );

}


async actualizar(id, datos) {

    if (!id || isNaN(id)) {
        throw new Error("El ID de la información compartida no es válido");
    }


    const informacionCompartidaExistente =
        await this.informacionCompartidaRepository.obtenerPorId(id);


    if (!informacionCompartidaExistente) {
        return null;
    }


    const {
        titulo,
        contenido,
        url_imagen
    } = datos;


    if (contenido !== undefined) {

        if (
            !contenido ||
            contenido.trim() === ""
        ) {
            throw new Error(
                "El contenido de la información compartida no puede estar vacío"
            );
        }

    }


    const informacionCompartidaActualizada = {

        titulo:
            titulo !== undefined
                ? titulo.trim()
                : informacionCompartidaExistente.titulo,

        contenido:
            contenido !== undefined
                ? contenido.trim()
                : informacionCompartidaExistente.contenido,

        url_imagen:
            url_imagen !== undefined
                ? url_imagen
                : informacionCompartidaExistente.url_imagen

    };


    return await this.informacionCompartidaRepository.actualizar(
        id,
        informacionCompartidaActualizada
    );

}


async eliminar(id) {

    if (!id || isNaN(id)) {
        throw new Error("El ID de la información compartida no es válido");
    }


    const informacionCompartidaExistente =
        await this.informacionCompartidaRepository.obtenerPorId(id);


    if (!informacionCompartidaExistente) {
        return false;
    }


    return await this.informacionCompartidaRepository.eliminar(id);

}


}

module.exports = InformacionCompartidaService;
