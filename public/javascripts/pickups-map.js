var map;

function initMap() {

  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
	
  map = new google.maps.Map(document.getElementById('pickup-map'), {
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


  document.getElementById('selectbin').addEventListener('change', function() {
    if(document.getElementById('selectbin').value != "-"){
      var str = document.getElementById('selectbin').value;
      var lat = str.substring(0, str.indexOf(','));
      var lng = str.substring(str.indexOf(',')+1 , str.length);
      calculateAndDisplayRoute(directionsService, directionsDisplay, parseFloat(lat), parseFloat(lng));
    }
  });



}

function calculateAndDisplayRoute(directionsService, directionsDisplay, destLat, destLng){
  directionsService.route({
    origin: {lat: 49.269053, lng: -123.111767},  // 288 W 1st Ave, Vancouver, BC V5Y 3T2.
    destination: {lat: destLat, lng: destLng},  // Destination Bin.
    travelMode: "DRIVING"
  }, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
      directionsDisplay.setMap(map);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}