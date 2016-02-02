var bbcApp = angular.module('bbcApp', [
    'ngAnimate',
    'ngTouch',
    'ui.bootstrap',
    'appControllers',
    'appServices',
    'appDirectives',
    'appFilters',
    'ui.router',
    'ngResource',
    'ngSanitize',
    'angularMoment',
    'angular-loading-bar',
    'angular-gestures'
]);

bbcApp.config(function($stateProvider, $urlRouterProvider, hammerDefaultOptsProvider, $compileProvider ){

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(whatsapp):/);

    $stateProvider
    .state('tour', {
        url: "/tour",
        templateUrl: "partials/tour.html",
        controller: 'TourCtrl'
    })

    .state('customize', {
        url: "/customize",
        templateUrl: "partials/categories.html",
        controller: 'CategoriesCtrl'
    })

    .state('dropping', {
        url: "/dropping",
        templateUrl: "partials/dropping.html",
        controller: 'DroppingCtrl'
    })

    .state('share', {
        url: "/share",
        templateUrl: "partials/share.html",
        controller: 'ShareCtrl'
    })

    .state('articles', {
        url: "/articles",
        templateUrl: "partials/articles.html",
        controller: 'ArticlesCtrl'
    })

    .state('articlesView', {
        url: "/articles/:articleid",
        templateUrl: "partials/article.html",
        controller: 'ArticleCtrl'
    })

    .state('article', {
        url: "/article/:articleid/:term",
        templateUrl: "partials/article.html",
        controller: 'ArticleCtrl'
    })

    .state('search', {
        url: "/search/:term",
        templateUrl: "partials/search.html",
        controller: 'SearchCtrl'
    })

    .state('terms', {
        url: "/terms",
        templateUrl: "partials/terms.html"
    });

    $urlRouterProvider.otherwise('/tour');

    hammerDefaultOptsProvider.set({
        recognizers: [
            [Hammer.Tap, {time: 250}],
            [Hammer.Pan, {time: 250}],
        ]
    });

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(whatsapp):/);

});

var appControllers = angular.module('appControllers', []);
var appServices = angular.module('appServices', []);
var appDirectives = angular.module('appDirectives', []);
var appFilters = angular.module('appFilters', []);
