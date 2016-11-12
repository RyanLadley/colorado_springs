app.service('monthsService', function(){

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    this.getMonth = function(n){
        return months[n]
    }

    this.monthList = function(){
        return months
    }
});
app.service('postRequestService', ['$http', '$cookies', function($http, $cookies){

    //Http post request wrapper to send data to api.
    this.request = function(url, payload) {
        var form = new FormData()
        form.append("payload", JSON.stringify(payload))
        //form.append("token", JSON.stringify($cookies.getObject('token')))

        return $http.post(url, form, {
            withCredentials : false,
            headers : {
                'Content-Type' : undefined
            },
            transformRequest : angular.identity
        }).then(
        function(success){
            //Normal Operation, update token after request
            //console.log(success)
            if(success.data.status === "success"){
                var now = new Date()
                var oneYear = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
                //$cookies.putObject('token', success.data.token, {'expires': oneYear});
            }
            else{
                //User tried to access a project they do not have permission to view
                //Burn Them!! Or just remove the project token. Which ever
                if(success.data.response === "Project Access Denied"){
                    var now = new Date()
                    var oneYear = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
                    //$cookies.putObject('token', success.data.token, {'expires': oneYear});
                    //$cookies.remove('project')
                }
                //User token has expireed. Log them out
                //They don't need to be burned... yet. 
                else{
                    if(success.data.response === "Invalid User"){
                        //$cookies.remove('token')
                    }
                }
            }
            return success
        }, 
        //Error
        function(error){
            if(error.data.response === "Invalid User"){
                //$cookies.remove('token')
            }
        });
    };
}]);