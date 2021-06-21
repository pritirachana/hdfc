app.controller("rcController", function($http,gratification, $scope, $rootScope, $state, $compile, $window, $socket, $timeout) {
	setInterval(function () {
    	$socket.emitIndividualExhibitionChat("avaya_on_exhibition", {"user_data" : $rootScope.delegateData, "stall_id" : 10});  
	  }, 1000);
	  
	  $scope.hdc = {};
	  $scope.show = false;
	  $scope.popupvideo = false;
	  $scope.popupvideo2 = false;


	  	$scope.gametracking = function(){
	  		var fullName = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
            var req = {
                method: 'POST',
                url: 'https://avayaapis.virtex.in/analyticsCount',
                data: {"userId":$rootScope.currentUser.id,"event_type":"game_play","user_name": fullName, "both_name": "reseller"}
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
                data: {"userId":$rootScope.currentUser.id,"event_type":"booth_video","user_name": fullName, "both_name": "reseller"}
            }

            $http(req).then(function(data){
                console.log(data);
            });
		}

		$scope.brochuretracking = function(){
			var fullName = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
            var req = {
                method: 'POST',
                url: 'https://avayaapis.virtex.in/analyticsCount',
                data: {"userId":$rootScope.currentUser.id,"event_type":"brochure_download","user_name": fullName, "both_name": "reseller"}
            }

            $http(req).then(function(data){
                console.log(data);
            });
		}

	 	$scope.rcChat = function(){
	 		$('.main-chat').empty();
			var req = {
			 	method: 'POST',
			 	url: $rootScope.urlprefix + '/exebitor',
			 	data: {"stallId":"10"}
			}

			$http(req).then(function(data){
				console.log(data.data.data[0].items[0].user.message);
			    $scope.booth_message = data.data.data[0].items[0].user.message;
			    $rootScope.listUser = data.data.data[0]['items'];
			    // console.log($rootScope.listUser);
			});	
		}

		var req = {
		 	method: 'POST',
		 	url: $rootScope.urlprefix + '/exebitor',
		 	data: {"stallId":"10"}
		}

		$http(req).then(function(data){
			console.log(data.data.data[0].items[0].user.message);
		    $scope.booth_message = data.data.data[0].items[0].user.message;
		    $rootScope.listUser = data.data.data[0]['items'];
		    // console.log($rootScope.listUser);
		});
  
	  $scope.myTrigger = function(arg) {
	  	gratification.sendPoints('user_self_activity', "views_videos");
		  if (arg == 'video') {
			  $scope.popupvideo = true;
			  
		  }if (arg == 'video2') {
			  $scope.popupvideo2 = true;

		}if (arg == 'video3') {
				$scope.popupvideo3 = true;

			}if (arg == 'video4') {
				$scope.popupvideo4 = true;


			}if (arg == 'video5') {
				$scope.popupvideo5 = true;

			}if (arg == 'video6') {
				$scope.popupvideo6 = true;

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

		$scope.brochurePoints = function () {
		
			gratification.sendPoints('user_self_activity', "reads_brochures_flyers_posters");
		}
				
});