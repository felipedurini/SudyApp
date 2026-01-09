const Note = require("../models/note");
const AIInteraction = require("../models/AIInteraction");
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const PROMPTS = {
    summary: (content) =>
        `Resumí el siguiente texto de forma clara y concisa:\n\n${content}`,

    explanation: (content) =>
        `Explicá el siguiente texto de manera pedagógica:\n\n${content}`,

    questions: (content) =>
        `Generá entre 5 y 8 preguntas de estudio sobre el siguiente texto, orientadas a evaluar comprensión:\n\n${content}`,
};

const aiHandler = async (req, res) => {
    const { noteId, type } = req.body;
    const userId = req.user.id;

    if (!noteId || !type) {
        return res.status(400).json({ error: "noteId y type requeridos." });
    }

    const promptBuilder = PROMPTS[type];
    if (!promptBuilder) {
        return res.status(400).json({ error: "Tipo no soportado." });
    }

    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) {
        return res.status(404).json({ error: "Nota no encontrada." });
    }

    const prompt = promptBuilder(note.content);

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "Sos un asistente académico." },
            { role: "user", content: prompt },
        ],
    });

    const responseText = completion.choices[0].message.content;

    await AIInteraction.create({
        type,
        prompt,
        response: responseText,
        noteId,
        userId,
    });

    res.json({ result: responseText });
};

const getHistory = async (req, res) => {
    const { noteId } = req.query;
    const userId = req.user.id;

    if (!noteId) {
        return res.status(400).json({ error: "noteId requerido" });
    }

    const history = await AIInteraction.find({ noteId, userId }).sort({ _id: -1 });
    res.json(history);
};


module.exports = { aiHandler, getHistory };
