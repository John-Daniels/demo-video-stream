const path = require("path");
const videoPath = path.resolve(__dirname, "../../uploads/videos");

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

module.exports = {
  videoPath,
  corsOptions,
};
