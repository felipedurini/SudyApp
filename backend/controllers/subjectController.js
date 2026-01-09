const Subject = require("../models/subject");

const create = async (req, res) => {
    const { name, description } = req.body;
    
    const userId = req.user.id;
    
    if (!name) {
        return res.status(400).json({ error: "Debe ingresar un nombre de la materia" });
    }
    
    try {
        const subject = new Subject({
            name,
            description,
            userId
        });
        const savedSubject = await subject.save();
        res.status(201).json(savedSubject);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Una materia con ese nombre ya fue registrada" });
        }
        res.status(500).json({ error: "error interno" });
    }
};
const getAll = async (req, res) => {
    const userId = req.user.id;
    
    try {
        const subjects = await Subject.find({ userId });
        res.json(subjects);
    } catch(error){
        res.status(500).json({error: "error interno"});
    }
};
const deleteSubject = async (req, res) => {
  const subjectId = req.params.id;
  const userId = req.user.id;

  try {
    const deleted = await Subject.findOneAndDelete({
      _id: subjectId,
      userId: userId,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Materia no encontrada" });
    }

    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: "error interno" });
  }
};
const updateSubject = async (req, res) => {
  const subjectId = req.params.id;
  const userId = req.user.id;
  const { name, description } = req.body;

  try {
    const updated = await Subject.findOneAndUpdate(
      { _id: subjectId, userId },
      { name, description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Materia no encontrada" });
    }

    res.json(updated);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Nombre de materia duplicado" });
    }
    res.status(500).json({ error: "error interno" });
  }
};



module.exports = {create, getAll, deleteSubject, updateSubject};
