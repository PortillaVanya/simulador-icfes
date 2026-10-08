const { Usuario } = require("../models");

class UsuarioRepository {

    async obtenerTodos() {
        return await Usuario.findAll({
            attributes: ["id_usuario", "nombre", "correo", "fecha_registro", "id_rol"]
        });
    }

    async obtenerPorId(id_usuario) {
        return await Usuario.findByPk(id_usuario, {
            attributes: ["id_usuario", "nombre", "correo", "fecha_registro", "id_rol"]
        });
    }

    async obtenerPorCorreo(correo) {
        return await Usuario.findOne({ where: { correo } });
    }

    async crear(usuario) {
        return await Usuario.create({
            nombre: usuario.nombre,
            correo: usuario.correo,
            password: usuario.password,
            id_rol: usuario.id_rol
        });
    }

    async actualizar(id_usuario, usuario) {
        const [filasActualizadas] = await Usuario.update(
            {
                nombre: usuario.nombre,
                correo: usuario.correo,
                id_rol: usuario.id_rol
            },
            { where: { id_usuario } }
        );

        if (filasActualizadas === 0) return null;

        return await this.obtenerPorId(id_usuario);
    }

    async eliminar(id_usuario) {
        const filasEliminadas = await Usuario.destroy({ where: { id_usuario } });
        return filasEliminadas > 0;
    }

}

module.exports = UsuarioRepository;
