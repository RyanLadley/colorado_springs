app.controller('ticketAdjustmentController', function($scope, $location, postRequestService){

    $scope.page = 1;
    $scope.incrementPage = function(){
        $scope.page++
    }
    $scope.decrementPage = function(){
        $scope.page--
    }

    $scope.navLoc = function(currentPage){
        if(currentPage <  $scope.page){
            return 'nav-left'
        }
        else if(currentPage >  $scope.page){
            return 'nav-right'
        }
        else{
            return 'nav-display'
        } 
    }
    $scope.tickets = []
    $scope.search = {}
    $scope.searchTickets = function(){
        postRequestService.request('/api/tickets/search', $scope.search).then(function(success){
            $scope.tickets = success.data.response;
        }) 
    }

    $scope.select = function(ticket){
        postRequestService.request('/api/vendor/materials/' +ticket.vendor_id).then(function(success){
            $scope.materials = success.data.response;
            ticket.cost = Number(ticket.cost)
            ticket.quantity = Number(ticket.quantity)
            
            console.log(ticket.district)
            $scope.showDistricts = ticket.district != "None"
        
            $scope.selected = ticket
        }) 
    }

    $scope.updateTicket = function(ticket){
        //If the user does not have districts checked, make sure all districts are removed from the object
        if(!$scope.showDistricts){
            delete $scope.tickets.district
        }
    
        postRequestService.request('/api/tickets/update', ticket).then(function(success){
            $location.url("/vendors/" +ticket.vendor_id)
        }) 

    }

    $scope.deleteTicket = function(ticket){
        postRequestService.request('/api/tickets/delete/'+ ticket.ticket_id).then(function(success){
            $location.url("/vendors/" +ticket.vendor_id)
        }) 

    }
});