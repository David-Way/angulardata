var myApp = angular.module('myApp', ['ngRoute', 'appControllers', 'firebase']).constant('FIREBASE_URL', 'https://redpandafirebase.firebaseio.com/');

var appControllers = angular.module('appControllers', ['firebase']);

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(event, next, previous, error) {
		if(error === 'AUTH_REQUIRED') {
			$rootScope.message = "Log in to view this page";
			$location.path('/login');
		}
	});
}]);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'RegistrationController'
		})
		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'RegistrationController'
		})
		.when('/checkins/:uId/:mId', {
			templateUrl: 'views/checkins.html',
			controller: 'CheckinsController'
		})
		.when('/checkins/:uId/:mId/checkinsList', {
			templateUrl: 'views/checkinsList.html',
			controller: 'CheckinsController'
		})
		.when('/meetings', {
			templateUrl: 'views/meetings.html',
			controller: 'MeetingsController',
			resolve: { //only logged in users can access
				currentAuth: function(Authentication) {
					return Authentication.requireAuth();
				}
			}
		})
		.otherwise({
			redirectTo: '/login'
		});
}]);