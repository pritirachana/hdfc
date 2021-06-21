app.controller("sessionsController", function($scope, $rootScope, $http, $state, $compile, $window, $socket) {

    $rootScope.loggedin = true;


    $scope.myTrigger = function() {
        $scope.popupvideo = true;

    }

    $scope.closePopup = function() {
        $scope.popupvideo = false;
    }
   
        var req = {
 method: 'POST',
 url: 'http://13.127.241.191:4040/apiv1/getagenda',
 headers:  {"Authorization": localStorage.getItem('accessToken')}
}

$http(req).then(function(data){
    console.log(data)
});
});
