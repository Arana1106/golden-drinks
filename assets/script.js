// ==============================================
// CONFIGURACIÓN GLOBAL
// ==============================================
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let productoSeleccionado = null;

// Elementos del DOM
const contadorCarrito = document.getElementById('contador-carrito');
const modalOpciones = document.getElementById('modal-opciones');
const modalCarrito = document.getElementById('modal-carrito');
const itemsCarrito = document.getElementById('items-carrito');
const totalCarrito = document.getElementById('total-carrito');

// ==============================================
// INICIALIZACIÓN
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    actualizarCarritoUI();
    
    // Event Listeners
    document.getElementById('carrito-btn').addEventListener('click', mostrarCarrito);
    document.getElementById('whatsapp-btn').addEventListener('click', enviarWhatsApp);
    
    // Cerrar modales al hacer clic en X
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            modalOpciones.style.display = 'none';
            modalCarrito.style.display = 'none';
        });
    });
});

// ==============================================
// CARGAR PRODUCTOS DESDE JSON
// ==============================================
async function cargarProductos() {
    try {
        const response = await fetch('/products.json');
        if (!response.ok) throw new Error("Error HTTP: " + response.status);
        
        const data = await response.json();
        renderizarProductos(data);
    } catch (error) {
        console.error("Error cargando productos:", error);
        alert("Error al cargar el menú. Recarga la página.");
    }
}

// ==============================================
// MOSTRAR PRODUCTOS EN PÁGINA
// ==============================================
function renderizarProductos(data) {
    const contenedores = {
        'bebidas': document.getElementById('bebidas-container'),
        'tes': document.getElementById('tes-container'),
        'cafes': document.getElementById('cafes-container')
    };

    Object.entries(data).forEach(([categoria, productos]) => {
        Object.entries(productos).forEach(([nombre, producto]) => {
            contenedores[categoria].appendChild(
                crearTarjetaProducto(nombre, producto, categoria)
            );
        });
    });
}

// ==============================================
// CREAR TARJETA DE PRODUCTO
// ==============================================
function crearTarjetaProducto(nombre, producto, categoria) {
    const card = document.createElement('div');
    card.className = 'producto-card';
    card.setAttribute('data-producto', nombre);
    card.innerHTML = `
        <h3>${nombre}</h3>
        <p>${producto.descripcion}</p>
        <button class="btn-seleccionar" data-producto="${nombre}" data-categoria="${categoria}">
            Seleccionar
        </button>
    `;
    
    card.querySelector('.btn-seleccionar').addEventListener('click', (e) => {
        iniciarSeleccion(e.target.dataset.producto, e.target.dataset.categoria);
    });
    
    return card;
}

// ==============================================
// PROCESO DE SELECCIÓN
// ==============================================
async function iniciarSeleccion(nombre, categoria) {
    try {
        const response = await fetch('/products.json');
        const data = await response.json();
        const producto = data[categoria][nombre];
        
        productoSeleccionado = {
            nombre,
            categoria,
            descripcion: producto.descripcion,
            base: producto.base,
            opciones: {},
            cantidad: 1,
            precioUnitario: producto.base
        };
        
        mostrarOpciones(producto, categoria);
    } catch (error) {
        console.error("Error:", error);
    }
}

// ==============================================
// MOSTRAR OPCIONES EN MODAL
// ==============================================
function mostrarOpciones(producto, categoria) {
    const modalTitulo = document.getElementById('modal-titulo');
    const modalBody = document.getElementById('modal-opciones-body');
    const btnConfirmar = document.getElementById('btn-confirmar');
    
    modalTitulo.textContent = productoSeleccionado.nombre;
    modalBody.innerHTML = '';
    btnConfirmar.disabled = true;
    btnConfirmar.onclick = null;

    // Generar HTML según categoría
    if (categoria === 'bebidas') {
        modalBody.innerHTML = `
            <div class="opcion-grupo">
                <h3>Alcohol:</h3>
                <button class="opcion-btn" data-tipo="alcohol" data-valor="sin">Sin alcohol (+$${producto.opciones.alcohol.sin})</button>
                <button class="opcion-btn" data-tipo="alcohol" data-valor="con">Con alcohol (+$${producto.opciones.alcohol.con})</button>
                <p class="advertencia">${producto.opciones.alcohol.advertencia}</p>
            </div>
            <div class="opcion-grupo" id="jelly-opciones" style="display:none;">
                <h3>Bubble Jelly:</h3>
                <button class="opcion-btn" data-tipo="jelly" data-valor="no">No (+$${producto.opciones.jelly.no})</button>
                <button class="opcion-btn" data-tipo="jelly" data-valor="si">Sí (+$${producto.opciones.jelly.si})</button>
            </div>
            <div class="cantidad-grupo">
                <h3>Cantidad:</h3>
                <div class="contador-cantidad">
                    <button class="btn-cantidad" data-accion="decrementar">-</button>
                    <span class="cantidad">1</span>
                    <button class="btn-cantidad" data-accion="incrementar">+</button>
                </div>
            </div>
        `;

        // Manejar selección de alcohol
        document.querySelectorAll('[data-tipo="alcohol"]').forEach(btn => {
            btn.addEventListener('click', () => {
                productoSeleccionado.opciones.alcohol = btn.dataset.valor;
                
                if (btn.dataset.valor === 'con' && !confirm(producto.opciones.alcohol.advertencia)) {
                    productoSeleccionado.opciones.alcohol = 'sin';
                    return;
                }
                
                document.getElementById('jelly-opciones').style.display = 'block';
                verificarConfirmacion();
            });
        });

        // Manejar selección de jelly
        document.querySelectorAll('[data-tipo="jelly"]').forEach(btn => {
            btn.addEventListener('click', () => {
                productoSeleccionado.opciones.jelly = btn.dataset.valor;
                actualizarPrecioUnitario(producto);
                verificarConfirmacion();
            });
        });

    } else if (categoria === 'tes' || categoria === 'cafes') {
        // ... (similar para otras categorías)
    }

    // Manejar cantidad
    document.querySelectorAll('.btn-cantidad').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cantidadElement = e.target.parentElement.querySelector('.cantidad');
            let cantidad = parseInt(cantidadElement.textContent);
            
            cantidad = e.target.dataset.accion === 'incrementar' ? cantidad + 1 : Math.max(1, cantidad - 1);
            cantidadElement.textContent = cantidad;
            productoSeleccionado.cantidad = cantidad;
        });
    });

    // Configurar botón confirmar
    btnConfirmar.onclick = () => {
        if (categoria === 'bebidas' && !productoSeleccionado.opciones.jelly) {
            alert('¡Selecciona si deseas Bubble Jelly!');
            return;
        }
        agregarAlCarrito();
        modalOpciones.style.display = 'none';
    };

    modalOpciones.style.display = 'block';
}

