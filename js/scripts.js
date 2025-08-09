// Base de Datos de Productos
const productosDB = {
  bebidas: [
    { 
      id: "red-fire-smoke",
      nombre: "Red Fire Smoke", 
      precio: 35,
      opciones: {
        alcohol: { texto: "Con alcohol (+$10)", precio: 10 },
        bubbleJelly: { texto: "Bubble Jelly (+$5)", precio: 5 }
      }
    },
    { 
      id: "green-corp-smoke",
      nombre: "Green Corp Smoke", 
      precio: 35,
      opciones: {
        alcohol: { texto: "Con alcohol (+$10)", precio: 10 },
        bubbleJelly: { texto: "Bubble Jelly (+$5)", precio: 5 }
      }
    },
    { 
      id: "dark-side-smoke",
      nombre: "Dark Side Smoke", 
      precio: 35,
      opciones: {
        alcohol: { texto: "Con alcohol (+$10)", precio: 10 },
        bubbleJelly: { texto: "Bubble Jelly (+$5)", precio: 5 }
      }
    },
    { 
      id: "blue-sea-smoke",
      nombre: "Blue Sea Smoke", 
      precio: 35,
      opciones: {
        alcohol: { texto: "Con alcohol (+$10)", precio: 10 },
        bubbleJelly: { texto: "Bubble Jelly (+$5)", precio: 5 }
      }
    }
  ],
  cafes: [
    {
      id: "cafe-remix",
      nombre: "Café Remix", 
      precio: 25,
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
      opciones: {
        leche: { texto: "Leche (+$10)", precio: 10 },
        azucar: { texto: "Azúcar", precio: 0 },
        coffeeBubble: { texto: "Coffee Bubble (+$10)", precio: 10 }
      }
    }
  ],
  tes: [
    {
      id: "te-del-dia",
      nombre: "Té del Día", 
      precio: 25,
      opciones: {
        azucar: { texto: "Azúcar", precio: 0 },
        bubbleJelly: { texto: "Bubble Jelly (+$5)", precio: 5 }
      }
    },
    {
      id: "bebida-del-dia",
      nombre: "Bebida del Día", 
      precio: 25,
      opciones: {
        azucar: { texto: "Azúcar", precio: 0 },
        bubbleJelly: { texto: "Bubble Jelly (+$5)", precio: 5 }
      }
    }
  ]
};

// Variables Globales
let carrito = [];

// Funciones
function agregarAlCarrito(producto, opciones = []) {
  carrito.push({ producto, opciones });
  console.log("Producto agregado:", producto.nombre, "Opciones:", opciones);
}

// Eventos
document.querySelectorAll(".btn-add").forEach(btn => {
  btn.addEventListener("click", function() {
    const productoId = this.closest(".product-card").id;
    const producto = Object.values(productosDB)
      .flat()
      .find(item => item.id === productoId);
    
    if (producto) {
      console.log("Seleccionado:", producto.nombre);
      // Aquí iría la lógica del modal de opciones
    }
  });
});

