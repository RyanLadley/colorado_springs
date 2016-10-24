app.controller('pendingAdjustmentController', function($scope, $location){
	

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
    $scope.setSelected = function(){
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
});