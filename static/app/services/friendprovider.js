(function () {

    function friendProvider ($resource,authenticationSvc ) {

        this._server_host = "";

        this.getFriends = function () {
           return  $resource(this._server_host+"/friendslist",null,  
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

    thindrApp.service("frinedProvider", [ '$resource','authenticationSvc', friendProvider]);

})();