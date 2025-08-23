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
            descripcion: "Pacto con el diablo, tranquilo solo es un suave café frío descafeinado 475ml",
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
        coordenadas: "19.4777778,-99.1169444",
        iframe: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.381734292895!2d-99.1195194!3d19.4777778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI4JzQ0LjAiTiA5OcKwMDcnMDEuMCJX!5e0!3m2!1sen!2smx!4v1620000000000!5m2!1sen!2smx" width="100%" height="300" style="border:0;" allowfullscreen loading="lazy"></iframe>`
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
let modalUbicacion = document.getElementById('modal-ubicacion'); // Cambiado a let para poder reasignar
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
    if (whatsappBtn) whatsappBtn.addEventListener('click', mostrarSeleccionUbicacion);
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
    // Esto previene errores en la consola
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
                <label><input type="radio
