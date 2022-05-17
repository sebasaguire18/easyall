


// función que cambia el contenido principal de todas las pantallas recibiendo un string para saber que contendido llamar
function contenido(ventana) {
    $('#contentPrincipal').html(``);
    if (ventana == 'welcome') {
        $.ajax({
            type: "POST",
            url: "pages/welcome.php",
            data: "ventana=" + ventana,
            success: function(r) {
                configPage('welcome');
                $('#contentPrincipal').html(r);
            }
        });        
    }
}

// función que da configuraciones extra al cargar el contenido de la vista
function configPage(page) {
    if (page == 'welcome') {
        // contentNav('Welcome');
        $('#titlePage').html(`Welcome`);
    }
}

// función que carga la barra de navegación central
function contentNav(nav) {
    $('#contentNav').html(``);
    $.ajax({
        type: "POST",
        url: "pages/nav.php",
        data: "nav=" + nav,
        success: function(r) {
            $('#contentNav').html(r);
        }
    });
}

// función que optiene el contenido de tablas dependiendo de su id
function tablas(tabla) {
    if (tabla == 'tblLista') {
        $.ajax({
            type: "POST",
            url: "pages/tablas.php",
            data: "tabla=" + tabla,
            success: function(r) {
                $('#tblContent').html(r);
                tblInit(tabla);
            }
        });
    }
}

// función que inserta un nuevo registro
function insertarNuevoRegistro(reload) {

    var tipo = "nuevoRegistro";
    
    if (reload == 1) {
        // Aquí recogemos los datos de los campos que tengamos en los formularios
        var Registro1 = $('#Registro1').val();
        var Registro2 = $('#Registro2').val();
    }

    $.ajax({
        type: "POST",
        url: "php/controler.php",
        data: "tipo=" + tipo + "&Registro1=" + Registro1 + "&Registro2=" + Registro2 + "&reload=" + reload,
        success: function(r) {
            if (reload == 1) {
                if (r == 'success') {
                    // con esta función creamos alertas, debe enviarse el tipo de alerta y la página a recargar 
                    // *(Al enviar success como primer parametro le indicamos a la función 
                    // que me cree la alerta y que después de su confirmación se recargue la página)*
                    sweetAlertType('success','welcome');
                    // con esta función creamos modales, debe enviarse el id del botón que cerraría el modal de manera manual
                    cerrarModal('closemodalNuevoRegistro');
                }else if(r == 'error'){
                    // con esta función creamos alertas, debe enviarse el tipo de alerta y la página a recargar 
                    // *(Al ser de este tipo no recarga la página nunca)*
                    sweetAlertType('error','welcome');
                }else if(r == 'info'){
                    // con esta función creamos alertas, debe enviarse el tipo de alerta y la página a recargar 
                    // *(Al ser de este tipo no recarga la página nunca)*
                    sweetAlertType('info','welcome');
                }
            }else{
                if(r == 'error'){
                    sweetAlertType('error','contactos');
                }else if(r == 'info'){
                    sweetAlertType('info','contactos');
                }else {
                    if (reload == 'op') {
                        var contactosExistentes = $('#choice4Oportunidades').val().toString();
                        r = contactosExistentes+','+r;
                        optionSelects('optionsContactos','optionsContactosOp',r ,'choice4Oportunidades',reload);
                        sweetAlertType('successNoReload','optionsContactosOp');
                        cerrarModal('closemodalNuevoContacto');
                    }else if (reload == 'org') {
                        var contactosExistentes = $('#choice1Organizaciones').val().toString();
                        r = contactosExistentes+','+r;
                        
                        optionSelects('optionsContactos','optionsContactosOrg',r,'choice1Organizaciones',reload);
                        sweetAlertType('successNoReload','optionsContactosOrg');
                        cerrarModal('closemodalNuevoContactoOrg');
                        
                    }
                }
            }
        }
    });
}

// función que inserta un nuevo Producto
function insertarNuevaLineaNegocio(reload) {

    var tipo = "nuevaLineaNegocio";
    if (reload == 1) {
        var nombreLineaNegocio = $('#nombreLineaNegocio').val();
        var descripLineaNegocio = $('#descripLineaNegocio').val();
    }else{
        var nombreLineaNegocio = $('#nombreLineaNegocio').val();
        var descripLineaNegocio = $('#descripLineaNegocio').val();
    }
    $.ajax({
        type: "POST",
        url: "php/controler.php",
        data: "tipo=" + tipo + "&nombreLineaNegocio=" + nombreLineaNegocio + "&descripLineaNegocio=" + descripLineaNegocio,
        success: function(r) {
            if (reload == 1) {
                if (r == 'success') {
                    sweetAlertType('success','productos');
                    cerrarModal('modalNuevaLineaNegocio');
                }else if(r == 'error'){
                    sweetAlertType('error','productos');
                }else if(r == 'info'){
                    sweetAlertType('info','productos');
                }
            }else{
                if (r == 'success') {
                    sweetAlertType('successNoReload','productos');
                    cerrarModal('modalNuevaLineaNegocio');
                }else if(r == 'error'){
                    sweetAlertType('error','productos');
                }else if(r == 'info'){
                    sweetAlertType('info','productos');
                }
            }
        }
    });
}

// función que inserta un nuevo Producto
function insertarNuevoProducto(reload) {

    var tipo = "nuevoProducto";

    if (reload == 1) {
        var selectLineaNegocioProd = $('#selectLineaNegocioProd').val();
        var nombreProducto = $('#nombreProducto').val();
    }else if(reload == 'op'){
        var selectLineaNegocioProd = $('#selectLineaNegocioProdOp').val();
        var nombreProducto = $('#nombreProductoOp').val();
        var iniModal='Op'
    }else if(reload == 'org'){
        var selectLineaNegocioProd = $('#selectLineaNegocioProdOrg').val();
        var nombreProducto = $('#nombreProductoOrg').val();
        var iniModal='Org'
    }

    $.ajax({
        type: "POST",
        url: "php/controler.php",
        data: "tipo=" + tipo + "&nombreProducto=" + nombreProducto + "&selectLineaNegocioProd=" + selectLineaNegocioProd + "&reload=" + reload,
        success: function(r) {
            if (reload == 1) {
                if (r == 'success') {
                    sweetAlertType('success','productos');
                    cerrarModal('modalNuevoProducto');
                }else if(r == 'error'){
                    sweetAlertType('error','productos');
                }else if(r == 'info'){
                    sweetAlertType('info','productos');
                }
            }else{
                if(r == 'error'){
                    sweetAlertType('error','productos');
                }else if(r == 'info'){
                    sweetAlertType('info','productos');
                }else {
                    if (reload == 'op') {
                        var productosExistentes = $('#choice5Oportunidades').val().toString();
                        r = productosExistentes+','+r;
                        console.log(r);
                        optionSelects('optionsProductos','choice5Oportunidades',r ,'choice5Oportunidades',reload);
                        sweetAlertType('successNoReload','optionsProductosOp');
                        cerrarModal('modalNuevoProducto');
                    }
                }
            }
        }
    });
}

