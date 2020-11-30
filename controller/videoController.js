const fs = require("fs");
const path = require("path");

const db = require("../utils/db");

module.exports.getVideo = (req, res, next) => {
  //serve the video file partially
  // such that user to stream the video rather than downloading the whole video
  const range = req.headers.range;
  const videoId = req.params.videoId;
  if (!range) {
    res.status(400).send("Requires Range headers");
  }
  if (!videoId) {
    res.status(400).send("Require video id");
  }
  const videoPath = path.join(__dirname, "..", "public", "video", videoId);
  const videoSize = fs.statSync(videoPath).size;

  const CHUNK_SIZE = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;
  const header = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Range": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, header);

  const videoStream = fs.createReadStream(videoPath, { start, end });

  videoStream.pipe(res);
};

module.exports.postVideo = (req, res, next) => {
  // store this request to user uploads
  // which can be later used by
  let filename = req.file.filename;
  let create_video_post = `
  INSERT INTO posts (media_url, created_at) values('${filename}', datetime('now'));
  `;
  db.exec(create_video_post, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error processing request");
    } else {
      res.status(201).send("Post created successfully");
    }
  });
};
