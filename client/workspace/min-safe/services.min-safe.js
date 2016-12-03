app.service('monthsService', function(){

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    this.getMonth = function(n){
        return months[n]
    }

    this.monthList = function(){
        return months
    }
});
app.service('postRequestService', ['$http', '$cookies', '$location', function($http, $cookies, $location){

    //Http post request wrapper to send data to api.
    this.request = function(url, payload) {
        var form = new FormData()
        form.append("payload", JSON.stringify(payload))
        form.append("token", JSON.stringify($cookies.getObject('token')))

        return $http.post(url, form, {
            withCredentials : false,
            headers : {
                'Content-Type' : undefined
            },
            transformRequest : angular.identity
        }).then(
        function(success){
            //User token has expireed. Log them out
            //They don't need to be burned... yet. 
            if(success.data.response === "Invalid User" && success.data.error === "error"){
                $cookies.remove('token')
            }

            //Normal Operation, update token after request
            else{
                var now = new Date();
                var oneYear = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
                $cookies.putObject('token', success.data.token, {'expires': oneYear});
            }
            return success
        }, 
        //Error
        function(error){
            if(error.data.response === "Invalid User"){
                $cookies.remove('token')
            }
        });
    };
}]);