app.config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider){
    $routeProvider
    .when("/dev",
        {
            controller: 'devController',
            templateUrl: '/res/site/dev/dev.html'
        }
    )
    .when("/",
        {
            controller: 'homeController',
            templateUrl: '/res/site/home/home.index.html'
        }
    )
    .when("/login",
        {
            controller: 'loginController',
            templateUrl: '/res/site/login/login.index.html'
        }
    )
    .when("/overview",
        {
            controller: 'overviewController',
            templateUrl: '/res/site/overview/overview.index.html'
        }
    )
    .when("/overview/account/:accountId",
        {
            controller: 'accountController',
            templateUrl: '/res/site/overview/account.index.html'
        }
    )
    .when("/entry",
        {
            controller: 'dataInputController',
            templateUrl: '/res/site/data-entry/data-entry.index.html'
        }
    )
    .when("/vendors",
        {
            controller: 'vendorsController',
            templateUrl: '/res/site/vendors/vendors.index.html'
        }
    )
    .when("/vendors/:vendorId",
        {
            controller: 'vendorDetailsController',
            templateUrl: '/res/site/vendors/vendor-details.index.html'
        }
    )
    .when("/adjustments",
        {
            controller: 'adjustmentsController',
            templateUrl: '/res/site/adjustments/adjustments.index.html'
        }
    )    
    .when("/coversheet",
        {
            controller: 'coversheetController',
            templateUrl: '/res/site/coversheet/coversheet.index.html'
        }
    )
    .when("/reports",
        {
            controller: 'reportsController',
            templateUrl: '/res/site/reports/reports.index.html'
        }
    )
    .when("/reports/monthly-expense",
        {
            controller: 'monthlyExpenseController',
            templateUrl: '/res/site/reports/monthly-expense.index.html'
        }
    )
    .when("/reports/expense-breakdown",
        {
            controller: 'expenseBreakdownController',
            templateUrl: '/res/site/reports/expense-breakdown.index.html'
        }
    )
    .when("/reports/monthly-breakdown",
        {
            controller: 'monthlyBreakdownController',
            templateUrl: '/res/site/reports/monthly-breakdown.index.html'
        }
    )
    .when("/profile/:userId",
        {
            controller: 'profileController',
            templateUrl: '/res/site/user/profile.index.html'
        }
    )
    .when("/administrator/:userId",
        {
            controller: 'adminController',
            templateUrl: '/res/site/user/admin.index.html'
        }
    )
    .otherwise("/",
    {
        redirectTo: "/"
    })
}]);