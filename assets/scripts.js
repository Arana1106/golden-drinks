// Productos completos (8 items)
const productos = [
  // Bebidas
  { id: 1, nombre: "Red Fire", categoria: "bebidas", precioBase: 35, descripcion: "Bebida sabor frutos rojos 475ml", opciones: { /* ... */ } },
  { id: 2, nombre: "Green Corp", categoria: "bebidas", precioBase: 35, descripcion: "Bebida sabor manzana verde 475ml", opciones: { /* ... */ } },
  { id: 3, nombre: "Dark Side", categoria: "bebidas", precioBase: 35, descripcion: "Bebida sabor frutos del bosque 475ml", opciones: { /* ... */ } },
  { id: 4, nombre: "Blue Sea", categoria: "bebidas", precioBase: 35, descripcion: "Bebida sabor blueberry 475ml", opciones: { /* ... */ } },
  // Cafés
  { id: 5, nombre: "Café Remix", categoria: "cafes", precioBase: 25, descripcion: "Café deconstruido frío 475ml", opciones: { /* ... */ } },
  { id: 6, nombre: "Café Descafeinado", categoria: "cafes", precioBase: 25, descripcion: "Café descafeinado frío 475ml", opciones: { /* ... */ } },
  // Tés
  { id: 7, nombre: "Té del Día", categoria: "tes", precioBase: 25, descripcion: "Clásico té del día frío 475ml", opciones: { /* ... */ } },
  { id: 8, nombre: "Bebida del Día", categoria: "tes", precioBase: 25, descripcion: "Pregunta por los sabores 475ml", opciones: { /* ... */ } }
];

// Carrito y funcionalidades
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
  // Generar productos
  const menu = document.getElementById('menu');
  productos.forEach(producto => {
    menu.innerHTML += `
      <div class="producto" data-id="${producto.id}">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <button class="agregar-btn" data-id="${producto.id}">Agregar</button>
      </div>
    `;
  });

  // Eventos de botones
  document.querySelectorAll('.agregar-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      const producto = productos.find(p => p.id === id);
      mostrarModalOpciones(producto);
    });
  });

  // Más funcionalidades...
});

function mostrarModalOpciones(producto) {
  // Lógica para mostrar opciones
}

function actualizarCarrito() {
  // Lógica para actualizar carrito
}
