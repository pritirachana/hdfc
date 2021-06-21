app.controller("orgController", function($http, $scope, gratification, $rootScope, $state, $compile, $window, $socket, $timeout) {
	setInterval(function () {
    	$socket.emitIndividualExhibitionChat("avaya_on_exhibition", {"user_data" : $rootScope.delegateData, "stall_id" : 1});  
	  }, 1000);	
	  
	  $scope.hdc = {};
	  $scope.show = false;
	  $scope.popupvideo = false;
	  $scope.popupvideo2 = false;
  
	  $scope.myTrigger = function(arg) {
	  		gratification.sendPoints('user_self_activity', "views_videos");
		  	if (arg == 'video') {
			  	$scope.popupvideo = true;  
		  	} else if (arg == 'video2') {
			  $scope.popupvideo2 = true;
		  	} else if (arg == 'document1') {
			  var documentdown = angular.element(document.querySelectorAll('#downloaddocument1'));
			  console.log(documentdown);
			  documentdown[0].click();
		  }
	  }
  
		$scope.closePopup = function() {
			$scope.popupvideo = false;
			$scope.popupvideo2 = false;
		}

		$scope.videotracking = function(){
			var fullName = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
            var req = {
                method: 'POST',
                url: 'https://avayaapis.virtex.in/analyticsCount',
                data: {"userId":$rootScope.currentUser.id,"event_type":"booth_video","user_name": fullName, "both_name": "org"}
            }

            $http(req).then(function(data){
                console.log(data);
            });
		}

		$scope.gametracking = function(){
			var fullName = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
            var req = {
                method: 'POST',
                url: 'https://avayaapis.virtex.in/analyticsCount',
                data: {"userId":$rootScope.currentUser.id,"event_type":"game_play","user_name": fullName, "both_name": "org"}
            }

            $http(req).then(function(data){
                console.log(data);
            });
		}

		$scope.orgChat = function(){
			$('.main-chat').empty();
		  	var req = {
			 	method: 'POST',
			 	url: $rootScope.urlprefix + '/exebitor',
			 	data: {"stallId":"1"}
			}

			$http(req).then(function(data){
			    $rootScope.listUser = data.data.data[0]['items'];
			});
		}

		var req = {
		 	method: 'POST',
		 	url: $rootScope.urlprefix + '/exebitor',
		 	data: {"stallId":"1"}
		}

		$http(req).then(function(data){
			console.log(data.data.data[0].items[0].user.message);
		    $scope.booth_message = data.data.data[0].items[0].user.message;
		    $rootScope.listUser = data.data.data[0]['items'];
		    // console.log($rootScope.listUser);
		});	

		$scope.submitFeedback = function (feedback) {
			console.log(feedback);
			var fullName = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
			feedback.name = fullName;
        	var req = {
                method: 'POST',
                url: 'https://avayaapis.virtex.in/analyticsCount',
                data: {"userId":$rootScope.currentUser.id,"event_type":"booth_form","user_name": JSON.stringify(feedback), "both_name": "org"}
            }

            $http(req).then(function(data){
                console.log(data);
                $scope.feedback.website = "";
			    $scope.feedback.email = "";
			    $scope.feedback.message = "";
			    $scope.form_thank_you = true;
			    setTimeout(function(){
				  	$scope.form_thank_you=false;
				},3000);
			    // $scope.feedback.country = "";
			    // $scope.feedback.state = "";
            });
		}
});