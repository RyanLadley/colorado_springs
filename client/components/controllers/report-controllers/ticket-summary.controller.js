app.controller('ticketSummaryController', function($scope, $rootScope, dateFromString, postRequestService){
    $scope.options = {
            chart: {
            type: 'multiBarChart',
            height: 450,
            stacked: true,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 65
            },
            x: function(d){ return [d.project_no, d.project_description].join(" - "); },
            y: function(d){ return d.amount; },
            useInteractiveGuideline: true,

            color: d3.scale.category10().range(),
            duration: 300,

            xAxis: {
                axisLabel: 'Project',
                showMaxMin: false,
            },

            yAxis: {
                axisLabel: 'Amount',
                axisLabelDistance: 20,
                tickFormat: function(d){
                    return "$" + d3.format(",.2f")(Number(d));
                },
            },
            tooltip: {
                valueFormatter: function(d) {
                    return "$"+d3.format(",.2f")(d);
                }
            }
        }
    };

    $scope.overviewSelected = true;
    $scope.filter = {
        start_date: "2017-01-01",
        end_date: "2017-12-31"
    }

    $scope.filterReport = function(){
        if(($scope.filter.start_date && $scope.filter.end_date) && (dateFromString.get($scope.filter.start_date) < dateFromString.get($scope.filter.end_date))){
            sendRequest()
        }
        else{
            alert("Please select a valid start and end date")
        }
    }


    postRequestService.request('/api/vendor/with-materials/listing').then(function(success){
        $scope.vendors = success.data.response;
    })


    $scope.overviewSelected = true;

    var sendRequest = function(){
        $rootScope.loading = true;
        console.log($scope.filter)
        postRequestService.request('/api/reports/tickets', $scope.filter).then(function(success){
            $scope.data = success.data.response;
            $rootScope.loading = false;
        })
    }
    sendRequest()

    $scope.selectAll = function(){
        if(!$scope.overviewSelected){
            $scope.overviewSelected = true
            $scope.filter.vendor_id = null
            for(var i = 0; i < $scope.vendors.length; i++){
                $scope.vendors[i].selected = false
            }
        }    
    }


    $scope.selectVendor = function(vendor){
        if(vendor.selected){
            $scope.selectAll()
        }
        else{
            $scope.overviewSelected = false
            for(var i = 0; i < $scope.vendors.length; i++){
                $scope.vendors[i].selected = false
            }

            vendor.selected = true
            $scope.filter.vendor_id = vendor.vendor_id

        }
    }

});