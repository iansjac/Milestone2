(function () {

    function friendProvider ($resource,authenticationSvc ) {

        this._server_host = "";

        this.getFriends = function () {
           return  $resource(this._server_host+"/friendslist",null,  
                                {query: {method: 'GET',
                                        isArray: true,
                                        headers: {'access_token': authenticationSvc.getUserInfo().accessToken}
                                        },
                                 get:  {method: 'GET',
                                        headers: {'access_token': authenticationSvc.getUserInfo().accessToken}
                                        }
                                }
                            );
 
        };    
    
    
    this.getFriendRequests = function () {
           return  $resource(this._server_host+"/friendrequests",null,  
                                {query: {method: 'GET',
                                        isArray: true,
                                        headers: {'access_token': authenticationSvc.getUserInfo().accessToken}
                                        },
                                 get:  {method: 'GET',
                                        headers: {'access_token': authenticationSvc.getUserInfo().accessToken}
                                        }
                                }
                            );
 
        };    
   
 
 this.setFriendRequests = function () {
           return  $resource(this._server_host+"/search/:username",null,  
                                {save:  {method: 'POST',
                                        headers: {'access_token': authenticationSvc.getUserInfo().accessToken}
                                        },
                                }
                            );
 
        };    
    
    }
    thindrApp.service("friendProvider", [ '$resource','authenticationSvc', friendProvider]);

})();