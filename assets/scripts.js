
// ===== VARIABLES GLOBALES ===== 
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const MIN_PEDIDO = 3;
let lastTap = 0;
let lastTitleTap = 0;
let ubicacionSeleccionada = null;

// ===== DEBUG PARA TERMUX =====
console.log = function(mensaje) {
    const debugDiv = document.getElementById('debug-console') || document.createElement('div');
    debugDiv.id = 'debug-console';
    debugDiv.style.position = 'fixed';
    debugDiv.style.top = '10px';
    debugDiv.style.left = '10px';
    debugDiv.style.background = 'rgba(0,0,0,0.8)';
    debugDiv.style.color = '#00ff00';
    debugDiv.style.padding = '10px';
    debugDiv.style.borderRadius = '5px';
    debugDiv.style.zIndex = '9999';
    debugDiv.style.fontSize = '12px';
    debugDiv.style.maxWidth = '200px';
    debugDiv.style.maxHeight = '100px';
    debugDiv.style.overflow = 'auto';
    
    debugDiv.innerHTML += mensaje + '<br>';
    document.body.appendChild(debugDiv);
};

// ===== DATOS DE PRODUCTOS ORIGINALES ===== 
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
            descripcion: "Pacto con the diablo, tranquilo solo es un suave café descafeinado 475ml",
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
            descripcion: "Té del día 475ml",
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
        mostrarNotificacionTema('Modo Infierno activado');
    } else {
        body.classList.add('tema-paraiso');
        localStorage.setItem('tema', 'paraiso');
        mostrarNotificacionTema('Modo Paraíso activado');
    }
    
    actualizarInterfazTema();
}

