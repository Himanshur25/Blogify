const { Router } = require("express");
const blog = require("../models/blog");
const router = Router();
const multer = require("multer");
const {
  handleGetBlog,
  handleCreateBlog,
  handleGetBlogById,
} = require("../controllers/blog/blogController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router
  .route("/add-new")
  .get(handleGetBlog)
  .post(upload.single("coverImage"), handleCreateBlog);

router.get("/:id", handleGetBlogById);

module.exports = router;
