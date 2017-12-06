angular.module('helloWorldApp', [
    'ngRoute'
])


.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        }).when('/403', {
            templateUrl: 'error403.html',
            controller: 'LoginController'
        }).when('/500', {
            templateUrl: 'error500.html'
        }).when('/accueil', {
            templateUrl: 'views/desherence/accueil.html',
            controller: 'desherenceControllers'
        }).otherwise({
            redirectTo: '/accueil'
        });


    }])

.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
}]);