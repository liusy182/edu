angular.module('app.services', [])

  .factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.'
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
  .factory('Groups', function() {

    var groups = [{
      id: 0,
      name: 'Class101',
      lastText: 'some annoucements..'
    }, {
      id: 1,
      name: 'Class202',
      lastText: 'some annoucements too..'
    }];

    return {
      all: function() {
        return groups;
      },
      remove: function(group) {
        groups.splice(groups.indexOf(group), 1);
      },

      get: function(groupId) {
        for (var i = 0; i < groups.length; i++) {
          if (groups[i].id === parseInt(groupId)) {
            return groups[i];
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
