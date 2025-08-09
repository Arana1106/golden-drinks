// 📦 scripts.js - CÓDIGO COMPLETO (CON LOS 8 PRODUCTOS)

// ======================
// 🎯 PRODUCTOS COMPLETOS
// ======================
const productos = [
  // -------- BEBIDAS --------
  {
    id: 1,
    nombre: "Red Fire",
    categoria: "bebidas",
    precioBase: 35,
    descripcion: "Bebida sabor frutos rojos 475ml",
    opciones: {
      alcohol: [
        { texto: "Sin alcohol (+$0)", precio: 0 }, 
        { texto: "Con alcohol (+$10) � INE requerida", precio: 10 }
      ],
      bubbleJelly: [
        { texto: "Sí (+$5)", precio: 5 }, 
        { texto: "No (+$0)", precio: 0 }
      ]
    }
  },
  {
    id: 2,
    nombre: "Green Corp",
    categoria: "bebidas",
    precioBase: 35,
    descripcion: "Bebida sabor manzana verde 475ml",
    opciones: {
      alcohol: [
        { texto: "Sin alcohol (+$0)", precio: 0 }, 
        { texto: "Con alcohol (+$10) 🚨 INE requerida", precio: 10 }
      ],
      bubbleJelly: [
        { texto: "Sí (+$5)", precio: 5 }, 
        { texto: "No (+$0)", precio: 0 }
      ]
    }
  },
  {
    id: 3,
    nombre: "Dark Side",
    categoria: "bebidas",
    precioBase: 35,
    descripcion: "Bebida sabor frutos del bosque 475ml",
    opciones: {
      alcohol: [
        { texto: "Sin alcohol (+$0)", precio: 0 }, 
        { texto: "Con alcohol (+$10) 🚨 INE requerida", precio: 10 }
      ],
      bubbleJelly: [
        { texto: "Sí (+$5)", precio: 5 }, 
        { texto: "No (+$0)", precio: 0 }
      ]
    }
  },
  {
    id: 4,
    nombre: "Blue Sea",
    categoria: "bebidas",
    precioBase: 35,
    descripcion: "Bebida sabor blueberry 475ml",
    opciones: {
      alcohol: [
        { texto: "Sin alcohol (+$0)", precio: 0 }, 
        { texto: "Con alcohol (+$10) 🚨 INE requerida", precio: 10 }
      ],
      bubbleJelly: [
        { texto: "Sí (+$5)", precio: 5 }, 
        { texto: "No (+$0)", precio: 0 }
      ]
    }
  },

  // -------- CAFÉS --------
  {
    id: 5,
    nombre: "Café Remix",
    categoria: "cafes",
    precioBase: 25,
    descripcion: "Café deconstruido frío 475ml",
    opciones: {
      leche: [
        { texto: "Sin leche (+$0)", precio: 0 },
        { texto: "Con leche (+$10)", precio: 10 },
        { texto: "Leche deslactosada (+$10)", precio: 10 }
      ],
      azucar: [
        { texto: "Sin azúcar", precio: 0 },
        { texto: "Con azúcar", precio: 0 },
        { texto: "Sustituto de azúcar", precio: 0 }
      ],
      coffeeBubble: [
        { texto: "Sí (+$10)", precio: 10 },
        { texto: "No (+$0)", precio: 0 }
      ]
    }
  },
  {
    id: 6,
    nombre: "Café Descafeinado",
    categoria: "cafes",
    precioBase: 25,
    descripcion: "Café descafeinado frío 475ml",
    opciones: {
      leche: [
        { texto: "Sin leche (+$0)", precio: 0 },
        { texto: "Con leche (+$10)", precio: 10 },
        { texto: "Leche deslactosada (+$10)", precio: 10 }
      ],
      azucar: [
        { texto: "Sin azúcar", precio: 0 },
        { texto: "Con azúcar", precio: 0 },
        { texto: "Sustituto de azúcar", precio: 0 }
      ],
      coffeeBubble: [
        { texto: "Sí (+$10)", precio: 10 },
        { texto: "No (+$0)", precio: 0 }
      ]
    }
  },

  // -------- TÉS --------
  {
    id: 7,
    nombre: "Té del Día",
    categoria: "tes",
    precioBase: 25,
    descripcion: "Clásico té del día frío 475ml",
    opciones: {
      azucar: [
        { texto: "Sin azúcar", precio: 0 },
        { texto: "Con azúcar", precio: 0 },
        { texto: "Sustituto de azúcar", precio: 0 }
      ],
      bubbleJelly: [
        { texto: "Sí (+$5)", precio: 5 },
        { texto: "No (+$0)", precio: 0 }
      ]
    }
  },
  {
    id: 8,
    nombre: "Bebida del Día",
    categoria: "tes",
    precioBase: 25,
    descripcion: "Pregunta por los sabores 475ml",
    opciones: {
      azucar: [
        { texto: "Sin azúcar", precio: 0 },
        { texto: "Con azúcar", precio: 0 },
        { texto: "Sustituto de azúcar", precio: 0 }
      ],
      bubbleJelly: [
        { texto: "Sí (+$5)", precio: 5 },
        { texto: "No (+$0)", precio: 0 }
      ]
    }
  }
];

