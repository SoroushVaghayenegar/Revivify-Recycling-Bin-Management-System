function addToPickup(id){
	$.ajax({
    	type: 'PUT',
    	url: '/add-to-pickup/',
    	data: { 
    		id: id,
    		}
	});
	setTimeout(function(){
	    $('#none_pickup_bins').load(document.URL +  ' #none_pickup_bins');
		$('#on_pickup_bins').load(document.URL +  ' #on_pickup_bins');
	}, 500);
}

function removePickup(id){
	$.ajax({
    	type: 'PUT',
    	url: '/remove-pickup/',
    	data: { 
    		id: id,
    		}
	});
	setTimeout(function(){
	    $('#none_pickup_bins').load(document.URL +  ' #none_pickup_bins');
		$('#on_pickup_bins').load(document.URL +  ' #on_pickup_bins');
	}, 500);

}


