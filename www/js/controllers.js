'user strict';

angular.module('app.controllers', [])

  .controller('TabsCtrl', ['$scope', '$state', function($scope, $state) {
    //console.log('state is ', $state.is('tab.chat-detail'));
    
    $scope.hideTabBar = function() {
      if($state.is('tab.chat-detail')){
        return 'tabs-item-hide';
      } else {
        return '';
      }
    };

  }])
  
  .controller('HomeCtrl', function($scope) {})

  .controller('GroupsCtrl', ['$scope', 'Groups' , function($scope, Groups) {
    $scope.groups = Groups.all();

  }])

  .controller('ChatsCtrl', ['$scope', 'Chats' , function($scope, Chats) {
    $scope.chats = Chats.all();

    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  }])


  .controller('ChatDetailCtrl', ['$scope', '$rootScope', '$state',
  '$stateParams', 'MockService', '$ionicActionSheet',
  '$ionicPopup', '$ionicScrollDelegate', '$timeout', '$interval',
  function($scope, $rootScope, $state, $stateParams, MockService,
    $ionicActionSheet,
    $ionicPopup, $ionicScrollDelegate, $timeout, $interval) {

    // mock acquiring data via $stateParams
    $scope.toUser = {
      _id: '534b8e5aaa5e7afc1b23e69b',
      pic: '',
      username: 'Student A'
    }

    // this could be on $rootScope rather than in $stateParams
    $scope.user = {
      _id: '534b8fb2aa5e7afc1b23e69c', //me
      pic: '',
      username: 'Teacher B'
    };

    $scope.input = {
      message: localStorage['userMessage-' + $scope.toUser._id] || ''
    };

    var messageCheckTimer;

    var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
    var footerBar; // gets set in $ionicView.enter
    var scroller;
    var txtInput; // ^^^

    $scope.$on('$ionicView.enter', function() {
      //console.log('UserMessages $ionicView.enter');

      getMessages();
      
      $timeout(function() {
        footerBar = document.body.querySelector('#chatDetailView .bar-footer');
        scroller = document.body.querySelector('#chatDetailView .scroll-content');
        txtInput = angular.element(footerBar.querySelector('textarea'));
      }, 0);

      messageCheckTimer = $interval(function() {
        // check for new messages if your doesn't 
        //use push notifications or user disabled them
      }, 20000);
    });

    $scope.$on('$ionicView.leave', function() {
      //console.log('leaving UserMessages view, destroying interval');
      if (angular.isDefined(messageCheckTimer)) {
        $interval.cancel(messageCheckTimer);
        messageCheckTimer = undefined;
      }
    });

    $scope.$on('$ionicView.beforeLeave', function() {
      if (!$scope.input.message || $scope.input.message === '') {
        localStorage.removeItem('userMessage-' + $scope.toUser._id);
      }
    });

    function getMessages() {
      // the service is mock but you would probably pass the toUser's GUID here
      MockService.getUserMessages({
        toUserId: $scope.toUser._id
      }).then(function(data) {
        $scope.doneLoading = true;
        $scope.messages = data.messages;

        $timeout(function() {
          viewScroll.scrollBottom();
        }, 0);
      });
    }

    $scope.$watch('input.message', function(newValue, oldValue) {
      //console.log('input.message $watch, newValue ' + newValue);
      if (!newValue) newValue = '';
      localStorage['userMessage-' + $scope.toUser._id] = newValue;
    });

    $scope.sendMessage = function(sendMessageForm) {
      var message = {
        toId: $scope.toUser._id,
        text: $scope.input.message
      };

      // if you do a web service call this will be needed as well as before the viewScroll calls
      // you can't see the effect of this in the browser it needs to be used on a real device
      // for some reason the one time blur event is not firing in the browser but does on devices
      keepKeyboardOpen();
      
      //MockService.sendMessage(message).then(function(data) {
      $scope.input.message = '';

      message._id = new Date().getTime(); // :~)
      message.date = new Date();
      message.username = $scope.user.username;
      message.userId = $scope.user._id;
      message.pic = $scope.user.picture;

      $scope.messages.push(message);

      $timeout(function() {
        keepKeyboardOpen();
        viewScroll.scrollBottom(true);
      }, 0);

      $timeout(function() {
        $scope.messages.push(MockService.getMockMessage());
        keepKeyboardOpen();
        viewScroll.scrollBottom(true);
      }, 2000);
    };
    
    // this keeps the keyboard open on a device only after sending a message, it is non obtrusive
    function keepKeyboardOpen() {
      //console.log('keepKeyboardOpen');
      txtInput.one('blur', function() {
        //console.log('textarea blur, focus back on it');
        txtInput[0].focus();
      });
    }

    $scope.onMessageHold = function(e, itemIndex, message) {
      //console.log('onMessageHold');
      //console.log('message: ' + JSON.stringify(message, null, 2));
      $ionicActionSheet.show({
        buttons: [{
          text: 'Copy'
        }],
        buttonClicked: function(index) {
          switch (index) {
            case 0: // Copy
              //cordova.plugins.clipboard.copy(message.text);

              break;
          } 
          return true;
        },
        destructiveText: 'Delete',
        destructiveButtonClicked: function() {
          $scope.messages.splice(itemIndex, 1);
          $timeout(function() {
              viewScroll.resize();
          }, 0);
          return true;
        },
        cancelText: 'Cancel',
        cancel: function() {
          hideSheet();
        }
      });
    };

    // this prob seems weird here but I have reasons for this in my app, secret!
    $scope.viewProfile = function(msg) {
      if (msg.userId === $scope.user._id) {
        // go to your profile
      } else {
        // go to other users profile
      }
    };
    
    $scope.$on('elastic:resize', function(e, ta, taHeight, mirrorHeight) {
      //console.log('taResize');
      if (!ta) return;
      
      //var taHeight = ta[0].offsetHeight;
      //console.log('ta height: ', taHeight, mirrorHeight);
      
      if (!footerBar) return;
      
      var newFooterHeight = mirrorHeight + 10;
      newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;
      
      footerBar.style.height = newFooterHeight + 'px';
      scroller.style.bottom = newFooterHeight + 'px'; 
    });

    $scope.onProfilePicError = function(ele) {
      //console.log('onProfilePicError');
      this.ele.src = ''; // set a fallback
    };

  }])

  .controller('AccountCtrl', function($scope) {
  })

  .controller('LoginCtrl', ['Users', '$state', '$scope', function (Users, $state, $scope) {

    //TODO: 
    //1. add form validataion ngForm.$valid
    //2. hook up with model

    $scope.loading = false;

    $scope.user = {
      email: '',
      password: '',
      register: false
    };

    function register() {
      console.log('register');
      Users.register({
          email: $scope.user.email,
          password: $scope.user.password
      })
      .then(onLogin)
      .catch(onError)
      .finally(onCompletion);
    }

    function onLogin() {
      console.log('login');
      Users.login({
          email: $scope.user.email,
          password: $scope.user.password
      })
      .then(onSuccess)
      .catch(onError)
      .finally(onCompletion);
    }

    function onSuccess(result) {
      console.log('login success');
      $state.go('tab.home');
    }

    function onError(reason) {
      console.log('login error');
      $scope.error = reason.message;
    }

    function onCompletion() {
      $scope.reset();
    }

    $scope.submit = function () {
      //if (isValid) {
        $scope.loading = true;

        $scope.user.register ? register(): onLogin();

      //}
    };

    $scope.reset = function () {
      $scope.loading = false;
      $scope.user = {
        email: '',
        password: '',
        register: false
      };
    };
  }])
;


// configure moment relative time
moment.locale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "%d sec",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  }
});