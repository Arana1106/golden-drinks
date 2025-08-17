// ===== DATOS DE PRODUCTOS =====
const productos = {
    bebidas: {
        "Red Fire": {
            descripcion: "Bebida sabor frutos rojos 475ml",
            base: 35,
            opciones: {
                alcohol: { sin: 0, con: 10, advertencia: "🚨 Se solicitará INE para bebidas con alcohol" },
                jelly: { no: 0, si: 5 }
            }
        },
        "Green Corp": {
            descripcion: "Bebida sabor manzana verde 475ml",
            base: 35,
            opciones: {
                alcohol: { sin: 0, con: 10, advertencia: "🚨 Se solicitará INE para bebidas con alcohol" },
                jelly: { no: 0, si: 5 }
            }
        },
        "Dark Side": {
            descripcion: "Bebida sabor frutos del bosque 475ml",
            base: 35,
            opciones: {
                alcohol: { sin: 0, con: 10, advertencia: "🚨 Se solicitará INE para bebidas con alcohol" },
                jelly: { no: 0, si: 5 }
            }
        },
        "Blue Sea": {
            descripcion: "Bebida sabor blueberry 475ml",
            base: 35,
            opciones: {
                alcohol: { sin: 0, con: 10, advertencia: "🚨 Se solicitará INE para bebidas con alcohol" },
                jelly: { no: 0, si: 5 }
            }
        }
    },
    cafes: {
        "Café Remix": {
            descripcion: "Café deconstruido frío 475ml",
            base: 25,
            opciones: {
                leche: { sin: 0, con: 10, deslactosada: 10 },
                azucar: { sin: 0, con: 0, sustituto: 0 },
                coffee_bubble: { no: 0, si: 10 }
            }
        },
        "Café Descafeinado": {
            descripcion: "Café descafeinado frío 475ml",
            base: 25,
            opciones: {
                leche: { sin: 0, con: 10, deslactosada: 10 },
                azucar: { sin: 0, con: 0, sustituto: 0 },
                coffee_bubble: { no: 0, si: 10 }
            }
        }
    },
    tes: {
        "Té del Día": {
            descripcion: "Clásico té del día frío 475ml",
            base: 25,
            opciones: {
                azucar: { sin: 0, con: 0, sustituto: 0 },
                jelly: { no: 0, si: 5 }
            }
        },
        "Bebida del Día": {
            descripcion: "Pregunta por los sabores 475ml",
            base: 25,
            opciones: {
                azucar: { sin: 0, con: 0, sustituto: 0 },
                jelly: { no: 0, si: 5 }
            }
        }
    }
};

// ===== UBICACIONES =====
const ubicaciones = [
    {
        nombre: "Calle Coral 120",
        direccion: "Calle Coral 120, colonia Estrella, CDMX",
        horario: "Lunes a Jueves: 4:00 PM - 9:00 PM | Viernes: 4:00 PM - 1:00 AM | Sábado: 11:00 AM - 2:00 AM | Domingo: 10:00 AM - 7:00 PM",
        coordenadas: "19.4326,-99.1332",
        iframe: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.888348679687!2d-99.1353827!3d19.4326077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f92b75aa014d%3A0x9a5f5e5e5e5e5e5e!2sCalle%20Coral%20120!5e0!3m2!1sen!2smx!4v1620000000000!5m2!1sen!2smx" width="100%" height="200" style="border:0;" allowfullscreen loading="lazy"></iframe>`
    }
];

// ===== VARIABLES GLOBALES =====
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const MIN_PEDIDO = 4;

