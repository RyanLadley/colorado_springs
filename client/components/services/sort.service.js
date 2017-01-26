app.service('sortService', function(accountNameService){

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
            if(column == 'account'){
                return byAccount(a,b)
            }
            else if (column =='material_name' || column == 'ticket_no' || column == 'invoice_no' || column == 'district'|| column == 'vendor_name'){
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

});