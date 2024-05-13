import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/api/v1', (req, res) => {
  return res.json({ message: 'Tes' });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
    app.listen(3000, () => {
      console.log('Listening to port 3000');
    });
  })
  .catch((error) => {
    console.log('Error: ', error);
  });
