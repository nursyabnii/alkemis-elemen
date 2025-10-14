document.addEventListener('DOMContentLoaded', () => {
    // --- DATABASE ELEMEN & RESEP (DIPERBARUI) ---
    const ELEMENTS = {
        // I. Unsur (Zat Murni Tunggal dari Tabel Periodik)
        // Logam Alkali & Alkali Tanah
        'natrium': { name: 'Natrium (Na)', emoji: '🧂' },
        'kalium': { name: 'Kalium (K)', emoji: '🍌' },
        'kalsium': { name: 'Kalsium (Ca)', emoji: '🦴' },
        'magnesium': { name: 'Magnesium (Mg)', emoji: '🎇' },
        // Logam Transisi
        'besi': { name: 'Besi (Fe)', emoji: '🔩' },
        'tembaga': { name: 'Tembaga (Cu)', emoji: '🥉' },
        'seng': { name: 'Seng (Zn)', emoji: '⛓️' },
        'emas': { name: 'Emas (Au)', emoji: '🥇' },
        'perak': { name: 'Perak (Ag)', emoji: '🥈' },
        // Non-Logam & Pembentuk Kehidupan
        'hidrogen': { name: 'Hidrogen (H)', emoji: '💨' },
        'karbon': { name: 'Karbon (C)', emoji: '💎' },
        'nitrogen': { name: 'Nitrogen (N)', emoji: '💨' },
        'oksigen': { name: 'Oksigen (O)', emoji: '😮' },
        'fosfor': { name: 'Fosfor (P)', emoji: 'MATCH' },
        'belerang': { name: 'Belerang (S)', emoji: '🌋' },
        // Halogen & Gas Mulia
        'klorin': { name: 'Klorin (Cl)', emoji: '🏊' },
        'fluorin': { name: 'Fluorin (F)', emoji: '🦷' },
        'helium': { name: 'Helium (He)', emoji: '🎈' },
        'neon': { name: 'Neon (Ne)', emoji: '💡' },
        // Metaloid
        'silikon': { name: 'Silikon (Si)', emoji: '💻' },

        // II. Senyawa (Gabungan Kimia Antar Unsur)
        // Senyawa Anorganik Sederhana
        'air': { name: 'Air (H₂O)', emoji: '💧' },
        'karbon dioksida': { name: 'Karbon Dioksida (CO₂)', emoji: '💨' },
        'garam dapur': { name: 'Natrium Klorida (NaCl)', emoji: '🧂' },
        'amonia': { name: 'Amonia (NH₃)', emoji: '👃' },
        'pasir': { name: 'Silikon Dioksida (SiO₂)', emoji: '⏳' },
        'karat': { name: 'Oksida Besi (Fe₂O₃)', emoji: '🔩' },
        // Asam & Basa
        'asam klorida': { name: 'Asam Klorida (HCl)', emoji: '🧪' },
        'asam sulfat': { name: 'Asam Sulfat (H₂SO₄)', emoji: '☠️' },
        'natrium hidroksida': { name: 'Natrium Hidroksida (NaOH)', emoji: '🧼' },
        // Senyawa Organik (Berbasis Karbon)
        'metana': { name: 'Metana (CH₄)', emoji: '🔥' },
        'etanol': { name: 'Etanol (C₂H₅OH)', emoji: '🍷' },
        'glukosa': { name: 'Glukosa (C₆H₁₂O₆)', emoji: '🍬' },
        'asam asetat': { name: 'Asam Asetat (CH₃COOH)', emoji: '🍶' },

        // III. Campuran (Gabungan Fisik)
        // Campuran Homogen (Larutan)
        'udara': { name: 'Udara (N₂, O₂, Ar, dll)', emoji: '🌬️' },
        'air gula': { name: 'Air Gula (C₆H₁₂O₆ + H₂O)', emoji: '🥤' },
        'air garam': { name: 'Air Garam (NaCl + H₂O)', emoji: '🌊' },
        'baja': { name: 'Baja (Fe + C)', emoji: '⛓️' },
        'kuningan': { name: 'Kuningan (Cu + Zn)', emoji: '🎺' },
        // Campuran Heterogen
        'pasir dan air': { name: 'Pasir & Air', emoji: '🏖️' },
        'minyak dan air': { name: 'Minyak & Air', emoji: '🥗' },
        'beton': { name: 'Beton (Semen, Pasir, Kerikil, Air)', emoji: '🧱' },
        'susu': { name: 'Susu (Lemak, Protein, Air)', emoji: '🥛' },
    };

    const RECIPES = {
        // IV. Resep Pembentukan (Reaksi & Pencampuran)

        // Pembentukan Senyawa Anorganik Dasar
        'hidrogen,oksigen': 'air',
        'karbon,oksigen': 'karbon dioksida',
        'natrium,klorin': 'garam dapur',
        'nitrogen,hidrogen': 'amonia',
        'besi,oksigen': 'karat',
        'silikon,oksigen': 'pasir',
        'belerang,oksigen': 'sulfur dioksida', // Langkah 1 untuk Asam Sulfat

        // Pembentukan Asam
        'hidrogen,klorin': 'asam klorida',
        // DIUBAH: Asam Sulfat dibuat dalam 2 langkah
        'air,sulfur dioksida': 'asam sulfat', // Langkah 2 untuk Asam Sulfat

        // Pembentukan Basa
        // DIUBAH: Natrium Hidroksida disederhanakan menjadi 2 elemen
        'natrium,air': 'natrium hidroksida',

        // Pembentukan Senyawa Organik
        'karbon,hidrogen': 'metana',
        'air,karbon dioksida': 'glukosa', // Fotosintesis (disederhanakan)
        'glukosa': 'etanol', // Fermentasi (disederhanakan, gabungkan glukosa dengan dirinya sendiri)
        'etanol,oksigen': 'asam asetat',

        // Pembentukan Campuran (Larutan & Material)
        'glukosa,air': 'air gula',
        'garam dapur,air': 'air garam',
        'besi,karbon': 'baja',
        'tembaga,seng': 'kuningan',
    };


    // --- VARIABEL GLOBAL & DOM ELEMENTS ---
    const workspace = document.getElementById('workspace');
    const elementPanel = document.getElementById('element-panel');
    const elementCountSpan = document.getElementById('element-count');
    const totalElementsSpan = document.getElementById('total-elements');
    const resetButton = document.getElementById('reset-button');
    const resetProgressButton = document.getElementById('reset-progress-button');
    const notification = document.getElementById('notification');

    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalButton = document.getElementById('close-modal-button');
    const showInstructionsButton = document.getElementById('show-instructions-button');

    const hintButton = document.getElementById('hint-button');
    const hintDisplay = document.getElementById('hint-display');
    const hintCountSpan = document.getElementById('hint-count');

    // *** DAFTAR ELEMEN AWAL YANG DITEMUKAN (DIPERBARUI) ***
    let discoveredElements = new Set([
        'hidrogen', 'oksigen', 'karbon', 'nitrogen', 'natrium', 'klorin',
        'besi', 'silikon', 'belerang', 'tembaga', 'seng'
    ]);
    let workspaceElements = new Map();
    let uniqueIdCounter = 0;

    let hintCount = 3;
    let hintedResult = null;

    let touchDragState = {
        isDragging: false,
        elementId: null,
        instanceId: null,
        draggedElement: null,
    };

    // --- FUNGSI-FUNGSI UTAMA ---

    function saveProgress() {
        localStorage.setItem('discoveredElements', JSON.stringify(Array.from(discoveredElements)));
        localStorage.setItem('alkemisHintCount', hintCount);
    }

    function loadProgress() {
        const savedData = localStorage.getItem('discoveredElements');
        if (savedData) {
            discoveredElements = new Set(JSON.parse(savedData));
        } else {
            // Default elemen awal jika tidak ada data tersimpan
            discoveredElements = new Set([
                'hidrogen', 'oksigen', 'karbon', 'nitrogen', 'natrium', 'klorin',
                'besi', 'silikon', 'belerang', 'tembaga', 'seng'
            ]);
        }

        const savedHints = localStorage.getItem('alkemisHintCount');
        hintCount = savedHints ? parseInt(savedHints, 10) : 3;
        updateHintDisplay();

        updateElementPanel();
        updateCounter();
    }

    function updateHintDisplay() {
        hintCountSpan.textContent = hintCount;
    }

    function createElementDiv(id) {
        const elementData = ELEMENTS[id];
        if (!elementData) return null;

        const div = document.createElement('div');
        div.className = 'element';
        div.dataset.elementType = id;
        div.draggable = true;
        div.innerHTML = `<span class="element-emoji">${elementData.emoji}</span><span class="element-name">${elementData.name}</span>`;

        div.addEventListener('dragstart', onDragStart);
        div.addEventListener('touchstart', onTouchStart, { passive: false });

        return div;
    }

    function updateElementPanel() {
        elementPanel.innerHTML = '';
        const sortedElements = Array.from(discoveredElements).sort((a, b) => ELEMENTS[a].name.localeCompare(ELEMENTS[b].name));
        sortedElements.forEach(id => {
            const elDiv = createElementDiv(id);
            if (elDiv) elementPanel.appendChild(elDiv);
        });
    }

    function updateCounter() {
        elementCountSpan.textContent = discoveredElements.size;
        totalElementsSpan.textContent = Object.keys(ELEMENTS).length;
    }

    function showNotification(newElementId) {
        const elementData = ELEMENTS[newElementId];
        document.getElementById('new-element-info').innerHTML = `
            <span class="element-emoji">${elementData.emoji}</span>
            <span>${elementData.name}</span>
        `;
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 2000);
    }

    function checkCombination(id1, id2) {
        // Cek resep dengan 1 bahan dulu (misal: glukosa -> etanol)
        if (id1 === id2) { // Asumsi resep satu bahan dikombinasikan dengan dirinya sendiri
            const singleKey = id1;
            if (RECIPES[singleKey]) {
                return RECIPES[singleKey];
            }
        }
        const key1 = `${id1},${id2}`;
        const key2 = `${id2},${id1}`;
        return RECIPES[key1] || RECIPES[key2] || null;
    }

    function performDrop(droppedType, droppedInstanceId, targetElement, dropX, dropY) {
        const placeholder = workspace.querySelector('.workspace-placeholder'); if (placeholder) placeholder.style.display = 'none';
        if (targetElement && targetElement.classList.contains('element-in-workspace')) {
            const targetInstanceId = targetElement.id; if (targetInstanceId === droppedInstanceId) return;
            const targetType = targetElement.dataset.elementType;
            const newElementId = checkCombination(droppedType, targetType);

            if (newElementId) {
                const draggedElement = document.getElementById(droppedInstanceId);
                if (draggedElement) { workspace.removeChild(draggedElement); workspaceElements.delete(droppedInstanceId); }
                workspace.removeChild(targetElement); workspaceElements.delete(targetInstanceId);
                createElementInWorkspace(newElementId, targetElement.style.left, targetElement.style.top);

                if (!discoveredElements.has(newElementId)) {
                    discoveredElements.add(newElementId);
                    showNotification(newElementId);

                    if (newElementId === hintedResult) {
                        hintedResult = null;
                    } else {
                        hintCount++;
                        updateHintDisplay();
                    }

                    updateElementPanel();
                    updateCounter();
                    saveProgress();
                }
            }
        } else {
            const draggedElement = document.getElementById(droppedInstanceId);
            if (draggedElement) { const workspaceRect = workspace.getBoundingClientRect(); draggedElement.style.left = `${dropX - workspaceRect.left - 40}px`; draggedElement.style.top = `${dropY - workspaceRect.top - 40}px`; }
            else { const workspaceRect = workspace.getBoundingClientRect(); const left = `${dropX - workspaceRect.left - 40}px`; const top = `${dropY - workspaceRect.top - 40}px`; createElementInWorkspace(droppedType, left, top); }
        }
    }

    function createElementInWorkspace(typeId, left, top) {
        const instanceId = `ws-${uniqueIdCounter++}`;
        const elementDiv = createElementDiv(typeId);
        elementDiv.id = instanceId;
        elementDiv.classList.add('element-in-workspace');
        elementDiv.style.left = left;
        elementDiv.style.top = top;

        workspace.appendChild(elementDiv);
        workspaceElements.set(instanceId, typeId);
        return elementDiv;
    }

    function onDragStart(event) {
        const target = event.target.closest('.element');
        const elementType = target.dataset.elementType;
        event.dataTransfer.setData('text/plain', elementType);
        if (target.classList.contains('element-in-workspace')) {
            event.dataTransfer.setData('instance-id', target.id);
        }
        target.classList.add('dragging');
    }

    function onTouchStart(event) {
        event.preventDefault();
        const target = event.target.closest('.element');
        if (!target) return;

        touchDragState.isDragging = true;
        touchDragState.elementId = target.dataset.elementType;
        if (target.classList.contains('element-in-workspace')) {
            touchDragState.instanceId = target.id;
        }

        const clone = target.cloneNode(true);
        clone.classList.add('touch-drag');
        document.body.appendChild(clone);
        touchDragState.draggedElement = clone;

        const touch = event.touches[0];
        clone.style.left = `${touch.clientX - 40}px`;
        clone.style.top = `${touch.clientY - 40}px`;
    }

    workspace.addEventListener('dragover', (event) => event.preventDefault());

    workspace.addEventListener('drop', (event) => {
        event.preventDefault();
        const droppedType = event.dataTransfer.getData('text/plain');
        const droppedInstanceId = event.dataTransfer.getData('instance-id');
        const targetElement = event.target.closest('.element-in-workspace');
        document.querySelector('.dragging')?.classList.remove('dragging');

        performDrop(droppedType, droppedInstanceId, targetElement, event.clientX, event.clientY);
    });

    function onTouchMove(event) {
        if (!touchDragState.isDragging) return;
        event.preventDefault();
        const touch = event.touches[0];
        touchDragState.draggedElement.style.left = `${touch.clientX - 40}px`;
        touchDragState.draggedElement.style.top = `${touch.clientY - 40}px`;
    }

    function onTouchEnd(event) {
        if (!touchDragState.isDragging) return;

        const touch = event.changedTouches[0];
        const dropX = touch.clientX;
        const dropY = touch.clientY;

        touchDragState.draggedElement.style.display = 'none';
        const elementBelow = document.elementFromPoint(dropX, dropY);
        document.body.removeChild(touchDragState.draggedElement);

        const workspaceRect = workspace.getBoundingClientRect();
        if (dropX > workspaceRect.left && dropX < workspaceRect.right && dropY > workspaceRect.top && dropY < workspaceRect.bottom) {
            const targetElement = elementBelow ? elementBelow.closest('.element-in-workspace') : null;
            performDrop(touchDragState.elementId, touchDragState.instanceId, targetElement, dropX, dropY);
        }

        touchDragState.isDragging = false;
        touchDragState.elementId = null;
        touchDragState.instanceId = null;
        touchDragState.draggedElement = null;
    }

    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);

    function handleInstructions() {
        if (localStorage.getItem('alkemisInstructionsSeen') === 'true') {
            modalOverlay.classList.add('hidden');
        }
        closeModalButton.addEventListener('click', () => {
            modalOverlay.classList.add('hidden');
            localStorage.setItem('alkemisInstructionsSeen', 'true');
        });
    }

    function getHint() {
        if (hintCount <= 0) {
            hintDisplay.innerHTML = `Maaf, petunjuk Anda sudah habis!`;
            hintDisplay.classList.remove('hidden');
            setTimeout(() => { hintDisplay.classList.add('hidden'); }, 4000);
            return;
        }

        const undiscoveredRecipes = [];
        for (const key in RECIPES) {
            const result = RECIPES[key];
            if (discoveredElements.has(result)) continue;

            const ingredients = key.split(',');
            // Cek apakah semua bahan sudah ditemukan
            const allIngredientsDiscovered = ingredients.every(ing => discoveredElements.has(ing));

            if (allIngredientsDiscovered) {
                undiscoveredRecipes.push({ ingredients: ingredients, result: result });
            }
        }

        if (undiscoveredRecipes.length > 0) {
            hintCount--;
            updateHintDisplay();
            saveProgress();

            const randomHint = undiscoveredRecipes[Math.floor(Math.random() * undiscoveredRecipes.length)];
            const ing1 = ELEMENTS[randomHint.ingredients[0]];

            let hintText = '';
            if (randomHint.ingredients.length === 1) {
                // Untuk resep dengan satu bahan
                hintText = `Coba gunakan: <strong>${ing1.name} ${ing1.emoji}</strong>... Mungkin dengan sesuatu?`;
            } else {
                const ing2 = ELEMENTS[randomHint.ingredients[1]];
                hintText = `Coba gabungkan: <strong>${ing1.name} ${ing1.emoji}</strong> + <strong>${ing2.name} ${ing2.emoji}</strong>`;
            }

            hintedResult = randomHint.result;

            hintDisplay.innerHTML = hintText;
            hintDisplay.classList.remove('hidden');

            setTimeout(() => { hintDisplay.classList.add('hidden'); }, 5000);
        } else {
            hintDisplay.innerHTML = `Anda hebat! Sepertinya tidak ada lagi kombinasi yang bisa dibuat saat ini.`;
            hintDisplay.classList.remove('hidden');
            setTimeout(() => { hintDisplay.classList.add('hidden'); }, 5000);
        }
    }

    resetButton.addEventListener('click', () => { workspace.innerHTML = '<p class="workspace-placeholder">Seret elemen ke sini untuk memulai kombinasi.</p>'; workspaceElements.clear(); });
    resetProgressButton.addEventListener('click', () => {
        if (confirm("Apakah Anda yakin ingin menghapus semua progres? Game akan dimulai dari awal.")) {
            localStorage.removeItem('discoveredElements');
            localStorage.removeItem('alkemisInstructionsSeen');
            localStorage.removeItem('alkemisHintCount');
            location.reload();
        }
    });
    showInstructionsButton.addEventListener('click', () => { modalOverlay.classList.remove('hidden'); });

    hintButton.addEventListener('click', getHint);

    // --- INISIALISASI GAME ---
    handleInstructions();
    loadProgress();
});