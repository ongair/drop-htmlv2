appControllers.controller('CategoriesCtrl', ['$scope','$state','Categories','AuthProvider',
    function ($scope, $state, Categories, AuthProvider) {
        $scope.controllerName = 'categories';
        $scope.categories = Categories.get();
        $scope.loggedIn = AuthProvider.isFullyAuthenticated();
        $scope.loading = Categories.loading();

        $scope.toggleSelection = function(category) {
            Categories.toggleSelection(category);
        }

        $scope.savePreferences = function(){
            Categories.savePreferences();
            $state.transitionTo('articles');
        }

        // authenticate the user using open id loign
        $scope.authenticate = function(provider) {
            AuthProvider.authenticate(provider).then(function(response){
                if(response.data.success){
                    $scope.categories = Categories.get();
                }
            },
            function(error){
                console.log('error');
            });
        };
    }
]);
