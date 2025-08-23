// ===== VARIABLES GLOBALES =====
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const MIN_PEDIDO = 3;
let lastTap = 0;

// ===== FUNCIÓN PARA CAMBIAR TEMA =====
function cambiarTema() {
    const body = document.body;
    if (body.classList.contains('theme-inferno')) {
        body.classList.remove('theme-inferno');
        body.classList.add('theme-paraiso');
        localStorage.setItem('tema', 'paraiso');
    } else {
        body.classList.remove('theme-paraiso');
        body.classList.add('theme-inferno');
        localStorage.setItem('tema', 'inferno');
    }
}

// ===== INICIALIZACIÓN DE TEMA =====
function inicializarTema() {
    const temaGuardado = localStorage.getItem('tema');
    const body = document.body;
    
    // Establecer tema inferno por defecto si no hay tema guardado
    if (!temaGuardado) {
        body.classList.add('theme-inferno');
        localStorage.setItem('tema', 'inferno');
    } else if (temaGuardado === 'paraiso') {
        body.classList.add('theme-paraiso');
    } else {
        body.classList.add('theme-inferno');
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
            descripcion: "Pacto con el diablo, tranquilo solo es suave café descafeinado 475ml",
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
            descripcion: "El misterio se devela hoy. ¿Será tu salvación o tu perdición? Atrevete to conocer el veredicto. Bebida del día 475ml",
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
document.addEventListener('DOMContentLoaded', function() {
    inicializarTema();
    renderizarProductos();
    actualizarCarritoUI();
    
    // Agregar evento de clic al título para cambiar tema
    const titulo = document.querySelector('.titulo-principal');
    if (titulo) {
        titulo.addEventListener('click', cambiarTema);
    }
});

// ===== EFECTO DE SCROLL PARALLAX =====
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const documentHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = scrollY / documentHeight;
    
    document.documentElement.style.setProperty('--scroll-porcentaje', scrollPercent);
    document.documentElement.style.setProperty('--opacidad-cielo', 1 - scrollPercent);
    document.documentElement.style.setProperty('--opacidad-infierno', scrollPercent);
});

// ===== FUNCIONES PRINCIPALES =====
function renderizarProductos() {
    for (const categoria in productos) {
        const container = document.getElementById(`${categoria}-container`);
        if (!container) continue;
        container.innerHTML = '';
        
        for (const productoNombre in productos[categoria]) {
            const producto = productos[categoria][productoNombre];
            const productoHTML = `
                <div class="producto-card">
                    <h3 data-producto="${productoNombre}">${productoNombre}</h3>
                    <p>${producto.descripcion}</p>
                    <div class="precio">$${producto.base}.00</div>
                    <button class="btn-seleccionar" onclick="mostrarOpciones('${categoria}', '${productoNombre}')">
                        SELECCIONAR
                    </button>
                </div>
            `;
            container.innerHTML += productoHTML;
        }
    }
}

function mostrarOpciones(categoria, productoNombre) {
    if (!tituloModal || !formularioOpciones || !modalOpciones) return;
    
    const producto = productos[categoria][productoNombre];
    tituloModal.textContent = productoNombre;
    formularioOpciones.innerHTML = '';
    
    for (const opcionTipo in producto.opciones) {
        const opcion = producto.opciones[opcionTipo];
        const opcionHTML = `
            <div class="opcion-grupo">
                <h3>${opcion.nombre || opcionTipo.toUpperCase()}</h3>
                ${Object.keys(opcion).filter(key => key !== 'nombre' && key !== 'advertencia').map(valor => {
                    const etiqueta = valor === 'sin' ? 'Sin' : 
                                   valor === 'con' ? 'Con' : 
                                   valor === 'no' ? 'No' : 
                                   valor === 'si' ? 'Sí' : 
                                   valor.charAt(0).toUpperCase() + valor.slice(1);
                    return `
                        <label>
                            <input type="radio" name="${opcionTipo}" value="${valor}" ${valor === 'sin' || valor === 'no' ? 'checked' : ''}>
                            ${etiqueta} (+$${opcion[valor]}.00)
                        </label>
                    `;
                }).join('')}
                ${opcion.advertencia ? `<div class="advertencia">${opcion.advertencia}</div>` : ''}
            </div>
        `;
        formularioOpciones.innerHTML += opcionHTML;
    }
    
    modalOpciones.dataset.categoria = categoria;
    modalOpciones.dataset.producto = productoNombre;
    modalOpciones.classList.remove('modal-oculto');
    document.body.style.overflow = 'hidden';
}

