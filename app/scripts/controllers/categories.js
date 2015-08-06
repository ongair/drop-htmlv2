bbcControllers.controller('CategoriesCtrl', ['$scope', '$http',
    function ($scope, $http) {

        $scope.controllerName = 'categories';

        $http.get('data/categories.json')
        .then(function(response){
            $scope.categories =  response.data;
        }, function(data) {
            // log error
            console.log('An error has occured');
            console.log(data);
        });
    }
]);