function mostrarNotificacionTema(mensaje) {
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
    
    setTimeout(() => {
        notificacion.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notificacion.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 2000);
}

function actualizarInterfazTema() {
    const esTemaParaiso = document.body.classList.contains('tema-paraiso');
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
    
    body.classList.add('theme-inferno');
    if (temaGuardado === 'paraiso') {
        body.classList.remove('theme-inferno');
        body.classList.add('tema-paraiso');
    }
}

// ===== INICIALIZACIÓN CON DEBUG ===== 
document.addEventListener('DOMContentLoaded', function() {
    console.log("🔄 Iniciando SINNER'S...");
    
    // Debug: verificar elementos del DOM
    console.log("📍 Contenedores:");
    console.log("Bebidas: " + (document.getElementById('bebidas-container') ? "OK" : "FALTA"));
    console.log("Cafés: " + (document.getElementById('cafes-container') ? "OK" : "FALTA"));  
    console.log("Tés: " + (document.getElementById('tes-container') ? "OK" : "FALTA"));
    
    inicializarTema();
    renderizarProductos();
    actualizarCarritoUI();
    inicializarEventListeners();
    
    console.log("✅ Inicialización completada");
    
    const titulo = document.querySelector('.titulo-principal');
    if (titulo) {
        titulo.addEventListener('click', manejarClicTitulo);
        titulo.style.cursor = 'default';
    }
});

function inicializarEventListeners() {
    if (carritoBtn) carritoBtn.addEventListener('click', mostrarCarrito);
    if (cerrarModalCarritoBtn) cerrarModalCarritoBtn.addEventListener('click', cerrarModalCarrito);
    if (confirmarOpcionesBtn) confirmarOpcionesBtn.addEventListener('click', confirmarSeleccion);
    if (regresarModalBtn) regresarModalBtn.addEventListener('click', cerrarModalOpciones);
    if (whatsappBtn) whatsappBtn.addEventListener('click', mostrarSeleccionUbicacion);
    if (seguirPidiendoBtn) seguirPidiendoBtn.addEventListener('click', cerrarModalCarrito);
    if (confirmarUbicacionBtn) confirmarUbicacionBtn.addEventListener('click', confirmarUbicacion);
    if (regresarCarritoBtn) regresarCarritoBtn.addEventListener('click', cerrarModalUbicacion);
    if (cerrarAdvertenciaBtn) cerrarAdvertenciaBtn.addEventListener('click', cerrarModalAdvertencia);
    
    document.addEventListener('click', function(e) {
        if (modalCarrito && !modalCarrito.classList.contains('modal-oculto') && e.target === modalCarrito) {
            cerrarModalCarrito();
        }
        if (modalOpciones && !modalOpciones.classList.contains('modal-oculto') && e.target === modalOpciones) {
            cerrarModalOpciones();
        }
        if (modalUbicacion && !modalUbicacion.classList.contains('modal-oculto') && e.target === modalUbicacion) {
            cerrarModalUbicacion();
        }
        if (modalAdvertencia && !modalAdvertencia.classList.contains('modal-oculto') && e.target === modalAdvertencia) {
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
    document.documentElement.style.setProperty('--opacidad-cielo', 1 - scrollPercent);
    document.documentElement.style.setProperty('--opacidad-infierno', scrollPercent);
});

// ===== FUNCIÓN RENDERIZAR PRODUCTOS CON DEBUG =====
function renderizarProductos() {
    console.log("🎨 Renderizando productos...");
    
    for (const categoria in productos) {
        const container = document.getElementById(`${categoria}-container`);
        if (!container) {
            console.log("❌ No se encontró: " + categoria + "-container");
            continue;
        }
        
        console.log("📦 " + categoria + ": " + Object.keys(productos[categoria]).length + " productos");
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
    
    console.log("✅ Productos renderizados");
}

function mostrarOpciones(categoria, productoNombre) {
    if (!tituloModal || !formularioOpciones || !modalOpciones) return;

    const producto = productos[categoria][productoNombre];
    tituloModal.textContent = `Personalizar ${productoNombre}`;
    formularioOpciones.innerHTML = '';

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
    
    const radios = formularioOpciones.querySelectorAll('input[type="radio"]:checked');
    radios.forEach(radio => {
        opcionesSeleccionadas[radio.name] = radio.value;
        precioExtra += parseInt(radio.dataset.precio) || 0;
    });
    
    if (opcionesSeleccionadas.alcohol === 'con') {
        if (!confirm("⚠️ Confirmas que eres mayor de edad para pedir esta bebida alcohólica?")) {
            return;
        }
    }
    
    const item = {
        nombre: productoNombre,
        categoria: categoria,
        base: producto.base,
        opciones: opcionesSeleccionadas,
        extras: precioExtra,
        cantidad: 1,
        precioTotal: producto.base + precioExtra,
        timestamp: new Date().getTime()
    };
    
    agregarAlCarrito(item);
}

// ===== CARRITO ===== 
function agregarAlCarrito(item) {
    const itemExistente = carrito.findIndex(prod => 
        prod.nombre === item.nombre && 
        JSON.stringify(prod.opciones) === JSON.stringify(item.opciones)
    );
    
    if (itemExistente > -1) {
        carrito[itemExistente].cantidad += 1;
        carrito[itemExistente].precioTotal = carrito[itemExistente].base * carrito[itemExistente].cantidad + carrito[itemExistente].extras;
    } else {
        carrito.push(item);
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
    cerrarModalOpciones();
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
    
    setTimeout(() => {
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateY(0)';
    }, 10);
    
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
        carrito.forEach((item, index) {
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
    modalCarrito.classList.remove('modal-oculto');
    document.body.style.overflow = 'hidden';
}

function modificarCantidad(index, cambio) {
    if (carrito[index]) {
        carrito[index].cantidad += cambio;
        
        if (carrito[index].cantidad <= 0) {
            eliminarDelCarrito(index);
        } else {
            carrito[index].precioTotal = carrito[index].base * carrito[index].cantidad + carrito[index].extras;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarritoUI();
            mostrarCarrito();
        }
    }
}

function eliminarDelCarrito(index) {
    if (carrito[index]) {
        const nombreProducto = carrito[index].nombre;
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarritoUI();
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
    
    setTimeout(() => {
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateY(0)';
    }, 10);
    
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
        ubicacionLista.innerHTML = '';
        ubicaciones.forEach((ubicacion, index)
