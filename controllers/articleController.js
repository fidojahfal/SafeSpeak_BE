import { validationResult } from 'express-validator';
import Article from '../models/articleModel.js';
import storage from '../upload/storage.js';

export const getAllArticles = async (req, res) => {
  let articles;

  try {
    articles = await Article.find({ is_delete: false });
  } catch (error) {
    return res.status(500).json({ message: 'Could not find articles!' });
  }
  res.status(200).json({ message: 'Success', data: { articles } });
};

export const getArticleById = async (req, res) => {
  const { article_id } = req.params;
  let article;

  try {
    article = await Article.findById(article_id);
  } catch (error) {
    return res
      .status(422)
      .json({ message: "Can't find article specified by id!" });
  }

  if (article.is_delete) {
    return res.status(400).json({
      message:
        "Can't find your article, please make sure you article is not deleted!",
    });
  }

  res.status(200).json({ message: 'Success', data: { article } });
};

export const insertArticle = async (req, res) => {
  const { title, content } = req.body;
  const file = req.file;
  let imageUrl;

  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(401).json({ message: 'Invalid input from user!' });
  }

  try {
    imageUrl = await storage({ file });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const newArticle = new Article({
    title,
    content,
    image: imageUrl.path,
    is_delete: false,
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
  const image = req.file;

  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(401).json({ message: 'Invalid input from user!' });
  }

  let article;

  try {
    article = await Article.findById(article_id);
  } catch (error) {
    return res
      .status(422)
      .json({ message: 'Could not find article specified by id' });
  }

  if (article.is_delete) {
    return res.status(400).json({
      message:
        "Can't edit your article, please make sure you still have article specified by id!",
    });
  }

  if (typeof image === 'object') {
    const publicId = article.image.split('/').slice(-1)[0];

    try {
      await storage({ file: image, type: 1, old_name: publicId });
    } catch (error) {
      return res.status(400).json({ message: 'Could not upload your image!' });
    }
  }

  try {
    await Article.findByIdAndUpdate(article_id, { title, content });
  } catch (error) {
    return res
      .status(422)
      .json({ message: 'Could not find article specified by id' });
  }

  res.status(200).json({ message: 'Success', data: null });
};

export const deleteArticle = async (req, res) => {
  const { article_id } = req.params;

  try {
    await Article.findByIdAndUpdate(article_id, { is_delete: true });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete the article!' });
  }

  res.status(200).json({ message: 'Success', data: null });
};
