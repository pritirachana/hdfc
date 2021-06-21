app.controller("googleController", function($http,gratification, $scope, $rootScope, $state, $compile, $window, $socket, $timeout) {
	setInterval(function () {
    	$socket.emitIndividualExhibitionChat("avaya_on_exhibition", {"user_data" : $rootScope.delegateData, "stall_id" : 2});  
	  }, 1000);	
	  
	  $scope.hdc = {};
	  $scope.show = false;
	  $scope.popupvideo = false;
	  $scope.popupvideo2 = false;
  
	  $scope.myTrigger = function(arg) {
	  	gratification.sendPoints('user_self_activity', "views_videos");
		  if (arg == 'video') {
			  $scope.popupvideo = true;
			  
		  }if (arg == 'video2') {
			  $scope.popupvideo2 = true;
			  
		  } else if (arg == 'document1') {
			  var documentdown = angular.element(document.querySelectorAll('#downloaddocument1'));
			  console.log(documentdown);
			  documentdown[0].click();
		  }  
	  }

	  $scope.gametracking = function(){
	  		var fullName = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
            var req = {
                method: 'POST',
                url: 'https://avayaapis.virtex.in/analyticsCount',
                data: {"userId":$rootScope.currentUser.id,"event_type":"game_play","user_name": fullName, "both_name": "google"}
            }

            $http(req).then(function(data){
                console.log(data);
            });
	  	}
  
	  $scope.closePopup = function() {
		  $scope.popupvideo = false;
		  $scope.popupvideo2 = false;
	  }

	  $scope.brochurePoints = function () {
		
		gratification.sendPoints('user_self_activity', "reads_brochures_flyers_posters");
	}

		$scope.googleChat = function(){
			$('.main-chat').empty();
			var req = {
			 	method: 'POST',
			 	url: $rootScope.urlprefix + '/exebitor',
			 	data: {"stallId":"2"}
			}

			$http(req).then(function(data){
			    console.log(data.data.data[0]);
			    $rootScope.listUser = data.data.data[0]['items'];
			    console.log($rootScope.listUser);
			});
		}

		var req = {
		 	method: 'POST',
		 	url: $rootScope.urlprefix + '/exebitor',
		 	data: {"stallId":"2"}
		}

		$http(req).then(function(data){
		    console.log(data.data.data[0]);
		    $rootScope.listUser = data.data.data[0]['items'];
		    console.log($rootScope.listUser);
		});

		$scope.submitFeedback = function (feedback) {
			console.log(feedback);

			var fullName = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
			feedback.name = fullName;
	        	var req = {
	                method: 'POST',
	                url: 'https://avayaapis.virtex.in/analyticsCount',
	                data: {"userId":$rootScope.currentUser.id,"event_type":"booth_form","user_name": JSON.stringify(feedback), "both_name": "google"}
	            }

	            $http(req).then(function(data){
	                console.log(data);
	                $scope.feedback.first_name = "";
					    $scope.feedback.last_name = "";
					    $scope.feedback.job_role = "";
					    $scope.feedback.company = "";
					    $scope.feedback.country = "";
					    $scope.feedback.state = "";
					    $scope.form_thank_you = true;
					    setTimeout(function(){
						  	$scope.form_thank_you=false;
						},3000);
	            	});
            	
			}


		var req = {
			 	method: 'POST',
			 	url: $rootScope.urlprefix + '/exebitor',
			 	data: {"stallId":"2"}
			}

			$http(req).then(function(data){
				console.log(data.data.data[0].items[0].user.message);
			    $scope.booth_message = data.data.data[0].items[0].user.message;
			    // $rootScope.listUser = data.data.data[0]['items'];
			    // console.log($rootScope.listUser);
			});	
}); 