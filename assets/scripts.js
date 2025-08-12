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

// Renderiza todos los productos en el menú
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

    // Agregar event listeners a los botones de selección
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

// Muestra el modal con las opciones del producto
function mostrarOpciones(producto) {
    tituloModal.textContent = producto.nombre;
    formularioOpciones.innerHTML = '';

    // Generar opciones según categoría
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

    // Mostrar modal
    modalOpciones.classList.remove('modal-oculto');
    document.body.style.overflow = 'hidden';
    modalOpciones.dataset.producto = JSON.stringify(producto);
}

// Confirma la selección y agrega al carrito
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

// Agrega un item al carrito
function agregarAlCarrito(item) {
    carrito.push(item);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
    cerrarModalOpciones();
}

// Muestra el modal del carrito
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

// Elimina un item del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
    mostrarCarrito();
}

// Actualiza la UI del carrito (contador)
function actualizarCarritoUI() {
    const totalItems = carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
    contadorCarrito.textContent = totalItems;
    whatsappBtn.disabled = totalItems < MIN_PEDIDO;
}

// ===== WHATSAPP =====

// Envía el pedido por WhatsApp
function enviarWhatsApp() {
    const totalItems = carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
    if (totalItems < MIN_PEDIDO) {
        alert(`¡Pedido mínimo de ${MIN_PEDIDO} productos! Actual: ${totalItems}`);
        return;
    }

    let mensaje = `*PEDIDO GOLDEN DRINKS*%0A%0A*Hora:* ${new Date().toLocaleString()}%0A%0A`;
    
    carrito.forEach(item => {
        mensaje += `*${item.nombre}* x${item.cantidad || 1}%0A`;
        mensaje += `(${obtenerOpcionesTexto(item)})%0A`;
        mensaje += `$${calcularSubtotal(item)} MXN%0A%0A`;
    });

    mensaje += `*TOTAL: $${calcularTotal()} MXN*%0A%0A`;
    mensaje += `*Datos bancarios*%0A`;
    mensaje += `Titular: Eric Daniel Gutiérrez Arana%0A`;
    mensaje += `CLABE: 012 261 01584933343 3 (BBVA)%0A%0A`;
    mensaje += `📍 *Retiro en:* Calle Coral 120, CDMX`;

    window.open(`https://wa.me/525611649344?text=${mensaje}`, '_blank');
}

// ===== FUNCIONES AUXILIARES =====

// Devuelve el texto de las opciones seleccionadas
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

// Calcula el subtotal de un item
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

// Calcula el total del carrito
function calcularTotal() {
    return carrito.reduce((total, item) => total + calcularSubtotal(item), 0);
}

// Cierra el modal de opciones
function cerrarModalOpciones() {
    modalOpciones.classList.add('modal-oculto');
    document.body.style.overflow = 'auto';
}

// Cierra el modal del carrito
function cerrarModalCarrito() {
    modalCarrito.classList.add('modal-oculto');
    document.body.style.overflow = 'auto';
}

// Hace funciones accesibles globalmente
window.eliminarDelCarrito = eliminarDelCarrito;
