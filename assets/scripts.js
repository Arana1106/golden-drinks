// ===== VARIABLES GLOBALES ===== 
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const MIN_PEDIDO = 3;
let lastTap = 0;
let lastTitleTap = 0;
let ubicacionSeleccionada = null;

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
const modalUbicacion = document.getElementById('modal-ubicacion');
const modalAdvertencia = document.getElementById('modal-advertencia');
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
const ubicacionLista = document.getElementById('ubicacion-lista');
const cerrarAdvertenciaBtn = document.getElementById('cerrar-advertencia');

// ===== FUNCIÓN PARA CAMBIAR TEMA CON DOBLE CLIC =====
function manejarClicTitulo() {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTitleTap;
    
    if (tapLength < 300 && tapLength > 0) {
        cambiarTema();
    }
    
    lastTitleTap = currentTime;
}

function cambiarTema() {
    const body = document.body;
    if (body.classList.contains('tema-paraiso')) {
        body.classList.remove('tema-paraiso');
        localStorage.setItem('tema', 'inferno');
        // Efecto visual de transición
        mostrarNotificacionTema('Modo Infierno activado');
    } else {
        body.classList.add('tema-paraiso');
        localStorage.setItem('tema', 'paraiso');
        // Efecto visual de transición
        mostrarNotificacionTema('Modo Paraíso activado');
    }
    
    // Actualizar elementos que puedan necesitar cambio visual
    actualizarInterfazTema();
}

function mostrarNotificacionTema(mensaje) {
    // Crear notificación temporal
    const notificacion = document.createElement('div');
    notificacion.style.position = 'fixed';
    notificacion.style.top = '20px';
    notificacion.style.left = '50%';
    notificacion.style.transform = 'translateX(-50%)';
    notificacion.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    notificacion.style.color = '#ffd700';
    notificacion.style.padding = '10px 20px';
    notificacion.style.borderRadius = '5px';
    notificacion.style.zIndex = '10000';
    notificacion.style.fontFamily = "'Cinzel', serif";
    notificacion.style.fontSize = '14px';
    notificacion.style.opacity = '0';
    notificacion.style.transition = 'opacity 0.3s ease';
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);
    
    // Animación de entrada
    setTimeout(() => {
        notificacion.style.opacity = '1';
    }, 10);
    
    // Animación de salida después de 2 segundos
    setTimeout(() => {
        notificacion.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 2000);
}

function actualizarInterfazTema() {
    // Actualizar colores de elementos específicos si es necesario
    const esTemaParaiso = document.body.classList.contains('tema-paraiso');
    
    // Actualizar botones de selección según el tema
    const botonesSeleccionar = document.querySelectorAll('.btn-seleccionar');
    botonesSeleccionar.forEach(boton => {
        if (esTemaParaiso) {
            boton.style.boxShadow = '0 0 12px rgba(0, 112, 192, 0.5)';
        } else {
            boton.style.boxShadow = '0 0 12px rgba(139, 0, 0, 0.5)';
        }
    });
}

// ===== INICIALIZACIÓN DE TEMA =====
function inicializarTema() {
    const temaGuardado = localStorage.getItem('tema');
    const body = document.body;
    
    // Siempre empezar con tema inferno
    body.classList.add('theme-inferno');
    if (temaGuardado === 'paraiso') {
        body.classList.remove('theme-inferno');
        body.classList.add('tema-paraiso');
    }
}

// ===== INICIALIZACIÓN ===== 
document.addEventListener('DOMContentLoaded', function() {
    inicializarTema();
    renderizarProductos();
    actualizarCarritoUI();
    inicializarEventListeners();
    
    // Agregar evento de DOBLE CLIC al título
    const titulo = document.querySelector('.titulo-principal');
    if (titulo) {
        titulo.addEventListener('click', manejarClicTitulo);
        // Remover el cursor pointer si quieres que no sea obvio que es clickeable
        titulo.style.cursor = 'default';
    }
});

