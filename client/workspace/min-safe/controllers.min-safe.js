app.controller('accountSelectController', ['$scope', '$location', 'monthsService', function($scope, $location, monthsService){
    
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
app.controller('dateSelectController', ['$scope', '$cookies', '$location', 'postRequestService', function($scope, $cookies, $location, postRequestService){

    //When a date is selected, close the calender
    $scope.$watch('date', function(){
        $scope.displayCalendar = false;
    })
}]);
app.controller('pendingAdjustmentController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){
	
    //TODO: Use css classes the other tabs have to do this properly
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

    //When the user selects a new vendor, call the backend and grab all pending transactions for this vendor
    $scope.$watch('vendorId', function(){
        if($scope.vendorId){
            postRequestService.request('/api/transaction/pending/vendor/' +$scope.vendorId).then(function(success){
                $scope.pending = success.data.response;
            }) 
        } 
    })

    //"$scope.pending[$scope.selectedPending]" serves as a refrence
    //initiatlize $scope.selectedPendingTransaction for manipulation and to send back to server
    $scope.selectedPending = -1;
    $scope.setSelectedPendingTransaction = function(){
	    $scope.selectedPendingTransaction = $scope.pending[$scope.selectedPending]
        $scope.selectedPendingTransaction.date_paid = null
        $scope.pending[$scope.selectedPending].expense = Number($scope.pending[$scope.selectedPending].expense)
	}

    $scope.submitPending = function(){
        if($scope.pendingForm.$valid){
            postRequestService.request('/api/transaction/pending/update', $scope.selectedPendingTransaction).then(function(success){
                $location.url('/') 
            }) 
        }
    }
}]);
app.controller('projectCoversheetController', ['$scope', '$location', '$window', 'postRequestService', function($scope, $location, $window, postRequestService){

    //NExt lines are used for user display/navigation
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
    
    //INitialize empty coversheet
    $scope.coversheet ={
        pprta_account_code_id: null,
        vendor_id: null,
        transactions: []
    }

    //Submit an invoice search only if at least one of the fields has a value
    $scope.searchInvoice = function(){
        if($scope.search.vendor_id || $scope.search.invoice_no || $scope.search.pprta_account_code_id){
            postRequestService.request('/api/transaction/invoice/search', $scope.search).then(function(success){
                $scope.transactions = success.data.response
                if($scope.coversheet.pprta_account_code_id){
                    disableRows()
                    checkSelected()
                }
            })
        }
    }

    //Create the cover sheet and send the results to the user
    $scope.createProjectCoversheet = function(){
        postRequestService.request('/api/coversheet/project', $scope.coversheet).then(function(success){
            $window.open("/coversheet/project/" +success.data.response)
        })

    }


    //The following blocks are what enable and disable the rows in the row selection
    
    //This function is the main evaluator. It determines if the given transaction was 
    //selected of deslected. IF it was just selected, evaluate all other visable rows to ensure
    //That only valid (same pprta code and vendor) are slectable. 
    //Then add the selected transaction to the coversheet transaction array
    //If the transaction was just deselected, make sure that it was not the last row to be deselected
    //If it was, re-enable all rows. 
    $scope.disableCreate = true
    $scope.evaluateRows = function(transaction){

        //Transaction was checked
        if(transaction.selected){
            $scope.disableCreate = false;
            $scope.coversheet.transactions.push(transaction)
            //PPRTA Id Has not yet been set
            if(!$scope.coversheet.pprta_account_code_id){
                $scope.coversheet.pprta_account_code_id = transaction.pprta_account_code_id
                $scope.coversheet.vendor_id = transaction.vendor_id
                disableRows()
            }
        }
        else{
            deselectRow(transaction)
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

    //Disables all rows that do not have the current pprta code and vendor
    var disableRows = function(){
        for(var i = 0; i < $scope.transactions.length; i++){
            //Disable rows that do not have matching invoice or vendor
            if($scope.transactions[i].pprta_account_code_id != $scope.coversheet.pprta_account_code_id || $scope.transactions[i].vendor_id != $scope.coversheet.vendor_id){
                $scope.transactions[i].disabled = true;
            }
        }
    }


    //This is called when we change search cirteria to make sure that items that have been checked, appear checked. 
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

    //This is called when the "remove" button has been pressed. This removes the provided transaction
    //From the cover sheet transaction sarray and unchecks it. 
    var deselectRow = function(transaction){
        for(var j = 0; j < $scope.coversheet.transactions.length; j++){
            if(transaction.transaction_id == $scope.coversheet.transactions[j].transaction_id){
                $scope.coversheet.transactions.splice(j,1)
                i = $scope.transactions.length
                break;
            }
        }
    }

    //All rows have been enabled, reset the pprta and vend ids
    var resetSelection = function(){
        $scope.coversheet.pprta_account_code_id = null
        $scope.coversheet.vendor_id = null
        $scope.disableCreate = true
    }
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
    	invoice_no: null
    }
    $scope.searchInvoice = function(){
        if($scope.search.vendor_id || $scope.search.invoice_no){
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
        $scope.invoice.transaction_ids = []
    	for(var i = 0; i < $scope.transactions.length; i++){
			//Add selected transactionsId's to the invoice to be sent to the backend
            if($scope.transactions[i].selected){
                $scope.invoice.transaction_ids.push($scope.transactions[i].transaction_id)
            }
		}

		postRequestService.request('/api/coversheet/single', $scope.invoice).then(function(success){
            $window.open("/coversheet/single-invoice/" +success.data.response)
        })

    }

    $scope.invoice ={
    	invoice_no: null,
    	vendor_id: null
    }

    //TODO: Condense the logic of this function
    $scope.disableCreate = true
    $scope.disableRows = function(transaction){

    	//Transaction was checked
    	if(transaction.selected){
    		$scope.disableCreate = false;
    		//Invoice Number Has not yet been set
    		if(!$scope.invoice.invoice_no){
	    		$scope.invoice.invoice_no = transaction.invoice_no
	    		$scope.invoice.vendor_id = transaction.vendor_id
	    		for(var i = 0; i < $scope.transactions.length; i++){
	    			//Disable rows that do not have matching invoice or vendor
	    			if($scope.transactions[i].invoice_no != $scope.invoice.invoice_no || $scope.transactions[i].vendor_id != $scope.invoice.vendor_id){
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
        $scope.invoice.invoice_no = null
        $scope.invoice.vendor_id = null
        $scope.disableCreate = true
    }
}]);
app.controller('transactionAdjustmentController', ['$scope', '$location', 'postRequestService', 'monthsService', function($scope, $location, postRequestService, monthsService){
	
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

    //"$scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex]" serves as a refrence
    //initiatlize $scope.selectedTransaction for manipulation and to send back to server
    //Then call the server to get the city-account assignemnts assigned to this tranaction 
    $scope.selectedIndex = -1;
    $scope.setSelectedTransaction = function(){
	    $scope.selectedTransaction = {
                transaction_id:$scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].transaction_id,
                account_id: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].account_id,
	    		vendor_id: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].vendor_id,
	            invoice_date: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].invoice_date,
	            date_paid: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].date_paid,
	            invoice_no: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].invoice_no,
                transaction_type_id: Number($scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].transaction_type_id), 
	            description: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].description,
	            expense: Number($scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].expense)
	    }

        postRequestService.request('/api/transaction/city-account-assignments/' +$scope.selectedTransaction.transaction_id ).then(function(success){
            $scope.selectedTransaction.city_accounts = success.data.response;
            
            //Ammount come in as strings, these need to be floats
            for(var i = 0;  i < $scope.selectedTransaction.city_accounts.length; i++){
                $scope.selectedTransaction.city_accounts[i].amount = parseFloat($scope.selectedTransaction.city_accounts[i].amount)
            }
        })
	}

    //When the user selects a new account, get the transactions associated with the account
    //TODO: consider adding a button so there are no unnesicary searches.
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

    //Close the dialog
    $scope.exit = function(){
        $scope.display = false
    }

    //When the dialog is called, set the transaction information from the server
    $scope.$watch('display', function(){
        if($scope.display){
            postRequestService.request('/api/transaction/details/' +$scope.transaction_id).then(function(success){
                $scope.transaction = success.data.response
            })
        }
    })

    //Maps a single invoice coversheet to create for the user. 
    $scope.createSingleCoversheet = function(){
        $scope.invoice = {
            invoice_no: $scope.transaction.invoice_no,
            vendor_id: $scope.transaction.vendor_id,
            description: $scope.transaction.description,
            transaction_ids: [$scope.transaction.transaction_id]
        }

        postRequestService.request('/api/coversheet/single', $scope.invoice).then(function(success){
            $window.open("/coversheet/single-invoice/" +success.data.response)
        })

    }
    
}]);
app.controller('transactionEntryController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){
	
    //The next few blocks are for navigation 
    //Since this is a special case within the adjustments screen
    //A few complexities are added
    //If no firstpage is provided, this is in data entry, so it is 1
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
            else if(!$scope.transaction.transaction_id || allowDisplay){
                return 'nav-display'
            }
        } 
    }


    $scope.submitTransaction = function(){
        //If the transaction has an Id, we know we are updateing an existing transaction.
        //If it does not, we are creating a new transaction
        if($scope.entryForm.$valid && ($scope.remaining >= -0.005 /*rounding error allowance */ || $scope.transaction.expense < 0)){
           if($scope.transaction.transaction_id){
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

    //This is called when the user transtions from the basic data entry to the city accoutnts screen
    //If this is the initial move, or if the expense has been changed, it populate the city account the "Unassigned" and 100% of the expense
    $scope.setupCityAccounts = function(){

        if(!$scope.transaction.city_accounts || ($scope.startExpense && $scope.startExpense != $scope.transaction.expense)){
            $scope.remaining = 0
            $scope.startExpense = $scope.transaction.expense
            $scope.transaction.city_accounts = [{city_account_id: "", amount: $scope.transaction.expense}]
        }
        else{
            $scope.checkRemaining();
        }
    }

    //Check the transaction expense to the amount that has been assigned to city accounts
    //This is displayed as Total Remining. 
    $scope.checkRemaining = function(){
        var sum = 0

        for(i = 0; i < $scope.transaction.city_accounts.length; i++){
            sum += $scope.transaction.city_accounts[i].amount
        }

        $scope.remaining = Number(($scope.transaction.expense - sum).toFixed(2));
    }

    //If there is more money to be assigned to city account, this function is called by the add acount button
    //It initializes a new account to unasigned to the remaining amount need to be assigned 
    $scope.addAccount = function(){
        if($scope.remaining > 0){
            $scope.transaction.city_accounts.push({city_account_id: "", amount: $scope.remaining})
            $scope.checkRemaining();
        }
    }

    $scope.removeAccount = function(index){
        $scope.transaction.city_accounts.splice(index, 1)
        $scope.checkRemaining();
    }

}]);
app.controller('transactionTableController', ['$scope', 'postRequestService', 'sortService', function($scope, postRequestService, sortService){

    //Format the account name given the account number, sub number, and shred out number
    var generateAccountName = function(){
        if($scope.account.shred_no != "None"){
            return [$scope.account.account_no, $scope.account.sub_no, $scope.account.shred_no].join('-')
        }
        else if($scope.account.sub_no != "None"){
            return [$scope.account.account_no, $scope.account.sub_no].join('-')
        }
        return $scope.account.account_no
    }


    //Sort by the given column in ascending order
    //If the column has already been selected to be sorted, 
    //Switch the direction in which we are soring
    $scope.sortColumn = ''
    var ascending = true;
    $scope.sortTransactions = function(column){
        if($scope.sortColumn != column){
            $scope.sortColumn = column
            ascending = true;
        }
        else{
            ascending = !ascending
        }
        $scope.transactions = sortService.sortTransactions($scope.transactions, column, ascending)

    }
    $scope.isSelectedColumn = function(column){
        return column == $scope.sortColumn
    }

    //This block calulates the expense totals for every month retrieved.
    //Called after transations are retrieved from back end
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

    //This toggles whether or not the "Transactions Details" dialog will
    //take over the screen. Triggered when a transaction row is clicked .
    $scope.toggleTransactionDialog = false;
    $scope.displayTransactionDetails = function(transactionId){
        $scope.dialogTransaction = transactionId;
        $scope.toggleTransactionDialog = true;
    }
}]);
app.controller('vendorAdjustmentController', ['$scope', 'postRequestService', 'monthsService', function($scope, postRequestService, monthsService){

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

    //Search Id is the vendor id that is to be changed    
    $scope.searchId = null;

    //When the user selects a vendor, get the intormation from the server
    //TODO: See if tempVendor is still needed
    $scope.$watch('searchId', function(){
        if($scope.searchId){
            postRequestService.request('/api/vendor/details/' +$scope.searchId).then(function(success){
                var tempVendor = success.data.response;

                $scope.vendor ={
                    vendor_id: tempVendor.vendor_id,
                    name: tempVendor.name,
                    contract_no: tempVendor.contract_no,
                    contract_start: tempVendor.contract_start,
                    contract_end: tempVendor.contract_end,
                    point_of_contact: tempVendor.point_of_contact,
                    phone_no: tempVendor.phone_no,
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
app.controller('vendorEntryController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){

   //The next few blocks are for navigation 
    //Since this is a special case within the adjustments screen
    //A few complexities are added
    //If no firstpage is provided, this is in data entry, so it is 1
    if ($scope.firstpage == undefined) {
      $scope.firstpage = 1;

    }
    if($scope.page == undefined) {
        console.log("fired")
        $scope.page = $scope.firstpage;
    }
    $scope.incrementPage = function(){

        console.log("hello")
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
            if(!$scope.vendor){
                return 'nav-display'
            }
            else if(!$scope.vendor.vendor_id || allowDisplay){
                return 'nav-display'
            }
        }
    }

    //Add a new element to the vendor.known arrat
    $scope.addKnownMaterial = function(){

        //If the array has not bee initialized yet, initialize
        //If the array has not bee initialized yet, initialize
        if ($scope.vendor == undefined ){
             $scope.vendor= {
                materials: []
            }
        }
        else if($scope.vendor.materials == undefined){
            $scope.vendor.materials = []
        }

        $scope.vendor.materials.push({material: "", amount: 0, unit: "None Selected"})

    }
    //Remove Eleement from material array
    $scope.removeKnownMaterial = function(index){
        $scope.vendor.materials.splice(index, 1)
    }

    //Add a new element to the vendor.new array
    $scope.addNewMaterial = function(){

        //If the array has not bee initialized yet, initialize
        if ($scope.vendor == undefined ){
             $scope.vendor= {
                new_materials: []
            }
        }
        else if($scope.vendor.new_materials == undefined){
            $scope.vendor.new_materials = []
        }

        $scope.vendor.new_materials.push({material: "", amount: 0, unit: "None Selected"})

    }

    //Remove Eleement from new material array
    $scope.removeNewMaterial = function(index){
        $scope.vendor.new_materials.splice(index, 1)
    }

    $scope.submitVendor = function(){
        if($scope.vendorEntryForm.$valid){
           if($scope.vendor.vendor_id){
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
app.controller('accountController', ['$scope', '$rootScope', '$location', '$routeParams', 'postRequestService', 'monthsService', 'accountNameService', function($scope, $rootScope, $location, $routeParams, postRequestService, monthsService, accountNameService){
  

    //This block calls the backend to retrieve all transactions belonging to this account, seperated by months
    $rootScope.loading = true;
    postRequestService.request('/api/accounts/details/' +$routeParams.accountId).then(function(success){
        $scope.account = success.data.response;
        $scope.accountName = accountNameService.getName($scope.account) //Get formated account name
        $scope.account.remaining = Number($scope.account.total_budget) - Number($scope.account.expendetures) //Populate Budget Table

         //Default to Current Month
        $scope.selectedMonth = d.getMonth()
        $scope.transactions = $scope.account.monthly_summary[$scope.selectedMonth]

        //This was being fired more than once
        //TODO: Figure out why, and find a more elegant solution to the problem
        if($scope.months.length <13){
            $scope.months.push("Pending")
        }
        calculateTotals()
        $rootScope.loading = false;

    })

    //This Block toggles the Get Transfers button
    //If tansfers have not been retrieved from the backend, retrieve them on first click
    //Change button text depending on what is currently being displayed
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


    //This block populates and watches the month dropdown menu. 
    //If the user selects a diffrent month, the displayed transactions will reflect the new month
    var d = new Date()
    $scope.months = monthsService.monthList();
    $scope.$watch('selectedMonth', function(){
        if ($scope.transactions){
            $scope.transactions = $scope.account.monthly_summary[$scope.selectedMonth]
        }
    })


    //This block calulates the expense totals for every month retrieved.
    //Called after transations are retrieved from back end
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

}]);
app.controller('adjustmentsController', ['$scope', '$rootScope', '$location', 'postRequestService', function($scope, $rootScope, $location, postRequestService){
  
    //Request all dropdown menu information from backend
    $rootScope.loading = true;
  	postRequestService.request('/api/dropdown/all').then(function(success){
        $scope.accounts = success.data.response.accounts
        $scope.vendors = success.data.response.vendors
        $scope.transactionTypes = success.data.response.transaction_types
        $scope.cityAccounts = success.data.response.city_accounts
        $rootScope.loading = false;
    })

    //$scope.display determines which tab is currently being displayed
    $scope.display = 'transactions'

}]);
app.controller('adminController', ['$scope', '$location', 'postRequestService', function($scope, $location,postRequestService){

    //Gets information for all users
    //Currently only used in permisions
	postRequestService.request('/api/admin/user/listing').then(function(success){
        $scope.users = success.data.response;

    })

	$scope.submitNewUser = function(){

		if(!$scope.newUserForm.$valid ){
            $scope.newUserError = "Please fill out all fields"
            return
        }
        if($scope.newUser.password != $scope.confirmedPassword){
			$scope.newUserError = "Passwords do not match"
            return
        }
        if($scope.newUser.password.length < 6){
            $scope.newUserError = "Passwords must be at least 6 characters"
            return
        }

        //Only Executed if above conditions are met 
        postRequestService.request('/api/admin/register', $scope.newUser).then(function(success){
            if(success.data.status == "success"){
                alert("New User Created.")
            }
            else{
                alert("There was an error.")
            }
        })
	}

    //When a users permissions is changed, they are added to this array
	$scope.permissionsToUpdate = []
	$scope.queueChangedPermissions = function(user){
		$scope.permissionsToUpdate.push(user)
	}

    //Send the "permissionsToUpdate array to the back end to update the database"
	$scope.updatePermissions = function(){
		postRequestService.request('/api/admin/user/update/permissions', $scope.permissionsToUpdate).then(function(success){
			if(success.data.status == "success"){
				alert("Permissions have been updated.")
			}
			else{
				alert("There was an error.")
			}
		})
	}
}]);
app.controller('coversheetController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){
  
  	postRequestService.request('/api/dropdown/all').then(function(success){
        $scope.accounts = success.data.response.accounts
        $scope.vendors = success.data.response.vendors
        $scope.transactionTypes = success.data.response.transaction_types
        $scope.pprtaProjects = success.data.response.pprta_projects
    })

    //$scope.display destermines which tab is currently being displayed
    $scope.display = 'single'

}]);
app.controller('dataInputController', ['$scope', '$rootScope', '$location', 'postRequestService', function($scope, $rootScope, $location, postRequestService){
    
    $rootScope.loading = false;
  	postRequestService.request('/api/dropdown/all').then(function(success){
        $scope.accounts = success.data.response.accounts
        $scope.vendors = success.data.response.vendors
        $scope.transactionTypes = success.data.response.transaction_types
        $scope.cityAccounts = success.data.response.city_accounts
        $rootScope.loading = false;
    })

    //$scope.display detemines which tab is currently beining displayed
    $scope.display = 'transaction'


}]);
app.controller('devController', ['$scope', '$location', 'postRequestService', function($scope, $location,postRequestService){

    //Gets information for all users
    //Currently only used in permisions
	postRequestService.request('/api/dev/bugs').then(function(success){
        $scope.bugs = success.data.response;

    })

	$scope.submitNewBug = function(){
        //Only Executed if above conditions are met 
        postRequestService.request('/api/dev/new/bug', $scope.newBug).then(function(success){
            if(success.data.status == "success"){
                alert("Bug Added")
            }
            else{
                alert("There was an error.")
            }
        })
	}
}]);
app.controller('homeController', ['$scope', '$cookies', '$location', '$window', 'postRequestService', function($scope, $cookies, $location, $window, postRequestService){

    //Get basic user information like their name and user id
    postRequestService.request('/api/user/basics').then(function(success){
        $scope.user = success.data.response
    })

    //Removes the cookie containing the token, forcing the user to log off
    $scope.logout = function(){
        $cookies.remove('token')
    }

    //TEMPORARY: Creates the excell backup and sends it to the user
    $scope.createBackup = function(){
        postRequestService.request('/api/backup/accounts').then(function(success){
            $window.open("/backups/" +success.data.response)

        })
    }

    //Determines the time of day to guve the user a proper greeting
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
app.controller('overviewController', ['$scope', '$rootScope', '$location', 'postRequestService', function($scope, $rootScope, $location, postRequestService){
  
   $rootScope.loading = true;
    postRequestService.request('/api/accounts/overview').then(function(success){
        $scope.accounts = success.data.response;
        $rootScope.loading = false;
    })

    //Expands all accounts and theirs sub accounts so the user can see the whole table
    $scope.expandAll = function(){
        for(var i = 0; i < $scope.accounts.length; i++){
            $scope.accounts[i].showSubaccount = true;
            for(var j = 0; j < $scope.accounts[i].sub_accounts.length; j++){
                $scope.accounts[i].sub_accounts[j].showSubaccount = true;
            }
        }
    }

    //Collapses the table so only the main accounts are seen
    $scope.collapseAll = function(){
        for(var i = 0; i < $scope.accounts.length; i++){
            $scope.accounts[i].showSubaccount = false;
            for(var j = 0; j < $scope.accounts[i].sub_accounts.length; j++){
                $scope.accounts[i].sub_accounts[j].showSubaccount = false;
            }
        }
    }


}]);
app.controller('profileController', ['$scope', '$location', 'postRequestService', function($scope, $location, postRequestService){

    postRequestService.request('/api/user/details').then(function(success){
        $scope.user = success.data.response;
    })

    //Called when user presses Submit Password Button
    //All fields must be filled 
    //Confirmation and new passwords must match
    $scope.submitNewPassword = function(){
        if(!$scope.passwordForm.$valid){
            $scope.passwordError = "Please fill out all fields."
            return
        }
        if ($scope.password.new != $scope.confirmPassword){
            $scope.passwordError = "Passwords do not match."
            return
        }
        //Add user ID to password to get sent to the backend 
        $scope.password.id = $scope.user.user_id
        postRequestService.request('/api/user/update/password', $scope.password).then(function(success){
            if(success.data.status == "success"){
                alert("Password successfully updated")
                //Reset all user inputs
                $scope.passwordError = ""
                $scope.password= ""
                $scope.confirmPassword = ""
            }
            else{
                $scope.passwordError = "There was an error processing your change."
            }
        }) 
    }

    $scope.submitBackupFreq = function(){
        postRequestService.request('/api/user/update/freq', $scope.user).then(function(success){
            if(success.data.status == "success"){
                alert("Email Frequency successfully updated")
            }
            else{
                $scope.freqError = "There was an error processing your change."
            }
        })    
    }

    $scope.submitContactInformation = function(){
        if($scope.contactForm.$valid){
            postRequestService.request('/api/user/update/contact', $scope.user).then(function(success){
                if(success.data.status == "success"){
                    alert("Contact information successfully updated")
                    $scope.contactError = ""
                }
                else{
                    $scope.contactError = "There was an error processing your change."
                }
            }) 
        }
        else{
            $scope.contactError = "Please fill out all fields."
        }
    }
}]);
app.controller('vendorDetailsController', ['$scope', '$rootScope', '$location', '$routeParams', 'postRequestService', function($scope, $rootScope, $location, $routeParams, postRequestService){
  
    $rootScope.loading = true;
    postRequestService.request('/api/vendor/details/' +$routeParams.vendorId ).then(function(success){
        $scope.vendor = success.data.response;

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
}]);
app.controller('vendorsController', ['$scope', '$rootScope', '$location', 'postRequestService', function($scope, $rootScope, $location, postRequestService){
  
    $rootScope.loading = true;
    postRequestService.request('/api/vendor/listing').then(function(success){
        $scope.vendors = success.data.response;
        $rootScope.loading = false;
    })

}]);