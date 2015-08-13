var bbcApp = angular.module('bbcApp', [
    'bbcControllers',
    'bbcServices',
    'ui.router',
    'ngResource',
    'angular-carousel',
    'ngTouch'
]);

bbcApp.config(function($stateProvider, $urlRouterProvider){

    $stateProvider

    .state('login', {
        url: "/login",
        templateUrl: "partials/login.html",
        controller: 'LoginCtrl'
    })

    .state('tour', {
        url: "/tour",
        templateUrl: "partials/tour.html",
        controller: 'TourCtrl'
    })

    .state('categories', {
        url: "/categories",
        templateUrl: "partials/categories.html",
        controller: 'CategoriesCtrl'
    })

    .state('articles', {
        url: "/articles",
        templateUrl: "partials/articles.html",
        controller: 'ArticlesCtrl'
    })

    .state('article', {
        url: "/article/:articleId",
        templateUrl: "partials/article.html",
        controller: 'ArticleCtrl'
    });

    $urlRouterProvider.otherwise('/tour');

});

var bbcControllers = angular.module('bbcControllers', []);
var bbcServices = angular.module('bbcServices', []);
