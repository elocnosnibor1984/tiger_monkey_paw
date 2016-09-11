var listController = require('../controllers/lists.js');
var editController = require('../controllers/edit.js');

module.exports = function(app){
	app.post('/dummies/:test', function(req, res){
		console.log(req.body);
		console.log(req.params.test)
		// mongooseController.getMongooses(req, res);
	})
	app.post('/list', function(req, res){
		console.log("got to addList-routes");
		console.log(req.body);
		listController.addList(req, res);
	})
	app.get('/list', function(req, res){
		console.log(req.body);
		listController.getLists(req, res);
	})
	app.get('/videos/:id', function(req, res){
		console.log("routes: videos/:id");
		listController.getVideos(req, res);
	})
	app.get('/deleteList/:id', function(req, res){
		console.log("routes: deleteList/:id");
		listController.deleteList(req, res);
	})
	app.post('/deleteVideo', function(req, res){
		console.log("routes: deleteVideo");
		listController.deleteVideo(req, res);
	})
	app.post('/video', function(req, res){
		console.log("got to addVideo-routes");
		console.log(req.body);
		listController.addVideo(req, res);
	})
	app.post('/updateReview', function(req, res){
		console.log("got to updateReview-routes");
		console.log(req.body);
		editController.updateReview(req, res);
	})
	app.get('/video/edit/:id', function(req, res){
		// console.log("got to editVideo-routes");
		editController.getVideoToEdit(req, res);
	})
	app.post('/changePos', function(req, res){
		console.log("got to changePos-routes");
		console.log(req.body);
		listController.changePos(req, res);
	})
}