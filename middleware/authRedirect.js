import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const authRedirectMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.redirect('/login.html');
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.redirect('/login.html');

    req.user = user;
    next();
  });
};

export default authRedirectMiddleware;
