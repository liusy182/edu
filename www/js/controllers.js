angular.module('app.controllers', [])

  .controller('TabsCtrl', ['$scope', '$state', function($scope, $state) {
    console.log('state is ', $state.is('tab.chat-detail'));
    
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


  .controller('ChatDetailCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 
  '$ionicActionSheet', '$ionicPopup', '$ionicScrollDelegate', 
  '$timeout', '$interval', 'Chats', 
  function($scope, $rootScope, $state, $stateParams,
  $ionicActionSheet, $ionicPopup, $ionicScrollDelegate, 
  $timeout, $interval, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);

    $scope.toUser = {
      id: 'a',
      thumbnail: '',
      username: 'Student A'
    }

    $scope.user = {
      id: 'b',
      thumbnail: '',
      username: 'Teacher B'
    };

    $scope.input = {
      msg: localStorage['msg-' + $scope.toUser._id] || ''
    };

    var msgCheckTimer;
    var viewScroll = $ionicScrollDelegate.$getByHandle('msgScrollHandle');
    var footerBar; 
    var scroller;
    var txtInput; 

    //The view has fully entered and is now the active view. 
    //This event will fire, whether it was the first load or 
    //a cached view.
    $scope.$on('$ionicView.enter', function() {
      getMsgs();
      $timeout(function() {
        footerBar = document.body.querySelector('#chatDetailView #footerBar');
        scroller = document.body.querySelector('#chatDetailView #content');
        txtInput = angular.element(footerBar.querySelector('textarea'));
      }, 0);

      msgCheckTimer = $interval(function() {
        // check for new messages if your app doesn't 
        // use push notifications or user disabled them
      }, 20000);

    });

    $scope.$on('$ionicView.leave', function() {
      // Make sure that the interval is destroyed
      if (angular.isDefined(msgCheckTimer)) {
        $interval.cancel(msgCheckTimer);
        msgCheckTimer = undefined;
      }
    });

    $scope.$on('$ionicView.beforeLeave', function() {
      if (!$scope.input.msg || $scope.input.msg === '') {
        localStorage.removeItem('msg-' + $scope.toUser.id);
      }
    });


    //TODO: (future) this should trigger model's ajax calls
    function getMsgs() {
      $scope.doneLoading = true;
      $scope.msgs = [];

      $timeout(function() {
          viewScroll.scrollBottom();
        }, 0);
    }

    $scope.$watch('input.msg', 
      function(newValue, oldValue) {
      if (!newValue) newValue = '';
      localStorage['msg-' + $scope.toUser.id] = newValue;
    });

    $scope.send = function(form) {
      var msg = {
        toId: $scope.toUser.id,
        text: $scope.input.msg
      };

      keepKeyboardOpen();
      
      $scope.input.msg = '';

      msg.id = new Date().getTime(); // :~)
      msg.date = new Date();
      msg.username = $scope.user.username;
      msg.userId = $scope.user.id;
      msg.pic = $scope.user.picture;

      $scope.msgs.push(msg);

      $timeout(function() {
        keepKeyboardOpen();
        viewScroll.scrollBottom(true);
      }, 0);

      $timeout(function() {
        $scope.msgs.push(/*TODO; newly typed message needs to be added here*/);
        keepKeyboardOpen();
        viewScroll.scrollBottom(true);
      }, 2000);

    };

    // this keeps the keyboard open on a device only
    // after sending a message, it is non obtrusive
    function keepKeyboardOpen() {
      txtInput.one('blur', function() {
        txtInput[0].focus();
      });
    }

  }])

  .controller('AccountCtrl', function($scope) {
  })

  .controller('LoginCtrl', [/*'Users',*/ '$state', '$scope', function ($state, $scope) {

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
      // Users.register({
      //     email: $scope.user.email,
      //     password: $scope.user.password
      // })
      // .then(onLogin)
      // .catch(onError)
      // .finally(onCompletion);
    }

    function onLogin() {
      // Users.login({
      //     email: $scope.user.email,
      //     password: $scope.user.password
      // })
      // .then(onSuccess)
      // .catch(onError)
      // .finally(onCompletion);
    }

    function onSuccess(result) {
      $state.go('tab.home');
    }

    function onError(reason) {
      $scope.error = reason.message;
    }

    function onCompletion() {
      $scope.reset();
    }

    $scope.submit = function (user, isValid, isRegistering) {
      onSuccess();
      if (isValid) {
        $scope.loading = true;

        if (isRegistering) {
          register();
        } else {
          onLogin();
        }
      }
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
