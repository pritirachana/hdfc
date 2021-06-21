app.factory('gratification', function($http, $rootScope) {
    return {
        sendPoints: function(event_type, activity_type, booth_name = null) {
            $http({
                method: 'POST',
                url: $rootScope.urlprefix + '/gamifiation',
                data: { user_id: $rootScope.currentUser.id, event_type: event_type, activity_type: activity_type }
            }).then(function(data) {
                if (data.data.status == true) {
                    console.log('Points Updated');
                } else {
                    console.log('Already Vistited');
                }
            }, function(error) {
                console.log(error);
            });
        }
    };
});
app.factory('analytics', function($http, $rootScope, $state, $location) {
    return {
        auto: function() {
            let page_url = $location.absUrl();
            let page_name = $location.path();
            let user_id = $rootScope.currentUser.id;
            let user_name = $rootScope.currentUser.name;
            let email = $rootScope.currentUser.email;
            let userPhone = $rootScope.currentUser.phone_number;
            let country = $rootScope.currentUser.country;
            let designation = $rootScope.currentUser.designation;
            let organization = $rootScope.currentUser.organization;
            console.log($rootScope.qid);

            // console.log({user_id:user_id,page_url:page_url,page_name:page_name,type:type});
            var data = {
                "userId": user_id,
                "eventName": "14",
                "userName": user_name,
                "userEmail": email,
                "userPhone": userPhone,
                "userCountry": $rootScope.currentUser.city,
                "userDesignation": designation,
                "userOrganization": organization,
                "pageName": page_name,
                "qId": $rootScope.qid,
                "value": "value",
                "url": page_url
            };
            $http({
                method: 'POST',
                url: 'https://devapi.virtex.in/api/cii-bio/analytics-all-page-time',
                data: data
            }).then(function(data) {
                if (data.data.status == true) {
                    // console.log('Report Updated');
                }
            }, function(error) {
                console.log(error);
            });
        },
        sendEvent: function(usercategory = null, userlabel = null, label_value = null) {
            console.log('coming here');
            let page_url = $location.absUrl();
            let page_name = $state.current;
            let type = 'event_tracking';
            let user_id = $rootScope.currentUser.id;
            let category = (usercategory ? usercategory : null);
            let label = (userlabel ? userlabel : null);;
            let value = (label_value ? label_value : null);
            var data = { "userId": user_id, "pageName": page_name, "category": category, "label": label, "value": value, "url": page_url, "type": type }
            $http({
                method: 'POST',
                url: 'https://avayaapis.virtex.in/analytics',
                data: data
            }).then(function(data) {
                if (data.data.status == true) {
                    console.log('Report Updated');
                }
            }, function(error) {
                console.log(error);
            });
        }
    };
});

app.directive('listen', ['analytics', function(analytics) {
    return {
        restrict: 'A',
        link: function(scope, element) {

            element.on('click', function() {
                //Do you stuff here
                analytics.sendEvent(element[0].dataset.category, element[0].dataset.label);
            });
        }
    };
}]);