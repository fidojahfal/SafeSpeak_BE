import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: Number, required: true },
  place_report: { type: String, required: true },
  date_report: { type: Date, required: true },
  description: { type: String, required: true },
  evidence: { type: String, required: true },
  is_anonim: { type: Boolean, required: true },
  user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
  status: { type: Number, required: true },
  is_delete: { type: Boolean, required: true },
  created_at: { type: Date, required: true, default: Date.now },
  reason: { type: String, required: false, default: '' },
});

const Report = mongoose.model('report', reportSchema);

export default Report;
