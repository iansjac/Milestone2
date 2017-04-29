(function () {

    // 1. declare our controller.
    function ViewRecipeController ($scope, $routeParams, recipeProvider) {

        $scope.finished_loading = false;
        $scope.page_load_error = null;

       $scope.recipe= recipeProvider.getRecipes().get({recipe_id: $routeParams.recipe_id},
                                  function (recipe) {
                                        $scope.finished_loading = true;
                                        $scope.recipe = recipe;
                                },function(err){
                $scope.page_load_error = "Unable to load recipe: " + JSON.stringify(err);
            
        });
    }

    // 2. create the controller and give it $scope.
    recipesApp.controller("ViewRecipeController", ['$scope', '$routeParams', 'recipeProvider', ViewRecipeController]);

})();
