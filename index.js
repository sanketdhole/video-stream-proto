const fs = require("fs");
const path = require("path");

const express = require("express");

const audioRouter = require("./routers/audioRoute");
const feedRouter = require("./routers/feedRoute");
const videoRouter = require("./routers/videoRoute");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/audio", audioRouter);
app.use("/feed", feedRouter);
app.use("/video", videoRouter);

app.get("/", (req, res, next) => {
  // example of how video content will be served
  res.sendFile(__dirname + "/index.html");
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
