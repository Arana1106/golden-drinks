// ===== FUNCIÓN PARA ABRIR GOOGLE MAPS =====
function abrirGoogleMaps() {
    const coordenadas = "19.4777778,-99.1169444";
    const url = `https://www.google.com/maps/search/?api=1&query=${coordenadas}`;
    
    // Abrir en nueva pestaña
    window.open(url, '_blank');
    
    // Feedback visual para el usuario
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
        // Doble tap detectado
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
    // Crear modal de advertencia si no existe
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
    
    // Actualizar cantidad actual
    const totalArticulos = carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
    document.getElementById('cantidad-actual').textContent = totalArticulos;
    
    // Mostrar modal
    modalAdvertencia.classList.remove('modal-oculto');
}

// ===== FUNCIÓN PARA CERRAR LA ADVERTENCIA =====
function cerrarModalAdvertencia() {
    const modalAdvertencia = document.getElementById('modal-advertencia');
    if (modalAdvertencia) {
        modalAdvertencia.classList.add('modal-oculto');
    }
}

// ===== DATOS DE PRODUCTOS SINNER'S - PRECIOS CORREGIDOS =====
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
            base: 45,
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
    
    // Event listeners para Termux (más robustos)
    if (carritoBtn) carritoBtn.addEventListener('click', mostrarCarrito);
    
    // WhatsApp button con validación de pedido mínimo
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
    
    // Configurar el botón de regresar CORRECTAMENTE
    if (regresarCarritoBtn) {
        regresarCarritoBtn.addEventListener('click', () => {
            cerrarModalUbicacion();
            setTimeout(() => {
                mostrarCarrito();
            }, 100);
        });
    }
    
    // Cerrar modales al hacer clic en la X
    document.querySelectorAll('.cerrar-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.add('modal-oculto');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // REMOVER CUALQUIER REFERENCIA AL SUBTÍTULO QUE YA NO EXISTE
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

    // Event listeners para botones de selección
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
                <label><input type="radio
