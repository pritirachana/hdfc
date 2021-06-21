app.controller("stageController", function($scope, $rootScope, $http, $location,$state, $compile, $window, $socket , $sce,$timeout,$localStorage,gratification,$interval, $stateParams) {
    let page_url1 = $location.absUrl();
    let page_name1 = $location.path();
    let user_id1 = $rootScope.currentUser.id;
    let user_name1 = $rootScope.currentUser.name;
    let email1 = $rootScope.currentUser.email;
    let userPhone1 = $rootScope.currentUser.phone_number;
    let country1 = $rootScope.currentUser.country;
    let designation1 = $rootScope.currentUser.designation;
    let organization1 = $rootScope.currentUser.organization;

    let logUserData = {
        "pageUrl": page_url1,
        "pageName": page_name1,
        "userId": user_id1,
        "userName": user_name1,
        "userEmail": email1
    }
  
    $socket.emit('logUserData', logUserData);

    // console.log({user_id:user_id,page_url:page_url,page_name:page_name,type:type});
    var data = {
        "userId":user_id1,
        "eventName":"proptiger",
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
    
    $scope.eventId = $stateParams.id;
    if($rootScope.event_id == $rootScope.currentUser.eventId){
        var currentType = 0;
     }else{
        var currentType = 1;
     }

     var req = {
        method: 'POST',
        url: 'https://devapi.virtex.in/api/cii-bio/get-expo-by-id',
        data: {"eventId":3, "accessId": $stateParams.id}
    }

    $http(req).then(function(data){
        console.log(data);
        $rootScope.expobyCategory1 = data.data.data;
        $rootScope.expobyCategory2 = data.data.data;
        $rootScope.expobyCategory3 = data.data.data;
        $rootScope.expobyCategory4 = data.data.data;
        // var availableTutorials  = $rootScope.allexpo;
        // $("#myInput").autocomplete({
        //     source: availableTutorials
        // });
        // $.map(data.data.data)
    });
     
     $http.post('https://devapi.virtex.in/api/cii-bio/get-session-by-event-and-accessid',{"eventId": 3,"accessId": $scope.eventId}).then(function(result){
      console.log(result);
      $scope.allsessions = result.data.live_session;
      console.log($scope.allsessions);
      
    //   if($scope.allsessions.length == 0){
    //      $scope.currentMessage = result.data.message;
    //   }
      //   if($scope.eventId == 4){
            // $scope.session_link = result.live_session[0].vod_link;
            // $(".stage-player").empty().append($scope.session_link);
      //   }
            
      
    //   if($scope.allsessions.length > 1){
     
    //     if(result.data && result.data.sessionType && result.data.sessionType == 'PREVIOUS'){
    //        $scope.previous_recording  = true;
    //      }else{          
    //        $scope.previous_recording  = false;
    //        if($scope.allsessions.length == 1){
    //           $rootScope.currentSession = $scope.allsessions[0];
    //           // $state.go('auditorium');
    //        }
    //      }
   
    //   }
  
     //  alert($scope.previous_recording);
  
     }).catch(function(error){
  
      console.log(error);
  
     });
  
     $scope.currentSession = function(session,id){
         
         $(".table_div").hide();
         console.log(session);
         $rootScope.currentSession = session;
         $(".stage-player").empty().append('<iframe src="'+session+'?autoplay=1" id="stageVideo" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>');
         var req = {
            method: 'POST',
            url: 'https://devapi.virtex.in/api/cii-bio/get-session-offer',
            data: {"eventId":3, "sessionId": id}
        }
    
        $http(req).then(function(data){
            console.log(data);
            $scope.offers = data.data.session_offer;
            console.log($scope.offers);
            $("marquee").css('display', 'block');
            // $('.developer_logos').append();
            $('.developer_logos').empty();
            var notiElement = angular.element(document.querySelector('.developer_logos'));
            let notification = angular.element(`<marquee ng-if="offers != 'No Record Found'"><span class="offers" ng-repeat="offer in offers">{{offer.title}}</span></marquee>`);
            notiElement.append(notification);
            $compile(notiElement)($scope);  
            // var availableTutorials  = $rootScope.allexpo;
            // $("#myInput").autocomplete({
            //     source: availableTutorials
            // });
            // $.map(data.data.data)
        });
      }
});