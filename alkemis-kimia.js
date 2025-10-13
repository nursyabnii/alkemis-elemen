document.addEventListener('DOMContentLoaded', () => {
    // --- DATABASE ELEMEN & RESEP (DIPERBANYAK) ---
    const ELEMENTS = {
        // Elemen Dasar (dari Tabel Periodik)
        'hidrogen': { name: 'Hidrogen (H)', emoji: 'H' },
        'oksigen': { name: 'Oksigen (O)', emoji: 'O' },
        'karbon': { name: 'Karbon (C)', emoji: 'C' },
        'natrium': { name: 'Natrium (Na)', emoji: 'Na' },
        'klorin': { name: 'Klorin (Cl)', emoji: 'Cl' },
        'nitrogen': { name: 'Nitrogen (N)', emoji: 'N' },
        'silikon': { name: 'Silikon (Si)', emoji: 'Si' },
        'besi': { name: 'Besi (Fe)', emoji: 'Fe' },

        // Senyawa Sederhana (Tier 1)
        'air': { name: 'Air (H₂O)', emoji: '💧' },
        'karbon dioksida': { name: 'CO₂', emoji: '💨' },
        'metana': { name: 'Metana (CH₄)', emoji: 'CH₄' },
        'garam dapur': { name: 'Garam (NaCl)', emoji: '🧂' },
        'amonia': { name: 'Amonia (NH₃)', emoji: 'NH₃' },
        'pasir': { name: 'Pasir (SiO₂)', emoji: '⏳' },
        'karat': { name: 'Karat (Fe₂O₃)', emoji: '🔩' },

        // Konsep & Senyawa Kompleks (Tier 2)
        'asam karbonat': { name: 'Asam Karbonat', emoji: '🥤' },
        'asam klorida': { name: 'Asam Klorida', emoji: '🧪' },
        'natrium hidroksida': { name: 'Basa Kuat', emoji: '🧼' },
        'larutan garam': { name: 'Air Garam', emoji: '🌊' },
        'api': { name: 'Api (Energi)', emoji: '🔥' },
        'listrik': { name: 'Listrik', emoji: '⚡' },
        'kehidupan': { name: 'Kehidupan', emoji: '🌱' },

        // Material & Benda (Tier 3)
        'kaca': { name: 'Kaca', emoji: '🔍' },
        'baja': { name: 'Baja', emoji: '⛓️' },
        'plastik': { name: 'Plastik', emoji: '♻️' },
        'pupuk': { name: 'Pupuk', emoji: '💩' },
        'gula': { name: 'Gula', emoji: '🍬' },
        'dna': { name: 'DNA', emoji: '🧬' },
    };

    const RECIPES = {
        // Reaksi Pembentukan Senyawa Sederhana
        'hidrogen,oksigen': 'air',
        'karbon,oksigen': 'karbon dioksida',
        'hidrogen,karbon': 'metana',
        'natrium,klorin': 'garam dapur',
        'hidrogen,nitrogen': 'amonia',
        'silikon,oksigen': 'pasir',
        'besi,oksigen': 'karat',

        // Reaksi Lanjutan
        'air,karbon dioksida': 'asam karbonat',
        'hidrogen,klorin': 'asam klorida',
        'natrium,air': 'natrium hidroksida',
        'air,garam dapur': 'larutan garam',
        'metana,oksigen': 'api', // Representasi sederhana pembakaran
        'besi,karbon': 'baja', // Representasi sederhana pembuatan baja

        // Konsep
        'api,pasir': 'kaca', // Representasi pemanasan pasir menjadi kaca
        'karat,air': 'listrik', // Konsep baterai sederhana
        'karbon,air': 'kehidupan', // Konsep dasar kehidupan berbasis karbon
        'metana,karbon': 'plastik', // Konsep polimer sederhana
        'amonia,nitrogen': 'pupuk', // Konsep pupuk nitrogen
        'karbon dioksida,kehidupan': 'gula', // Konsep fotosintesis sederhana
        'kehidupan,nitrogen': 'dna', // Konsep dasar DNA
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

    // BARU: Variabel untuk fitur hint
    const hintButton = document.getElementById('hint-button');
    const hintDisplay = document.getElementById('hint-display');
    const hintCountSpan = document.getElementById('hint-count');

    let discoveredElements = new Set(['hidrogen', 'oksigen', 'karbon', 'natrium', 'klorin', 'nitrogen', 'silikon', 'besi']);
    let workspaceElements = new Map();
    let uniqueIdCounter = 0;

    // BARU: Variabel untuk hint counter
    let hintCount = 3;
    let hintedResult = null;

    // --- TAMBAHAN: Variabel untuk state touch drag ---
    let touchDragState = {
        isDragging: false,
        elementId: null,
        instanceId: null,
        draggedElement: null,
    };

    // --- FUNGSI-FUNGSI UTAMA ---


    // Fungsi untuk menyimpan progres ke localStorage
    function saveProgress() {
        localStorage.setItem('discoveredElements', JSON.stringify(Array.from(discoveredElements)));
        localStorage.setItem('alkemisHintCount', hintCount); // Simpan hint
    }

    // Fungsi untuk memuat progres dari localStorage
    function loadProgress() {
        const savedData = localStorage.getItem('discoveredElements');
        if (savedData) {
            discoveredElements = new Set(JSON.parse(savedData));
        } else {
            // Default elemen awal jika tidak ada data tersimpan
            discoveredElements = new Set(['hidrogen', 'oksigen', 'karbon', 'natrium', 'klorin', 'nitrogen', 'silikon', 'besi']);
        }

        // Muat hint, atau set ke default 3 jika tidak ada
        const savedHints = localStorage.getItem('alkemisHintCount');
        hintCount = savedHints ? parseInt(savedHints, 10) : 3;
        updateHintDisplay();

        updateElementPanel();
        updateCounter();
    }

    function updateHintDisplay() {
        hintCountSpan.textContent = hintCount;
    }

    // Membuat elemen visual (DOM)
    function createElementDiv(id) {
        const elementData = ELEMENTS[id];
        if (!elementData) return null;

        const div = document.createElement('div');
        div.className = 'element';
        // Simpan tipe elemen di dataset untuk referensi mudah
        div.dataset.elementType = id;
        div.draggable = true;
        div.innerHTML = `<span class="element-emoji">${elementData.emoji}</span><span class="element-name">${elementData.name}</span>`;

        // Tambahkan semua listener
        div.addEventListener('dragstart', onDragStart);
        div.addEventListener('touchstart', onTouchStart, { passive: false });

        return div;
    }

    // Memperbarui panel elemen yang ditemukan
    function updateElementPanel() {
        elementPanel.innerHTML = '';
        const sortedElements = Array.from(discoveredElements).sort((a, b) => ELEMENTS[a].name.localeCompare(ELEMENTS[b].name));
        sortedElements.forEach(id => {
            const elDiv = createElementDiv(id);
            if (elDiv) elementPanel.appendChild(elDiv);
        });
    }

    // Memperbarui penghitung elemen
    function updateCounter() {
        elementCountSpan.textContent = discoveredElements.size;
        totalElementsSpan.textContent = Object.keys(ELEMENTS).length;
    }

    // Menampilkan notifikasi penemuan baru
    function showNotification(newElementId) {
        const elementData = ELEMENTS[newElementId];
        document.getElementById('new-element-info').innerHTML = `
            <span class="element-emoji">${elementData.emoji}</span>
            <span>${elementData.name}</span>
        `;
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 2000); // Notifikasi hilang setelah 2 detik
    }

    // Mengecek kombinasi
    function checkCombination(id1, id2) {
        const key1 = `${id1},${id2}`;
        const key2 = `${id2},${id1}`;
        return RECIPES[key1] || RECIPES[key2] || null;
    }

    // --- PERUBAHAN BESAR ---
    // Fungsi ini sekarang menangani semua logika drop
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

                    // PERUBAHAN KUNCI: Logika penambahan petunjuk diperbaiki
                    if (newElementId === hintedResult) {
                        // Jika pemain membuat elemen yang disarankan, jangan tambah petunjuk.
                        // Reset `hintedResult` agar penemuan berikutnya bisa dapat hadiah lagi.
                        hintedResult = null;
                    } else {
                        // Jika pemain menemukan elemen lain (bukan yang disarankan), tambah petunjuk.
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

    // --- BARU: Fungsi bantuan untuk membuat elemen di workspace ---
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


    // --- LOGIKA DRAG & DROP (Menangani mouse dan touch) ---

    function onDragStart(event) {
        const target = event.target.closest('.element');
        const elementType = target.dataset.elementType;
        event.dataTransfer.setData('text/plain', elementType);
        // Jika elemen dari workspace, kirim juga ID uniknya
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
        const droppedInstanceId = event.dataTransfer.getData('instance-id'); // Bisa kosong
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

        // Reset state
        touchDragState.isDragging = false;
        touchDragState.elementId = null;
        touchDragState.instanceId = null;
        touchDragState.draggedElement = null;
    }

    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);

    // Fungsi untuk mengelola modal instruksi
    function handleInstructions() {
        if (localStorage.getItem('alkemisInstructionsSeen') === 'true') {
            modalOverlay.classList.add('hidden');
        }
        closeModalButton.addEventListener('click', () => {
            modalOverlay.classList.add('hidden');
            localStorage.setItem('alkemisInstructionsSeen', 'true');
        });
    }

    // --- FUNGSI PETUNJUK (HINT) DIPERBARUI ---
    function getHint() {
        if (hintCount <= 0) {
            hintDisplay.innerHTML = `Maaf, petunjuk Anda sudah habis! Temukan elemen baru untuk mendapatkannya lagi.`;
            hintDisplay.classList.remove('hidden');
            setTimeout(() => { hintDisplay.classList.add('hidden'); }, 4000);
            return;
        }

        const undiscoveredRecipes = [];
        for (const key in RECIPES) {
            const result = RECIPES[key];
            const ingredients = key.split(',');
            const ingredient1 = ingredients[0];
            const ingredient2 = ingredients[1];
            if (discoveredElements.has(ingredient1) && discoveredElements.has(ingredient2) && !discoveredElements.has(result)) {
                undiscoveredRecipes.push({ ing1: ingredient1, ing2: ingredient2, result: result });
            }
        }

        if (undiscoveredRecipes.length > 0) {
            hintCount--;
            updateHintDisplay();
            saveProgress();

            const randomHint = undiscoveredRecipes[Math.floor(Math.random() * undiscoveredRecipes.length)];
            const el1 = ELEMENTS[randomHint.ing1];
            const el2 = ELEMENTS[randomHint.ing2];

            // PERUBAHAN KUNCI: Simpan hasil elemen yang disarankan
            hintedResult = randomHint.result;

            hintDisplay.innerHTML = `Coba gabungkan: <strong>${el1.name} ${el1.emoji}</strong> + <strong>${el2.name} ${el2.emoji}</strong>`;
            hintDisplay.classList.remove('hidden');

            setTimeout(() => { hintDisplay.classList.add('hidden'); }, 5000);
        } else {
            hintDisplay.innerHTML = `Anda hebat! Sepertinya tidak ada lagi kombinasi yang bisa dibuat saat ini.`;
            hintDisplay.classList.remove('hidden');
            setTimeout(() => { hintDisplay.classList.add('hidden'); }, 5000);
        }
    }

    resetProgressButton.addEventListener('click', () => {
        if (confirm("Apakah Anda yakin ingin menghapus semua progres? Game akan dimulai dari awal.")) {
            localStorage.removeItem('discoveredElements');
            localStorage.removeItem('alkemisInstructionsSeen');
            localStorage.removeItem('alkemisHintCount');
            location.reload();
        }
    });

    // --- EVENT LISTENERS UNTUK TOMBOL ---
    resetButton.addEventListener('click', () => { workspace.innerHTML = '<p class="workspace-placeholder">Seret elemen ke sini untuk memulai kombinasi.</p>'; workspaceElements.clear(); });
    // --- EVENT LISTENER TOMBOL RESET DIPERBARUI ---
    resetProgressButton.addEventListener('click', () => {
        if (confirm("Apakah Anda yakin ingin menghapus semua progres? Game akan dimulai dari awal.")) {
            localStorage.removeItem('discoveredElements');
            localStorage.removeItem('alkemisInstructionsSeen');
            localStorage.removeItem('alkemisHintCount'); // BARU: Hapus juga data hint
            location.reload();
        }
    });
    showInstructionsButton.addEventListener('click', () => { modalOverlay.classList.remove('hidden'); });

    // BARU: Event listener untuk tombol hint
    hintButton.addEventListener('click', getHint);

    // --- INISIALISASI GAME ---
    handleInstructions();
    loadProgress();
});