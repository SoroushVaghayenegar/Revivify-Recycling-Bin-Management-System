function addToPickup(id){
	$.ajax({
    	type: 'PUT',
    	url: '/add-to-pickup/',
    	data: { 
    		id: id,
    		}
	});
	setTimeout(function(){
	    $('#tables').load(document.URL +  ' #tables');
	}, 200);
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
		$('#tables').load(document.URL +  ' #tables');
	}, 200);

}


