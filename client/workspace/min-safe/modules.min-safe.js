var app = angular.module('app', ['ngRoute', 'ngCookies'], ['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(true);
}]);
