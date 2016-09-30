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
            templateUrl: '/res/site/overview/overview.index.html'
        }
    )
    .otherwise("/",
    {
        redirectTo: "/"
    })
}]);