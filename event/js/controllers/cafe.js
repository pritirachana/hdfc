app.controller("cafeController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout) {

    $scope.hdc = {};
    $scope.show = false;
    $scope.popupvideo = false;

    $scope.redirect = function() {
        $scope.showvideo = false;
        $state.go('stage');
    }

    $scope.myTrigger = function(arg) {
        if (arg == 'cafe_left') {
            $scope.popupvideo = true;
        } else if (arg == 'cafe_right') {
            $scope.popupvideo = true;
        }
    }

    $scope.closePopup = function() {
        $scope.popupvideo = false;
    }


});
