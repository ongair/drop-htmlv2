bbcControllers.controller('CategoriesCtrl', ['$scope', '$http',
    function ($scope, $http) {

        $scope.controllerName = 'categories';

        $http.get('http://drop.ongair.im/categories.json')
        .then(function(response){
            console.log(response);
            $scope.categories =  response.data.data;
        }, function(data) {
            // log error
            console.log('An error has occured');
            console.log(data);
        });
    }
]);
