const path = require("path");

const { Router } = require("express");
const multer = require("multer");

const audioStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/audio");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "-" + Math.random() * 10 + path.extname(file.originalname)
    );
  },
});

const audioUpload = multer({ storage: audioStorage });

const audioController = require("../controller/audioController");

const audioRouter = new Router();

audioRouter.post(
  "/upload",
  audioUpload.single("audio"),
  audioController.postAudio
);

audioRouter.get("/:audioId", audioController.getAudio);

module.exports = audioRouter;
