const user = require("../../models/user");

function handleGetNewUser(req, res) {
  res.render("signup");
}

async function handleCreateNewUser(req, res) {
  const { fullName, email, password } = req.body;
  await user.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/user/login");
}

function handleGetUserLogin(req, res) {
  res.render("login");
}

async function handleCreateUserLogin(req, res) {
  const { email, password } = req.body;
  try {
    const token = await user.matchPasswordAndCheckAuthentication(
      email,
      password
    );
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    res.render("login", {
      error: "Incorrect Credentials",
    });
  }
}

async function handleLogout(req, res) {
  res.clearCookie("token").redirect("/user/login");
}

module.exports = {
  handleGetNewUser,
  handleCreateNewUser,
  handleGetUserLogin,
  handleCreateUserLogin,
  handleLogout,
};
