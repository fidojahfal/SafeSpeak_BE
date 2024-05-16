import User from '../models/userModel.js';
import Mahasiswa from '../models/mahasiswaModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (error) {}
  res.status(200).json({ message: 'Success', data: { users } });
};

export const getUserById = async (req, res) => {
  const { user_id } = req.params;
  let users;
  try {
    users = await Mahasiswa.findOne({ user_id })
      .populate('user_id', '-password')
      .exec();
  } catch (error) {}
  res.status(200).json({ message: 'Success', data: { user: users } });
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  let user;

  try {
    user = await User.findOne({ username });
  } catch (error) {
    console.log(error);
  }

  let isPasswordValid;

  try {
    isPasswordValid = await bcrypt.compare(password, user.password);
  } catch (error) {
    console.log(error);
  }

  if (!user || !isPasswordValid) {
    return res
      .status(402)
      .json({ message: 'Your username or password is wrong.' });
  }

  let token;

  try {
    token = jwt.sign({ id: user.id }, process.env.SECRET_JWT, {
      expiresIn: '1h',
    });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ message: 'Success', data: { token } });
};

export const getOwnProfile = async (req, res) => {
  const { id } = req.userData;

  let user;

  try {
    user = await User.findById(id, '-password');
  } catch (error) {
    console.log(error);
  }

  if (!user) {
    return res.status(404).json({ message: "Can't find your profile" });
  }

  res.status(200).json({ message: 'Success', data: { user } });
};

export const register = async (req, res) => {
  const { name, username, nim, email, jurusan, password, telepon } = req.body;

  let user;
  try {
    user = await User.findOne({ username, email });
  } catch (error) {
    console.log(error);
  }

  if (user) {
    return res.status(402).json({ message: 'User already registered' });
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 13);
  } catch (error) {
    console.log(error);
  }

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    avatar: `https://api.multiavatar.com/${username}.png`,
  });
  const newMahasiswa = new Mahasiswa({
    name,
    nim,
    jurusan,
    telepon,
    user_id: newUser._id,
  });

  try {
    await newUser.save();
    await newMahasiswa.save();
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ message: 'success', data: null });
};

export const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const { name, jurusan, telepon, email } = req.body;

  try {
    await Mahasiswa.findOneAndUpdate({ user_id }, { name, jurusan, telepon });
    await User.findByIdAndUpdate(user_id, { email });
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ message: 'Success' });
};
