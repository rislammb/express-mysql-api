const express = require("express");
const cors = require("cors");
const db = require("./models");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");
const likeRouter = require("./routes/likes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/likes", likeRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found!" });
});

db.sequelize
  .sync({ force: false })
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((err) => console.log("Faild to connect DB: ", err));
