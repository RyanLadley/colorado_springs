app.controller('ticketTableController', function($scope, postRequestService, sortService){

    //Sort by the given column in ascending order
    //If the column has already been selected to be sorted, 
    //Switch the direction in which we are soring
    $scope.sortColumn = ''
    var ascending = true;
    $scope.sortTickets = function(column){
        if($scope.sortColumn != column){
            $scope.sortColumn = column
            ascending = true;
        }
        else{
            ascending = !ascending
        }
        $scope.tickets = sortService.sortTickets($scope.tickets, column, ascending)

    }

    $scope.isSelectedColumn = function(column){
        return column == $scope.sortColumn
    }
});