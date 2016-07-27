var map;
						
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: 49.256292, lng: -123.116226},
	    zoom: 12,
	    styles: style
	  });

	

	$.getJSON( '/getbins', function( data ) {

        $.each(data, function(){
           var marker = new google.maps.Marker({
		      position: {lat: parseFloat(this.lat), lng: parseFloat(this.lng)},
		      map: map,
		      icon: getIcon(this.est)
		    });
           
		    
        });
    });

	
  	 

}

function getIcon(est){
	if(est <= 50)
		return 'images/pinwhite.png';
	else if(est > 50 && est <= 70)
		return 'images/pingreen.png';
	else if(est > 70 && est <= 90)
		return 'images/pinyellow.png';
	else
		return 'images/pinred.png';
}



var style = [
	    {
	        "featureType": "all",
	        "elementType": "all",
	        "stylers": [
	            {
	                "visibility": "simplified"
	            },
	            {
	                "invert_lightness": true
	            },
	            {
	                "saturation": -94
	            },
	            {
	                "lightness": 25
	            },
	            {
	                "gamma": 0.96
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "elementType": "all",
	        "stylers": [
	            {
	                "visibility": "off"
	            },
	            {
	                "color": "#000000"
	            }
	        ]
	    }
	]