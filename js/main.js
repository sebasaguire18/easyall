$(document).ready(function() {
	contentNav('welcome');
	contenido('Welcome');

	setInterval(() => {

	}, 1000);

	// validacion de campos de email -- aqui el inicio de sesión y luego el de registrar
	let exprEmail = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-z0-9\-\.]+$/;


	$('#btnIniciarSesion').click(function() {

		
		$('#usernameLoging','#passLoging').removeClass('bd-danger');
		$('#spanUsernameLoging','#spanPassLoging').addClass('dp-none');

		// para el inicio de sesion desde el archivo index
		let usernameLoging = $('#usernameLoging').val();
		let passLoging = $('#passLoging').val();

		if(usernameLoging == '' || !exprEmail.test(usernameLoging)){
			$('#usernameLoging').addClass('bd-danger');
			$('#spanUsernameLoging').removeClass('dp-none');
			return false;
		}else{
			$('#usernameLoging').removeClass('bd-danger');
			$('#spanUsernameLoging').addClass('dp-none');

			if(passLoging == ''){
				$('#passLoging').addClass('bd-danger');
				$('#spanPassLoging').removeClass('dp-none');
				return false;
			}else{
				$('#passLoging').removeClass('bd-danger');
				$('#spanPassLoging').addClass('dp-none');
			}

			iniciarSesion(usernameLoging,passLoging);
		}
	});

	$('#btnRegistrarCuenta').click(function() {

		// para el inicio de sesion desde el archivo index
		let name = $('#name').val();
		let usernameRegis = $('#usernameRegis').val();
		let passRegis = $('#passRegis').val();
		let pass2 = $('#pass2').val();

		if(name == ''){
			$('#name').addClass('dp-none');
			return false;
		}else{
			$('#name').removeClass('dp-none');

			if(usernameRegis == '' || !exprEmail.test(usernameRegis)){
				$('#usernameRegis').addClass('dp-none');
				return false;
			}else{
				$('#usernameRegis').removeClass('dp-none');

				if(passRegis == ''){
					$('#passRegis').addClass('dp-none');
					return false;
				}else{
					$('#passRegis').removeClass('dp-none');
					if(pass2 == ''){
						$('#pass2').addClass('dp-none');
						return false;
					}else{
						$('#pass2').removeClass('dp-none');

						if(passRegis != pass2){
							$('#textPassNoIgual').removeClass('d-none');
							return false;
						}else{
							$('#textPassNoIgual').addClass('d-none');
						}
					}
				}
			}
		}
		
	});
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
