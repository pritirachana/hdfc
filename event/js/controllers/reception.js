app.controller("receptionController", function($scope, $rootScope, $state, $compile, $window, $socket,$http,$location, $timeout, $localStorage,gratification) {

    $scope.hdc = {};
    $scope.showvideo = false;
    $scope.popupvideo = false;
    $scope.popupvideoalmond = false;

    let page_url1 = $location.absUrl();
    let page_name1 = $location.path();
    let user_id1 = $rootScope.currentUser.id;
    let user_name1 = $rootScope.currentUser.name;
    let email1 = $rootScope.currentUser.email;
    let userPhone1 = $rootScope.currentUser.phone_number;
    let country1 = $rootScope.currentUser.country;
    let designation1 = $rootScope.currentUser.designation;
    let organization1 = $rootScope.currentUser.organization;

    let q_id = $rootScope.qid;

    let logUserData = {
        "pageUrl": page_url1,
        "pageName": page_name1,
        "userId": user_id1,
        "userName": user_name1,
        "userEmail": email1,
        "q_id": q_id,
        "mobile":userPhone1,
        "event_id":14,
        "stall_id":"NA"
    }

    $socket.emit('logUserData', logUserData);

    // console.log({user_id:user_id,page_url:page_url,page_name:page_name,type:type});
    var data = {
        "userId":user_id1,
        "eventName":"14",
        "userName":user_name1,
        "userEmail":email1,
        "userPhone":userPhone1,
        "userCountry":$rootScope.currentUser.city,
        "userDesignation":designation1,
        "userOrganization":organization1,
        "pageName":page_name1,
        "qId":$rootScope.qid, 
        "value":"user journey",
        "url":page_url1
    };
    $http({
        method: 'POST',
        url: 'https://devapi.virtex.in/api/cii-bio/analytics-all-page',
        data:data
    }).then(function(data){
        if(data.data.status == true){
            console.log('Report Updated');
        }
    }, function(error){
        console.log(error);
    });

    if ($rootScope.userwelcomefirst == 0) {
        $rootScope.userwelcomefirst = 1;
        $scope.popupvideoalmond = false;
        var iframe = angular.element(document.querySelector('#popUpVideoAlmond'));
        var player = new Vimeo.Player(iframe);
       // player.play();
        player.on('play', function() {
            gratification.sendPoints('user_self_activity','lobby_user_watching_intro');
        });
    
        player.on('ended', function(data) {
            // `data` is an object containing properties specific to that event
            console.log('Video Ended');
            var fullName = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
            var req = {
                method: 'POST',
                url: 'https://avayaapis.virtex.in/analyticsCount',
                data: {"userId":$rootScope.currentUser.id,"event_type":"video_view","user_name": fullName}
            }

            $http(req).then(function(data){
                console.log(data);
            });
            gratification.sendPoints('user_self_activity','lobby_user_complete_video');
        });
    }else{
        var iframe = angular.element(document.querySelector('#popUpVideoAlmond'));
        var player = new Vimeo.Player(iframe);
        player.destroy().then(function() {
            // The player is destroyed
            console.log('destroyed');
          });
    }



    $scope.redirect = function(stage) {
        $scope.showvideo = false;
        $state.go(stage);
    }

    gratification.sendPoints('user_self_activity','lobby_user_enter');

    $socket.emitEventGroupChat ('event_join', $rootScope.currentUser);

    $scope.myTrigger = function(arg) {

        if (arg == 'session') {
            if (!$('#sidebar').hasClass('active')) {
                $('#sidebar').toggleClass('active');
            }
            console.log(arg);
            $scope.showvideo = true;
            $scope.showvideoexibition = false;
            $scope.showvideocafe = false;
            $scope.showvideosession = true;
            $scope.showvideonetworking = false;
            var videoElements = angular.element(document.querySelectorAll('#video'));
            console.log(videoElements);
            videoElements[0].play();
            videoElements[0].onended = function() {
                $scope.redirect('sessions'); //alert("The audio has ended");
            };
            //$timeout($scope.redirect, 14000);
        }else if (arg == 'stage') {
            if (!$('#sidebar').hasClass('active')) {
                $('#sidebar').toggleClass('active');
            }
            console.log(arg);
            $scope.showvideo = true;
            $scope.showvideoexibition = false;
            $scope.showvideocafe = false;
            $scope.showvideosession = false;
            $scope.showvideostage = true;
            $scope.showvideonetworking = false;
            var videoElements = angular.element(document.querySelectorAll('#video2'));
            console.log(videoElements);
            videoElements[0].play();
            videoElements[0].onended = function() {
                $scope.redirect('stage'); //alert("The audio has ended");
            };
            //$timeout($scope.redirect, 14000);
        }else if (arg == 'exibition') {
            if (!$('#sidebar').hasClass('active')) {
                $('#sidebar').toggleClass('active');
            }
            console.log(arg);
            $scope.showvideo = true;
            $scope.showvideoexhibition = true;
            $scope.showvideocafe = false;
            $scope.showvideosession = false;
            $scope.showvideostage = false;
            $scope.showvideonetworking = false;
            var videoElements = angular.element(document.querySelectorAll('#video3'));
            console.log(videoElements);
            videoElements[0].play();
            videoElements[0].onended = function() {
                $scope.redirect('expo'); //alert("The audio has ended");
            };
            //$timeout($scope.redirect, 14000);
        }else if (arg == 'experience') {
            if (!$('#sidebar').hasClass('active')) {
                $('#sidebar').toggleClass('active');
            }
            console.log(arg);
            $scope.showvideo = true;
            $scope.showvideoexibition = false;
            $scope.showvideocafe = false;
            $scope.showvideosession = false;
            $scope.showvideostage = false;
            $scope.showvideoexperience = true;
            var videoElements = angular.element(document.querySelectorAll('#video4'));
            console.log(videoElements);
            videoElements[0].play();
            videoElements[0].onended = function() {
                $scope.redirect('experience-zone'); //alert("The audio has ended");
            };
            //$timeout($scope.redirect, 14000);
        }else if (arg == 'help-desk') {
            if (!$('#sidebar').hasClass('active')) {
                $('#sidebar').toggleClass('active');
            }
            console.log(arg);
            $scope.showvideo = true;
            $scope.showvideoexibition = false;
            $scope.showvideocafe = false;
            $scope.showvideosession = false;
            $scope.showvideostage = false;
            $scope.showvideonetworking = false;
            $scope.showvideohelp = true;
            var videoElements = angular.element(document.querySelectorAll('#video5'));
            console.log(videoElements);
            videoElements[0].play();
            videoElements[0].onended = function() {
                $scope.redirect('help-desk'); //alert("The audio has ended");
            };
            //$timeout($scope.redirect, 14000);
        }
         else if (arg == 'middlevideo') {
            $scope.popupvideo = false;
            // $state.go('newtworking');
            // $timeout($scope.redirect, 14000);
        } else if (arg == 'chat') {
            //view8();
            //$scope.popupvideo = true;
            // $state.go('newtworking');
            // $timeout($scope.redirect, 14000);
        } else if (arg == 'almond') {
            $scope.popupvideoalmond = false;
            // $state.go('newtworking');
            // $timeout($scope.redirect, 14000);
        }
        else if (arg == 'left') {
            // alert("test");
            console.log("test");
            $scope.showvideo = true;
            $scope.showvideoexibition = false;
            $scope.showvideocafe = false;
            $scope.showvideosession = false;
            $scope.left = true;
            $scope.showvideonetworking = false;
            var videoElements = angular.element(document.querySelectorAll('#video1'));
            console.log(videoElements);
            videoElements[0].play();
            videoElements[0].onended = function() {
                // $scope.redirect('stage'); //alert("The audio has ended");
                $scope.redirect('sessions');
                // window.location.href="https://rth.proptiger.com/event/#!/sessions";
            };
        }
        else if (arg == 'center') {
            // alert("test");
            console.log("test");
            $scope.showvideo = true;
            $scope.showvideoexibition = false;
            $scope.showvideocafe = false;
            $scope.showvideosession = false;
            $scope.center = true;
            $scope.showvideonetworking = false;
            var videoElements = angular.element(document.querySelectorAll('#video2'));
            console.log(videoElements);
            videoElements[0].play();
            videoElements[0].onended = function() {
                // $scope.redirect('stage'); //alert("The audio has ended");
                $scope.redirect('expo');
                // window.location.href="https://rth.proptiger.com/event/#!/expo";
            };
        }
        else if (arg == 'right') {
            // alert("test");
            console.log("test");
            $scope.showvideo = true;
            $scope.showvideoexibition = false;
            $scope.showvideocafe = false;
            $scope.showvideosession = false;
            $scope.right = true;
            $scope.showvideonetworking = false;
            var videoElements = angular.element(document.querySelectorAll('#video3'));
            console.log(videoElements);
            videoElements[0].play();
            videoElements[0].onended = function() {
                // $scope.redirect('stage'); //alert("The audio has ended");
                // window.location.href="https://rth.proptiger.com/event/#!/expomain2/390";
                $state.go('expomain2', {id: 390});
            };
        }


        // if (arg == 'session_hall_left' || arg == 'session_hall_right') {
        //     console.log(arg);
        //     $scope.showvideo = true;
        //     var videoElements = angular.element(document.querySelectorAll('#video'));
        //     videoElements[0].play();
        //     $timeout($scope.redirect, 14000);
        // } else if (arg == 'right_video' || arg == 'left_video' || arg == 'middle_video') {
        //     $scope.popupvideo = true;
        // }

    }

    $scope.closePopup = function() {
        $scope.popupvideo = false;
        $scope.popupvideo1 = false;
        $scope.popupvideo2 = false;
        $scope.popupvideo3 = false;
        $scope.popupvideo4 = false;
        $scope.popupvideo5 = false;
        $scope.popupvideo6 = false;
    }

    $scope.almonpopclose = function() {

        console.log('come here');
        player.off('ended');

        $scope.popupvideoalmond = false;
        $scope.popupvideo1 = false;
        $scope.popupvideo2 = false;
        $scope.popupvideo3 = false;
        $scope.popupvideo4 = false;
        $scope.popupvideo5 = false;
        $scope.popupvideo6 = false;
    }

    $scope.closePopup = function() {
        $scope.popupvideo = false;
    }

    $scope.almonpopclose = function() {

        $scope.popupvideoalmond = false;
        $scope.currentvideo = '';

        player.destroy().then(function() {
            // The player is destroyed
            console.log('destroyed');
          });
        
    }


    // $scope.video = function(e) {
    //     $scope.showvideo = true;
    //     var videoElements = angular.element(document.querySelectorAll('#video'));
    //     videoElements[0].play();
    //     $timeout($scope.redirect, 14000);

    // }

    $socket.emit('startconcert');

    $socket.on('startuserconcert', function(data) {

        $rootScope.concert_started = 1;

        $state.go('stage');

    });

    $socket.on('stopuserconcert', function(data) {

        $rootScope.concert_started = 0;

    });

    $socket.on('notstarted', function(data) {

        $rootScope.concert_started = 0;

    });
    $scope.hdc = {};
    $scope.show = false;
    $scope.popupvideo = false;
    $scope.popupvideo2 = false;

    // $scope.myTrigger = function(arg) {
    //     gratification.sendPoints('user_self_activity', "views_videos");
    //     if (arg == 'video') {
    //         $scope.popupvideo = false;
            
    //     }if (arg == 'video2') {
    //         $scope.popupvideo2 = true;

    //   }if (arg == 'video3') {
    //           $scope.popupvideo3 = true;

    //       }if (arg == 'video4') {
    //           $scope.popupvideo4 = true;


    //       }if (arg == 'video5') {
    //           $scope.popupvideo5 = true;


    //     } else if (arg == 'document1') {
    //         var documentdown = angular.element(document.querySelectorAll('#downloaddocument1'));
    //         console.log(documentdown);
    //         documentdown[0].click();
    //     }

    // }

        $scope.closePopup = function() {
            $scope.popupvideo = false;
            $scope.popupvideo2 = false;
            $scope.popupvideo3 = false;
            $scope.popupvideo4 = false;
            $scope.popupvideo5 = false;
            $scope.popupvideo6 = false;
        }

});