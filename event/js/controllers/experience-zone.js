app.controller("experience-zoneController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout,gratification) {

    gratification.sendPoints('user_self_activity','avaya_expo_area');

    $scope.showVideo = function(){
        $scope.popupVideo = true;
    }

    $scope.hideVideo = function(){
        $scope.popupVideo = false;
    }

});