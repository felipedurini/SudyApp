const registerRouter = require("express").Router();
const registerController = require("../controllers/registerController");

registerRouter.post("/", registerController);

module.exports = registerRouter;
