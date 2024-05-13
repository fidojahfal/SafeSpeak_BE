import mongoose from 'mongoose';

const mahasiswaSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  nim: { type: Number, required: true },
  name: { type: String, required: true },
  jurusan: { type: String, required: true },
  telepon: { type: String, required: true },
});

const Mahasiswa = mongoose.model('mahasiswa', mahasiswaSchema);

module.exports = Mahasiswa;
