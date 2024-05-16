import jwt from 'jsonwebtoken';

async function authToken(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed!' });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
    req.userData = { id: decodedToken.id };
    next();
  } catch (error) {
    return next(res.status(401).json({ message: 'Authentication failed!' }));
  }
}

export default authToken;
