app.controller('pendingAdjustmentController', function($scope, $location, postRequestService){
    
    $scope.accountId = null;

    //sThe next few blocks controll the navigation of the tab
    $scope.page = 1;
    $scope.incrementPage = function(){
        $scope.page++
    }
    $scope.decrementPage = function(){
        $scope.page--
    }

    $scope.navLocation = function(firstSectionPage, lastSectionPage){
        if(lastSectionPage <  $scope.page){
            return 'nav-left'
        }
        else if(firstSectionPage >  $scope.page){
            return 'nav-right'
        }
        else{
            return 'nav-display'
        } 
    }

    //When the user selects a new vendor, call the backend and grab all pending transactions for this vendor
    $scope.retrieveTickets = function(){
        if($scope.vendorId && $scope.projectId){
            postRequestService.request('/api/tickets/pending/vendor/' +$scope.vendorId +'/project/' +$scope.projectId).then(function(success){
                $scope.pending = success.data.response;
            }) 
        }
        else{

        }
    }

    $scope.transaction = {
        tickets: []
    }

    $scope.addSelected = function(ticket){
        $scope.transaction.tickets.push(ticket)
    }

    $scope.setupTransaction = function(){
        $scope.transaction.expense = 0;
        for(var i = 0; i < $scope.transaction.tickets.length; i++){
            $scope.transaction.expense += Number($scope.transaction.tickets[i].cost)
        }

        $scope.transaction.vendor_id = $scope.vendorId
    }

    //Remove Element from ticket array
    $scope.removeTicket = function(index){
        $scope.transaction.tickets[index].selected = false
        $scope.transaction.tickets.splice(index, 1)
    }
});