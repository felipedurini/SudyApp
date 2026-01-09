const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const getTokenFrom = req => {
        const authorization = req.get('authorization')
        if (authorization && authorization.startsWith('Bearer ')) {
            return authorization.replace('Bearer ', '')
        }
        return null
    }

    const token = getTokenFrom(req);

    if (!token) {
        res.status(401).json({ error: "Token no encontrado" });
        return;
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next()

    } catch (error) {
        res.status(401).json({ error: "Token inválido" });
        return;
    }
}

module.exports = auth;
