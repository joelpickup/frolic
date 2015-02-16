var myMap = myMap || {};
var event_centre;

myMap.initialize = function() {

 var mapOptions = {
  center: { lat:  51.52, lng: -0.115},
  zoom: 14,
  mapTypeId:google.maps.MapTypeId.ROADMAP //default
};

var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(-33.8902, 151.1759),
  new google.maps.LatLng(-33.8474, 151.2631));
map.fitBounds(defaultBounds);
var input = /** @type {HTMLInputElement} */(
  document.getElementById('pac-input'));
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
var markers = [];
var searchBox = new google.maps.places.SearchBox(
  /** @type {HTMLInputElement} */(input));

    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      for (var i = 0, marker; marker = markers[i]; i++) {
        marker.setMap(null);
      }

      // For each place, get the icon, place name, and location.
      
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0, place; place = places[i]; i++) {
        var image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        var marker = new google.maps.Marker({
          map: map,
          icon: image,
          title: place.name,
          position: place.geometry.location
        });

        // Create PopUp for each place
        var popupOptions = {
          content: place.name
        };

        var popup = new google.maps.InfoWindow(popupOptions);

        markers.push(marker);

        bounds.extend(place.geometry.location);
        event_centre = place.geometry.location;

        google.maps.event.addListener(marker, 'click', function(){
          console.log(this.title);
        });
      }


      map.fitBounds(bounds);

    });

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
      var bounds = map.getBounds();
      searchBox.setBounds(bounds);
    });



  };

  $(function(){
   myMap.mapCanvas = $('#map-canvas')[0];
   myMap.initialize();
   $('#event_search').on('click', function(){
    latitude = String(event_centre.k);
    longitude = String(event_centre.D);
  // console.log(latitude,longitude);
  var events;
  $.getJSON("https://www.eventbriteapi.com/v3/events/search/?location.within=2km&location.latitude="+ latitude + "&location.longitude="+longitude+"&categories=103%2C110&start_date.keyword=this_week&token=SHSAVN36MVXA7GYU7G5P", function(data) {
    console.log(data);
  });
});
 });