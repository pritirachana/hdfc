app.controller("attendeesController", function($scope, $http,$rootScope, $state, $compile, $window, $socket, $timeout,gratification,$sce) {
	
	console.log("attendee")
	$http.post("https://avayaapis.virtex.in/apicb/attendees")
        .then(function(response) {
            console.log(response);
            $scope.attendee = response.data.data;
    });
});