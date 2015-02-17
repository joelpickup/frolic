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
        position: place.geometry.location,
        id: place.id,
        popup: new google.maps.InfoWindow({
          content: place.name + "<button data-name='"+place.name+"' data-lat='"+place.geometry.location.k+"' data-long='"+place.geometry.location.D+"' id='"+place.id+"'>Click!</button>"
        })
      });

      $("#map-canvas").on('click', '#'+ place.id, function(event){
        event.preventDefault();
        data = this.dataset;
        id = $('#meetup_id').html();
        form = "<div id='suggestion_"+id+"'><form action='/meetups/"+id+"/venue_suggestions/' data-remote='true'><input type='text' name='venue_suggestion[venue_name]' value='"+data.name+"'><input type='hidden' name='venue_suggestion[lat]' value='"+data.lat+"'><input type='hidden' name='venue_suggestion[long]' value='"+data.long+"'><input type='text' name='venue_suggestions[event_name]' placeholder='Event Name'><textarea name='venue_suggestion[event_description]' placeholder='Event Description'></textarea><input type='submit' value='suggest!'><a href='#' id='cancel'>cancel</a></div>";
        $('#suggestions_header').append(form);
        $('#cancel').on("click", function(){
          $('#suggestion_'+id).remove();
        });
      });

      // Add Listener to each marker, defining each 
      google.maps.event.addListener(marker, 'click', function(){
        this.popup.open(map, this);
      });

      
      markers.push(marker);
      bounds.extend(place.geometry.location);
      event_centre = place.geometry.location;
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
});