// función que inserta una nueva oportunidad
function insertarNuevaOportunidad(reload=false) {
    var tipo = "nuevaOportunidad";
    if (reload == 1) {
        var nombreOportunidades = $('#nombreOport').val();
        var choice1Oportunidades = $('#choice1Oportunidades').val().toString();
        var fechaCierreOportunidades = $('#fechaCierreOportunidades').val();
        var choice2Oportunidades = $('#choice2Oportunidades').val().toString();
        var otroProblemaOportunidades = $('#otroProblemaOportunidades').val();
        var choice3Oportunidades = $('input:radio[name=tipoOportuidadNeg]:checked').val();
        var estadoOportunidad = $('input:radio[name=statusOportuidadNeg]:checked').val();
        var choice5Oportunidades = $('#choice5Oportunidades').val().toString();
        var precioOportunidades = $('#precioOportunidades').val();
        var costoProblemaOportunidades = $('#costoProblemaOportunidades').val();
        var descripSolucionOportunidades = $('#descripSolucionOportunidades').val();
        var choice4Oportunidades = $('#choice4Oportunidades').val().toString();
    }else if(reload == 'org'){
        var nombreOportunidades = $('#nombreOport').val();
        var choice1Oportunidades = $('#choice1OportunidadesOrg').val().toString();
        var fechaCierreOportunidades = $('#fechaCierreOportunidadesOrg').val();
        var choice2Oportunidades = $('#choice2OportunidadesOrg').val().toString();
        var otroProblemaOportunidades = $('#otroProblemaOportunidadesOrg').val();
        var choice3Oportunidades = $('input:radio[name=tipoOportuidadNeg]:checked').val();
        var estadoOportunidad = $('input:radio[name=statusOportuidadNeg]:checked').val();
        var choice5Oportunidades = $('#choice5OportunidadesOrg').val().toString();
        var precioOportunidades = $('#precioOportunidadesOrg').val();
        var costoProblemaOportunidades = $('#costoProblemaOportunidadesOrg').val();
        var descripSolucionOportunidades = $('#descripSolucionOportunidadesOrg').val();
        var choice4Oportunidades = $('#choice4OportunidadesOrg').val().toString();
    }

    $.ajax({
        type: "POST",
        url: "php/controler.php",
        data: "tipo=" + tipo + "&nombreOportunidades=" + nombreOportunidades + "&choice1Oportunidades=" + choice1Oportunidades + "&fechaCierreOportunidades=" + fechaCierreOportunidades + "&choice2Oportunidades=" + choice2Oportunidades + "&otroProblemaOportunidades=" + otroProblemaOportunidades + "&choice3Oportunidades=" + choice3Oportunidades + "&choice5Oportunidades=" + choice5Oportunidades + "&precioOportunidades=" + precioOportunidades + "&costoProblemaOportunidades=" + costoProblemaOportunidades + "&descripSolucionOportunidades=" + descripSolucionOportunidades + "&choice4Oportunidades=" + choice4Oportunidades + "&choice4Oportunidades=" + choice4Oportunidades + '&estadoOportunidad=' + estadoOportunidad,
        success: function(r) {
            console.log(r);
            if (reload) {
                if (r == 'success') {
                    sweetAlertType('success','oportunidades');
                    cerrarModal('closemodalNuevaOportunidad');
                }else if(r == 'error'){
                    sweetAlertType('error','oportunidades');
                }else if(r == 'info'){
                    sweetAlertType('info','oportunidades');
                }
            }else{
                if (r == 'success') {
                    sweetAlertType('successNoReload','oportunidades');
                    cerrarModal('closemodalNuevaOportunidad');
                }else if(r == 'error'){
                    sweetAlertType('error','oportunidades');
                }else if(r == 'info'){
                    sweetAlertType('info','oportunidades');
                }
            }
        }
    });
}

// función que inserta una nueva organización
function insertarNuevaOrganizacion(reload=false) {
    var tipo = "nuevaOrganizacion";
    if (reload) {
        var razonSocialOrganizaciones = $('#razonSocialOrganizaciones').val();
        var idEmpresaOrganizaciones = $('#idEmpresaOrganizaciones').val();
        var DescripEmpresaOrganizaciones = $('#DescripEmpresaOrganizaciones').val();
        var objetivosNegocioOrganizaciones = $('#objetivosNegocioOrganizaciones').val();
        var ingresoAnualOrganizaciones = $('#ingresoAnualOrganizaciones').val();
        var choice1Organizaciones = $('#choice1Organizaciones').val().toString();
    }else{
        var razonSocialOrganizaciones = $('#razonSocialOrganizaciones').val();
        var idEmpresaOrganizaciones = $('#idEmpresaOrganizaciones').val();
        var DescripEmpresaOrganizaciones = $('#DescripEmpresaOrganizaciones').val();
        var objetivosNegocioOrganizaciones = $('#objetivosNegocioOrganizaciones').val();
        var ingresoAnualOrganizaciones = $('#ingresoAnualOrganizaciones').val();
        var choice1Organizaciones = $('#choice1Organizaciones').val().toString();
    }

    $.ajax({
        type: "POST",
        url: "php/controler.php",
        data: "tipo=" + tipo + "&razonSocialOrganizaciones=" + razonSocialOrganizaciones + "&idEmpresaOrganizaciones=" + idEmpresaOrganizaciones + "&DescripEmpresaOrganizaciones=" + DescripEmpresaOrganizaciones + "&objetivosNegocioOrganizaciones=" + objetivosNegocioOrganizaciones + "&ingresoAnualOrganizaciones=" + ingresoAnualOrganizaciones + "&choice1Organizaciones=" + choice1Organizaciones,
        success: function(r) {
            console.log(r);
            if (reload) {
                if (r == 'success') {
                    sweetAlertType('success','organizaciones');
                    cerrarModal('closemodalNuevaOrganizacion');
                }else if(r == 'error'){
                    sweetAlertType('error','organizaciones');
                }else if(r == 'info'){
                    sweetAlertType('info','organizaciones');
                }
            }else{
                if (r == 'success') {
                    sweetAlertType('successNoReload','organizaciones');
                    cerrarModal('closemodalNuevaOrganizacion');
                }else if(r == 'error'){
                    sweetAlertType('error','organizaciones');
                }else if(r == 'info'){
                    sweetAlertType('info','organizaciones');
                }
            }
        }
    });
}

// función que inserta una nueva Potencial Cuenta (solución)
function insertarPotencialCuenta() {
    var tipo = "nuevaPotenciaCuenta";
    
    var organizacion = $('#choice1PotencialDeCuenta').val();
    var tipoSolucion = $('#choice1TipoSolPC').val();

    if (tipoSolucion == 'desarrollo') {
        var oportunidadCreada = $('#choice1PotencialDeCuentaPC').val();
        
        $.ajax({
            type: "POST",
            url: "php/controler.php",
            data: "tipo=" + tipo + "&organizacion=" + organizacion + "&tipoSolucion=" + tipoSolucion + "&oportunidadCreada=" + oportunidadCreada,
            success: function(r) {
                if (r == 'success') {
                    sweetAlertType('success','organizaciones');
                    cerrarModal('closemodalNuevaPotencialDeCuenta');
                }else if(r == 'error'){
                    sweetAlertType('error','organizaciones');
                }else if(r == 'info'){
                    sweetAlertType('info','organizaciones');
                }
            }
        });
    }else if (tipoSolucion == 'nuestro'){
        var nombreSolPC = $('#nombreSolPC').val();
        var DescripSolPC = $('#DescripSolPC').val();
        var choice1SolPC = $('#choice1SolPC').val();
        var valorTotalSolPC = $('#valorTotalSolPC').val();
        var valorAnualSolPC = $('#valorAnualSolPC').val();
        
        $.ajax({
            type: "POST",
            url: "php/controler.php",
            data: "tipo=" + tipo + "&organizacion=" + organizacion + "&tipoSolucion=" + tipoSolucion + "&nombreSolPC=" + nombreSolPC + "&DescripSolPC=" + DescripSolPC + "&choice1SolPC=" + choice1SolPC + "&valorTotalSolPC=" + valorTotalSolPC + "&valorAnualSolPC=" + valorAnualSolPC,
            success: function(r) {
                if (r == 'success') {
                    sweetAlertType('success','organizaciones');
                    cerrarModal('closemodalNuevaPotencialDeCuenta');
                }else if(r == 'error'){
                    sweetAlertType('error','organizaciones');
                }else if(r == 'info'){
                    sweetAlertType('info','organizaciones');
                }
                
            }
        });
    }else {
        var nombrePCCompetencia = $('#nombrePCCompetencia').val();
        var precioPCCompetencia = $('#precioPCCompetencia').val();
        
        $.ajax({
            type: "POST",
            url: "php/controler.php",
            data: "tipo=" + tipo + "&organizacion=" + organizacion + "&tipoSolucion=" + tipoSolucion + "&nombrePCCompetencia=" + nombrePCCompetencia + "&precioPCCompetencia=" + precioPCCompetencia,
            success: function(r) {
                console.log(r);
                if (r == 'success') {
                    sweetAlertType('success','organizaciones');
                    cerrarModal('closemodalNuevaPotencialDeCuenta');
                }else if(r == 'error'){
                    sweetAlertType('error','organizaciones');
                }else if(r == 'info'){
                    sweetAlertType('info','organizaciones');
                }
                
            }
        });
    }

}

