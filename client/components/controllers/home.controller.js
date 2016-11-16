app.controller('homeController', function($scope, $cookies, $location, postRequestService){

    $scope.logout = function(){
        $cookies.remove('token')
    }
});