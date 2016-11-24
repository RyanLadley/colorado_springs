app.controller('accountSelectController', ['$scope', '$location', 'postRequestService', 'monthsService', function($scope, $location, postRequestService, monthsService){
    
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

        //This was being fired more than once
        //TODO: Figure out why, and find a more elegant solution to the problem
        if($scope.months.length <13){
            $scope.months.push("Pending")
        }
        calculateTotals()

    })

    $scope.displayTransfers=false;
    $scope.buttonMessage = "View Transfers";
    $scope.getTransfers = function(){
        if(!$scope.transfers){
            postRequestService.request('/api/accounts/transfers/' +$routeParams.accountId).then(function(success){
                $scope.transfers = success.data.response;
            })
        }
         $scope.displayTransfers = !$scope.displayTransfers

         if($scope.displayTransfers){
            $scope.buttonMessage = "View Transactions"
         }
         else{
            $scope.buttonMessage = "View Transfers"
         }
    }

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
        }
    })

    $scope.monthlyTotals = []
    var calculateTotals = function(){

        for (var i = 0; i < $scope.months.length ; i++){
            total = 0
            for(var j = 0; j < $scope.account.monthly_summary[i].length;j++ ){
                total += Number($scope.account.monthly_summary[i][j].expense)
            }
            $scope.monthlyTotals.push(total)
        }
    }

    $scope.toggleTransactionDialog = false;
    $scope.displayTransactionDetails = function(transactionId){
        $scope.dialogTransaction = transactionId;
        $scope.toggleTransactionDialog = true;
    }
}]);
app.controller('adjustmentsController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){
  
  	postRequestService.request('/api/dropdown/all').then(function(success){
        $scope.accounts = success.data.response.accounts
        $scope.vendors = success.data.response.vendors
        $scope.transactionTypes = success.data.response.transaction_types
        $scope.cityAccounts = success.data.response.city_accounts
    })

    $scope.display = {
    	transactions: true,
    	pending: false,
    	budget:false
    };

}]);
app.controller('adminController', ['$scope', '$location', 'postRequestService', function($scope, $location,postRequestService){

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
	];

	$scope.submitNewUser = function(){
		if($scope.newUserForm.$valid ){
            if($scope.newUser.password == $scope.confirmedPassword){
    			postRequestService.request('/api/admin/register', $scope.newUser).then(function(success){
                    $location.url('/') 
                })
            }
            else{
                $scope.newUserError = "Passwords do not match"
            }
		}
		else{
			$scope.newUserError = "Please fill out all fields"
		}
	}

}]);
app.controller('budgetAdjustmentController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){

	//$scope.accounts = $scope.$parent.accounts
    
    $scope.submitTransfer = function(){
        if($scope.transferForm.$valid){
            postRequestService.request('/api/accounts/transfer', $scope.transfer).then(function(success){
               $location.url('/') 
            })
        }
    }
}]);
app.controller('coversheetController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){
  
  	postRequestService.request('/api/dropdown/all').then(function(success){
        $scope.accounts = success.data.response.accounts
        $scope.vendors = success.data.response.vendors
        $scope.transactionTypes = success.data.response.transaction_types
        $scope.pprtaProjects = success.data.response.pprta_projects
    })

    $scope.display = {
    	single: true,
        project: false
    }

}]);
app.controller('dataInputController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){
  
  	postRequestService.request('/api/dropdown/all').then(function(success){
        $scope.accounts = success.data.response.accounts
        $scope.vendors = success.data.response.vendors
        $scope.transactionTypes = success.data.response.transaction_types
        $scope.cityAccounts = success.data.response.city_accounts
    })

    $scope.display = {
    	transaction: true,
    	vendor: false
    };


}]);
app.controller('dateSelectController', ['$scope', '$cookies', '$location', 'postRequestService', function($scope, $cookies, $location, postRequestService){

    $scope.$watch('date', function(){
        $scope.displayCalendar = false;
    })
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
app.controller('homeController', ['$scope', '$cookies', '$location', '$window', 'postRequestService', function($scope, $cookies, $location, $window, postRequestService){

    $scope.logout = function(){
        $cookies.remove('token')
    }

    $scope.createBackup = function(){
        postRequestService.request('/api/backup/accounts').then(function(success){
            $window.open("/backups/" +success.data.response)

        })
    }

    $scope.getGreeting = function(){
        var date = new Date()
        hour = date.getHours()

        if(hour < 12){
            return "Morning"
        }
        else if(hour < 17){
            return "Afternoon"
        }
        else{
            return "Evening"
        }
    }

    postRequestService.request('/api/user/basics').then(function(success){
        $scope.user = success.data.response
    })
}]);
app.controller('loginController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){
    $scope.login = {}
    $scope.submit = function(){
        if(validEmail() && validPassword() ){
            postRequestService.request("/api/admin/login", $scope.login).then(function(request){
                if(request.data.status === "success"){
                    $location.url("/")
                }
                else{
                    $scope.failureMessage = request.data.response;
                }
            });
        }
    }


    var validPassword = function(){
        if(!$scope.login.password || $scope.login.password.length < 6){
            $scope.failureMessage = "Password must be at least 6 characters";
            return false;
        }
        return true;
    }
    
    var validEmail = function(){
        if(!$scope.login.email || !$scope.loginForm.loginEmail.$valid){
            $scope.failureMessage = "The email address provided is invalid";
            return false;
        }
        return true;
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
app.controller('pendingAdjustmentController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){
	

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

    

    $scope.$watch('vendorId', function(){
        if($scope.vendorId){
            postRequestService.request('/api/transaction/pending/vendor/' +$scope.vendorId).then(function(success){
                $scope.pending = success.data.response;
            }) 
        } 
    })

    $scope.selectedPending = -1;
    $scope.setSelectedPendingTransaction = function(){
	    $scope.selectedTransaction = {
                transactionId: $scope.pending[$scope.selectedPending].transaction_id,
                accountId: $scope.pending[$scope.selectedPending].account_id,
                vendorId: $scope.pending[$scope.selectedPending].vendor_id,
                invoiceDate: $scope.pending[$scope.selectedPending].invoice_date,
                invoiceNo: $scope.pending[$scope.selectedPending].invoice_no,
                transactionTypeId: Number($scope.pending[$scope.selectedPending].transaction_type_id), 
                description: $scope.pending[$scope.selectedPending].description,
                expense: Number($scope.pending[$scope.selectedPending].expense)
	    }
	}

    $scope.submitPending = function(){
        if($scope.pendingForm.$valid){
            postRequestService.request('/api/transaction/pending/update', $scope.selectedTransaction).then(function(success){
                $location.url('/') 
            }) 
        }
    }
}]);
app.controller('profileController', ['$scope', '$location', function($scope, $location){

	$scope.user = {
		name: "FirstName LastName",
		phoneNumber: "719-555-9876",
		email: "user@email.com",
		login: "Username64"
	}
}]);
app.controller('projectCoversheetController', ['$scope', '$location', '$window', 'postRequestService', function($scope, $location, $window, postRequestService){

    $scope.page = 1;

    $scope.incrementPage = function(){
        $scope.page++
    }
    $scope.decrementPage = function(){
        $scope.page--
    }

    $scope.navLocation = function(sectionPage){
        if(sectionPage <  $scope.page){
            return 'nav-left'
        }
        else if(sectionPage >  $scope.page){
            return 'nav-right'
        }
        else{
            return 'nav-display'
        } 
    }
    
    $scope.coversheet ={
        pprtaAccountCodeId: null,
        vendorId: null,
        transactions: []
    }

    $scope.searchInvoice = function(){
        if($scope.search.vendorId || $scope.search.invoiceNo || $scope.search.pprtaAccountCodeId){
            postRequestService.request('/api/transaction/invoice/search', $scope.search).then(function(success){
                $scope.transactions = success.data.response
                if($scope.coversheet.pprtaAccountCodeId){
                    disableRows()
                    checkSelected()
                }
            })
        }
    }

    $scope.createProjectCoversheet = function(){

        postRequestService.request('/api/coversheet/project', $scope.coversheet).then(function(success){
            $window.open("/coversheet/project/" +success.data.response)
        })

    }

    $scope.disableCreate = true
    $scope.evaluateRows = function(transaction){

        //Transaction was checked
        if(transaction.selected){
            $scope.disableCreate = false;
            $scope.coversheet.transactions.push(transaction)
            //PPRTA Id Has not yet been set
            if(!$scope.coversheet.pprtaAccountCodeId){
                $scope.coversheet.pprtaAccountCodeId = transaction.pprta_account_code_id
                $scope.coversheet.vendorId = transaction.vendor_id
                disableRows()
            }
        }
        else{
            deselectRow()
            //See if any other transaction is checked, if not, unlock all other transactions
            if($scope.coversheet.transactions.length <= 0){
                //no transactions in coversheer, enable all transacitons
                resetSelection()
                for(var i = 0; i < $scope.transactions.length; i++){
                    //Disable rows that do not have matching invoice or vendor
                    $scope.transactions[i].disabled =false
                }
            }
        }
    }

    var disableRows = function(){
        for(var i = 0; i < $scope.transactions.length; i++){
            //Disable rows that do not have matching invoice or vendor
            if($scope.transactions[i].pprta_account_code_id != $scope.coversheet.pprtaAccountCodeId || $scope.transactions[i].vendor_id != $scope.coversheet.vendorId){
                $scope.transactions[i].disabled = true;
            }
        }
    }

    var checkSelected = function(){
        for(var i = 0; i < $scope.transactions.length; i++){
            for(var j = 0; j < $scope.coversheet.transactions.length; j++){
                if($scope.transactions[i].transaction_id == $scope.coversheet.transactions[j].transaction_id){
                    $scope.transactions[i].selected = true
                    break;
                }
            }
        }
    }

    var deselectRow = function(){
        for(var i = 0; i < $scope.transactions.length; i++){
            for(var j = 0; j < $scope.coversheet.transactions.length; j++){
                if($scope.transactions[i].transaction_id == $scope.coversheet.transactions[j].transaction_id){
                    $scope.coversheet.transactions.splice(j,1)
                    i = $scope.transactions.length
                    break;
                }
            }
        }
    }

    var resetSelection = function(){
        $scope.coversheet.pprtaAccountCodeId = null
        $scope.coversheet.vendorId = null
        $scope.disableCreate = true
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
app.controller('singleCoversheetController', ['$scope', '$location', '$window', 'postRequestService', function($scope, $location, $window, postRequestService){

    $scope.search = {
    	invoiceNo: null
    }
    $scope.searchInvoice = function(){
        if($scope.search.vendorId || $scope.search.invoiceNo){
            resetSelection()
            postRequestService.request('/api/transaction/invoice/search', $scope.search).then(function(success){
               if(success.data.response.length){
               		$scope.transactions = success.data.response
               }
               else{
               		$scope.transactions = false
               }
            })
        }
    }

    $scope.createSingleCoversheet = function(){
        $scope.invoice.transactionIds = []
    	for(var i = 0; i < $scope.transactions.length; i++){
			//Add selected transactionsId's to the invoice to be sent to the backend
            if($scope.transactions[i].selected){
                $scope.invoice.transactionIds.push($scope.transactions[i].transaction_id)
            }
		}

		postRequestService.request('/api/coversheet/single', $scope.invoice).then(function(success){
            $window.open("/coversheet/project/" +success.data.response)
        })

    }

    $scope.invoice ={
    	invoiceNo: null,
    	vendorId: null
    }

    //TODO: Condense the logic of this function
    $scope.disableCreate = true
    $scope.disableRows = function(transaction){

    	//Transaction was checked
    	if(transaction.selected){
    		$scope.disableCreate = false;
    		//Invoice Number Has not yet been set
    		if(!$scope.invoice.invoiceNo){
	    		$scope.invoice.invoiceNo = transaction.invoice_no
	    		$scope.invoice.vendorId = transaction.vendor_id
	    		for(var i = 0; i < $scope.transactions.length; i++){
	    			//Disable rows that do not have matching invoice or vendor
	    			if($scope.transactions[i].invoice_no != $scope.invoice.invoiceNo || $scope.transactions[i].vendor_id != $scope.invoice.vendorId){
	    				$scope.transactions[i].disabled = true;
	    			}
	    		}
    		}
    	}
    	else{
    		//See if any other transaction is checked, if not, unlock all other transactions
    		var isSelected = false;
			for(var i = 0; i < $scope.transactions.length; i++){
    			if($scope.transactions[i].selected){
    				isSelected = true;
    				break;
    			}
    		}
    		if(!isSelected){
    			//if is selected is false, enable all transactions
                resetSelection()
    			for(var i = 0; i < $scope.transactions.length; i++){
	    			//Disable rows that do not have matching invoice or vendor
	    			$scope.transactions[i].disabled =false
	    		}
	    	}
		}
    }

    var resetSelection = function(){
        $scope.invoice.invoiceNo = null
        $scope.invoice.vendorId = null
        $scope.disableCreate = true
    }
}]);
app.controller('transactionAdjustmentController', ['$scope', '$location', 'postRequestService', 'monthsService', function($scope, $location, postRequestService, monthsService){
	

    //TODO: The sliding is a hot mess held together by bubblegum and duct tape. Lets run a professional operation here and fix it. Eventually
    $scope.accountId = null;

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

        postRequestService.request('/api/transaction/city-account-assignments/' +$scope.selectedTransaction.transactionId ).then(function(success){
            var unsanitizedCityAccounts = success.data.response;
            
            if(unsanitizedCityAccounts.length > 0){
                $scope.selectedTransaction.cityAccounts = []
                //Ammount come in as strings, these need to be floats
                for(var i = 0;  i < unsanitizedCityAccounts.length; i++){
                    $scope.selectedTransaction.cityAccounts.push({
                        cityAccountAssignmentId: unsanitizedCityAccounts.city_account_assignment_id,
                        amount: parseFloat(unsanitizedCityAccounts[i].amount),
                        cityAccountId: unsanitizedCityAccounts[i].city_account_id
                    })
                }
            }
        })
	}


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
app.controller('transactionDialogController', ['$scope', '$window', 'postRequestService', function($scope, $window, postRequestService){

    $scope.exit = function(){
        $scope.display = false
    }
    $scope.$watch('display', function(){
        if($scope.display){
            postRequestService.request('/api/transaction/details/' +$scope.transactionId).then(function(success){
                $scope.transaction = success.data.response
            })
        }
    })

    $scope.createSingleCoversheet = function(){
        $scope.invoice = {
            invoiceNo: $scope.transaction.invoice_no,
            vendorId: $scope.transaction.vendor_id,
            description: $scope.transaction.description,
            transactionIds: [$scope.transaction.transaction_id]
        }

        postRequestService.request('/api/coversheet/single', $scope.invoice).then(function(success){
            $window.open("/coversheet/single-invoice/" +success.data.response)
        })

    }
    
}]);
app.controller('transactionEntryController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){
	
    if ($scope.firstpage == undefined) {
      $scope.firstpage = 1;

    }
    if($scope.page == undefined) {
        $scope.page = $scope.firstpage;
    }
    $scope.incrementPage = function(){
        $scope.page++
    }
    $scope.decrementPage = function(){
        $scope.page--
    }

    $scope.navLocation = function(sectionPage, allowDisplay){
        if(sectionPage <  $scope.page){
            return 'nav-left'
        }
        else if(sectionPage >  $scope.page){
            //This allows this page to have a smooth flow in the "Adjustments" page
            if(allowDisplay){ 
                return 'nav-right'
            }
        }
        else{
            //If th page is an "adjustment" do not attach nav-display
            //TODO: Think long and hard about if we need to if statements here 
            if(!$scope.transaction){
                return 'nav-display'
            }
            else if(!$scope.transaction.transactionId || allowDisplay){
                return 'nav-display'
            }
        } 
    }


    $scope.submitTransaction = function(){
        //If the transaction has an Id, we know we are updateing an existing transaction.
        //If it does not, we are creating a new transaction
        if($scope.entryForm.$valid && $scope.remaining >= -0.005 /*rounding error allowance */){
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
    }

    $scope.setupCityAccounts = function(){

        if(!$scope.transaction.cityAccounts || ($scope.startExpense && $scope.startExpense != $scope.transaction.expense)){
            $scope.remaining = 0
            $scope.startExpense = $scope.transaction.expense
            $scope.transaction.cityAccounts = [{cityAccountId: "", amount: $scope.transaction.expense}]
        }
        else{
            $scope.checkRemaining();
        }
    }

    $scope.checkRemaining = function(){
        var sum = 0

        for(i = 0; i < $scope.transaction.cityAccounts.length; i++){
            sum += $scope.transaction.cityAccounts[i].amount
        }

        $scope.remaining = Number(($scope.transaction.expense - sum).toFixed(2));
    }

    $scope.addAccount = function(){
        //Remove Accounts With a value of 0 before adding new accounts
        for(i = 0; i < $scope.transaction.cityAccounts.length; i++){
            if($scope.transaction.cityAccounts[i].amount == 0 && $scope.transaction.cityAccounts[i].cityAccountId ===""){ 
                $scope.transaction.cityAccounts.splice(i,1)
                i--
            }
        }
        if($scope.remaining > 0){
            $scope.transaction.cityAccounts.push({cityAccountId: "", amount: $scope.remaining})
            $scope.checkRemaining();
        }
    }

}]);
app.controller('vendorAdjustmentController', ['$scope', 'postRequestService', 'monthsService', function($scope, postRequestService, monthsService){
    

    //TODO: The sliding is a hot mess held together by bubblegum and duct tape. Lets run a professional operation here and fix it. Eventually
    $scope.searchId = null;


    $scope.$watch('searchId', function(){
        if($scope.searchId){
            postRequestService.request('/api/vendor/details/' +$scope.searchId).then(function(success){
                var tempVendor = success.data.response;

                $scope.vendor ={
                    vendorId: tempVendor.vendor_id,
                    name: tempVendor.name,
                    contractNo: tempVendor.contract_no,
                    contractStart: tempVendor.contract_start,
                    contractEnd: tempVendor.contract_end,
                    pointOfContact: tempVendor.point_of_contact,
                    phoneNo: tempVendor.phone_no,
                    address: tempVendor.address,
                    city: tempVendor.city,
                    state: tempVendor.state,
                    zip: tempVendor.zip,
                    email: tempVendor.email,
                    website: tempVendor.website
                }
            }) 
        } 
    })

   
}]);
app.controller('vendorDetailsController', ['$scope', '$location', '$routeParams', 'postRequestService', function($scope, $location, $routeParams, postRequestService){
  
    postRequestService.request('/api/vendor/details/' +$routeParams.vendorId ).then(function(success){
        $scope.vendor = success.data.response;

        $scope.total_expense = 0
        for(var i = 0; i < $scope.vendor.transactions.length; i++){
            $scope.total_expense += Number($scope.vendor.transactions[i].expense)
        }
    })

    $scope.toggleTransactionDialog = false;
    $scope.displayTransactionDetails = function(transactionId){
        $scope.dialogTransaction = transactionId;
        $scope.toggleTransactionDialog = true;
    }
}]);
app.controller('vendorEntryController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){

    $scope.submitVendor = function(){
        if($scope.vendorEntryForm.$valid){
           if($scope.vendor.vendorId){
                postRequestService.request('/api/vendor/update', $scope.vendor).then(function(request){
                    $location.url('/')   
                });
            }
            else{
                postRequestService.request('/api/vendor/new', $scope.vendor).then(function(request){
                    $location.url('/')   
                });
            }
        }
    }
}]);
app.controller('vendorsController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){
  
    postRequestService.request('/api/vendor/listing').then(function(success){
        $scope.vendors = success.data.response;
    })

}]);