app.controller("supportController", function($scope, $rootScope, $state, $compile, $location, $window, $socket, $timeout) {
    let page_url1 = $location.absUrl();
    let page_name1 = $location.path();
    let user_id1 = $rootScope.currentUser.id;
    let user_name1 = $rootScope.currentUser.name;
    let email1 = $rootScope.currentUser.email;
    let userPhone1 = $rootScope.currentUser.phone_number;
    let country1 = 'India';
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


});