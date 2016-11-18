app.directive('searchField', function() {
    return{
        restrict: 'E',
        scope: {
            label: '@',
            model: "=?",
            function: "=?"
        },
 		templateUrl: '/res/components/directives/search-field/search-field.template.html'    
	};
})