var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.json({ title: 'training_lab_rest_api' });
});


module.exports = router;
