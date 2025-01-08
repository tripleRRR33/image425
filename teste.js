const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
}

// Adjust gridSize based on canvas size
let gridSize = Math.min(canvas.width, canvas.height) / 20; 
let elements = [];
let currentTool = null;
let zoomLevel = 1;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let startDragOffset = { x: 0, y: 0 };
let startPoint = null;

// Draw the grid
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(zoomLevel, zoomLevel);
    ctx.strokeStyle = '#ddd';
    for (let x = 0; x < canvas.width / zoomLevel; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height / zoomLevel);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height / zoomLevel; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width / zoomLevel, y);
        ctx.stroke();
    }
    ctx.restore();
}

// Draw all elements on the map
function drawElements() {
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(zoomLevel, zoomLevel);
    elements.forEach(el => {
        if (el.type === 'town') {
            ctx.fillStyle = 'blue';
            ctx.beginPath();
            ctx.arc(el.x, el.y, 10, 0, Math.PI * 2);
            ctx.fill();
        }
        if (el.type === 'road') {
            ctx.strokeStyle = 'brown';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(el.startX, el.startY);
            ctx.lineTo(el.endX, el.endY);
            ctx.stroke();
        }
        if (el.type === 'tile') {
            switch (el.tileType) {
                case 'water': ctx.fillStyle = 'lightblue'; break;
                case 'forest': ctx.fillStyle = 'green'; break;
                case 'mountain': ctx.fillStyle = 'gray'; break;
                case 'beach': ctx.fillStyle = 'sandybrown'; break;
                case 'desert': ctx.fillStyle = 'khaki'; break;
                case 'swamp': ctx.fillStyle = 'darkgreen'; break;
                case 'prairie': ctx.fillStyle = 'lightgreen'; break;
                case 'snow': ctx.fillStyle = 'lightgray'; break;
                case 'volcano': ctx.fillStyle = 'darkred'; break;
                case 'city': ctx.fillStyle = 'darkgray'; break;
                case 'riceField': ctx.fillStyle = 'palegreen'; break;
                case 'savanna': ctx.fillStyle = 'goldenrod'; break;
                case 'jungle': ctx.fillStyle = 'darkolivegreen'; break;
                case 'hills': ctx.fillStyle = 'darkkhaki'; break;
                case 'river': ctx.fillStyle = 'skyblue'; break;
                case 'cave': ctx.fillStyle = 'dimgray'; break;
                case 'field': ctx.fillStyle = 'wheat'; break;
                case 'glacier': ctx.fillStyle = 'lightcyan'; break;
            }
            ctx.fillRect(el.x - el.size / 2, el.y - el.size / 2, el.size, el.size);
        }
        if (el.type === 'emoji') {
            ctx.font = `${el.size}px "Segoe UI Emoji", "Noto Color Emoji"`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(el.emoji, el.x, el.y);
        }
    });
    ctx.restore();
}

// Re-render the entire map
function render() {
    drawGrid();
    drawElements();
}

// Function to find a tile at a given position
function getTileAtPosition(x, y) {
    return elements.find(el => el.type === 'tile' && Math.abs(el.x - x) < el.size / 2 && Math.abs(el.y - y) < el.size / 2);
}

// Add event listeners for buttons
document.getElementById('addTown').addEventListener('click', () => {
    currentTool = 'addTown';
});

document.getElementById('addRoad').addEventListener('click', () => {
    currentTool = 'addRoad';
});

document.getElementById('addTile').addEventListener('click', () => {
    currentTool = 'addTile';
});

document.getElementById('addEmoji').addEventListener('click', () => {
    currentTool = 'emoji';
});

document.getElementById('removeElement').addEventListener('click', () => {
    currentTool = 'remove';
});

document.getElementById('reset').addEventListener('click', () => {
    elements = [];
    render();
});

// Handle canvas interactions
canvas.addEventListener('mousedown', (event) => {
    isDragging = true;
    startDragOffset.x = event.clientX - offsetX;
    startDragOffset.y = event.clientY - offsetY;
});

