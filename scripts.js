// Base de Datos de Productos
const productos = [
  {
    id: "red-fire-smoke",
    nombre: "Red Fire Smoke",
    precio: 35,
    categoria: "bebida",
    opciones: {
      alcohol: { texto: "Con alcohol (+$10)", precio: 10 },
      bubbleJelly: { texto: "Bubble Jelly (+$5)", precio: 5 }
    }
  },
  {
    id: "green-corp-smoke",
    nombre: "Green Corp Smoke",
    precio: 35,
    categoria: "bebida",
    opciones: {
      alcohol: { texto: "Con alcohol (+$10)", precio: 10 },
      bubbleJelly: { texto: "Bubble Jelly (+$5)", precio: 5 }
    }
  },
  {
    id: "dark-side-smoke",
    nombre: "Dark Side Smoke",
    precio: 35,
    categoria: "bebida",
    opciones: {
      alcohol: { texto: "Con alcohol (+$10)", precio: 10 },
      bubbleJelly: { texto: "Bubble Jelly (+$5)", precio: 5 }
    }
  },
  {
    id: "blue-sea-smoke",
    nombre: "Blue Sea Smoke",
    precio: 35,
    categoria: "bebida",
    opciones: {
      alcohol: { texto: "Con alcohol (+$10)", precio: 10 },
      bubbleJelly: { texto: "Bubble Jelly (+$5)", precio: 5 }
    }
  },
  {
    id: "cafe-remix",
    nombre: "Café Remix",
    precio: 25,
    categoria: "cafe",
    opciones: {
      leche: { texto: "Leche (+$10)", precio: 10 },
      azucar: { texto: "Azúcar", precio: 0 },
      coffeeBubble: { texto: "Coffee Bubble (+$10)", precio: 10 }
    }
  },
  {
    id: "cafe-descafeinado",
    nombre: "Café Descafeinado",
    precio: 25,
    categoria: "cafe",
    opciones: {
      leche: { texto: "Leche (+$10)", precio: 10 },
      azucar: { texto: "Azúcar", precio: 0 },
      coffeeBubble: { texto: "Coffee Bubble (+$10)", precio: 10 }
    }
  },
  {
    id: "te-del-dia",
    nombre: "Té del Día",
    precio: 25,
    categoria: "te",
    opciones: {
      azucar: { texto: "Azúcar", precio: 0 },
      bubbleJelly: { texto: "Bubble Jelly (+$5)", precio: 5 }
    }
  },
  {
    id: "bebida-del-dia",
    nombre: "Bebida del Día",
    precio: 25,
    categoria: "te",
    opciones: {
      azucar: { texto: "Azúcar", precio: 0 },
      bubbleJelly: { texto: "Bubble Jelly (+$5)", precio: 5 }
    }
  }
];

// Variables Globales
let carrito = [];

// Funciones
function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  carrito.push(producto);
  actualizarCarrito();
}

function actualizarCarrito() {
  console.log("Carrito actualizado:", carrito);
}

// Eventos
document.querySelectorAll(".btn-add").forEach(btn => {
  btn.addEventListener("click", function() {
    const idProducto = this.getAttribute("data-id");
    agregarAlCarrito(idProducto);
  });
});
