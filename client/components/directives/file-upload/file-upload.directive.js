app.directive('fileUpload', function () {
    return {
        restrict: 'A',
        scope: {
            file: '='
        },

        link: function (scope, element, attrs) {
            var reader = new FileReader();
            reader.onload = function (event) {
                scope.file = event.target.result;
                scope.$apply();
            }

            element.on('change', function() {
                reader.readAsDataURL(element[0].files[0]);
            });
        }
    };
});