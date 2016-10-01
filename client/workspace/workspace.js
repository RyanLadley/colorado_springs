var app = angular.module('app', ['ngRoute', 'ngCookies'], ['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(true);
}]);
;app.service('postRequestService', ['$http', '$cookies', function($http, $cookies){

    //Http post request wrapper to send data to api.
    this.request = function(url, payload) {
        var form = new FormData()
        form.append("payload", JSON.stringify(payload))
        form.append("token", JSON.stringify($cookies.getObject('token')))

        return $http.post(url, form, {
            withCredentials : false,
            headers : {
                'Content-Type' : undefined
            },
            transformRequest : angular.identity
        }).then(
        function(success){
            //Normal Operation, update token after request
            if(success.data.status === "success"){
                var now = new Date()
                var oneYear = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
                $cookies.putObject('token', success.data.token, {'expires': oneYear});
            }
            else{
                //User tried to access a project they do not have permission to view
                //Burn Them!! Or just remove the project token. Which ever
                if(success.data.response === "Project Access Denied"){
                    var now = new Date()
                    var oneYear = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
                    $cookies.putObject('token', success.data.token, {'expires': oneYear});
                    $cookies.remove('project')
                }
                //User token has expireed. Log them out
                //They don't need to be burned... yet. 
                else{
                    if(success.data.response === "Invalid User"){
                        $cookies.remove('token')
                    }
                }
            }
            return success
        }, 
        //Error
        function(error){
            if(error.data.response === "Invalid User"){
                $cookies.remove('token')
            }
        });
    };
}]);;app.config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider){
    $routeProvider
    .when("/",
        {
            controller: 'homeController',
            templateUrl: '/res/site/home/home.index.html'
        }
    )
    .when("/overview",
        {
            controller: 'overviewController',
            templateUrl: '/res/site/overview/overview.index.html'
        }
    )
    .when("/overview/account/1",
        {
            controller: 'accountController',
            templateUrl: '/res/site/overview/account.index.html'
        }
    )
    .otherwise("/",
    {
        redirectTo: "/"
    })
}]);;;app.controller('accountController', ['$scope', '$location', function($scope, $location){
  

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
}]);;app.directive('sidebarInfo', function() {
    return{
        restrict: 'E',
        controller: 'sidebarInfoController',
       templateUrl: '/res/components/directives/sidebar/sidebar-info.template.html'
    };
})
app.directive('sidebar', function() {
    return{
        restrict: 'E',
        controller: 'sidebarController',
        scope: {
            card: '='
        },
       templateUrl: '/res/components/directives/sidebar/sidebar.template.html'
    };
})