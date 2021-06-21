app.controller("ucaasController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout,$http,gratification,$sce) {

    $scope.hideMeetingPopup = function(){
        $scope.showMeetingPopUp = 0;
        $scope.form_submit = false;  
    }

    $scope.showQuiz = function(){
        $scope.showQuizPopUp = 1;
    }

    $scope.showMeeting = function(){
        $scope.showMeetingPopUp = 1;
    }

    $scope.showFeedback = function(){
        $scope.showFeedbackPopUp = 1;
    }

    $scope.hideFeedbackPopup = function(){
        $scope.showFeedbackPopUp = 0;
        $scope.form_submit = false;  
    }

    $scope.hideQuizPopUp = function(){
        $scope.showQuizPopUp = 0;
    }

    $scope.meeting = {};


    $scope.submitMeeting = function(meeting_data){

        meeting_data.user_id = $rootScope.currentUser.id;
        meeting_data.booth = 'avaya_one_cloud_ucass';
        meeting_data.type = 'bookademo';

        $http({
            method: 'POST',
            url: $rootScope.urlprefix+'/schedule_a_meeting',
            data:meeting_data
        }).then(function(data){

            if(data.data.status == true){
                $scope.form_submit = true;     
                $scope.meeting = {};
                $scope.meetingForm.$setUntouched()
                meeting_data = {};           
            }else{
                
            }
        });
    }

    $scope.form_submit_feedback = false;  

    $scope.submitFeedback = function(feedback){

        feedback.user_id = $rootScope.currentUser.id;
        feedback.booth = 'avaya_one_cloud_ucass';

        $http({
            method: 'POST',
            url: $rootScope.urlprefix+'/feedback',
            data:feedback
        }).then(function(data){

            if(data.data.status == true){
                $scope.form_submit_feedback = true;     
                $scope.feedback = {};
                $scope.feedbackForm.$setUntouched()
                feedback = {};           
            }else{
                
            }
        },function(error){
            $scope.form_submit_feedback = true;     
            $scope.feedback = {};
            $scope.feedbackForm.$setUntouched()
            feedback = {};           
        });
    }

    

    $scope.popupVideo = true;

    $scope.startVideo = function(){
    
        var iframe = angular.element(document.querySelector('#popUpVideo'));
        var player = new Vimeo.Player(iframe);
        
            // player.play();
        player.on('play', function() {
            gratification.sendPoints('user_self_activity','avaya_booth_ucaas_start_intro_video');
        });
        player.on('ended', function(data) {
            console.log('Video Ended');
            gratification.sendPoints('user_self_activity','avaya_booth_ucaas_complete_intro_video');
        });
    
    }
    
    
    $scope.startVideoSolution = function(){
    
        var iframe = angular.element(document.querySelector('#popupVideoSolution'));
        var player = new Vimeo.Player(iframe);
        
            // player.play();
        player.on('play', function() {
            gratification.sendPoints('user_self_activity','avaya_booth_ucaas_solution_start_intro_video');
        });
        player.on('ended', function(data) {
            console.log('Video Ended');
            gratification.sendPoints('user_self_activity','avaya_booth_ucaas_solution_complete_intro_video');
        });
    
    }
    
    $scope.hideVideoSolution = function(){
        $scope.currentpopupvideo = '';
        $rootScope.mainLoader = true;
        $scope.popupVideoSolution = false;        
        $rootScope.mainLoader = false;
        
    }
    
    $scope.hideVideo = function(){
    
        $rootScope.mainLoader = true;
        $scope.popupVideo = false;
        
        $rootScope.mainLoader = false;
        
    }
    
      $scope.showVideoSolution = function(url){
        $scope.currentpopupvideo = $sce.trustAsResourceUrl(url);
        $scope.popupVideoSolution = true;
        
    }

    $scope.showchatWithUs = function(){
        $scope.chatwithuspopup = true;
    }

    $scope.hidechatWithUs = function(){
        $scope.chatwithuspopup = false;
    }
    


    $scope.broucherDownload = function(url){
        gratification.sendPoints('user_self_activity','avaya_booth_ucaas_brouchers');
        $window.open(url, '_blank');
    }

    
    gratification.sendPoints('user_self_activity','avaya_booth_ucaas_start_intro_video');

    $scope.total_questions_length = 0;
    $scope.current_question_number = 0;
    $scope.current_question = [];
    $scope.questionAnswers = [];
    $scope.last_question = false;
    $scope.first_question = true;
    $scope.QuizCompleted = false;
    $scope.QuizMessage = '';

    $scope.fetchQuiz = function(){
        $http({
            method: 'GET',
            url: $rootScope.urlprefix+'/quiz',
            params:{booth:'avaya_one_cloud_ucass',user_id:$rootScope.currentUser.id}
        }).then(function(data){
            if(data.data.status == true){

                if(data.data.data.length > 0){

                    $scope.quiz_questions = data.data.data;
                    $scope.current_question = 0;
                    $scope.first_question = true;
                    $scope.total_questions_length = data.data.data.length -1;
                    
                }else{

                    $scope.QuizCompleted = true;
                    $scope.QuizMessage = 'You have already participated. Thanks';
                    $scope.quiz_questions = [];
                }
                
            }else{
                $scope.quiz_questions = [];
            }
        }, function(error){
            console.log(error);
        });
    }

    $scope.prevQuestion = function(){
        if($scope.current_question_number > 0){
            $scope.current_question_number -= 1;
            if($scope.current_question_number == 0){
                $scope.first_question = true;
            }else{
                $scope.last_question = false;
            }
            $scope.current_question = $scope.current_question_number;
        }
    }

    $scope.nextQuestion = function(){
        if($scope.quiz_questions[$scope.current_question_number]['user_answer']){
            $scope.error_message = false;
            if($scope.current_question_number < $scope.total_questions_length){
                $scope.current_question_number += 1;
                if($scope.current_question_number == $scope.total_questions_length){
                    $scope.last_question = true;
                }else{
                    $scope.first_question = false;
                }
                $scope.current_question = $scope.current_question_number;
            }

        } else{
            $scope.error_message = true;
        }            
    }
    $scope.fetchQuiz();

    $scope.submitQuestion = function(question_answer){

        let user_answer = {}
        user_answer.questions = question_answer;
        user_answer.user_id = $rootScope.currentUser.id;
        user_answer.booth = 'avaya_one_cloud_ucass';

        $http({
            method: 'POST',
            url: $rootScope.urlprefix+'/quiz_answer',
            data:user_answer
        }).then(function(data){
            if(data.data.status == true){
                $scope.QuizCompleted = true;
                $scope.QuizMessage = 'Thanks for participation';
                $scope.fetchQuiz();
            }else{
                $scope.quiz_questions = [];
            }
        }, function(error){
            console.log(error);
        });

    }

    $scope.showPhotoPopup = function(){
            
        $scope.popupVantage3 = true;
    }

    $scope.hidePhotoPopup = function(){
        $scope.popupVantage3 = false;
        $scope.popupCU360 = false;
    }

    $scope.showPhotoPopup360 = function(){
        
               $scope.popupCU360 = true;
    }

    // $scope.hidePhotoPopup360 = function(){
    //     $scope.popupCU360 = false;
    // }

    $scope.current_index = 0;
    $scope.low_index = 0;
    $scope.all_images = [
        'images/ucass/K175_0855_sides DS.png',
        'images/ucass/K175_0919-HOMESCREEN.png',
        'images/ucass/K175_0919-MEETING.png',
        'images/ucass/K175_1006-SPACES.png',
        'images/ucass/K175_Backside DS.png',
        'images/ucass/K175_front-DIALER.png',
    ];
    $scope.max_index = $scope.all_images.length - 1;
    $scope.current_image = $scope.all_images[$scope.current_index];

    $scope.changeIndex = function(index) {
        $scope.current_index = index;
        $scope.current_image = $scope.all_images[$scope.current_index];
    }

    $scope.prev = function() {
        if ($scope.current_index <= $scope.low_index) {
            $scope.current_index = 0;
            $scope.current_image = $scope.all_images[$scope.current_index];
        } else {
            $scope.current_index -= 1;
            $scope.current_image = $scope.all_images[$scope.current_index];
        }
    }

    $scope.next = function() {
        if ($scope.current_index >= $scope.max_index) {
            $scope.current_index = $scope.max_index;
            $scope.current_image = $scope.all_images[$scope.current_index];
        } else {
            $scope.current_index += 1;
            $scope.current_image = $scope.all_images[$scope.current_index];
        }
    }

    $scope.current_index_new = 0;
    $scope.low_index_new = 0;
    $scope.all_images_new = [
        'images/cu360/cu360_dsc6615 Transparent_black.png',
        'images/cu360/cu360_dsc6628 Transparent DS BLUE front.png',
        'images/cu360/cu360_dsc6638 TransparentRemote back.png',
        'images/cu360/cu360_dsc6636 TransparentRemote.png'
        
    ];
    $scope.max_index_new = $scope.all_images_new.length - 1;
    $scope.current_image_new = $scope.all_images_new[$scope.current_index_new];

    $scope.changeIndex_new = function(index) {
        $scope.current_index_new = index;
        $scope.current_image_new = $scope.all_images_new[$scope.current_index_new];
    }

    $scope.prev_new = function() {
        if ($scope.current_index_new <= $scope.low_index_new) {
            $scope.current_index_new = 0;
            $scope.current_image_new = $scope.all_images_new[$scope.current_index_new];
        } else {
            $scope.current_index_new -= 1;
            $scope.current_image_new = $scope.all_images_new[$scope.current_index_new];
        }
    }

    $scope.next_new = function() {
        if ($scope.current_index_new >= $scope.max_index_new) {
            $scope.current_index_new = $scope.max_index_new;
            $scope.current_image_new = $scope.all_images_new[$scope.current_index_new];
        } else {
            $scope.current_index_new += 1;
            $scope.current_image_new = $scope.all_images_new[$scope.current_index_new];
        }
    }

        setInterval(function () {
            $socket.emitIndividualExhibitionChat("avaya_on_exhibition", {"user_data" : $rootScope.currentUser, "stall_id" : 16});
        }, 1000);


        $socket.emitIndividualExhibitionChat("avaya_on_exhibition", {"user_data" : $rootScope.currentUser, "stall_id" : 16});
   
       $socket.emitIndividualExhibitionChat("avaya_fetch_history", {"user_id" : $rootScope.currentUser.id, "exhibitor_id" : 16});


       $socket.on("avaya_exhi_user_chat_history", function (data) {
                console.log(data);
                if (data.data.user_id ==  $rootScope.currentUser.id && data.data.exhibitor_id == 16) {
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
          $socket.emitIndividualExhibitionChat("avaya_off_exhibition", {"user_data" : $rootScope.currentUser, "stall_id" : 16});
       });
   
       $socket.on("avaya_new_msgs_from_exhibitor", function(data) {
                console.log(data);
                
                console.log(data.user_id == $rootScope.currentUser.id);
                if (data.user_id == $rootScope.currentUser.id && data.exhibitor_id == 16) {
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
            var exhibitor_id = 16;
            // console.log("exhibitor_id", exhibitor_id)
            // console.log($rootScope.currentUser);
            if (message != '') {
                var divElement = angular.element(document.querySelector('.message-container'));
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes();
                $socket.emitIndividualExhibitionChat("avaya_new_msgs_user", {"user_data": $rootScope.currentUser, "exhibitor_id" : 16, "message" : message});
                // $socket.emitEventGroupChat('groupchat', { event_id: $rootScope.currentEvent, message: message, user: $rootScope.currentUser });
                let comment = angular.element('<div class="expo-chat"><div class="name-time"><h2 class="expo-name">' + $rootScope.currentUser.name +  '</h2><h2 class="expo-time">' + time + '</h2></div><div class="expo-message"><h2>' + message + '</h2></div></div>');
                divElement.append(comment);
                $compile(divElement)($scope);
                angular.element(divElement)[0]['scrollTop'] = divElement[0]['scrollHeight'];
            }
            $scope.message = '';
        }
});