function inicializarEventListeners() {
    // Evento para carrito
    if (carritoBtn) {
        carritoBtn.addEventListener('click', mostrarCarrito);
    }
    
    // Eventos para modales
    if (cerrarModalCarritoBtn) {
        cerrarModalCarritoBtn.addEventListener('click', cerrarModalCarrito);
    }
    
    if (confirmarOpcionesBtn) {
        confirmarOpcionesBtn.addEventListener('click', confirmarSeleccion);
    }
    
    if (regresarModalBtn) {
        regresarModalBtn.addEventListener('click', cerrarModalOpciones);
    }
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', mostrarSeleccionUbicacion);
    }
    
    if (seguirPidiendoBtn) {
        seguirPidiendoBtn.addEventListener('click', cerrarModalCarrito);
    }
    
    if (confirmarUbicacionBtn) {
        confirmarUbicacionBtn.addEventListener('click', confirmarUbicacion);
    }
    
    if (regresarCarritoBtn) {
        regresarCarritoBtn.addEventListener('click', cerrarModalUbicacion);
    }
    
    if (cerrarAdvertenciaBtn) {
        cerrarAdvertenciaBtn.addEventListener('click', cerrarModalAdvertencia);
    }
    
    // Cerrar modales al hacer clic fuera del contenido
    document.addEventListener('click', function(e) {
        if (modalCarrito && !modalCarrito.classList.contains('modal-oculto') && 
            e.target === modalCarrito) {
            cerrarModalCarrito();
        }
        
        if (modalOpciones && !modalOpciones.classList.contains('modal-oculto') && 
            e.target === modalOpciones) {
            cerrarModalOpciones();
        }
        
        if (modalUbicacion && !modalUbicacion.classList.contains('modal-oculto') && 
            e.target === modalUbicacion) {
            cerrarModalUbicacion();
        }
        
        if (modalAdvertencia && !modalAdvertencia.classList.contains('modal-oculto') && 
            e.target === modalAdvertencia) {
            cerrarModalAdvertencia();
        }
    });
}

// ===== EFECTO DE SCROLL PARALLAX ===== 
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const documentHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = scrollY / documentHeight;
    document.documentElement.style.setProperty('--scroll-porcentaje', scrollPercent);
    
    // Efecto de opacidad para el fondo
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
            const productoCard = document.createElement('div');
            productoCard.className = 'producto-card';
            productoCard.innerHTML = `
                <h3 data-producto="${productoNombre}">${productoNombre}</h3>
                <p>${producto.descripcion}</p>
                <div class="precio">$${producto.base}.00 MXN</div>
                <button class="btn-seleccionar" onclick="mostrarOpciones('${categoria}', '${productoNombre}')">SELECCIONAR</button>
            `;
            container.appendChild(productoCard);
        }
    }
}

function mostrarOpciones(categoria, productoNombre) {
    if (!tituloModal || !formularioOpciones || !modalOpciones) return;

    const producto = productos[categoria][productoNombre];
    tituloModal.textContent = `Personalizar ${productoNombre}`;
    formularioOpciones.innerHTML = '';

    // Crear opciones según el producto
    for (const opcionKey in producto.opciones) {
        const opcion = producto.opciones[opcionKey];
        const opcionGrupo = document.createElement('div');
        opcionGrupo.className = 'opcion-grupo';
        
        let opcionesHTML = `<h3>${opcion.nombre || opcionKey.toUpperCase()}</h3>`;
        let primeraOpcion = true;
        
        for (const valorKey in opcion) {
            if (valorKey !== 'nombre' && valorKey !== 'advertencia') {
                const valor = opcion[valorKey];
                const precioExtra = valor > 0 ? ` (+$${valor}.00)` : '';
                const checked = primeraOpcion ? 'checked' : '';
                opcionesHTML += `
                    <label>
                        <input type="radio" name="${opcionKey}" value="${valorKey}" data-precio="${valor}" ${checked}>
                        ${valorKey.toUpperCase()}${precioExtra}
                    </label>
                `;
                primeraOpcion = false;
            }
        }
        
        if (opcion.advertencia) {
            opcionesHTML += `<div class="advertencia">${opcion.advertencia}</div>`;
        }
        
        opcionGrupo.innerHTML = opcionesHTML;
        formularioOpciones.appendChild(opcionGrupo);
    }

    // Guardar referencia al producto actual
    modalOpciones.dataset.categoria = categoria;
    modalOpciones.dataset.producto = productoNombre;
    
    // Mostrar modal
    modalOpciones.classList.remove('modal-oculto');
    document.body.style.overflow = 'hidden';
}

