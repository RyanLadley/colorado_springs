app.controller('overviewController', function($scope, $location){
  
    $scope.expandAll = function(){
        for(var i = 0; i < $scope.accounts.length; i++){
            $scope.accounts[i].showSubaccount = true;
            for(var j = 0; j < $scope.accounts[i].subaccounts.length; j++){
                $scope.accounts[i].subaccounts[j].showSubaccount = true;
            }
        }
    }

    $scope.collapseAll = function(){
        for(var i = 0; i < $scope.accounts.length; i++){
            $scope.accounts[i].showSubaccount = false;
            for(var j = 0; j < $scope.accounts[i].subaccounts.length; j++){
                $scope.accounts[i].subaccounts[j].showSubaccount = false;
            }
        }
    }

    $scope.accounts = [
        {
            accountNo: "5221000",
            description: "In House Resurfacing",
            yearBudget: 2160938.00,
            miscTransfer: "",
            totalBudget: 2160938.00,
            expendToDate: 0.00,
            remainingBalance: 2160938.00,

            subaccounts: [
                {
                    accountNo: "5221000-1",
                    description: "Maintainence Paving",
                    yearBudget: "",
                    miscTransfer: "",
                    totalBudget: 0.00,
                    expendToDate: 0.00,
                    remainingBalance: 0.00,
                    subs:[]
                },
                {
                    accountNo: "5221000-2",
                    description: "Structural Digout",
                    yearBudget: "",
                    miscTransfer: "",
                    totalBudget: 0.00,
                    expendToDate: 0.00,
                    remainingBalance: 0.00,
                    subs:[
                        {
                            accountNo: "5221000-2-1",
                            description: "North Distrt Digout",
                            yearBudget: "",
                            miscTransfer: "",
                            totalBudget: 0.00,
                            expendToDate: 0.00,
                            remainingBalance: 0.00
                        },
                        {
                            accountNo: "5221000-2-2",
                            description: "South Disrict Digout",
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
                        }

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

            subaccounts: [
                {
                    accountNo: "5222000-1",
                    description: "Asphalt Materials",
                    yearBudget: "",
                    miscTransfer: "",
                    totalBudget: 0.00,
                    expendToDate: 0.00,
                    remainingBalance: 0.00,
                    subs:[]
                },
                {
                    accountNo: "5222000-2",
                    description: "Propane",
                    yearBudget: "",
                    miscTransfer: "",
                    totalBudget: 0.00,
                    expendToDate: 0.00,
                    remainingBalance: 0.00,
                    subs:[]
                },
                {
                    accountNo: "5222000-3",
                    description: "Shovels/Rake/Etc",
                    yearBudget: "",
                    miscTransfer: "",
                    totalBudget: 0.00,
                    expendToDate: 0.00,
                    remainingBalance: 0.00,
                    subs:[]
                }

            ]
        },
        {
            accountNo: "5223000",
            description: "In House Resurfacing",
            yearBudget: 2160938.00,
            miscTransfer: "",
            totalBudget: 2160938.00,
            expendToDate: 0.00,
            remainingBalance: 2160938.00,

            subaccounts: [
                {
                    accountNo: "5223000-1",
                    description: "Maintainence Paving",
                    yearBudget: "",
                    miscTransfer: "",
                    totalBudget: 0.00,
                    expendToDate: 0.00,
                    remainingBalance: 0.00,
                    subs:[]
                },
                {
                    accountNo: "5223000-2",
                    description: "Structural Digout",
                    yearBudget: "",
                    miscTransfer: "",
                    totalBudget: 0.00,
                    expendToDate: 0.00,
                    remainingBalance: 0.00,
                    subs:[
                        {
                            accountNo: "5223000-2-1",
                            description: "Norh District Digout",
                            yearBudget: "",
                            miscTransfer: "",
                            totalBudget: 0.00,
                            expendToDate: 0.00,
                            remainingBalance: 0.00
                        },
                        {
                            accountNo: "5223000-2-2",
                            description: "South District Digout",
                            yearBudget: "",
                            miscTransfer: "",
                            totalBudget: 0.00,
                            expendToDate: 0.00,
                            remainingBalance: 0.00
                        },
                        {
                            accountNo: "5223000-2-4",
                            description: "Wes District Digout",
                            yearBudget: "",
                            miscTransfer: "",
                            totalBudget: 0.00,
                            expendToDate: 0.00,
                            remainingBalance: 0.00
                        }

                    ]
                }

            ]
        },
        {
            accountNo: "5224000",
            description: "Pothole Patching Repair",
            yearBudget: 2160938.00,
            miscTransfer: "",
            totalBudget: 2160938.00,
            expendToDate: 0.00,
            remainingBalance: 2160938.00,

            subaccounts: [
                {
                    accountNo: "5224000-1",
                    description: "Asphalt Materials",
                    yearBudget: "",
                    miscTransfer: "",
                    totalBudget: 0.00,
                    expendToDate: 0.00,
                    remainingBalance: 0.00,
                    subs:[]
                },
                {
                    accountNo: "5224000-2",
                    description: "Propane",
                    yearBudget: "",
                    miscTransfer: "",
                    totalBudget: 0.00,
                    expendToDate: 0.00,
                    remainingBalance: 0.00,
                    subs:[]
                },
                {
                    accountNo: "5224000-3",
                    description: "Shovels/Rake/Etc",
                    yearBudget: "",
                    miscTransfer: "",
                    totalBudget: 0.00,
                    expendToDate: 0.00,
                    remainingBalance: 0.00,
                    subs:[]
                }

            ]
        }
    ];

});