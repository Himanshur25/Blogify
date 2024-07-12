const { validateTokenForUser } = require("../service/auth");

//Authentications
function checkUserForAuthentication(cookieName) {
  return (req, res, next) => {
    const cookieToken = req.cookies?.[cookieName];
    req.user = null;
    if (!cookieToken) {
      return next();
    }
    try {
      const user = validateTokenForUser(cookieToken);
      req.user = user;
    } catch (error) {
      console.log("error");
    }
    return next();
  };
}

//Authorizations
function accessToUser(roles = []) {
  return async (req, res, next) => {
    if (!req.user) {
      return res.redirect("/login");
    }
    if (!roles.includes(req.user?.role)) {
      return res.end("Unauthorized");
    }
    return res.render("home");
  };
}

module.exports = { checkUserForAuthentication, accessToUser };
