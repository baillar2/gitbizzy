angular.module('app',['ngRoute'])
	.config(function($routeProvider){
		$routeProvider
			.when('/bizcard',{
				templateUrl: 'form.html',
				controller: 'formControl'
			})
	})

