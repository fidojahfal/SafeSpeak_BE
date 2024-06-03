import { validationResult } from 'express-validator';
import Article from '../models/articleModel.js';

export const getAllArticles = async (req, res) => {
  let articles;

  try {
    articles = await Article.find({ is_delete: false });
  } catch (error) {
    return res.status(500).json({ message: 'Could not find articles!' });
  }
  res.status(200).json({ message: 'Success', data: { articles } });
};

export const insertArticle = async (req, res) => {
  const { title, content } = req.body;
  const file = req.file;

  const formData = new FormData();
  const blob = new Blob([file.buffer]);
  formData.append('file', blob);
  formData.append('upload_preset', `${process.env.CLOUD_TOKEN}`);

  let uploadImage;
  try {
    uploadImage = await fetch(process.env.CLOUD_LINK, {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to upload image!' });
  }

  if (!uploadImage.ok) {
    return res.status(400).json({ message: 'Failed to save your image!' });
  }
  const responseJson = await uploadImage.json();
  const imageUrl = responseJson.secure_url;

  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(401).json({ message: 'Invalid input from user!' });
  }

  const newArticle = new Article({
    title,
    content,
    image: imageUrl,
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
  console.log(req.body);

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
