myApp.factory('editFactory', function($http){

	var factory = {}

	factory.getVideoToEdit = function(data, callback){
		console.log("at editFactory.getVideoToEdit: ", data);
		$http.get('/video/edit/' + data).then(function(data){
			callback(data.data);
		});
	}

	factory.deleteVideo = function(data, callback){
		console.log("at listFactory.deleteVideo: ", data);
		$http.get('/deleteVideo/' + data).then(function(data){
			callback(data.data);
		});
	}


	factory.updateReview = function(vidInfo, callback){
		console.log("got to updateReview-factory", vidInfo);
		$http.post('/updateReview', vidInfo).then(function(data){
			if(data.error){
				callback(data);
			} else {
				callback(data);
			}
		})
	}

	factory.changePosition = function(vidInfo, callback){
		console.log("got to changePos-factory");
		$http.post('/changePos', vidInfo).then(function(data){
			if(data.error){
				callback(data);
			} else {
				callback(data);
			}
		})
	}

	return factory;
})