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
  [49.273625, -123.132538,'images/pingreen.png'],
  [49.287656, -123.114996,'images/pinred.png'],
  [49.282391, -123.108857,'images/pinwhite.png'],
  [49.273191, -123.118981,'images/pingreen.png']];
    //This array will just pull this info from a database, image will be chosen on fill value. This info will originally be added from geocoder code below

   for (var i = 0; i < binlocs.length; i++) {
    var bin = binlocs[i];
    var marker = new google.maps.Marker({
      position: {lat: bin[0], lng: bin[1]},
      map: map,
      icon: bin[2],
    });
  }
}