function confirmarSeleccion() {
    if (!modalOpciones || !modalOpciones.dataset.producto) return;

    const categoria = modalOpciones.dataset.categoria;
    const productoNombre = modalOpciones.dataset.producto;
    const producto = productos[categoria][productoNombre];
    
    // Obtener las opciones seleccionadas
    const opcionesSeleccionadas = {};
    let precioExtra = 0;
    
    const radios = formularioOpciones.querySelectorAll('input[type="radio"]:checked');
    radios.forEach(radio => {
        opcionesSeleccionadas[radio.name] = radio.value;
        precioExtra += parseInt(radio.dataset.precio) || 0;
    });
    
    // Validar opciones para bebidas alcohólicas
    if (opcionesSeleccionadas.alcohol === 'con') {
        if (!confirm("⚠️ Confirmas que eres mayor de edad para pedir esta bebida alcohólica?")) {
            return; // No agregar al carrito si cancela
        }
    }
    
    // Crear item para el carrito
    const item = {
        nombre: productoNombre,
        categoria: categoria,
        base: producto.base,
        opciones: opcionesSeleccionadas,
        extras: precioExtra,
        cantidad: 1,
        precioTotal: producto.base + precioExtra,
        timestamp: new Date().getTime() // Para identificar items únicos
    };
    
    agregarAlCarrito(item);
}

// ===== CARRITO ===== 
function agregarAlCarrito(item) {
    // Verificar si el item ya existe en el carrito
    const itemExistente = carrito.findIndex(prod => 
        prod.nombre === item.nombre && 
        JSON.stringify(prod.opciones) === JSON.stringify(item.opciones)
    );
    
    if (itemExistente > -1) {
        // Incrementar cantidad si ya existe
        carrito[itemExistente].cantidad += 1;
        carrito[itemExistente].precioTotal = carrito[itemExistente].base * carrito[itemExistente].cantidad + carrito[itemExistente].extras;
    } else {
        // Agregar nuevo item
        carrito.push(item);
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
    cerrarModalOpciones();
    
    // Mostrar feedback visual
    mostrarFeedbackAgregado(item.nombre);
}

function mostrarFeedbackAgregado(nombreProducto) {
    const feedback = document.createElement('div');
    feedback.style.position = 'fixed';
    feedback.style.bottom = '20px';
    feedback.style.right = '20px';
    feedback.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    feedback.style.color = '#ffd700';
    feedback.style.padding = '10px 15px';
    feedback.style.borderRadius = '5px';
    feedback.style.zIndex = '10000';
    feedback.style.fontFamily = "'MedievalSharp', cursive";
    feedback.style.opacity = '0';
    feedback.style.transform = 'translateY(20px)';
    feedback.style.transition = 'all 0.3s ease';
    feedback.innerHTML = `✓ ${nombreProducto} agregado al carrito`;
    
    document.body.appendChild(feedback);
    
    // Animación de entrada
    setTimeout(() => {
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateY(0)';
    }, 10);
    
    // Animación de salida después de 2 segundos
    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateY(20px)';
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 300);
    }, 2000);
}

function mostrarCarrito() {
    if (!listaCarrito || !totalCarrito || !modalCarrito) return;

    listaCarrito.innerHTML = '';
    
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<div class="carrito-vacio">El carrito está vacío</div>';
        if (whatsappBtn) whatsappBtn.disabled = true;
    } else {
        carrito.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item-carrito';
            itemElement.innerHTML = `
                <h4>${item.nombre}</h4>
                <p>${obtenerOpcionesTexto(item)}</p>
                <div class="controles-cantidad">
                    <button onclick="modificarCantidad(${index}, -1)">-</button>
                    <span>${item.cantidad}</span>
                    <button onclick="modificarCantidad(${index}, 1)">+</button>
                </div>
                <p>Precio: $${item.precioTotal}.00 MXN</p>
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">ELIMINAR</button>
            `;
            listaCarrito.appendChild(itemElement);
        });
        
        if (whatsappBtn) whatsappBtn.disabled = false;
    }
    
    totalCarrito.textContent = `Total: $${calcularTotal()}.00 MXN`;
    
    // Mostrar modal
    modalCarrito.classList.remove('modal-oculto');
    document.body.style.overflow = 'hidden';
}

function modificarCantidad(index, cambio) {
    if (carrito[index]) {
        carrito[index].cantidad += cambio;
        
        if (carrito[index].cantidad <= 0) {
            eliminarDelCarrito(index);
        } else {
            // Recalcular precio total
            carrito[index].precioTotal = carrito[index].base * carrito[index].cantidad + carrito[index].extras;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarritoUI();
            mostrarCarrito(); // Refresh carrito view
        }
    }
}