// ======================
// 🛒 CARRITO + FUNCIONALIDADES
// ======================
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(producto, opcionesSeleccionadas) {
  carrito.push({
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precioBase + opcionesSeleccionadas.precioExtra,
    cantidad: 1,
    opciones: opcionesSeleccionadas.texto
  });
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

function actualizarCarrito() {
  const listaCarrito = document.getElementById('lista-carrito');
  listaCarrito.innerHTML = '';
  
  let total = 0;
  carrito.forEach((item, index) => {
    total += item.precio * item.cantidad;
    listaCarrito.innerHTML += `
      <li>
        ${item.nombre} (${item.opciones}) 
        <span class="cantidad">
          <button onclick="cambiarCantidad(${index}, -1)">-</button>
          ${item.cantidad}
          <button onclick="cambiarCantidad(${index}, 1)">+</button>
        </span>
        <button onclick="eliminarItem(${index})">🗑️</button>
      </li>
    `;
  });

  document.getElementById('total').textContent = total;
  document.getElementById('contador').textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  document.getElementById('pagar-btn').disabled = carrito.length < 4;
}

// ======================
// 🕒 VALIDACIÓN DE HORARIOS
// ======================
function validarHorario() {
  const ahora = new Date();
  const hora = ahora.getHours();
  const dia = ahora.getDay(); // 0=domingo, 1=lunes...
  
  if (dia >= 1 && dia <= 4 && hora >= 9 && hora < 22) return true; // L-J 9-22
  if (dia >= 5 && hora >= 10 && hora < 24) return true; // V-S 10-24
  if (dia === 0 && hora >= 11 && hora < 19) return true; // D 11-19
  return false;
}

if (!validarHorario()) {
  document.getElementById('menu').innerHTML = `
    <div class="cerrado">
      <h2>🚫 Cerrado</h2>
      <p>Horario de servicio:</p>
      <p>L-J: 9:00 - 22:00 | V-S: 10:00 - 02:00 | D: 11:00 - 19:00</p>
    </div>
  `;
  document.querySelectorAll('.agregar-btn').forEach(btn => btn.disabled = true);
}

// ======================
// 📱 WHATSAPP INTEGRACIÓN
// ======================
document.getElementById('whatsapp-btn').addEventListener('click', () => {
  const pedido = carrito.map(item => 
    `*${item.cantidad}x ${item.nombre}* (${item.opciones}) - $${item.precio * item.cantidad}`
  ).join('%0A');
  
  const mensaje = `*📝 PEDIDO GOLDEN DRINKS*%0A%0A${pedido}%0A%0A*💰 TOTAL: $${document.getElementById('total').textContent}*%0A%0A*📍 Punto de recolección:*%0ACalle Coral 120, CDMX`;
  window.open(`https://wa.me/525611649344?text=${mensaje}`);
});

// ======================
// 🏁 INICIALIZACIÓN
// ======================
document.addEventListener('DOMContentLoaded', () => {
  // Generar productos en el DOM
  const menu = document.getElementById('menu');
  productos.forEach(producto => {
    menu.innerHTML += `
      <div class="producto" data-id="${producto.id}" data-categoria="${producto.categoria}" 
           data-precio-base="${producto.precioBase}">
        <div class="borde-color"></div>
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <button class="agregar-btn">Agregar</button>
      </div>
    `;
  });

  // Asignar eventos a los botones
  document.querySelectorAll('.agregar-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productoId = parseInt(e.target.closest('.producto').dataset.id);
      const producto = productos.find(p => p.id === productoId);
      mostrarModalOpciones(producto);
    });
  });
});
