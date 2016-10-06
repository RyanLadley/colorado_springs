var app = angular.module('app', ['ngRoute', 'ngCookies', 'mp.datePicker', 'nvd3'], ['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(true);
}]);