canvas.addEventListener('mousemove', (event) => {
    if (isDragging) {
        offsetX = event.clientX - startDragOffset.x;
        offsetY = event.clientY - startDragOffset.y;
        render();
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

canvas.addEventListener('wheel', (event) => {
    const zoomIntensity = 0.1;
    const mousePos = {
        x: event.clientX - offsetX,
        y: event.clientY - offsetY
    };
    if (event.deltaY < 0) {
        zoomLevel *= 1 + zoomIntensity;
    } else {
        zoomLevel *= 1 - zoomIntensity;
    }
    offsetX -= mousePos.x * zoomIntensity;
    offsetY -= mousePos.y * zoomIntensity;
    render();
});

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = (Math.floor((event.clientX - offsetX) / zoomLevel / gridSize) * gridSize + gridSize / 2);
    const y = (Math.floor((event.clientY - offsetY) / zoomLevel / gridSize) * gridSize + gridSize / 2);

    if (currentTool === 'addTown') {
        elements.push({ type: 'town', x, y });
    }

    if (currentTool === 'addRoad') {
        if (!startPoint) {
            startPoint = { x, y };
        } else {
            elements.push({
                type: 'road',
                startX: startPoint.x,
                startY: startPoint.y,
                endX: x,
                endY: y
            });
            startPoint = null;
        }
    }

    if (currentTool === 'addTile') {
        const tileType = document.getElementById('tileType').value;
        const size = parseInt(document.getElementById('tileSize').value);
        elements.push({ type: 'tile', x, y, tileType, size });
    }

    if (currentTool === 'remove') {
        const index = elements.findIndex(el =>
            (el.type === 'town' && Math.hypot(el.x - x, el.y - y) < 10) ||
            (el.type === 'road' && Math.hypot((el.startX + el.endX) / 2 - x, (el.startY + el.endY) / 2 - y) < 20) ||
            (el.type === 'tile' && el.x === x && el.y === y) ||
            (el.type === 'emoji' && Math.hypot(el.x - x, el.y - y) < el.size / 2)
        );
        if (index !== -1) elements.splice(index, 1);
    }

    if (currentTool === 'emoji') {
        // Vérifier si l'émoji peut être placé sur une tuile existante
        const tile = getTileAtPosition(x, y);
        if (tile) {
            const emoji = document.getElementById('tileType').value;
            const size = tile.size; // Utiliser la taille de la tuile
            elements.push({ type: 'emoji', x: tile.x, y: tile.y, emoji, size });
        }
    }

    render();
});

// Update tile coordinates and size
document.getElementById('tileX').addEventListener('input', () => {
    if (currentTool === 'addTile' || currentTool === 'emoji') {
        elements[elements.length - 1].x = parseInt(document.getElementById('tileX').value);
        render();
    }
});

document.getElementById('tileY').addEventListener('input', () => {
    if (currentTool === 'addTile' || currentTool === 'emoji') {
        elements[elements.length - 1].y = parseInt(document.getElementById('tileY').value);
        render();
    }
});

document.getElementById('tileSize').addEventListener('input', () => {
    if (currentTool === 'addTile' || currentTool === 'emoji') {
        elements[elements.length - 1].size = parseInt(document.getElementById('tileSize').value);
        render();
    }
});

// Function to download canvas as JPEG
function downloadCanvasAsJPEG() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg', 1.0); // Convertir le canvas en JPEG
    link.download = 'map.jpg'; // Nom du fichier téléchargé
    link.click(); // Simuler le clic pour démarrer le téléchargement
}

// Ajouter un gestionnaire d'événements pour le bouton de téléchargement
document.getElementById('downloadCanvas').addEventListener('click', downloadCanvasAsJPEG);

// Resize the canvas when the window is resized
window.addEventListener('resize', resizeCanvas);

// Initial canvas size setup
resizeCanvas();

// Initial render
render();
