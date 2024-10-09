const express = require("express");
const cors = require("cors");
const db = require("./models");
const postRouter = require("./routes/posts.js");
const commentRouter = require("./routes/comments.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Page not found!" });
});

db.sequelize
  .sync({ force: false })
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((err) => console.log("Faild to connect DB: ", err));
