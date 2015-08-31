bbcApp.factory('Articles', ['$http', function($http){
    var articles = [];
    var page = 1;

    var fetchArticles = function(){
        var url = 'http://drop.ongair.im/api/articles.json?page='+page;
        $http.get(url).then(function(response){
            var results = response.data.data;
            for(var i=0, ii = results.length; i < ii; i++){
                results[i].pointer = {
                    'x':0,
                    'start':0,
                    'p':0,
                    'za':0,
                    'zb':1,
                    'right':0,
                    'left':0,
                }
                articles.push(results[i]);
            }
        }, function(error){
            // handle the error
        });
    }

    return {
        get: function() {
            if(articles.length == 0){
                fetchArticles();
            }
            return articles;
        },

        destroy: function($article) {
            var index = articles.indexOf($article);
            articles.splice(index,1);

            if(articles.length < 5) {
                page++;
                fetchArticles();
            }
        },

        like: function($article) {
            $http.post('http://drop.ongair.im/api/articles/'+$article.id+'/like');
        },

        skip: function($article) {
            $http.post('http://drop.ongair.im/api/articles/'+$article.id+'/ignore');
        }
    }
}]);