// ===== ELEMENTOS DEL DOM =====
const carritoBtn = document.getElementById('carrito-btn');
const contadorCarrito = document.getElementById('contador');
const modalCarrito = document.getElementById('modal-carrito');
const modalOpciones = document.getElementById('modal-opciones');
const cerrarModalCarritoBtn = document.getElementById('cerrar-carrito');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const whatsappBtn = document.getElementById('whatsapp-btn');
const seguirPidiendoBtn = document.getElementById('seguir-pidiendo');
const confirmarOpcionesBtn = document.getElementById('confirmar-opciones');
const regresarModalBtn = document.getElementById('regresar-modal');
const tituloModal = document.getElementById('titulo-modal');
const formularioOpciones = document.getElementById('formulario-opciones');
const cerrarModalOpcionesBtn = document.querySelector('#modal-opciones .cerrar-modal');

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarCarritoUI();
    
    // Event listeners
    carritoBtn.addEventListener('click', mostrarCarrito);
    cerrarModalCarritoBtn.addEventListener('click', cerrarModalCarrito);
    whatsappBtn.addEventListener('click', enviarWhatsApp);
    confirmarOpcionesBtn.addEventListener('click', confirmarSeleccion);
    regresarModalBtn.addEventListener('click', cerrarModalOpciones);
    cerrarModalOpcionesBtn.addEventListener('click', cerrarModalOpciones);
    seguirPidiendoBtn.addEventListener('click', cerrarModalCarrito);
});

// ===== FUNCIONES PRINCIPALES =====
function renderizarProductos() {
    for (const categoria in productos) {
        const container = document.getElementById(`${categoria}-container`);
        container.innerHTML = '';

        for (const nombreProducto in productos[categoria]) {
            const producto = productos[categoria][nombreProducto];
            const card = document.createElement('div');
            card.className = 'producto-card';
            card.innerHTML = `
                <h3 data-producto="${nombreProducto}">${nombreProducto}</h3>
                <p>${producto.descripcion}</p>
                <p class="precio">$${producto.base} MXN</p>
                <button class="btn-seleccionar" 
                        data-categoria="${categoria}"
                        data-producto="${nombreProducto}">
                    Seleccionar
                </button>
            `;
            container.appendChild(card);
        }
    }

    document.querySelectorAll('.btn-seleccionar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const categoria = e.target.getAttribute('data-categoria');
            const nombreProducto = e.target.getAttribute('data-producto');
            mostrarOpciones({
                nombre: nombreProducto,
                categoria: categoria,
                ...productos[categoria][nombreProducto]
            });
        });
    });
}

