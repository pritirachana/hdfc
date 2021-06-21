app.controller("speakerController", function($scope,$http, $rootScope, $state, $compile, $window, $socket, $timeout,gratification,$sce,$timeout) {

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
   
   console.log($rootScope.currentUser.user_type == 2);

   if ($rootScope.currentUser.user_type == 2) {
      $http.post('https://devapi.virtex.in/api/cii-bio/get-session-list-by-speaker',{userType: $rootScope.currentUser.user_type, userEmail: $rootScope.currentUser.email}).then(function(result){
      console.log(result);
      $scope.allsessions = result.data.live_session?result.data.live_session:[];
      if($scope.allsessions.length == 0){
         $scope.currentMessage = result.data.message;
      }

      
      
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
   } else {
      console.log("not a speaker");
      $scope.currentMessage = "You don't have access to this lounge!";
   }


   

   $scope.currentSession = function(session){

      $rootScope.currentSession = session;
      console.log(session.meating_link);
      window.open(session.meating_link, '_blank'); 
      // $state.go('auditorium');

   }

});