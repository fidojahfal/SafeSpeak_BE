import mongoose from 'mongoose';

const mahasiswaSchema = new mongoose.Schema({
  nim: { type: Number, required: true },
  name: { type: String, required: true },
  jurusan: { type: String, required: true },
  telepon: { type: String, required: true },
  user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
});

const Mahasiswa = mongoose.model('mahasiswa', mahasiswaSchema);

export default Mahasiswa;