function mostrarOpciones(producto) {
    tituloModal.textContent = producto.nombre;
    formularioOpciones.innerHTML = '';

    if (producto.categoria === 'bebidas') {
        formularioOpciones.innerHTML = `
            <div class="opcion-grupo">
                <h3>Alcohol:</h3>
                <label><input type="radio" name="alcohol" value="sin" checked> Sin (+$${producto.opciones.alcohol.sin})</label>
                <label><input type="radio" name="alcohol" value="con"> Con (+$${producto.opciones.alcohol.con})</label>
                <p class="advertencia">${producto.opciones.alcohol.advertencia}</p>
            </div>
            <div class="opcion-grupo">
                <h3>Bubble Jelly:</h3>
                <label><input type="radio" name="jelly" value="no" checked> No (+$${producto.opciones.jelly.no})</label>
                <label><input type="radio" name="jelly" value="si"> Sí (+$${producto.opciones.jelly.si})</label>
            </div>
        `;
    } else if (producto.categoria === 'tes') {
        formularioOpciones.innerHTML = `
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
        formularioOpciones.innerHTML = `
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

    modalOpciones.classList.remove('modal-oculto');
    document.body.style.overflow = 'hidden';
    modalOpciones.dataset.producto = JSON.stringify(producto);
}

function confirmarSeleccion() {
    const producto = JSON.parse(modalOpciones.dataset.producto);
    const opciones = {
        alcohol: formularioOpciones.querySelector('input[name="alcohol"]:checked')?.value,
        jelly: formularioOpciones.querySelector('input[name="jelly"]:checked')?.value,
        azucar: formularioOpciones.querySelector('input[name="azucar"]:checked')?.value,
        leche: formularioOpciones.querySelector('input[name="leche"]:checked')?.value,
        coffee_bubble: formularioOpciones.querySelector('input[name="coffee_bubble"]:checked')?.value
    };

    agregarAlCarrito({
        ...producto,
        seleccion: opciones,
        cantidad: 1
    });
}

// ===== CARRITO =====
function agregarAlCarrito(item) {
    carrito.push(item);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
    cerrarModalOpciones();
}

function mostrarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        const subtotal = calcularSubtotal(item);
        total += subtotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'item-carrito';
        itemElement.innerHTML = `
            <h4>${item.nombre} x${item.cantidad || 1}</h4>
            <p>${obtenerOpcionesTexto(item)}</p>
            <p>Subtotal: $${subtotal} MXN</p>
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        listaCarrito.appendChild(itemElement);
    });

    totalCarrito.textContent = `Total: $${total} MXN`;
    modalCarrito.classList.remove('modal-oculto');
    document.body.style.overflow = 'hidden';
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
    mostrarCarrito();
}

function actualizarCarritoUI() {
    const totalItems = carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
    contadorCarrito.textContent = totalItems;
    whatsappBtn.disabled = totalItems < MIN_PEDIDO;
}

// ===== WHATSAPP =====
function enviarWhatsApp() {
    const totalItems = carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
    if (totalItems < MIN_PEDIDO) {
        alert(`¡Pedido mínimo de ${MIN_PEDIDO} productos! Actual: ${totalItems}`);
        return;
    }

    const modalComprobante = crearModalPersonalizado(`
        <h3>⏰ ¡Adjunta tu comprobante! ⏰</h3>
        <p class="instruccion-transferencia">⚠️ <strong>INSTRUCCIÓN:</strong> Al transferir, usa <u>TU NOMBRE</u> como concepto.</p>
        <button id="continuar-comprobante">CONTINUAR</button>
    `);

    document.getElementById('continuar-comprobante').addEventListener('click', () => {
        modalComprobante.remove();
        mostrarSeleccionUbicacion();
    });
}

function mostrarSeleccionUbicacion() {
    let opcionesUbicacion = ubicaciones.map(ubicacion => `
        <div class="ubicacion-card" data-coords="${ubicacion.coordenadas}">
            <h4>${ubicacion.nombre}</h4>
            <p>${ubicacion.direccion}</p>
            <p>🕒 ${ubicacion.horario}</p>
            ${ubicacion.iframe}
        </div>
    `).join('');

    const modalUbicacion = crearModalPersonalizado(`
        <h3>📍 Selecciona tu punto de recolección</h3>
        <div class="ubicaciones-container">${opcionesUbicacion}</div>
    `);

    document.querySelectorAll('.ubicacion-card').forEach(card => {
        card.addEventListener('click', () => confirmarUbicacion(ubicaciones.find(u => u.coordenadas === card.dataset.coords)));
    });
}

function confirmarUbicacion(ubicacion) {
    const ahora = new Date();
    const horaActual = ahora.getHours();
    const diaActual = ahora.getDay(); // 0=Domingo, 1=Lunes...
    let horarioValido = false;

    // Validación de horarios actualizada
    if (diaActual >= 1 && diaActual <= 4) { // Lunes-Jueves
        horarioValido = horaActual >= 16 && horaActual < 21; // 4PM - 9PM
    } else if (diaActual === 5) { // Viernes
        horarioValido = (horaActual >= 16 && horaActual < 24) || horaActual === 0; // 4PM - 1AM
    } else if (diaActual === 6) { // Sábado
        horarioValido = (horaActual >= 11 && horaActual < 24) || horaActual < 2; // 11AM - 2AM
    } else { // Domingo
        horarioValido = horaActual >= 10 && horaActual < 19; // 10AM - 7PM
    }

    if (!horarioValido) {
        const modalError = crearModalPersonalizado(`
            <span class="cerrar-modal">&times;</span>
            <h3>⌛ ¡FUERA DE HORARIO! ⌛</h3>
            <p>${ubicacion.nombre} está cerrado ahora.</p>
            <p>Intenta con otra ubicación 😋</p>
        `);
        modalError.querySelector('.cerrar-modal').onclick = () => modalError.remove();
        return;
    }

    const modalConfirmacion = crearModalPersonalizado(`
        <h3>¿Confirmas esta ubicación?</h3>
        <p>${ubicacion.direccion}</p>
        ${ubicacion.iframe}
        <div class="scroll-text">Desliza para confirmar 👇</div>
        <div class="confirmar-botones">
            <button id="confirmar-si" class="btn-dorado">SÍ</button>
            <button id="confirmar-no">NO</button>
        </div>
    `);

    document.getElementById('confirmar-si').onclick = () => {
        modalConfirmacion.remove();
        enviarPedidoFinal(ubicacion);
    };

    document.getElementById('confirmar-no').onclick = () => {
        modalConfirmacion.remove();
        mostrarSeleccionUbicacion();
    };
}

function enviarPedidoFinal(ubicacion) {
    let mensaje = `*PEDIDO GOLDEN DRINKS*%0A%0A` +
        `*Recoger en:* ${ubicacion.direccion}%0A` +
        `*Hora:* ${new Date().toLocaleString()}%0A%0A` +
        `*Pedido:*%0A${carrito.map(item => 
            `- ${item.nombre} x${item.cantidad || 1} (${obtenerOpcionesTexto(item)}) - $${calcularSubtotal(item)} MXN`
        ).join('%0A')}%0A%0A` +
        `*TOTAL: $${calcularTotal()} MXN*%0A%0A` +
        `*Datos bancarios*%0A` +
        `Titular: Eric Daniel Gutiérrez Arana%0A` +
        `CLABE: 012 261 01584933343 3 (BBVA)%0A%0A` +
        `*INSTRUCCIÓN:*%0A` +
        `📸 Adjunta el comprobante con <strong>TU NOMBRE</strong> como concepto.`;

    window.open(`https://wa.me/525611649344?text=${encodeURIComponent(mensaje)}`, '_blank');
}

