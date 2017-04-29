(function () {

    function userProvider ($resource,authenticationSvc ) {

        this._server_host = "";

        this.getUser = function () {
           return  $resource(this._server_host+"/profile",null,  
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
    
        this.setUser = function () {
           return  $resource(this._server_host+"/register",null,  
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

    thindrApp.service("userProvider", [ '$resource','authenticationSvc', userProvider]);

})();
