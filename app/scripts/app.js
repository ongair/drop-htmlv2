var bbcApp = angular.module('bbcApp', [
    'ngRoute',
    'bbcControllers',
    'bbcServices'
]);

bbcApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        }).
        when('/categories', {
            templateUrl: 'partials/categories.html',
            controller: 'CategoriesCtrl'
        }).
        when('/articles', {
            templateUrl: 'partials/articles.html',
            controller: 'ArticlesCtrl'
        }).
        when('/article/:id', {
            templateUrl: 'partials/article.html',
            controller: 'ArticleCtrl'
        }).
        otherwise({
            redirectTo: '/login'
        });
    }
]);

var bbcControllers = angular.module('bbcControllers', []);
var bbcServices = angular.module('bbcServices', []);
