(function () {

    // 1. declare our controller.
    function friendListController ($scope,$location, frinedProvider,authenticationSvc) {

        $scope.userInfo = authenticationSvc.getUserInfo();
        $scope.new_friend = { };
        $scope.add_friend_error = null;
        
        $scope.page_load_error = null;
        $scope.finished_loading = false;

        function get_friends() {
           $scope.recipes= friendProvider.getFriends().query(
            function(resp){
                $scope.finished_loading = true;
				$scope.recipes = resp;
			}, function(resp){
                    $scope.page_load_error = err.message;
            }); 

        }
    
        $scope.addRecipe = function (friend_data) {
           var Friend = friendProvider.getFriends();
		    var new_friend = new User(friend_data)
            new_recipe.$save({},function(data){
                    $scope.add_friend_error = null;
                    get_friends();
            },
            function(err){
              if (err) {
                    $scope.add_friend_error = "(" + err.error + ") " + err.message;
              }
            });  
        };

        get_recipes();
        $scope.logout = function () {

            authenticationSvc.logout()
            .then(function (result) {
                $scope.userInfo = null;
                $location.path("/login");
            }, function (error) {
                console.log(error);
            });
    };

    }

    // 2. create the controller and give it $scope.
    thindrApp.controller("friendListController", ['$scope', '$location','friendProvider','authenticationSvc', friendListController]    );
    
     
})();
