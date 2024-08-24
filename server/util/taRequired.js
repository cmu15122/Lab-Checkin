// middleware for user-only routes (no students!)
module.exports = (req, res, next) => {
    if (!req.user || req.user.student) {
      req.session.oauth2return = req.originalUrl;
      return res.redirect('/lab/login');
    }
    return next();
  };
  