function eliminarDelCarrito(index) {
    if (carrito[index]) {
        const nombreProducto = carrito[index].nombre;
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarritoUI();
        
        // Mostrar feedback de eliminación
        mostrarFeedbackEliminado(nombreProducto);
        
        if (carrito.length > 0) {
            mostrarCarrito();
        } else {
            cerrarModalCarrito();
        }
    }
}

function mostrarFeedbackEliminado(nombreProducto) {
    const feedback = document.createElement('div');
    feedback.style.position = 'fixed';
    feedback.style.bottom = '20px';
    feedback.style.right = '20px';
    feedback.style.backgroundColor = 'rgba(139, 0, 0, 0.8)';
    feedback.style.color = '#fff';
    feedback.style.padding = '10px 15px';
    feedback.style.borderRadius = '5px';
    feedback.style.zIndex = '10000';
    feedback.style.fontFamily = "'MedievalSharp", cursive';
    feedback.style.opacity = '0';
    feedback.style.transform = 'translateY(20px)';
    feedback.style.transition = 'all 0.3s ease';
    feedback.innerHTML = `✗ ${nombreProducto} eliminado del carrito`;
    
    document.body.appendChild(feedback);
    
    // Animación de entrada
    setTimeout(() => {
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateY(0)';
    }, 10);
    
    // Animación de salida después de 2 segundos
    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateY(20px)';
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 300);
    }, 2000);
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

    if (modalUbicacion && ubicacionLista) {
        // Renderizar opciones de ubicación
        ubicacionLista.innerHTML = '';
        ubicaciones.forEach((ubicacion, index) => {
            const ubicacionElement = document.createElement('div');
            ubicacionElement.className = 'opcion-ubicacion';
            ubicacionElement.innerHTML = `
                <h3>${ubicacion.nombre}</h3>
                <p>${ubicacion.direccion}</p>
                <p class="horario-ubicacion">${ubicacion.horario}</p>
                <button onclick="seleccionarUbicacion(${index})">SELECCIONAR</button>
            `;
            ubicacionLista.appendChild(ubicacionElement);
        });
        
        modalUbicacion.classList.remove('modal-oculto');
        document.body.style.overflow = 'hidden';
    }
}

function seleccionarUbicacion(index) {
    if (ubicaciones[index]) {
        ubicacionSeleccionada = ubicaciones[index];
        
        // Resaltar la ubicación seleccionada
        const opciones = document.querySelectorAll('.opcion-ubicacion');
        opciones.forEach((opcion, i) => {
            if (i === index) {
                opcion.style.border = '2px solid #ffd700';
                opcion.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
            } else {
                opcion.style.border = '1px solid #555';
                opcion.style.backgroundColor = 'transparent';
            }
        });
        
        // Habilitar botón de confirmar
        if (confirmarUbicacionBtn) {
            confirmarUbicacionBtn.disabled = false;
            confirmarUbicacionBtn.textContent = 'CONFIRMAR PEDIDO';
        }
    }
}

function confirmarUbicacion() {
    if (ubicacionSeleccionada) {
        enviarPedidoFinal(ubicacionSeleccionada);
    } else {
        alert('Por favor selecciona una ubicación primero');
    }
}

