<script>
        let selectedTerrain = 'plains';
        let isDrawing = false;
        let isPointMode = false;
        let isMouseDown = false;

        // Initialiser la grille
        const mapContainer = document.getElementById('mapContainer');
        const gridSize = { width: 40, height: 30 };
        const terrainData = Array(gridSize.height).fill().map(() => Array(gridSize.width).fill(''));

        function generateTiles() {
            mapContainer.innerHTML = ''; // Clear existing tiles
            terrainData.forEach((row, y) => {
                row.forEach((tile, x) => {
                    const tileElement = document.createElement('div');
                    tileElement.className = 'tile';
                    tileElement.dataset.x = x;
                    tileElement.dataset.y = y;
                    mapContainer.appendChild(tileElement);
                });
            });
        }

        // Créer la grille initiale
        generateTiles();

        // Gestion de la palette
        document.querySelectorAll('.palette-tile').forEach(tile => {
            tile.addEventListener('click', (e) => {
                document.querySelectorAll('.palette-tile').forEach(t => t.classList.remove('selected'));
                e.target.classList.add('selected');
                selectedTerrain = e.target.dataset.terrain;
            });
        });

        // Gestion du dessin
        mapContainer.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            if (e.target.classList.contains('tile')) {
                if (isPointMode) {
                    addPoint(e.target);
                } else {
                    paintTile(e.target);
                }
            }
        });

        mapContainer.addEventListener('mousemove', (e) => {
            if (isMouseDown && isDrawing && e.target.classList.contains('tile')) {
                paintTile(e.target);
            }
        });

        document.addEventListener('mouseup', () => {
            isMouseDown = false;
        });

        function paintTile(tile) {
            // Retirer les classes de terrain existantes
            tile.className = 'tile';
            if (selectedTerrain) {
                tile.classList.add(`terrain-${selectedTerrain}`);
            }

            // Mettre à jour les données
            const x = parseInt(tile.dataset.x);
            const y = parseInt(tile.dataset.y);
            terrainData[y][x] = selectedTerrain;
        }

        function addPoint(tile) {
            const point = document.createElement('div');
            point.className = 'point';
            point.style.left = `${tile.offsetLeft + tile.offsetWidth / 2}px`;
            point.style.top = `${tile.offsetTop + tile.offsetHeight / 2}px`;
            mapContainer.appendChild(point);
        }

        function toggleDrawing() {
            isDrawing = !isDrawing;
            const btn = document.querySelector('button:nth-last-child(3)');
            btn.textContent = `Mode dessin: ${isDrawing ? 'ON' : 'OFF'}`;
        }

        function togglePointMode() {
            isPointMode = !isPointMode;
            const btn = document.querySelector('button:nth-last-child(2)');
            btn.textContent = `Ajouter Points: ${isPointMode ? 'ON' : 'OFF'}`;
        }

        function clearMap() {
            document.querySelectorAll('.tile').forEach(tile => {
                tile.className = 'tile';
            });
            document.querySelectorAll('.point').forEach(point => {
                point.remove();
            });
            terrainData.forEach(row => row.fill(''));
        }

        function saveMap() {
            const mapData = {
                terrain: terrainData,
                width: gridSize.width,
                height: gridSize.height,
                timestamp: new Date().toISOString()
            };
            
            const blob = new Blob([JSON.stringify(mapData, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'carte-fantasy.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        function saveAsJpeg() {
            html2canvas(mapContainer).then(canvas => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/jpeg');
                link.download = 'carte-fantasy.jpg';
                link.click();
            });
        }

        function uploadImage() {
            document.getElementById('imageUploader').click();
        }

        document.getElementById('imageUploader').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    img.style.position = 'absolute';
                    img.style.left = '0';
                    img.style.top = '0';
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.pointerEvents = 'none';
                    mapContainer.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });
    </script>
