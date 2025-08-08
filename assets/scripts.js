// Variables globales
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let productoSeleccionado = null;

// Elementos del DOM
const carritoBtn = document.getElementById('carrito-btn');
const contadorCarrito = document.getElementById('contador-carrito');
const modalOpciones = document.getElementById('modal-opciones');
const modalCarrito = document.getElementById('modal-carrito');
const itemsCarrito = document.getElementById('items-carrito');
const totalCarrito = document.getElementById('total-carrito');
const whatsappBtn = document.getElementById('whatsapp-btn');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    actualizarCarritoUI();
    
    // Event listeners
    carritoBtn.addEventListener('click', mostrarCarrito);
    whatsappBtn.addEventListener('click', enviarWhatsApp);
    
    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === modalOpciones) {
            modalOpciones.style.display = 'none';
        }
        if (e.target === modalCarrito) {
            modalCarrito.style.display = 'none';
        }
    });
    
    // Cerrar modales con botón X
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            modalOpciones.style.display = 'none';
            modalCarrito.style.display = 'none';
        });
    });
});

// Cargar productos desde JSON
async function cargarProductos() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        renderizarProductos(data);
    } catch (error) {
        console.error('Error cargando productos:', error);
    }
}

// Renderizar productos en la página
function renderizarProductos(data) {
    const bebidasContainer = document.getElementById('bebidas-container');
    const tesContainer = document.getElementById('tes-container');
    const cafesContainer = document.getElementById('cafes-container');
    
    // Renderizar bebidas
    Object.entries(data.bebidas).forEach(([nombre, producto]) => {
        bebidasContainer.appendChild(crearTarjetaProducto(nombre, producto, 'bebidas'));
    });
    
    // Renderizar tés
    Object.entries(data.tes).forEach(([nombre, producto]) => {
        tesContainer.appendChild(crearTarjetaProducto(nombre, producto, 'tes'));
    });
    
    // Renderizar cafés
    Object.entries(data.cafes).forEach(([nombre, producto]) => {
        cafesContainer.appendChild(crearTarjetaProducto(nombre, producto, 'cafes'));
    });
}

// Crear tarjeta de producto
function crearTarjetaProducto(nombre, producto, categoria) {
    const card = document.createElement('div');
    card.className = 'producto-card';
    card.setAttribute('data-producto', nombre); // 🔥 Línea nueva
    // ... (resto del código igual)
}
    card.innerHTML = `
        <h3>${nombre}</h3>
        <p>${producto.descripcion}</p>
        <button class="btn-seleccionar" data-producto="${nombre}" data-categoria="${categoria}">
            Seleccionar
        </button>
    `;
    
    card.querySelector('.btn-seleccionar').addEventListener('click', (e) => {
        const productoNombre = e.target.dataset.producto;
        const productoCategoria = e.target.dataset.categoria;
        iniciarSeleccion(productoNombre, productoCategoria);
    });
    
    return card;
}

// Iniciar proceso de selección
function iniciarSeleccion(nombre, categoria) {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const producto = data[categoria][nombre];
            productoSeleccionado = {
                nombre: nombre,
                categoria: categoria,
                descripcion: producto.descripcion,
                base: producto.base,
                opciones: {},
                cantidad: 1
            };
            
            mostrarOpciones(producto, categoria);
        });
}

