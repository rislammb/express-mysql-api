const express = require("express");
const cors = require("cors");
const db = require("./models");
const postRouter = require("./routes/posts.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server listening on port ${port}`));
});
