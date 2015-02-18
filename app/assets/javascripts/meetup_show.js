var myMap = myMap || {};
var event_centre;
var global_map;

myMap.initialize = function() {
  var markers = [];
  style = [{"featureType":"road","stylers":[{"hue":"#5e00ff"},{"saturation":-79}]},{"featureType":"poi","stylers":[{"saturation":-78},{"hue":"#6600ff"},{"lightness":-47},{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"lightness":22}]},{"featureType":"landscape","stylers":[{"hue":"#6600ff"},{"saturation":-11}]},{},{},{"featureType":"water","stylers":[{"saturation":-65},{"hue":"#1900ff"},{"lightness":8}]},{"featureType":"road.local","stylers":[{"weight":1.3},{"lightness":30}]},{"featureType":"transit","stylers":[{"visibility":"simplified"},{"hue":"#5e00ff"},{"saturation":-16}]},{"featureType":"transit.line","stylers":[{"saturation":-72}]},{}]

  var mapOptions = {
    center: { lat:  51.52, lng: -0.115},
    zoom: 14,
    mapTypeId:google.maps.MapTypeId.ROADMAP, //default
    styles: style
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
          content: place.name + "<button data-name='"+place.name+"' data-lat='"+place.geometry.location.k+"' data-long='"+place.geometry.location.D+"' id='"+place.id+"'>Suggest!</button>"
        })
      });

      $("#map-canvas").on('click', '#'+ place.id, function(event){
        event.preventDefault();
        data = this.dataset;
        id = $('#meetup_id').html();
        form = "<div id='suggestion_"+id+"'><form id='form_"+id+"'action='/meetups/"+id+"/venue_suggestions/' method='post' data-remote='true'><input type='hidden' name='venue_suggestion[meetup_id]' value='"+id+"'><input type='text' name='venue_suggestion[venue_name]' value='"+data.name+"'><input type='hidden' name='venue_suggestion[lat]' value='"+data.lat+"'><input type='hidden' name='venue_suggestion[long]' value='"+data.long+"'><input type='text' name='venue_suggestion[event_name]' placeholder='Event Name'><textarea name='venue_suggestion[event_description]' placeholder='Event Description'></textarea><input type='submit' value='suggest!'><a href='#' id='cancel'>cancel</a></div>";
        $('#suggestions_header').append(form);
        $('#form_'+id).on("ajax:success", function(e, data, status, xhr){
          $('#suggestion_'+id).remove();
          $('#suggestions_container').append(data.venueSuggestionPartial);
        });
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
 $('#suggestions_container').on("ajax:success", 'a', function(e,data,status,xhr){
  $(this).prev('.count').html(data);
 });
 var dateArrayStr = $('#array').html();
 var dateArray = $.parseJSON(dateArrayStr);
 $('#event_search').on('click', function(){
 latitude = String(event_centre.k);
 longitude = String(event_centre.D);
 start_date = $('#start_date').html();
 end_date = $('#end_date').html();
 $.getJSON("https://www.eventbriteapi.com/v3/events/search/?location.within=2km&location.latitude="+ latitude + "&location.longitude="+longitude+"&categories=103%2C110&start_date.range_start="+start_date+"T00%3A00%3A00Z&start_date.range_end="+end_date+"T23%3A00%3A00Z&token=SHSAVN36MVXA7GYU7G5P", function(data) {
   var markers = [];
   var events = data.events;
   events = events.filter(function(obj){
    return dateArray.indexOf(obj.start.local.slice(0, -9)) > -1;
   });
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
       category: event.category.name,
       popup: new google.maps.InfoWindow({
         content: "<h2><strong>Name:</strong>"+event.name.text+"</h2><br><p class='time'><strong>Time:</strong>"+event.start.local+"</p><p class='category'><strong>Category:</strong>"+event.category.name+"</p><img style='height: 20px; width: 20px;'src='"+event.logo_url+"' class=''alt=''><a href='"+event.url+"' target='_blank'>More info</a><button id='"+event.id+"' data-name='"+event.name.text+"' data-id='"+event.id+"' data-venue_id='"+event.venue_id+"' data-venue_name='"+event.venue.name+"' data-id='"+event.id+"' data-lat='"+event.venue.latitude+"' data-long='"+event.venue.longitude+"'>suggest this!</button>"
       })
     });

     $("#map-canvas").on('click', '#'+ event.id, function(event){
       event.preventDefault();
       data = this.dataset;
       console.log(data.description);
       id = $('#meetup_id').html();
       form = "<div id='suggestion_"+id+"'><form id='form_"+id+"'action='/meetups/"+id+"/venue_suggestions/' method='post' data-remote='true'><input type='hidden' name='venue_suggestion[meetup_id]' value='"+id+"'><input type='text' name='venue_suggestion[venue_name]' value='"+data.venue_name+"'><input type='hidden' name='venue_suggestion[lat]' value='"+data.lat+"'><input type='hidden' name='venue_suggestion[long]' value='"+data.long+"'><input type='text' name='venue_suggestion[event_name]' placeholder='Event Name' value='"+data.name+"'><textarea name='venue_suggestion[event_description]' placeholder='Event Description'></textarea><input type='submit' value='suggest!'><a href='#' id='cancel'>cancel</a></div>";
       $('#suggestions_header').append(form);
       $('#form_'+id).on("ajax:success", function(e, data, status, xhr){
         $('#suggestion_'+id).remove();
         $('#suggestions_container').append(data.venueSuggestionPartial);
       });
       $('#cancel').on("click", function(){
         $('#suggestion_'+id).remove();
       });
     });
     
     google.maps.event.addListener(marker, 'click', function(){
       this.popup.open(global_map, this);
     });

     markers.push(marker);
     bounds.extend(new google.maps.LatLng(event.venue.latitude, event.venue.longitude));

   }
   global_map.fitBounds(bounds);
 });
 });

});