var mongoose = require('mongoose');
var listDb = mongoose.model('listdb');
var videoDb = mongoose.model('videodb');

module.exports = (function() {
	return {
			getVideoToEdit: function(req, res){
				// console.log("***backend controller: getVideos", req.params.id);
				videoDb.find({_id: req.params.id}, function(err, videos){
					if(err){
						console.log(err);
					} else {
						// console.log(videos);
						res.json(videos);
					}
				})
			},
			updateReview: function(req, res){
				console.log("***backend controller: updateReview", req.params.id);
				videoDb.find({_id: req.body.id}, function(err, video){
					if(err){
						console.log(err);
					} else {
						console.log(video);
						video[0].description = req.body.description;
						video[0].rating = req.body.rating;
						video[0].save();
						
						res.json(video);
					}
				})
			},
	}
})();