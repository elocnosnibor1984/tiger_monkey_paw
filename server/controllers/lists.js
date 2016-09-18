var mongoose = require('mongoose');
var listDb = mongoose.model('listdb');
var videoDb = mongoose.model('videodb');

module.exports = (function() {
	return {
		addList: function(req, res){
			console.log(req.body, 'THIS IS REQ BODY-addList');
			list = new listDb(req.body);
			list.save(function(err, result){
				if(err){
					console.log(err);
					console.log('error creating a new post');
				} else {
					console.log('this is our new list',result);
					res.json(result);

				}
			})
		},

		getLists: function(req, res){
			listDb.find({}).populate('comments').sort({created_at: -1}).exec(function(err, lists){
				if(err){
					console.log(err);
				} else {
					// console.log("Lists****",lists);
					res.json(lists);
				}
			})
		},
		searchList: function(req, res){
			listDb.find({_id: req.params.id},function(err, list){
				if(err){
					console.log(err);
				} else {
					// console.log("Lists****",lists);
					res.json(list);
				}
			})
		},

		deleteList: function(req, res){
			listDb.find({_id:req.params.id},function(err, foundlist){
				if(err){
					console.log(err);
				} else {
					// console.log("***Here's the list of videos: ****", foundlist[0]._videos);
					for(var i=0; i< foundlist[0]._videos.length; i++){
						// console.log("NUMBER: ", i, foundlist[0]._videos[i]);
						videoDb.find({_id: foundlist[0]._videos[i]}).populate("_videos").exec(function(err,vid){
							console.log("VID: ", vid);
							if(err){
								console.log("error finding video: ", err);
							}
							else{
								vid[0].remove();
							}
		
						})
					}
					listDb.findByIdAndRemove(req.params.id, function(err, lists){
						if(err){
							console.log(err);
						} else {
							console.log(lists);
							res.json(lists);
						}
					})
					console.log("deleted list?");
					// res.json(foundlist);
				}
			})
		},

		changePos: function(req, res){
			console.log("**** List id: ****", req.body.list);
			listDb.find({_id:req.body.list},function(err, foundlist){
				if(err){
					console.log(err);
				} else {
					console.log("***Here's the list of videos: ****", foundlist[0]._videos[1]);
					for(var i=0; i< foundlist[0]._videos.length; i++){
						videoDb.find({_id: foundlist[0]._videos[i]}, function(err,vid){
							console.log("VID: ", vid[0]);
							if(err){
								console.log("error finding video: ", err);
							}
							else{
								if(vid[0]._id == req.body.video){
									vid[0].position = req.body.newPosition-1;
								}
								else if(vid[0].position > req.body.currentPosition && vid[0].position <= req.body.newPosition && req.body.currentPosition - req.body.newPosition < 0){
									vid[0].position --;
								}
								else if((vid[0].position < req.body.currentPosition || vid[0].position >= req.body.newPosition) && req.body.currentPosition - req.body.newPosition > 0){
									vid[0].position ++;
								}
								
								
							vid[0].save();
						}
						})
						
					}
					console.log(foundlist);
					res.json(foundlist);
				}
			})
		},

		deleteVideo: function(req, res){
			// console.log("**** List id: ****", req.body.list);
			var deleteFromList
			listDb.find({_id:req.body.list},function(err, foundlist){
				if(err){
					console.log(err);
				} else {
					// console.log("***Here's the list of videos: ****", foundlist[0]._videos);
					for(var i=0; i< foundlist[0]._videos.length; i++){
						// console.log("NUMBER: ", i, foundlist[0]._videos[i]);
						videoDb.find({_id: foundlist[0]._videos[i]}).populate("_videos").exec(function(err,vid){
							console.log("VID: ", vid);
							if(err){
								console.log("error finding video: ", err);
							}
							else if(vid[0]._id == req.body.video){
								console.log("REMOVE VIDEO!!!");
								vid[0].remove();
							}
							else if(vid[0].position > req.body.position){
								console.log("DECREMENT VIDEO!!!");
									vid[0].position --;
							}
							vid[0].save();
						
						})
					}
						for(var k = 0; k<foundlist[0]._videos.length; k++){
							videoDb.find({_id: foundlist[0]._videos[k]}).populate("_videos").exec(function(err,vid){
								if(vid[0]._id = req.body.video){
									console.log("DECREMENT VIDEO!!");
									vid[0].position --;
								}
							})
						}
						for(var j = 0; j < foundlist[0]._videos.length; j++){
							if(foundlist[0]._videos[j] == req.body.video){
								foundlist[0]._videos.splice(j,1);
							}
						foundlist[0].save();
					}
					console.log("list._videos == ", foundlist);
					res.json(foundlist);
				}
			})
		},

		addVideo: function(req, res){
				console.log(req.body, 'THIS IS REQ BODY-addVideo');
				video = new videoDb({title: req.body.title, url: req.body.url, description: req.body.description, rating: req.body.rating, _list: req.body._list_id, position: req.body.position});
				video.save(function(err, result){
					if(err){
						console.log(err);
						console.log('error creating a new post');
					} else {
						console.log("req.body._listId: ", req.body._list_d);
						listDb.findOne({_id: req.body._list_id}, function(err, list){
							console.log("***found the list for the video", list);
							list._videos.push(result._id);
							list.save(function(err){
								if(err){
									console.log("ERROR ADDING VIDEO TO LIST");
								}
								else{
									res.json(result);
								}
							})
						})
					}
				})
			},

			getVideos: function(req, res){
				// console.log("***backend controller: getVideos", req.params.id);
				listDb.find({_id: req.params.id}).populate('_videos').exec(function(err, videos){
					if(err){
						console.log(err);
					} else {
						// console.log(videos);
						res.json(videos);
					}
				})
			},

			searchVideos: function(req, res){
 			console.log("Backend Controller - searchVideos", req.body.text);
 			videoDb.find({$or: [
 					 {"title": new RegExp(req.body.text, "i")},
 					 {"description": new RegExp(req.body.text, "i")}
 				]}, function(err, response){
 				if(err){
 					console.log(err);
 				}
 				else{
 					console.log('at the findNames function', response);
 					res.json(response);
 				}
 			})
 		},
	}
})();