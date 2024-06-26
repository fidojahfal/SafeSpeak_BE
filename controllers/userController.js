import User from '../models/userModel.js';
import Mahasiswa from '../models/mahasiswaModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (error) {
    return res.status(502).json({ message: 'Could not find user' });
  }
  res.status(200).json({ message: 'Success', data: { users } });
};

export const getUserById = async (req, res) => {
  const { user_id } = req.params;
  let users;
  try {
    users = await Mahasiswa.findOne({ user_id })
      .populate('user_id', '-password')
      .exec();
  } catch (error) {
    return res
      .status(502)
      .json({ message: 'Could not find specified user by id' });
  }
  res.status(200).json({ message: 'Success', data: { user: users } });
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  let user;

  try {
    user = await User.findOne({ username });
  } catch (error) {
    return res.status(500).json({ message: 'Could not login!' });
  }

  let isPasswordValid;

  try {
    isPasswordValid = await bcrypt.compare(password, user.password);
  } catch (error) {
    return res.status(500).json({
      message:
        'Could not log you in, please check your credential and try again!',
    });
  }

  if (!user || !isPasswordValid) {
    return res
      .status(400)
      .json({ message: 'Your username or password is wrong.' });
  }

  let token;

  try {
    token = jwt.sign({ id: user.id }, process.env.SECRET_JWT, {
      expiresIn: '1h',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Could not to create token!',
    });
  }

  res.status(200).json({ message: 'Success', data: { token } });
};

export const getOwnProfile = async (req, res) => {
  const { id } = req.userData;

  let user;

  try {
    user = await User.findById(id, '-password');
  } catch (error) {
    return res
      .status(502)
      .json({ message: 'Could not find specified user by id' });
  }

  if (!user) {
    return res.status(404).json({ message: "Can't find your profile" });
  }

  res.status(200).json({ message: 'Success', data: { user } });
};

export const register = async (req, res) => {
  const { name, username, nim, email, jurusan, password, telepon } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid input from user!' });
  }

  let user;
  try {
    user = await User.findOne({ username });
  } catch (error) {
    return res.status(502).json({ message: 'Could not find user!' });
  }

  if (user) {
    return res.status(403).json({ message: 'Username already registered' });
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT)
    );
  } catch (error) {
    return res.status(500).json({ message: 'Error saving password!' });
  }

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    avatar: `https://source.boringavatars.com/beam/100/${username}?colors=0D6EFD,6EA8FE,FFF3CD,FFDA6A,FFC107`,
    role: 0,
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
    return res.status(500).json({ message: 'Could not save user!' });
  }

  res.status(201).json({ message: 'Success' });
};

export const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const { name, jurusan, telepon, email } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid input from user!' });
  }

  try {
    await Mahasiswa.findOneAndUpdate({ user_id }, { name, jurusan, telepon });
    await User.findByIdAndUpdate(user_id, { email });
  } catch (error) {
    return res.status(500).json({ message: 'Could not update user!' });
  }
  res.status(201).json({ message: 'Success' });
};
