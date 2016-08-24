var app = angular.module('ngApp', [
  'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/work", {templateUrl: "partials/work.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    // Blog
    //.when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    //.when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls the Nav
 */
app.controller('NavCtrl', function ($scope){
  
 //  $scope.navClick = function(){ 
 //  		$('.mainNav a').removeClass('active');
 //  		$(this).addClass('active');
	// }
  $scope.getClass = function (path) {
    return ($location.path().substr(0, path.length) === path) ? 'active' : '';
  }
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ($scope, $location, $http ) {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  // $('.carousel').carousel({
  //   interval: 5000
  // });

  // Activates Tooltips for Social Links
  // $('.tooltip-social').tooltip({
  //   selector: "a[data-toggle=tooltip]"
  // })
});


