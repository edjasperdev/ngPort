var app = angular.module('ngApp');

var getPrevProject = function(){

}
var getNextProject = function(){

}

app.controller('PortCtrl', function ($scope) {

	$scope.portProjects = [ 
					{
						project: "Barneys New York",
						description: "Created Web app to organize tagging documention, with password authentication and the other fun stuff like that",
						technology:"AngularJs, Bootstrap, Html ",
						link: "http://barneys.com",
						thumbnailLink:"../images/port1.jpg"
					 },
					 {
						project: "Macros App",
						description: "Now we can all stay on track"
						technology:"ReactJS, Node, Html ",
						link: "http://nike.com",
						thumbnailLink:"../images/port2.jpg"
					 },
					 {
						project: "Fun Project",
						description: "are we having fun yet"
						technology:"AngularJs, Bootstrap, Html ",
						link: "http://barneyswarehouse.com",
						thumbnailLink:"../images/port3.jpg"
					 }
],
 	$scope.prevProject = function(){ 
 		$('.thumbnail.current').animate('current','prev', 1000, "easeIn")
 		$('.thumbnail').switchClass('prev','next', 1000, "easeIn")
 		$('.thumbnail').switchClass('next','current', 1000, "easeIn")
  		alert("Up Arrow");
	}
	$scope.nextProject = function(){ 
  		alert("Down Arrow");
	}
});