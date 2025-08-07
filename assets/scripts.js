/* ESTILOS GENERALES */
body {
  font-family: 'Arial', sans-serif;
  background: #121212 url('https://www.transparenttextures.com/patterns/black-paper.png');
  color: #fff;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #efb810;
  text-align: center;
  text-shadow: 0 0 10px rgba(239, 184, 16, 0.7);
  margin-bottom: 30px;
}

/* PRODUCTOS */
.producto {
  background: rgba(30, 30, 30, 0.9);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #333;
}

.producto h3 {
  margin-top: 0;
  color: #efb810;
}

/* OPCIONES */
.opciones-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 15px 0;
}

.opcion {
  padding: 10px;
  background: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
}

.opcion:hover {
  background: #444;
}

.opcion-seleccionada {
  background: #efb810;
  color: #000;
  font-weight: bold;
}

/* CARRITO */
.carrito-flotante {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #efb810;
  color: #000;
  padding: 12px 20px;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(0,0,0,0.5);
  z-index: 1000;
}

/* MODAL */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.9);
  z-index: 2000;
}

.modal-contenido {
  background: #222;
  margin: 50px auto;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  border-radius: 10px;
  border: 1px solid #efb810;
}

/* RESPONSIVE */
@media (max-width: 600px) {
  .opciones-grid {
    grid-template-columns: 1fr;
  }
  
  .producto {
    padding: 10px;
  }
}
