// middleware for TA-only routes (no students!)
module.exports = (req, res, next) => {
  if (!req.user) {
    req.session.oauth2return = req.originalUrl;
    return res.redirect('/lab/login');
  }
  if (req.user.student) {
    return next('Accessing this page requires TA access. Click the CMULab icon to return home.');
  }
  return next();
};
  
