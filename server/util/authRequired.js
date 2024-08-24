// middleware for any-user-routes (TAs or Students)
module.exports = (req, res, next) => {
  if (!req.user) {
    req.session.oauth2return = req.originalUrl;
    return res.redirect('/precept/login');
  }
  return next();
};
