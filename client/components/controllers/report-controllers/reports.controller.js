app.controller('reportsController', function($scope, $location){

    $scope.reports = [
        {
            name: "Expense",
            link: "expense"
        },
        {
            name: "Ticket Summary",
            link: "ticket-summary"
        },
    ]
});