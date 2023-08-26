const path = require('path');

const express = require('express');
const router = express.Router();

const error404controller = require('../controller/error404controller.js');

router.use(error404controller.geterror404);

module.exports = router;