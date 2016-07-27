var placeSearch, autocomplete;


function initAutocomplete() {
// Create the autocomplete object, restricting the search to geographical
// location types.
autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('inputlocation')),
    {types: ['geocode']});

// When the user selects an address from the dropdown, populate the address
// fields in the form.
autocomplete.addListener('place_changed', fillInAddress);

$('#inputlocation').keypress(function(e) {
  if (e.which == 13) {
  	e.preventDefault(); 
  }
});

}

function fillInAddress() {
// Get the place details from the autocomplete object.
var place = autocomplete.getPlace();
document.getElementById("inputlat").value = place.geometry.location.lat();
document.getElementById("inputlng").value = place.geometry.location.lng();

}