// función para editar por id y tipo de edición
function editar(id,tipo) {
    if (tipo == 'contacto') {
        $.ajax({
            type: "POST",
            url: "pages/editar.php",
            data: "tipo=" + tipo + "&id=" + id,
            success: function(r) {

                $('#editContacto').html(r);
                let choices = document.querySelectorAll('.choicesEditContacto');
                
                let initChoice;
                for(let i=0; i<choices.length;i++) {
                    if (choices[i].classList.contains("multiple-remove")) {
                        initChoice = new Choices(choices[i],
                        {
                            delimiter: ',',
                            editItems: true,
                            maxItemCount: -1,
                            removeItemButton: true,
                        });
                    }else{
                        initChoice = new Choices(choices[i]);
                    }
                }
            }
        });
    }
    if (tipo == 'lineaNegocio') {
        $.ajax({
            type: "POST",
            url: "pages/editar.php",
            data: "tipo=" + tipo + "&id=" + id,
            success: function(r) {

                $('#editLinNeg').html(r);
                
                let choices = document.querySelectorAll('.choicesEditContacto');
                
                let initChoice;
                for(let i=0; i<choices.length;i++) {
                    if (choices[i].classList.contains("multiple-remove")) {
                        initChoice = new Choices(choices[i],
                        {
                            delimiter: ',',
                            editItems: true,
                            maxItemCount: -1,
                            removeItemButton: true,
                        });
                    }else{
                        initChoice = new Choices(choices[i]);
                    }
                }
            }
        });
    }
    if (tipo == 'producto') {
        $.ajax({
            type: "POST",
            url: "pages/editar.php",
            data: "tipo=" + tipo + "&id=" + id,
            success: function(r) {

                $('#editProducto').html(r);
                
            }
        });
    }
    if (tipo == 'oportunidades') {
        $.ajax({
            type: "POST",
            url: "pages/editar.php",
            data: "tipo=" + tipo + "&id=" + id,
            success: function(r) {

                
                $('#editOportunidades').html(r);
                
                optionSelects('optionsContactos','choice4OportunidadesE');
                
                let choices = document.querySelectorAll('#choice2OportunidadesE');
                let initChoice;
                for(let i=0; i<choices.length;i++) {
                    if (choices[i].classList.contains("multiple-remove")) {
                        initChoice = new Choices(choices[i],
                        {
                            delimiter: ',',
                            editItems: true,
                            maxItemCount: -1,
                            removeItemButton: true,
                        });
                    }else{
                        initChoice = new Choices(choices[i]);
                    }
                }
                
                let choices3 = document.querySelectorAll('#choice5OportunidadesE');
                let initChoice3;
                for(let i=0; i<choices3.length;i++) {
                    if (choices3[i].classList.contains("multiple-remove")) {
                        initChoice3 = new Choices(choices3[i],
                        {
                            delimiter: ',',
                            editItems: true,
                            maxItemCount: -1,
                            removeItemButton: true,
                        });
                    }else{
                        initChoice3 = new Choices(choices3[i]);
                    }
                }
                let choices2 = document.querySelectorAll('#choice4OportunidadesE');
                let initChoice2;
                for(let i=0; i<choices2.length;i++) {
                    if (choices2[i].classList.contains("multiple-remove")) {
                        initChoice2 = new Choices(choices2[i],
                        {
                            delimiter: ',',
                            editItems: true,
                            maxItemCount: -1,
                            removeItemButton: true,
                        });
                    }else{
                        initChoice2 = new Choices(choices2[i]);
                    }
                }
            }
        });
    }
    if (tipo == 'organizaciones') {
        $.ajax({
            type: "POST",
            url: "pages/editar.php",
            data: "tipo=" + tipo + "&id=" + id,
            success: function(r) {

                $('#editOrganizacion').html(r);
                
                let choices = document.querySelectorAll('#choice1OrganizacionesE');
                let initChoice;
                for(let i=0; i<choices.length;i++) {
                    if (choices[i].classList.contains("multiple-remove")) {
                        initChoice = new Choices(choices[i],
                        {
                            delimiter: ',',
                            editItems: true,
                            maxItemCount: -1,
                            removeItemButton: true,
                        });
                    }else{
                        initChoice = new Choices(choices[i]);
                    }
                }
            }
        });
    }
}

// función para eliminar por id y tipo
function eliminar(id,tipo) {
    if (tipo == 'contacto') { 
        sweetAlertType('eliminar','contactos',id);
    }
    if (tipo == 'lineaNegocio') {
        sweetAlertType('eliminar','lineaNegocio',id);
    }
    if (tipo == 'producto') {
        sweetAlertType('eliminar','productos',id);
    }
    if (tipo == 'oportunidades') {
        sweetAlertType('eliminar','oportunidades',id);
    }
    if (tipo == 'organizaciones') {
        sweetAlertType('eliminar','organizaciones',id);
    }
}

// función para eliminar por id y tipo
function ConfirmEliminar(id,tipo) {
    if (tipo == 'contactos') { 
        type = 'eliminarContacto';
        $.ajax({
            type: "POST",
            url: "php/controler.php",
            data: "tipo=" + type + "&idEliminar=" + id,
            success: function(r) {
                if (r == 'success') {
                    sweetAlertType('success','contactos');
                }else if(r == 'error'){
                    sweetAlertType('error','contactos');
                }else if(r == 'info'){
                    sweetAlertType('info','contactos');
                }
            }
        });
    }
    if (tipo == 'lineaNegocio') {
        
        type = 'eliminarLineaNegocio';
        $.ajax({
            type: "POST",
            url: "php/controler.php",
            data: "tipo=" + type + "&idEliminar=" + id,
            success: function(r) {
                if (r == 'success') {
                    sweetAlertType('success','productos');
                }else if(r == 'error'){
                    sweetAlertType('error','productos');
                }else if(r == 'info'){
                    sweetAlertType('info','productos');
                }
            }
        });
    }
    if (tipo == 'productos') {
        
        type = 'eliminarProducto';
        $.ajax({
            type: "POST",
            url: "php/controler.php",
            data: "tipo=" + type + "&idEliminar=" + id,
            success: function(r) {
                if (r == 'success') {
                    sweetAlertType('success','productos');
                }else if(r == 'error'){
                    sweetAlertType('error','productos');
                }else if(r == 'info'){
                    sweetAlertType('info','productos');
                }
            }
        });
    }
    if (tipo == 'oportunidades') {
        
        type = 'eliminarOportunidad';
        $.ajax({
            type: "POST",
            url: "php/controler.php",
            data: "tipo=" + type + "&idEliminar=" + id,
            success: function(r) {
                if (r == 'success') {
                    sweetAlertType('success','oportunidades');
                }else if(r == 'error'){
                    sweetAlertType('error','oportunidades');
                }else if(r == 'info'){
                    sweetAlertType('info','oportunidades');
                }
            }
        });
    }
    if (tipo == 'organizaciones') {
        
        type = 'eliminarOrganizacion';
        $.ajax({
            type: "POST",
            url: "php/controler.php",
            data: "tipo=" + type + "&idEliminar=" + id,
            success: function(r) {
                if (r == 'success') {
                    sweetAlertType('success','organizaciones');
                }else if(r == 'error'){
                    sweetAlertType('error','organizaciones');
                }else if(r == 'info'){
                    sweetAlertType('info','organizaciones');
                }
            }
        });
    }
}

