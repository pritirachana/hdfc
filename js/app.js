var app = angular.module("hopin", ["ui.router", "socket.io"]);
app.config(function($stateProvider, $urlRouterProvider, $socketProvider) {


    $urlRouterProvider.when("", "/");

    $stateProvider.state({
        name: 'reception',
        url: '/',
        templateUrl: 'views/reception.html',
        controller: 'receptionController as reception'
    });

    $stateProvider.state({
        name: 'stage',
        url: '/stage',
        templateUrl: 'views/stage.html',
        controller: 'stageController as stage'
    });

    $stateProvider.state({
        name: 'sessions',
        url: '/sessions',
        templateUrl: 'views/sessions.html',
        controller: 'sessionsController as sessions'
    });

    $stateProvider.state({
        name: 'networking',
        url: '/networking',
        templateUrl: 'views/networking.html',
        controller: 'networkingController as networking'
    });

    $stateProvider.state({
        name: 'videoconf',
        url: '/videoconf',
        templateUrl: 'views/videoconf.html',
        controller: 'videoConfController as videoconf'
    });


    $socketProvider.setConnectionUrl('https://cii.virtex.in:4040');

});

app.run(function($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function() {
        $templateCache.removeAll();
    });
});
