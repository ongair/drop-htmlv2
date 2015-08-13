bbcControllers.controller('LoginCtrl', [
    '$scope',
    '$http',
    'AuthService',
    '$state',

    function ($scope, $http, AuthService,$state) {
        $scope.controllerName = 'login';

        AuthService.initialize();

        $scope.authenticate = function(provider) {
            AuthService.authenticate(provider).then(function() {
                if (AuthService.isReady()) {
                    $scope.connectedUser = true;
                    // login successful create a session and connect it to the
                    // backend to allow api requests
                    $state.transitionTo('articles');

                } else {
                    // show an error message
                }
            });
        };

        //sign out clears the OAuth cache, the user will have to reauthenticate when returning
        $scope.signOut = function() {
            AuthService.clearCache();
            $scope.connectedUser = false
            console.log('loged out');
            // todo:
            // end the backend session
            // somewhere redirect the user to login
        }

        if(AuthService.isReady()) {
            $scope.connectedUser = true;

            // fetch the user session from the backend
            // redirect the user using the new session to articles
        }

    }
]);
