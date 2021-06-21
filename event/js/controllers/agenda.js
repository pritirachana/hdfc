app.controller("agendaController", function($scope, $rootScope, $http, $state, $compile, $window, $socket){
	$scope.redirect = function(link, session_id){
		// alert("data");
		console.log(link);

  		$state.go('stage', {'link': link, 'session_id': session_id});

}
// $state.go('toState', { 'referer':'jimbob', 'param2':37, 'etc':'bluebell' });
 // $http.post("http://13.127.241.191:4040/apiv1/getagenda")
 //        .then(function(response) {
 //        	console.log(response);
              // $scope.mysession = response.data;
 //          });
//  var req = {
//  method: 'POST',
//  url: 'http://13.127.241.191:4040/apiv1/getagenda',
//  headers:  {"Authorization": localStorage.getItem('accessToken')}
// }

// $http(req).then(function(data){
//     console.log(data);
//     $scope.mysession = data.data.data;
// });
});

