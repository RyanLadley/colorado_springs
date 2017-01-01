app.controller('reportsController', function($scope, $location){

    $scope.reports = [
        {
            name: "Monthly Expense",
            link: "monthly-expense"
        },
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