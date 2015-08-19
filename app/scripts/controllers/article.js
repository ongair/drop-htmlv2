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

        // verticle bearings
        $scope.drawerOffset = -70;
        $scope.drawerTop = 100;
        $scope.translateY = 0;
        $scope.startY = $scope.translateY;
        $scope.dragInProgress = false;
        $scope.drawerOpen = false;

        // horizontal bearings
        $scope.translateX = 0;
        $scope.startX = $scope.translateX;
        $scope.articleLeft = 0;
        $scope.articleRight = 0;
        $scope.panelWidth = 0;
        $scope.maxWidth = 100;
        $scope.skipVisible = 'hidden';
        $scope.likeVisible = 'hidden';

        $scope.dragStart = function($event, direction) {
            if(direction == 'verticle') {
                $scope.startY = $scope.translateY;
            } else {
                $scope.startX = $scope.translateX;
                $scope.drawerOffset = 0;
            }

            $scope.dragInProgress = true;
        }

        $scope.dragging = function($event, direction) {
            $event.preventDefault()

            if(!$scope.dragInProgress) {
                return;
            }

            if(direction == 'verticle') {
                $scope.translateY = $scope.startY + Math.floor($event.deltaY);
            } else {
                $scope.translateX = $scope.startX + Math.floor($event.deltaX);

                if($scope.translateX < 0) {
                    $scope.likeVisible = 'hidden';
                    $scope.skipVisible = 'visible';
                    $scope.panelWidth = -1 * $scope.translateX;
                } else {
                    $scope.likeVisible = 'visible';
                    $scope.skipVisible = 'hidden';
                    $scope.panelWidth = $scope.translateX;
                }
            }
        }

        $scope.dragEnd = function($event, direction) {

            if(direction == 'verticle') {
                if($scope.translateY > $scope.startY){
                    $scope.closeDrawer();
                } else {
                    $scope.openDrawer();
                }
            } else {

                if(Math.abs($scope.translateX) > 100){
                    if($scope.translateX > $scope.startX){
                        console.log($scope.translateX);
                        $scope.likeArticle();
                    } else {
                        console.log($scope.translateX);
                        $scope.skipArticle();
                    }
                } else {
                    $scope.resetArticle();
                }

                $scope.drawerOffset = 70;
            }

            $scope.startY = $scope.translateY;
            $scope.startX = $scope.translateX;
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

        $scope.likeArticle = function() {
            $scope.translateX = 0;
            $scope.articleLeft = 100;
            $scope.articleRight = 0;
            $scope.maxWidth = 0;
        }

        $scope.skipArticle = function() {
            $scope.translateX = 0;
            $scope.articleLeft = 0;
            $scope.articleRight = 100;
            $scope.maxWidth = 0;
        }

        $scope.resetArticle = function() {
            $scope.translateX = 0;
            $scope.articleLeft = 0;
            $scope.articleRight = 0;
            $scope.skipVisible = 'hidden';
            $scope.likeVisible = 'hidden';
        }
    }
]);
