$(function() {
  var Media = Echo.Media,             // Media class
    EchoClient = Echo.EchoClient,   // Echo Client class
    Enums = Echo.Enums,             // Enums
    ConfigKeys = Echo.ConfigKeys,   // Key names to use in config
    Environment = Echo.Environment; // Class to allow overriding default behaviour

  var echo = new EchoClient(
    'Drop',                    // App Name
    Enums.ApplicationType.WEB   // App Type
  );

  //set bbc_site managed label - this label is mandatory and is required to assign data in comscore to the correct BBC product:
  echo.addManagedLabel(Enums.ManagedLabels.BBC_SITE, "taster");

  //You can optionally set the version of your application:
  echo.setAppVersion('1.0.0');

  echo.viewEvent("taster.pilot.bbc-drop.internal.home.page");


});