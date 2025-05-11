const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const sendResponse = require('../Constants/response');
const crudPost = require('../Handler_Functions/CRUDS/crud_post');
const crudGet = require('../Handler_Functions/CRUDS/crud_get');

router.use('/post/user', crudPost);
router.use('/post/dininghall', crudPost);
router.use('/get/:resource', crudGet);


module.exports = router;