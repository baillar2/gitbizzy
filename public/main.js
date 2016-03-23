angular.module('app',[])

angular.module('app')
	.controller('bizControl', ['$scope', '$http', function($scope, $http){

		var s = $scope
		s.login = {}
		s.getInfo = function(){
			console.log(s.login)
			$http.get('https://api.github.com/users/' + s.login.name)
				.then(function(serverData){
					$http.post('/api/newuser', serverData.data)
						.then(function(serverData){
							console.log('saved', serverData.data)
						})
				})
		}

	}])