const noteRouter = require("express").Router();
const noteController = require("../controllers/noteController");

noteRouter.post("/", noteController.create);
noteRouter.get("/", noteController.getAll);
noteRouter.delete("/:id", noteController.deleteNote);
noteRouter.put("/:id", noteController.updateNote);

module.exports = noteRouter;
