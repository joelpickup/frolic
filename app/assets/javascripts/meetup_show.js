var myMap = myMap || {};
var event_centre;
var global_map;

myMap.initialize = function() {
  var markers = [];
  var mapOptions = {
    center: { lat:  51.52, lng: -0.115},
    zoom: 14,
    mapTypeId:google.maps.MapTypeId.ROADMAP //default
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  global_map = map;
  var input = (document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  var searchBox = new google.maps.places.SearchBox((input));

  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();
    console.log(places);
    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      
      markers.push(marker);
      bounds.extend(place.geometry.location);
      event_centre = place.geometry.location;
      google.maps.event.addListener(marker, 'click', function(){
        id = $('#meetup_id').html();
        var popupOptions = {
          content: this.title + "<form action='/meetups/"+id+"/venue_suggestions/new' data-remote='true'><input type='hidden' name='venue_suggestion[venue_name]' value='"+this.title+"'><input type='hidden' name='venue_suggestion[meetup_id]' value='"+id+"'><input type='hidden' name='venue_suggestion[lat]' value='"+this.position.k+"'><input type='hidden' name='venue_suggestion[long]' value='"+this.position.D+"'><button>Suggest this!</button></form>"
        };
        var popup = new google.maps.InfoWindow(popupOptions);
        
        popup.open(map, this);
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
  $.getJSON("https://www.eventbriteapi.com/v3/events/search/?location.within=2km&location.latitude="+ latitude + "&location.longitude="+longitude+"&categories=103%2C110&start_date.keyword=this_week&token=SHSAVN36MVXA7GYU7G5P", function(data) {
    console.log(data.events);
    var markers = [];

    var events = data.events;
    console.log(events);
    if (events.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, event; event = events[i]; i++) {
      var image = {
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: global_map,
        title: event.name.text,
        position: new google.maps.LatLng(event.venue.latitude, event.venue.longitude),
        id: event.id,
        logo: event.logo_url,
        url: event.url,
        venue_id: event.venue_id,
        time: event.start.local,
        event_id: event.id,
        category: event.category.name
      });

      
      markers.push(marker);
      bounds.extend(new google.maps.LatLng(event.venue.latitude, event.venue.longitude));
      google.maps.event.addListener(marker, 'click', function(){
        var popupOptions = {
          content: "<h2><strong>Name:</strong>"+this.title+"</h2><br><p class='time'><strong>Time:</strong>"+this.time+"</p><p class='category'><strong>Category:</strong>"+this.category+"</p><img style='height: 20px; width: 20px;'src='"+this.logo+"' class=''alt=''><a href='"+this.url+"' target='_blank'>More info</a><button>suggest this!</button>"

        };
        var popup = new google.maps.InfoWindow(popupOptions);
        popup.open(global_map, this);
      });

    }
    global_map.fitBounds(bounds);
  });
});
});