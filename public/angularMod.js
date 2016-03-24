angular.module('app',['ngRoute'])
	.config(function($routeProvider){
		$routeProvider
			.when('/bizcard',{
				templateUrl: 'form.html',
				controller: 'bizControl'
			})
	})

angular.module('app')
	.factory('factory',[function(){
		
		var user = {}

		return user

	}])