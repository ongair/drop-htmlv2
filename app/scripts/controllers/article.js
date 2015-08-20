appControllers.controller('ArticleCtrl', ['$scope', '$http','$stateParams','$timeout',
    function ($scope, $http, $stateParams, $timeout) {
        // expect $stateParams.articleId

        $scope.controllerName = 'article';

        $http.get('http://drop.ongair.im/api/articles.json')
        .then(function(response){
            $scope.articles =  response.data.data;
        }, function(response) {
            // log error
        });

        $scope.destroyArticle = function($article) {
            var index = $scope.articles.indexOf($article);
            $scope.articles.splice(index,1);
        }

    }
]);
