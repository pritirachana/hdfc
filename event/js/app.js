var app = angular.module("hopin", ["ui.router", "socket.io", "ngStorage", "rwdImageMaps", "ngAnimate","ngMessages","ngSanitize"]);
app.config(function($stateProvider, $urlRouterProvider, $socketProvider) {

    $urlRouterProvider.when("", "/");

    $stateProvider.state({
        name: 'home',
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'homeController as home',
    });


    $stateProvider.state({
        name: 'notification',
        url: '/notification',
        templateUrl: 'views/notification.html',
        controller: 'notificationController as notification',
    });


    $stateProvider.state({
        name: 'homeloan',
        url: '/homeloan',
        templateUrl: 'views/homeloan.html',
        controller: 'homeloanController as notification',
    });



    $stateProvider.state({
        name: 'photo-booth',
        url: '/photo-booth',
        templateUrl: 'views/photo-booth.html',
        controller: 'photo-boothController as gamification'
    });

    $stateProvider.state({
        name: 'virtual-library',
        url: '/virtual-library',
        templateUrl: 'views/virtual-library.html',
        controller: 'virtuallibraryController as gamification'
    });

    $stateProvider.state({
        name: 'media',
        url: '/media',
        templateUrl: 'views/media.html',
        controller: 'mediaController as notification',
    });
    $stateProvider.state({
        name: 'virtual-zone',
        url: '/virtual-zone',
        templateUrl: 'views/virtual-zone.html',
        controller: 'virtualZoneController as virtualzone',
    });
    $stateProvider.state({
        name: 'investor-zone',
        url: '/investor-zone',
        templateUrl: 'views/investor-zone.html',
        controller: 'investorZoneController as investorzone',
    });
    $stateProvider.state({
        name: 'session-agenda',
        url: '/session-agenda',
        templateUrl: 'views/session-agenda.html',
        controller: 'sessionagendaController as sessionagenda',
    });
    $stateProvider.state({
        name: 'session-speakers',
        url: '/session-speakers',
        templateUrl: 'views/session-speakers.html',
        controller: 'sessionspeakersController as sessionspeakers',
    });
    $stateProvider.state({
        name: 'media2',
        url: '/media2',
        templateUrl: 'views/media2.html',
        controller: 'media2Controller as notification',
    });
    $stateProvider.state({
        name: 'organizers',
        url: '/organizers',
        templateUrl: 'views/organizers.html',
        controller: 'organizersController as notification',
    });
    $stateProvider.state({
        name: 'previous-sessions',
        url: '/previous-sessions',
        templateUrl: 'views/previous-sessions.html',
        controller: 'previoussessionsController as notification',
    });

    $stateProvider.state({
        name: 'attendees',
        url: '/attendees',
        templateUrl: 'views/attendees.html',
        controller: 'attendeesController as notification',
    });
    $stateProvider.state({
        name: 'feedback',
        url: '/feedback',
        templateUrl: 'views/feedback.html',
        controller: 'feedbackController as notification',
    });
    $stateProvider.state({
        name: 'partner',
        url: '/partner',
        templateUrl: 'views/partner.html',
        controller: 'partnerController as notification',
    });
    $stateProvider.state({
        name: 'board-room',
        url: '/board-room',
        templateUrl: 'views/board-room.html',
        controller: 'boardroomController as boardroom',
    });
    $stateProvider.state({
        name: 'expo-by-category',
        url: '/expo-by-category/:id',
        templateUrl: 'views/expo-by-category.html',
        controller: 'expocategoryController as expobycategory',
    });
    $stateProvider.state({
        name: 'expo-by-category2',
        url: '/expo-by-category2/:id',
        templateUrl: 'views/expo-by-category2.html',
        controller: 'expocategoryController2 as expobycategory2',
    });
    $stateProvider.state({
        name: 'expomain',
        url: '/expomain/:id',
        templateUrl: 'views/expomain.html',
        controller: 'expomainController as expomain',
    });
    $stateProvider.state({
        name: 'expomain2',
        url: '/expomain2/:id',
        templateUrl: 'views/expomain2.html',
        controller: 'expomainController2 as expomain2',
    });
    $stateProvider.state({
        name: 'points',
        url: '/points',
        templateUrl: 'views/points.html',
        controller: 'pointsController as notification',
    });
    $stateProvider.state({
        name: 'social-feed',
        url: '/social-feed',
        templateUrl: 'views/social-feed.html',
        controller: 'social-feedController as notification',
    });

    $stateProvider.state({
        name: 'workshop',
        url: '/workshop',
        templateUrl: 'views/workshop.html',
        controller: 'workshopController as notification',
    });

    $stateProvider.state({
        name: 'atgc',
        url: '/atgc-hall',
        templateUrl: 'views/atgc.html',
        controller: 'atgcController as notification',
    });

    $stateProvider.state({
        name: 'dna',
        url: '/dna',
        templateUrl: 'views/dna.html',
        controller: 'dnaController as notification',
    });

    $stateProvider.state({
        name: 'electron',
        url: '/electron',
        templateUrl: 'views/electron.html',
        controller: 'electronController as notification',
    });

    $stateProvider.state({
        name: 'proton',
        url: '/proton',
        templateUrl: 'views/proton.html',
        controller: 'protonController as notification',
    });


    $stateProvider.state({
        name: 'speakerlounge',
        url: '/speakerlounge',
        templateUrl: 'views/speaker-lounge.html',
        controller: 'speakerController as notification',
    });

    $stateProvider.state({
        name: 'pitcherlounge',
        url: '/pitcherlounge',
        templateUrl: 'views/pitcher-lounge.html',
        controller: 'pitcherController as notification',
    });



    $stateProvider.state({
        name: 'token',
        url: '/user_verify/:token',
        templateUrl: 'views/token_verify.html',
        controller: 'tokenverifyController as token',
    });

    $stateProvider.state({
        name: 'reception',
        url: '/',
        templateUrl: 'views/reception.html',
        controller: 'receptionController as reception'
    });

     $stateProvider.state({
        name: 'summit',
        url: '/summit',
        templateUrl: 'views/summit.html'
    });

    $stateProvider.state({
        name: 'stage',
        url: '/stage/:id',
        templateUrl: 'views/stage.html',
        controller: 'stageController as stage'
    });
    $stateProvider.state({
        name: 'agenda',
        url: '/agenda',
        templateUrl: 'views/agenda.html',
        controller: 'agendaController as agenda'
    });
    $stateProvider.state({
        name: 'profile',
        url: '/profile',
        templateUrl: 'views/profile.html',
        controller: 'profileController as agenda'
    });

    $stateProvider.state({
        name: 'sessions',
        url: '/sessions',
        templateUrl: 'views/sessions.html',
        controller: 'sessionsController as sessions'
    });

    $stateProvider.state({
        name: 'leaderboard',
        url: '/leaderboard',
        templateUrl: 'views/leaderboard.html',
        controller: 'leaderboardController as leaderboard'
    });

    $stateProvider.state({
        name: 'gamification',
        url: '/gamification',
        templateUrl: 'views/gamification.html',
        controller: 'gamificationController as gamification'
    });
    $stateProvider.state({
        name: 'networking-table',
        url: '/networking-table',
        templateUrl: 'views/networking-table.html',
        controller: 'networking-tableController as notification',
    });
    $stateProvider.state({
        name: 'networking',
        url: '/networking',
        templateUrl: 'views/networking.html',
        controller: 'networkingController as networking'
    });


    $stateProvider.state({
        name: 'expo',
        url: '/expo',
        templateUrl: 'views/expo.html',
        controller: 'expoController as expo'
    });

    $stateProvider.state({
        name: 'expo2',
        url: '/expo2',
        templateUrl: 'views/expo2.html',
        controller: 'expoController2 as expo2'
    });

    $stateProvider.state({
        name: 'expobrief',
        url: '/expobrief',
        templateUrl: 'views/expobrief.html',
        controller: 'expobriefController as expobrief'
    });


    $stateProvider.state({
        name: 'videoconf/:publisher/',
        url: '/videoconf/:publisher/',
        params: {
            session_id: "0",
          },
        templateUrl: 'views/videoconf.html',
        controller: 'videoConfController as videoconf'

    });

    $stateProvider.state({
        name: 'gallery',
        url: '/gallery',
        templateUrl: 'views/gallery.html',
        controller: 'galleryController as gallery'
    });

    $stateProvider.state({
        name: 'google',
        url: '/google',
        templateUrl: 'views/google.html',
        controller: 'googleController as gallery'
    });
    $stateProvider.state({
        name: 'me',
        url: '/me',
        templateUrl: 'views/me.html',
        controller: 'meController as gallery'
    });
    $stateProvider.state({
        name: 'rc',
        url: '/rc',
        templateUrl: 'views/rc.html',
        controller: 'rcController as gallery'
    });
    $stateProvider.state({
        name: 'sedo',
        url: '/sedo',
        templateUrl: 'views/sedo.html',
        controller: 'sedoController as gallery'
    });
    $stateProvider.state({
        name: 'web',
        url: '/web',
        templateUrl: 'views/web.html',
        controller: 'webController as gallery'
    });
    $stateProvider.state({
        name: 'bluehost',
        url: '/bluehost',
        templateUrl: 'views/bluehost.html',
        controller: 'bluehostController as gallery'
    });
    $stateProvider.state({
        name: 'fresh',
        url: '/fresh',
        templateUrl: 'views/fresh.html',
        controller: 'freshController as gallery'
    });
    $stateProvider.state({
        name: 'hg',
        url: '/hg',
        templateUrl: 'views/hg.html',
        controller: 'hgController as gallery'
    });
    $stateProvider.state({
        name: 'neo',
        url: '/neo',
        templateUrl: 'views/neo.html',
        controller: 'neoController as gallery'
    });
    $stateProvider.state({
        name: 'org',
        url: '/org',
        templateUrl: 'views/org.html',
        controller: 'orgController as gallery'
    });

    $stateProvider.state({
        name: 'games',
        url: '/games',
        templateUrl: 'views/games.html',
        controller: 'gamesController as games'
    });

    $stateProvider.state({
        name: 'cafe',
        url: '/cafe',
        templateUrl: 'views/cafe.html',
        controller: 'cafeController as cafe'
    });
    $stateProvider.state({
        name: 'support',
        url: '/support',
        templateUrl: 'views/support.html',
        controller: 'supportController as support'
    });

    $stateProvider.state({
        name: 'isa',
        url: '/isa',
        templateUrl: 'views/isa.html',
        controller: 'isaController as isa'
    });

    $stateProvider.state({
        name: 'pmo',
        url: '/pmo',
        templateUrl: 'views/pmo.html',
        controller: 'pmoController as pmo'
    });
    $stateProvider.state({
        name: 'speaker',
        url: '/speaker',
        templateUrl: 'views/speaker.html',
        controller: 'speakerController as speaker'
    });
        $stateProvider.state({
        name: 'ceo',
        url: '/ceo',
        templateUrl: 'views/ceo.html',
        controller: 'ceoController as ceo'
    });
    $stateProvider.state({
        name: 'stage2',
        url: '/stage2',
        templateUrl: 'views/stage2.html',
        controller: 'stage2Controller as stage2'
    });
    $stateProvider.state({
        name: 'briefcase',
        url: '/briefcase',
        templateUrl: 'views/briefcase.html',
        controller: 'briefcaseController as briefcase'
    });
    $stateProvider.state({
        name: 'lobby',
        url: '/lobby',
        templateUrl: 'views/lobby.html',
        controller: 'lobbyController as lobby'
    });
    $stateProvider.state({
        name: 'breakout-1',
        url: '/breakout-1',
        templateUrl: 'views/breakout-1.html',
        controller: 'breakout-1Controller as session'
    });
    $stateProvider.state({
        name: 'breakout-2',
        url: '/breakout-2',
        templateUrl: 'views/breakout-2.html',
        controller: 'breakout-2Controller as session'
    });
    $stateProvider.state({
        name: 'breakout-3',
        url: '/breakout-3',
        templateUrl: 'views/breakout-3.html',
        controller: 'breakout-3Controller as session'
    });
    $stateProvider.state({
        name: 'meeting-room',
        url: '/meeting-room',
        templateUrl: 'views/meeting-room.html',
        controller: 'meeting-roomController as session'
    });

    $stateProvider.state({
        name: 'networking-zone',
        url: '/networking-zone',
        templateUrl: 'views/networking-zone.html',
        controller: 'networking-zoneController as session'
    });
    $stateProvider.state({
        name: 'resource-center',
        url: '/resource-center',
        templateUrl: 'views/resource-center.html',
        controller: 'resource-centerController as session'
    });
    $stateProvider.state({
        name: 'avaya-cart',
        url: '/avaya-cart',
        templateUrl: 'views/avaya-cart.html',
        controller: 'avaya-cartController as session'
    });
    $stateProvider.state({
        name: 'experience-zone',
        url: '/experience-zone',
        templateUrl: 'views/experience-zone.html',
        controller: 'experience-zoneController as session'
    });
    $stateProvider.state({
        name: 'help-desk',
        url: '/help-desk',
        templateUrl: 'views/help-desk.html',
        controller: 'help-deskController as session'
    });
    $stateProvider.state({
        name: 'ccaas',
        url: '/ccaas',
        templateUrl: 'views/ccaas.html',
        controller: 'ccaasController as session'
    });
    $stateProvider.state({
        name: 'ucaas',
        url: '/ucaas',
        templateUrl: 'views/ucaas.html',
        controller: 'ucaasController as session'
    });
    $stateProvider.state({
        name: 'aps',
        url: '/aps',
        templateUrl: 'views/aps.html',
        controller: 'apsController as session'
    });
    $stateProvider.state({
        name: 'service',
        url: '/service',
        templateUrl: 'views/service.html',
        controller: 'serviceController as session'
    });
    $stateProvider.state({
        name: 'redeem',
        url: '/redeem',
        templateUrl: 'views/redeem.html',
        controller: 'redeemController as session'
    });
    $stateProvider.state({
        name: 'google-cloud',
        url: '/google-cloud',
        templateUrl: 'views/google-cloud.html',
        controller: 'google-cloudController as session'
    });
    $stateProvider.state({
        name: 'microsoft',
        url: '/microsoft',
        templateUrl: 'views/microsoft.html',
        controller: 'microsoftController as session'
    });
    $stateProvider.state({
        name: 'assertion',
        url: '/assertion',
        templateUrl: 'views/assertion.html',
        controller: 'assertionController as session'
    });
    $stateProvider.state({
        name: 'brightstar',
        url: '/brightstar',
        templateUrl: 'views/brightstar.html',
        controller: 'brightstarController as session'
    });
    $stateProvider.state({
        name: 'cs-infocomm',
        url: '/cs-infocomm',
        templateUrl: 'views/cs-infocomm.html',
        controller: 'cs-infocommController as session'
    });
    $stateProvider.state({
        name: 'extreme-networks',
        url: '/extreme-networks',
        templateUrl: 'views/extreme-networks.html',
        controller: 'extreme-networksController as session'
    });
    $stateProvider.state({
        name: 'ganani',
        url: '/ganani',
        templateUrl: 'views/ganani.html',
        controller: 'gananiController as session'
    });
    $stateProvider.state({
        name: 'ir',
        url: '/ir',
        templateUrl: 'views/ir.html',
        controller: 'irController as session'
    });
    $stateProvider.state({
        name: 'vis',
        url: '/vis',
        templateUrl: 'views/vis.html',
        controller: 'visController as session'
    });
    $stateProvider.state({
        name: 'koopid',
        url: '/koopid',
        templateUrl: 'views/koopid.html',
        controller: 'koopidController as session'
    });
    $stateProvider.state({
        name: 'tetherfi',
        url: '/tetherfi',
        templateUrl: 'views/tetherfi.html',
        controller: 'tetherfiController as session'
    });
    $stateProvider.state({
        name: 'verint',
        url: '/verint',
        templateUrl: 'views/verint.html',
        controller: 'verintController as session'
    });
    $stateProvider.state({
        name: 'trinity',
        url: '/trinity',
        templateUrl: 'views/trinity.html',
        controller: 'trinityController as session'
    });
    $stateProvider.state({
        name: 'agc',
        url: '/agc',
        templateUrl: 'views/agc.html',
        controller: 'agcController as session'
    });
    
    $stateProvider.state({
        name: 'help-desk-chat',
        url: '/help-desk-chat',
        templateUrl: 'views/help-desk-chat.html',
        controller: 'help-desk-chatController as session'
    });

    $stateProvider.state({
        name: 'partners',
        url: '/partners',
        templateUrl: 'views/partners.html',
        controller: 'partnersController as session'
    });


    $stateProvider.state({
        name: 'twitterwall',
        url: '/twitterwall',
        templateUrl: 'views/twitterwall.html',
        controller: 'ptwitterwallController as session'
    });

    


    // $socketProvider.setTransports(['websocket']);
    $socketProvider.setConnectionUrl('https://socket.virtex.in');



});

