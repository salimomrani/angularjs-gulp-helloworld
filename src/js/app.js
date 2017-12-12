angular.module('helloWorldApp', ['ngRoute'])


.config(['$routeProvider','$locationProvider',
    function ($routeProvider,$locationProvider) {
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

        // $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');
    }]);
