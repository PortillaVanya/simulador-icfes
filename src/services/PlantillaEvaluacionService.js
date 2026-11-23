class PlantillaEvaluacionService {
    constructor(repository) {
        this.repository = repository;
    }

    async obtenerTodas() {
        return this.repository.obtenerTodas();
    }

    async obtenerPorId(id) {
        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            throw new Error("El ID de la evaluación no es válido");
        }
        return this.repository.obtenerPorId(Number(id));
    }

    validar(datos) {
        if (!datos.nombre || !String(datos.nombre).trim()) {
            throw new Error("El nombre de la evaluación es obligatorio");
        }
        if (!Number.isInteger(Number(datos.id_area)) || Number(datos.id_area) <= 0) {
            throw new Error("Debe indicar un área válida");
        }
        if (!Number.isInteger(Number(datos.cantidad_preguntas)) || Number(datos.cantidad_preguntas) <= 0) {
            throw new Error("La cantidad de preguntas debe ser un entero mayor a 0");
        }
    }

    async validarDisponibilidad(datos) {
        const disponibles = await this.repository.contarPreguntasPorArea(Number(datos.id_area));
        if (Number(datos.cantidad_preguntas) > disponibles) {
            throw new Error(`El área seleccionada solo tiene ${disponibles} pregunta(s), no se puede configurar una evaluación de ${Number(datos.cantidad_preguntas)}.`);
        }
    }

    async crear(datos, idCreador) {
        this.validar(datos);
        await this.validarDisponibilidad(datos);
        return this.repository.crear({
            nombre: String(datos.nombre).trim(),
            descripcion: datos.descripcion || null,
            id_area: Number(datos.id_area),
            cantidad_preguntas: Number(datos.cantidad_preguntas),
            activa: datos.activa === undefined ? true : Boolean(datos.activa),
            id_creador: Number(idCreador)
        });
    }

    async actualizar(id, datos) {
        const existente = await this.obtenerPorId(id);
        if (!existente) return null;

        const combinado = {
            nombre: datos.nombre === undefined ? existente.nombre : datos.nombre,
            descripcion: datos.descripcion === undefined ? existente.descripcion : datos.descripcion,
            id_area: datos.id_area === undefined ? existente.id_area : datos.id_area,
            cantidad_preguntas: datos.cantidad_preguntas === undefined ? existente.cantidad_preguntas : datos.cantidad_preguntas,
            activa: datos.activa === undefined ? existente.activa : datos.activa
        };
        this.validar(combinado);
        await this.validarDisponibilidad(combinado);
        combinado.nombre = String(combinado.nombre).trim();
        combinado.id_area = Number(combinado.id_area);
        combinado.cantidad_preguntas = Number(combinado.cantidad_preguntas);
        combinado.activa = Boolean(combinado.activa);
        return this.repository.actualizar(Number(id), combinado);
    }

    async eliminar(id) {
        const existente = await this.obtenerPorId(id);
        if (!existente) return false;
        return this.repository.eliminar(Number(id));
    }
}

module.exports = PlantillaEvaluacionService;
