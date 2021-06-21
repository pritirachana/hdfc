app.controller("media2Controller", function($scope,gratification, $rootScope, $state, $compile, $window, $socket, $timeout) {

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
        }if (arg == 'video3') {
            $scope.popupvideo3 = true;
        }if (arg == 'video4') {
            $scope.popupvideo4 = true;
        }if (arg == 'video5') {
            $scope.popupvideo5 = true;
        }if (arg == 'video6') {
            $scope.popupvideo6 = true;
        }if (arg == 'video7') {
            $scope.popupvideo7 = true;
        }if (arg == 'video8') {
            $scope.popupvideo8 = true;
        }if (arg == 'video9') {
            $scope.popupvideo9 = true;
        }if (arg == 'video10') {
            $scope.popupvideo10 = true;
        }if (arg == 'video11') {
            $scope.popupvideo11 = true;
        }if (arg == 'video12') {
            $scope.popupvideo12 = true;
            
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
        $scope.popupvideo7 = false;
        $scope.popupvideo8 = false;
        $scope.popupvideo9= false;
        $scope.popupvideo10 = false;
        $scope.popupvideo11 = false;
        $scope.popupvideo12 = false;
    }


});