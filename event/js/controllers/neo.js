app.controller("neoController", function($scope, $http, gratification, $rootScope, $state, $compile, $window, $socket, $timeout) {
	setInterval(function () {
    	$socket.emitIndividualExhibitionChat("avaya_on_exhibition", {"user_data" : $rootScope.delegateData, "stall_id" : 6});  
  	}, 1000);

  	$scope.brochurePoints = function () {
  		console.log("brochure");	
		gratification.sendPoints('user_self_activity', "reads_brochures_flyers_posters");
	}

	$scope.neoChat = function() {
		$('.main-chat').empty();
		var req = {
		 	method: 'POST',
		 	url: $rootScope.urlprefix + '/exebitor',
		 	data: {"stallId":"6"}
		}

		$http(req).then(function(data){
		    $rootScope.listUser = data.data.data[0]['items'];
		});
	}	

	$scope.brochuretracking = function(){
		var fullName = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
        var req = {
            method: 'POST',
            url: 'https://avayaapis.virtex.in/analyticsCount',
            data: {"userId":$rootScope.currentUser.id,"event_type":"brochure_download","user_name": fullName, "both_name": "neo"}
        }

        $http(req).then(function(data){
            console.log(data);
        });
	}

	var req = {
	 	method: 'POST',
	 	url: $rootScope.urlprefix + '/exebitor',
	 	data: {"stallId":"6"}
	}

	$http(req).then(function(data){
		console.log(data.data.data[0].items[0].user.message);
	    $rootScope.booth_message = data.data.data[0].items[0].user.message;
	});
});