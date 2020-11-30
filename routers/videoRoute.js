const path = require("path");

const { Router } = require("express");
const multer = require("multer");

const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/video");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "-" + Math.random() * 10 + path.extname(file.originalname)
    );
  },
});

const videoUpload = multer({ storage: videoStorage });

const videoController = require("../controller/videoController");

const videoRouter = new Router();

videoRouter.post(
  "/upload",
  videoUpload.single("video"),
  videoController.postVideo
);

videoRouter.get("/:videoId", videoController.getVideo);

module.exports = videoRouter;