// función para editar contactos
function editarContacto(id) {
    
    var tipo = "editarContacto";
    var nombreContacto = $('#nombreContactoE').val();
    var emailContacto = $('#emailContactoE').val();
    var whatsappContacto = $('#whatsappContactoE').val();
    var enlaceLinkContacto = $('#enlaceLinkContactoE').val();
    var choice1 = $('#choice1E').val().toString();
    var choice2 = $('#choice2E').val();
    var choice3 = $('#choice3E').val();
    var choice4 = $('#choice4E').val();
    var choice5 = $('#choice5E').val();

    $.ajax({
        type: "POST",
        url: "php/controler.php",
        data: "tipo=" + tipo + "&idContacto=" + id + "&nombreContacto=" + nombreContacto + "&emailContacto=" + emailContacto + "&whatsappContacto=" + whatsappContacto + "&enlaceLinkContacto=" + enlaceLinkContacto + "&choice1=" + choice1 + "&choice2=" + choice2 + "&choice3=" + choice3 + "&choice4=" + choice4 + "&choice5=" + choice5,
        success: function(r) {
            if (r == 'success') {
                sweetAlertType('success','contactos');
                cerrarModal('closemodalEditContacto');
            }else if(r == 'error'){
                sweetAlertType('error','contactos');
            }else if(r == 'info'){
                sweetAlertType('info','contactos');
            }
        }
    });
}

// función para editar Lineas de Negocio
function editarLineaNegocio(id) {
    
    var tipo = "editarLineaNegocio";
    var nombreLineaNegocioE = $('#nombreLineaNegocioE').val();
    var descripLineaNegocioE = $('#descripLineaNegocioE').val();
    var choice1LNE = $('#choice1LNE').val().toString();

    $.ajax({
        type: "POST",
        url: "php/controler.php",
        data: "tipo=" + tipo + "&idLineaNegocio=" + id + "&nombreLineaNegocioE=" + nombreLineaNegocioE + "&descripLineaNegocioE=" + descripLineaNegocioE + "&choice1LNE=" + choice1LNE,
        success: function(r) {
            if (r == 'success') {
                sweetAlertType('success','productos');
                cerrarModal('closemodalEditLinNeg');
            }else if(r == 'error'){
                sweetAlertType('error','productos');
            }else if(r == 'info'){
                sweetAlertType('info','productos');
            }
        }
    });
}

// función para editar Productos
function editarProducto(id) {
    
    var tipo = "editarProducto";
    var selectLineaNegocioProdE = $('#selectLineaNegocioProdE').val();
    var nombreProductoE = $('#nombreProductoE').val();

    $.ajax({
        type: "POST",
        url: "php/controler.php",
        data: "tipo=" + tipo + "&idProducto=" + id + "&nombreProductoE=" + nombreProductoE + "&selectLineaNegocioProdE=" + selectLineaNegocioProdE,
        success: function(r) {
            if (r == 'success') {
                sweetAlertType('success','productos');
                cerrarModal('closemodalEditProducto');
            }else if(r == 'error'){
                sweetAlertType('error','productos');
            }else if(r == 'info'){
                sweetAlertType('info','productos');
            }
        }
    });
}

// función para editar oportunidades
function editarOportunidad(id) {
    
    var tipo = "editarOportunidad";
    var nombreOportunidadesE = $('#nombreOportunidadesE').val();
    var choice1OportunidadesE = $('#choice1OportunidadesE').val().toString();
    var choice2OportunidadesE = $('#choice2OportunidadesE').val().toString();
    var otroProblemaOportunidadesE = $('#otroProblemaOportunidadesE').val();
    var choice5OportunidadesE = $('#choice5OportunidadesE').val().toString();
    var precioOportunidadesE = $('#precioOportunidadesE').val();
    var costoProblemaOportunidadesE = $('#costoProblemaOportunidadesE').val();
    var descripSolucionOportunidadesE = $('#descripSolucionOportunidadesE').val();
    var choice3OportunidadesE = $('input:radio[name=tipoOportuidadNegE]:checked').val();
    var statusOportE = $('input:radio[name=statusOportuidadNegE]:checked').val();
    var choice4OportunidadesE = $('#choice4OportunidadesE').val().toString();

    $.ajax({
        type: "POST",
        url: "php/controler.php",
        data: "tipo=" + tipo + "&idOportunidadesE=" + id + "&nombreOportunidadesE=" + nombreOportunidadesE + "&choice1OportunidadesE=" + choice1OportunidadesE + "&choice2OportunidadesE=" + choice2OportunidadesE + "&otroProblemaOportunidadesE=" + otroProblemaOportunidadesE + "&choice5OportunidadesE=" + choice5OportunidadesE + "&precioOportunidadesE=" + precioOportunidadesE + "&costoProblemaOportunidadesE=" + costoProblemaOportunidadesE + "&descripSolucionOportunidadesE=" + descripSolucionOportunidadesE + "&choice3OportunidadesE=" + choice3OportunidadesE + "&choice4OportunidadesE=" + choice4OportunidadesE + "&statusOportE=" + statusOportE,
        success: function(r) {
            if (r == 'success') {
                sweetAlertType('success','oportunidades');
                cerrarModal('closemodalEditOportunidades');
            }else if(r == 'error'){
                sweetAlertType('error','oportunidades');
            }else if(r == 'info'){
                sweetAlertType('info','oportunidades');
            }
        }
    });
}

// función para editar organizaciones
function editarOrganizacion(id) {
    
    var tipo = "editarOrganizacion";
    var razonSocialOrganizacionesE = $('#razonSocialOrganizacionesE').val();
    var idEmpresaOrganizacionesE = $('#idEmpresaOrganizacionesE').val();
    var DescripEmpresaOrganizacionesE = $('#DescripEmpresaOrganizacionesE').val();
    var ingresoAnualOrganizacionesE = $('#ingresoAnualOrganizacionesE').val();
    var choice1OrganizacionesE = $('#choice1OrganizacionesE').val();

    $.ajax({
        type: "POST",
        url: "php/controler.php",
        data: "tipo=" + tipo + "&idOrganizacion=" + id + "&razonSocialOrganizacionesE=" + razonSocialOrganizacionesE + "&idEmpresaOrganizacionesE=" + idEmpresaOrganizacionesE + "&DescripEmpresaOrganizacionesE=" + DescripEmpresaOrganizacionesE + "&ingresoAnualOrganizacionesE=" + ingresoAnualOrganizacionesE + "&choice1OrganizacionesE=" + choice1OrganizacionesE,
        success: function(r) {
            if (r == 'success') {
                sweetAlertType('success','organizaciones');
                cerrarModal('closemodalEditOrganizacion');
            }else if(r == 'error'){
                sweetAlertType('error','organizaciones');
            }else if(r == 'info'){
                sweetAlertType('info','organizaciones');
            }
        }
    });
}

