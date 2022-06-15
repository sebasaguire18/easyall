<?php
    session_start();
    error_reporting(0);

    if($_SESSION['id_user']){
        $idUserSession=$_SESSION['id_user'];

  	    header("location: welcome.php");

    }else{

?>
<!doctype html>
<html lang="es">
    <head>
        <title>Inicio</title>

        <?php include 'includes/link.php'; ?>

    </head>
    <body>
        <div class="rwg hvh-100 w-100">
            <div class="g-reg-7 g-reg-xl-7 g-reg-lg-7 g-reg-md-5 hvh-100 bg-red dp-flex jfy-ctn-center alg-itm-center" id="span-logo">
                <h0><span>Bienvenido a</span> EasyAll</h0>
            </div>
            <div class="g-reg-14 g-reg-xl-7 g-reg-lg-7 g-reg-md-9 g-reg-sm-14 hvh-100 bg-white dp-flex jfy-ctn-center alg-itm-center">
                <div class="bg-trs-3 w-60 bdr-4" id="box-sesion">
                    <form id="formInicioSesion" action="" method="POST">
                        <div class="ruler-title">
                            <h3>Iniciar Sesión</h3>
                        </div>
                        <div class="ruler-input mgt-4">
                            <input type="email" id="usernameLoging" class="ruler-input_child-lg" placeholder="Email" autocomplete="off">
                            <span class="txt-danger dp-none" id="spanUsernameLoging"> Por favor ingresa un email valido</span>
                            <span class="txt-danger dp-none" id="spanUsernameLogingError">Email no encontrado</span>
                        </div>
                        <div class="ruler-input mgb-4">
                            <input type="password" id="passLoging" class="ruler-input_child-lg" placeholder="Contraseña" autocomplete="off">
                            <span class="txt-danger dp-none" id="spanPassLoging">Por favor ingresa la contraseña</span>
                            <span class="txt-danger dp-none" id="spanPassLogingError">Contraseña erronea</span>
                        </div>
                        <div class="ruler-link">
                            <a id="olvidoPassword" class="ruler-link_child">¿Olvidó la contraseña?</a>
                        </div>
                        <div class="ruler-button">
                            <a id="btnIniciarSesion" type="submit" class="ruler-button_child-lg ruler-button-block bg-primary txt-white">Validar</a>
                        </div>
                    </form>
                    
                    <div class="ruler-link dp-flex jfy-ctn-end">
                        <a onclick="changeForm('regis')" class="ruler-link_child">¿No tiene cuenta?</a>
                    </div>
                </div>
                <div class="dp-none bg-trs-3 w-60 bdr-4" id="box-regis">
                    <form id="formRegistroUsuario" action="" method="POST">
                        <div class="ruler-title">
                            <h3>Registrar Cuenta</h3>
                        </div>
                        <div class="ruler-input mgt-4">
                            <input type="text" id="nombre" class="ruler-input_child-lg" placeholder="Nombre" autocomplete="off">
                        </div>
                        <div class="ruler-input">
                            <input type="email" id="email" class="ruler-input_child-lg" placeholder="Email" autocomplete="off">
                        </div>
                        <div class="ruler-input">
                            <input type="password" id="password" class="ruler-input_child-lg" placeholder="Contraseña" autocomplete="off">
                        </div>
                        <div class="ruler-input mgb-4">
                            <input type="password" id="password2" class="ruler-input_child-lg" placeholder="Repetir contraseña" autocomplete="off">
                        </div>
                        <div class="ruler-button">
                            <a class="ruler-button_child-lg ruler-button-block bg-primary txt-white" type="submit">Registrar</a>
                        </div>
                    </form>
                    
                    <div class="ruler-link dp-flex jfy-ctn-end">
                        <a id="btnRegistrarCuenta" onclick="changeForm('ini')" class="ruler-link_child">¿Ya tiene una cuenta?</a>
                    </div>
                </div>
            </div>
        </div>
        
        <?php include 'includes/script.php'; ?>
    </body>
</html>

<?php
    }
?>