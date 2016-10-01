app.config(['$routeProvider', '$locationProvider', 
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
}]);