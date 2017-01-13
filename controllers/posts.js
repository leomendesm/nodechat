var mongoose = require('mongoose');
var Post = require('../models/Posts.js');
module.exports.findall = function(req, res) {
	Post.find(function(err, posts){
    	if(err){ return next(err); }
    	res.json(posts);
  	});
}
module.exports.save = function(req, res) {
	var posts = new Post({
	    title: req.body.title,
 		link: req.body.link
    });
	posts.save(function(err) {
   		if (err) throw err;
  		res.json(posts);
   	});
};
module.exports.find = function(req, res) {
	var id = req.params.id;
  	Post.findOne({_id : id}, function(err, posts){
    	res.json(posts);
  	});
}
module.exports.delete = function(req, res) {
  	var id = req.params.id;
  	Post.findByIdAndRemove(id, function(err){
  		if(err) res.send(err);
  		res.json({id : id});
  	});

}
module.exports.update = function(req, res) {
  	var id = req.params.id;
    Post.findOne({_id : id}, function(err, posts){
        if (err) throw err;
        posts.title = req.body.title || posts.title;
        posts.link = req.body.link || posts.link;
        posts.save();
        res.send(posts);
  	});
}
