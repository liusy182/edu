angular.module('app.services', [])

  .factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    var messages = [{
      id: 0,
      from: 'Student A',
      to: 'Teacher B',
      text: 'Hi teacher, how are you?',
      timestamp: ''
    }, {
      id: 1,
      from: 'Teacher B',
      to: 'Student A',
      text: 'Good job!',
      timestamp: ''
    }, {
      id: 2,
      from: 'Teacher B',
      to: 'Student A',
      text: 'How is your class today?',
      timestamp: ''
    }, {
      id: 3,
      from: 'Student C',
      to: 'Teacher B',
      text: 'I am sick today.',
      timestamp: ''
    }, {
      id: 4,
      from: 'Teacher B',
      to: 'Student C',
      text: 'Take some good rest at home.',
      timestamp: ''
    }, {
      id: 5,
      from: 'Teacher B',
      to: 'Student C',
      text: 'reminder of the day:...',
      timestamp: ''
    }, {
      id: 6,
      from: 'Teacher B',
      to: 'Student A',
      text: 'Lets have a talk after class',
      timestamp: ''
    }, {
      id: 7,
      from: 'Student A',
      to: 'Teacher B',
      text: 'OK',
      timestamp: ''
    }];
    
    var chats = [{
      id: 0,
      name: 'Student A',
      //TODO: last text to be removed.
      lastText: 'You on your way?'
    }, {
      id: 1,
      name: 'Parent X',
      lastText: 'Hey, it\'s me'
    }, {
      id: 2,
      name: 'random person',
      lastText: 'I should buy a boat'
    }, {
      id: 3,
      name: 'ABCDEFG',
      lastText: 'Look at my mukluks!'
    }, {
      id: 4,
      name: 'Alpha',
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
