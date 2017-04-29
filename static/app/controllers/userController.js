(function () {

    // 1. declare our controller.
    function userController ($scope,$location, transactionProvider,authenticationSvc) {

        $scope.userInfo = authenticationSvc.getUserInfo();
        $scope.new_user = { };
        $scope.add_user_error = null;
        
        $scope.page_load_error = null;
        $scope.finished_loading = false;

        function get_user() {
           $scope.user= userProvider.getUser().query(
            function(resp){
                $scope.finished_loading = true;
				$scope.transactions = resp;
			}, function(resp){
                    $scope.page_load_error = err.message;
            }); 

        }
    
        $scope.addUser = function (user_data) {
           var User = userProvider.setUser();
		    var new_user = new User(transaction_data)
            new_user.$save({},function(data){
                    $scope.add_transaction_error = null;
                    get_user();
            },
            function(err){
              if (err) {
                    $scope.add_user_error = "(" + err.error + ") " + err.message;
              }
            });  
        };

        get_user();
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
    thindrApp.controller("userController", ['$scope', '$location','userProvider','authenticationSvc', userController]    );
})();