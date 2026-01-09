const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const login = async (req, res) => { 
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: "email y password requeridos" });
    }
    
    const user = await User.findOne({ email: email });
    
    if (!user) {
        return res.status(401).json({ error: "Credenciales inválidas." });
    }
    
    
    const passwordHashed = user.passwordHash;
    const passwordCorrect = await bcrypt.compare(password, passwordHashed);
    
    if(!passwordCorrect){
        return res.status(401).json({ error: "Contraseña incorrecta" });
    }
    
    const userForToken = {
        email: user.email,
        id: user._id,
    }
    
    const token = jwt.sign(userForToken, process.env.JWT_SECRET)
    
    res
    .status(200)
    .send({ token, email: user.email})
}

module.exports = login;
