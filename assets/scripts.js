// ===== DATOS DE PRODUCTOS SINNER'S - PRECIOS CORREGIDOS =====
const productos = {
    bebidas: {
        "LEVIATAN": {
            descripcion: "Sumérgete en las profundidades de la tentación azul oscura. Sabor a mora azul que te arrastrará al abismo. 475ml",
            base: 50, // Corregido: 50 pesos
            opciones: {
                alcohol: { 
                    sin: 0, 
                    con: 15, // Corregido: 15 pesos
                    advertencia: "🚨 Se solicitará INE para Elixir Prohibido (Alcohol 2.5 oz)",
                    nombre: "Elixir Prohibido (Alcohol 2.5 oz)"
                },
                jelly: { 
                    no: 0, 
                    si: 15, // 15 pesos
                    nombre: "Lágrimas de Demonio (Bubble Jelly)"
                }
            }
        },
        "INFERNO": {
            descripcion: "Pasión ardiente con sabor a frutos rojos 475ml",
            base: 50, // Corregido: 50 pesos
            opciones: {
                alcohol: { 
                    sin: 0, 
                    con: 15, // Corregido: 15 pesos
                    advertencia: "🚨 Se solicitará INE para Elixir Prohibido (Alcohol 2.5 oz)",
                    nombre: "Elixir Prohibido (Alcohol 2.5 oz)"
                },
                jelly: { 
                    no: 0, 
                    si: 15, // 15 pesos
                    nombre: "Lágrimas de Demonio (Bubble Jelly)"
                }
            }
        },
        "JALURIA": {
            descripcion: "Entre más lo resistes más deseas probar su sabor a manzana verde con jengibre 475ml",
            base: 50, // 50 pesos (correcto)
            opciones: {
                alcohol: { 
                    sin: 0, 
                    con: 15, // Corregido: 15 pesos
                    advertencia: "🚨 Se solicitará INE para Elixir Prohibido (Alcohol 2.5 oz)",
                    nombre: "Elixir Prohibido (Alcohol 2.5 oz)"
                },
                jelly: { 
                    no: 0, 
                    si: 15, // 15 pesos
                    nombre: "Lágrimas de Demonio (Bubble Jelly)"
                }
            }
        },
        "ASMODEO": {
            descripcion: "Te hará sentir la lujuria en un sorbo por su sabor a frutos del bosque 475ml",
            base: 50, // Corregido: 50 pesos
            opciones: {
                alcohol: { 
                    sin: 0, 
                    con: 15, // Corregido: 15 pesos
                    advertencia: "🚨 Se solicitará INE para Elixir Prohibido (Alcohol 2.5 oz)",
                    nombre: "Elixir Prohibido (Alcohol 2.5 oz)"
                },
                jelly: { 
                    no: 0, 
                    si: 15, // 15 pesos
                    nombre: "Lágrimas de Demonio (Bubble Jelly)"
                }
            }
        }
    },
    cafes: {
        "IRA DIVINA": {
            descripcion: "Energía Divina toma un café deconstruido frío 475ml",
            base: 45, // 45 pesos (se mantiene)
            opciones: {
                leche: { 
                    sin: 0, 
                    con: 10, // 10 pesos (correcto)
                    deslactosada: 10 // 10 pesos (correcto)
                },
                azucar: { 
                    sin: 0, 
                    con: 0, 
                    sustituto: 0 
                },
                coffee_bubble: { 
                    no: 0, 
                    si: 15, // Corregido: 15 pesos (Gemas del Infierno)
                    nombre: "Gemas del Infierno (Coffee Jelly)"
                }
            }
        },
        "PACTUM": {
            descripcion: "Pacto con el diablo, tranquilo solo es un suave café descafeinado 475ml",
            base: 40, // 40 pesos (se mantiene)
            opciones: {
                leche: { 
                    sin: 0, 
                    con: 10, // 10 pesos (correcto)
                    deslactosada: 10 // 10 pesos (correcto)
                },
                azucar: { 
                    sin: 0, 
                    con: 0, 
                    sustituto: 0 
                },
                coffee_bubble: { 
                    no: 0, 
                    si: 15, // Corregido: 15 pesos (Gemas del Infierno)
                    nombre: "Gemas del Infierno (Coffee Jelly)"
                }
            }
        }
    },
    tes: {
        "REDENCIÓN": {
            descripcion: "Todos la buscamos, y todos la necesitamos su sabor en sus 475 ml",
            base: 35, // Corregido: 35 pesos
            opciones: {
                azucar: { 
                    sin: 0, 
                    con: 0, 
                    sustituto: 0 
                },
                jelly: { 
                    no: 0, 
                    si: 15, // 15 pesos
                    nombre: "Lágrimas de Demonio (Bubble Jelly)"
                }
            }
        },
        "REVELACIÓN": {
            descripcion: "El misterio se devela hoy. ¿Será tu salvación o tu perdición? Atrevete a conocer el veredicto. 475ml",
            base: 35, // Corregido: 35 pesos
            opciones: {
                azucar: { 
                    sin: 0, 
                    con: 0, 
                    sustituto: 0 
                },
                jelly: { 
                    no: 0, 
                    si: 15, // 15 pesos
                    nombre: "Lágrimas de Demonio (Bubble Jelly)"
                }
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
        iframe: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15050.55127400031!2d-99.1332!3d19.4326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI1JzU3LjQiTiA5OcKwMDgnMDAuMCJX!5e0!3m2!1sen!2smx!4v1620000000000!5m2!1sen!2smx" width="100%" height="300" style="border:0;" allowfullscreen loading="lazy"></iframe>`
    }
];

// ===== VARIABLES GLOBALES =====
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const MIN_PEDIDO = 3;

// ===== ELEMENTOS DEL DOM =====
const carritoBtn = document.getElementById('carrito-btn');
const contadorCarrito = document.getElementById('contador');
const modalCarrito = document.getElementById('modal-carrito');
const modalOpciones = document.getElementById('modal-opciones');
const modalUbicacion = document.getElementById('modal-ubicacion');
const cerrarModalCarritoBtn = document.getElementById('cerrar-carrito');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const whatsappBtn = document.getElementById('whatsapp-btn');
const seguirPidiendoBtn = document.getElementById('seguir-pidiendo');
const confirmarOpcionesBtn = document.getElementById('confirmar-opciones');
const regresarModalBtn = document.getElementById('regresar-modal');
const tituloModal = document.getElementById('titulo-modal');
const formularioOpciones = document.getElementById('formulario-opciones');
const confirmarUbicacionBtn = document.getElementById('confirmar-ubicacion');
const regresarCarritoBtn = document.getElementById('regresar-carrito');

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarCarritoUI();
    
    // Event listeners
    carritoBtn.addEventListener('click', mostrarCarrito);
    whatsappBtn.addEventListener('click', mostrarSeleccionUbicacion);
    confirmarOpcionesBtn.addEventListener('click', confirmarSeleccion);
    regresarModalBtn.addEventListener('click', cerrarModalOpciones);
    seguirPidiendoBtn.addEventListener('click', cerrarModalCarrito);
    confirmarUbicacionBtn?.addEventListener('click', () => enviarPedidoFinal(ubicaciones[0]));
    regresarCarritoBtn?.addEventListener('click', () => {
        cerrarModalUbicacion();
        mostrarCarrito();
if (!validarHorarioUbicacion(ubicacion)) {
    return;
}
    });
    
    // Cerrar modales al hacer clic en la X
    document.querySelectorAll('.cerrar-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal-contenido').parentElement;
            modal.classList.add('modal-oculto');
            document.body.style.overflow = 'auto';
        });
    });
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
                <h3>${producto.opciones.alcohol.nombre}:</h3>
                <label><input type="radio" name="alcohol" value="sin" checked> Sin (+$${producto.opciones.alcohol.sin})</label>
                <label><input type="radio" name="alcohol" value="con"> Con (+$${producto.opciones.alcohol.con})</label>
                <p class="advertencia">${producto.opciones.alcohol.advertencia}</p>
            </div>
            <div class="opcion-grupo">
                <h3>${producto.opciones.jelly.nombre}:</h3>
                <label><input type="radio" name="jelly" value="no" checked> No (+$${producto.opciones.jelly.no})</label>
                <label><input type="radio" name="jelly" value="si"> Sí (+$${producto.opciones.jelly.si})</label>
            </div>
        `;
    } else if (producto.categoria === 'tes') {
        formularioOpciones.innerHTML = `
            <div class="opcion-grupo">
                <h3>Endulzante:</h3>
                <label><input type="radio" name="azucar" value="sin" checked> Sin</label>
                <label><input type="radio" name="azucar" value="con"> Con</label>
                <label><input type="radio" name="azucar" value="sustituto"> Sustituto</label>
            </div>
            <div class="opcion-grupo">
                <h3>${producto.opciones.jelly.nombre}:</h3>
                <label><input type="radio" name="jelly" value"no" checked> No (+$${producto.opciones.jelly.no})</label>
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
                <h3>Endulzante:</h3>
                <label><input type="radio" name="azucar" value="sin" checked> Sin</label>
                <label><input type="radio" name="azucar" value="con"> Con</label>
                <label><input type="radio" name="azucar" value="sustituto"> Sustituto</label>
            </div>
            <div class="opcion-grupo">
                <h3>${producto.opciones.coffee_bubble.nombre}:</h3>
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
    
    // Actualizar el texto del botón para mostrar el mínimo requerido
    if (whatsappBtn) {
        whatsappBtn.textContent = totalItems < MIN_PEDIDO 
            ? `MÍNIMO ${MIN_PEDIDO} PRODUCTOS` 
            : 'CONFIRMAR UBICACIÓN';
    }
}