// ==============================================
// FUNCIONES AUXILIARES
// ==============================================
function actualizarPrecioUnitario(producto) {
    let precio = producto.base;
    
    if (productoSeleccionado.opciones.alcohol === 'con') {
        precio += producto.opciones.alcohol.con;
    }
    if (productoSeleccionado.opciones.jelly === 'si') {
        precio += producto.opciones.jelly.si;
    }
    
    productoSeleccionado.precioUnitario = precio;
}

function verificarConfirmacion() {
    const btnConfirmar = document.getElementById('btn-confirmar');
    const categoria = productoSeleccionado.categoria;
    
    if (categoria === 'bebidas') {
        btnConfirmar.disabled = !(productoSeleccionado.opciones.alcohol && productoSeleccionado.opciones.jelly);
    }
    // ... (lógica similar para otras categorías)
}

// ==============================================
// CARRITO DE COMPRAS
// ==============================================
function agregarAlCarrito() {
    const existe = carrito.findIndex(item => 
        item.nombre === productoSeleccionado.nombre &&
        JSON.stringify(item.opciones) === JSON.stringify(productoSeleccionado.opciones)
    );

    if (existe >= 0) {
        carrito[existe].cantidad += productoSeleccionado.cantidad;
    } else {
        carrito.push({...productoSeleccionado});
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
    alert(`${productoSeleccionado.nombre} agregado al carrito`);
}

function actualizarCarritoUI() {
    itemsCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item-carrito';
        
        let opcionesDesc = [];
        if (item.categoria === 'bebidas') {
            opcionesDesc.push(`Alcohol: ${item.opciones.alcohol === 'con' ? 'Con (INE requerida)' : 'Sin'}`);
            opcionesDesc.push(`Bubble Jelly: ${item.opciones.jelly === 'si' ? 'Sí' : 'No'}`);
        }
        // ... (similar para otras categorías)

        itemElement.innerHTML = `
            <div class="item-info">
                <strong>${item.nombre}</strong> (${item.cantidad}x)
                <div class="item-opciones">${opcionesDesc.join(' | ')}</div>
            </div>
            <div class="item-precio">
                $${(item.precioUnitario * item.cantidad).toFixed(2)}
                <button class="btn-eliminar" data-index="${index}">×</button>
            </div>
        `;

        itemsCarrito.appendChild(itemElement);
        total += item.precioUnitario * item.cantidad;
    });

    totalCarrito.textContent = total.toFixed(2);
    contadorCarrito.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);

    // Botones eliminar
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarritoUI();
        });
    });
}

function mostrarCarrito() {
    actualizarCarritoUI();
    modalCarrito.style.display = 'block';
}

// ==============================================
// WHATSAPP
// ==============================================
function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    let mensaje = `*PEDIDO - GOLDEN DRINKS*%0A%0A`;

    carrito.forEach(item => {
        mensaje += `*${item.nombre}* (${item.cantidad}x) - $${(item.precioUnitario * item.cantidad).toFixed(2)}%0A`;
        
        if (item.categoria === 'bebidas') {
            mensaje += `• Alcohol: ${item.opciones.alcohol === 'con' ? 'CON (INE requerida)' : 'SIN'}%0A`;
            mensaje += `• Bubble Jelly: ${item.opciones.jelly === 'si' ? 'SÍ' : 'NO'}%0A`;
        }
        // ... (opciones para otras categorías)

        mensaje += `%0A`;
    });

    mensaje += `*TOTAL: $${carrito.reduce((sum, item) => sum + (item.precioUnitario * item.cantidad), 0).toFixed(2)}*%0A%0A`;
    mensaje += `*DATOS DE PAGO*%0ACLABE: 0123 456 78901234567 8%0ATitular: Golden Drinks`;

    window.open(`https://wa.me/521234567890?text=${mensaje}`, '_blank');
}
