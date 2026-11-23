const jwt = require("jsonwebtoken");

function autenticar(req, res, next) {
    const encabezado = req.headers.authorization;
    if (!encabezado || !encabezado.startsWith("Bearer ")) {
        return res.status(401).json({ mensaje: "Debes iniciar sesión para acceder a este recurso." });
    }
    const token = encabezado.slice(7).trim();
    try {
        req.usuario = jwt.verify(token, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        return res.status(401).json({ mensaje: "Token inválido o vencido. Inicia sesión nuevamente." });
    }
}

function permitirRoles(...roles) {
    return (req, res, next) => {
        if (!req.usuario) return res.status(401).json({ mensaje: "Autenticación requerida." });
        if (!roles.includes(req.usuario.rol)) {
            return res.status(403).json({ mensaje: "No tienes permisos para realizar esta acción." });
        }
        return next();
    };
}

function propietarioOAdmin(parametro = "id") {
    return (req, res, next) => {
        const objetivo = Number(req.params[parametro]);
        if (req.usuario.rol === "admin" || objetivo === Number(req.usuario.id_usuario)) return next();
        return res.status(403).json({ mensaje: "Solo puedes acceder a tus propios datos." });
    };
}

module.exports = { autenticar, permitirRoles, propietarioOAdmin };
