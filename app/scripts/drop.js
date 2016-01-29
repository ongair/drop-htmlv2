// var Drop = {}
var Drop = Drop || {};

Drop.getBaseUrl = function() {
  return document.location.hostname;
}

Drop.getDropId = function() {
  var regex = /bbc-drop-uk/;
  var id = "bbc-drop";
  if (regex.exec(Drop.getBaseUrl()) != null) {
    id = "bbc-drop-uk";
  }
  return id;
}