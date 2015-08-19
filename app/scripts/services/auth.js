appServices.factory('AuthService', function($q) {

    var authorizationResult = false;

    return {
        initialize: function() {
            //initialize OAuth.io with public key of the application
            // dev k6_ncNlx14VMy9XUa5vK6dGzpMI
            // production xiZX0elRQVlTTgqTlZ-XOBn-19k
            OAuth.initialize('k6_ncNlx14VMy9XUa5vK6dGzpMI', {
                cache: true
            });

            //try to create an authorization result when the page loads,
            // this means a returning user won't have to click the login button again
            var twitter = OAuth.create('twitter');
            var facebook = OAuth.create('facebook');

            if(twitter != null) {
                authorizationResult = twitter;
            } else {
                authorizationResult = facebook;
            }
        },

        isReady: function() {
            return (authorizationResult);
        },

        authenticate: function(provider) {
            var deferred = $q.defer();
            OAuth.popup(provider, {
                cache: true
            }, function(error, result) {
                // cache means to execute the callback if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    //do something if there's an error
                }
            });
            return deferred.promise;
        },

        clearCache: function() {
            OAuth.clearCache();
            authorizationResult = false;
        },

        // todo: return a nicely formated object
        getProfile: function() {
            authorizationResult.me().done(function(me) {
                console.log(me.name);
                console.log(me.alias);
                console.log(me.location);
                console.log(me.raw);
                console.log(me.id);
            }).fail(function(err) {
                //todo: when the OAuth flow failed
            });
        }
    }
});
