import { validationResult } from 'express-validator';
import transporter from '../mails/config.js';
import templateMail from '../mails/template.js';
import Report from '../models/reportModel.js';
import User from '../models/userModel.js';

export const getAllReports = async (req, res) => {
  let reports;
  try {
    reports = await Report.find({});
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

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(401).json({ message: 'Invalid input from user!' });
  }

  let checkReport;

  try {
    checkReport = await Report.findOne({ user_id: id, status: 0 });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Could not find available report!' });
  }

  if (checkReport) {
    return res.status(400).json({
      message:
        'There are still an active report, please edit that report or delete it!',
    });
  }

  const newReport = new Report({
    title,
    type,
    place_report,
    date_report,
    description,
    evidence,
    is_anonim,
    user_id: id,
    status: 0,
  });

  try {
    await newReport.save();
  } catch (error) {
    return res.status(500).json({ message: 'Could not save report!' });
  }

  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    return res.status(422).json({ message: 'Could not find user!' });
  }

  const message = {
    from: '<safespeakteams>@gmail.com',
    to: user.email,
    subject: 'Your reports',
    html: templateMail,
  };
  try {
    await transporter.sendMail(message);
  } catch (error) {
    return res.status(500).json({ message: 'Could not send report email!' });
  }
  res.status(201).json({ message: 'Success', data: null });
};

export const getReportById = async (req, res) => {
  const { report_id } = req.params;

  let report;
  try {
    report = await Report.findById(report_id).populate('user_id', [
      '-password',
      '-role',
    ]);
  } catch (error) {
    return res
      .status(422)
      .json({ message: 'Could not find specified report by id!' });
  }
  res.status(200).json({ message: 'Success', data: { report } });
};

export const getReportsByUserId = async (req, res) => {
  const { user_id } = req.params;

  let reports;
  try {
    reports = await Report.find({ user_id });
  } catch (error) {
    return res.status(422).json({ message: 'Could not find user reports!' });
  }

  res.status(200).json({ message: 'Success', data: { reports } });
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
    status,
  } = req.body;
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

  if (report.status !== 0 && !status) {
    return res.status(400).json({ message: 'Your report already processed!' });
  }

  try {
    status
      ? await Report.findByIdAndUpdate(report_id, { status })
      : await Report.findByIdAndUpdate(report_id, {
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
    await Report.findByIdAndDelete(report_id);
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
        },
      },
    ]);
  } catch (error) {
    return res.status(500).json({ message: 'Could not count the reports!' });
  }
  const { total, status_0, status_1, status_2 } = {
    total: reports[0].totalCount[0] ? reports[0].totalCount[0].count : 0,
    status_0: reports[0].status_0[0] ? reports[0].status_0[0].count : 0,
    status_1: reports[0].status_1[0] ? reports[0].status_1[0].count : 0,
    status_2: reports[0].status_2[0] ? reports[0].status_2[0].count : 0,
  };

  res.status(200).json({
    message: 'Success',
    data: { total, status_0, status_1, status_2 },
  });
};