// función para ejecutar modale de detalles por id y tipo
function modalDetalles(id,tipo) {
    $('#titleModalDetalle').html(``);
    $('#contentBodyDetalleProd').html(``);
    if (tipo == 'contactoPrincipal') {
        $.ajax({
            type: "POST",
            url: "pages/modal.php",
            data: "tipo=" + tipo + "&id=" + id,
            success: function(r) {

                $('#titleModalDetalleContacto').html('Detalle de Contacto');
                $('#contentBodyDetalleContacto').html(r);
                
            }
        });
    }
    if (tipo == 'contacto') {
        $.ajax({
            type: "POST",
            url: "pages/modal.php",
            data: "tipo=" + tipo + "&id=" + id,
            success: function(r) {

                $('#titleModalDetalle').html('Detalle de Contacto');
                $('#contentBodyDetalle').html(r);
                
            }
        });
    }
    if (tipo == 'contactoOp') {
        $.ajax({
            type: "POST",
            url: "pages/modal.php",
            data: "tipo=" + tipo + "&id=" + id,
            success: function(r) {

                $('#titleModalDetalleOportunidades').html('Detalle de Contacto');
                $('#contentBodyDetalleOportunidades').html(r);
                
            }
        });
    }
    if (tipo == 'lineaNegocio') {
        $.ajax({
            type: "POST",
            url: "pages/modal.php",
            data: "tipo=" + tipo + "&id=" + id,
            success: function(r) {

                $('#titleModalDetalleProd').html('Detalle de Linea de Negocio');
                $('#contentBodyDetalleProd').html(r);
                
            }
        });
    }
    if (tipo == 'producto') {
        $.ajax({
            type: "POST",
            url: "pages/modal.php",
            data: "tipo=" + tipo + "&id=" + id,
            success: function(r) {

                $('#titleModalDetalleProd').html('Detalle de Producto');
                $('#contentBodyDetalleProd').html(r);
                
            }
        });
    }
    if (tipo == 'oportunidades') {
        $.ajax({
            type: "POST",
            url: "pages/modal.php",
            data: "tipo=" + tipo + "&id=" + id,
            success: function(r) {

                $('#titleModalDetalleOportunidades').html('Detalle de Oportunidad');
                $('#contentBodyDetalleOportunidades').html(r);
                
            }
        });
    }
    if (tipo == 'organizaciones') {
        $.ajax({
            type: "POST",
            url: "pages/modal.php",
            data: "tipo=" + tipo + "&id=" + id,
            success: function(r) {

                $('#titleModalDetalle').html('Detalle de la Organización');
                $('#contentBodyDetalle').html(r);
                
            }
        });
    }
}

// función que limpia formularios por id
function limpiarFormulario(nombre) {
    document.getElementById(nombre).reset();
}

// datatables
function tblInit(tabla) {
    $(function(){
        if (tabla == 'tblLisContactos') {
            // datatable de tabla contactos
            var table =  $('#tblListaContactos').DataTable({
                "language": {
                    "url": "extensions/datatables/Spanish.json"
                },
                responsive: "true",
                scrollCollapse: true,
                scrollX: true,
                scrollY: "400px",
                dom: 'lfrBtip',
                buttons: [
                    {
                        extend:     'excelHtml5',
                        text:       '<i class="fas fa-file-excel"></i>',
                        titleattr:  'Exportar a Excel',
                        className:  'btn btn-success mr-4 ml-3',
                        exportOptions: {
                            columns: ':visible'
                        }
                    },
                    // {
                    //     extend:     'pdfHtml5',
                    //     text:       '<i class="bi bi-file-post"></i>',
                    //     titleattr:  'Exportar a Excel',
                    //     className:  'btn btn-danger'
                    // },
                    // {
                    //     extend:     'print',
                    //     text:       '<i class="bi bi-printer"></i>',
                    //     titleattr:  'Exportar a Excel',
                    //     className:  'btn btn-info'
                    // },
                ]
            });
            $('.toggle-vis').on( 'click', function () {
                
                // Get the column API object
                var column = table.column( $(this).attr('data-column') );
         
                // Toggle the visibility
                column.visible( ! column.visible() );
            } );
        }
        if (tabla == 'tblLisLineaNegocio') {
            // datatable de tabla productos
            var table =  $('#tblListaLineaNegocio').DataTable({
                "language": {
                    "url": "extensions/datatables/Spanish.json"
                },
                responsive: "true",
                dom: 'Blfrtip',
                scrollCollapse: true,
                scrollY: "400px",
                buttons: [
                    {
                        extend:     'excelHtml5',
                        text:       '<i class="fas fa-file-excel"></i>',
                        titleattr:  'Exportar a Excel',
                        className:  'btn btn-success mr-4 ml-3',
                        exportOptions: {
                            columns: ':visible'
                        }
                    },
                    // {
                    //     extend:     'pdfHtml5',
                    //     text:       '<i class="bi bi-file-post"></i>',
                    //     titleattr:  'Exportar a Excel',
                    //     className:  'btn btn-danger'
                    // },
                    // {
                    //     extend:     'print',
                    //     text:       '<i class="bi bi-printer"></i>',
                    //     titleattr:  'Exportar a Excel',
                    //     className:  'btn btn-info'
                    // },
                ]
            });
            $('.toggle-vis').on( 'click', function () {
        
                // Get the column API object
                var column = table.column( $(this).attr('data-column') );
        
                // Toggle the visibility
                column.visible( ! column.visible() );
            } );
        }
        if (tabla == 'tblLisProductos') {
            // datatable de tabla productos
            var table =  $('#tblListaProductos').DataTable({
                "language": {
                    "url": "extensions/datatables/Spanish.json"
                },
                responsive: "true",
                dom: 'Blfrtip',
                scrollCollapse: true,
                scrollX: true,
                scrollY: "400px",
                buttons: [
                    {
                        extend:     'excelHtml5',
                        text:       '<i class="fas fa-file-excel"></i>',
                        titleattr:  'Exportar a Excel',
                        className:  'btn btn-success mr-4 ml-3',
                        exportOptions: {
                            columns: ':visible'
                        }
                    },
                    // {
                    //     extend:     'pdfHtml5',
                    //     text:       '<i class="bi bi-file-post"></i>',
                    //     titleattr:  'Exportar a Excel',
                    //     className:  'btn btn-danger'
                    // },
                    // {
                    //     extend:     'print',
                    //     text:       '<i class="bi bi-printer"></i>',
                    //     titleattr:  'Exportar a Excel',
                    //     className:  'btn btn-info'
                    // },
                ]
            });
            $('.toggle-vis').on( 'click', function () {
        
                // Get the column API object
                var column = table.column( $(this).attr('data-column') );
        
                // Toggle the visibility
                column.visible( ! column.visible() );
            } );
        }
        if (tabla == 'tblLisOportunidades') {
            // datatable de tabla Oportunidades
            var table =  $('#tblListaOportunidades').DataTable({
                "language": {
                    "url": "extensions/datatables/Spanish.json"
                },
                responsive: "true",
                dom: 'Blfrtip',
                scrollCollapse: true,
                scrollX: true,
                scrollY: "400px",
                buttons: [
                    {
                        extend:     'excelHtml5',
                        text:       '<i class="fas fa-file-excel"></i>',
                        titleattr:  'Exportar a Excel',
                        className:  'btn btn-success mr-4 ml-3',
                        exportOptions: {
                            columns: ':visible'
                        }
                    },
                    // {
                    //     extend:     'pdfHtml5',
                    //     text:       '<i class="bi bi-file-post"></i>',
                    //     titleattr:  'Exportar a Excel',
                    //     className:  'btn btn-danger'
                    // },
                    // {
                    //     extend:     'print',
                    //     text:       '<i class="bi bi-printer"></i>',
                    //     titleattr:  'Exportar a Excel',
                    //     className:  'btn btn-info'
                    // },
                ]
            });
            $('.toggle-vis').on( 'click', function () {
        
                // Get the column API object
                var column = table.column( $(this).attr('data-column') );
        
                // Toggle the visibility
                column.visible( ! column.visible() );
            } );
        }
        if (tabla == 'tblLisOrganizaciones') {
            // datatable de tabla Oportunidades
            var table =  $('#tblListaOrganizaciones').DataTable({
                "language": {
                    "url": "extensions/datatables/Spanish.json"
                },
                responsive: "true",
                dom: 'Blfrtip',
                scrollCollapse: true,
                scrollY: "400px",
                buttons: [
                    {
                        extend:     'excelHtml5',
                        text:       '<i class="fas fa-file-excel"></i>',
                        titleattr:  'Exportar a Excel',
                        className:  'btn btn-success mr-4 ml-3',
                        exportOptions: {
                            columns: ':visible'
                        }
                    },
                    // {
                    //     extend:     'pdfHtml5',
                    //     text:       '<i class="bi bi-file-post"></i>',
                    //     titleattr:  'Exportar a Excel',
                    //     className:  'btn btn-danger'
                    // },
                    // {
                    //     extend:     'print',
                    //     text:       '<i class="bi bi-printer"></i>',
                    //     titleattr:  'Exportar a Excel',
                    //     className:  'btn btn-info'
                    // },
                ]
            });
            $('.toggle-vis').on( 'click', function () {
        
                // Get the column API object
                var column = table.column( $(this).attr('data-column') );
        
                // Toggle the visibility
                column.visible( ! column.visible() );
            } );
        }
    });
}

