bbcApp.factory('Categories',['$http', function($http){
    var categories = [];
    var preferences = [];
    var loading = {status:true}

    var checkUserCategory = function(category){
        var selected = false;
        for(var i = 0, ii = preferences.length; i < ii; i++){
            if(category.id == preferences[i].id && selected == false) {
                selected = true;
            }
        }
        return selected;
    }

    var getCategories = function(){
        var url = 'http://' + Drop.getBaseUrl() + '/api/categories.json';
        $http.get(url).then(function(response){
            var results = response.data.data;
            for(var i=0, ii = results.length; i < ii; i++){
                results[i].selected = checkUserCategory(results[i]);
                categories.push(results[i]);
            }
            loading.status = false;
        }, function(error){
            // handle the error
        });
    }

    var loadPreferences = function(){
        var url = 'http://' + Drop.getBaseUrl() + '/api/auth/preferences.json';
        if(preferences.length == 0){
            $http.get(url).then(function(response){
                var results = response.data.categories;
                for(var i=0, ii = results.length; i < ii; i++){
                    preferences.push(results[i]);
                }
                // fetch and merge categories
                getCategories();
            }, function(error){
                // handle the error
            });
        }
    }

    return {
        get: function(){
            if(categories.length == 0){
                loadPreferences();
            }
            return categories;
        },

        toggleSelection: function(category){
            var i = categories.indexOf(category);
            if(categories[i].selected == true){
                categories[i].selected = false;
            }
            else {
                categories[i].selected = true;
            }
        },

        savePreferences: function(){
            var url = 'http://' + Drop.getBaseUrl() + '/api/auth/personalize.json';
            var myCategories = {
                'categories': []
            }

            for(var i, ii = categories.length; i < ii; i++){
                if(categories[i].selected == true){
                    myCategories.categories.push(categories[i].id);
                }
            }

            console.log(myCategories);

            $http.post(url,myCategories).then(function(response){
                // save successful
            },function(error){
                // show error
            });
        },

        loading: function(){
            return loading;
        }
    }

}]);
