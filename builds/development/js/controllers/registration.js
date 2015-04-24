myApp.controller('RegistrationController', function($scope, $location, $firebaseAuth, Authentication) {

	var ref = new Firebase('https://redpandafirebase.firebaseio.com/');
	var auth = $firebaseAuth(ref);

	$scope.login = function() {		
		Authentication.login($scope.user)
		.then(function(user){
			$location.path("/meetings");
		}).catch(function(error) {
			$scope.message = error.message;
		});		
	}

	$scope.register = function() {		
		Authentication.register($scope.user)
		.then(function(user) {
			Authentication.login($scope.user);
			$location.path('/login');
		}).catch(function(error) {
			$scope.message = error.message;
		});	
	};
	
});