// Añade el nombre al input del archivo de imagen
$(function(){
    // Añade el nombre al input del archivo de imagen
    $(".fileInput").on("change", function() {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });
});

// Chart Welcome
$(function(){
    var optionsProfileVisit = {
        annotations: {
            position: 'back'
        },
        dataLabels: {
            enabled:false
        },
        chart: {
            type: 'bar',
            height: 300
        },
        fill: {
            opacity:1
        },
        plotOptions: {
        },
        series: [{
            name: 'sales',
            data: [9,20,30,20,10,20,30,20,10,20,30,20]
        }],
        colors: '#33048E',
        xaxis: {
            categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug","Sep","Oct","Nov","Dec"],
        },
    }
    let optionsVisitorsProfile  = {
        series: [70, 30],
        labels: ['Male', 'Female'],
        colors: ['#33048E','#55c6e8'],
        chart: {
            type: 'donut',
            width: '100%',
            height:'350px'
        },
        legend: {
            position: 'bottom'
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '30%'
                }
            }
        }
    }
    
    var optionsEurope = {
        series: [{
            name: 'series1',
            data: [310, 800, 600, 430, 540, 340, 605, 805,430, 540, 340, 605]
        }],
        chart: {
            height: 80,
            type: 'area',
            toolbar: {
                show:false,
            },
        },
        colors: ['#5350e9'],
        stroke: {
            width: 2,
        },
        grid: {
            show:false,
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z","2018-09-19T07:30:00.000Z","2018-09-19T08:30:00.000Z","2018-09-19T09:30:00.000Z","2018-09-19T10:30:00.000Z","2018-09-19T11:30:00.000Z"],
            axisBorder: {
                show:false
            },
            axisTicks: {
                show:false
            },
            labels: {
                show:false,
            }
        },
        show:false,
        yaxis: {
            labels: {
                show:false,
            },
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    };
    
    let optionsAmerica = {
        ...optionsEurope,
        colors: ['#008b75'],
    }
    let optionsIndonesia = {
        ...optionsEurope,
        colors: ['#dc3545'],
    }
    
    
    
    var chartProfileVisit = new ApexCharts(document.querySelector("#chart-profile-visit"), optionsProfileVisit);
    var chartVisitorsProfile = new ApexCharts(document.getElementById('chart-visitors-profile'), optionsVisitorsProfile)
    var chartEurope = new ApexCharts(document.querySelector("#chart-europe"), optionsEurope);
    var chartAmerica = new ApexCharts(document.querySelector("#chart-america"), optionsAmerica);
    var chartIndonesia = new ApexCharts(document.querySelector("#chart-indonesia"), optionsIndonesia);
    
    chartIndonesia.render();
    chartAmerica.render();
    chartEurope.render();
    chartProfileVisit.render();
    chartVisitorsProfile.render()
});

// select multiple
$(function(){
    let choices = document.querySelectorAll('.choices');
    let initChoice;
    for(let i=0; i<choices.length;i++) {
        if (choices[i].classList.contains("multiple-remove")) {
            initChoice = new Choices(choices[i],
            {
                delimiter: ',',
                editItems: true,
                maxItemCount: -1,
                removeItemButton: true,
            });
        }else{
            initChoice = new Choices(choices[i]);
        }
    }
});

