app.controller('dateSelectController', function($scope, $cookies, $location, postRequestService){

    //When a date is selected, close the calender
    $scope.$watch('date', function(){
        $scope.displayCalendar = false;
    })
});