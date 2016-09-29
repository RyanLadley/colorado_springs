app.directive('sidebarInfo', function() {
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