import { validationResult } from 'express-validator';

import Report from '../models/reportModel.js';
import User from '../models/userModel.js';
import Mahasiswa from '../models/mahasiswaModel.js';
import sendEmail from '../mails/sendEmail.js';
import fs from 'fs';
import storage from '../upload/storage.js';
import mongoose from 'mongoose';
import axios from 'axios';

export const getAllReports = async (req, res) => {
  let reports;
  try {
    reports = await Report.find({ is_delete: false });
  } catch (error) {
    return res.status(500).json({ message: 'Could not find user!' });
  }
  res.status(200).json({ message: 'Success', data: { reports } });
};

export const insertReport = async (req, res) => {
  const {
    title,
    type,
    place_report,
    date_report,
    description,
    evidence,
    is_anonim,
  } = req.body;
  const { id } = req.userData;
  const file = req.file;
  const session = await mongoose.startSession();
  let imageUrl;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    fs.unlinkSync(file.path);
    return res.status(401).json({ message: 'Invalid input from user!' });
  }

  session.startTransaction();
  try {
    const checkReport = await Report.findOne({
      user_id: id,
      is_delete: false,
      $or: [{ status: 0 }, { status: 1 }],
    }).session(session);

    if (checkReport) {
      if (file) fs.unlinkSync(file.path);
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message:
          'There are still an active report, please edit that report or delete it!',
      });
    }

    imageUrl = await storage({ file });

    const newReport = new Report({
      title,
      type: parseInt(type),
      place_report,
      date_report,
      description,
      evidence: imageUrl.path,
      is_anonim: is_anonim === 'true',
      user_id: id,
      status: 0,
      is_delete: false,
    });

    await newReport.save({ session });

    const user = await User.findById(id).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      await axios.delete(`${STORAGE_URI}/storages/file`, {
        data: { name: imageUrl.filename },
      });
      return res.status(422).json({ message: 'Could not find user!' });
    }

    const mahasiswa =
      !is_anonim &&
      (await Mahasiswa.findOne({ user_id: id }, ['name']).session(session));

    await sendEmail({ role: 0, email: user.email });
    is_anonim
      ? await sendEmail({ role: 1, email: 'udonotmatter@gmail.com' })
      : await sendEmail({
          role: 1,
          email: 'udonotmatter@gmail.com',
          name: mahasiswa.name,
        });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ message: 'Success', data: { report: newReport } });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    if (file) fs.unlinkSync(file.path);
    if (imageUrl)
      await axios.delete(`${STORAGE_URI}/storages/file`, {
        data: { name: imageUrl.filename },
      });
    return res.status(500).json({
      message: 'An error occurred while processing your request.',
      error: error.message,
    });
  }
};

export const getReportById = async (req, res) => {
  const { report_id } = req.params;

  let report;
  try {
    report = await Report.findById(report_id).populate('user_id', [
      '-password',
      '-role',
    ]);
    const mahasiswa = await Mahasiswa.findOne({ user_id: report.user_id._id }, [
      'name',
      'nim',
      '-_id',
    ]);
    report = {
      ...report._doc,
      user_id: {
        _id: report.user_id._id,
        nim: mahasiswa.nim,
        name: mahasiswa.name,
        username: report.user_id.username,
        email: report.user_id.email,
      },
    };
  } catch (error) {
    return res
      .status(422)
      .json({ message: 'Could not find specified report by id!' });
  }

  if (report.is_delete) {
    return res
      .status(404)
      .json({ message: 'Could not find report specified by id!' });
  }

  if (report.is_anonim) {
    report.user_id = report.user_id._id;
  }
  res.status(200).json({ message: 'Success', data: { report } });
};

export const getReportsByUserId = async (req, res) => {
  const { user_id } = req.params;

  let reports;
  try {
    reports = await Report.find({ user_id, is_delete: false });
  } catch (error) {
    return res.status(422).json({ message: 'Could not find user reports!' });
  }

  res.status(200).json({ message: 'Success', data: { reports } });
};

