myApp.controller('mainController', function($scope, listFactory){
	
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

})