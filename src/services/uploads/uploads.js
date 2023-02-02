const multer = require("multer");

const videoUpload = multer({
  limits: {
    fileSize: 10000000000000,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "video/mp4") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

module.exports = { videoUpload };
