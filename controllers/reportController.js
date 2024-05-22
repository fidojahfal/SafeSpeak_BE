import transporter from '../mails/config.js';
import templateMail from '../mails/template.js';
import Report from '../models/reportModel.js';
import User from '../models/userModel.js';

export const getAllReports = async (req, res) => {
  let reports;
  try {
    reports = await Report.find({});
  } catch (error) {
    return console.log(error);
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
    status,
  } = req.body;
  const { id } = req.userData;

  let checkReport;

  try {
    checkReport = await Report.findOne({ user_id: id, status: 0 });
  } catch (error) {
    console.log(error);
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
    return console.log(error);
  }

  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    return console.log(error);
  }
  res.status(200).json({ message: 'Success', data: { report } });
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

  let report;
  try {
    report = await Report.findById(report_id);
  } catch (error) {
    console.log(error);
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
    return console.log(error);
  }
  res.status(201).json({ message: 'Success', data: null });
};

export const deleteReport = async (req, res) => {
  const { report_id } = req.params;

  let report;
  try {
    report = await Report.findById(report_id);
  } catch (error) {
    console.log(error);
  }

  if (report.status !== 0) {
    return res.status(400).json({ message: 'Your report already processed!' });
  }

  try {
    await Report.findByIdAndDelete(report_id);
  } catch (error) {
    return console.log(error);
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
    console.log(error);
  }
  const { total, status_0, status_1, status_2 } = {
    total: reports[0].totalCount[0] ? reports[0].totalCount[0].count : 0,
    status_0: reports[0].status_0[0] ? reports[0].status_0[0].count : 0,
    status_1: reports[0].status_1[0] ? reports[0].status_1[0].count : 0,
    status_2: reports[0].status_2[0] ? reports[0].status_2[0].count : 0,
  };

  res
    .status(200)
    .json({
      message: 'Success',
      data: { total, status_0, status_1, status_2 },
    });
};
