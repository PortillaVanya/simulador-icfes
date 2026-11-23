const express = require("express");
const { autenticar, permitirRoles } = require("../middlewares/auth");

const { upload } = require("../config/cloudinary");
const ImagenController = require("../controllers/imagenController");

module.exports = () => {
    const router = express.Router();
    const imagenController = new ImagenController();

    router.post("/imagenes/subir", autenticar, permitirRoles("admin", "gestor"), upload.single("imagen"), imagenController.subir);

    return router;
};
