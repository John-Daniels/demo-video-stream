const express = require("express");
const cors = require("cors");
const path = require("path");
const { videoUpload } = require("./services/uploads/uploads");
const fs = require("fs");
const { videoPath, corsOptions } = require("./constants/index");
const verifyToken = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

app.get("/videos/:filename", verifyToken, (req, res) => {
  const fileName = req.params.filename;
  if (!fileName.includes(".mp4"))
    return res.status(400).send({ error: "invalid video name" });

  const filePath = path.resolve(__dirname, "../uploads/videos", fileName);
  // res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);
  // res.setHeader("Content-Type", "video/mp4");
  // res.sendFile(file);

  // const path = 'path/to/video.mp4';
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

// generate token
// const jwt = require("jsonwebtoken");
// const token = jwt.sign({ username: "johnkoder" }, "johnkoder+ishayasolo");
// console.log('token', token);
