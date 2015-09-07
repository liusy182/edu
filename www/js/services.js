angular.module('app.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: ''
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: ''
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: ''
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: ''
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: ''
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.factory('Users', [, function () {
  var currentUser = null;

  return {
    getCurrentUser: function () {
      return currentUser;
    },

    setCurrentUser: function (user) {
      currentUser = user;
    },

    login: function (user) {
    },

    register: function (user) {
    },

    logout: function () {
      currentUser = null;
    }
  };
}])
;
