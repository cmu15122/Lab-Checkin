// middleware for admin-only routes
module.exports = (req, res, next) => {
  if (!req.user) {
    req.session.oauth2return = req.originalUrl;
    return res.redirect('/precept/login');
  }
  if (req.user.student || !req.user._user.admin) {
    return next('Accessing this page requires administrator access. Click the CMULab icon to return home.');
  }
  return next();
};