// ===== UBICACIÓN =====
function mostrarSeleccionUbicacion() {
    const totalItems = carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
    if (totalItems < MIN_PEDIDO) {
        alert(`¡PEDIDO MÍNIMO DE ${MIN_PEDIDO} PRODUCTOS! Actual: ${totalItems}`);
        return;
    }

    modalUbicacion.classList.remove('modal-oculto');
    document.body.style.overflow = 'hidden';
    
    // Configurar interacción con el mapa
    const direccion = document.querySelector('.direccion-clickeable');
    const mapa = document.getElementById('mapa-container');
    
    direccion.addEventListener('click', () => {
        mapa.style.display = mapa.style.display === 'none' ? 'block' : 'none';
    });
    
    direccion.addEventListener('dblclick', () => {
        mapa.style.display = 'none';
    });
}

function cerrarModalUbicacion() {
    modalUbicacion.classList.add('modal-oculto');
    document.body.style.overflow = 'auto';
}

// ===== WHATSAPP =====
function enviarPedidoFinal(ubicacion) {
    const totalItems = carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
    if (totalItems < MIN_PEDIDO) {
        alert(`¡PEDIDO MÍNIMO DE ${MIN_PEDIDO} PRODUCTOS! Actual: ${totalItems}`);
        return;
    }
    
    // Formatear lista de productos
    const listaProductos = carrito.map(item => 
        `▪ ${item.nombre} x${item.cantidad || 1}\n` +
        `  - ${obtenerOpcionesTexto(item)}\n` +
        `  - $${calcularSubtotal(item)} MXN`
    ).join('\n\n');

    const mensaje = `*PEDIDO SINNER'S* 🔥\n\n` +
        `📍 *Recoger en:* ${ubicacion.direccion}\n` +
        `🕒 *Hora:* ${new Date().toLocaleString()}\n\n` +
        `📋 *Pedido:*\n${listaProductos}\n\n` +
        `💰 *TOTAL: $${calcularTotal()} MXN*\n\n` +
        `🏦 *Datos bancarios*\n` +
        `Titular: Eric Daniel Gutiérrez Arana\n` +
        `CLABE: 012 261 01584933343 3 (BBVA)\n\n` +
        `📸 *INSTRUCCIÓN:*\n` +
        `Adjunta el comprobante con TU NOMBRE como concepto`;

    // Codificar correctamente para WhatsApp
    const mensajeCodificado = encodeURIComponent(mensaje)
        .replace(/\n/g, '%0A')  // Saltos de línea
        .replace(/\*/g, '%2A'); // Asteriscos para negritas

    window.open(`https://wa.me/525611649344?text=${mensajeCodificado}`, '_blank');
    
    // Limpiar carrito después del pedido
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
    cerrarModalUbicacion();
}

