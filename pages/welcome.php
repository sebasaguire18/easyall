
<a class="ruler-button_child-lg ruler-button-block bg-primary txt-white" onclick="abrirModal('ExampleModal')">Abrir Modal</a>

<!-- ejemplo de un modal -->
<div class="overlay overlayExampleModal" id="overlay">
    <div class="popup part bg-light pd-6" id="ExampleModal">
        <a href="#" class="btn-cerrar-popup" onclick="cerrarModal('ExampleModal')"><i class="icon-cross"></i></a>
        <form >
            <div class="ruler-title">
                <h3>título</h3>
            </div>
            <div class="ruler-input mgt-4 contenedor-inputs">
                <input type="text" id="nombreNuevoDato" class="ruler-input_child-lg bg-trs-6" placeholder="Nombre" autocomplete="off">
                <span class="txt-danger dp-none" id="spanNombreNuevoDato"> Por favor ingresa el nombre</span>
            </div>
            <div class="ruler-input contenedor-inputs">
                <input type="text" id="referenciaNuevoDato" class="ruler-input_child-lg bg-trs-6" placeholder="Referencia" autocomplete="off">
                <span class="txt-danger dp-none" id="spanReferenciaNuevoDato">Por favor ingresa la referencia</span>
            </div>
            <div class="ruler-button">
                <a class="ruler-button_child-lg ruler-button-block bg-primary txt-white" onclick="insertarNuevoDato()">Validar</a>
            </div>
        </form>
    </div>
</div>