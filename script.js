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
let currentImageUrl = null;

if (imageInput) {
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        currentImageUrl = URL.createObjectURL(file);

        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                originalImage = img;
                drawImageToCanvas(img);
                
                if (placeholderText) placeholderText.style.display = 'none';
                if (imageCanvas) imageCanvas.style.display = 'block';

                if (toolsSection) {
                    toolsSection.style.opacity = '1';
                    toolsSection.style.pointerEvents = 'auto';
                }
                if (exportSection) exportSection.style.display = 'flex';

                generarPanelReconocimiento();
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);
    });
}

function drawImageToCanvas(img) {
    if (!imageCanvas) return;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    ctx.drawImage(img, 0, 0);
}

function generarPanelReconocimiento() {
    if (!recContent) return;
    recContent.innerHTML = `
        <h4>✨ Identificación del Producto</h4>
        <div style="background: #1e293b; padding: 12px; border-radius: 6px; margin-top: 8px; font-size: 0.85rem;">
            <p><strong>📸 Imagen lista para analizar</strong></p>
            <p style="color: #94a3b8; margin: 4px 0 10px 0;">Usa el buscador visual para encontrar el producto exacto en internet:</p>
            
            <a href="https://images.google.com/searchbyimage?image_url=${encodeURIComponent(currentImageUrl)}" target="_blank" class="primary-btn" style="display: block; text-align: center; text-decoration: none; padding: 10px; font-size: 0.85rem; background: #2563eb; color: white; border-radius: 6px; margin-bottom: 12px;">
                <i class="fa-solid fa-camera"></i> Buscar Producto en Google (Lens)
            </a>

            <p><strong>📝 Plantilla de Descripción Comercial:</strong></p>
            <textarea id="descTextarea" style="width: 100%; height: 80px; background: #0f172a; color: #cbd5e1; border: 1px solid #334155; border-radius: 4px; padding: 8px; margin-top: 4px; font-size: 0.85rem; resize: none;">Artículo en excelente estado, cuidado y sin uso reciente. Diseño ideal y de gran calidad. Talla estándar (consulta medidas si lo necesitas). ¡Envío rápido y seguro! ✨</textarea>
            <br>
            <button class="primary-btn" style="width: 100%; padding: 8px; font-size: 0.85rem; margin-top: 8px;" onclick="copiarDescripcionPersonalizada()">
                <i class="fa-solid fa-copy"></i> Copiar Descripción
            </button>
        </div>

        <h4 style="margin-top: 15px;">💡 Consejos Pro para Vender Más</h4>
        <div style="background: #1e293b; padding: 12px; border-radius: 6px; margin-top: 8px; font-size: 0.85rem; line-height: 1.4;">
            <ul style="padding-left: 15px; color: #cbd5e1; display: flex; flex-direction: column; gap: 6px;">
                <li><strong>Fondo limpio:</strong> Usa el botón "Formato Vinted" para centrar la prenda sobre fondo blanco.</li>
                <li><strong>Medidas clave:</strong> Añade siempre en el texto el ancho de sisa y el largo total.</li>
                <li><strong>Precio inteligente:</strong> Pon un precio un 10% o 15% más alto para dejar margen al regateo.</li>
                <li><strong>Envío exprés:</strong> Indica que envías en menos de 24 horas para generar confianza.</li>
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

if (brightenBtn) {
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
}

if (contrastBtn) {
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
}

if (squareBtn) {
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
}

if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        if (!originalImage) return;
        const link = document.createElement('a');
        link.download = 'foto-vinted-optimizada.jpg';
        link.href = imageCanvas.toDataURL('image/jpeg', 0.92);
        link.click();
    });
}

if (googleSearchBtn) {
    googleSearchBtn.addEventListener('click', () => {
        const query = googleSearchInput.value.trim();
        if (!query) return;

        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(url, '_blank');
    });
}
