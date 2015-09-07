'use strict';

angular.module('app.models')
  .service('UserModel', 
    [, function () {
    var service = this,
      currentUser = null;

    service.getCurrentUser = function () {
      return currentUser;
    };

    service.setCurrentUser = function (user) {
      currentUser = user;
    };

    service.login = function (user) {
    };

    service.register = function (user) {
    };

    service.logout = function () {
      currentUser = null;
    };
  }]);
