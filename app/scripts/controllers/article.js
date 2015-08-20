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

        // manage the article swipe actions
        $scope.pointerSettings = {
            'translateX': 0,
            'startX': 0,
            'dragging': false
        };

        $scope.dragStart = function($event){
            $scope.pointerSettings.dragging = true;
        }

        $scope.dragging = function($event){
            console.log($scope.pointerSettings.dragging);
        }

        $scope.dragEnd = function($event){
            $scope.pointerSettings.dragging = false;
        }

    }
]);
