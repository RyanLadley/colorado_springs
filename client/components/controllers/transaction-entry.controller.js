app.controller('transactionEntryController', function($scope, $location, postRequestService){
	
    postRequestService.request('/api/accounts/numbers').then(function(success){
        $scope.accounts = success.data.response;
    })

    $scope.transaction = {}

    $scope.accountSelected = function(account){
        $scope.subaccounts = []
        $scope.shredouts = []
        $scope.transaction.accountId = null

        if(account.sub_accounts.length > 0){
            $scope.subaccounts = account.sub_accounts
        } 
    }

    $scope.subAccountSelected = function(subAccount){
        $scope.shredouts = []
        if(subAccount){ 
            if(subAccount.sub_accounts.length > 0){
                $scope.transaction.accountId = null
                $scope.shredouts = subAccount.sub_accounts
            }
            else{
                $scope.transaction.accountId = subAccount.account_id
            }
        }
    }

    $scope.shredoutSelected = function(shredout){
        if(shredout){
            $scope.transaction.accountId = shredout.account_id
        }
    }

    postRequestService.request('/api/vendor/listing').then(function(success){
        $scope.vendors = success.data.response;
    })

    postRequestService.request('/api/transaction/types').then(function(success){
        $scope.types = success.data.response;
    })

    $scope.submitTransaction = function(){
        postRequestService.request('/api/transaction/new', $scope.transaction).then(function(success){
           $location.url('/') 
        })
    }

});