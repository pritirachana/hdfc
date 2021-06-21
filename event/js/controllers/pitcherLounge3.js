app.controller("pitcherController", function($scope,$http, $rootScope, $state, $compile, $window, $socket, $timeout,gratification,$sce,$timeout) {

    // var chat = angular.element(document.querySelector('#chat-app'));
    // // var toggles = angular.element(chat.querySelectorAll(".toggle"));
  

    // $timeout(() => {
    //   chat.removeClass("is-active");
    // }, 1000);

    // $scope.closeChat = function(){
    //     chat.removeClass("is-active");
    // }

    // $scope.openChat = function(){
    //     chat.addClass("is-active");
    // }

    // $scope.sendWorkshopMessage = function (workshop_message) {
    //     console.log(workshop_message);
    //     if (workshop_message != "") {
    //         var name = $rootScope.currentUser.first_name +" "+ $rootScope.currentUser.last_name;
    //         $socket.emit("workshop_group_chat", {"userId": $rootScope.currentUser.id,"userName" : name ,"message" : workshop_message, "category":"wchat"});
    //         $scope.workshop_message = '';
    //     }        
    // }

    // $socket.on("new_workshop_group_chat", function () {
    //     var notiElement = angular.element(document.querySelector('#workshop_chat'));
    //     let notification = angular.element('<div class="message reply"><p class="user_name">'+data.userName+'</p><p class="text">'+data.message+'</p></div>');
    //     notiElement.append(notification);
    //     $compile(notiElement)($scope);
    // });

    // var req = {
    //         method: 'POST',
    //         url: $rootScope.urlprefix + '/ListComments',
    //         data: {"status":"approved","category":"wchat"}
    //     }

    // $http(req).then(function(data){
    //     console.log(data);
    //     $rootScope.workshopchat = data.data.data;
    // });


    if($rootScope.event_id == $rootScope.currentUser.eventId){
      var currentType = 0;
   }else{
      var currentType = 1;
   }


   console.log($rootScope.currentUser.email);
   
   $http.post('https://devapi.virtex.in/api/cii-bio/get-meeting-list',{userType: $rootScope.currentUser.user_type, userEmail: $rootScope.currentUser.email}).then(function(result){
    console.log(result);
    
    
    $scope.allsessions = result.data.live_meting?result.data.live_meting:[];
    if($scope.allsessions.length == 0){
       $scope.currentMessage = result.data.message;
    }

    $scope.upcomingsessions = result.data.upcoming_meting?result.data.upcoming_meting:[];
    
    if($scope.allsessions.length > 1){
   
      if(result.data && result.data.sessionType && result.data.sessionType == 'PREVIOUS'){
         $scope.previous_recording  = true;
       }else{
          
         $scope.previous_recording  = false;
         if($scope.allsessions.length == 1){
            $rootScope.currentSession = $scope.allsessions[0];
            $state.go('auditorium');
         }
       }
 
    }

   }).catch(function(error){

    console.log(error);

   });

   $scope.currentSession = function(session){

      $rootScope.currentSession = session;
      console.log(session.meating_link);
      window.open(session.meating_link, '_blank'); 
      // $state.go('auditorium');

   }


   $scope.compareDate = function(start_time, end_time){
            var startStr = "2021-03-02 " + start_time;
            var endStr = "2021-03-02 " + end_time;
            var start = new Date(startStr);
            var end = new Date(endStr);
            var d = new Date();

            var startDiff = start.getMinutes() - d.getMinutes();
            var endDiff = end.getMinutes() - d.getMinutes();

            // console.log(typeof start - d);
            // console.log(end - d);

            // console.log(start < d);
            // console.log(diff_minutes(start,d));

            var diff_minutes =(start.getTime() - d.getTime()) / 1000;
            diff_minutes /= 60;
            diff_minutes = Math.abs(Math.round(diff_minutes));          // console.log("test");
            if ((start < d) && (end > d)) {
                  return true;
                // } else if (startDiff < -11) {
                //   return true;
                // } else if (endDiff < 11) {
                //   return true;
                // } else {
                  return false;
                }

            // console.log((startDiff > 0) && (startDiff < 11));

            if ((diff_minutes > 0) && (diff_minutes < 11)) {
              // console.log("10 diff");
              return true;
            }
            // var diff = fieldDate.getMinutes() - d.getMinutes();
            // console.log(diff);
            // if(start.getHours() == d.getHours()){
                
            //     // console.log(startDiff);
            //     // console.log(endDiff);
                
            //     // if ((startDiff <= 10) || (-10 >= endDiff)) {
            //     //   return true;
            //     // }
            // }
            // else{
            //     return false;
            // }

        };



   $scope.pitcherMeet = function (session) {
        var exhi_id = $('.exhi_id').text();
        $('#jitsiContainer2').empty();
        $("#jitsiModal").modal({backdrop: false});
        if (session.c_flag == 0) {
          var domain = "meetings.virtex.in";
          var meet = "meetings.virtex.in";
        } else if (session.c_flag == 1) {
          var domain = "meetings1.virtex.in";
          var meet = "meet.jit.si";
        } else if (session.c_flag == 2) {
          var domain = "meetings2.virtex.in";
          var meet = "meet.jit.si";
        } else if (session.c_flag == 3) {
          var domain = "meetings3.virtex.in";
          var meet = "meet.jit.si";
        } else if (session.c_flag == 4) {
          var domain = "meetings4.virtex.in";
          var meet = "meet.jit.si";
        }
        // console.log(domain); return;
        var room_name = session.meating_link.split(domain);
        console.log(room_name);

        var options = {
            roomName: room_name[1],
            width: '100%',
            height: '100%',
            parentNode: document.querySelector('#jitsiContainer2'),
            configOverwrite: {
                prejoinPageEnabled:false,
                disable1On1Mode:false,
                disableSimulcast: true,
                disableProfile:true,
                disableInviteFunctions:true
            },
            interfaceConfigOverwrite: {
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                HIDE_INVITE_MORE_HEADER:true,
                disableInviteFunctions:true,
                DEFAULT_REMOTE_DISPLAY_NAME:'VIRTEX ALMOND',
                TOOLBAR_BUTTONS:['microphone', 'camera','fodeviceselection', 'hangup','mute-everyone','raisehand','desktop','chat']
                //filmStripOnly: true
            },
            invitees:false
        }
          var api = new JitsiMeetExternalAPI(meet, options);
          api.on('readyToClose', () => {
              console.log("test close meeting");
              $("#jitsiModal").modal('hide');
              $("#jitsiContainer2").empty();
              window.location.href = "https://globalbioindiavirtual.com/event/#!/pitcherlounge";
          });
    };


    $timeout(function () {
        $state.reload();
    }, 300000);

});