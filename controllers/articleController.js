import Article from '../models/articleModel.js';

export const getAllArticles = async (req, res) => {
  let articles;

  try {
    articles = await Article.find();
  } catch (error) {
    return res.status(500).json({ message: 'Could not find articles!' });
  }
  res.status(200).json({ message: 'Success', data: { articles } });
};
