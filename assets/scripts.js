// Variables globales
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const MIN_PEDIDO = 4;

// Elementos del DOM
const carritoBtn = document.getElementById('carrito-btn');
const modalCarrito = document.getElementById('modal-carrito');
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

// Mostrar opciones del producto
function mostrarOpciones(producto) {
    let opcionesHTML = `<h3>${producto.nombre}</h3><p>${producto.descripcion}</p>`;
    
    // Generar opciones según categoría
    if (producto.categoria === 'bebidas') {
        opcionesHTML += `
            <div class="opcion-grupo">
                <h4>Alcohol:</h4>
                <label><input type="radio" name="alcohol" value="sin" checked> Sin alcohol (+$${producto.opciones.alcohol.sin})</label>
                <label><input type="radio" name="alcohol" value="con"> Con alcohol (+$${producto.opciones.alcohol.con})</label>
                ${producto.opciones.alcohol.advertencia ? `<p class="advertencia">${producto.opciones.alcohol.advertencia}</p>` : ''}
            </div>
            <div class="opcion-grupo">
                <h4>Bubble Jelly:</h4>
                <label><input type="radio" name="jelly" value="no" checked> No (+$${producto.opciones.jelly.no})</label>
                <label><input type="radio" name="jelly" value="si"> Sí (+$${producto.opciones.jelly.si})</label>
            </div>
        `;
    }
    // ... (agregar lógica similar para Tés y Cafés)

    const confirmar = confirm(`Opciones para ${producto.nombre}:\n${opcionesHTML}\n¿Agregar al carrito?`);
    
    if (confirmar) {
        agregarAlCarrito({
            ...producto,
            seleccion: {
                alcohol: document.querySelector('input[name="alcohol"]:checked').value,
                jelly: document.querySelector('input[name="jelly"]:checked').value
            },
            cantidad: 1
        });
    }
}

// Agregar producto al carrito
function agregarAlCarrito(item) {
    carrito.push(item);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
}

// Actualizar interfaz del carrito
function actualizarCarritoUI() {
    const contador = document.getElementById('contador-carrito');
    contador.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
    
    // Mostrar/ocultar botón de WhatsApp según mínimo de pedido
    whatsappBtn.style.display = carrito.length >= MIN_PEDIDO ? 'block' : 'none';
}

// Mostrar modal del carrito
function mostrarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;
    
    carrito.forEach((item, index) => {
        const subtotal = item.base + 
                        (item.seleccion.alcohol === 'con' ? item.opciones.alcohol.con : 0) + 
                        (item.seleccion.jelly === 'si' ? item.opciones.jelly.si : 0);
        
        total += subtotal * item.cantidad;
        
        listaCarrito.innerHTML += `
            <div class="item-carrito">
                <h4>${item.nombre} x${item.cantidad}</h4>
                <p>${item.seleccion.alcohol === 'con' ? 'Con alcohol' : 'Sin alcohol'} | 
                   ${item.seleccion.jelly === 'si' ? 'Con jelly' : 'Sin jelly'}</p>
                <p>Subtotal: $${subtotal * item.cantidad} MXN</p>
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

// Enviar pedido por WhatsApp
function enviarWhatsApp() {
    let mensaje = "*Pedido Golden Drinks*%0A%0A";
    let total = 0;
    
    carrito.forEach(item => {
        const subtotal = item.base + 
                        (item.seleccion.alcohol === 'con' ? item.opciones.alcohol.con : 0) + 
                        (item.seleccion.jelly === 'si' ? item.opciones.jelly.si : 0);
        
        total += subtotal * item.cantidad;
        
        mensaje += `*${item.cantidad}x ${item.nombre}*%0A` +
                   `- ${item.seleccion.alcohol === 'con' ? 'Con alcohol' : 'Sin alcohol'}%0A` +
                   `- ${item.seleccion.jelly === 'si' ? 'Con jelly' : 'Sin jelly'}%0A%0A`;
    });
    
    mensaje += `*Total: $${total} MXN*%0A%0A` +
               "*Datos bancarios:*%0A" +
               "Titular: Eric Daniel Gutiérrez Arana%0A" +
               "CLABE: 012 261 01584933343 3 (BBVA)%0A%0A" +
               "*Nota:* Tienes 5 minutos para modificaciones post-pago.";
    
    window.open(`https://wa.me/525611649344?text=${mensaje}`, '_blank');
}
