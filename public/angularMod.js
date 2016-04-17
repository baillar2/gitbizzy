angular.module('app',['ngRoute', 'ngFileUpload'])
	.config(function($routeProvider){
		$routeProvider
			.when('/bizcard',{
				templateUrl: 'form.html',
				controller: 'formControl'
			})
	})

