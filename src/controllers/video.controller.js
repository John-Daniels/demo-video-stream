const path = require("path");
const fs = require("fs");
const { videoPath, corsOptions } = require("../constants/index");

const getVideo = (req, res) => {
  if (!req.file)
    return res.status(400).send({
      message: "video not found!",
    });

  const vpath = path.join(videoPath, req.file.originalname);
  fs.writeFileSync(vpath, req.file.buffer);

  res.send({
    message: "successfully updated your video",
  });
};

const uploadVideo = (req, res) => {
  const fileName = req.params.filename;
  if (!fileName.includes(".mp4"))
    return res.status(400).send({ error: "invalid video name" });

  const filePath = path.resolve(__dirname, "../../uploads/videos", fileName);
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
};

module.exports = {
  getVideo,
  uploadVideo,
};
