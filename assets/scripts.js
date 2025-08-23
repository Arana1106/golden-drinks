// ===== FUNCIÓN PARA ABRIR GOOGLE MAPS =====
function abrirGoogleMaps() {
    const coordenadas = "19.4777778,-99.1169444";
    const url = `https://www.google.com/maps/search/?api=1&query=${coordenadas}`;
    
    window.open(url, '_blank');
    
    const direccion = document.querySelector('.direccion-clickeable');
    direccion.style.background = 'rgba(0, 139, 0, 0.3)';
    direccion.style.borderLeft = '3px solid #00FF00';
    
    setTimeout(() => {
        direccion.style.background = 'rgba(139, 0, 0, 0.2)';
        direccion.style.borderLeft = '3px solid #FFD700';
    }, 1000);
}

// ===== DETECCIÓN DE DOBLE CLIC EN MÓVIL =====
let lastTap = 0;
document.addEventListener('touchend', function(e) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < 300 && tapLength > 0) {
        if (e.target.classList.contains('direccion-clickeable')) {
            abrirGoogleMaps();
        }
    }
    lastTap = currentTime;
});

// ===== FUNCIÓN PARA VERIFICAR PEDIDO MÍNIMO =====
function verificarPedidoMinimo() {
    const totalArticulos = carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
    
    if (totalArticulos < MIN_PEDIDO) {
        mostrarAdvertenciaPedidoMinimo();
        return false;
    }
    return true;
}

// ===== FUNCIÓN PARA MOSTRAR ADVERTENCIA =====
function mostrarAdvertenciaPedidoMinimo() {
    let modalAdvertencia = document.getElementById('modal-advertencia');
    
    if (!modalAdvertencia) {
        modalAdvertencia = document.createElement('div');
        modalAdvertencia.id = 'modal-advertencia';
        modalAdvertencia.className = 'modal modal-oculto';
        modalAdvertencia.innerHTML = `
            <div class="modal-contenido">
                <span class="cerrar-modal" onclick="cerrarModalAdvertencia()">&times;</span>
                <h3>🚫 PEDIDO MÍNIMO REQUERIDO</h3>
                <p>El pedido mínimo es de <strong>${MIN_PEDIDO} artículos</strong>.</p>
                <p>Actualmente tienes <span id="cantidad-actual" style="color: #FF0000; font-weight: bold;">0</span> artículos en tu carrito.</p>
                <p>¡Agrega más productos para continuar!</p>
                <div class="botones-advertencia">
                    <button onclick="cerrarModalAdvertencia()">ENTENDIDO</button>
                </div>
            </div>
        `;
        document.body.appendChild(modalAdvertencia);
    }
    
    const totalArticulos = carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
    document.getElementById('cantidad-actual').textContent = totalArticulos;
    
    modalAdvertencia.classList.remove('modal-oculto');
}

// ===== FUNCIÓN PARA CERRAR LA ADVERTENCIA =====
function cerrarModalAdvertencia() {
    const modalAdvertencia = document.getElementById('modal-advertencia');
    if (modalAdvertencia) {
        modalAdvertencia.classList.add('modal-oculto');
    }
}

