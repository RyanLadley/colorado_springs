app.controller('cardController', ['$scope', function($scope){
  
    $scope.front = true;
    $scope.toggle = function() {
        $scope.front = !$scope.front;
    }

}]);
app.controller('sprintController', ['$scope', function($scope){
  
    $scope.cards = [
        name = "First Card",
        points = "1",
        description = "Mattis a semper rutrum in in blandit adipiscing ornare commodo vitae at erat vivamus fringilla maecenas in scelerisque platea auctor.Habitasse vestibulum."
    ]

}]);
var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.service('toggleService', function(){
    this.toggle = function(bool){
        return !bool;
    }
});