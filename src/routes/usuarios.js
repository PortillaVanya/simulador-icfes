const express = require("express");
const { autenticar, permitirRoles, propietarioOAdmin } = require("../middlewares/auth");
const UsuarioRepository = require("../repositories/UsuarioRepository");
const UsuarioService = require("../services/UsuarioService");
const UsuarioController = require("../controllers/UsuarioController");

module.exports = () => {
    const router = express.Router();
    const usuarioRepository = new UsuarioRepository();
    const usuarioService = new UsuarioService(usuarioRepository);
    const usuarioController = new UsuarioController(usuarioService);

    router.post("/registro", (req, res, next) => {
        req.body.id_rol = 2; // El registro público nunca puede crear administradores
        next();
    }, usuarioController.crear);
    router.post("/login", usuarioController.login);

    router.use("/usuarios", autenticar);
    router.get("/usuarios", permitirRoles("admin"), usuarioController.obtenerTodos);
    router.get("/usuarios/:id", propietarioOAdmin("id"), usuarioController.obtenerPorId);
    router.post("/usuarios", permitirRoles("admin"), usuarioController.crear);
    router.put("/usuarios/:id", permitirRoles("admin"), usuarioController.actualizar);
    router.delete("/usuarios/:id", permitirRoles("admin"), usuarioController.eliminar);
    return router;
};