// ===== FUNCIONES AUXILIARES =====
function crearModalPersonalizado(html) {
    const modal = document.createElement('div');
    modal.className = 'modal-contenido';
    modal.innerHTML = html;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    return modal;
}

function obtenerOpcionesTexto(item) {
    const extras = [];
    
    if (item.categoria === 'bebidas') {
        extras.push(item.seleccion.alcohol === 'con' ? 'Con alcohol' : 'Sin alcohol');
        extras.push(item.seleccion.jelly === 'si' ? 'Con jelly' : 'Sin jelly');
    } 
    else if (item.categoria === 'tes') {
        extras.push(
            item.seleccion.azucar === 'con' ? 'Con azúcar' : 
            item.seleccion.azucar === 'sustituto' ? 'Con sustituto' : 'Sin azúcar'
        );
        extras.push(item.seleccion.jelly === 'si' ? 'Con jelly' : 'Sin jelly');
    } 
    else if (item.categoria === 'cafes') {
        extras.push(
            item.seleccion.leche === 'con' ? 'Con leche' : 
            item.seleccion.leche === 'deslactosada' ? 'Con leche deslactosada' : 'Sin leche'
        );
        extras.push(
            item.seleccion.azucar === 'con' ? 'Con azúcar' : 
            item.seleccion.azucar === 'sustituto' ? 'Con sustituto' : 'Sin azúcar'
        );
        extras.push(item.seleccion.coffee_bubble === 'si' ? 'Con coffee bubble' : 'Sin coffee bubble');
    }

    return extras.join(', ');
}

function calcularSubtotal(item) {
    let extras = 0;
    
    if (item.categoria === 'bebidas') {
        extras += item.seleccion.alcohol === 'con' ? item.opciones.alcohol.con : 0;
        extras += item.seleccion.jelly === 'si' ? item.opciones.jelly.si : 0;
    } 
    else if (item.categoria === 'tes') {
        extras += item.seleccion.jelly === 'si' ? item.opciones.jelly.si : 0;
    } 
    else if (item.categoria === 'cafes') {
        extras += item.seleccion.leche === 'con' ? item.opciones.leche.con : 
                 item.seleccion.leche === 'deslactosada' ? item.opciones.leche.deslactosada : 0;
        extras += item.seleccion.coffee_bubble === 'si' ? item.opciones.coffee_bubble.si : 0;
    }

    return (item.base + extras) * (item.cuantidad || 1);
}

function calcularTotal() {
    return carrito.reduce((total, item) => total + calcularSubtotal(item), 0);
}

function cerrarModalOpciones() {
    modalOpciones.classList.add('modal-oculto');
    document.body.style.overflow = 'auto';
}

function cerrarModalCarrito() {
    modalCarrito.classList.add('modal-oculto');
    document.body.style.overflow = 'auto';
}

// Hacer funciones accesibles globalmente
window.eliminarDelCarrito = eliminarDelCarrito;

