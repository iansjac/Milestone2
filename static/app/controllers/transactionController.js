(function () {

    // 1. declare our controller.
    function transactionController ($scope,$location, transactionProvider,authenticationSvc) {

        $scope.userInfo = authenticationSvc.getUserInfo();
        $scope.new_transaction = { };
        $scope.add_transaction_error = null;
        
        $scope.page_load_error = null;
        $scope.finished_loading = false;

        function get_transactions() {
           $scope.transactions= transactionProvider.getTransactions().query(
            function(resp){
                $scope.finished_loading = true;
				$scope.transactions = resp;
			}, function(resp){
                    $scope.page_load_error = err.message;
            }); 

        }
    
        $scope.addTransaction = function (transaction_data) {
           var Tranaction = transactionProvider.makeTransactions();
		    var new_tranaction = new Tranaction(transaction_data)
            new_tranaction.$save({},function(data){
                    $scope.add_transaction_error = null;
                    get_transactions();
            },
            function(err){
              if (err) {
                    $scope.add_transaction_error = "(" + err.error + ") " + err.message;
              }
            });  
        };

        get_transactions();
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
    thindrApp.controller("transactionController", ['$scope', '$location','transactionProvider','authenticationSvc', transactionController]    );
    
     
})();