export const updateStatus = async (req, res) => {
  const { status, reason } = req.body;
  const { report_id } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ message: 'Invalid input from user!' });
  }

  let report;
  try {
    report = await Report.findById(report_id);
  } catch (error) {
    return res.status(422).json({ message: 'Could not find report!' });
  }

  if (report.is_delete) {
    return res
      .status(404)
      .json({ message: 'Could not find report specified by id!' });
  }

  if (status === 3 && !reason) {
    return res.status(404).json({ message: 'Please add your reject reason!' });
  }

  try {
    await Report.findByIdAndUpdate(report_id, { status, reason });
  } catch (error) {
    return res.status(500).json({ message: 'Could not update report!' });
  }

  try {
    const user = await User.findById(report.user_id, 'email');
    await sendEmail({ role: 0, email: user.email, status });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to send email.' });
  }

  res.status(200).json({ message: 'Success', data: null });
};

export const updateReport = async (req, res) => {
  const {
    title,
    type,
    place_report,
    date_report,
    description,
    evidence,
    is_anonim,
  } = req.body;
  const { report_id } = req.params;
  const file = req.file;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (typeof file === 'object') fs.unlinkSync(file.path);
    return res.status(401).json({ message: 'Invalid input from user!' });
  }

  let report;
  try {
    report = await Report.findById(report_id);
  } catch (error) {
    if (typeof file === 'object') fs.unlinkSync(file.path);
    return res.status(422).json({ message: 'Could not find report!' });
  }

  if (report.is_delete) {
    if (typeof file === 'object') fs.unlinkSync(file.path);
    return res
      .status(404)
      .json({ message: 'Could not find report specified by id!' });
  }

  if (report.status !== 0) {
    if (typeof file === 'object') fs.unlinkSync(file.path);
    return res.status(400).json({ message: 'Your report already processed!' });
  }

  if (typeof file === 'object') {
    const publicId = report.evidence.split('/').slice(-1)[0];

    try {
      await storage({ file, type: 1, old_name: publicId });
    } catch (error) {
      return res.status(400).json({ message: 'Could not upload your image!' });
    }
  }

  try {
    await Report.findByIdAndUpdate(report_id, {
      title,
      type,
      place_report,
      date_report,
      description,
      evidence,
      is_anonim,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Could not update report!' });
  }
  res.status(201).json({ message: 'Success', data: null });
};

export const deleteReport = async (req, res) => {
  const { report_id } = req.params;

  let report;
  try {
    report = await Report.findById(report_id);
  } catch (error) {
    return res.status(422).json({ message: 'Could not find report!' });
  }

  if (report.status !== 0) {
    return res.status(400).json({ message: 'Your report already processed!' });
  }

  try {
    await Report.findByIdAndUpdate(report_id, { is_delete: true });
  } catch (error) {
    return res.status(500).json({ message: 'Could not delete report!' });
  }
  res.status(201).json({ message: 'Success', data: null });
};

export const countReports = async (req, res) => {
  let reports;

  try {
    reports = await Report.aggregate([
      {
        $facet: {
          totalCount: [{ $count: 'count' }],
          status_0: [{ $match: { status: 0 } }, { $count: 'count' }],
          status_1: [{ $match: { status: 1 } }, { $count: 'count' }],
          status_2: [{ $match: { status: 2 } }, { $count: 'count' }],
          status_3: [{ $match: { status: 3 } }, { $count: 'count' }],
        },
      },
    ]);
  } catch (error) {
    return res.status(500).json({ message: 'Could not count the reports!' });
  }
  const { total, status_0, status_1, status_2, status_3 } = {
    total: reports[0].totalCount[0] ? reports[0].totalCount[0].count : 0,
    status_0: reports[0].status_0[0] ? reports[0].status_0[0].count : 0,
    status_1: reports[0].status_1[0] ? reports[0].status_1[0].count : 0,
    status_2: reports[0].status_2[0] ? reports[0].status_2[0].count : 0,
    status_3: reports[0].status_3[0] ? reports[0].status_3[0].count : 0,
  };

  res.status(200).json({
    message: 'Success',
    data: { total, status_0, status_1, status_2: status_2 + status_3 },
  });
};
