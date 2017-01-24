app.service('accountNameService', function(){

    //Format the account name given the account number, sub number, and shred out number
    this.getName = function(account){
        if(!(account.shred_no == 'None' || account.shred_no == null)){
            return [account.account_no, account.sub_no, account.shred_no].join('-')
        }
        else if(!(account.sub_no == 'None' || account.sub_no == null)){
            return [account.account_no, account.sub_no].join('-')
        }
        else{
            return account.account_no
        }
    }
});
app.service('dateFromString', function(){

    this.get = function(dateString){
        var dateParts = dateString.split("-");
        if(dateParts > 1){
            var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
        }
        else{
            var date = new Date(dateString)
        }

        return date

    }
});
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
app.service('sortService', ['accountNameService', function(accountNameService){

    this.sortTransactions = function(transactions, column, ascending){

        transactions.sort(function(a,b){
            //Swap a and b if sorting in a descending (not ascending) fashion
            if(!ascending){
                var temp = a
                a = b
                b = temp
            }

            //Detrmine the columns being sorted
            if(column == 'account'){
                return byAccount(a,b)
            }
            else if (column == 'invoice_no' || column =='vendor_name'){
                return byString(a[column] ,b[column])
            }
            else if(column == 'date_paid' || column == 'invoice_date'){
                return byDate(a[column] ,b[column])
            }
            else if(column == 'expense'){
                return byNumber(parseFloat(a[column]) ,parseFloat(b[column]))
            }
        })

        return transactions
    }

    this.sortTickets = function(tickets, column, ascending){

        tickets.sort(function(a,b){
            //Swap a and b if sorting in a descending (not ascending) fashion
            if(!ascending){
                var temp = a
                a = b
                b = temp
            }

            //Detrmine the columns being sorted
            if (column =='material_name' || column == 'ticket_no' || column == 'invoice_no' || column == 'district'|| column == 'vendor_name'){
                return byString(a[column] ,b[column])
            }
            else if(column == 'date'){
                return byDate(a[column] ,b[column])
            }
            else if(column == 'quantity' || column == 'cost'){
                return byNumber(parseFloat(a[column]) ,parseFloat(b[column]))
            }
        })

        return tickets
    }

    var byAccount = function(a,b){

        if(accountNameService.getName(a) < accountNameService.getName(b)){
            return -1
        }
        else if(accountNameService.getName(a) > accountNameService.getName(b)){
            return 1
        }
        return 0
    }

    var byString = function(a,b){

        var stringA = a.toLowerCase(), stringB = b.toLowerCase()

        if (stringA < stringB){
            return -1 
        }
        if (stringA > stringB){
            return 1
        }
        return 0 
    }

    var byDate = function(a,b){
        if( a == 'None'){
            return -1
        }
        else if( b == 'None'){
            return 1
        }
        else{
            aDate = createDateFromString(a)
            bDate = createDateFromString(b)

           return aDate - bDate
        }
    }

    var createDateFromString = function(dateString){
        var dateParts = dateString.split("-");
        if(dateParts > 1){
            var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
        }
        else{
            var date = new Date(dateString)
        }

        return date

    }

    var byNumber = function(a,b){

       return a - b
    }

}]);