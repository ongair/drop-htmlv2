appControllers.controller('ShareCtrl', [
    '$scope',
    'AuthService',
    '$state',

    function ($scope, AuthService, $state) {
        $scope.controllerName = 'share';

        if(AuthService.isReady()) {
            $scope.connectedUser = true;
            $state.transitionTo('articles');
            // fetch the user session from the backend
            // redirect the user using the new session to articles
        }
    }

]);
