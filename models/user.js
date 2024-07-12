const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
const { generateTokenForUser } = require("../service/auth");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.QxRSDfe8UFbJdi5DZtIvXgHaHa?rs=1&pid=ImgDetMain",
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static(
  "matchPasswordAndCheckAuthentication",
  async function (email, password) {
    const user = await this.findOne({ email });
    console.log("🚀 ~ user:", user);
    if (!user) throw new Error("User not found");
    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== userProvidedHash)
      throw new Error("Incorrect Password");
    const token = generateTokenForUser(user);
    return token;
  }
);

const user = mongoose.model("users", userSchema);

module.exports = user;
