// Variables globales
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const MIN_PEDIDO = 4;

// Elementos del DOM
const carritoBtn = document.getElementById('carrito-btn');
const modalCarrito = document.getElementById('modal-carrito');
const modalOpciones = document.getElementById('modal-opciones');
const cerrarModal = document.getElementById('cerrar-modal');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const whatsappBtn = document.getElementById('whatsapp-btn');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    actualizarCarritoUI();
    
    // Event listeners
    carritoBtn.addEventListener('click', mostrarCarrito);
    cerrarModal.addEventListener('click', () => modalCarrito.style.display = 'none');
    whatsappBtn.addEventListener('click', enviarWhatsApp);
    document.getElementById('confirmar-opciones').addEventListener('click', confirmarSeleccion);
});

// Cargar productos desde JSON
async function cargarProductos() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        renderizarProductos(data);
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

// Mostrar productos en pantalla
function renderizarProductos(data) {
    const categorias = {
        'bebidas': document.getElementById('bebidas-container'),
        'tes': document.getElementById('tes-container'),
        'cafes': document.getElementById('cafes-container')
    };

    for (const categoria in data) {
        for (const nombreProducto in data[categoria]) {
            const producto = data[categoria][nombreProducto];
            const card = document.createElement('div');
            card.className = 'producto-card';
            card.innerHTML = `
                <h3>${nombreProducto}</h3>
                <p>${producto.descripcion}</p>
                <p class="precio">$${producto.base} MXN</p>
                <button class="btn-seleccionar" 
                        data-producto='${JSON.stringify({
                            nombre: nombreProducto,
                            categoria: categoria,
                            base: producto.base,
                            opciones: producto.opciones
                        })}'>
                    Seleccionar
                </button>
            `;
            categorias[categoria].appendChild(card);
        }
    }

    // Eventos para botones de selección
    document.querySelectorAll('.btn-seleccionar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productoData = JSON.parse(e.target.getAttribute('data-producto'));
            mostrarOpciones(productoData);
        });
    });
}

// Mostrar modal de opciones
function mostrarOpciones(producto) {
    const modal = document.getElementById('modal-opciones');
    const tituloModal = document.getElementById('titulo-modal');
    const formulario = document.getElementById('formulario-opciones');

    tituloModal.textContent = producto.nombre;
    formulario.innerHTML = '';

    // Generar opciones según categoría
    if (producto.categoria === 'bebidas') {
        formulario.innerHTML = `
            <div class="opcion-grupo">
                <h3>Alcohol:</h3>
                <label><input type="radio" name="alcohol" value="sin" checked> Sin (+$${producto.opciones.alcohol.sin})</label>
                <label><input type="radio" name="alcohol" value="con"> Con (+$${producto.opciones.alcohol.con})</label>
                <p class="advertencia">${producto.opciones.alcohol.advertencia || ''}</p>
            </div>
            <div class="opcion-grupo">
                <h3>Bubble Jelly:</h3>
                <label><input type="radio" name="jelly" value="no" checked> No (+$${producto.opciones.jelly.no})</label>
                <label><input type="radio" name="jelly" value="si"> Sí (+$${producto.opciones.jelly.si})</label>
            </div>
        `;
    } else if (producto.categoria === 'tes') {
        formulario.innerHTML = `
            <div class="opcion-grupo">
                <h3>Azúcar:</h3>
                <label><input type="radio" name="azucar" value="sin" checked> Sin</label>
                <label><input type="radio" name="azucar" value="con"> Con</label>
                <label><input type="radio" name="azucar" value="sustituto"> Sustituto</label>
            </div>
            <div class="opcion-grupo">
                <h3>Bubble Jelly:</h3>
                <label><input type="radio" name="jelly" value="no" checked> No (+$${producto.opciones.jelly.no})</label>
                <label><input type="radio" name="jelly" value="si"> Sí (+$${producto.opciones.jelly.si})</label>
            </div>
        `;
    } else if (producto.categoria === 'cafes') {
        formulario.innerHTML = `
            <div class="opcion-grupo">
                <h3>Leche:</h3>
                <label><input type="radio" name="leche" value="sin" checked> Sin (+$${producto.opciones.leche.sin})</label>
                <label><input type="radio" name="leche" value="con"> Con (+$${producto.opciones.leche.con})</label>
                <label><input type="radio" name="leche" value="deslactosada"> Deslactosada (+$${producto.opciones.leche.deslactosada})</label>
            </div>
            <div class="opcion-grupo">
                <h3>Azúcar:</h3>
                <label><input type="radio" name="azucar" value="sin" checked> Sin</label>
                <label><input type="radio" name="azucar" value="con"> Con</label>
                <label><input type="radio" name="azucar" value="sustituto"> Sustituto</label>
            </div>
            <div class="opcion-grupo">
                <h3>Coffee Bubble:</h3>
                <label><input type="radio" name="coffee_bubble" value="no" checked> No (+$${producto.opciones.coffee_bubble.no})</label>
                <label><input type="radio" name="coffee_bubble" value="si"> Sí (+$${producto.opciones.coffee_bubble.si})</label>
            </div>
        `;
    }

    // Guardar referencia al producto actual
    modal.dataset.producto = JSON.stringify(producto);
    modal.style.display = 'block';
}

