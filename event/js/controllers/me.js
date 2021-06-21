app.controller("meController", function($http, $scope, $rootScope, $state, $compile, $window, $socket, $timeout) {
		setInterval(function () {
    	$socket.emitIndividualExhibitionChat("avaya_on_exhibition", {"user_data" : $rootScope.delegateData, "stall_id" : 4});  
	  	}, 1000);
	  
	  $scope.hdc = {};
	  $scope.show = false;
	  $scope.popupvideo = false;
	  $scope.popupvideo2 = false;
  
	  $scope.myTrigger = function(arg) {
		  if (arg == 'video') {
			  $scope.popupvideo = true;
			  gratification.sendPoints('user_self_activity', "views_videos");
			  
		  }if (arg == 'video2') {
			  $scope.popupvideo2 = true;

		}if (arg == 'video3') {
				$scope.popupvideo3 = true;

			}if (arg == 'video4') {
				$scope.popupvideo4 = true;


			}if (arg == 'video5') {
				$scope.popupvideo5 = true;


		  } else if (arg == 'document1') {
			  var documentdown = angular.element(document.querySelectorAll('#downloaddocument1'));
			  console.log(documentdown);
			  documentdown[0].click();
		  }
  
	  }
  
	  $scope.closePopup = function() {
		  $scope.popupvideo = false;
		  $scope.popupvideo2 = false;
		  $scope.popupvideo3 = false;
		  $scope.popupvideo4 = false;
		  $scope.popupvideo5 = false;
		  $scope.popupvideo6 = false;
	  }

    $scope.gametracking = function(){
  		var fullName = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
        var req = {
            method: 'POST',
            url: 'https://avayaapis.virtex.in/analyticsCount',
            data: {"userId":$rootScope.currentUser.id,"event_type":"game_play","user_name": fullName, "both_name": "me"}
        }

        $http(req).then(function(data){
            console.log(data);
        });
  	}

  	$scope.videotracking = function(){
		var fullName = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
        var req = {
            method: 'POST',
            url: 'https://avayaapis.virtex.in/analyticsCount',
            data: {"userId":$rootScope.currentUser.id,"event_type":"booth_video","user_name": fullName, "both_name": "me"}
        }

        $http(req).then(function(data){
            console.log(data);
        });
	}

	$scope.brochuretracking = function() {
		var fullName = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
        var req = {
            method: 'POST',
            url: 'https://avayaapis.virtex.in/analyticsCount',
            data: {"userId":$rootScope.currentUser.id,"event_type":"brochure_download","user_name": fullName, "both_name": "me"}
        }

        $http(req).then(function(data) {
            console.log(data);
        });
	}

	$scope.meChat = function() {  
		$('.main-chat').empty();
	  	var req = {
		 	method: 'POST',
		 	url: $rootScope.urlprefix + '/exebitor',
		 	data: {"stallId":"4"}
		}

		$http(req).then(function(data){
		    $rootScope.listUser = data.data.data[0]['items'];
		});
	}	

	var req = {
	 	method: 'POST',
	 	url: $rootScope.urlprefix + '/exebitor',
	 	data: {"stallId":"4"}
	}

	$http(req).then(function(data){
	    $rootScope.listUser = data.data.data[0]['items'];
	});


	$scope.brochurePoints = function () {		
		gratification.sendPoints('user_self_activity', "reads_brochures_flyers_posters");
	}

	$scope.submitFeedback = function (feedback) {
		console.log(feedback);
		var fullName = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
		feedback.name = fullName;
    	var req = {
            method: 'POST',
            url: 'https://avayaapis.virtex.in/analyticsCount',
            data: {"userId":$rootScope.currentUser.id,"event_type":"booth_form","user_name": JSON.stringify(feedback), "both_name": "me"}
        }

        $http(req).then(function(data){
            console.log(data);
            $scope.feedback.website = "";
            $scope.feedback.email_domain = "";
		    $scope.feedback.domain_extension = "";
		    $scope.form_thank_you = true;
		    setTimeout(function(){
			  	$scope.form_thank_you=false;
			},3000);
        });
	}


			var req = {
			 	method: 'POST',
			 	url: $rootScope.urlprefix + '/exebitor',
			 	data: {"stallId":"4"}
			}

			$http(req).then(function(data){
				console.log(data.data.data[0].items[0].user.message);
			    $scope.booth_message = data.data.data[0].items[0].user.message;
			    // $rootScope.listUser = data.data.data[0]['items'];
			    // console.log($rootScope.listUser);
			});		
});