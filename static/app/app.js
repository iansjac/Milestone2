var recipesApp = angular.module("thindrApp", ["ngRoute","ngResource"]);

recipesApp.config(function ($routeProvider) {
    $routeProvider
        .when("/recipes",  { controller: "RecipeListController", 
                            templateUrl: "app/partials/recipe_list.html",
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
        .when("/users/:user_id",  { controller: "UserController", templateUrl: "app/partials/MyProfile.html" })
        .when("/login", {
            templateUrl: "app/partials/login.html",
            controller: "LoginController" })
        .when("/", {redirectTo: "/users"})
        .otherwise({ redirectTo: "/404_page" });
});
recipesApp.run(["$rootScope", "$location", function ($rootScope, $location) {

    $rootScope.$on("$routeChangeSuccess", function (userInfo) {
        console.log(userInfo);
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
            $location.path("/login");
        }
    });
}]);