app.controller("twitterwallController", function($scope,$http, $rootScope, $state, $compile, $location, $window, $socket, $timeout,gratification,$sce,$timeout) {
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


});