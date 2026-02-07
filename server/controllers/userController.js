import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

export const registerUser = async (req, res) => {
  const { fullName, username, email, password } = req.body;

  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) {
    return res.status(409).json({
      success: false,
      message: "User already exists",
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password: hashed,
    avatar: `https://avatar.iran.liara.run/username?username=${username}`,
  });

  res.status(201).json({
  success: true,
  data: {
    _id: user._id,
    fullName: fullName,                 // ✅ from request
    username: username.toLowerCase(),   // ✅ match test
    email: email.toLowerCase(),         // ✅ match test
  },
});

};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(401).json({ success: false });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ success: false });
  }

  const token = createToken(user._id);

  res.status(200).json({
    success: true,
    data: {
      accessToken: token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
      },
    },
  });
};

export const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

export const searchUsers = async (req, res) => {
  const keyword = req.query.searchTerm;

  const users = await User.find({
    username: { $regex: keyword, $options: "i" },
  }).select("-password");

  res.status(200).json({
    success: true,
    data: users,
  });
};

export const logoutUser = (req, res) => {
  return res.status(200).json({
    success: true,
  });
};

