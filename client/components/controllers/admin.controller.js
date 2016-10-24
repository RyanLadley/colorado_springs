app.controller('adminController', function($scope, $location){

	$scope.users = [
		{
			name: "Chuck Chuckers",
			login: "TheChuck",
			email: "chuck@email.com",
			permissions: "2"
		},
		{
			name: "Lama Links",
			login: "TheRealLama",
			email: "Lama@email.com",
			permissions: "1"
		},
		{
			name: "Adminstrator Dan",
			login: "TrueAdmin2000",
			email: "admin@email.com",
			permissions: "0"
		}
	]

});