app.controller("feedbackController", function($http, $scope, $rootScope, $state, $compile, $window, $socket, $timeout,gratification,$sce) {
			// $scope.feedback = {
   //              session: '',
   //              rating: '',
   //              message: ''
   //          };


            // $scope.feedback = angular.copy($scope.feedback);

            //5. create submitStudentForm() function. This will be called when user submits the form
            $scope.submitFeedback = function (feedback) {

            	var req = {
				 	method: 'POST',
				 	url: $rootScope.urlprefix + '/sessionFeedback',
				 	data: {"userId":$rootScope.currentUser.id,"sessionName":feedback.session,"sessionStar":feedback.rating,"sessionComment":feedback.message}
				}

				$http(req).then(function(data){
				    console.log(data);
				    $scope.feedback.session = "";
				    $scope.feedback.rating = 0;
				    $scope.feedback.message = "";
				    // console.log(data.data.data[0]);
				    // $rootScope.listUser = data.data.data[0]['items'];
				    // console.log($rootScope.listUser);
				});
			}

			
});