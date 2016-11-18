app.directive('singleCoversheet', function() {
    return{
        restrict: 'E',
        controller: 'singleCoversheetController',
        templateUrl: '/res/components/directives/coversheets/single-coversheet.template.html'
    };
})