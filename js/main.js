$(document).ready(function() {
	contentNav('welcome');
	contenido('Welcome');

	setInterval(() => {

	}, 1000);

});	
(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

})(jQuery);
