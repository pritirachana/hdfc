app.controller("expoController2", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout,gratification) {

    $scope.hdc = {};
    $scope.show = false;
    $scope.popupvideo = false;

    $scope.redirect = function() {
        $scope.showvideo = false;
        $state.go('expobrief');
    }

    $scope.myTrigger = function(arg) {
        if (arg == 'middle') {
            $scope.showvideo = true;
            var videoElements = angular.element(document.querySelectorAll('#video'));
            videoElements[0].play();
            videoElements[0].onended = function() {
                $scope.redirect(); //alert("The audio has ended");
            };
        }

    }

    gratification.sendPoints('user_self_activity','expo_area');

    $scope.closePopup = function() {
        $scope.popupvideo = false;
    }
    

});