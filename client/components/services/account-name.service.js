app.service('accountNameService', function(){

    //Format the account name given the account number, sub number, and shred out number
    this.getName = function(account){
        if(account.shred_no != 'None'){
            return [account.account_no, account.sub_no, account.shred_no].join('-')
        }
        else if(account.sub_no != 'None'){
            return [account.account_no, account.sub_no].join('-')
        }
        else{
            return account.account_no
        }
    }
});