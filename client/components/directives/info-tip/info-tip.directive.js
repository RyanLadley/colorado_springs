app.directive('infoTip', function() {
    return{
        restrict: 'E',
        scope: {
            message: '@'
        },
        template: '<div class = "info"><i class = "fa fa-info-circle"></i><div class = "infotext">{{message}}</div></div>'
    };
})