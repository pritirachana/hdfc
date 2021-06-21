app.controller("expoController", function($scope, $rootScope, $http, $location, $state, $compile, $window, $socket, $timeout,gratification) {

    $scope.hdc = {};
    $scope.show = false;
    $scope.popupvideo = false;

    let page_url1 = $location.absUrl();
    let page_name1 = $location.path();
    let user_id1 = $rootScope.currentUser.id;
    let user_name1 = $rootScope.currentUser.name;
    let email1 = $rootScope.currentUser.email;
    let userPhone1 = $rootScope.currentUser.phone_number;
    let country1 = 'India';
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
        "userCountry":'India',
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