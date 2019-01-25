const express = require('express');

const router = express.Router();

/* GET home page */
router.get('/', (req, res) => {
  res.render('index', {
    course: process.env.CMULAB_COURSE,
    loc: process.env.CMULAB_LOC,
  });
});

router.get('/success', (req, res) => {
  res.render('success', {
    course: process.env.CMULAB_COURSE,
    loc: process.env.CMULAB_LOC,
  });
});

module.exports = router;