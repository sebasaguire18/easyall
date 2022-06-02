<?php

include 'conexion-bd.php';

if(isset($_POST['btn_iniciar'])){


    $username = $_POST['username'];
    $pass = $_POST['pass'];

    if (isset($_POST['url'])) {
        $url = $_POST['url'];
    }

    $consultaU = " SELECT * FROM tablaUsuario WHERE username = '$username' AND status = 1 ";

    $resultado=mysqli_query($conexion,$consultaU);
    $filas=mysqli_num_rows($resultado);
    
    if($filas==1){
        $pass = md5($pass);
        $consulta = " SELECT * FROM tablaUsuario WHERE username = '$username' AND pass = '$pass' AND status = 1 ";
        
        $resultado=mysqli_query($conexion,$consulta);
        $fila=mysqli_num_rows($resultado);
        
        if($fila==1){
        
            session_start();

            $nombre="SELECT * FROM tablaUsuario WHERE username = '$username'";
            
            $ejecutar_nombre=mysqli_query($conexion, $nombre);
            $mostrar_nombre=mysqli_fetch_array($ejecutar_nombre);
            $_SESSION['email']=$mostrar_nombre['username'];
            mysqli_free_result($resultado); 
            mysqli_close($conexion);
            
            if ($url<>"") {
                header('location:'.$url.'');
            }else {   
                header('location: ../welcome.php');
            }
        }else{

            mysqli_free_result($resultado); 
            mysqli_close($conexion);     
            
            return 'errorPassword';
            
        }   
        
    }else{
        
        mysqli_free_result($resultado); 
        mysqli_close($conexion);     
        
        return 'errorUsername';
    }   
} 

?>