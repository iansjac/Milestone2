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
    }

    thindrApp.service("transactionProvider", [ '$resource','authenticationSvc', transactionProvider]);

})();