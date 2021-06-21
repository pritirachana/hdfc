app.controller("trinityController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout,gratification,$sce) {

    $scope.broucherDownload = function(url){
        gratification.sendPoints('user_self_activity','trinity_booth_broucher','Trinity');
        $window.open(url, '_blank');
    }

    gratification.sendPoints('user_self_activity','trinity_booth_enter','Trinity');

    $scope.popupVideoSolution = false;

    $scope.showVideoSolution = function(url){
        $scope.popupVideoSolution = true;
        $scope.currentpopupvideo = $sce.trustAsResourceUrl(url);
    }

    $scope.showchatWithUs = function(){
        console.log("show chat");
        $scope.chatwithuspopup = true;
    }

    $scope.hidechatWithUs = function(){
        $scope.chatwithuspopup = false;
    }

    $scope.showVideoSolution = function(url){
        $scope.popupVideoSolution = true;
        $scope.currentpopupvideo = $sce.trustAsResourceUrl(url);
    }

    if($scope.popupVideoSolution == true){
        $rootScope.mainLoader = false;
    }

    $scope.startVideo = function(){

        var iframe = angular.element(document.querySelector('#popupVideoSolution'));
        var player = new Vimeo.Player(iframe);
        
            // player.play();
        player.on('play', function() {
           // gratification.sendPoints('user_self_activity','avaya_booth_ucaas_solution_start_intro_video');
        });
        player.on('ended', function(data) {
            console.log('Video Ended');
            gratification.sendPoints('user_self_activity','google_cloud_booth_product_video');
        });

    }

    $scope.hideVideoSolution = function(){

        $rootScope.mainLoader = true;
        $scope.popupVideoSolution = false;

        // var iframe = angular.element(document.querySelector('#popupVideoSolution'));
        // var player = new Vimeo.Player(iframe);
        
        // player.unload().then(function() {
        //     // The video has been unloaded
        //     console.log('come here');
        // });
        
        $rootScope.mainLoader = false;
        
    }

     setInterval(function () {
        $socket.emitIndividualExhibitionChat("avaya_on_exhibition", {"user_data" : $rootScope.currentUser, "stall_id" : 3});
      }, 1000);

     
   
       $socket.emitIndividualExhibitionChat("avaya_fetch_history", {"user_id" : $rootScope.currentUser.id, "exhibitor_id" : 3});


       $socket.on("avaya_exhi_user_chat_history", function (data) {
                // console.log(data);
                if (data.data.user_id ==  $rootScope.currentUser.id && data.data.exhibitor_id == 3) {
                  var divElement = angular.element(document.querySelector('.message-container'));
                  divElement.empty();
                  angular.forEach(data.msg, function (value, key) {
                      var value = JSON.parse(value);    
                      let comment = angular.element('<div class="expo-chat"><div class="name-time"><h2 class="expo-name">' + value.name +  '</h2><h2 class="expo-time">' + value.time + '</h2></div><div class="expo-message"><h2>' + value.message + '</h2></div></div>');
                      divElement.append(comment);
                      $compile(divElement)($scope);
                  // angular.element(divElement)[0]['scrollTop'] = divElement[0]['scrollHeight'];
                  });
              }
       });


       $scope.$on("$destroy", function(){
            $rootScope.new_notification_alert = 0;
           $socket.off("avaa_new_msgs_from_exhibitor");
           $socket.emitIndividualExhibitionChat("avaya_off_exhibition", {"user_data" : $rootScope.currentUser, "stall_id" : 3});
       });
   
       $socket.on("avaya_new_msgs_from_exhibitor", function(data) {
                console.log(data);
                console.log(data.user_id == $rootScope.currentUser.id && data.exhibitor_id == 3);
                if (data.user_id == $rootScope.currentUser.id && data.exhibitor_id == 3) {
                  $rootScope.new_notification_alert = "new-notification-alert";
                var notiElement = angular.element(document.querySelector('.notification-text-box'));
                let notification = angular.element('<div class="notification-box"><div class="notification-chat"><div class="notificationchat-text"><a href="#"><span class="notification-chat-name">'+data.exhibitor_name+' sent you a message! Please click on chat with us button.</span></a><span class="notification-chat-time"></span></div><div class="notification-chat-para"><p></p></div></div></div>');
                notiElement.prepend(notification);
                $compile(notiElement)($scope);
                var divElement = angular.element(document.querySelector('.message-container'));
                   var today = new Date();
                   var time = today.getHours() + ":" + today.getMinutes();
                   // var first_newval = $rootScope.getUserName(data.user.firstName, data.user.lastName);

                   let comment = angular.element('<div class="expo-chat"><div class="name-time"><h2 class="expo-name">' + data.exhibitor_name +  '</h2><h2 class="expo-time">' + time + '</h2></div><div class="expo-message"><h2>' + data.message + '</h2></div></div>');
                   // console.log(comment);
                   divElement.append(comment);
                   $compile(divElement)($scope);
                   // angular.element(divElement)[0]['scrollTop'] = divElement[0]['scrollHeight'];
               }
           });


        $scope.sendMessage = function(message) {
            
            console.log(message, "OK2");
            var exhibitor_id = 3;
            console.log("exhibitor_id", exhibitor_id)
            console.log($rootScope.currentUser);
            if (message != '') {
                var divElement = angular.element(document.querySelector('.message-container'));
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes();
                $socket.emitIndividualExhibitionChat("avaya_new_msgs_user", {"user_data": $rootScope.currentUser, "exhibitor_id" : 3, "message" : message});
                // $socket.emitEventGroupChat('groupchat', { event_id: $rootScope.currentEvent, message: message, user: $rootScope.currentUser });
                let comment = angular.element('<div class="expo-chat"><div class="name-time"><h2 class="expo-name">' + $rootScope.currentUser.name +  '</h2><h2 class="expo-time">' + time + '</h2></div><div class="expo-message"><h2>' + message + '</h2></div></div>');
                divElement.append(comment);
                $compile(divElement)($scope);
                angular.element(divElement)[0]['scrollTop'] = divElement[0]['scrollHeight'];
            }
            $scope.message = '';
        }

});