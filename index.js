const path = require("path");
require("dotenv").config();
const express = require("express");
const { mongoConnection } = require("./config");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");

const { checkUserForAuthentication } = require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const blog = require("./models/blog");
const PORT = process.env.PORT || 9000;

const app = express();

mongoConnection(process.env.MONGO_URL, () => {
  console.log("MongoDB Connected Successfully");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkUserForAuthentication("token"));
app.use("/public/", express.static("./public"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allBlogs = await blog.find({});
  res.render("homePage", {
    user: req.user,
    blog: allBlogs,
  });
});

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
