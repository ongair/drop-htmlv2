appControllers.controller('CategoriesCtrl', [
    '$scope',
    '$http',
    'AuthService',
    '$state',
    '$q',
    function ($scope, $http, AuthService, $state, $q) {

        $scope.controllerName = 'categories';
        $scope.finished_loading = false;
        $scope.categories = [];
        $scope.logged_in = false;
        $scope.message = '';


        function checkLogin(){
            var deferred = $q.defer();

            $http.get('http://drop.ongair.im/api/auth/status.json')
            .then(function(response){
                deferred.resolve(response.data.logged_in);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function getPreferences(){
            var deferred = $q.defer();

            $http.get('http://drop.ongair.im/api/auth/preferences.json')
            .then(function(response){
                deferred.resolve(response.data.categories);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function getCategories(){
            var deferred = $q.defer();

            $http.get('http://drop.ongair.im/api/categories.json')
            .then(function(response){
                deferred.resolve(response.data.data);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function checkIfSelected(id, userCategories){

            var selected = false;
            var k;
            for(k=0; k<userCategories.length; k++){
                if(!selected) {
                    if(userCategories[k].id == id){
                        selected = true;
                    }
                }
            }
            return selected;
        }

        function mergeCategories(categories, userCategories){
            var i;
            for(i=0; i<categories.length; i++){
                categories[i].selected = checkIfSelected(categories[i].id, userCategories);
            }
            return categories;
        }

        $scope.managePreferences = function(){
            $q.all([
                checkLogin(),
                getCategories(),
                getPreferences()
            ]).then(function(data){
                $scope.logged_in = data[0];
                $scope.categories = mergeCategories(data[1],data[2]);
                $scope.finished_loading = true;
            },function(response){
                $scope.message = response.data.error;
                $scope.finished_loading = true;
            });
        }

        $scope.toggleActivation = function(category) {
            if($scope.finished_loading === false) {
                return;
            }

            if(category.selected == true){
                category.selected = false;
            }
            else {
                category.selected = true;
            }
        }

        $scope.savePreferences = function(categories){
            if($scope.finished_loading === false) {
                return;
            }

            var myCategories = {
                'categories': []
            };

            // extract user selected categories
            angular.forEach(categories, function(category,key){
                if(category.selected == true){
                    this.push(category.id);
                }
            }, myCategories.categories);

            $http.post('http://drop.ongair.im/api/auth/personalize.json',myCategories)
            .then(function(response){
                // save was successful
                $state.transitionTo('articles');
            }, function(error){
                // show error
                $state.transitionTo('articles');
            });
        }

        // post user details to the api backend for authorization
        function authenticateBackend(user) {

            $http.post('http://drop.ongair.im/api/auth/sign_in',user)

            .then(function(response){
                $scope.checkLogin();

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

        AuthService.initialize();

        $scope.managePreferences();

    }
]);
