const postsController = require('../../controllers/apis/posts');
const express = require('express');
let router = express.Router();

router.use('/posts', postsController);

module.exports = router;