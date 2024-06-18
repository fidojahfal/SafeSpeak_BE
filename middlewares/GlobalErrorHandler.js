import multer from 'multer';

function ErrorHandler(err, req, res, next) {
  const error = err.message || 'Internal server error';

  if (res.headerSent) return next(err);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: 'The maximum file size is 15MB' });
  }

  res.status(500).json({ message: error });
}

export default ErrorHandler;
