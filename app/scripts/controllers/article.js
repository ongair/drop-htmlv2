appControllers.controller('ArticleCtrl', ['$scope', '$http','$stateParams',
    function ($scope, $http, $stateParams) {
        // expect $stateParams.articleId

        $scope.controllerName = 'article';

        $http.get('http://drop.ongair.im/api/articles/'+$stateParams.articleId+'.json')
        .then(function(response){
            response.data.image_url = 'http://ichef-1.bbci.co.uk/news/976/cpsprodpb/11F0A/production/_84928437_028590051-1.jpg';
            $scope.article =  response.data;
        }, function(response) {
            // log error
        });
    }
]);
