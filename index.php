<?php
    session_start();
    error_reporting(0);
    if($_SESSION['user_session']){
        $user_session=$_SESSION['user_session'];
  	header("location: welcome.php");

    }else{

?>
<!doctype html>
<html lang="es">
  <head>
  	<title>Login</title>

    <?php include 'includes/link.php'; ?>

  </head>
  <body>
		
        <div class="container vh-100">
            <div class="row justify-content-center align-items-center h-100">
                <div class="col-12 d-flex justify-content-center align-items-center h-100">
                    <p class="display-1">Bienvenido a <b>CHOTEI</b></p>
                <img src="images/loading.gif" width="50%">
                </div>
            </div>
        </div>
    
  </body>
</html>

<?php
    }
?>