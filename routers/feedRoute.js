const { Router } = require("express");

const feedController = require("../controller/feedController");

const feedRouter = new Router();

feedRouter.get("/", feedController.getFeed);

module.exports = feedRouter;
