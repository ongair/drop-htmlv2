appControllers.controller('TourCtrl', [
    '$scope',
    '$http',
    'AuthService',
    '$state',

    function ($scope, $http, AuthService, $state) {
        $scope.controllerName = 'tour';
        AuthService.initialize();

        $scope.connectUser = function(authorizationResult){
            if(authorizationResult){
                authorizationResult.me().done(function(me) {
                    var user = {
                        'name' : me.name,
                        'provider': authorizationResult.provider,
                        'uid':me.id,
                        'access_token': authorizationResult.oauth_token
                    }

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
                            console.log('server connect failed');
                            console.log(response.data);
                        }

                    }, function(data) {
                        // log error
                        console.log('An error has occured');
                        console.log(data);
                    });

                }).fail(function(err) {
                    //todo: when the OAuth flow failed
                });
            }
        }

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

        if(AuthService.isReady()) {
            $scope.connectedUser = true;
            $scope.connectUser(AuthService.isReady());
        }
    }

]);
