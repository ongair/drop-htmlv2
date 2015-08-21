appControllers.controller('SearchCtrl', ['$scope', '$http',
    function ($scope, $http) {

        $scope.controllerName = 'articles';
        $scope.myInterval = 0;
        $scope.noWrapSlides = false;

        $http.get('http://drop.ongair.im/api/articles.json')
        .then(function(response){
            var slides = $scope.articles =  response.data.data;
        }, function(data) {
            // log error
        });
    }
]);