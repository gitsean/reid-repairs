
/*MENU*/
/*Controls the menu slide in and out classes*/
/*
over = function(){
	$("#background").toggleClass("move");
	$("#content").toggleClass("move");
	$("#branding").toggleClass("move");
	$("#branding").toggleClass("static");
	$("#background").toggleClass("static");
	$("#content").toggleClass("static");
	$("#navbar").toggleClass("menu");	
}
*/

$( document ).ready(function() {
    var str = $('#subtext').text();
	str = str.toLowerCase().replace(/\b[A-Z]/g, function(letter) {
	    return letter.toLowerCase();
	});
	card();

	
	setHeights();

});

/*GOOGLE MAPS*/

function initialize() {
	var mapCanvas = document.getElementById('map');
	var mapOptions = {
	  center: new google.maps.LatLng(40.177124, -75.106621),
	  zoom: 15,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(40.177124, -75.106621)});
	infowindow = new google.maps.InfoWindow({content:'<strong>Reid Repairs</strong><br>2 South York Road<br>19040 Hatboro<br>'});
	google.maps.event.addListener(marker, 'click', function(){infowindow.open(map,marker);});
	infowindow.open(map,marker);
}

var pathname = window.location.pathname;

google.maps.event.addDomListener(window, 'load', initialize);







var card = function(id){
	if(!id){
		$('.front').show();
		$('.back').hide();
	} else {
		//if this, then someone clicked... so we'll have to toggle the show/hide.
		//Do nothing for now - will engage when live
		if($('#' + id).find('.front').is(":visible")){
			$('#' + id).find('.front').hide();
			$('#' + id).find('.back').show();
		} else {
			$('#' + id).find('.front').show();
			$('#' + id).find('.back').hide();
		}

	}
}

var setHeights = function(){

	$('body').css('background', '#000 url("img/car7t.png") no-repeat fixed');
	$('body').css('backgroundSize','1750px');

	var inspection = $('#inspection-area').offset().top;
	var aseCert = $('#ase-area').offset().top;
	var map = $('#map-area').offset().top;
	var elemHeight = $('#inspection-area').height();
	var firstChange = inspection + elemHeight + 75;
	var secondChange = aseCert + elemHeight + 75;
	var thirdChange = map + elemHeight + 75;


	$(window).scroll(function(){
	  var scrollTop = $(window).scrollTop();
	  
	  if(scrollTop <= 1254){
	  	
	  	//$('body').css['background-image'] = "url('../img/car7t.png') !important";
	  	$('body').css('background', '#000 url("img/car7t.png") no-repeat fixed');
	  	$('body').css('backgroundSize','1750px');
	  	//background.css("background-image", "url('img/car7t.png') !important");
	  	
	  }
	  if(scrollTop > firstChange){
	    
	    $('body').css('background', '#000 url("img/car8t.png") no-repeat fixed');
	  	$('body').css('backgroundSize','1750px');
	  }
	  if(scrollTop > secondChange){
	    
	    $('body').css('background', '#000 url("img/car4t.png") no-repeat fixed');
	  	$('body').css('backgroundSize','1750px');
	  }
	  if(scrollTop > thirdChange){
	    
	    $('body').css('background', '#000 url("img/car6t.png") no-repeat fixed');
	  	$('body').css('backgroundSize','1750px');
	  }
	  // if(scrollTop > 2975 && scrollTop <= 6000){
	  //   console.log('showing image 3')
	  // }
	  // if(scrollTop > 6000){
	  //   console.log('showing image 4')
	  // }
	  //$('#thediv').stop().animate({'max-height': maxHeight+"px"}, 500);
	})
}