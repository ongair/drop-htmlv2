appControllers.controller('SearchCtrl', ['$scope', '$http','$stateParams',
    function ($scope, $http, $stateParams) {

        $scope.controllerName = 'articles';
        $scope.term = $stateParams.term;
        $scope.articles = [];

        $scope.searchArticles = function() {

            if($scope.term.length < 3){
                return;
            }

            $http.post('http://drop.ongair.im/api/articles/search.json',{'term':$scope.term})
            .then(function(response){
                $scope.articles =  response.data.data;

            }, function(response) {
                // show error
            });
        }

        $scope.clearSearch = function() {
            $scope.articles = [];
        }

        $scope.searchArticles();
    }
]);
