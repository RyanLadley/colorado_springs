app.directive('projectCoversheet', function() {
    return{
        restrict: 'E',
        controller: 'projectCoversheetController',
        scope: {
            pprtaProjects: "<",
            vendors: "<"
        },
        templateUrl: '/res/components/directives/coversheets/project-coversheet.template.html'
    };
})