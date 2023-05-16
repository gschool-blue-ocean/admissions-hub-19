var express = require('express');

var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login');
});


//Login takes that app.post

module.exports = router;

