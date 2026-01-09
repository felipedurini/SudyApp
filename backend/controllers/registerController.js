const bcrypt = require("bcrypt");
const User = require("../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email y password requeridos" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "password muy corta" });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      passwordHash,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "email ya registrado" });
    }
    res.status(500).json({ error: "error interno" });
  }
};

module.exports = register;
