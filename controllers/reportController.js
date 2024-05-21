import Report from '../models/reportModel.js';

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
  res.status(201).json({ message: 'Success', data: null });
};
