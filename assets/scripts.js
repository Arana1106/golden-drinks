// Datos completos de productos
const productos = {
    bebidas: {
        "Red Fire": {
            descripcion: "Bebida sabor frutos rojos 475ml",
            base: 35,
            opciones: {
                alcohol: {
                    sin: 0,
                    con: 10,
                    advertencia: "🚨 Se solicitará INE para bebidas con alcohol"
                },
                jelly: {
                    no: 0,
                    si: 5
                }
            }
        },
        "Green Corp": {
            descripcion: "Bebida sabor manzana verde 475ml",
            base: 35,
            opciones: {
                alcohol: {
                    sin: 0,
                    con: 10,
                    advertencia: "🚨 Se solicitará INE para bebidas con alcohol"
                },
                jelly: {
                    no: 0,
                    si: 5
                }
            }
        },
        "Dark Side": {
            descripcion: "Bebida sabor frutos del bosque 475ml",
            base: 35,
            opciones: {
                alcohol: {
                    sin: 0,
                    con: 10,
                    advertencia: "🚨 Se solicitará INE para bebidas con alcohol"
                },
                jelly: {
                    no: 0,
                    si: 5
                }
            }
        },
        "Blue Sea": {
            descripcion: "Bebida sabor blueberry 475ml",
            base: 35,
            opciones: {
                alcohol: {
                    sin: 0,
                    con: 10,
                    advertencia: "🚨 Se solicitará INE para bebidas con alcohol"
                },
                jelly: {
                    no: 0,
                    si: 5
                }
            }
        }
    },
    cafes: {
        "Café Remix": {
            descripcion: "Café deconstruido frío 475ml",
            base: 25,
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
                    si: 10
                }
            }
        },
        "Café Descafeinado": {
            descripcion: "Café descafeinado frío 475ml",
            base: 25,
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
                    si: 10
                }
            }
        }
    },
    tes: {
        "Té del Día": {
            descripcion: "Clásico té del día frío 475ml",
            base: 25,
            opciones: {
                azucar: {
                    sin: 0,
                    con: 0,
                    sustituto: 0
                },
                jelly: {
                    no: 0,
                    si: 5
                }
            }
        },
        "Bebida del Día": {
            descripcion: "Pregunta por los sabores 475ml",
            base: 25,
            opciones: {
                azucar: {
                    sin: 0,
                    con: 0,
                    sustituto: 0
                },
                jelly: {
                    no: 0,
                    si: 5
                }
            }
        }
    }
};

// Variables globales
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const MIN_PEDIDO = 4;

// Elementos del DOM
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

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarCarritoUI();
    
    // Event listeners
    carritoBtn.addEventListener('click', mostrarCarrito);
    cerrarModalCarritoBtn.addEventListener('click', cerrarModalCarrito);
    whatsappBtn.addEventListener('click', enviarWhatsApp);
    confirmarOpcionesBtn.addEventListener('click', confirmarSeleccion);
    seguirPidiendoBtn.addEventListener('click', cerrarModalCarrito);
});

