const blog = require("../../models/blog");

function handleGetBlog(req, res) {
  res.render("addBlog", {
    user: req.user,
  });
}

async function handleCreateBlog(req, res) {
  const { title, description } = req.body;
  const blogResult = await blog.create({
    title,
    description,
    createdBy: req.user._id,
    coverImage: `/images/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blogResult._id}`);
}

async function handleGetBlogById(req, res) {
  const selectedBlog = await blog.findById(req.params.id);
  return res.render("blog", {
    user: req.user,
    blog: selectedBlog,
  });
}

module.exports = { handleGetBlog, handleCreateBlog, handleGetBlogById };
