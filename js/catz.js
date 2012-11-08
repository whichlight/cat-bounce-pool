
// Implement a super simple (non-standard) version of bind, if not already there.
if (!Function.prototype.bind){
    Function.prototype.bind = function (bind){
        var self = this;
        return function(){
            return self.apply(bind, arguments);
        };
    };
}

// Find out some specific browser stuff
var CSS = {};
(function(){

    var styles = document.createElement('div').style;

    var test_properties = function(properties){
        return properties.filter(function(prop){
            return (styles[prop] !== undefined);
        })[0];
    };

    CSS.transform = test_properties([
        'transform',
        'WebkitTransform',
        'MozTransform',
        'msTransform',
        'OTransform'
    ]);

})();


// Credit mr.doob and paul irish.
// http://paulirish.com/2011/requestanimationframe-for-smart-animating
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback, element){
            window.setTimeout(callback, 1000 / 60);
        };
})();

document.addEventListener('DOMContentLoaded', function(){
    // Color links
    var colors = ['blue', 'orange', 'green', 'red', 'teal', 'purple', 'yellow'];
    Array.prototype.forEach.call(document.querySelectorAll('a'), function(link){
        link.className += ' ' + colors[Math.floor(Math.random() * colors.length)];
    });

    // Add more/less functionality to context menu.
    var context = document.querySelector('.context');
    if(context){
        var control = context.querySelector('a.context-control');

        control.addEventListener('click', function(){
            var text = control.textContent.toLowerCase();

            if (text == 'close'){
                context.className += ' less';
                control.innerHTML = 'wut the wut?';
            } else {
                context.className = context.className.replace('less', '');
                control.innerHTML = 'close';
            }
        }, false);
    }
}, false);

var speed=150; // speed of wobbling, lower is faster
var height=3; // height of wobbling in pixels
var alink=""; // page to link text to (set to ="" for no link)

/****************************
*    Wobbly Text Effect     *
*(c) 2003-6 mf2fm web-design*
*  http://www.mf2fm.com/rv  *
* DON'T EDIT BELOW THIS BOX *
****************************/
var wobtxt, wobble, wobcnt=0;
window.onload=function() { if (document.getElementById) {
  var i, wobli;
  wobble=document.getElementById("wobble");
  wobtxt=wobble.firstChild.nodeValue;
  while (wobble.childNodes.length) wobble.removeChild(wobble.childNodes[0]);
  for (i=0; i<wobtxt.length; i++) {
    wobli=document.createElement("span");
    wobli.setAttribute("id", "wobb"+i);
    wobli.style.position="relative";
    wobli.appendChild(document.createTextNode(wobtxt.charAt(i)));
    if (alink) {
      wobli.style.cursor="pointer";
      wobli.onclick=function() { top.location.href=alink; }
    }
    wobble.appendChild(wobli);
  }
  setInterval("wobbler()", speed);
}}

function wobbler() {
  for (var i=0; i<wobtxt.length; i++) document.getElementById("wobb"+i).style.top=Math.round(height*Math.sin(i+wobcnt))+"px"
  wobcnt++;
}

function initMenu ()
{
		$("#menu").hide();
		$("#menu ul").hide();
		$("#menu_button").show();
		$("#menu_button span").css({ opacity: 0 }).fadeTo("slow", 0.4);
		//$("#menu_button span").hide().fadeIn("slow");

		$('#menu_button').hover(
function()
			{
				var bg_span = $(this).children("span");
				if (bg_span.hasClass("show"))
					bg_span.animate({ top: "10px", opacity: 1}, 200);
				else
					bg_span.animate({ top: "0px", opacity: 1}, 200);
			},
			function()
			{
				var bg_span = $(this).children("span");
				if (bg_span.hasClass("show"))
					bg_span.animate({ top: "0px", opacity: 1}, 200);
				else
					bg_span.animate({ top: "10px", opacity: 1}, 200);
			});

		$('#menu_button').toggle(
			function()
			{
				$("#menu_button span").fadeOut("fast", function() {
						$(this).removeClass("show").addClass("hide")
								.css({ top: "0px", opacity: 1})
								.fadeIn("fast");
					});
				$('#menu').fadeIn("fast", function(){ $("#menu ul").fadeIn("fast"); });
			},
			function()
			{
				$("#menu_button span").fadeOut("fast", function() {
						$(this).removeClass("hide").addClass("show")
								.css({ top: "10px", opacity: 1})
								.fadeIn("fast");
					});
				$("#menu").fadeOut("fast", function(){ $("#menu ul").hide(); });
			});
}

function animateBGColor(lastIndex, rand)
{
	var color_array = [
					   "#e6f9f6",
					   "#e6f9e8",
					   "#f8fee7",
					   "#fdeddf",
					   "#fee7e7",
					   "#ffe6fb",
					   "#e7eefe",


						];

	var length = color_array.length;
	var next_color = "black", nextIndex=0;
	if (rand)
	{
		next_color = color_array[Math.floor(Math.random()*length)];
	} else {
		if (lastIndex >= length-1)
		{
			nextIndex = 0;
		}
		else
		{
			nextIndex = lastIndex+1;
		}
		next_color = color_array[nextIndex];
	}
	var fadeTime = 5000, pauseTime = 8000;
	$("img.bg").animate({ backgroundColor: next_color }, fadeTime,
			function(){
				setTimeout( function() { animateBGColor(nextIndex, rand); }, pauseTime );
			});
}

function animateMenuItems()
{
		$("#menu ul li").hover(
			function(){
				$(this).animate({ marginLeft: "0px"}, 100 );
			},
			function(){
				$(this).animate({ marginLeft: "35px"}, 100 );
			});
}
