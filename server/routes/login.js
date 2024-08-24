const express = require('express');
const passport = require('passport');

const router = express.Router();

/* GET login */
router.get('/',
  (req, res, next) => {
    // set return page url if necessary
    if (req.query.return) {
      req.session.oauth2return = req.query.return;
    }
    next();
  },
  // authenticate using passport, get email and basic profile info
  passport.authenticate('google', { scope: ['email', 'profile'] }));

/* GET login callback */
router.get('/callback',
  // authenticate using passport
  passport.authenticate('google'),
  (req, res) => {
    // redirect to original page if that exists
    // otherwise, redirect to home for TAs or the qrcode for students
    const default_path = req.user.student ? '/lab/qrcode' : '/lab/ta';

    var redirect = '/lab';
    if (req.session.oauth2return) {
      redirect += req.session.oauth2return;
      delete req.session.oauth2return;
    } else {
      console.log(`- No specified oauth2return for user ${req.user._user._id}'s login request, rerouting to ${default_path}`);
      redirect = default_path;
    }
    res.redirect(redirect);
  });

module.exports = router;