// ===== FUNCIONES AUXILIARES =====
function obtenerOpcionesTexto(item) {
    const extras = [];
    
    if (item.categoria === 'bebidas') {
        extras.push(item.seleccion.alcohol === 'con' ? 'Con Elixir Prohibido (Alcohol 2.5 oz)' : 'Sin Elixir Prohibido');
        extras.push(item.seleccion.jelly === 'si' ? 'Con Lágrimas de Demonio (Bubble Jelly)' : 'Sin Lágrimas de Demonio');
    } 
    else if (item.categoria === 'tes') {
        extras.push(
            item.seleccion.azucar === 'con' ? 'Con azúcar' : 
            item.seleccion.azucar === 'sustituto' ? 'Con sustituto' : 'Sin azúcar'
        );
        extras.push(item.seleccion.jelly === 'si' ? 'Con Lágrimas de Demonio (Bubble Jelly)' : 'Sin Lágrimas de Demonio');
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
        extras.push(item.seleccion.coffee_bubble === 'si' ? 'Con Gemas del Infierno (Coffee Jelly)' : 'Sin Gemas del Infierno');
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

    return (item.base + extras) * (item.cantidad || 1);
}

function validarHorarioUbicacion(ubicacion) {
    const ahora = new Date();
    const horaActual = ahora.getHours();
    const diaActual = ahora.getDay();
    let horarioValido = false;

    if (diaActual >= 1 && diaActual <= 4) { // Lunes-Jueves
        horarioValido = horaActual >= 16 && horaActual < 21;
    } else if (diaActual === 5) { // Viernes
        horarioValido = (horaActual >= 16 && horaActual < 24) || horaActual === 0;
    } else if (diaActual === 6) { // Sábado
        horarioValido = (horaActual >= 11 && horaActual < 24) || horaActual < 2;
    } else { // Domingo
        horarioValido = horaActual >= 10 && horaActual < 19;
    }

    if (!horarioValido) {
        const modalError = document.createElement('div');
        modalError.className = 'modal-contenido';
        modalError.innerHTML = `
            <span class="cerrar-modal">&times;</span>
            <h3>⌛ ¡FUERA DE HORARIO! ⌛</h3>
            <p>${ubicacion.nombre} está cerrado en este momento.</p>
            <p>Horario: ${ubicacion.horario}</p>
            <p>Intenta con otra ubicación 😋</p>
        `;
        document.body.appendChild(modalError);
        
        modalError.querySelector('.cerrar-modal').addEventListener('click', () => {
            modalError.remove();
        });
        
        return false;
    }
    return true;
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

