app.controller('reportsController', function($scope, $location){

    $scope.reports = [
        {
            name: "Monthly Expense",
            link: "monthly-expense"
        },
        {
            name: "Expense Breakdown",
            link: "expense-breakdown"
        },
        {
            name: "Monthly Breakdown",
            link: "monthly-breakdown"
        },
    ]
});