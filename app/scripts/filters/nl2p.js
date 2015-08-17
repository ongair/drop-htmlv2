appFilters.filter('nl2p', function() {
    return function(text){
          text = String(text).trim();
          return (text.length > 0 ? '<p>' + text.replace(/[\r\n]+/g, '</p><p>') + '</p>' : null);
      }
});
