app.controller('ticketEntryController', function($scope, $location, postRequestService){


    //When a date is selected, close the calender
    $scope.$watch('vendorId', function(){
        if($scope.vendorId){
            postRequestService.request('/api/vendor/materials/' +$scope.vendorId).then(function(success){
                $scope.materials = success.data.response;
                $scope.tickets = []
                $scope.newTicket()
                $scope.showButtons = true
            }) 
        } 
    })

    $scope.submitTickets = function(){
        //Modify all tickets for backend processing
        for(var i = 0; i < $scope.tickets.length; i++){
            //If the user does not have districts checked, make sure all districts are removed from the object
            if(!$scope.showDistricts){
                delete $scope.tickets[i].district
            }

            $scope.tickets[i].pprta_id = $scope.projectId,
            $scope.tickets[i].material_id = $scope.tickets[i].material.material_id
            delete $scope.tickets[i].material
        }
    
        postRequestService.request('/api/tickets/new/batch', $scope.tickets).then(function(success){
            $location.url("/")
        }) 

    }

    $scope.newTicket = function(){
        $scope.tickets.push({
            vendor_id: $scope.vendorId,
            cost:0
        })

        //If this is not the first ticket, make the date and material match
        //The previous entry
        i = $scope.tickets.length - 1
        if( i > 0){
            $scope.tickets[i].date = $scope.tickets[i-1].date
            $scope.tickets[i].material = $scope.tickets[i-1].material
            if($scope.tickets[i-1].district){
                $scope.tickets[i].district = $scope.tickets[i-1].district
            }
        }
    }

    //Remove Element from ticket array
    $scope.removeTicket = function(index){
        $scope.tickets.splice(index, 1)
    }

    $scope.calulateCost = function(ticket){
        if(ticket.material == undefined || ticket.material.cost == undefined || ticket.quantity == undefined){
            ticket.cost = 0
        }
        else{
            ticket.cost = ticket.material.cost * ticket.quantity
        }
    }
});