function cerrarModalUbicacion() {
    if (modalUbicacion) {
        modalUbicacion.classList.add('modal-oculto');
        document.body.style.overflow = 'auto';
        ubicacionSeleccionada = null;
        
        // Resetear selección
        if (confirmarUbicacionBtn) {
            confirmarUbicacionBtn.disabled = true;
            confirmarUbicacionBtn.textContent = 'SELECCIONA UNA UBICACIÓN';
        }
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

    let mensaje = "¡Hola! Quiero hacer mi pedido:%0A%0A";
    
    carrito.forEach((item, index) => {
        mensaje += `*${index + 1}. ${item.nombre}* - $${item.precioTotal}.00 MXN%0A`;
        mensaje += `   • ${obtenerOpcionesTexto(item)}%0A`;
        if (item.cantidad > 1) {
            mensaje += `   • Cantidad: ${item.cantidad}%0A`;
        }
        mensaje += `%0A`;
    });
    
    mensaje += `*Total: $${calcularTotal()}.00 MXN*%0A%0A`;
    mensaje += `*📍 Ubicación de entrega:*%0A`;
    mensaje += `${ubicacion.direccion}%0A`;
    mensaje += `%0A`;
    mensaje += `*🕐 Horario:*%0A`;
    mensaje += `${ubicacion.horario}%0A`;
    mensaje += `%0A`;
    mensaje += `_Por favor confirmar disponibilidad y tiempo de entrega_%0A`;
    mensaje += `%0A`;
    mensaje += `¡Gracias! 🍷`;
    
    const telefono = "5215512345678"; // Reemplazar con número real
    const url = `https://wa.me/${telefono}?text=${mensaje}`;
    
    window.open(url, '_blank');
    
    // Limpiar carrito después de enviar
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
    cerrarModalUbicacion();
    
    // Mostrar confirmación
    mostrarConfirmacionPedido();
}

function mostrarConfirmacionPedido() {
    const confirmacion = document.createElement('div');
    confirmacion.style.position = 'fixed';
    confirmacion.style.top = '50%';
    confirmacion.style.left = '50%';
    confirmacion.style.transform = 'translate(-50%, -50%)';
    confirmacion.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    confirmacion.style.color = '#ffd700';
    confirmacion.style.padding = '20px';
    confirmacion.style.borderRadius = '10px';
    confirmacion.style.border = '2px solid #ffd700';
    confirmacion.style.zIndex = '10000';
    confirmacion.style.textAlign = 'center';
    confirmacion.style.fontFamily = "'Cinzel', serif";
    confirmacion.innerHTML = `
        <h2>¡Pedido Enviado! 🎉</h2>
        <p>Tu pedido ha sido enviado por WhatsApp</p>
        <p>Revisa tu conversación para confirmar</p>
        <button onclick="this.parentElement.style.display='none'" 
                style="margin-top: 15px; padding: 10px 20px; background: #ffd700; color: #000; border: none; border-radius: 5px; cursor: pointer;">
            ENTENDIDO
        </button>
    `;
    
    document.body.appendChild(confirmacion);
}

// ===== FUNCIONES AUXILIARES ===== 
function obtenerOpcionesTexto(item) {
    const extras = [];
    
    for (const opcion in item.opciones) {
        if (item.opciones[opcion] !== 'no' && item.opciones[opcion] !== 'sin') {
            const nombreOpcion = productos[item.categoria][item.nombre].opciones[opcion].nombre || opcion;
            extras.push(`${nombreOpcion}: ${item.opciones[opcion]}`);
        }
    }
    
    return extras.length > 0 ? extras.join(', ') : 'Sin extras';
}

function calcularSubtotal(item) {
    return item.base * item.cantidad + item.extras;
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
        // Doble tap detectado - abrir maps en elementos de dirección
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
    if (modalAdvertencia) {
        modalAdvertencia.classList.remove('modal-oculto');
        document.body.style.overflow = 'hidden';
    }
}

// ===== FUNCIÓN PARA CERRAR LA ADVERTENCIA ===== 
function cerrarModalAdvertencia() {
    if (modalAdvertencia) {
        modalAdvertencia.classList.add('modal-oculto');
        document.body.style.overflow = 'auto';
    }
}

// ===== VALIDACIÓN DE EDAD PARA BEBIDAS ALCOHÓLICAS =====
function validarEdad() {
    return new Promise((resolve) => {
        const modalEdad = document.createElement('div');
        modalEdad.className = 'modal';
        modalEdad.innerHTML = `
            <div class="modal-contenido">
                <h2>Validación de Edad</h2>
                <p>Para pedir bebidas alcohólicas debes ser mayor de edad</p>
                <p>¿Confirmas que tienes al menos 18 años?</p>
                <div class="botones-validacion">
                    <button onclick="confirmarEdad(true)">SÍ, SOY MAYOR DE EDAD</button>
                    <button onclick="confirmarEdad(false)">NO, SOY MENOR</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modalEdad);
        
        window.confirmarEdad = function(esMayor) {
            document.body.removeChild(modalEdad);
            resolve(esMayor);
        };
    });
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
window.mostrarSeleccionUbicacion = mostrarSeleccionUbicacion;
window.enviarPedidoFinal = enviarPedidoFinal;
window.seleccionarUbicacion = seleccionarUbicacion;
window.modificarCantidad = modificarCantidad;