// Mostrar opciones en modal
function mostrarOpciones(producto, categoria) {
    const modalTitulo = document.getElementById('modal-titulo');
    const modalBody = document.getElementById('modal-opciones-body');
    const btnConfirmar = document.getElementById('btn-confirmar');
    
    modalTitulo.textContent = productoSeleccionado.nombre;
    modalBody.innerHTML = '';
    
    // Resetear confirmar
    btnConfirmar.disabled = true;
    btnConfirmar.onclick = null;
    
    if (categoria === 'bebidas') {
        // Opciones para bebidas
        modalBody.innerHTML = `
            <div class="opciones-container">
                <div class="opcion-grupo">
                    <h3>Alcohol:</h3>
                    <button class="opcion-btn" data-tipo="alcohol" data-valor="sin">
                        Sin alcohol (+$${producto.opciones.alcohol.sin})
                    </button>
                    <button class="opcion-btn" data-tipo="alcohol" data-valor="con">
                        Con alcohol (+$${producto.opciones.alcohol.con})
                    </button>
                    ${producto.opciones.alcohol.advertencia ? 
                      `<p class="advertencia">${producto.opciones.alcohol.advertencia}</p>` : ''}
                </div>
                
                <div class="opcion-grupo" id="jelly-opciones" style="display:none;">
                    <h3>Bubble Jelly:</h3>
                    <button class="opcion-btn" data-tipo="jelly" data-valor="no">
                        No (+$${producto.opciones.jelly.no})
                    </button>
                    <button class="opcion-btn" data-tipo="jelly" data-valor="si">
                        Sí (+$${producto.opciones.jelly.si})
                    </button>
                </div>
                
                <div class="cantidad-grupo">
                    <h3>Cantidad:</h3>
                    <div class="contador-cantidad">
                        <button class="btn-cantidad" data-accion="decrementar">-</button>
                        <span class="cantidad">1</span>
                        <button class="btn-cantidad" data-accion="incrementar">+</button>
                    </div>
                </div>
            </div>
        `;
        
        // Mostrar opciones de jelly solo si seleccionan alcohol
        // REEMPLAZAR este bloque:
document.querySelectorAll('[data-tipo="jelly"]').forEach(btn => {
    btn.addEventListener('click', () => {
        productoSeleccionado.opciones.jelly = btn.dataset.valor;
        
        // Actualizar precio
        const precioJelly = btn.dataset.valor === 'si' ? producto.opciones.jelly.si : 0;
        const precioAlcohol = productoSeleccionado.opciones.alcohol === 'con' ? 
            producto.opciones.alcohol.con : 0;
        productoSeleccionado.precioUnitario = producto.base + precioAlcohol + precioJelly;
        
        // Habilitar confirmar SI ambos están seleccionados
        if (productoSeleccionado.opciones.alcohol !== undefined && 
            productoSeleccionado.opciones.jelly !== undefined) {
            btnConfirmar.disabled = false;
        }
    });
});
                
                // Validar INE para alcohol
                if (btn.dataset.valor === 'con') {
                    const confirmar = confirm("⚠️ Deberás mostrar INE al recibir el pedido. ¿Continuar?");
                    if (!confirmar) {
                        productoSeleccionado.opciones.alcohol = 'sin';
                        return;
                    }
                }
                
                // Marcar como seleccionado
                document.querySelectorAll('[data-tipo="alcohol"]').forEach(b => {
                    b.classList.remove('seleccionado');
                });
                btn.classList.add('seleccionado');
                
                // Mostrar opciones de jelly
                document.getElementById('jelly-opciones').style.display = 'block';
            });
        });
        
        // Seleccionar jelly
        document.querySelectorAll('[data-tipo="jelly"]').forEach(btn => {
            btn.addEventListener('click', () => {
                productoSeleccionado.opciones.jelly = btn.dataset.valor;
                
                // Marcar como seleccionado
                document.querySelectorAll('[data-tipo="jelly"]').forEach(b => {
                    b.classList.remove('seleccionado');
                });
                btn.classList.add('seleccionado');
                
                // Habilitar confirmar si todas las opciones están seleccionadas
                if (productoSeleccionado.opciones.alcohol && productoSeleccionado.opciones.jelly) {
                    btnConfirmar.disabled = false;
                }
            });
        });
        
    } else if (categoria === 'tes') {
        // Opciones para té
        modalBody.innerHTML = `
            <div class="opciones-container">
                <div class="opcion-grupo">
                    <h3>Azúcar:</h3>
                    <button class="opcion-btn" data-tipo="azucar" data-valor="sin">
                        Sin azúcar
                    </button>
                    <button class="opcion-btn" data-tipo="azucar" data-valor="con">
                        Con azúcar
                    </button>
                    <button class="opcion-btn" data-tipo="azucar" data-valor="sustituto">
                        Sustituto de azúcar
                    </button>
                </div>
                
                <div class="opcion-grupo" id="jelly-opciones-te" style="display:none;">
                    <h3>Bubble Jelly:</h3>
                    <button class="opcion-btn" data-tipo="jelly" data-valor="no">
                        No (+$${producto.opciones.jelly.no})
                    </button>
                    <button class="opcion-btn" data-tipo="jelly" data-valor="si">
                        Sí (+$${producto.opciones.jelly.si})
                    </button>
                </div>
                
                <div class="cantidad-grupo">
                    <h3>Cantidad:</h3>
                    <div class="contador-cantidad">
                        <button class="btn-cantidad" data-accion="decrementar">-</button>
                        <span class="cantidad">1</span>
                        <button class="btn-cantidad" data-accion="incrementar">+</button>
                    </div>
                </div>
            </div>
        `;
        
        // Seleccionar azúcar
        document.querySelectorAll('[data-tipo="azucar"]').forEach(btn => {
            btn.addEventListener('click', () => {
                productoSeleccionado.opciones.azucar = btn.dataset.valor;
                
                // Marcar como seleccionado
                document.querySelectorAll('[data-tipo="azucar"]').forEach(b => {
                    b.classList.remove('seleccionado');
                });
                btn.classList.add('seleccionado');
                
                // Mostrar opciones de jelly
                document.getElementById('jelly-opciones-te').style.display = 'block';
            });
        });
        
        // Seleccionar jelly
        document.querySelectorAll('[data-tipo="jelly"]').forEach(btn => {
            btn.addEventListener('click', () => {
                productoSeleccionado.opciones.jelly = btn.dataset.valor;
                
                // Marcar como seleccionado
                document.querySelectorAll('[data-tipo="jelly"]').forEach(b => {
                    b.classList.remove('seleccionado');
                });
                btn.classList.add('seleccionado');
                
                // Habilitar confirmar si todas las opciones están seleccionadas
                if (productoSeleccionado.opciones.azucar && productoSeleccionado.opciones.jelly) {
                    btnConfirmar.disabled = false;
                }
            });
        });
        
    } else if (categoria === 'cafes') {
        // Opciones para café
        modalBody.innerHTML = `
            <div class="opciones-container">
                <div class="opcion-grupo">
                    <h3>Leche:</h3>
                    <button class="opcion-btn" data-tipo="leche" data-valor="sin">
                        Sin leche
                    </button>
                    <button class="opcion-btn" data-tipo="leche" data-valor="con">
                        Con leche (+$${producto.opciones.leche.con})
                    </button>
                    <button class="opcion-btn" data-tipo="leche" data-valor="deslactosada">
                        Con leche deslactosada (+$${producto.opciones.leche.deslactosada})
                    </button>
                </div>
                
                <div class="opcion-grupo" id="azucar-opciones" style="display:none;">
                    <h3>Azúcar:</h3>
                    <button class="opcion-btn" data-tipo="azucar" data-valor="sin">
                        Sin azúcar
                    </button>
                    <button class="opcion-btn" data-tipo="azucar" data-valor="con">
                        Con azúcar
                    </button>
                    <button class="opcion-btn" data-tipo="azucar" data-valor="sustituto">
                        Sustituto de azúcar
                    </button>
                </div>
                
                <div class="opcion-grupo" id="coffee-bubble-opciones" style="display:none;">
                    <h3>Coffee Bubble:</h3>
                    <button class="opcion-btn" data-tipo="coffee_bubble" data-valor="no">
                        No (+$${producto.opciones.coffee_bubble.no})
                    </button>
                    <button class="opcion-btn" data-tipo="coffee_bubble" data-valor="si">
                        Sí (+$${producto.opciones.coffee_bubble.si})
                    </button>
                </div>
                
                <div class="cantidad-grupo">
                    <h3>Cantidad:</h3>
                    <div class="contador-cantidad">
                        <button class="btn-cantidad" data-accion="decrementar">-</button>
                        <span class="cantidad">1</span>
                        <button class="btn-cantidad" data-accion="incrementar">+</button>
                    </div>
                </div>
            </div>
        `;
        
        // Seleccionar leche
        document.querySelectorAll('[data-tipo="leche"]').forEach(btn => {
            btn.addEventListener('click', () => {
                productoSeleccionado.opciones.leche = btn.dataset.valor;
                
                // Marcar como seleccionado
                document.querySelectorAll('[data-tipo="leche"]').forEach(b => {
                    b.classList.remove('seleccionado');
                });
                btn.classList.add('seleccionado');
                
                // Mostrar opciones de azúcar
                document.getElementById('azucar-opciones').style.display = 'block';
            });
        });
        
        // Seleccionar azúcar
        document.querySelectorAll('[data-tipo="azucar"]').forEach(btn => {
            btn.addEventListener('click', () => {
                productoSeleccionado.opciones.azucar = btn.dataset.valor;
                
                // Marcar como seleccionado
                document.querySelectorAll('[data-tipo="azucar"]').forEach(b => {
                    b.classList.remove('seleccionado');
                });
                btn.classList.add('seleccionado');
                
                // Mostrar opciones de coffee bubble
                document.getElementById('coffee-bubble-opciones').style.display = 'block';
            });
        });
        
        // Seleccionar coffee bubble
        document.querySelectorAll('[data-tipo="coffee_bubble"]').forEach(btn => {
            btn.addEventListener('click', () => {
                productoSeleccionado.opciones.coffee_bubble = btn.dataset.valor;
                
                // Marcar como seleccionado
                document.querySelectorAll('[data-tipo="coffee_bubble"]').forEach(b => {
                    b.classList.remove('seleccionado');
                });
                btn.classList.add('seleccionado');
                
                // Habilitar confirmar si todas las opciones están seleccionadas
                if (productoSeleccionado.opciones.leche && 
                    productoSeleccionado.opciones.azucar && 
                    productoSeleccionado.opciones.coffee_bubble) {
                    btnConfirmar.disabled = false;
                }
            });
        });
    }
    
    // Configurar botones de cantidad
    document.querySelectorAll('.btn-cantidad').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const accion = e.target.dataset.accion;
            const cantidadElement = e.target.parentElement.querySelector('.cantidad');
            let cantidad = parseInt(cantidadElement.textContent);
            
            if (accion === 'incrementar') {
                cantidad++;
            } else if (accion === 'decrementar' && cantidad > 1) {
                cantidad--;
            }
            
            cantidadElement.textContent = cantidad;
            productoSeleccionado.cantidad = cantidad;
        });
    });
    
    // Configurar botón confirmar
    btnConfirmar.addEventListener('click', () => {
        agregarAlCarrito();
        modalOpciones.style.display = 'none';
    });
    
    // Mostrar modal
    modalOpciones.style.display = 'block';
}