function confirmarSeleccion() {
    if (!modalOpciones || !modalOpciones.dataset.producto) return;
    
    const categoria = modalOpciones.dataset.categoria;
    const productoNombre = modalOpciones.dataset.producto;
    const producto = productos[categoria][productoNombre];
    
    const opcionesSeleccionadas = {};
    let precioExtra = 0;
    
    for (const opcionTipo in producto.opciones) {
        const selected = formularioOpciones.querySelector(`input[name="${opcionTipo}"]:checked`);
        if (selected) {
            opcionesSeleccionadas[opcionTipo] = selected.value;
            precioExtra += producto.opciones[opcionTipo][selected.value];
        }
    }
    
    const item = {
        nombre: productoNombre,
        categoria: categoria,
        precioBase: producto.base,
        opciones: opcionesSeleccionadas,
        precioExtra: precioExtra,
        cantidad: 1,
        total: producto.base + precioExtra
    };
    
    agregarAlCarrito(item);
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
    carrito.forEach((item, index) => {
        const itemHTML = `
            <div class="item-carrito">
                <h4>${item.nombre}</h4>
                <p>Base: $${item.precioBase}.00</p>
                <p>Extras: $${item.precioExtra}.00</p>
                <p>Total: $${item.total}.00</p>
                <button onclick="eliminarDelCarrito(${index})">ELIMINAR</button>
            </div>
        `;
        listaCarrito.innerHTML += itemHTML;
    });
    
    totalCarrito.textContent = `$${calcularTotal()}.00`;
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
    
    if (!modalUbicacion) return;
    
    const ubicacionContainer = modalUbicacion.querySelector('.ubicacion-info');
    if (ubicacionContainer) {
        ubicacionContainer.innerHTML = '';
        ubicaciones.forEach((ubicacion, index) => {
            ubicacionContainer.innerHTML += `
                <div class="direccion-clickeable" onclick="seleccionarUbicacion(${index})">
                    ${ubicacion.nombre}
                </div>
                <div class="horario-ubicacion">
                    ${ubicacion.horario}
                </div>
            `;
        });
    }
    
    modalUbicacion.classList.remove('modal-oculto');
    document.body.style.overflow = 'hidden';
}

function seleccionarUbicacion(index) {
    const ubicacion = ubicaciones[index];
    enviarPedidoFinal(ubicacion);
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
    
    let mensaje = "¡Hola! Quiero hacer mi pedido:\n\n";
    
    carrito.forEach((item, index) => {
        mensaje += `${index + 1}. ${item.nombre} - $${item.total}.00\n`;
        mensaje += `   Opciones: ${obtenerOpcionesTexto(item)}\n\n`;
    });
    
    mensaje += `Total: $${calcularTotal()}.00\n\n`;
    mensaje += `Ubicación: ${ubicacion.nombre}\n`;
    mensaje += `Dirección: ${ubicacion.direccion}\n\n`;
    mensaje += "¡Gracias!";
    
    const telefono = "5215512345678";
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    
    // Limpiar carrito después de enviar
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
    cerrarModalUbicacion();
}

// ===== AUXILIARES =====
function obtenerOpcionesTexto(item) {
    const extras = [];
    
    for (const opcion in item.opciones) {
        const valor = item.opciones[opcion];
        if (valor !== 'sin' && valor !== 'no') {
            extras.push(`${opcion}: ${valor}`);
        }
    }
    
    return extras.length > 0 ? extras.join(', ') : 'Sin extras';
}

function calcularSubtotal(item) {
    let extras = 0;
    
    for (const opcion in item.opciones) {
        const valor = item.opciones[opcion];
        if (productos[item.categoria] && productos[item.categoria][item.nombre]) {
            const opcionesProducto = productos[item.categoria][item.nombre].opciones;
            if (opcionesProducto && opcionesProducto[opcion]) {
                extras += opcionesProducto[opcion][valor] || 0;
            }
        }
    }
    
    return item.precioBase + extras;
}

function calcularTotal() {
    return carrito.reduce((total, item) => total + calcularSubtotal(item), 0);
}

// ===== FUNCIÓN PARA ABRIR GOOGLE MAPS =====
function abrirGoogleMaps() {
    const coordenadas = "19.4777778,-99.1169444";
    const url = `https://www.google.com/maps/search/?api=1&query=${coordenadas}`;
    window.open(url, '_blank');
}

// ===== DETECCIÓN DE DOBLE CLIC EN MÓVIL =====
document.addEventListener('touchend', function(e) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < 300 && tapLength > 0) {
        e.preventDefault();
        abrirGoogleMaps();
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
                <h2>Pedido Mínimo Requerido</h2>
                <p>Debes agregar al menos ${MIN_PEDIDO} artículos para realizar tu pedido.</p>
                <p>Actualmente tienes ${carrito.reduce((total, item) => total + (item.cantidad || 1), 0)} artículo(s) en tu carrito.</p>
                <button onclick="cerrarModalAdvertencia()">ENTENDIDO</button>
            </div>
        `;
        document.body.appendChild(modalAdvertencia);
    }
    
    modalAdvertencia.classList.remove('modal-oculto');
    document.body.style.overflow = 'hidden';
}

// ===== FUNCIÓN PARA CERRAR LA ADVERTENCIA =====
function cerrarModalAdvertencia() {
    const modalAdvertencia = document.getElementById('modal-advertencia');
    if (modalAdvertencia) {
        modalAdvertencia.classList.add('modal-oculto');
        document.body.style.overflow = 'auto';
    }
}

// Hacer funciones accesibles globalmente
window.eliminarDelCarrito = eliminarDelCarrito;
window.cerrarModalOpciones = cerrarModalOpciones;
window.cerrarModalCarrito = cerrarModalCarrito;
window.cerrarModalUbicacion = cerrarModalUbicacion;
window.cerrarModalAdvertencia = cerrarModalAdvertencia;
window.abrirGoogleMaps = abrirGoogleMaps;
window.mostrarOpciones = mostrarOpciones;
window.confirmarSeleccion = confirmarSeleccion;
window.mostrarCarrito = mostrarCarrito;
window.mostrarSeleccionUbicacion = mostrarSeleccionUbicacion;
window.seleccionarUbicacion = seleccionarUbicacion;
window.cambiarTema = cambiarTema;
