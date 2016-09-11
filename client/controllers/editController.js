myApp.controller('editController', function($scope, $location, $sce, $routeParams, editFactory){

	var count;

	editFactory.getVideoToEdit($routeParams.video, function(video){
		$scope.video = video[0];
	})

	$scope.deleteVideo = function(videoId){
		console.log("deleteVideo videoId: ", videoId);
		listFactory.deleteVideo(videoId, function(data){
			console.log(data);
			listFactory.getVideos($routeParams.video, function(vids){
				$scope.videos = vids[0]._videos;
				$scope.listTitle = vids[0].title;
			})
		})
	}

	$scope.updateReview = function(videoId){
		var star_count = [];
		if (!$scope.video.stars){
			// console.log("!scope.video.stars");
			star_count = $scope.video.rating;
		}
		else{
			for(var i=0;i<5;i++){
				if(i<$scope.video.stars){
					star_count.push(1);
				}
				else{
					star_count.push(0);
				}
			}
		}
		var review = {
			id: videoId,
			description: $scope.video.description,
			rating: star_count
		}
		console.log("got to updateReview", review);
		editFactory.updateReview(review, function(data){
			console.log(data);
			$location.url("/list/"+$routeParams.list);
		})
		

	}

	
	$scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

	

});

myApp.filter('trusted2', ['$sce', function ($sce) {
    return function(url) {
    	if(url){
            var video_id = url.split('v=')[1];
        return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video_id);
    }
    };
}]);