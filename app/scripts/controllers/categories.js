appControllers.controller('CategoriesCtrl', [
    '$scope',
    '$http',
    'AuthService',
    '$state',

    function ($scope, $http, AuthService, $state) {

        $scope.controllerName = 'categories';
        $scope.finished_loading = false;
        $scope.categories = [];
        $scope.logged_in = false;
        $scope.user_categories = [];

        $scope.checkLogin = function(){
            $http.get('http://drop.ongair.im/api/auth/status.json')
            .then(function(response){
                $scope.logged_in = response.data.logged_in;
                $scope.getPreferences();
            }, function(data) {
                /* show error */
            });
        }

        $scope.getPreferences = function(){
            if(!$scope.logged_in){
                $state.transitionTo('tour');
            }
            else
            {
                $http.get('http://drop.ongair.im/api/auth/preferences.json')
                .then(function(response){
                    $scope.getCategories();
                }, function(data) {
                    /* show error */
                });
            }
        }

        $scope.getCategories = function() {
            $http.get('http://drop.ongair.im/api/categories.json')
            .then(function(response){
                $scope.categories =  response.data.data;
                $scope.done();
            }, function(data) { /* show error */ });
        }

        $scope.done = function() {
            $scope.finished_loading = true;
        }

        // combine categories with user selected ones
        $scope.mergePreferences = function() {

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
                console.log(response);
                $state.transitionTo('articles');
            }, function(error){
                // show error
                $state.transitionTo('articles');
            });
        }

        $scope.checkLogin();

    }
]);
