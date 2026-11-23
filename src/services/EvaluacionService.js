class EvaluacionService {

    constructor(evaluacionRepository) {
        this.evaluacionRepository = evaluacionRepository;
    }

    async iniciar(datos) {
        const { id_usuario, id_area, total_preguntas, id_plantilla_evaluacion } = datos;

        if (!id_usuario || isNaN(id_usuario)) throw new Error("Debe indicar un usuario válido");
        if (!id_area || isNaN(id_area)) throw new Error("Debe indicar un área válida");
        if (!total_preguntas || isNaN(total_preguntas) || total_preguntas <= 0) {
            throw new Error("El total de preguntas debe ser un número mayor a 0");
        }

        return await this.evaluacionRepository.crear({
            id_usuario: Number(id_usuario),
            id_area: Number(id_area),
            id_plantilla_evaluacion: id_plantilla_evaluacion ? Number(id_plantilla_evaluacion) : null,
            total_preguntas: Number(total_preguntas)
        });
    }

    async iniciarDesdePlantilla(id_plantilla_evaluacion, id_usuario) {
        if (!Number.isInteger(Number(id_plantilla_evaluacion)) || Number(id_plantilla_evaluacion) <= 0) {
            throw new Error("Debe indicar una plantilla de evaluación válida");
        }
        const plantilla = await this.evaluacionRepository.obtenerPlantillaActiva(Number(id_plantilla_evaluacion));
        if (!plantilla) throw new Error("La evaluación no existe o no está activa");
        return this.iniciar({
            id_usuario,
            id_area: plantilla.id_area,
            total_preguntas: plantilla.cantidad_preguntas,
            id_plantilla_evaluacion: plantilla.id_plantilla_evaluacion
        });
    }

    async obtenerPorId(id_evaluacion) {
        const evaluacion = await this.evaluacionRepository.obtenerPorId(id_evaluacion);
        if (!evaluacion) return null;

        const detalle = await this.evaluacionRepository.obtenerDetallePorEvaluacion(id_evaluacion);
        return { ...evaluacion.toJSON(), detalle };
    }

    async obtenerHistorial(id_usuario) {
        return await this.evaluacionRepository.obtenerHistorialPorUsuario(id_usuario);
    }

    async registrarRespuesta(id_evaluacion, datos) {
        const { id_pregunta, respuesta_marcada, tiempo_usado } = datos;

        const evaluacion = await this.evaluacionRepository.obtenerPorId(id_evaluacion);
        if (!evaluacion) throw new Error("La evaluación no existe");

        const respondidas = await this.evaluacionRepository.contarRespuestasRegistradas(id_evaluacion);
        if (respondidas >= evaluacion.total_preguntas) {
            throw new Error("Ya se respondieron todas las preguntas de esta evaluación");
        }

        if (!id_pregunta || isNaN(id_pregunta)) throw new Error("Debe indicar una pregunta válida");

        const yaRespondida = await this.evaluacionRepository.yaRespondioPregunta(id_evaluacion, id_pregunta);
        if (yaRespondida) throw new Error("Esta pregunta ya fue respondida en esta evaluación");

        const respuesta = (respuesta_marcada || "").toUpperCase();
        if (!["A", "B", "C", "D"].includes(respuesta)) {
            throw new Error("La respuesta debe ser A, B, C o D");
        }

        const pregunta = await this.evaluacionRepository.obtenerPreguntaPorArea(
            Number(id_pregunta),
            Number(evaluacion.id_area)
        );
        if (!pregunta) {
            throw new Error("La pregunta no existe o no pertenece al área de esta evaluación");
        }

        const esCorrecta = respuesta === pregunta.respuesta_correcta;

        return await this.evaluacionRepository.registrarRespuesta({
            id_evaluacion: Number(id_evaluacion),
            id_pregunta: Number(id_pregunta),
            respuesta_marcada: respuesta,
            es_correcta: esCorrecta ? 1 : 0,
            tiempo_usado: tiempo_usado || null
        });
    }

    async finalizar(id_evaluacion) {
        const evaluacion = await this.evaluacionRepository.obtenerPorId(id_evaluacion);
        if (!evaluacion) return null;

        const correctas = await this.evaluacionRepository.contarRespuestasCorrectas(id_evaluacion);
        const puntaje = Math.round((correctas / evaluacion.total_preguntas) * 100);

        return await this.evaluacionRepository.actualizarPuntaje(id_evaluacion, puntaje);
    }

}

module.exports = EvaluacionService;