// ===== DATOS DE PRODUCTOS =====
const productos = {
    bebidas: {
        "LEVIATAN": {
            descripcion: "Sumérgete en las profundidades de la tentación azul oscura. Sabor a mora azul que te arrastrará al abismo. 475ml",
            base: 50,
            opciones: {
                alcohol: { 
                    sin: 0, 
                    con: 15,
                    advertencia: "🚨 Se solicitará INE para Elixir Prohibido (Alcohol 2.5 oz)",
                    nombre: "Elixir Prohibido (Alcohol 2.5 oz)"
                },
                jelly: { 
                    no: 0, 
                    si: 15,
                    nombre: "Lágrimas de Demonio (Bubble Jelly)"
                }
            }
        },
        "INFERNO": {
            descripcion: "Pasión ardiente con sabor a frutos rojos 475ml",
            base: 50,
            opciones: {
                alcohol: { 
                    sin: 0, 
                    con: 15,
                    advertencia: "🚨 Se solicitará INE para Elixir Prohibido (Alcohol 2.5 oz)",
                    nombre: "Elixir Prohibido (Alcohol 2.5 oz)"
                },
                jelly: { 
                    no: 0, 
                    si: 15,
                    nombre: "Lágrimas de Demonio (Bubble Jelly)"
                }
            }
        },
        "JALURIA": {
            descripcion: "Entre más lo resistes más deseas probar su sabor a manzana verde con jengibre 475ml",
            base: 50,
            opciones: {
                alcohol: { 
                    sin: 0, 
                    con: 15,
                    advertencia: "🚨 Se solicitará INE para Elixir Prohibido (Alcohol 2.5 oz)",
                    nombre: "Elixir Prohibido (Alcohol 2.5 oz)"
                },
                jelly: { 
                    no: 0, 
                    si: 15,
                    nombre: "Lágrimas de Demonio (Bubble Jelly)"
                }
            }
        },
        "ASMODEO": {
            descripcion: "Te hará sentir la lujuria en un sorbo por su sabor a frutos del bosque 475ml",
            base: 50,
            opciones: {
                alcohol: { 
                    sin: 0, 
                    con: 15,
                    advertencia: "🚨 Se solicitará INE para Elixir Prohibido (Alcohol 2.5 oz)",
                    nombre: "Elixir Prohibido (Alcohol 2.5 oz)"
                },
                jelly: { 
                    no: 0, 
                    si: 15,
                    nombre: "Lágrimas de Demonio (Bubble Jelly)"
                }
            }
        }
    },
    cafes: {
        "IRA DIVINA": {
            descripcion: "Energía Divina toma un café deconstruido frío 475ml",
            base: 40,
            opciones: {
                leche: { 
                    sin: 0, 
                    con: 10,
                    deslactosada: 10
                },
                azucar: { 
                    sin: 0, 
                    con: 0, 
                    sustituto: 0 
                },
                coffee_bubble: { 
                    no: 0, 
                    si: 15,
                    nombre: "Gemas del Infierno (Coffee Jelly)"
                }
            }
        },
        "PACTUM": {
            descripcion: "Pacto con el diablo, tranquilo solo es un suave café descafeinado 475ml",
            base: 40,
            opciones: {
                leche: { 
                    sin: 0, 
                    con: 10,
                    deslactosada: 10
                },
                azucar: { 
                    sin: 0, 
                    con: 0, 
                    sustituto: 0 
                },
                coffee_bubble: { 
                    no: 0, 
                    si: 15,
                    nombre: "Gemas del Infierno (Coffee Jelly)"
                }
            }
        }
    },
    tes: {
        "REDENCIÓN": {
            descripcion: "Todos la buscamos, y todos la necesitamos su sabor en sus 475 ml",
            base: 35,
            opciones: {
                azucar: { 
                    sin: 0, 
                    con: 0, 
                    sustituto: 0 
                },
                jelly: { 
                    no: 0, 
                    si: 15,
                    nombre: "Lágrimas de Demonio (Bubble Jelly)"
                }
            }
        },
        "REVELACIÓN": {
            descripcion: "El misterio se devela hoy. ¿Será tu salvación o tu perdición? Atrevete to conocer el veredicto. 475ml",
            base: 35,
            opciones: {
                azucar: { 
                    sin: 0, 
                    con: 0, 
                    sustituto: 0 
                },
                jelly: { 
                    no: 0, 
                    si: 15,
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
        coordenadas: "19.4777778,-99.1169444"
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
let modalUbicacion = document.getElementById('modal-ubicacion');
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
    
    if (carritoBtn) carritoBtn.addEventListener('click', mostrarCarrito);
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            if (verificarPedidoMinimo()) {
                mostrarSeleccionUbicacion();
            }
        });
    }
    
    if (confirmarOpcionesBtn) confirmarOpcionesBtn.addEventListener('click', confirmarSeleccion);
    if (regresarModalBtn) regresarModalBtn.addEventListener('click', cerrarModalOpciones);
    if (seguirPidiendoBtn) seguirPidiendoBtn.addEventListener('click', cerrarModalCarrito);
    if (confirmarUbicacionBtn) confirmarUbicacionBtn.addEventListener('click', () => enviarPedidoFinal(ubicaciones[0]));
    
    if (regresarCarritoBtn) {
        regresarCarritoBtn.addEventListener('click', () => {
            cerrarModalUbicacion();
            setTimeout(() => {
                mostrarCarrito();
            }, 100);
        });
    }
    
    document.querySelectorAll('.cerrar-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.add('modal-oculto');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    const subtituloElement = document.querySelector('.subtitulo');
    if (subtituloElement) {
        subtituloElement.remove();
    }
});

// ===== FUNCIONES PRINCIPALES =====
function renderizarProductos() {
    for (const categoria in productos) {
        const container = document.getElementById(`${categoria}-container`);
        if (!container) continue;
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
            if (categoria && nombreProducto && productos[categoria] && productos[categoria][nombreProducto]) {
                mostrarOpciones({
                    nombre: nombreProducto,
                    categoria: categoria,
                    ...productos[categoria][nombreProducto]
                });
            }
        });
    });
}

