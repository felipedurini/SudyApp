const express = require("express");
const cors = require("cors");

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const subjectsRouter = require("./routes/subjects");
const notesRouter = require("./routes/notes");
const aiRouter = require("./routes/aiinteraction");

const authMiddleware = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());

// auth pública
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);

// rutas protegidas
app.use("/api/subjects", authMiddleware, subjectsRouter);
app.use("/api/notes", authMiddleware, notesRouter);
app.use("/api/aiinteraction", authMiddleware, aiRouter);

module.exports = app;
