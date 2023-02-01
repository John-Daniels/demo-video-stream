const router = require("express").Router();
const verifyToken = require("../middleware/auth");
const { getVideo, uploadVideo } = require("../controllers/video.controller");
const { videoUpload } = require("../services/uploads/uploads");

router.post("/", videoUpload.single("video"), getVideo);
router.get(
  "/:filename",
  //  verifyToken,
  uploadVideo
);

module.exports = router;
