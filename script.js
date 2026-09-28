const imageInput = document.getElementById('imageInput');
const imageCanvas = document.getElementById('imageCanvas');
const ctx = imageCanvas.getContext('2d');

const placeholderText = document.getElementById('placeholderText');
const toolsSection = document.getElementById('toolsSection');
const exportSection = document.getElementById('exportSection');

const brightenBtn = document.getElementById('brightenBtn');
const contrastBtn = document.getElementById('contrastBtn');
const squareBtn = document.getElementById('squareBtn');
const downloadBtn = document.getElementById('downloadBtn');
const recContent = document.getElementById('recContent');

const googleSearchInput = document.getElementById('googleSearchInput');
const googleSearchBtn = document.getElementById('googleSearchBtn');

let originalImage = null;

// --- 1. CARGA, ANÁLISIS AUTOMÁTICO, CONSEJOS Y EDICIÓN DE FOTOS ---
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            originalImage = img;
            drawImageToCanvas(img);
            
            placeholderText.style.display = 'none';
            imageCanvas.style.display = 'block';

            toolsSection.style.opacity = '1';
            toolsSection.style.pointerEvents = 'auto';
            exportSection.style.display = 'flex';

            analizarImagenYGenerarAnuncio(img, file.name);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
});

function drawImageToCanvas(img) {
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    ctx.drawImage(img, 0, 0);
}

function analizarImagenYGenerarAnuncio(img, fileName) {
    const nombreLimpio = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

    // Autocompletamos el buscador con el nombre detectado del archivo
    googleSearchInput.value = nombreLimpio;

    recContent.innerHTML = `
        <h4>✨ Análisis de la Prenda</h4>
        <div style="background: #1e293b; padding: 12px; border-radius: 6px; margin-top: 8px; font-size: 0.85rem;">
            <p><strong>🏷️ Nombre detectado:</strong> <span style="color: #38bdf8;">${nombreLimpio}</span></p>
            <p><strong>📐 Dimensiones:</strong> ${img.width} x ${img.height} px</p>
            <br>
            <p><strong>📝 Descripción sugerida para Vinted / Wallapop:</strong></p>
            <p style="color: #cbd5e1; margin-top: 4px; font-style: italic; background: #0f172a; padding: 8px; border-radius: 4px;">
              "Prenda en excelente estado, cuidada y sin uso reciente. Diseño ideal para combinar. Talla estándar (consulta medidas si lo necesitas). Envío rápido y empaquetado seguro."
            </p>
            <br>
            <button class="primary-btn" style="width: 100%; padding: 8px; font-size: 0.85rem;" onclick="copiarDescripcionPreset()">
                <i class="fa-solid fa-copy"></i> Copiar Descripción
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

window.copiarDescripcionPreset = function() {
    const texto = "Prenda en excelente estado, cuidada y sin uso reciente. Diseño ideal para combinar. Talla estándar (consulta medidas si lo necesitas). Envío rápido y empaquetado seguro.";
    navigator.clipboard.writeText(texto);
    alert("¡Descripción copiada al portapapeles con éxito!");
};

// Botón: Iluminación Pro
brightenBtn.addEventListener('click', () => {
    if (!originalImage) return;
    drawImageToCanvas(originalImage);
    const imageData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
    const data = imageData.data;
    const adjustment = 35;
    for (let i = 0; i < data.length; i += 4) {
        data[i]     = Math.min(255, data[i] + adjustment);     
        data[i + 1] = Math.min(255, data[i + 1] + adjustment); 
        data[i + 2] = Math.min(255, data[i + 2] + adjustment); 
    }
    ctx.putImageData(imageData, 0, 0);
});

// Botón: Contraste Ideal
contrastBtn.addEventListener('click', () => {
    if (!originalImage) return;
    drawImageToCanvas(originalImage);
    const imageData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
    const data = imageData.data;
    const factor = 1.25; 
    for (let i = 0; i < data.length; i += 4) {
        data[i]     = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
        data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
        data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
    }
    ctx.putImageData(imageData, 0, 0);
});

// Botón: Cuadrar Formato Vinted (1:1 con fondo blanco)
squareBtn.addEventListener('click', () => {
    if (!originalImage) return;
    const size = Math.max(originalImage.width, originalImage.height);
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = size;
    tempCanvas.height = size;
    const tempCtx = tempCanvas.getContext('2d');

    tempCtx.fillStyle = '#FFFFFF';
    tempCtx.fillRect(0, 0, size, size);

    const x = (size - originalImage.width) / 2;
    const y = (size - originalImage.height) / 2;
    tempCtx.drawImage(imageCanvas, x, y);

    imageCanvas.width = size;
    imageCanvas.height = size;
    ctx.drawImage(tempCanvas, 0, 0);
});

// Botón: Descargar Foto Optimizada
downloadBtn.addEventListener('click', () => {
    if (!originalImage) return;
    const link = document.createElement('a');
    link.download = 'foto-vinted-optimizada.jpg';
    link.href = imageCanvas.toDataURL('image/jpeg', 0.92);
    link.click();
});

// --- 2. BÚSQUEDA DIRECTA EN GOOGLE ---
googleSearchBtn.addEventListener('click', () => {
    const query = googleSearchInput.value.trim();
    if (!query) return;

    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(url, '_blank');

    recContent.innerHTML = `
        <h4>🌐 Búsqueda en Google</h4>
        <p>Se ha abierto una pestaña en tu navegador con la búsqueda de: "<strong>${query}</strong>".</p>
    `;
});
