// middleware for admin-only routes
module.exports = (req, res, next) => {
  if (!req.user || req.user.student || !req.user._user.admin) {
    req.session.oauth2return = req.originalUrl;
    return res.redirect('/lab/login');
  }
  return next();
};
