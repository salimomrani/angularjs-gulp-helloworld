angular.module('helloWorldApp')
    .controller('desherenceControllers', [
        '$scope',
        function($scope) {
            console.log('Loaded.');
            $scope.message = 'Hello World Test';
        }
    ]);
