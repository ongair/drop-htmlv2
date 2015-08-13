appControllers.controller('ArticleCtrl', ['$scope', '$http','$stateParams',
    function ($scope, $http, $stateParams) {
        // expect $stateParams.articleId

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
