var thindrApp = angular.module("thindrApp", ["ngRoute","ngResource"]);

thindrApp.config(function ($routeProvider) {
    $routeProvider
        .when("/profile",  { controller: "userController", 
                            templateUrl: "app/partials/Profile.html",
                            resolve: { //if user is not logged in direct user to login page.
							//The object sent here is boardcasted via $rootScope. If Route is resovled,
							//the event $routeChangeScucess is boradcast else $routeChangeError is boradcast
                                        auth: function ($q, authenticationSvc) {
                                            var userInfo = authenticationSvc.getUserInfo();
                                            console.log("resolve");
                                            if (userInfo) {
                    
                                                return $q.when(userInfo);
                                            } else {
                                                console.log("reject");
                                                return $q.reject({ authenticated: false });
                                            }
                                        }
                                    }
        })
        .when("/profile",  { controller: "UserController", templateUrl: "app/partials/Profile.html" })
        .when("/login", { templateUrl: "app/partials/login.html", controller: "LoginController" })
        .when("/friendslist", { templateUrl: "app/partials/FriendsList.html", controller: "friendlistcontroller"})
        .when("/transactionrequests", { templateUrl: "app/partials/Transaction.html", controller: "transactionController"})
        .when("/", {redirectTo: "/HomePage"})
        .otherwise({ redirectTo: "/404_page" });
});
thindrApp.run(["$rootScope", "$location", function ($rootScope, $location) {

    $rootScope.$on("$routeChangeSuccess", function (userInfo) {
        console.log(userInfo);
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
            $location.path("/login");
        }
    });
}]);