bbcControllers.controller('ArticlesCtrl', ['$scope', '$http',
    function ($scope, $http) {

        $scope.controllerName = 'articles';

        $http.get('http://drop.ongair.im/api/articles.json')
        .then(function(response){
            $scope.articles =  response.data.data;
        }, function(data) {
            // log error
        });
    }
]);
