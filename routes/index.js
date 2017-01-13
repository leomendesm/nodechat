const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Posts');
require('../models/Comments');
const posts = require('../controllers/posts.js');

router.get('/api/posts', posts.findall);
router.get('/api/posts/:id', posts.find);
router.put('/api/posts/:id', posts.update);
router.delete('/api/posts/:id', posts.delete);
router.post('/api/posts', posts.save);

router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

module.exports = router;