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
    if (regresarCarritoBtn) regresarCarritoBtn.addEventListener('click', () => {
        cerrarModalUbicacion();
        mostrarCarrito();
    });
    
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
