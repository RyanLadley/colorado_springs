app.service('accountNameService', function(){

    //Format the account name given the account number, sub number, and shred out number
    this.getName = function(account){
        var accountName = ""
        if(account.shred_no != 'None'){
            accountName = account.account_no.toString() + "-" +account.sub_no.toString() +"-" +account.shred_no.toString()
        }
        else if(account.sub_no != 'None'){
            accountName = account.account_no.toString() + "-" +account.sub_no.toString()
        }
        else{
            accountName = account.account_no.toString()
        }
        return accountName
    }

});