var app = angular.module('ngApp');

app.controller('PortCtrl', function ($scope) {
	var portProjects = [{
						project: "Barneys New York",
						description: "Created Web app to organize tagging documention, with password authentication and the other fun stuff like that",
						technology:"AngularJs, Bootstrap, Html ",
						link: "http://barneys.com",
						thumbnailLink:"images/port1.jpg"
					 },
					 {
						project: "Macros App",
						description: "Now we can all stay on track",
						technology:"ReactJS, Node, Html ",
						link: "http://nike.com",
						thumbnailLink:"images/port2.jpg"

					 },
					 {
						project: "Fun Project",
						description: "are we having fun yet",
						technology:"AngularJs, Bootstrap, Html ",
						link: "http://barneyswarehouse.com",
						thumbnailLink:"images/port3.jpg"
					 }
]	

	

var i = 1,
    l = portProjects.length;

    $scope.previousProject = portProjects[i-1];
	$scope.currentProject = portProjects[i]; 
	$scope.upcomingProject = portProjects[i+1];
    	console.log("current is: "+ i)

 	$scope.nextProject = function(){ 
 		i+=1;
 		console.log("current is: "+ i)
 		
    	$scope.previousProject = portProjects[(i+l-1)%l];
		$scope.currentProject = portProjects[i>l-1?i=0:i];
		console.log("current is: "+ i)
		$scope.upcomingProject = portProjects[(i+1)%l];
		//i+=1;
		console.log("current is: "+ i)
		
 	}


});