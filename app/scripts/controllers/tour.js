appControllers.controller('TourCtrl', [

    '$scope',
    '$http',
    'AuthService',
    '$state',

    function ($scope, $http, AuthService, $state) {

        $scope.controllerName = 'tour';
        AuthService.initialize();

        // post user details to the api backend for authorization
        function authenticateBackend(user) {

            $http.post('http://drop.ongair.im/api/auth/sign_in',user)

            .then(function(response){
                if(response.data.success == true){
                    $scope.connectedUser = true;
                    if(response.data.created == true){
                        $state.transitionTo('customize');
                    } else {
                        $state.transitionTo('articles');
                    }
                } else {
                    // authentication failure; show error
                }

            }, function(data) {
                // connection failure; show error
            });
        }

        // connect open id user with the api backend
        $scope.connectUser = function(authorizationResult) {
            if(authorizationResult){
                authorizationResult.me().done(function(me)
                {
                    var access_token = '';

                    if(authorizationResult.provider === 'twitter') {
                        access_token = authorizationResult.oauth_token;
                    } else {
                        access_token = authorizationResult.access_token;
                    }

                    var user = {
                        'name' : me.name,
                        'provider': authorizationResult.provider,
                        'uid':me.id,
                        'access_token': access_token
                    }

                    authenticateBackend(user);

                }).fail(function(err) {
                    //todo: when the OAuth flow failed
                });
            }
        }

        // authenticate the user using open id loign
        $scope.authenticate = function(provider) {
            AuthService.authenticate(provider).then(function() {
                if (AuthService.isReady()) {
                    $scope.connectUser(AuthService.isReady());
                } else {
                    // show an error message
                    console.log('login failed');
                }
            });
        };

        // take user to articles page if user is authenticated
        if(AuthService.isReady()) {
            $scope.connectedUser = true;
            $scope.connectUser(AuthService.isReady());
        }
    }

]);
