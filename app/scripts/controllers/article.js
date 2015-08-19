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

        $scope.drawerOffset = -70;
        $scope.drawerTop = 100;
        $scope.translateY = 0;
        $scope.startY = $scope.translateY;
        $scope.dragInProgress = false;
        $scope.drawerOpen = false;

        $scope.dragStart = function($event) {
            $scope.startY = $scope.translateY;
            $scope.dragInProgress = true;
        }

        $scope.dragging = function($event) {
            if($scope.dragInProgress) {
                $scope.translateY = $scope.startY + Math.floor($event.deltaY);
            }
            $event.preventDefault()
        }

        $scope.dragEnd = function($event) {
            if($scope.translateY > $scope.startY){
                $scope.closeDrawer();
            } else {
                $scope.openDrawer();
            }
            $scope.startY = $scope.translateY;
            $scope.dragInProgress = false;
        }

        $scope.toggleDrawer = function() {
            if($scope.drawerOpen){
                $scope.closeDrawer();
            } else {
                $scope.openDrawer();
            }
        }

        $scope.closeDrawer = function() {
            $scope.drawerTop = 100;
            $scope.drawerOffset = -70;
            $scope.drawerOpen = false;
            $scope.translateY = 0;
        }

        $scope.openDrawer = function() {
            $scope.drawerTop = 0;
            $scope.drawerOffset = 0;
            $scope.drawerOpen = true;
            $scope.translateY = 0;
        }
    }
]);