function mostrarOpciones(producto) {
    if (!tituloModal || !formularioOpciones || !modalOpciones) return;
    
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
    if (!modalOpciones || !modalOpciones.dataset.producto) return;
    
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
    if (!listaCarrito || !totalCarrito || !modalCarrito) return;
    
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
    if (contadorCarrito) contadorCarrito.textContent = totalItems;
    if (whatsappBtn) {
        whatsappBtn.disabled = totalItems < MIN_PEDIDO;
        whatsappBtn.textContent = totalItems < MIN_PEDIDO 
            ? `MÍNIMO ${MIN_PEDIDO} PRODUCTOS` 
            : 'CONFIRMAR UBICACIÓN';
    }
}

// ===== UBICACIÓN =====
function mostrarSeleccionUbicacion() {
    if (!verificarPedidoMinimo()) {
        return;
    }

    if (modalUbicacion) {
        modalUbicacion.classList.remove('modal-oculto');
        document.body.style.overflow = 'hidden';
    }
}

function cerrarModalUbicacion() {
    if (modalUbicacion) {
        modalUbicacion.classList.add('modal-oculto');
        document.body.style.overflow = 'auto';
    }
}

function cerrarModalOpciones() {
    if (modalOpciones) {
        modalOpciones.classList.add('modal-oculto');
        document.body.style.overflow = 'auto';
    }
}

function cerrarModalCarrito() {
    if (modalCarrito) {
        modalCarrito.classList.add('modal-oculto');
        document.body.style.overflow = 'auto';
    }
}

// ===== WHATSAPP =====
function enviarPedidoFinal(ubicacion) {
    if (!verificarPedidoMinimo()) {
        return;
    }
    
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

    const mensajeCodificado = encodeURIComponent(mensaje)
        .replace(/\n/g, '%0A')
        .replace(/\*/g, '%2A');

    window.open(`https://wa.me/525611649344?text=${mensajeCodificado}`, '_blank');
    
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

function calcularTotal() {
    return carrito.reduce((total, item) => total + calcularSubtotal(item), 0);
}

// Hacer funciones accesibles globalmente
window.eliminarDelCarrito = eliminarDelCarrito;
window.cerrarModalOpciones = cerrarModalOpciones;
window.cerrarModalCarrito = cerrarModalCarrito;
window.cerrarModalUbicacion = cerrarModalUbicacion;
window.cerrarModalAdvertencia = cerrarModalAdvertencia;
window.abrirGoogleMaps = abrirGoogleMaps;