// funcion para llamar options para llenar Selects
function optionSelects(tipo,campo,id = false,selectPadre = false,page = false) {
    
    if (tipo == 'optionsContactos') {
        if (id) {
            $.ajax({
                type: "POST",
                url: "pages/selectsOptions.php",
                data: "tipo=" + tipo + '&idSelected=' + id,
                success: function(r) {
                    if (page == 'op') {
                        let htmlPadre = `<label for="choice4Oportunidades"><h6><b>Contactos dentro de la cuenta:</b></h6></label>
                                            <select class="choices form-select multiple-remove" id="choice4Oportunidades" multiple="multiple">
                                                <optgroup label="Contactos" id="optionsContactosOp">
                                                    
                                                </optgroup>
                                            </select>
                                            <div class="form-control-icon mt-2 position-absolute">
                                                <i class="text-primary bi bi-person-plus"></i>
                                            </div>`;
                        
                        $('.selectaPadreCont').html(htmlPadre);
                        $('#'+campo).html(``);
                        $('#'+campo).html(r);
    
                        let choices = document.querySelectorAll('#'+selectPadre);
                        let initChoice;
                        for(let i=0; i<choices.length;i++) {
                            if (choices[i].classList.contains("multiple-remove")) {
                                initChoice = new Choices(choices[i],
                                {
                                    delimiter: ',',
                                    editItems: true,
                                    maxItemCount: -1,
                                    removeItemButton: true,
                                });
                            }else{
                                initChoice = new Choices(choices[i]);
                            }
                        }
                    }if (page == 'opE') {
                        let htmlPadre = `<label for="choice4Oportunidades"><h6><b>Contactos dentro de la cuenta:</b></h6></label>
                                            <select class="choices form-select multiple-remove" id="choice4Oportunidades" multiple="multiple">
                                                <optgroup label="Contactos" id="optionsContactosOp">
                                                    
                                                </optgroup>
                                            </select>
                                            <div class="form-control-icon mt-2 position-absolute">
                                                <i class="text-primary bi bi-person-plus"></i>
                                            </div>`;
                        
                        $('.selectaPadreCont').html(htmlPadre);
                        $('#'+campo).html(``);
                        $('#'+campo).html(r);
    
                        let choices = document.querySelectorAll('#'+selectPadre);
                        let initChoice;
                        for(let i=0; i<choices.length;i++) {
                            if (choices[i].classList.contains("multiple-remove")) {
                                initChoice = new Choices(choices[i],
                                {
                                    delimiter: ',',
                                    editItems: true,
                                    maxItemCount: -1,
                                    removeItemButton: true,
                                });
                            }else{
                                initChoice = new Choices(choices[i]);
                            }
                        }
                    } if (page == 'org') {
                        $('.selectPadreOrgCont').html(``);
                        let htmlPadre = `   <label for="choice1Organizaciones"><h6><b>Contactos dentro de la cuenta:</b></h6></label>
                                            <select class="choices form-select multiple-remove" id="choice1Organizaciones" multiple="multiple">
                                                <optgroup label="Contactos" id="optionsContactosOrg">
                                                </optgroup>
                                            </select>`;
                        
                        $('.selectPadreOrgCont').html(htmlPadre);
                        $('#'+campo).html(``);
                        $('#'+campo).html(r);
                        console.log(r);
                        let choices = document.querySelectorAll('#'+selectPadre);
                        let initChoice;
                        for(let i=0; i<choices.length;i++) {
                            if (choices[i].classList.contains("multiple-remove")) {
                                initChoice = new Choices(choices[i],
                                {
                                    delimiter: ',',
                                    editItems: true,
                                    maxItemCount: -1,
                                    removeItemButton: true,
                                });
                            }else{
                                initChoice = new Choices(choices[i]);
                            }
                        }
                    }
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: "pages/selectsOptions.php",
                data: "tipo=" + tipo,
                success: function(r) {
                    $('#'+campo).html(r);
                    
                    let choices = document.querySelectorAll('#'+campo);
                    let initChoice;
                    for(let i=0; i<choices.length;i++) {
                        if (choices[i].classList.contains("multiple-remove")) {
                            initChoice = new Choices(choices[i],
                            {
                                delimiter: ',',
                                editItems: true,
                                maxItemCount: -1,
                                removeItemButton: true,
                            });
                        }else{
                            initChoice = new Choices(choices[i]);
                        }
                    }
                }
            });
        }
    }
    if (tipo == 'optionsProductos') {
        if (id) {
            $.ajax({
                type: "POST",
                url: "pages/selectsOptions.php",
                data: "tipo=" + tipo + '&idSelected=' + id,
                success: function(r) {
                    if (page == 'op') {
                        let htmlPadre = `<label for="choice5Oportunidades"><h6><b>Solución Propuesta (UVP):</b></h6></label>
                                        <select class="choices form-select multiple-remove choice5Oportunidades" id="choice5Oportunidades" multiple="multiple">
                                        </select>
                                        <div class="form-control-icon mt-2">
                                            <i class="text-primary bi bi-journal-check"></i>
                                        </div>`;
                        
                        $('.selectaPadreProd').html(htmlPadre);
                        $('#'+campo).html(``);
                        $('#'+campo).html(r);
                        
                        let choices = document.querySelectorAll('#'+campo);
                        let initChoice;
                        for(let i=0; i<choices.length;i++) {
                            if (choices[i].classList.contains("multiple-remove")) {
                                initChoice = new Choices(choices[i],
                                {
                                    delimiter: ',',
                                    editItems: true,
                                    maxItemCount: -1,
                                    removeItemButton: true,
                                });
                            }else{
                                initChoice = new Choices(choices[i]);
                            }
                        }
                    }
                    if (page == 'opE') {
                        let htmlPadre = `<label for="choice5OportunidadesE"><h6><b>Solución Propuesta (UVP):</b></h6></label>
                                        <select class="choices form-select multiple-remove choice5Oportunidades" id="choice5OportunidadesE" multiple="multiple">
                                            
                                        </select>
                                        <div class="form-control-icon mt-2">
                                            <i class="text-primary bi bi-journal-check"></i>
                                        </div>`;
                        
                        $('.selectaPadreProdE').html(htmlPadre);
                        $('#'+campo).html(``);
                        $('#'+campo).html(r);
                        
                        let choices = document.querySelectorAll('#'+campo);
                        let initChoice;
                        for(let i=0; i<choices.length;i++) {
                            if (choices[i].classList.contains("multiple-remove")) {
                                initChoice = new Choices(choices[i],
                                {
                                    delimiter: ',',
                                    editItems: true,
                                    maxItemCount: -1,
                                    removeItemButton: true,
                                });
                            }else{
                                initChoice = new Choices(choices[i]);
                            }
                        }
                    }
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: "pages/selectsOptions.php",
                data: "tipo=" + tipo,
                success: function(r) {
                    $('#'+campo).html(r);
                    
                    let choices = document.querySelectorAll('#'+campo);
                    let initChoice;
                    for(let i=0; i<choices.length;i++) {
                        if (choices[i].classList.contains("multiple-remove")) {
                            initChoice = new Choices(choices[i],
                            {
                                delimiter: ',',
                                editItems: true,
                                maxItemCount: -1,
                                removeItemButton: true,
                            });
                        }else{
                            initChoice = new Choices(choices[i]);
                        }
                    }
                }
            });
        }
    }
    if (tipo == 'optionsProductosLN') {
        if (id) {
            $.ajax({
                type: "POST",
                url: "pages/selectsOptions.php",
                data: "tipo=" + tipo + '&idSelected=' + id,
                success: function(r) {
                    if (page == 'ln') {
                        let htmlPadre = `<label for="choice1LN"><h6><b>Productos</b></h6></label>
                                        <select class="choices form-select multiple-remove choice1LN" id="choice1LN" multiple="multiple">
                                        </select>
                                        <div class="form-control-icon mt-2">
                                            <i class="text-primary bi bi-journal-check"></i>
                                        </div>`;
                        
                        $('.selectaPadreProd').html(htmlPadre);
                        $('#'+campo).html(``);
                        $('#'+campo).html(r);
                        
                        let choices = document.querySelectorAll('#'+campo);
                        let initChoice;
                        for(let i=0; i<choices.length;i++) {
                            if (choices[i].classList.contains("multiple-remove")) {
                                initChoice = new Choices(choices[i],
                                {
                                    delimiter: ',',
                                    editItems: true,
                                    maxItemCount: -1,
                                    removeItemButton: true,
                                });
                            }else{
                                initChoice = new Choices(choices[i]);
                            }
                        }
                    }
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: "pages/selectsOptions.php",
                data: "tipo=" + tipo,
                success: function(r) {
                    $('#'+campo).html(r);
                    
                    let choices = document.querySelectorAll('#'+campo);
                    let initChoice;
                    for(let i=0; i<choices.length;i++) {
                        if (choices[i].classList.contains("multiple-remove")) {
                            initChoice = new Choices(choices[i],
                            {
                                delimiter: ',',
                                editItems: true,
                                maxItemCount: -1,
                                removeItemButton: true,
                            });
                        }else{
                            initChoice = new Choices(choices[i]);
                        }
                    }
                }
            });
        }
    }

    // let choices = document.querySelectorAll('.choices');
    // let initChoice;
    // for(let i=0; i<choices.length;i++) {
    //     if (choices[i].classList.contains("multiple-remove")) {
    //         initChoice = new Choices(choices[i],
    //         {
    //             delimiter: ',',
    //             editItems: true,
    //             maxItemCount: -1,
    //             removeItemButton: true,
    //         });
    //     }else{
    //         initChoice = new Choices(choices[i]);
    //     }
    // }
}

// sweetAlert
function sweetAlertType(type,page, id = false) {
    $(function(){
        if (type == 'success') {
            Swal.fire({
                icon: "success",
                title: "Registrado correctamente"
            }).then(() => {
                contenido(page);
            });
        }
        if (type == 'successNoReload') {
            Swal.fire({
                icon: "success",
                title: "Registrado correctamente"
            }).then(() => {
                limpiarFormulario('formNuevoContactoOp');
                limpiarFormulario('formNuevoProductoOp');
                limpiarFormulario('formNuevoProductoOrg');
                limpiarFormulario('formNuevoContactoOrg');
            });
        }
        if (type == 'error') {
            Swal.fire({
                icon: "error",
                title: "El registro no se pudo realizar"
            });
        }
        if (type == 'info') {
            Swal.fire({
                icon: "info",
                title: "Algunos campos obligatorios deben contener valores"
            });
        }
        if (type == 'eliminado') {
            Swal.fire({
                icon: "success",
                title: "Eliminado correctamente"
            }).then(() => {
                contenido(page);
            });
        }
        if (type == 'eliminar') {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¿Quieres eliminar el registro seleccionado?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#198754',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar'
            }).then((result) => {
                if (result.isConfirmed) {
                    ConfirmEliminar(id,page);
                }
            });
        }
    });
}

function btnAñadirOtroProblemaOport() {
    $('.otroProblemaOportEnlace').addClass('d-none');
    $('.otroProblemaOportInput').removeClass('d-none');
}

function taerDatosSolucion() {
    let choice1PotencialDeCuenta = $('#choice1PotencialDeCuenta').val();
    let choice1TipoSolPC = $('#choice1TipoSolPC').val();


    if (choice1PotencialDeCuenta == '') {
        sweetAlertType('info','organizaciones');
        $('#campoFormTS').html(``);
    }else {
        $.ajax({
            type: "POST",
            url: "pages/selectTipoSolucion.php",
            data: "choice1PotencialDeCuenta=" + choice1PotencialDeCuenta + "&choice1TipoSolPC=" + choice1TipoSolPC,
            success: function(r) {
                $('#campoFormTS').addClass('p-4');
                $('#campoFormTS').html(r);

                let choices = document.querySelectorAll('#choice1SolPC');
                let initChoice;
                for(let i=0; i<choices.length;i++) {
                    if (choices[i].classList.contains("multiple-remove")) {
                        initChoice = new Choices(choices[i],
                        {
                            delimiter: ',',
                            editItems: true,
                            maxItemCount: -1,
                            removeItemButton: true,
                        });
                    }else{
                        initChoice = new Choices(choices[i]);
                    }
                }
            }
        });
    }

}

function iniciarPC() {
    let organizacion = $('#choice1PlanCuentas').val();

    if (organizacion == '') {
        sweetAlertType('info','planCuentas');
        $('#SetOrganización').removeClass('d-none');
        $('#planCuentasContent').addClass('d-none');
        $('#tabPlanCuentas').html(``);
    }else {
        $.ajax({
            type: "POST",
            url: "pages/selectPlanCuentas.php",
            data: "organizacion=" + organizacion,
            success: function(r) {
                
                $('#tabPlanCuentas').html(r);
                
                $('#SetOrganización').addClass('d-none');
                $('#planCuentasContent').removeClass('d-none');
                $('#myTabContentPlanCuentas').removeClass('d-none');

                var precioPerdidas = document.getElementById("precioPerdidas");
                if(precioPerdidas){ var precioPerdidasalue = parseInt(precioPerdidas.innerHTML); } else { precioPerdidasalue = 0; }
                

                console.log(precioPerdidasalue + 'precioPerdidasalue');

                var precioAbiertas = document.getElementById("precioAbiertas");
                if(precioAbiertas){ var precioAbiertasalue = parseInt(precioAbiertas.innerHTML); } else { precioAbiertasalue = 0; }
                

                console.log(precioAbiertasalue + 'precioAbiertasalue');

                var precioGanadas = document.getElementById("precioGanadas");
                if(precioGanadas){ var precioGanadasValue = parseInt(precioGanadas.innerHTML); } else { precioGanadasValue = 0; }
                

                console.log(precioGanadasValue + 'precioGanadasValue');

                chartPlanCuentas(1,precioPerdidasalue,precioAbiertasalue,precioGanadasValue);

                $.ajax({
                    type: "POST",
                    url: "pages/selectPlanCuentas.php",
                    data: "tipo=OportXOrg" + "&org=" + organizacion,
                    success: function(res) {
                        
                        $('#SetOprtXOrg').html(res);

                        let choices = document.querySelectorAll('#choice1OprtXOrg');
                        let initChoice;
                        for(let i=0; i<choices.length;i++) {
                            if (choices[i].classList.contains("multiple-remove")) {
                                initChoice = new Choices(choices[i],
                                {
                                    delimiter: ',',
                                    editItems: true,
                                    maxItemCount: -1,
                                    removeItemButton: true,
                                });
                            }else{
                                initChoice = new Choices(choices[i]);
                            }
                        }
                    }
                });

            }
        });
    }

}

function iniciarDiagram(){
    let oportunidad = $('#choice1OprtXOrg').val();
    
    if (oportunidad == '') {
        sweetAlertType('info','planCuentas');
    }else {
        $.ajax({
            type: "POST",
            url: "pages/selectPlanCuentas.php",
            data: "oportunidad=" + oportunidad,
            success: function(r) {
                
                console.log(r);
                dataDiagramaOrg = r;

                let diagrama = `<button class="btn btn-outline-warning d-flex align-items-center justify-content-center my-4" onclick="regresarOXO()">Elegir Oportunidad &nbsp; <i class="bi bi-arrow-90deg-left"></i></button>
                                
                                <iframe src="extensions/diagram/diagram.html" frameborder="0" width="100%" height="1000px"></iframe>`;

                $('#contentOprtXOrg').html(diagrama);

                $('#contentOprtXOrg').removeClass('d-none');
                $('#SetOprtXOrg').addClass('d-none');
            }
        });
    }
}

function regresarOXO() {
    $('#contentOprtXOrg').addClass('d-none');
    $('#SetOprtXOrg').removeClass('d-none');
}

function chartPlanCuentas(numChart,perdidos,abiertos,ganados){

    if (numChart == 1) {
        var optionsProfileVisit = {
            annotations: {
                position: 'back'
            },
            dataLabels: {
                enabled:false
            },
            chart: {
                type: 'bar',
                height: 300
            },
            fill: {
                opacity:1
            },
            plotOptions: {
            },
            series: [{
                name: 'sales',
                data: [perdidos,abiertos,ganados]
            }],
            colors: '#33048E',
            xaxis: {
                categories: ["Perdidas","Abiertas","Ganados"],
            },
        }
        var chartProfileVisit = new ApexCharts(document.querySelector("#grafica1PC"), optionsProfileVisit);
        chartProfileVisit.render();
    }
}

function cerrarModal(id) {
    document.getElementById(id).click();
}

function menu(accion) {

    if (accion == 'cerrar') {

        $('#sidebar').removeClass('active');
        $('.sidebar-wrapper').addClass('left-250px');
        $('.sidebar-header').addClass('justify-content-end pr-2');
        $('.logoMenu').css('height','3rem');
        $('.sidebar-menu').addClass('d-flex justify-content-end');
        $('.menu').addClass('p-0');
        $('.spanText').addClass('d-none');
        $('#main').css('margin-left','50px');
        $('.logoMenu').attr('src','assets/images/logo/simbolo.png');
        $('.sidebar-title').addClass('d-none');
        $('.accionarMenu').attr('onclick','menu("abrir")');
        $('.accionarMenu').removeClass('bi-chevron-left');
        $('.accionarMenu').addClass('bi-chevron-right');
        
    } else {

        $('#sidebar').addClass('active');
        $('.sidebar-wrapper').removeClass('left-250px');
        $('.sidebar-header').removeClass('justify-content-end pr-2');
        $('.logoMenu').css('height','4rem');
        $('.sidebar-menu').removeClass('d-flex justify-content-end');
        $('.menu').removeClass('p-0');
        $('.spanText').removeClass('d-none');
        $('#main').css('margin-left','300px');
        $('.logoMenu').attr('src','assets/images/logo/logo.png');
        $('.sidebar-title').removeClass('d-none');
        $('.accionarMenu').attr('onclick','menu("cerrar")');
        $('.accionarMenu').removeClass('bi-chevron-right');
        $('.accionarMenu').addClass('bi-chevron-left');
        
    }
}