app.directive('accountName', function() {
    return{
        restrict: 'E',
        scope: {
            accountId: '<',
            accountNo: '<',
            subNo: '<',
            shredNo: '<'
        },
        template: "<a href = '/overview/account/{{accountId}}'>{{accountName}}</a>",
        link:function($scope){
            //Determin Account Name
            $scope.name = ""
            if($scope.shredNo != 'None'){
                $scope.accountName = $scope.accountNo.toString() + "-" +$scope.subNo.toString() +"-" +$scope.shredNo.toString()
            }
            else if($scope.subNo != 'None'){
                $scope.accountName = $scope.accountNo.toString() + "-" +$scope.subNo.toString()
            }
            else{
                $scope.accountName = $scope.accountNo.toString()
            }
        }
        
    };
})