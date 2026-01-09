const Note = require("../models/note");
const Subject = require("../models/subject");

const create = async (req, res) => {
    const { title, content, subjectId } = req.body;
    
    const userId = req.user.id;
    
    if (!title) {
        return res.status(400).json({ error: "Debe ingresar un titulo de la nota." });
    }
    if (!content) {
        return res.status(400).json({ error: "El contenido de la nota no puede estar vacío." });
    }
    
    //me fijo que exista una materia acorde al usuario
    const subject = await Subject.findOne({ _id: subjectId, userId });
    if (!subject) {
        return res.status(400).json({ error: "Materia inválida" });
    }
    
    try {
        const note = new Note({
            title,
            content,
            subjectId,
            userId
        });
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ error: "error interno" });
    }
};
const getAll = async (req, res) => {
    const userId = req.user.id;
    
    try {
        const notes = await Note.find({ userId });
        res.json(notes);
    } catch(error){
        res.status(500).json({error: "error interno"});
    }
};
const deleteNote = async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.id;

  try {
    const deleted = await Note.findOneAndDelete({
      _id: noteId,
      userId: userId,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Nota no encontrada" });
    }

    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: "error interno" });
  }
};

const updateNote = async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user.id;
    const { title, content } = req.body;
    
    try {
        const updated = await Note.findOneAndUpdate(
            { _id: noteId, userId },
            { title, content },
            { new: true }
        );
        
        if (!updated) {
            return res.status(404).json({ error: "Nota no encontrada." });
        }
        
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "error interno" });
    }
};



module.exports = {create, getAll, deleteNote, updateNote};
