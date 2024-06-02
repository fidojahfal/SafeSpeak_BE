import { validationResult } from 'express-validator';
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

export const insertArticle = async (req, res) => {
  const { title, content, image } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(401).json({ message: 'Invalid input from user!' });
  }

  const newArticle = new Article({
    title,
    content,
    image,
  });

  try {
    await newArticle.save();
  } catch (error) {
    return res.status(500).json({ message: 'Could not save your article!' });
  }
  res.status(201).json({ message: 'Success', data: { article: newArticle } });
};

export const updateArticle = async (req, res) => {
  const { title, content } = req.body;
  const { article_id } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(401).json({ message: 'Invalid input from user!' });
  }

  let article;

  try {
    article = await Article.findByIdAndUpdate(article_id, { title, content });
  } catch (error) {
    return res
      .status(422)
      .json({ message: 'Could not find article specified by id' });
  }

  res.status(200).json({ message: 'Success', data: { article } });
};
