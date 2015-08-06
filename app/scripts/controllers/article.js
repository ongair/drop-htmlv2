bbcControllers.controller('ArticleCtrl', ['$scope', '$http',
    function ($scope, $http) {

        $scope.controllerName = 'article';

        $http.get('data/articles.json')
        .then(function(response){
            //console.log(response);
            $scope.article =  response.data.data[0];
        }, function(response) {
            // log error
        });
    }
]);
