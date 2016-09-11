myApp.controller('listController', function($scope, $location, $sce, $routeParams, listFactory){

	var count;

	listFactory.getVideos($routeParams.id, function(vids){
		// console.log("getting videos from: ", $routeParams.id);
		// console.log("***videos***", vids);
		$scope.videos = vids[0]._videos;
		$scope.listTitle = vids[0].title;
		count = vids[0]._videos.length;
		console.log("videos****", vids);
		console.log("COUNT: ", count);
	})

	
	$scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

	$scope.showVidForm = false;
	$scope.addVideoForm = function(){
		console.log("got here");
		$scope.showVidForm = !$scope.showVidForm;
	}

	$scope.addVideoToList = function(){
		var vid = $scope.v;
		var _listId = $routeParams.id;
		var vid_rating = [];
		for(var i=0; i<5; i++){
			if(i<vid.rating){
				vid_rating.push(1);
			}
			else{
				vid_rating.push(0);
			}
		}
		var vidInfo = {
			title: vid.title,
			rating: vid_rating,
			description: vid.description,
			url: vid.url,
			position: count,
			_list_id: _listId
		}
		console.log("vidInfo: ", vidInfo);
		listFactory.addVideo(vidInfo, function(data){
			console.log(data);
			listFactory.getVideos($routeParams.id, function(vids){
				// console.log("getting videos from: ", $routeParams.id);
				// console.log("***videos***", vids);
				$scope.videos = vids[0]._videos;
				$scope.listTitle = vids[0].title;
				count = vids[0]._videos.length;
				console.log("count after adding a video: ", count);
				$scope.showVidForm = !$scope.showVidForm;
				$scope.v = {};
			})
		})
	}

	$scope.deleteList = function(){
		listFactory.deleteList($routeParams.id, function(data){
			console.log(data);
			//redirect to main.html
			$location.url("/main");
		})

	}

	$scope.deleteVideo = function(videoId, position){
		var deleteStuff={
			video:videoId,
			list:$routeParams.id,
			position: position
		}
		console.log("DeleteStuff: ", deleteStuff);
		listFactory.deleteVideo(deleteStuff, function(data){
			console.log(data);
			listFactory.getVideos($routeParams.id, function(vids){
				$scope.videos = vids[0]._videos;
				$scope.listTitle = vids[0].title;
				count = vids[0]._videos.length;
			})
		})
	}

	$scope.editReview = function(videoId){
		console.log("VideoId", videoId);
		$location.url("/edit/"+$routeParams.id+"/"+videoId);
	}

	$scope.changePosition = function(newPosition, currentPosition, videoId){
		console.log("Position: ", newPosition, currentPosition, videoId);
		var changePos = {
			newPosition: newPosition,
			currentPosition: currentPosition,
			video: videoId,
			list: $routeParams.id
		}
		listFactory.changePosition(changePos, function(data){
			console.log(data);
			listFactory.getVideos($routeParams.id, function(vids){
				$scope.videos = vids[0]._videos;
				$scope.listTitle = vids[0].title;
				$scope.v = {};
			})
		})
	}

});

myApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
    		// console.log("first split", url.split('v=')[1]);
    		// console.log("second split", url.split('&')[0]);
            var video_id = url.split('v=')[1];
        return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video_id);
    };
}]);