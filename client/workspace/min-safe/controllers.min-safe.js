app.controller('accountSelectController', ['$scope', '$location', 'postRequestService', 'monthsService', function($scope, $location, postRequestService, monthsService){
    

    postRequestService.request('/api/accounts/numbers').then(function(success){
        $scope.accounts = success.data.response;
    })


    $scope.displaySubaccounts = function(account){
        $scope.subaccounts = []
        $scope.shredouts = []

        if(account.sub_accounts.length > 0){
            $scope.subaccounts = account.sub_accounts
        } 
    }

    $scope.displayShredouts = function(subAccount){
        $scope.shredouts = []
        if(subAccount && subAccount.sub_accounts.length > 0){
            $scope.shredouts = subAccount.sub_accounts
        }
    }

    $scope.asssignReturnId = function(){
        if($scope.selectedShred && $scope.selectedShred.account_id){
            $scope.accountId = $scope.selectedShred.account_id
        }
        else if($scope.selectedSubaccount && $scope.selectedSubaccount.account_id > -1){
            $scope.accountId = $scope.selectedSubaccount.account_id
        }
        else{
           $scope.accountId = $scope.selectedAccount.account_id 
        }
    }

    //If an accountId is provided, this block will find it and display the proper dropdowns
    //for the user. 
    //TODO: Make this less terrible. This is run everytime the accountID is changed to allow for 
    //      for an accountId to be provided. Find a way to remove provided accountId with user selected.
    //      The use of two variables might be useful for this.
    $scope.refreshDisplay = function(){
        if($scope.accounts && $scope.accountId){
            var accountFound = false
            for( var i = 0; i < $scope.accounts.length; i++ ){
                if($scope.accounts[i].account_id == $scope.accountId){
                    $scope.selectedAccount = $scope.accounts[i]
                    $scope.displaySubaccounts($scope.accounts[i])
                    accountFound = true
                    break;
                }
                else{
                    for(var j = 0; j < $scope.accounts[i].sub_accounts.length; j++){
                       if($scope.accounts[i].sub_accounts[j].account_id == $scope.accountId){
                            $scope.selectedAccount = $scope.accounts[i]
                            $scope.displaySubaccounts($scope.accounts[i])
                            $scope.selectedSubaccount = $scope.accounts[i].sub_accounts[j]
                            $scope.displayShredouts($scope.accounts[i].sub_accounts[j])
                            accountFound = true
                            break;
                        }
                        else {
                            for(var k = 0; k < $scope.accounts[i].sub_accounts[j].sub_accounts.length; k++ ){
                                if($scope.accounts[i].sub_accounts[j].sub_accounts[k].account_id == $scope.accountId){
                                    $scope.selectedAccount = $scope.accounts[i]
                                    $scope.displaySubaccounts($scope.accounts[i])
                                    $scope.selectedSubaccount = $scope.accounts[i].sub_accounts[j]
                                    $scope.displayShredouts($scope.accounts[i].sub_accounts[j])
                                    $scope.selectedShred = $scope.accounts[i].sub_accounts[j].sub_accounts[k]
                                    accountFound = true
                                    break;
                                }
                            }
                            if(accountFound){
                                break;
                            }
                        } 
                    }
                    if(accountFound){
                        break;
                    }
                } 
            }
        }
    }

}])
app.controller('accountController', ['$scope', '$location', '$routeParams', 'postRequestService', 'monthsService', function($scope, $location, $routeParams, postRequestService, monthsService){
  
    postRequestService.request('/api/accounts/details/' +$routeParams.accountId).then(function(success){
        $scope.account = success.data.response;
        $scope.accountName = generateAccountName();
        $scope.account.remaining = Number($scope.account.total_budget) - Number($scope.account.expendetures)

        $scope.selectedMonth = d.getMonth()
        $scope.transactions = $scope.account.monthly_summary[$scope.selectedMonth]
        calculateTotal()

    })

    var generateAccountName = function(){
        if($scope.account.shred_no != "None"){
            return [$scope.account.account_no, $scope.account.sub_no, $scope.account.shred_no].join('-')
        }
        else if($scope.account.sub_no != "None"){
            return [$scope.account.account_no, $scope.account.sub_no].join('-')
        }
        return $scope.account.account_no
    }

    var d = new Date()
    $scope.months = monthsService.monthList();

    $scope.$watch('selectedMonth', function(){
        if ($scope.transactions){
            $scope.transactions = $scope.account.monthly_summary[$scope.selectedMonth]
            calculateTotal()
        }
    })

    var calculateTotal = function(){
   
        total = 0

        for (var i = 0; i < $scope.transactions.length; i++){
            total += Number($scope.transactions[i].expense)
        }

        $scope.month_total = total
    }
}]);
app.controller('adjustmentsController', ['$scope', '$location', function($scope, $location){
  

    $scope.display = {
    	transactions: true,
    	pending: false,
    	budget:false
    };

}]);
app.controller('adminController', ['$scope', '$location', function($scope, $location){

	$scope.users = [
		{
			name: "Chuck Chuckers",
			login: "TheChuck",
			email: "chuck@email.com",
			permissions: "2"
		},
		{
			name: "Lama Links",
			login: "TheRealLama",
			email: "Lama@email.com",
			permissions: "1"
		},
		{
			name: "Adminstrator Dan",
			login: "TrueAdmin2000",
			email: "admin@email.com",
			permissions: "0"
		}
	]

}]);
app.controller('dataInputController', ['$scope', '$location', function($scope, $location){
  

    $scope.display = {
    	transaction: true,
    	vendor: false
    };


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
app.controller('monthlyBreakdownController', ['$scope', '$location', function($scope, $location){
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
            x: function(d){ return d.month; },
            y: function(d){ return d.amount; },
            useInteractiveGuideline: true,
            forceY: [0, 20000],

            color: d3.scale.category10().range(),
            duration: 300,

            xAxis: {
                axisLabel: 'Month',
                showMaxMin: false,
                tickFormat: function(d){
                    return $scope.months[d];
                },
            },

            yAxis: {
                axisLabel: 'Amount',
                axisLabelDistance: 20,
                tickFormat: function(d){
                    return "$" + d3.format(",.2f")(d);
                },
            },
            tooltip: {
                valueFormatter: function(d) {
                    return "$"+d3.format(",.2f")(d);
                }
            }
        }
    };

    $scope.months = ["Janary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    $scope.data = [
        {
            key: "522000-1",
            values: [{month: 0, amount: 3000},{month: 1, amount: 4356},{month: 2, amount: 1009},{month: 3, amount: 3000},{month: 4, amount: 4356},{month: 5, amount: 1009},
                     {month: 6, amount: 3000},{month: 7, amount: 4346},{month: 8, amount: 1009},{month: 9, amount: 2000},{month: 10, amount: 4356},{month: 11, amount: 1009}]
        },
        {
            key: "522000-2",
            values: [{month: 0, amount: 2000},{month: 1, amount: 14656},{month: 2, amount: 21409},{month: 3, amount: 20000},{month: 4, amount: 10356},{month: 5, amount: 1009},
                     {month: 6, amount: 12300},{month: 7, amount: 1106},{month: 8, amount: 279},{month: 9, amount: 24000},{month: 10, amount: 12356},{month: 11, amount: 1009}]
        },
        {
            key: "522000-3",
            values: [{month: 0, amount: 300},{month: 1, amount: 956},{month: 2, amount: 2109},{month: 3, amount: 200},{month: 4, amount: 1056},{month: 5, amount: 1009},
                     {month: 6, amount: 1900},{month: 7, amount: 1136},{month: 8, amount: 909},{month: 9, amount: 24000},{month: 10, amount: 12356},{month: 11, amount: 1000}]
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
app.controller('monthlyExpenseController', ['$scope', '$location', 'monthsService', function($scope, $location, monthsService){

    $scope.months = function(n){
        return monthsService.getMonth(n)
    }

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
                    return $scope.months(d);
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
app.controller('overviewController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){
  
    $scope.expandAll = function(){
        for(var i = 0; i < $scope.accounts.length; i++){
            $scope.accounts[i].showSubaccount = true;
            for(var j = 0; j < $scope.accounts[i].sub_accounts.length; j++){
                $scope.accounts[i].sub_accounts[j].showSubaccount = true;
            }
        }
    }

    $scope.collapseAll = function(){
        for(var i = 0; i < $scope.accounts.length; i++){
            $scope.accounts[i].showSubaccount = false;
            for(var j = 0; j < $scope.accounts[i].sub_accounts.length; j++){
                $scope.accounts[i].sub_accounts[j].showSubaccount = false;
            }
        }
    }

    postRequestService.request('/api/accounts/overview').then(function(success){
        $scope.accounts = success.data.response;
    })

}]);
app.controller('pendingAdjustmentController', ['$scope', '$location', function($scope, $location){
	

    $scope.pendingDisplay = function(){
        $scope.pendingExpand = !$scope.pendingExpand;

        if($scope.pendingExpand){
            $scope.pendingSetPos = {
                "left": "0"
            };

            $scope.pendingSelectPos= {
                "left": "-1700px" //should mack with $tab-width in shared/_tab.scss
            }
        }
        else{
            $scope.pendingSelectPos = {
                "left": "0"
            };

            $scope.pendingSetPos = {
                "left": "1700px" //should mack with $tab-width in shared/_tab.scss
            }
        }
    }

    $scope.selectedPending = -1;
    $scope.setSelectedPendingTransaction = function(){
        
        console.log("pending")
	    $scope.selectedTransaction = {
	    		vendor: $scope.pending[$scope.selectedPending].vendor,
	            invoiceDate: $scope.pending[$scope.selectedPending].invoiceDate,
	            datePaid: $scope.prnding[$scope.selectedPending].datePaid,
	            invoiceNum: $scope.pending[$scope.sselectedPending].invoiceNum,
	            description: $scope.pending[$scope.selectedPending].description,
	            expensed: $scope.pending[$scope.selectedIndex].expensed
	    }
	}

    $scope.pending = [
        {
            vendor: "Why",
            invoiceDate: "9/8/2017",
            datePaid: "",
            invoiceNum: "12A34B56C",
            description: "This is a short description",
            expensed: 100
        },
        {
            vendor: "Bob's Products Express",
            invoiceDate: "7/8/2017",
            datePaid: "",
            invoiceNum: "1212ASD12ASD478",
            description: "Still a short one",
            expensed: 9358
        },
        {
            vendor: "Lola's Bananaza",
            invoiceDate: "9/10/2017",
            datePaid: "",
            invoiceNum: "12A34B56C43HD",
            description: "This is alonger description. A lot of detail was need to descrbe this transaction, let me tell you",
            expensed: 56983.32
        },
        {
            vendor: "Granger",
            invoiceDate: "9/8/2017",
            datePaid: "",
            invoiceNum: "12A34B56C",
            description: "",
            expensed: 100
        },
        {
            vendor: "Bob's Products Express",
            invoiceDate: "7/8/2017",
            datePaid: "",
            invoiceNum: "1212ASD12ASD478",
            description: "This on will be a medium one. Not to long, or short.",
            expensed: 9358
        },
        {
            vendor: "Lola's Bananaza",
            invoiceDate: "9/10/2017",
            datePaid: "",
            invoiceNum: "12A34B56C43HD",
            description: "This is alonger description. A lot of detail was need to descrbe this transaction, let me tell you",
            expensed: 56983.32
        },
        {
            vendor: "Granger",
            invoiceDate: "9/8/2017",
            datePaid: "",
            invoiceNum: "12A34B56C",
            description: "This is a short description",
            expensed: 135.23
        },
        {
            vendor: "Bob's Products Express",
            invoiceDate: "7/8/2017",
            datePaid: "",
            invoiceNum: "1212ASD12ASD478",
            description: "Still a short one",
            expensed: 2329358.87
        },
        {
            vendor: "Lola's Bananaza",
            invoiceDate: "9/10/2017",
            datePaid: "",
            invoiceNum: "12A34B56C43HD",
            description: "This is alonger description. A lot of detail was need to descrbe this transaction, let me tell you. Lool this is longer than the other two!! Wow, I wonder.",
            expensed: 56983.32
        }
    ];
}]);
app.controller('profileController', ['$scope', '$location', function($scope, $location){

	$scope.user = {
		name: "FirstName LastName",
		phoneNumber: "719-555-9876",
		email: "user@email.com",
		login: "Username64"
	}
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
        {
            name: "Monthly Breakdown",
            link: "monthly-breakdown"
        },
    ]
}]);
app.controller('sidebarController', ['$scope', '$location', function($scope, $location){
  

    $scope.icons = {
        overview: false,
        entry: false,
        reports: false,
        vendors: false,
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
        else if(/\/vendors*/.test(path)){
            $scope.icons.vendors = true;
        }
        else if(/\/adjustments*/.test(path)){
            $scope.icons.adjustments = true;
        };
    });
}]);
app.controller('transactionAdjustmentController', ['$scope', '$location', 'postRequestService', 'monthsService', function($scope, $location, postRequestService, monthsService){
	
    $scope.accountId = null;

    $scope.transactionsDisplay = function(){
    	$scope.expand = !$scope.expand;

        if($scope.expand){
            $scope.toPos = {
                "left": "0"
            };

            $scope.fromPos = {
            	"left": "-1700px" //should match with $tab-width in shared/_tab.scss
            }
        }
        else{
			$scope.fromPos = {
                "left": "0"
            };

            $scope.toPos = {
            	"left": "1700px" //should match with $tab-width in shared/_tab.scss
            }
        }
    }

    //TODO figure out why transactionTypeId needs to be a number and vendorId does not
    $scope.selectedIndex = -1;
    $scope.setSelectedTransaction = function(){
	    $scope.selectedTransaction = {
                transactionId:$scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].transaction_id,
                accountId: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].account_id,
	    		vendorId: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].vendor_id,
	            invoiceDate: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].invoice_date,
	            datePaid: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].date_paid,
	            invoiceNo: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].invoice_no,
                transactionTypeId: Number($scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].transaction_type_id), 
	            description: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].description,
	            expense: Number($scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].expense)
	    }
        console.log($scope.selectedTransaction)
	}

    postRequestService.request('/api/accounts/numbers').then(function(success){
        $scope.accounts = success.data.response;
    })

    $scope.$watch('accountId', function(){
        if($scope.accountId){
            postRequestService.request('/api/transaction/account/' +$scope.accountId).then(function(success){
                $scope.account = success.data.response;
            }) 
        } 
    })

    var d = new Date()
    $scope.months = monthsService.monthList();
    $scope.selectedMonth = d.getMonth()

    $scope.$watch('selectedMonth', function(){
        if ($scope.transactions){
            $scope.transactions = $scope.account.monthly_summary[$scope.selectedMonth]
        }
    })

   
}]);
app.controller('transactionEntryController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){
	
    postRequestService.request('/api/accounts/numbers').then(function(success){
        $scope.accounts = success.data.response;
    })

    postRequestService.request('/api/vendor/listing').then(function(success){
        $scope.vendors = success.data.response;
    })

    postRequestService.request('/api/transaction/types').then(function(success){
        $scope.types = success.data.response;
    })

    $scope.submitTransaction = function(){
        //If the transaction has an Id, we know we are updateing an existing transaction.
        //If it does not, we are creating a new transaction
       if($scope.transaction.transactionId){
            postRequestService.request('/api/transaction/update', $scope.transaction).then(function(success){
               $location.url('/') 
            })
        }
        else{
            postRequestService.request('/api/transaction/new', $scope.transaction).then(function(success){
               $location.url('/') 
            })
        }
    }

}]);
app.controller('vendorDetailsController', ['$scope', '$location', '$routeParams', 'postRequestService', function($scope, $location, $routeParams, postRequestService){
  
    postRequestService.request('/api/vendor/details/' +$routeParams.vendorId ).then(function(success){
        $scope.vendor = success.data.response;
    })

    $scope.transactions = [
        {
            vendor: "Grainger",
            invoiceDate: "7/8/2017",
            datePaid: "10/7/2017",
            invoiceNum: "1212ASD12ASD478",
            description: "Still a short one",
            expensed: 9358
        },
        {
            vendor: "Grainger",
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
            vendor: "Grainger",
            invoiceDate: "7/8/2017",
            datePaid: "10/7/2017",
            invoiceNum: "1212ASD12ASD478",
            description: "Still a short one",
            expensed: 9358
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
            vendor: "Grainger",
            invoiceDate: "9/10/2017",
            datePaid: "10/2/2017",
            invoiceNum: "12A34B56C43HD",
            description: "This is alonger description. A lot of detail was need to descrbe this transaction, let me tell you",
            expensed: 56983.32
        },
        {
            vendor: "Grainger",
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
            vendor: "Grainger",
            invoiceDate: "7/8/2017",
            datePaid: "10/7/2017",
            invoiceNum: "1212ASD12ASD478",
            description: "Still a short one",
            expensed: 9358
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
            vendor: "Grainger",
            invoiceDate: "9/10/2017",
            datePaid: "10/2/2017",
            invoiceNum: "12A34B56C43HD",
            description: "This is alonger description. A lot of detail was need to descrbe this transaction, let me tell you",
            expensed: 56983.32
        }
    ]
}]);
app.controller('vendorEntryController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){

    $scope.submitVendor = function(){
        postRequestService.request('/api/vendor/new', $scope.vendor).then(function(request){
            $location.url('/')   
        });
    }
}]);
app.controller('vendorsController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){
  
    postRequestService.request('/api/vendor/listing').then(function(success){
        $scope.vendors = success.data.response;
    })

}]);