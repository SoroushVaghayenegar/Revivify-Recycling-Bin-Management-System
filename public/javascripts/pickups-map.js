var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.256292, lng: -123.116226},
    zoom: 12,
    styles: [{
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]  // Turn off points of interest.
    }, {
      featureType: 'transit.station',
      stylers: [{ visibility: 'off' }]  // Turn off bus stations, train stations, etc.
    }],
    disableDoubleClickZoom: false
  });
    var binlocs = [
  [49.273625, -123.132538,'../images/pingreen.png'],
  [49.287656, -123.114996,'../images/pinred.png'],
  [49.282391, -123.108857,'../images/pinwhite.png'],
  [49.273191, -123.118981,'../images/pingreen.png']];
    var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map
  });

  // Set destination, origin and travel mode.
  var request = {
    destination: {lat: binlocs[0][0], lng: binlocs[0][1]},
    origin: {lat: binlocs[3][0], lng: binlocs[3][1]},
    travelMode: google.maps.TravelMode.DRIVING
  };
    //can add waypoints: some array, this will create waypoints between the start and finish which can be set based on where the truck is coming from. Also there are optimize: true options to make it so it shows the shortest distance

  // Pass the directions request to the directions service.
  var directionsService = new google.maps.DirectionsService();
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      // Display the route on the map.
      directionsDisplay.setDirections(response);
    }
  });


}