app.run(function($rootScope, $templateCache, $http, $location, $localStorage, $window,$transitions) {
    // $rootScope.$on('$viewContentLoaded', function() {
    //     //$templateCache.removeAll();
    // });

    // $localStorage.setItem("currentUser", JSON.stringify({id:1,name:'Shanti Panchal'}));

    if ($localStorage.currentUser) {
        console.log('user come not here');
        $rootScope.currentUser = $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    } else {
        console.log('user come here');
        var url = new URL(window.location.href);
        // var utm_source = url.searchParams.get("utm_source");
        // var utm_medium = url.searchParams.get("utm_medium");
        // var utm_campaign = url.searchParams.get("utm_campaign");
        // var utm_location = url.searchParams.get("utm_location");
        // var utm_project = url.searchParams.get("utm_project");
        var utm_source = $location.search()['utm_source'];
        var utm_medium = $location.search()['utm_medium'];
        var utm_campaign = $location.search()['utm_campaign'];
        var utm_location = $location.search()['utm_location'];
        var utm_project = $location.search()['utm_project'];
        localStorage.setItem('currentUrl',$location.absUrl());
        if(utm_source != null){
            
            localStorage.setItem('utm_source',utm_source);
        }

        if(utm_medium != null){
            localStorage.setItem('utm_medium',utm_medium);
        }

        if(utm_campaign != null){
            localStorage.setItem('utm_campaign',utm_campaign);
        }

        if(utm_location != null){
            localStorage.setItem('utm_location',utm_location);
        }

        if(utm_project != null){
            localStorage.setItem('utm_project',utm_project);
        }

        // alert(localStorage.getItem('currentUrl'));  
        $window.location.href = "../index.html";
    }

    $window.ga('create', 'UA-174030561-4', 'auto');

    $transitions.onSuccess({}, function(transition) {
        $window.ga('send', 'pageview', $location.path());
      });

    // $transitions.onEnd({ }, function(trans) {
    //     console.log('router working');
    //     $window.dataLayer.push({
    //                 event: 'pageView',
    //                 action: $location.path(),
    //             });
        
    //   });

    // $rootScope.$on('$stateChangeSuccess', function (event, toState) {
    //     console.log('here');
    //     $window.dataLayer.push({
    //         event: 'pageView',
    //         action: $location.path(),
    //     });
    // });

    // $window.ga('create', 'UA-174030561-4', 'auto');

    // // track pageview on state change
    // $rootScope.$on('$stateChangeSuccess', function (event) {
    //     $window.ga('send', 'pageview', $location.path());
    // });
});