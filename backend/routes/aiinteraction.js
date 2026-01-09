const aiInteractionRouter = require("express").Router();
const aiInteractionController = require("../controllers/aiController");

aiInteractionRouter.post("/", aiInteractionController.aiHandler);
aiInteractionRouter.get("/", aiInteractionController.getHistory);

module.exports = aiInteractionRouter;
