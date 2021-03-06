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
  .factory('Users', ['$q', function ($q) {
    var currentUser = null;

    return {
      getCurrentUser: function () {
        return currentUser;
      },

      setCurrentUser: function (user) {
        currentUser = user;
      },

      login: function (user) {
        var deferred = $q.defer();
        if(user.email && user.password){
          currentUser = {
            email: user.email,
            password: user.password
          };
          deferred.resolve(currentUser);
        } else {
          deferred.reject('error');
        }
        return deferred.promise;
      },

      register: function (user) {

      },

      logout: function () {
        currentUser = null;
      }
    };
  }])

  .factory('MockService', ['$http', '$q',
    function($http, $q) {

      function getMockMessages() {
        return {
          "messages": [{
              "_id":"535d625f898df4e80e2a125e",
              "text":"Today's annoucements",
              "userId":"534b8fb2aa5e7afc1b23e69c",
              "date":"2014-04-27T20:02:39.082Z",
              "read":true,
              "readDate":"2014-12-01T06:27:37.944Z"
            }, {
              "_id":"535f13ffee3b2a68112b9fc0",
              "text":"I like this class better than ice cream!",
              "userId":"534b8e5aaa5e7afc1b23e69b",
              "date":"2014-04-29T02:52:47.706Z",
              "read":true,
              "readDate":"2014-12-01T06:27:37.944Z"
            }, {
              "_id":"546a5843fd4c5d581efa263a",
              "text":"SOME LONGLONG TEXT long long long long lon lon lon lon lon lon lon lon lon lon lon lon long",
              "userId":"534b8fb2aa5e7afc1b23e69c",
              "date":"2014-11-17T20:19:15.289Z",
              "read":true,
              "readDate":"2014-12-01T06:27:38.328Z"
            }, {
              "_id":"54764399ab43d1d4113abfd1",
              "text":"Am I dreaming?",
              "userId":"534b8e5aaa5e7afc1b23e69b",
              "date":"2014-11-26T21:18:17.591Z",
              "read":true,"readDate":"2014-12-01T06:27:38.337Z"
            }, {
              "_id":"547643aeab43d1d4113abfd2",
              "text":"Is this good?",
              "userId":"534b8fb2aa5e7afc1b23e69c",
              "date":"2014-11-26T21:18:38.549Z",
              "read":true,
              "readDate":"2014-12-01T06:27:38.338Z"
            }, {
              "_id":"547815dbab43d1d4113abfef",
              "text":"Hey this is something special.",
              "userId":"534b8e5aaa5e7afc1b23e69b",
              "date":"2014-11-28T06:27:40.001Z",
              "read":true,
              "readDate":"2014-12-01T06:27:38.338Z"
            }, {
              "_id":"54781c69ab43d1d4113abff0",
              "text":"IWowooowowowoworjdfkdjfowowjkdla;f!",
              "userId":"534b8fb2aa5e7afc1b23e69c",
              "date":"2014-11-28T06:55:37.350Z",
              "read":true,
              "readDate":"2014-12-01T06:27:38.338Z"
            }, {
              "_id":"54781ca4ab43d1d4113abff1",
              "text":"Yea, it's pretty sweet",
              "userId":"534b8e5aaa5e7afc1b23e69b",
              "date":"2014-11-28T06:56:36.472Z",
              "read":true,
              "readDate":"2014-12-01T06:27:38.338Z"
            }, {
              "_id":"5478df86ab43d1d4113abff4",
              "text":"Wow, this is really something huh?",
              "userId":"534b8fb2aa5e7afc1b23e69c",
              "date":"2014-11-28T20:48:06.572Z",
              "read":true,
              "readDate":"2014-12-01T06:27:38.339Z"
            }, {
              "_id":"54781ca4ab43d1d4113abff1",
              "text":"Great",
              "userId":"534b8e5aaa5e7afc1b23e69b",
              "date":"2014-11-29T06:56:36.472Z",
              "read":true,
              "readDate":"2014-12-01T06:27:38.338Z"
            }
          ],
          "unread": 0
        };
      }//end of function

      var me = {};

      me.getUserMessages = function(d) {
        var deferred = $q.defer();
        
        setTimeout(function() {
          deferred.resolve(getMockMessages());
        }, 1500);
        
        return deferred.promise;
      };

      me.getMockMessage = function() {
        return {
          userId: '534b8e5aaa5e7afc1b23e69b',
          date: new Date(),
          text: 'some reply from sy.'
        };
      }

      return me;
    }
  ])
;
