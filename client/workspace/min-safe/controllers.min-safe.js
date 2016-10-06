app.controller('accountController', ['$scope', '$location', function($scope, $location){
  

    $scope.transactions = [
        {
            vendor: "Granger",
            invoiceDate: "9/8/2017",
            datePaid: "10/2/2017",
            invoiceNum: "12A34B56C",
            description: "This is a short description",
            expensed: 100
        },
        {
            vendor: "Bob's Products Express",
            invoiceDate: "7/8/2017",
            datePaid: "10/7/2017",
            invoiceNum: "1212ASD12ASD478",
            description: "Still a short one",
            expensed: 9358
        },
        {
            vendor: "Lola's Bananaza",
            invoiceDate: "9/10/2017",
            datePaid: "10/2/2017",
            invoiceNum: "12A34B56C43HD",
            description: "This is alonger description. A lot of detail was need to descrbe this transaction, let me tell you",
            expensed: 56983.32
        },
        {
            vendor: "Granger",
            invoiceDate: "9/8/2017",
            datePaid: "10/2/2017",
            invoiceNum: "12A34B56C",
            description: "",
            expensed: 100
        },
        {
            vendor: "Bob's Products Express",
            invoiceDate: "7/8/2017",
            datePaid: "10/7/2017",
            invoiceNum: "1212ASD12ASD478",
            description: "This on will be a medium one. Not to long, or short.",
            expensed: 9358
        },
        {
            vendor: "Lola's Bananaza",
            invoiceDate: "9/10/2017",
            datePaid: "10/2/2017",
            invoiceNum: "12A34B56C43HD",
            description: "This is alonger description. A lot of detail was need to descrbe this transaction, let me tell you",
            expensed: 56983.32
        },
        {
            vendor: "Granger",
            invoiceDate: "9/8/2017",
            datePaid: "10/2/2017",
            invoiceNum: "12A34B56C",
            description: "This is a short description",
            expensed: 135.23
        },
        {
            vendor: "Bob's Products Express",
            invoiceDate: "7/8/2017",
            datePaid: "10/7/2017",
            invoiceNum: "1212ASD12ASD478",
            description: "Still a short one",
            expensed: 2329358.87
        },
        {
            vendor: "Lola's Bananaza",
            invoiceDate: "9/10/2017",
            datePaid: "10/2/2017",
            invoiceNum: "12A34B56C43HD",
            description: "This is alonger description. A lot of detail was need to descrbe this transaction, let me tell you. Lool this is longer than the other two!! Wow, I wonder.",
            expensed: 56983.32
        }
    ];

}]);
app.controller('dataInputController', ['$scope', '$location', function($scope, $location){
  

    //$scope.displayInvoiceCalender = false;


}]);
app.controller('expenseBreakdownController', ['$scope', function($scope){
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
}]);
app.controller('monthlyExpenseController', ['$scope', '$location', function($scope, $location){
    $scope.options = {
            chart: {
            type: 'lineChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 65
            },
            x: function(d){ return d.month; },
            y: function(d){ return d.amount; },
            useInteractiveGuideline: true,
            forceY: [0, 20000],

            color: d3.scale.category10().range(),
            duration: 300,

            xAxis: {
                axisLabel: 'Month',
                showMaxMin: false,
                staggerLabels: true,
                tickFormat: function(d){
                    return month[d];
                },
            },

            yAxis: {
                axisLabel: 'Amount',
                axisLabelDistance: 20,
                tickFormat: function(d){
                    return "$" + d3.format(",.2f")(d);
                },
            }
        }
    };

    var month = ["Janary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    $scope.data = [
        {
            key: "Budget",
            values: [{month: 0, amount: 23000},{month: 1, amount: 14356},{month: 2, amount: 21009},{month: 3, amount: 23000},{month: 4, amount: 14356},{month: 5, amount: 11009},
                     {month: 6, amount: 23000},{month: 7, amount: 14356},{month: 8, amount: 21009},{month: 9, amount: 23000},{month: 10, amount: 14356},{month: 11, amount: 11009}]
        },
        {
            key: "Actual",
            values: [{month: 0, amount: 21000},{month: 1, amount: 14656},{month: 2, amount: 21409},{month: 3, amount: 20000},{month: 4, amount: 10356},{month: 5, amount: 12009},
                     {month: 6, amount: 19000},{month: 7, amount: 11356},{month: 8, amount: 23009},{month: 9, amount: 24000},{month: 10, amount: 12356},{month: 11, amount: 10009}]
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
}]);
app.controller('overviewController', ['$scope', '$location', function($scope, $location){
  

    $scope.accounts = [
        {
            accountNo: "5221000",
            description: "In House Resurfacing",
            yearBudget: 2160938.00,
            miscTransfer: "",
            totalBudget: 2160938.00,
            expendToDate: 0.00,
            remainingBalance: 2160938.00,
            showSubaccount: false,

            subaccounts: [
                {
                    accountNo: "5221000-1",
                    description: "Maintainence Paving",
                    yearBudget: "",
                    miscTransfer: "",
                    totalBudget: 0.00,
                    expendToDate: 0.00,
                    remainingBalance: 0.00,
                    sub:[]
                },
                {
                    accountNo: "5221000-2",
                    description: "Structural Digout",
                    yearBudget: "",
                    miscTransfer: "",
                    totalBudget: 0.00,
                    expendToDate: 0.00,
                    remainingBalance: 0.00,
                    sub:[
                        {
                            accountNo: "5221000-2-1",
                            description: "North District Digout",
                            yearBudget: "",
                            miscTransfer: "",
                            totalBudget: 0.00,
                            expendToDate: 0.00,
                            remainingBalance: 0.00
                        },
                        {
                            accountNo: "5221000-2-2",
                            description: "South District Digout",
                            yearBudget: "",
                            miscTransfer: "",
                            totalBudget: 0.00,
                            expendToDate: 0.00,
                            remainingBalance: 0.00
                        },
                        {
                            accountNo: "5221000-2-3",
                            description: "East District Digout",
                            yearBudget: "",
                            miscTransfer: "",
                            totalBudget: 0.00,
                            expendToDate: 0.00,
                            remainingBalance: 0.00
                        },
                        {
                            accountNo: "5221000-2-4",
                            description: "West District Digout",
                            yearBudget: "",
                            miscTransfer: "",
                            totalBudget: 0.00,
                            expendToDate: 0.00,
                            remainingBalance: 0.00
                        },

                    ]
                }

            ]
        },
        {
            accountNo: "5222000",
            description: "Pothole Patching Repair",
            yearBudget: 2160938.00,
            miscTransfer: "",
            totalBudget: 2160938.00,
            expendToDate: 0.00,
            remainingBalance: 2160938.00,
            showSubaccount: false,

            subaccounts: [
                {
                    accountNo: "5222000-1",
                    description: "Asphalt Materials",
                    yearBudget: "",
                    miscTransfer: "",
                    totalBudget: 0.00,
                    expendToDate: 0.00,
                    remainingBalance: 0.00,
                    sub:[]
                },
                {
                    accountNo: "5222000-2",
                    description: "Propane",
                    yearBudget: "",
                    miscTransfer: "",
                    totalBudget: 0.00,
                    expendToDate: 0.00,
                    remainingBalance: 0.00,
                    sub:[]
                },
                {
                    accountNo: "5222000-3",
                    description: "Shovels/Rake/Etc",
                    yearBudget: "",
                    miscTransfer: "",
                    totalBudget: 0.00,
                    expendToDate: 0.00,
                    remainingBalance: 0.00,
                    sub:[]
                }

            ]
        }
    ];

}]);
app.controller('reportsController', ['$scope', '$location', function($scope, $location){

    $scope.reports = [
        {
            name: "Monthly Expense",
            link: "monthly-expense"
        },
        {
        	name: "Expense Breakdown",
        	link: "expense-breakdown"
        },
        {name: "Doughnut Graph"}
    ]
}]);
app.controller('sidebarController', ['$scope', '$location', function($scope, $location){
  

    $scope.icons = {
        overview: false,
        entry: false,
        reports: false,
        credits: false,
        adjustments: false
    }

    $scope.expand = false;
    $scope.toggleExpand = function(){
        $scope.expand = !$scope.expand;

        if($scope.expand){
            $scope.pos = {
            "width": "200px"
            };
            $scope.abs = {
                "left": "0"
            };
        }
        else{
           $scope.pos= {
            "width": "50"
            };
            $scope.abs = {
                "left": "-200"
            } 
        }   
    }


    $scope.$watch(function() {return $location.path();}, function(path){

        angular.forEach($scope.icons,function(value,index){
            $scope.icons[index] = false;
        });

        if(path === "/"){
            $scope.icons.home = true;
        }
        else if(/\/overview*/.test(path)){
            $scope.icons.overview = true;
        }
        else if(/\/entry*/.test(path)){
            $scope.icons.entry = true;
        }
        else if(/\/reports*/.test(path)){
            $scope.icons.reports = true;
        }
        else if(/\/credits*/.test(path)){
            $scope.icons.credits = true;
        }
        else if(/\/adjustments*/.test(path)){
            $scope.icons.adjustments = true;
        };
    });
}]);