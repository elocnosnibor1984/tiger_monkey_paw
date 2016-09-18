myApp.controller('mainController', function($scope, $window, $location, $sce, $routeParams, listFactory, editFactory){
	
	//******** LISTS ***********************************************************
	listFactory.getLists(function(lists){
		$scope.lists = lists;
	})
	$scope.showMe = false;
	$scope.createList = function(){
		$scope.showMe = !$scope.showMe;
	}

	$scope.addList = function(){
		console.log("got to addList-front end controller");
		listFactory.addList($scope.newList, function(data){
			//Get lists goes here
			listFactory.getLists(function(lists){
			$scope.lists = lists;
			$scope.newList = {};
			$scope.showMe = !$scope.showMe;
			})
		})
	}


//********** Videos ***********************************************************

var count;
var listForDelete;
var listOfLastVideo;

	$scope.getVideos = function(list){
		listForDelete = list;
		$scope.listTitle = list;
	listFactory.getVideos(list, function(vids){
		// console.log("getting videos from: ", $routeParams.id);
		// console.log("***videos***", vids);
		$scope.videos = vids[0]._videos;
		$scope.listTitle = vids[0].title;
		count = vids[0]._videos.length;
		// console.log("videos****", vids);
		// console.log("COUNT: ", count);
	})
}

	
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
		console.log("vid", vid);
		var _listId = vid._listId._id;
		var vid_rating = [];

		console.log("_listId: ", _listId);
		console.log("listOfLastVideo", listOfLastVideo);
		
		//Trying to get count right so position value is correct
		if(_listId == listOfLastVideo){
			count ++;
		}
		else{
			count = vid._listId._videos.length;
		}

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
			console.log("back from listFactory - addVideo: ", data);
			listFactory.getVideos(_listId, function(vids){
				// console.log("getting videos from: ", $routeParams.id);
				console.log("***videos***", vids);
				$scope.videos = vids[0]._videos;
				$scope.listTitle = vids[0].title;
				// count += 1;
				// console.log("count after adding a video: ", count);
				$scope.showVidForm = !$scope.showVidForm;
				$scope.v = {};
				console.log("data.data._list: ", data.data._list);
				listOfLastVideo = data.data._list;
				//Reloading window prevents position from getting screwed up when adding vids to different lists
				// $window.location.reload();
			})
		})
	}

	$scope.deleteList = function(list){
		console.log("deleteList: ", list._id);
		listFactory.deleteList(list._id, function(data){
			console.log(data);
			listFactory.getLists(function(lists){
				$scope.lists = lists;
				$scope.listTitle = "";
				$scope.videos = "";
		})
		// $window.location.reload();
		})

	}

	$scope.deleteVideo = function(video){
		var deleteStuff={
			video:video._id,
			list: video._list,
			position: video.position
		}
		console.log("DeleteStuff: ", deleteStuff);
		listFactory.deleteVideo(deleteStuff, function(data){
			console.log(data);
			//picking list to get videos from is a problem
			listFactory.getVideos(listForDelete, function(vids){
				$scope.videos = vids[0]._videos;
				$scope.listTitle = vids[0].title;
				count = vids[0]._videos.length;
			})
			// $window.location.reload();
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

	$scope.searchVideos = function(search){
 		console.log('at the searchVideos controller function', search);
 		listFactory.searchVideos(search, function(data){
 			console.log("search results:", data);
 			$scope.videos = data;
 			console.log("data[0]._list: ", data[0]._list);
 			listFactory.searchList(data[0]._list, function(data){
 				$scope.listTitle = data[0].title;
 			});
 			// $scope.feed = false;
 		});
 	};

//******************* Change Video Order ***********************

$scope.order = 'position';

$scope.position = function(){
	$scope.order = 'position';
}

$scope.title = function(){
	$scope.order = 'title';
}
$scope.recent = function(){
	$scope.order = '-updatedAt';
}

$scope.rating = function(){
	$scope.order = '-rating';
}



//********************** See/Update Video ****************************

$scope.seeVideo = function(video){
	$scope.showVideo = video;
}

$scope.updateVideo = function(video){
		console.log("updateVideo on frontend controller: ", video);
		var star_count = [];
		var change = false;

		if (!video.newRating){
			// console.log("!scope.video.stars");
			star_count = video.rating;
		}
		else{
			for(var i=0;i<5;i++){
				if(i< video.newRating){
					star_count.push(1);
				}
				else{
					star_count.push(0);
				}
			}
		}
		console.log("\n\n\n\nvideo.position: ", video.position, "\n\n\n\n");

		if(video.newPosition && video.newPosition - video.position != 0){
			video.newPosition = Number(video.newPosition);
			change = true;
		}

		var review = {
			_id: video._id,
			title: video.title,
			description: video.description,
			rating: star_count,
			position: video.position,
			newPosition: video.newPosition,
			_list: video._list,
			change: change
		}
		console.log("got to updateReview", review);
		editFactory.updateReview(review, function(data){
			console.log(data);
			listFactory.getVideos(listForDelete, function(vids){
				// console.log("getting videos from: ", $routeParams.id);
				// console.log("***videos***", vids);
				$scope.videos = vids[0]._videos;
				$scope.listTitle = vids[0].title;
				count = vids[0]._videos.length;
				// console.log("videos****", vids);
				// console.log("COUNT: ", count);
			})
			// $location.url("/list/"+$routeParams.list);
		})
	}
});

//********************** Embed the youtube videos **********************

myApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
            var video_id = url.split('v=')[1];
        return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video_id);
    };
}]);