myApp.factory('listFactory', function($http){

	// This is my dummyFactory. I usually add this into any project that 
	// I do. Just so that I can use it for reference as I add new Factories
	// below we have an example of how we would create a post request, as well 
	// as how we would create a get request. 


	var dummies = []

	var factory = {}

	factory.getLists = function(callback){
		$http.get('/list').then(function(data){
			callback(data.data);
		});
	}

	factory.getVideos = function(data, callback){
		// console.log("at listFactory.getVideos: ", data);
		$http.get('/videos/' + data).then(function(data){
			callback(data.data);
		});
	}

	factory.deleteList = function(data, callback){
		// console.log("at listFactory.deleteList: ", data);
		$http.get('/deleteList/' + data).then(function(data){
			callback(data.data);
		});
	}
	factory.deleteVideo = function(data, callback){
		console.log("at listFactory.deleteVideo: ", data);
		$http.post('/deleteVideo', data).then(function(data){
			callback(data.data);
		});
	}

	factory.addList = function(info, callback){
		// console.log("got to addList-factory");
		$http.post('/list', info).then(function(data){
			if(data.error){
				callback(data);
			} else {
				callback(data);
			}
		})
	}

	factory.addVideo = function(vidInfo, callback){
		// console.log("got to addList-factory");
		$http.post('/video', vidInfo).then(function(data){
			if(data.error){
				callback(data);
			} else {
				callback(data);
			}
		})
	}

	factory.changePosition = function(vidInfo, callback){
		// console.log("got to changePos-factory");
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