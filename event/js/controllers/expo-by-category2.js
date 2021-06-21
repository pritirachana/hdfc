app.controller("expocategoryController2", function($scope, $rootScope, $http, $location, $state, $compile, $window, $socket, $timeout, $stateParams) {
    console.log($stateParams.id);
    let page_url1 = $location.absUrl();
    let page_name1 = $location.path();
    if(page_name1 == '/expo-by-category2/109'){
        $('.expolist').hide();
    }
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
        "mobile": userPhone1,
        "event_id": 14,
        "stall_id": "NA"
    }

    $socket.emit('logUserData', logUserData);

    // console.log({user_id:user_id,page_url:page_url,page_name:page_name,type:type});
    var data = {
        "userId": user_id1,
        "eventName": "14",
        "userName": user_name1,
        "userEmail": email1,
        "userPhone": userPhone1,
        "userCountry": 'India',
        "userDesignation": designation1,
        "userOrganization": organization1,
        "pageName": page_name1,
        "qId": $rootScope.qid,
        "value": "user journey",
        "url": page_url1
    };
    $http({
        method: 'POST',
        url: 'https://devapi.virtex.in/api/cii-bio/analytics-all-page',
        data: data
    }).then(function(data) {
        if (data.data.status == true) {
            console.log('Report Updated');
            console.log(data);
        }
    }, function(error) {
        console.log(error);
    });
    // var orderedExpo = {
    //     method:'POST',
    //     url: 'https://devapi.virtex.in/api/cii-bio/all-expo-name',
    //     data: {}
    // };

    // $http(orderedExpo).then(function(data){
    //     console.log(data);
    //     $rootScope.orderedExpos = data.data.data;
    //     console.log($rootScope.orderedExpos);
    //     // var availableTutorials  = $rootScope.allexpo;
    //     // $("#myInput").autocomplete({
    //     //     source: availableTutorials
    //     // });
    //     // $.map(data.data.data)
    // });

    var orderedCity = {
        method: 'POST',
        url: 'https://devapi.virtex.in/api/cii-bio/category-acess-name-by-event-id-proptiger',
        data: { eventId: 14, "accessId": $stateParams.id }
    };

    $http(orderedCity).then(function(data) {
        $rootScope.orderedCities = data.data.data;
        console.log($rootScope.orderedCities);
        // var availableTutorials  = $rootScope.allexpo;
        // $("#myInput").autocomplete({
        //     source: availableTutorials
        // });
        // $.map(data.data.data)
    });

    $scope.filterValue = $rootScope.expobyCategory1;

    var req = {
        method: 'POST',
        url: 'https://devapi.virtex.in/api/cii-bio/get-expo-by-id-proptiger',
        data: { "eventId": 14, "accessId": $stateParams.id }
    }

    $http(req).then(function(data) {

        $rootScope.expobyCategory1 = data.data.data;
        $rootScope.expobyCategory2 = data.data.data;
        $rootScope.expobyCategory3 = data.data.data;
        $rootScope.expobyCategory4 = data.data.data;

        $scope.filterValue = $rootScope.expobyCategory1;

        // var availableTutorials  = $rootScope.allexpo;
        // $("#myInput").autocomplete({
        //     source: availableTutorials
        // });
        // $.map(data.data.data)
    });


    $scope.newBoothFilter = function() {
        var value = $('.expolist').val().toLowerCase();
        $scope.filterValue = [];
        if (value != null && value != '') {
            $rootScope.expobyCategory1.forEach(element => {
                if (element.test_array != null && element.test_array.indexOf(value) >= 0) {
                    $scope.filterValue.push(element);
                }
            });
        } else {
            $scope.filterValue = $rootScope.expobyCategory1;
        }
    }

    // $('select').on('change', function() {
    //     var value = $('.expolist').val().toLowerCase();
    //     $(".filter").filter(function() {
    //         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    //         // console.log($(this).text().toLowerCase().indexOf(value));
    //         // if ($(this).text().toLowerCase().indexOf(value) > 0) {
    //         //     var keyValue = $(this).text();
    //         //     for(var key in keyValue){
    //         //         $('.searchData').empty().append(key);
    //         //     }
    //         // }
    //     });
    // });


    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".filter").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            // console.log($(this).text().toLowerCase().indexOf(value));
            // if ($(this).text().toLowerCase().indexOf(value) > 0) {
            //     var keyValue = $(this).text();
            //     for(var key in keyValue){
            //         $('.searchData').empty().append(key);
            //     }
            // }
        });
    });

});