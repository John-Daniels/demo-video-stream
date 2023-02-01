const express = require("express");
const cors = require("cors");
const videoRouter = require("./routers/video.route");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "https://no-actions.vercel.app",
      "http://127.0.0.1:5174",
      "http://127.0.0.1:5000",
    ],
  })
);

app.use("/videos", videoRouter);

app.get("/", (req, res) => res.send("Hello World!!!"));

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

// generate token
// const jwt = require("jsonwebtoken");
// const token = jwt.sign({ username: "johnkoder" }, "johnkoder+ishayasolo");
// console.log('token', token);
