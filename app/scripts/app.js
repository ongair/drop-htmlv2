var bbcApp = angular.module('bbcApp', [
    'ngRoute',
    'bbcControllers'
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
        otherwise({
            redirectTo: '/login'
        });
    }
]);

var bbcControllers = angular.module('bbcControllers', []);
