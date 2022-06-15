<?php

include '../../php/conexion-bd.php';

include '../../php/function.php';

$tipo = $_POST['tipo'];

if ($tipo == 'dato') {
    $id = $_POST['id'];
    $consultaDatoEdit=mysqli_query($conexion,"SELECT * FROM tabla WHERE tabla_id = '$id'");

    while ($produtoE = mysqli_fetch_array($consultaDatoEdit)) {

    ?>
        
        <i>Aquí se pone el formulario para editar los datos</i>
        
    <?php

    }
}

?>