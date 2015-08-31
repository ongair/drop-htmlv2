appControllers.controller('TourCtrl', [
    '$scope','$http','AuthProvider','$state',
    function ($scope, $http, AuthProvider, $state) {
        $scope.controllerName = 'tour';

        $scope.authenticate = function(provider) {
            AuthProvider.authenticate(provider).then(function(response){
                if(response.data.success){
                    $state.transitionTo('articles');
                }
            },
            function(error){
                console.log('error');
            });
        };
    }
]);
