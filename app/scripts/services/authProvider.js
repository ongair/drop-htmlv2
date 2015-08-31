bbcApp.factory('AuthProvider',[
    '$http','$q','AuthService',
    function($http, $q, AuthService){
        AuthService.initialize();
        var authorizationResult = AuthService.isReady();
        var fullyAuthenticated = false;

        var authenticateBackend = function(authorizationResult){
            var deferred = $q.defer();
            var url = 'http://drop.ongair.im/api/auth/sign_in';
            if(authorizationResult){
                authorizationResult.me().done(function(me){
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

                    $http.post(url,user).then(function(response){
                        deferred.resolve(response);
                    }, function(error) {
                        deferred.reject(error);
                    });

                }).fail(function(error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        }

        return {
            isReady: function(){
                // if locally authenticated then connect to the backend
                if(!fullyAuthenticated && authorizationResult){
                    authenticateBackend(authorizationResult);
                }
                return authorizationResult;
            },

            authenticate: function(provider){
                var deferred = $q.defer();
                AuthService.authenticate(provider).then(function() {
                    if (AuthService.isReady()) {
                        authenticateBackend(AuthService.isReady()).then(function(response){
                            if(response.data.success == true){
                                fullyAuthenticated = true;
                            }
                            deferred.resolve(response);
                        },function(error){
                            deferred.reject(error);
                        });
                    }
                }, function(error){
                    deferred.reject(error);
                });

                return deferred.promise;
            },

            isFullyAuthenticated: function(){
                var url = 'http://drop.ongair.im/api/auth/status.json';
                if(!fullyAuthenticated){
                    $http.get(url).then(function(response){
                        if(response.data.logged_in == true){
                            fullyAuthenticated = true;
                        }
                    }, function(error){
                        // handle the error
                    });
                }
                return fullyAuthenticated;
            },
        }
    }
]);
