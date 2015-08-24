appControllers.controller('ArticleCtrl', ['$scope', '$http','$stateParams',
    function ($scope, $http, $stateParams) {

        $scope.controllerName = 'article';
        $scope.term = $stateParams.term;

        $http.get('http://drop.ongair.im/api/articles/'+$stateParams.articleid+'.json')
        .then(function(response){
            $scope.article =  response.data;
        }, function(response) {
            // show error
        });
    }
]);
