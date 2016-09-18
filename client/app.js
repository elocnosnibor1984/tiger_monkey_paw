var myApp = angular.module('Myapp', ['ngSanitize', 'angularModalService', 'ngAnimate', 'youtube-embed','ngRoute', 'ui.bootstrap']);
// We instantiate our application and we inject ngrouter so that it's available
// and so that we can use it to set up our routes below. 



// this is our router. You can choose to set your controllers on the partial
// but I prefer to set my controllers here because it's cleaner
(function(){
	myApp.config(function($routeProvider){
		$routeProvider
			.when('/', 
			{
				controller: 'mainController',
				templateUrl: "partials/main.html"
			})
			.when('/main', 
			{
				controller: 'mainController',
				templateUrl: "partials/main.html"
			})
			.when('/about', 
			{
				controller: 'mainController',
				templateUrl: "partials/about.html"
			})
			.when('/tips', 
			{
				controller: 'mainController',
				templateUrl: "partials/tips.html"
			})
			.when('/list/:id', 
			{
				controller: 'listController',
				templateUrl: "partials/list.html"
			})
			.when('/edit/:list/:video', 
			{
				controller: 'editController',
				templateUrl: "partials/edit.html"
			})
	})
}());