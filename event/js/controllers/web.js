app.controller("webController", function($http, $scope, gratification, $rootScope, $state, $compile, $window, $socket, $timeout) {
	setInterval(function () {
    	$socket.emitIndividualExhibitionChat("avaya_on_exhibition", {"user_data" : $rootScope.delegateData, "stall_id" : 7});  
  	}, 1000);

	$scope.webChat = function(){
		$('.main-chat').empty();
	  	var req = {
		 	method: 'POST',
		 	url: $rootScope.urlprefix + '/exebitor',
		 	data: {"stallId":"7"}
		}

		$http(req).then(function(data){
		    console.log(data.data.data[0]);
		    $rootScope.listUser = data.data.data[0]['items'];
		    console.log($rootScope.listUser);
		});
	}	

	$scope.brochuretracking = function(){
		var fullName = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
        var req = {
            method: 'POST',
            url: 'https://avayaapis.virtex.in/analyticsCount',
            data: {"userId":$rootScope.currentUser.id,"event_type":"brochure_download","user_name": fullName, "both_name": "web"}
        }

        $http(req).then(function(data){
            console.log(data);
        });
	}

	var req = {
	 	method: 'POST',
	 	url: $rootScope.urlprefix + '/exebitor',
	 	data: {"stallId":"7"}
	}

	$http(req).then(function(data){
	    console.log(data.data.data[0]);
	    $rootScope.listUser = data.data.data[0]['items'];
	    console.log($rootScope.listUser);
	});

	$scope.brochurePoints = function () {
		console.log("brochure");
		gratification.sendPoints('user_self_activity', "reads_brochures_flyers_posters");
	}

	$scope.submitFeedback = function (feedback) {
		console.log(feedback);
		var fullName = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
		feedback.name = fullName;
    	var req = {
            method: 'POST',
            url: 'https://avayaapis.virtex.in/analyticsCount',
            data: {"userId":$rootScope.currentUser.id,"event_type":"booth_form","user_name": JSON.stringify(feedback), "both_name": "web"}
        }

        $http(req).then(function(data){
            console.log(data);
            $scope.feedback.name = "";
            $scope.feedback.company_name = "";
		    $scope.feedback.email = "";
		    $scope.feedback.contact = "";
		    $scope.form_thank_you = true;
		    setTimeout(function(){
			  	$scope.form_thank_you=false;
			},3000);
        });
	}


	var req = {
	 	method: 'POST',
	 	url: $rootScope.urlprefix + '/exebitor',
	 	data: {"stallId":"7"}
	}

	$http(req).then(function(data){
		console.log(data.data.data[0].items[0].user.message);
	    $scope.booth_message = data.data.data[0].items[0].user.message;
	});
});