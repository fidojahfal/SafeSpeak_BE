import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  is_delete: { type: Boolean, required: true },
  created_at: { type: Date, required: true, default: Date.now },
});

const Article = mongoose.model('article', articleSchema);

export default Article;
