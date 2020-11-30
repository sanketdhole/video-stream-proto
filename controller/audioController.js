const fs = require("fs");
const path = require("path");

const db = require("../utils/db");

module.exports.getAudio = (req, res, next) => {
  // serve the audio file partially
  const range = req.headers.range;
  const audioId = req.params.audioId;
  if (!range) {
    res.status(400).send("Requires Range headers");
  }
  if (!audioId) {
    res.status(400).send("Require audio Id");
  }
  const audioPath = path.join(__dirname, "..", "public", "audio", audioId);
  const audioSize = fs.statSync(audioPath).size;

  const CHUNK_SIZE = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, audioSize - 1);

  const contentLength = end - start + 1;
  const header = {
    "Content-Range": `bytes ${start}-${end}/${audioSize}`,
    "Accept-Range": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "audio/mp3",
  };

  res.writeHead(206, header);

  const audioStream = fs.createReadStream(audioPath, { start, end });

  audioStream.pipe(res);
};

module.exports.postAudio = (req, res, next) => {
  // save the audio file and update the information in db
  let filename = req.file.filename;
  let create_audio_post = `
  INSERT INTO posts (media_url, created_at) values('${filename}', datetime('now'));
  `;
  db.exec(create_audio_post, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error creating post");
    } else {
      res.status(201).send("Post Created Successfully");
    }
  });
};
