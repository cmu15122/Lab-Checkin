const QRCode = require('qrcode');
const express = require('express');
const authRequired = require('./../util/authRequired');
const config = require('./../util/config');

const router = express.Router();

router.use(authRequired);

router.get('/', (req, res) => {
  var opts = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    quality: 0.5,
    margin: 1,
    scale: 9,
    color: {
      dark: '#124429FF',
      light: '#E7BF03FF'
    }
  };

  QRCode.toDataURL(process.env.CMULAB_LOC + '/checkin/' + req.user._user._id, opts, (err, url) => {
    if (err) throw err;

    res.render('qrcode', {
      course: config.get('course'),
      user: req.user._user._id,
      qrcode_url: url,
      loc: process.env.CMULAB_LOC
    });
  });
});

module.exports = router;
