var app = angular.module('ngApp', [
  'ngRoute'
  ]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl", activetab: 'home'})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl", activetab: 'about'})
    .when("/work", {templateUrl: "partials/work.html", controller: "PageCtrl", activetab: 'work'})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl", activetab: 'contact'})
    // Blog
    //.when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    //.when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls the Nav
 */
app.controller('NavCtrl', function ($scope,$route){
  $scope.$route = $route;
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ($scope, $location, $http, $window ) {
});

/**
 * Controls ContactForm
 */
app.controller('FormController', ['$http', '$scope','$window',
    function ($http,$scope,$window){
    $scope.message = {};

    // send data to action.php on submit
    $scope.handleFormSubmit = function (message) {

            /*----
            Un comment the following lines to enable action.php script
            ----*/
        $http.post('scripts/contact_form.php', message).success(function (data, status) {
             if (data.success) {
                 $window.alert("Thank you! Your message has been sent.");
                $scope.message = {};

                 // display success message
                 $scope.$parent.message = true;
            }      
         }).error(function (data, status) {
             $window.alert("Sorry, there was a problem!");
         });
       };

}]);


