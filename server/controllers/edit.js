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
				// console.log("***backend controller: updateReview", req.params.id);
				videoDb.find({_id: req.body._id}, function(err, video){
					if(err){
						console.log(err);
					} else {
						console.log("Changing the video!: ", video);
						video[0].description = req.body.description;
						video[0].rating = req.body.rating;
						video[0].title = req.body.title;
						video[0].save();

		console.log("**** video: ****", video);
		if(req.body.change){
			listDb.find({_id:req.body._list},function(err, foundlist){
				
				if(err){
					console.log(err);
				} else {
					// console.log("***Here's the list of videos: ****", foundlist[0]._videos[1]);
					for(var i=0; i< foundlist[0]._videos.length; i++){
						var changePosition = req.body.newPosition;
						videoDb.find({_id: foundlist[0]._videos[i]}, function(err,vid){
							console.log("VID: ", vid[0]);
							if(err){
								console.log("error finding video: ", err);
							}
							else{
								if(vid[0]._id == req.body._id){
									//I need to have this account for both a change and unchanged value
									vid[0].position = changePosition-1;
								}
								else if(vid[0].position > req.body.position && vid[0].position <= (changePosition-1) && req.body.position - (changePosition-1) < 0){
									vid[0].position --;
								}
								//problem here:
								else if((vid[0].position < req.body.position && vid[0].position >= (changePosition-1)) && req.body.position - (changePosition-1) > 0){
								console.log("\n\n\n Problem here:");
								console.log("vid[0].position: ", vid[0].position);
								console.log("req.body.position: ", req.body.position);
								console.log("req.body.newPosition", req.body.newPosition);
								// console.log("new value of position ++: ", vid[0].position ++);
								console.log("\n\n\n\n\n");
									vid[0].position ++;
								}
								
								
							vid[0].save();
						}
						})
						
					}
					// console.log("\n\n\n\n\n foundlist: ", foundList);
					// res.json(foundList);
				}
			})

}
						
						res.json(video);
					}
				
				})

			},
	}
})();