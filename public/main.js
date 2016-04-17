angular.module('app')
	.controller('bizControl', ['$scope', '$http', function($scope, $http){

		var s = $scope
		
		

	}])
angular.module('app')
	.controller('formControl', ['$scope', '$http', 'Upload', function($scope, $http, Upload){

		var s = $scope
		console.log('getuser fired')
		$http.get('/getUser')
			.then(function(serverData){
				console.log('returned user', serverData.data)
				s.user = serverData.data
				console.log('user to be used', s.user)
			})

		s.submit = function(){
			console.log('submit fired')
			var file = s.user.file || null
			var uploader = Upload.upload({
				url:'/api/update',
				data: s.user
			})
			uploader.then(function(serverData){
				console.log('got updated user', serverData.data)
				s.user = serverData.data
			})
		}

		s.submit = function(){
			console.log('submit fired', s.user)
			$http.post('/api/update', s.user)
				.then(function(serverData){
					$http.post('/api/getUpdate', serverData.data)
						.then(function(serverData){
							console.log('got updated user', serverData.data)
							s.user = serverData.data	
						})
				})
		}	
	}])
angular.module('app')
	.controller('cardControl', ['$scope', '$http', function($scope, $http){
		var s = $scope
		var login = window.location.pathname.split('/').pop()
		console.log(login)
		$http.get('/api/getcard/' + login)
			.then(function(serverData){
				console.log('get card', serverData.data)
				s.user = serverData.data
			})


	}])
