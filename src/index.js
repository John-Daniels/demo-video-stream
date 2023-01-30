const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => res.send("Hello World!!!"));

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
