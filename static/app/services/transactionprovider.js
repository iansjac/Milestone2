(function () {

    function transactionProvider ($resource,authenticationSvc ) {

        this._server_host = "";

        this.getTransactions = function () {
           return  $resource(this._server_host+"/transactionrequests",null,  
                                {query: {method: 'GET',
                                        isArray: true,
                                        headers: {'access_token': authenticationSvc.getUserInfo().accessToken}
                                        },
                                 save:  {method: 'POST',
                                        headers: {'access_token': authenticationSvc.getUserInfo().accessToken}
                                        },
                                 get:  {method: 'GET',
                                        headers: {'access_token': authenticationSvc.getUserInfo().accessToken}
                                        }
                                }
                            );
 
        };    
        
        this.getAcceptOneTransactions = function () {
           return  $resource(this._server_host+"/friendslist/:friendId/transactions/:transactionId",null,  
                                {query: {method: 'GET',
                                        isArray: true,
                                        headers: {'access_token': authenticationSvc.getUserInfo().accessToken}
                                        },
                                 save:  {method: 'PUT',
                                        headers: {'access_token': authenticationSvc.getUserInfo().accessToken}
                                        },
                                 get:  {method: 'GET',
                                        headers: {'access_token': authenticationSvc.getUserInfo().accessToken}
                                        }
                                }
                            );
 
        }; 
        
        this.makeTransactions = function () {
           return  $resource(this._server_host+"/friendslist/:friendId/transactions",null,  
                                {query: {method: 'GET',
                                        isArray: true,
                                        headers: {'access_token': authenticationSvc.getUserInfo().accessToken}
                                        },
                                 save:  {method: 'POST',
                                        headers: {'access_token': authenticationSvc.getUserInfo().accessToken}
                                        },
                                 get:  {method: 'GET',
                                        headers: {'access_token': authenticationSvc.getUserInfo().accessToken}
                                        }
                                }
                            );
 
        }; 
    }

    thindrApp.service("transactionProvider", [ '$resource','authenticationSvc', transactionProvider]);

})();