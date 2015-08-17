appControllers.controller('ArticleCtrl', ['$scope', '$http','$stateParams',
    function ($scope, $http, $stateParams) {
        // expect $stateParams.articleId

        $scope.controllerName = 'article';

        $http.get('http://drop.ongair.im/api/articles/'+$stateParams.articleId+'.json')
        .then(function(response){
            $scope.article =  response.data;
        }, function(response) {
            // log error
        });
    }
]);
