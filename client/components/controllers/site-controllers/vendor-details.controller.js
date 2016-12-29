app.controller('vendorDetailsController', function($scope, $rootScope, $location, $routeParams, postRequestService){
  
    $rootScope.loading = true;
    postRequestService.request('/api/vendor/details/' +$routeParams.vendorId ).then(function(success){
        $scope.vendor = success.data.response;

        $scope.pprtaCodes = getTicketsProjects($scope.vendor.tickets)

        $scope.total_expense = 0
        for(var i = 0; i < $scope.vendor.transactions.length; i++){
            $scope.total_expense += Number($scope.vendor.transactions[i].expense)
        }
        $rootScope.loading = false;
    })

    $scope.toggleTransactionDialog = false;
    $scope.displayTransactionDetails = function(transactionId){
        $scope.dialogTransaction = transactionId;
        $scope.toggleTransactionDialog = true;
    }

    $scope.displayTickets = false;
    $scope.buttonMessage = "View Tickets"
    $scope.toggleTable = function(){
        $scope.displayTickets = !$scope.displayTickets

        if($scope.displayTickets){
            $scope.buttonMessage = "View Transactions"
            if($scope.pprtaCodes.length > 0){
                $scope.selected.project = $scope.pprtaCodes[0]
            }
        }
        else{
            $scope.buttonMessage = "View Tickets"
        }
    }

    $scope.selected = {}
    $scope.$watch('selected.project', function(){
        console.log("fired")
        if($scope.selected.project){
            selectTicketsForDisplay($scope.selected.project.pprtaId)
        }
    })

    var selectTicketsForDisplay = function(pprtaId){
        $scope.tickets = []
        for(var i = 0; i < $scope.vendor.tickets.length; i++){
            if($scope.vendor.tickets[i].pprta_id == pprtaId){
                $scope.tickets.push($scope.vendor.tickets[i])
            }
        }
    }

    var getTicketsProjects = function(tickets){
        var uniqueCheck = {}
        var array = []

        for(var i = 0; i < tickets.length; i++){
            if(uniqueCheck.hasOwnProperty(tickets[i].pprta_id)) {
                continue;
            }
            array.push({pprtaId: tickets[i].pprta_id, pprtaNo: tickets[i].pprta_no, pprtaDescription: tickets[i].pprta_description});
            uniqueCheck[tickets[i].pprta_id] = 1;
        }
        return array
    }
});