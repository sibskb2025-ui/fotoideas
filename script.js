function analizarImagenYGenerarAnuncio(img, fileName) {
    const nombreLimpio = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

    googleSearchInput.value = nombreLimpio;

    // Generamos una descripción más dinámica basada en el nombre del archivo/producto
    const descripcionIdeal = `¡Hola! Vendo este/a ${nombreLimpio} en excelente estado. Usado muy pocas veces, cuidado y sin desperfectos. Ideal para combinar y de gran calidad. Talla estándar (puedes pedirme medidas sin compromiso). ¡Hago envíos rápidos y seguros! ✨`;

    recContent.innerHTML = `
        <h4>✨ Análisis de la Prenda</h4>
        <div style="background: #1e293b; padding: 12px; border-radius: 6px; margin-top: 8px; font-size: 0.85rem;">
            <p><strong>🏷️ Producto detectado:</strong> <span style="color: #38bdf8; text-transform: capitalize;">${nombreLimpio}</span></p>
            <p><strong>📐 Dimensiones:</strong> ${img.width} x ${img.height} px</p>
            <br>
            <a href="https://images.google.com/searchbyimage?image_url=${encodeURIComponent(currentImageUrl)}" target="_blank" class="primary-btn" style="display: block; text-align: center; text-decoration: none; padding: 10px; font-size: 0.85rem; background: #2563eb; color: white; border-radius: 6px; margin-bottom: 12px;">
                <i class="fa-solid fa-camera"></i> Reconocer Producto (Google Lens)
            </a>
            <p><strong>📝 Descripción Pro para Vinted / Wallapop:</strong></p>
            <textarea id="descTextarea" style="width: 100%; height: 80px; background: #0f172a; color: #cbd5e1; border: 1px solid #334155; border-radius: 4px; padding: 8px; margin-top: 4px; font-size: 0.85rem; resize: none;">${descripcionIdeal}</textarea>
            <br>
            <button class="primary-btn" style="width: 100%; padding: 8px; font-size: 0.85rem; margin-top: 8px;" onclick="copiarDescripcionPersonalizada()">
                <i class="fa-solid fa-copy"></i> Copiar Descripción Perfecta
            </button>
        </div>

        <h4 style="margin-top: 15px;">💡 Consejos Pro para Vender Más</h4>
        <div style="background: #1e293b; padding: 12px; border-radius: 6px; margin-top: 8px; font-size: 0.85rem; line-height: 1.4;">
            <ul style="padding-left: 15px; color: #cbd5e1; display: flex; flex-direction: column; gap: 6px;">
                <li><strong>Fondo limpio:</strong> Usa el botón "Cuadrar Formato Vinted" para centrar la prenda sobre fondo blanco; los compradores descartan fotos desordenadas.</li>
                <li><strong>Medidas clave:</strong> Añade siempre en el texto de tu anuncio el ancho de sisa a sisa y el largo total para evitar preguntas repetitivas.</li>
                <li><strong>Precio inteligente:</strong> Pon un precio un 10% o 15% más alto de lo que deseas para dejar margen a las ofertas y regateos típicos de la plataforma.</li>
                <li><strong>Envío exprés:</strong> Indica en tu perfil que envías en menos de 24 horas; eso genera confianza y acelera la compra.</li>
            </ul>
        </div>
    `;
}

window.copiarDescripcionPersonalizada = function() {
    const textarea = document.getElementById('descTextarea');
    if (!textarea) return;
    textarea.select();
    navigator.clipboard.writeText(textarea.value);
    alert("¡Descripción copiada con éxito lista para pegar en Vinted o Wallapop!");
};