// Agregar producto al carrito
function agregarAlCarrito() {
    // Calcular precio total
    let precio = productoSeleccionado.base;
    
    // Sumar extras según categoría
    if (productoSeleccionado.categoria === 'bebidas') {
        precio += productoSeleccionado.opciones.alcohol === 'con' ? 
            productoSeleccionado.base.opciones.alcohol.con : 0;
        precio += productoSeleccionado.opciones.jelly === 'si' ? 
            productoSeleccionado.base.opciones.jelly.si : 0;
    } 
    else if (productoSeleccionado.categoria === 'tes') {
        precio += productoSeleccionado.opciones.jelly === 'si' ? 
            productoSeleccionado.base.opciones.jelly.si : 0;
    }
    else if (productoSeleccionado.categoria === 'cafes') {
        precio += productoSeleccionado.opciones.leche === 'con' ? 
            productoSeleccionado.base.opciones.leche.con : 0;
        precio += productoSeleccionado.opciones.leche === 'deslactosada' ? 
            productoSeleccionado.base.opciones.leche.deslactosada : 0;
        precio += productoSeleccionado.opciones.coffee_bubble === 'si' ? 
            productoSeleccionado.base.opciones.coffee_bubble.si : 0;
    }
    
    // Verificar si ya existe en el carrito
    const existe = carrito.findIndex(item => 
        item.nombre === productoSeleccionado.nombre &&
        JSON.stringify(item.opciones) === JSON.stringify(productoSeleccionado.opciones)
    );
    
    if (existe >= 0) {
        carrito[existe].cantidad += productoSeleccionado.cantidad;
    } else {
        carrito.push({
            ...productoSeleccionado,
            precioUnitario: precio
        });
    }
    
    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Actualizar UI
    actualizarCarritoUI();
    
    // Mostrar confirmación
    alert(`${productoSeleccionado.nombre} agregado al carrito`);
}

