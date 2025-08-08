// Configuración global
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let productoSeleccionado = null;

// Elementos del DOM
const contadorCarrito = document.getElementById('contador-carrito');
const modalOpciones = document.getElementById('modal-opciones');
const modalCarrito = document.getElementById('modal-carrito');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    actualizarCarritoUI();
    
    // Event listeners
    document.getElementById('carrito-btn').addEventListener('click', mostrarCarrito);
    document.getElementById('whatsapp-btn').addEventListener('click', enviarWhatsApp);
});

// Cargar productos
async function cargarProductos() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        renderizarProductos(data);
    } catch (error) {
        console.error("Error:", error);
        alert("Error al cargar productos");
    }
}

// Renderizar productos
function renderizarProductos(data) {
    const contenedores = {
        'bebidas': document.getElementById('bebidas-container'),
        'tes': document.getElementById('tes-container'),
        'cafes': document.getElementById('cafes-container')
    };

    Object.entries(data).forEach(([categoria, productos]) => {
        Object.entries(productos).forEach(([nombre, producto]) => {
            const card = document.createElement('div');
            card.className = 'producto-card';
            card.setAttribute('data-producto', nombre);
            card.innerHTML = `
                <h3>${nombre}</h3>
                <p>${producto.descripcion}</p>
                <button class="btn-seleccionar" data-producto="${nombre}" data-categoria="${categoria}">
                    Seleccionar
                </button>
            `;
            contenedores[categoria].appendChild(card);
        });
    });
}

// ... [Resto del código JavaScript anterior con las correcciones para Bubble Jelly]

