app.controller('dateSelectController', function($scope, $cookies, $location, postRequestService){

    $scope.$watch('date', function(){
        $scope.displayCalendar = false;
    })
});