// Mostrar carrito
function mostrarCarrito() {
    actualizarCarritoUI();
    modalCarrito.style.display = 'block';
}

// Actualizar UI del carrito
function actualizarCarritoUI() {
    itemsCarrito.innerHTML = '';
    let total = 0;
    
    carrito.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item-carrito';
        
        // Crear descripción de opciones
        let opcionesDesc = [];
        
        if (item.categoria === 'bebidas') {
            opcionesDesc.push(`Alcohol: ${item.opciones.alcohol === 'con' ? 'Con (INE requerida)' : 'Sin'}`);
            opcionesDesc.push(`Bubble Jelly: ${item.opciones.jelly === 'si' ? 'Sí' : 'No'}`);
        } 
        else if (item.categoria === 'tes') {
            opcionesDesc.push(`Azúcar: ${item.opciones.azucar}`);
            opcionesDesc.push(`Bubble Jelly: ${item.opciones.jelly === 'si' ? 'Sí' : 'No'}`);
        }
        else if (item.categoria === 'cafes') {
            opcionesDesc.push(`Leche: ${item.opciones.leche === 'con' ? 'Con' : 
                              item.opciones.leche === 'deslactosada' ? 'Deslactosada' : 'Sin'}`);
            opcionesDesc.push(`Azúcar: ${item.opciones.azucar}`);
            opcionesDesc.push(`Coffee Bubble: ${item.opciones.coffee_bubble === 'si' ? 'Sí' : 'No'}`);
        }
        
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
    
    // Actualizar total y contador
    totalCarrito.textContent = total.toFixed(2);
    contadorCarrito.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    
    // Agregar eventos a botones eliminar
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarritoUI();
        });
    });
}

