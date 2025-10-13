document.addEventListener('DOMContentLoaded', () => {
    // --- DATABASE ELEMEN & RESEP (DIPERBANYAK) ---
    const ELEMENTS = {
        // Elemen Dasar
        'air': { name: 'Air', emoji: '💧' },
        'api': { name: 'Api', emoji: '🔥' },
        'tanah': { name: 'Tanah', emoji: '🟫' },
        'udara': { name: 'Udara', emoji: '💨' },

        // Tier 1 - Kombinasi Dasar
        'uap': { name: 'Uap', emoji: '💨' },
        'energi': { name: 'Energi', emoji: '⚡' },
        'lava': { name: 'Lava', emoji: '🌋' },
        'lumpur': { name: 'Lumpur', emoji: '🟤' },
        'debu': { name: 'Debu', emoji: '✨' },
        'hujan': { name: 'Hujan', emoji: '🌧️' },
        'angin': { name: 'Angin', emoji: '🌬️' },

        // Tier 2 - Geologi & Alam
        'batu': { name: 'Batu', emoji: '🗿' },
        'pasir': { name: 'Pasir', emoji: '⏳' },
        'gunung': { name: 'Gunung', emoji: '⛰️' },
        'laut': { name: 'Laut', emoji: '🌊' },
        'badai': { name: 'Badai', emoji: '⛈️' },
        'tumbuhan': { name: 'Tumbuhan', emoji: '🌿' },
        'pohon': { name: 'Pohon', emoji: '🌳' },
        'kehidupan': { name: 'Kehidupan', emoji: '🌱' },
        'pelangi': { name: 'Pelangi', emoji: '🌈' },

        // Tier 3 - Material & Teknologi Awal
        'logam': { name: 'Logam', emoji: '⚙️' },
        'kaca': { name: 'Kaca', emoji: '🔍' },
        'batu bata': { name: 'Batu Bata', emoji: '🧱' },
        'kayu': { name: 'Kayu', emoji: '🪵' },
        'alat': { name: 'Alat', emoji: '🛠️' },
        'roda': { name: 'Roda', emoji: '☸️' },
        'listrik': { name: 'Listrik', emoji: '💡' },
        'kertas': { name: 'Kertas', emoji: '📜' },
        'kapal': { name: 'Kapal', emoji: '⛵' },

        // Tier 4 - Peradaban & Kehidupan
        'hewan': { name: 'Hewan', emoji: '🐾' },
        'manusia': { name: 'Manusia', emoji: '🧑' },
        'petani': { name: 'Petani', emoji: '🧑‍🌾' },
        'rumah': { name: 'Rumah', emoji: '🏠' },
        'dinding': { name: 'Dinding', emoji: '🧱' },
        'desa': { name: 'Desa', emoji: '🏘️' },
        'kota': { name: 'Kota', emoji: '🏙️' },
        'dokter': { name: 'Dokter', emoji: '🧑‍⚕️' },
        'buku': { name: 'Buku', emoji: '📖' },
        'waktu': { name: 'Waktu', emoji: '⏰' },

        // Tier 5 - Teknologi Modern & Konsep
        'mobil': { name: 'Mobil', emoji: '🚗' },
        'pesawat': { name: 'Pesawat', emoji: '✈️' },
        'langit': { name: 'Langit', emoji: '🏞️' },
        'bintang': { name: 'Bintang', emoji: '⭐' },
        'luar angkasa': { name: 'Luar Angkasa', emoji: '🌌' },
        'astronot': { name: 'Astronot', emoji: '👨‍🚀' },
        'cinta': { name: 'Cinta', emoji: '❤️' },
        'filsuf': { name: 'Filsuf', emoji: '🤔' },
    };

    const RECIPES = {
        // Kombinasi Dasar
        'air,api': 'uap',
        'api,udara': 'energi',
        'api,tanah': 'lava',
        'air,tanah': 'lumpur',
        'udara,tanah': 'debu',
        'air,udara': 'hujan',
        'udara,udara': 'angin',

        // Geologi & Alam
        'lava,air': 'batu',
        'angin,batu': 'pasir',
        'batu,batu': 'gunung',
        'air,air': 'laut',
        'energi,hujan': 'badai',
        'hujan,tanah': 'tumbuhan',
        'tumbuhan,tanah': 'pohon',
        'lumpur,energi': 'kehidupan',
        'api,hujan': 'pelangi',

        // Material & Teknologi Awal
        'api,batu': 'logam',
        'api,pasir': 'kaca',
        'api,lumpur': 'batu bata',
        'alat,pohon': 'kayu',
        'logam,manusia': 'alat',
        'alat,kayu': 'roda',
        'energi,logam': 'listrik',
        'air,kayu': 'kertas',
        'angin,kayu': 'kapal',

        // Peradaban & Kehidupan
        'kehidupan,laut': 'hewan',
        'kehidupan,tanah': 'manusia', // Bisa juga: 'kehidupan,lumpur' -> 'manusia'
        'manusia,tumbuhan': 'petani',
        'batu,manusia': 'rumah',
        'batu bata,batu bata': 'dinding',
        'rumah,rumah': 'desa',
        'desa,desa': 'kota',
        'kehidupan,manusia': 'dokter',
        'kertas,kertas': 'buku',
        'kaca,pasir': 'waktu',

        // Teknologi Modern & Konsep
        'logam,roda': 'mobil',
        'angin,logam': 'pesawat',
        'hujan,uap': 'langit',
        'api,langit': 'bintang',
        'bintang,langit': 'luar angkasa',
        'luar angkasa,manusia': 'astronot',
        'manusia,manusia': 'cinta',
        'manusia,waktu': 'filsuf',
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


    let discoveredElements = new Set(['air', 'api', 'tanah', 'udara']);
    let workspaceElements = new Map();
    let uniqueIdCounter = 0;

    // --- TAMBAHAN: Variabel untuk state touch drag ---
    let touchDragState = {
        isDragging: false,
        elementId: null,
        draggedElement: null,
    };

    // --- FUNGSI-FUNGSI UTAMA ---

    // Fungsi untuk menyimpan progres ke localStorage
    function saveProgress() {
        localStorage.setItem('discoveredElements', JSON.stringify(Array.from(discoveredElements)));
    }

    // Fungsi untuk memuat progres dari localStorage
    function loadProgress() {
        const savedData = localStorage.getItem('discoveredElements');
        if (savedData) {
            discoveredElements = new Set(JSON.parse(savedData));
        }
        updateElementPanel();
        updateCounter();
    }

    // Membuat elemen visual (DOM)
    function createElementDiv(id, isDraggable = true) {
        const elementData = ELEMENTS[id];
        if (!elementData) return null;

        const div = document.createElement('div');
        div.id = id;
        div.className = 'element';
        div.draggable = isDraggable;
        div.innerHTML = `
            <span class="element-emoji">${elementData.emoji}</span>
            <span class="element-name">${elementData.name}</span>
        `;
        div.addEventListener('dragstart', onDragStart);

        if (isDraggable) {
            div.addEventListener('touchstart', onTouchStart, { passive: false });
        }
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

    // --- TAMBAHAN: Fungsi inti untuk melakukan drop, bisa dipakai oleh mouse & touch ---
    function performDrop(droppedId, targetElement, dropX, dropY) {
        const placeholder = workspace.querySelector('.workspace-placeholder');
        if (placeholder) placeholder.style.display = 'none';

        // Logika kombinasi
        if (targetElement && targetElement.classList.contains('element-in-workspace')) {
            const targetInstanceId = targetElement.id;
            const targetElementId = workspaceElements.get(targetInstanceId);
            const newElementId = checkCombination(droppedId, targetElementId);

            if (newElementId) {
                // Kombinasi berhasil
                workspace.removeChild(targetElement);
                workspaceElements.delete(targetInstanceId);

                const resultInstanceId = `ws-${uniqueIdCounter++}`;
                const resultDiv = createElementDiv(newElementId, false);
                resultDiv.classList.add('element-in-workspace');
                resultDiv.id = resultInstanceId;
                resultDiv.style.left = targetElement.style.left;
                resultDiv.style.top = targetElement.style.top;
                workspace.appendChild(resultDiv);
                workspaceElements.set(resultInstanceId, newElementId);

                if (!discoveredElements.has(newElementId)) {
                    discoveredElements.add(newElementId);
                    showNotification(newElementId);
                    updateElementPanel();
                    updateCounter();
                    saveProgress();
                }
            } else {
                // Kombinasi gagal, letakkan elemen baru di samping
                const newInstanceId = `ws-${uniqueIdCounter++}`;
                const newElementDiv = createElementDiv(droppedId, false);
                newElementDiv.classList.add('element-in-workspace');
                newElementDiv.id = newInstanceId;
                newElementDiv.style.left = `${parseInt(targetElement.style.left) + 85}px`;
                newElementDiv.style.top = targetElement.style.top;
                workspace.appendChild(newElementDiv);
                workspaceElements.set(newInstanceId, droppedId);
            }
        } else {
            // Drop di area kosong
            const newInstanceId = `ws-${uniqueIdCounter++}`;
            const newElementDiv = createElementDiv(droppedId, false);
            newElementDiv.classList.add('element-in-workspace');
            newElementDiv.id = newInstanceId;
            const workspaceRect = workspace.getBoundingClientRect();
            newElementDiv.style.left = `${dropX - workspaceRect.left - 40}px`;
            newElementDiv.style.top = `${dropY - workspaceRect.top - 40}px`;
            workspace.appendChild(newElementDiv);
            workspaceElements.set(newInstanceId, droppedId);
        }
    }


    // --- LOGIKA DRAG & DROP (DESKTOP MOUSE) ---
    function onDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
        event.target.classList.add('dragging');
    }
    workspace.addEventListener('dragover', (event) => {
        event.preventDefault();
    });
    workspace.addEventListener('drop', (event) => {
        event.preventDefault();
        const droppedId = event.dataTransfer.getData('text/plain');
        const targetElement = event.target.closest('.element-in-workspace');
        document.querySelector('.dragging')?.classList.remove('dragging');

        // Gunakan fungsi performDrop yang baru
        performDrop(droppedId, targetElement, event.clientX, event.clientY);
    });

    // --- TAMBAHAN: LOGIKA DRAG & DROP (MOBILE TOUCH) ---
    function onTouchStart(event) {
        // Mencegah scroll halaman saat drag elemen
        event.preventDefault();

        const target = event.target.closest('.element');
        if (!target) return;

        touchDragState.isDragging = true;
        touchDragState.elementId = target.id;

        // Buat elemen "hantu" yang mengikuti jari
        const clone = target.cloneNode(true);
        clone.classList.add('touch-drag');
        document.body.appendChild(clone);
        touchDragState.draggedElement = clone;

        // Posisikan elemen hantu di jari
        const touch = event.touches[0];
        clone.style.left = `${touch.clientX - 40}px`;
        clone.style.top = `${touch.clientY - 40}px`;
    }

    function onTouchMove(event) {
        if (!touchDragState.isDragging) return;

        // Mencegah scroll
        event.preventDefault();

        // Update posisi elemen hantu
        const touch = event.touches[0];
        touchDragState.draggedElement.style.left = `${touch.clientX - 40}px`;
        touchDragState.draggedElement.style.top = `${touch.clientY - 40}px`;
    }

    function onTouchEnd(event) {
        if (!touchDragState.isDragging) return;

        const touch = event.changedTouches[0];
        const dropX = touch.clientX;
        const dropY = touch.clientY;

        // Sembunyikan elemen hantu untuk mendeteksi apa yang ada di bawahnya
        touchDragState.draggedElement.style.display = 'none';
        const elementBelow = document.elementFromPoint(dropX, dropY);

        // Hapus elemen hantu
        document.body.removeChild(touchDragState.draggedElement);

        const workspaceRect = workspace.getBoundingClientRect();

        // Cek jika drop terjadi di dalam workspace
        if (dropX > workspaceRect.left && dropX < workspaceRect.right &&
            dropY > workspaceRect.top && dropY < workspaceRect.bottom) {
            const targetElement = elementBelow ? elementBelow.closest('.element-in-workspace') : null;
            // Gunakan fungsi performDrop yang sama
            performDrop(touchDragState.elementId, targetElement, dropX, dropY);
        }

        // Reset state
        touchDragState.isDragging = false;
        touchDragState.elementId = null;
        touchDragState.draggedElement = null;
    }

    // --- Tambahkan listener global untuk touch move dan end ---
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);


    // --- EVENT LISTENERS UNTUK TOMBOL ---
    resetButton.addEventListener('click', () => { /* ... (fungsi ini tidak berubah) ... */
        workspace.innerHTML = '<p class="workspace-placeholder">Seret elemen ke sini untuk memulai kombinasi.</p>';
        workspaceElements.clear();
    });
    resetProgressButton.addEventListener('click', () => { /* ... (fungsi ini tidak berubah) ... */
        if (confirm("Apakah Anda yakin ingin menghapus semua progres? Game akan dimulai dari awal.")) {
            localStorage.removeItem('discoveredElements');
            discoveredElements = new Set(['air', 'api', 'tanah', 'udara']);
            resetButton.click();
            loadProgress();
        }
    });

    // BARU: Fungsi untuk mengelola modal instruksi
    function handleInstructions() {
        // Cek apakah instruksi sudah pernah dilihat
        if (localStorage.getItem('alkemisInstructionsSeen') === 'true') {
            modalOverlay.classList.add('hidden');
        }

        // Tambahkan event listener ke tombol tutup
        closeModalButton.addEventListener('click', () => {
            modalOverlay.classList.add('hidden');
            // Tandai bahwa instruksi sudah dilihat
            localStorage.setItem('alkemisInstructionsSeen', 'true');
        });
    }

    // BARU: Event listener untuk tombol "Cara Bermain"
    showInstructionsButton.addEventListener('click', () => {
        modalOverlay.classList.remove('hidden');
    });

    // --- INISIALISASI GAME ---
    handleInstructions();
    loadProgress();
});