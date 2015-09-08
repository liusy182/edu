angular.module('app.controllers', [])

  .controller('HomeCtrl', function($scope) {})

  .controller('GroupsCtrl', ['$scope', 'Groups' , function($scope, Groups) {
    $scope.groups = Groups.all();

  }])

  .controller('ChatsCtrl', ['$scope', 'Chats' , function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  }])

  .controller('ChatDetailCtrl', ['$scope', '$stateParams', 'Chats', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
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