// Enviar pedido por WhatsApp
function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    let mensaje = `*PEDIDO - GOLDEN DRINKS*%0A%0A`;
    
    // Agregar productos
    carrito.forEach(item => {
        mensaje += `*${item.nombre}* (${item.cantidad}x) - $${(item.precioUnitario * item.cantidad).toFixed(2)}%0A`;
        
        // Opciones según categoría
        if (item.categoria === 'bebidas') {
            mensaje += `• Alcohol: ${item.opciones.alcohol === 'con' ? 'CON (INE requerida)' : 'SIN'}%0A`;
            mensaje += `• Bubble Jelly: ${item.opciones.jelly === 'si' ? 'SÍ' : 'NO'}%0A`;
        } 
        else if (item.categoria === 'tes') {
            mensaje += `• Azúcar: ${item.opciones.azucar.toUpperCase()}%0A`;
            mensaje += `• Bubble Jelly: ${item.opciones.jelly === 'si' ? 'SÍ' : 'NO'}%0A`;
        }
        else if (item.categoria === 'cafes') {
            mensaje += `• Leche: ${item.opciones.leche === 'con' ? 'CON' : 
                       item.opciones.leche === 'deslactosada' ? 'DESLACTOSADA' : 'SIN'}%0A`;
            mensaje += `• Azúcar: ${item.opciones.azucar.toUpperCase()}%0A`;
            mensaje += `• Coffee Bubble: ${item.opciones.coffee_bubble === 'si' ? 'SÍ' : 'NO'}%0A`;
        }
        
        mensaje += `%0A`;
    });
    
    // Agregar total
    const total = carrito.reduce((sum, item) => sum + (item.precioUnitario * item.cantidad), 0);
    mensaje += `*TOTAL: $${total.toFixed(2)}*%0A%0A`;
    
    // Agregar datos de pago
    mensaje += `*DATOS DE PAGO*%0A`;
    mensaje += `CLABE: 012 261 01584933343 3%0A`;
    mensaje += `Titular: Eric Daniel Gutiérrez Arana%0A`;
    mensaje += `%0A*¡Gracias por tu pedido!*`;
    
    // Abrir WhatsApp
    window.open(`https://wa.me/525611649344?text=${mensaje}`, '_blank');
}
