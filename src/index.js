const express = require("express");
const cors = require("cors");
const path = require("path");
const { videoUpload } = require("./services/uploads/uploads");
const fs = require("fs");
const { videoPath } = require("./constants/index");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => res.send("Hello World!!!"));

app.post("/videos/", videoUpload.single("video"), (req, res) => {
  if (!req.file)
    return res.status(400).send({
      message: "video not found!",
    });

  const vpath = path.join(videoPath, req.file.originalname);
  fs.writeFileSync(vpath, req.file.buffer);

  res.send({
    message: "successfully updated your video",
  });
});

app.get("/videos/:filename", (req, res) => {
  const fileName = req.params.filename;
  if (!fileName.includes(".mp4"))
    return res.status(400).send({ error: "invalid video name" });

  const file = path.resolve(__dirname, "../videos", fileName);
  res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);
  res.setHeader("Content-Type", "video/mp4");
  res.sendFile(file);
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
