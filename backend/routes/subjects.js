const subjectRouter = require("express").Router();
const subjectController = require("../controllers/subjectController");

subjectRouter.post("/", subjectController.create);
subjectRouter.get("/",  subjectController.getAll);
subjectRouter.delete("/:id", subjectController.deleteSubject);
subjectRouter.put("/:id", subjectController.updateSubject);

module.exports = subjectRouter;