// Mostrar productos en pantalla
function renderizarProductos() {
    for (const categoria in productos) {
        const container = document.getElementById(`${categoria}-container`);
        
        for (const nombreProducto in productos[categoria]) {
            const producto = productos[categoria][nombreProducto];
            const card = document.createElement('div');
            card.className = 'producto-card';
            card.innerHTML = `
                <h3>${nombreProducto}</h3>
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

    // Eventos para botones de selección
    document.querySelectorAll('.btn-seleccionar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const categoria = e.target.getAttribute('data-categoria');
            const nombreProducto = e.target.getAttribute('data-producto');
            const producto = {
                nombre: nombreProducto,
                categoria: categoria,
                ...productos[categoria][nombreProducto]
            };
            mostrarOpciones(producto);
        });
    });
}

// Mostrar modal de opciones
function mostrarOpciones(producto) {
    const tituloModal = document.getElementById('titulo-modal');
    const formulario = document.getElementById('formulario-opciones');

    tituloModal.textContent = producto.nombre;
    formulario.innerHTML = '';

    // Generar opciones según categoría
    if (producto.categoria === 'bebidas') {
        formulario.innerHTML = `
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
        formulario.innerHTML = `
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
        formulario.innerHTML = `
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

    // Guardar referencia al producto actual
    modalOpciones.dataset.producto = JSON.stringify(producto);
    modalOpciones.classList.remove('modal-oculto');
    document.body.style.overflow = 'hidden';
}

// Confirmar selección de opciones
function confirmarSeleccion() {
    const producto = JSON.parse(modalOpciones.dataset.producto);
    const formulario = document.getElementById('formulario-opciones');
    
    // Obtener selecciones
    const opciones = {
        alcohol: formulario.querySelector('input[name="alcohol"]:checked')?.value,
        jelly: formulario.querySelector('input[name="jelly"]:checked')?.value,
        azucar: formulario.querySelector('input[name="azucar"]:checked')?.value,
        leche: formulario.querySelector('input[name="leche"]:checked')?.value,
        coffee_bubble: formulario.querySelector('input[name="coffee_bubble"]:checked')?.value
    };

    // Agregar al carrito
    agregarAlCarrito({
        ...producto,
        seleccion: opciones,
        cantidad: 1
    });

    cerrarModalOpciones();
}

// Cerrar modales
function cerrarModalOpciones() {
    modalOpciones.classList.add('modal-oculto');
    document.body.style.overflow = 'auto';
}

function cerrarModalCarrito() {
    modalCarrito.classList.add('modal-oculto');
    document.body.style.overflow = 'auto';
}

// Agregar producto al carrito
function agregarAlCarrito(item) {
    carrito.push(item);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
    cerrarModalOpciones();
}

// Mostrar carrito
function mostrarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        let precioExtra = 0;
        let extras = [];
        
        // Calcular extras según opciones
        if (item.categoria === 'bebidas') {
            if (item.seleccion.alcohol === 'con') {
                precioExtra += item.opciones.alcohol.con;
                extras.push('Con alcohol');
            } else {
                extras.push('Sin alcohol');
            }
            
            if (item.seleccion.jelly === 'si') {
                precioExtra += item.opciones.jelly.si;
                extras.push('Con jelly');
            } else {
                extras.push('Sin jelly');
            }
        } 
        else if (item.categoria === 'tes') {
            if (item.seleccion.azucar === 'con') extras.push('Con azúcar');
            else if (item.seleccion.azucar === 'sustituto') extras.push('Con sustituto');
            else extras.push('Sin azúcar');
            
            if (item.seleccion.jelly === 'si') {
                precioExtra += item.opciones.jelly.si;
                extras.push('Con jelly');
            } else {
                extras.push('Sin jelly');
            }
        } 
        else if (item.categoria === 'cafes') {
            if (item.seleccion.leche === 'con') {
                precioExtra += item.opciones.leche.con;
                extras.push('Con leche');
            } 
            else if (item.seleccion.leche === 'deslactosada') {
                precioExtra += item.opciones.leche.deslactosada;
                extras.push('Con leche deslactosada');
            } 
            else {
                extras.push('Sin leche');
            }
            
            if (item.seleccion.azucar === 'con') extras.push('Con azúcar');
            else if (item.seleccion.azucar === 'sustituto') extras.push('Con sustituto');
            else extras.push('Sin azúcar');
            
            if (item.seleccion.coffee_bubble === 'si') {
                precioExtra += item.opciones.coffee_bubble.si;
                extras.push('Con coffee bubble');
            } else {
                extras.push('Sin coffee bubble');
            }
        }

        const subtotal = (item.base + precioExtra) * item.cantidad;
        total += subtotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'item-carrito';
        itemElement.innerHTML = `
            <h4>${item.nombre} x${item.cantidad}</h4>
            <p>${extras.join(', ')}</p>
            <p>Subtotal: $${subtotal} MXN</p>
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        listaCarrito.appendChild(itemElement);
    });

    totalCarrito.textContent = `Total: $${total} MXN`;
    modalCarrito.classList.remove('modal-oculto');
    document.body.style.overflow = 'hidden';
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
    mostrarCarrito();
}

// Actualizar interfaz del carrito
function actualizarCarritoUI() {
    contadorCarrito.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
}

// Enviar pedido por WhatsApp
function enviarWhatsApp() {
    const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
    if (totalProductos < MIN_PEDIDO) {
        alert(`¡Pedido mínimo de ${MIN_PEDIDO} productos! Actual: ${totalProductos}`);
        return;
    }

    let mensaje = "¡Hola! Quiero hacer este pedido:%0A%0A";
    let total = 0;

    carrito.forEach(item => {
        let extras = [];
        let precioExtra = 0;

        if (item.categoria === 'bebidas') {
            if (item.seleccion.alcohol === 'con') {
                extras.push("con alcohol");
                precioExtra += item.opciones.alcohol.con;
            } else {
                extras.push("sin alcohol");
            }
            if (item.seleccion.jelly === 'si') {
                extras.push("con jelly");
                precioExtra += item.opciones.jelly.si;
            } else {
                extras.push("sin jelly");
            }
        } 
        else if (item.categoria === 'tes') {
            if (item.seleccion.azucar === 'con') extras.push("con azúcar");
            else if (item.seleccion.azucar === 'sustituto') extras.push("con sustituto");
            else extras.push("sin azúcar");
            
            if (item.seleccion.jelly === 'si') {
                extras.push("con jelly");
                precioExtra += item.opciones.jelly.si;
            } else {
                extras.push("sin jelly");
            }
        } 
        else if (item.categoria === 'cafes') {
            if (item.seleccion.leche === 'con') {
                extras.push("con leche");
                precioExtra += item.opciones.leche.con;
            } 
            else if (item.seleccion.leche === 'deslactosada') {
                extras.push("con leche deslactosada");
                precioExtra += item.opciones.leche.deslactosada;
            } 
            else {
                extras.push("sin leche");
            }
            
            if (item.seleccion.azucar === 'con') extras.push("con azúcar");
            else if (item.seleccion.azucar === 'sustituto') extras.push("con sustituto");
            else extras.push("sin azúcar");
            
            if (item.seleccion.coffee_bubble === 'si') {
                extras.push("con coffee bubble");
                precioExtra += item.opciones.coffee_bubble.si;
            } else {
                extras.push("sin coffee bubble");
            }
        }

        const subtotal = (item.base + precioExtra) * item.cantidad;
        total += subtotal;

        mensaje += `*${item.nombre}* x${item.cantidad}%0A`;
        if (extras.length > 0) mensaje += `(${extras.join(", ")})%0A`;
        mensaje += `$${subtotal} MXN%0A%0A`;
    });

    mensaje += `*Total: $${total} MXN*%0A%0A`;
    mensaje += "Datos bancarios:%0A";
    mensaje += "Titular: Eric Daniel Gutiérrez Arana%0A";
    mensaje += "CLABE: 012 261 01584933343 3 (BBVA)%0A%0A";
    mensaje += "Nota: Tienes 5 minutos para modificaciones post-pago.";

    window.open(`https://wa.me/525611649344?text=${mensaje}`, '_blank');
}

// Hacer funciones accesibles globalmente
window.eliminarDelCarrito = eliminarDelCarrito;