// Confirmar selección de opciones
function confirmarSeleccion() {
    const modal = document.getElementById('modal-opciones');
    const producto = JSON.parse(modal.dataset.producto);
    
    // Obtener selecciones
    const opciones = {
        alcohol: document.querySelector('input[name="alcohol"]:checked')?.value,
        jelly: document.querySelector('input[name="jelly"]:checked')?.value,
        azucar: document.querySelector('input[name="azucar"]:checked')?.value,
        leche: document.querySelector('input[name="leche"]:checked')?.value,
        coffee_bubble: document.querySelector('input[name="coffee_bubble"]:checked')?.value
    };

    // Agregar al carrito
    agregarAlCarrito({
        ...producto,
        seleccion: opciones,
        cantidad: 1
    });

    modal.style.display = 'none';
}

// Agregar producto al carrito
function agregarAlCarrito(item) {
    carrito.push(item);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
}

// Mostrar carrito
function mostrarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        let precioExtra = 0;
        
        // Calcular extras según opciones
        if (item.categoria === 'bebidas') {
            precioExtra += item.seleccion.alcohol === 'con' ? item.opciones.alcohol.con : 0;
            precioExtra += item.seleccion.jelly === 'si' ? item.opciones.jelly.si : 0;
        } else if (item.categoria === 'tes') {
            precioExtra += item.seleccion.jelly === 'si' ? item.opciones.jelly.si : 0;
        } else if (item.categoria === 'cafes') {
            precioExtra += item.seleccion.leche === 'con' ? item.opciones.leche.con : 0;
            precioExtra += item.seleccion.leche === 'deslactosada' ? item.opciones.leche.deslactosada : 0;
            precioExtra += item.seleccion.coffee_bubble === 'si' ? item.opciones.coffee_bubble.si : 0;
        }

        const subtotal = (item.base + precioExtra) * item.cantidad;
        total += subtotal;

        listaCarrito.innerHTML += `
            <div class="item-carrito">
                <h4>${item.nombre} x${item.cantidad}</h4>
                <p>${item.seleccion.alcohol ? (item.seleccion.alcohol === 'con' ? 'Con alcohol' : 'Sin alcohol') : ''}</p>
                <p>${item.seleccion.jelly ? (item.seleccion.jelly === 'si' ? 'Con jelly' : 'Sin jelly') : ''}</p>
                <p>Subtotal: $${subtotal} MXN</p>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </div>
        `;
    });

    totalCarrito.textContent = `Total: $${total} MXN`;
    modalCarrito.style.display = 'block';
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
    mostrarCarrito();
}

// Actualizar interfaz del carrito
function actualizarCarritoUI() {
    const contador = document.getElementById('contador-carrito');
    contador.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
}

// Enviar pedido por WhatsApp
function enviarWhatsApp() {
    let mensaje = "¡Hola! Quiero hacer este pedido:%0A%0A";
    let total = 0;

    carrito.forEach(item => {
        let extras = [];
        let precioExtra = 0;

        if (item.categoria === 'bebidas') {
            if (item.seleccion.alcohol === 'con') extras.push("con alcohol");
            if (item.seleccion.jelly === 'si') extras.push("con jelly");
            precioExtra = item.base + 
                         (item.seleccion.alcohol === 'con' ? item.opciones.alcohol.con : 0) + 
                         (item.seleccion.jelly === 'si' ? item.opciones.jelly.si : 0);
        } else if (item.categoria === 'tes') {
            if (item.seleccion.azucar === 'con') extras.push("con azúcar");
            if (item.seleccion.azucar === 'sustituto') extras.push("con sustituto");
            if (item.seleccion.jelly === 'si') extras.push("con jelly");
            precioExtra = item.base + 
                         (item.seleccion.jelly === 'si' ? item.opciones.jelly.si : 0);
        } else if (item.categoria === 'cafes') {
            if (item.seleccion.leche === 'con') extras.push("con leche");
            if (item.seleccion.leche === 'deslactosada') extras.push("con leche deslactosada");
            if (item.seleccion.azucar === 'con') extras.push("con azúcar");
            if (item.seleccion.azucar === 'sustituto') extras.push("con sustituto");
            if (item.seleccion.coffee_bubble === 'si') extras.push("con coffee bubble");
            precioExtra = item.base + 
                         (item.seleccion.leche === 'con' ? item.opciones.leche.con : 0) + 
                         (item.seleccion.leche === 'deslactosada' ? item.opciones.leche.deslactosada : 0) + 
                         (item.seleccion.coffee_bubble === 'si' ? item.opciones.coffee_bubble.si : 0);
        }

        const subtotal = precioExtra * item.cantidad;
        total += subtotal;

        mensaje += `*${item.nombre}* x${item.cantidad}%0A`;
        if (extras.length > 0) mensaje += `(${extras.join(", ")})%0A`;
        mensaje += `$${subtotal} MXN%0A%0A`;
    });

    mensaje += `*Total: $${total} MXN*%0A%0A`;
    mensaje += "Datos bancarios:%0A";
    mensaje += "Titular: Eric Daniel Gutiérrez Arana%0A";
    mensaje += "CLABE: 012 261 01584933343 3 (BBVA)%0A%0A";
    mensaje += "Nota: Tienes 5 minutos para modificaciones post-pago.";

    window.open(`https://wa.me/525611649344?text=${mensaje}`, '_blank');
}
