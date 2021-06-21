app.controller("expobriefController", function($scope, $rootScope,  $state, $compile, $window, $socket, $timeout) {

    $scope.hdc = {};
    $scope.show = false;
    $scope.popupvideo = false;

    $scope.redirect = function() {
        $scope.showvideo = false;
        $state.go('stage');
    }

    $scope.myTrigger = function(arg) {
        if (arg == 'video') {
            $scope.popupvideo = true;
        } else if (arg == 'document') {
            var documentdown = angular.element(document.querySelectorAll('#downloaddocument'));
            console.log(documentdown);
            documentdown[0].click();
        } else if (arg == 'back') {
            $state.go('expo');
        } else if (arg == 'sociamedia') {

            $window.open('https://www.facebook.com/SeciLimited/', '_blank');

        } else if (arg == 'feedback') {
            //window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSefqOGdRRi2VOMGJzfWgftKcJ4PCx1srY2Hk_QzjGY2EdnMdg/viewform'
            $window.open('https://docs.google.com/forms/d/e/1FAIpQLSefqOGdRRi2VOMGJzfWgftKcJ4PCx1srY2Hk_QzjGY2EdnMdg/viewform', '_blank');
        }

    }

    $scope.closePopup = function() {
        $scope.popupvideo = false;
    }
     // $socket.on('notification', function(data) {

          
     //        console.log('aaaa');
           
                
     //    });
       // const IndividualChat = io('https://almond.atechnos.net:4000/IndividualChat');

       //  IndividualChat.on('connection', socket => {
       //    console.log('someone connected');
       //  });

       //  IndividualChat.emit('hi', 'everyone!');
       //    socket.emit('',data)
       console.log($rootScope.currentUser.firstName);
        console.log($rootScope.currentUser.lastName);
       $socket.emitIndividualExhibitionChat('IndividualChat', {"name" : $rootScope.currentUser.firstName + ' '+ $rootScope.currentUser.lastName});
       // console.log(name);
       $socket.onIndividualExhibitionChat('joinroom', function(data){
        console.log(data);
       });
       // $socket.emitIndividualExhibitionChat('individual_chat_exhibutor', {"name" : $rootScope.currentUser.firstName + ' '+ $rootScope.currentUser.lastName});
      $socket.emitIndividualExhibitionChat('individual_chat_exhibutor', {"data" : $rootScope.currentUser});
       console.log(name);

});