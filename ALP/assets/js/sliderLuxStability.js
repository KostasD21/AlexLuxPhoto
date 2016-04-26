var total_street = 24;
var total_music = 12;
var total_portrait = 21;
var total_wallpaper = 15;
var total = 0;
var param = 1;
var cat = null;

var scaledVal = [];
var mainContent_width;
var mainContent_height;

$( document ).ready(function() {
    // First you forcibly request the scroll bars to hidden regardless if they will be needed or not.
	$('body').css('overflow', 'hidden');
	
	var x = $(window).width();	//viewport width
	var y = $(document).height(); //viewport height
	
	// Set the overflow css property back to it's original value (default is auto)
	if(x <= 1190){
		$('body').css('overflow', 'auto');
	}
	else{
		$('body').css('overflow', 'hidden');
	}
		
	mainContent_width = 0.73*x;		
	mainContent_height = y-100;		//10px margin-bottom(#slider) and 85px margin-top(#maincontent)
	
	//console.log("Dimensions of maincontent (1) : "+mainContent_width+" x "+mainContent_height);
});

function loadFunc(){
		var element = document.getElementById('maincontent');
		element.style.opacity = "1";
		element.style.filter  = 'alpha(opacity=100)';
		initializeSlider();	
}
	
function initializeSlider(){
		var myParam = getURLParameter('img');
		param = myParam;
		
		var myParam1 = getURLParameter('cat');
		cat = myParam1;
		
		var element = document.getElementById('image');
		element.src = "../../assets/img/portfolio/"+cat+"/"+cat+""+param+".jpg";
		
		var tmpImg = new Image();
		tmpImg.src="../../assets/img/portfolio/"+cat+"/"+cat+""+param+".jpg";
		$(tmpImg).on('load',function(){
  	
			//Calculate image's initial width and height
			var orgWidth = tmpImg.width;
			var orgHeight = tmpImg.height;
			var windowWidth = $(window).width();
				
			scaledVal = calculateDownscale(orgWidth,orgHeight,mainContent_width,mainContent_height,windowWidth);
				
				
			$("#image").css({"width":scaledVal[0]+"px", "height":scaledVal[1]+"px", "margin":"auto", "position":"relative", "display":"block"});			
				
		});
}

function getURLParameter(name) {
  		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function photo(x) {
	
	//Different total number of images in categories
	switch (cat) {
        case "street":
            total = total_street;
			break;
        case "music":
			total = total_music;
            break;
        case "portrait":
            total = total_portrait;
			break;
        case "wallpaper":
			total = total_wallpaper;
            break;
    }
	
	param = parseInt(param) + x;
	if(param > total){param = 1;}
	if(param < 1){param = total;}
	
	var window_width = $(window).width();
	
	if(window_width <= 1190){	//If it's a tablet then focus on the image slider in the transition
		window.location.assign("slider.html?img="+param+"&cat="+cat+"#maincontent");
	}
	else{
		window.location.assign("slider.html?img="+param+"&cat="+cat);
	}
}


function go_to_thumbnails(){
	var category = getURLParameter('cat');
	window.location.assign("../../portfolio/"+category+"/");
}


//Function for downscale calculation of initial image's dimensions	
function calculateDownscale(orgWidth,orgHeight,mainContent_width,mainContent_height,windowWidth){

	var scaledDim = [];		
	scaledDim[0] = 0;	//scaled width
	scaledDim[1] = 0;	//scaled height

	//Calculate downscale ratio of width
	var downscaleRatio = mainContent_width/orgWidth;
	
	//screen-width is more than 1190px
	if (windowWidth>=1190) {
	
			//If donwscale ratio >= 1.00 then put the image as it is, in the initial width
			if(downscaleRatio >= 1){
				
				//Check if downscale ratio fits in the maincontent against the height of the div
				if(downscaleRatio * orgHeight <= mainContent_height){
					scaledDim[0] = orgWidth;
					scaledDim[1] = orgHeight;
				}
				//Calculate new downscale ratio by image's height
				else{
					downscaleRatio = mainContent_height/orgHeight;
					scaledDim[0] = downscaleRatio * orgWidth;
					scaledDim[1] = downscaleRatio * orgHeight;
				}
				
			}
			else{	//Doesn't fit in the width of maincontent
				
				downscaleRatio = mainContent_height/orgHeight;
				scaledDim[0] = downscaleRatio * orgWidth;
				scaledDim[1] = downscaleRatio * orgHeight;
				
			}
			
	}
	else{//screen width is less than 1190px - image gets full width
			
			if(downscaleRatio >= 1){
				scaledDim[0] =  orgWidth;
				scaledDim[1] =  orgHeight;
			}
			else{
				scaledDim[0] = downscaleRatio * orgWidth;
				scaledDim[1] = downscaleRatio * orgHeight;
			}
	}
			
	/*console.log("Dimensions of scaled image: "+scaledDim[0]+" x "+scaledDim[1]);*/
	return scaledDim;
}	
	
	
document.onkeydown = function(e) {
    switch (e.keyCode) {			
		case 37:
            photo(-1);	//Left arrow
			break;
        case 39:
            photo(1);	//Right arrow
			break;
		case 27:
			go_to_thumbnails();
			break;
    }
};


/*$(function() {

	// open in fullscreen
	$('#fullscreen .requestfullscreen').click(function() {
		$('#fullscreen').fullscreen();
		return false;
	});

	// exit fullscreen
	$('#fullscreen .exitfullscreen').click(function() {
		$.fullscreen.exit();
		return false;
	});

	// document's event
	$(document).bind('fscreenchange', function(e, state, elem) {
		// if we currently in fullscreen mode
		if ($.fullscreen.isFullScreen()) {
			$('#fullscreen .requestfullscreen').hide();
			$('#fullscreen .exitfullscreen').show();
			$('#fullscreen .exitfullscreen').css({"visibility":"visible"});
		} else {
			$('#fullscreen .requestfullscreen').show();
			$('#fullscreen .exitfullscreen').hide();
			$('#fullscreen .exitfullscreen').css({"visibility":"hidden"});
		}

		/*$('#state').text($.fullscreen.isFullScreen() ? '' : 'not')
	});
});

$('.autoPlay').bind('click', function( event ){
               alert('Hi there!');
            });*/
	
/*window.setInterval(function photoA() {
	var image = document.getElementById('image');
	imageCount = imageCount + 1;
	if(imageCount > total){imageCount = 1;}
	if(imageCount < 1){imageCount = total;}	
	image.src = "Images/img"+ imageCount +".jpg";
	},5000);*/