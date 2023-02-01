const path = require("path");
const videoPath = path.resolve(__dirname, "../../uploads/videos");

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
};

module.exports = {
  videoPath,
  corsOptions,
};
