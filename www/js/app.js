'use strict';

angular.module('app', 
  ['ionic', 'app.controllers', 'app.services', 'app.filters', 'app.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // default
  $urlRouterProvider.otherwise('/login');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('login', {
      url: '/login',
      controller: "LoginCtrl",
      templateUrl: 'templates/login.html'
  })
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'home': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.groups', {
    url: '/groups',
    views: {
      'groups': {
        templateUrl: 'templates/groups.html',
        controller: 'GroupsCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'chats': {
          templateUrl: 'templates/chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'account': {
        templateUrl: 'templates/account.html',
        controller: 'AccountCtrl'
      }
    }
  });

})
.run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    event.preventDefault();
    //TODO: need to detect error and revert back to login page
    if (error === 'some error that shows authentication failed') {
     $state.go('login');
    }
  });
});

