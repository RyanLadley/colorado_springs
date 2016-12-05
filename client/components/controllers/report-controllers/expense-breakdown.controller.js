app.controller('expenseBreakdownController', function($scope){
    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 500,
            x: function(d){return d.key;},
            y: function(d){return d.percentage;},
            showLabels: true,
            duration: 500,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            legend: {
                margin: {
                    top: 5,
                    right: 35,
                    bottom: 5,
                    left: 0
                }
            },
            tooltip: {
                valueFormatter: function(d) {
                    return d3.format(",.2f")(d);
                }
            }
        }
    };

    $scope.data = [
        {
            key: 522100,
            percentage: 30,
            value: 23440.43
        },
        {
            key: 522200,
            percentage: 10,
            value: 13440.43
        },
        {
            key: 522300,
            percentage: 20,
            value: 23540.43
        },
        {
            key: 522400,
            percentage: 15,
            value: 3440.43
        },
        {
            key: 522500,
            percentage: 15,
            value: 23430.43
        }
    ];

    $scope.overviewSelected = true;

    $scope.viewFilters = [
        {
            account: 52100,
            selected: false
        },
        {
            account: 52200,
            selected: false
        },
        {
            account: 52300,
            selected: false
        },
        {
            account: 52400,
            selected: false
        },
        {
            account: 52500,
            selected: false
        },
    ]
    $scope.filterSelect = function(id){

    }
});