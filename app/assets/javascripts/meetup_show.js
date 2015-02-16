var myMap = myMap || {};

myMap.initialize = function() {

 var mapOptions = {
  center: { lat:  51.52, lng: -0.115},
  zoom: 14,
           mapTypeId:google.maps.MapTypeId.ROADMAP //default
         };

         var map = new google.maps.Map(myMap.mapCanvas, mapOptions);

       };
       $(function(){
         myMap.mapCanvas = $('#map-canvas')[0];
         myMap.initialize();
       });
