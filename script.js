document.addEventListener('DOMContentLoaded', function() {
    
    // --- DATA AWAL (Default Data) ---
    const defaultData = {
        panitia: [
           
        ],
        shohibul: [
           
        ],
        mustahiq: [
            
        ],
        hewan: [
            
        ]
    };

    let data = { ...defaultData }; // Gunakan data yang dimuat dari localStorage atau data awal

    // --- UNTUK MENYIMPAN DAN MEMUAT DATA DARI LOCALSTORAGE ---
    function saveDataToLocalStorage() {
        localStorage.setItem('qurbanData', JSON.stringify(data));
    }

    function loadDataFromLocalStorage() {
        const savedData = localStorage.getItem('qurbanData');
        if (savedData) {
            data = JSON.parse(savedData);
        }
    }

    // --- PANGGIL DATA DARI LOCAL STORAGE SAAT HALAMAN DIMUAT ---
    loadDataFromLocalStorage();

    // --- ELEMENT SELECTION ---
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const mainContent = document.querySelector('main');

    // --- MODAL ELEMENTS ---
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalForm = document.getElementById('modal-form');
    const tambahButtons = document.querySelectorAll('.tambah-btn');
    const modalCloseBtn = document.getElementById('modal-close');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    // --- TOAST FUNCTION ---
    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // --- MODAL FUNCTIONS ---
    function openModal(type) {
        modalTitle.textContent = `Tambah ${type.charAt(0).toUpperCase() + type.slice(1)} Baru`;
        modalForm.innerHTML = '';
        modalForm.dataset.type = type;

        let formFields = '';
        if (type === 'panitia') {
            formFields = `
                <div class="form-grid">
                    <div class="form-group">
                        <label for="input-nama">Nama Lengkap</label>
                        <input type="text" id="input-nama" placeholder="Masukkan nama lengkap" required>
                    </div>
                    <div class="form-group">
                        <label for="input-jabatan">Jabatan</label>
                        <input type="text" id="input-jabatan" placeholder="Masukkan jabatan" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="input-kontak">Kontak (HP/WA)</label>
                    <input type="text" id="input-kontak" placeholder="Masukkan nomor kontak" required>
                </div>
            `;
        } else if (type === 'shohibul') {
            formFields = `
                <div class="form-group">
                    <label for="input-nama">Nama Lengkap</label>
                    <input type="text" id="input-nama" placeholder="Masukkan nama lengkap" required>
                </div>
                <div class="form-group">
                    <label for="input-hewan">Jenis Hewan Qurban</label>
                    <select id="input-hewan" required>
                        <option value="" disabled selected>Pilih jenis hewan</option>
                        <option value="Sapi">Sapi</option>
                        <option value="Kambing">Kambing</option>
                        <option value="Domba">Domba</option>
                    </select>
                </div>
            `;
        } else if (type === 'mustahiq') {
            formFields = `
                <div class="form-group">
                    <label for="input-nama">Nama Lengkap</label>
                    <input type="text" id="input-nama" placeholder="Masukkan nama lengkap" required>
                </div>
                <div class="form-group">
                    <label for="input-alamat">Alamat Lengkap</label>
                    <input type="text" id="input-alamat" placeholder="Masukkan alamat lengkap" required>
                </div>
                <div class="form-group">
                    <label for="input-kategori">Kategori</label>
                    <select id="input-kategori" required>
                        <option value="" disabled selected>Pilih kategori</option>
                        <option value="Dhuafa">Dhuafa</option>
                        <option value="Warga Sekitar">Warga Sekitar</option>
                        <option value="Yatim Piatu">Yatim Piatu</option>
                    </select>
                </div>
            `;
        } else if (type === 'hewan') {
            formFields = `
                <div class="form-grid">
                    <div class="form-group">
                        <label for="input-id">ID Hewan</label>
                        <input type="text" id="input-id" placeholder="Contoh: SAP003" required>
                    </div>
                    <div class="form-group">
                        <label for="input-jenis">Jenis Hewan</label>
                        <select id="input-jenis" required>
                            <option value="" disabled selected>Pilih jenis hewan</option>
                            <option value="Sapi">Sapi</option>
                            <option value="Kambing">Kambing</option>
                            <option value="Domba">Domba</option>
                        </select>
                    </div>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="input-berat-awal">Berat Awal (kg)</label>
                        <input type="number" id="input-berat-awal" placeholder="Contoh: 350" step="0.1" required>
                    </div>
                    <div class="form-group">
                        <label for="input-berat-bersih">Berat Daging Bersih (kg)</label>
                        <input type="number" id="input-berat-bersih" placeholder="Contoh: 210" step="0.1" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="input-shohibul">Nama Shohibul</label>
                    <input type="text" id="input-shohibul" placeholder="Masukkan nama Shohibul" required>
                </div>
            `;
        }

        modalForm.innerHTML = formFields + `
            <div class="form-buttons">
                <button type="button" id="modal-cancel">Batal</button>
                <button type="submit"><i class="fas fa-save mr-2"></i>Simpan Data</button>
            </div>
        `;
        
        document.getElementById('modal-cancel').addEventListener('click', closeModal);

        modalOverlay.classList.remove('hidden');
        modalOverlay.classList.add('flex');
    }

    function closeModal() {
        modalOverlay.classList.add('hidden');
        modalOverlay.classList.remove('flex');
    }

    // --- EVENT LISTENERS FOR MODAL ---
    tambahButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.getAttribute('data-type');
            openModal(type);
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = modalForm.dataset.type;
        const newEntry = {};

        if (type === 'panitia') {
            newEntry.nama = document.getElementById('input-nama').value;
            newEntry.jabatan = document.getElementById('input-jabatan').value;
            newEntry.kontak = document.getElementById('input-kontak').value;
            data.panitia.push(newEntry);
            populateTable('panitia-table-body', data.panitia, ['nama', 'jabatan', 'kontak'], 'panitia');
            showToast('Panitia baru berhasil ditambahkan!');
            saveDataToLocalStorage(); // SIMPAN DATA
        } else if (type === 'shohibul') {
            newEntry.nama = document.getElementById('input-nama').value;
            newEntry.hewan = document.getElementById('input-hewan').value;
            data.shohibul.push(newEntry);
            populateTable('shohibul-table-body', data.shohibul, ['nama', 'hewan'], 'shohibul');
            showToast('Shohibul Qurban baru berhasil ditambahkan!');
            saveDataToLocalStorage(); // SIMPAN DATA
        } else if (type === 'mustahiq') {
            newEntry.nama = document.getElementById('input-nama').value;
            newEntry.alamat = document.getElementById('input-alamat').value;
            newEntry.kategori = document.getElementById('input-kategori').value;
            data.mustahiq.push(newEntry);
            populateTable('mustahiq-table-body', data.mustahiq, ['nama', 'alamat', 'kategori'], 'mustahiq');
            showToast('Mustahiq baru berhasil ditambahkan!');
            saveDataToLocalStorage(); // SIMPAN DATA
        } else if (type === 'hewan') {
            newEntry.id = document.getElementById('input-id').value;
            newEntry.jenis = document.getElementById('input-jenis').value;
            newEntry.beratAwal = parseFloat(document.getElementById('input-berat-awal').value);
            newEntry.shohibul = document.getElementById('input-shohibul').value;
            newEntry.beratBersih = parseFloat(document.getElementById('input-berat-bersih').value);
            data.hewan.push(newEntry);
            populateHewanTable();
            showToast('Hewan Qurban baru berhasil ditambahkan!');
            saveDataToLocalStorage(); // SIMPAN DATA
        }
        
        closeModal();
    });


    // --- NAVIGATION ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            pages.forEach(page => page.classList.add('hidden'));
            document.getElementById(targetId).classList.remove('hidden');

            if (targetId === 'laporan-page') {
                const distribusiData = hitungDistribusi();
                updateLaporan(distribusiData);
            }

            mainContent.scrollTo(0, 0);
            window.scrollTo(0, 0);

            if (window.innerWidth < 768) {
                sidebar.classList.remove('sidebar-open');
            }
        });
    });

    document.querySelector('.nav-link').classList.add('active');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-open');
    });

    // --- DASHBOARD SLIDER ---
    const sliderImages = [
        'https://i.ibb.co/L8QbL2s/qurban1.jpg',
        'https://i.ibb.co/3TgC2pF/qurban2.jpg',
        'https://i.ibb.co/6y2k2F4/logo-pesantren.png'
    ];
    let currentImageIndex = 0;
    const sliderImage = document.getElementById('slider-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    function updateSliderImage() {
        sliderImage.src = sliderImages[currentImageIndex];
    }

    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + sliderImages.length) % sliderImages.length;
        updateSliderImage();
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
        updateSliderImage();
    });

    // --- TABLE FUNCTIONALITY ---
    function populateTable(tableBodyId, dataArray, columns, type) {
        const tableBody = document.getElementById(tableBodyId);
        tableBody.innerHTML = '';
        dataArray.forEach(item => {
            const row = document.createElement('tr');
            columns.forEach(col => {
                const cell = document.createElement('td');
                cell.className = 'p-3 border-b';
                cell.textContent = item[col];
                row.appendChild(cell);
            });
            // --- TAMBAHKAN KOLOM AKSI ---
            const actionCell = document.createElement('td');
            actionCell.className = 'p-3 border-b text-center';
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn-delete';
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteButton.setAttribute('data-type', type);
            deleteButton.setAttribute('data-identifier', item.nama || item.id); // Gunakan nama atau ID sebagai identifier
            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);

            tableBody.appendChild(row);
        });
    }

    // --- FUNGSI HAPUS DATA ---
    function handleDelete(event) {
        const button = event.target.closest('.btn-delete');
        if (!button) return;

        const type = button.getAttribute('data-type');
        const identifier = button.getAttribute('data-identifier');
        
        const isConfirmed = confirm(`Apakah Anda yakin ingin menghapus data ini?`);
        if (!isConfirmed) return;

        let dataArray;
        if (type === 'panitia') dataArray = data.panitia;
        else if (type === 'shohibul') dataArray = data.shohibul;
        else if (type === 'mustahiq') dataArray = data.mustahiq;
        else if (type === 'hewan') dataArray = data.hewan;

        const index = dataArray.findIndex(item => (item.nama || item.id) === identifier);
        if (index > -1) {
            dataArray.splice(index, 1);
            // Refresh tabel yang sesuai
            if (type === 'panitia') populateTable('panitia-table-body', data.panitia, ['nama', 'jabatan', 'kontak'], 'panitia');
            else if (type === 'shohibul') populateTable('shohibul-table-body', data.shohibul, ['nama', 'hewan'], 'shohibul');
            else if (type === 'mustahiq') populateTable('mustahiq-table-body', data.mustahiq, ['nama', 'alamat', 'kategori'], 'mustahiq');
            else if (type === 'hewan') populateHewanTable();
            
            // Update data lain yang terkait
            if (type === 'hewan') {
                updateHewanCount();
                const distribusiData = hitungDistribusi();
                updateLaporan(distribusiData);
            }
            
            showToast('Data berhasil dihapus!');
            saveDataToLocalStorage(); // SIMPAN DATA
        }
    }

    // Tambahkan event listener ke setiap tbody
    document.getElementById('panitia-table-body').addEventListener('click', handleDelete);
    document.getElementById('shohibul-table-body').addEventListener('click', handleDelete);
    document.getElementById('mustahiq-table-body').addEventListener('click', handleDelete);
    document.getElementById('hewan-table-body').addEventListener('click', handleDelete);


    function setupTableSearch(searchInputId, tableBodyId, dataArray, columns) {
        const searchInput = document.getElementById(searchInputId);
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredData = dataArray.filter(item => 
                columns.some(col => item[col].toString().toLowerCase().includes(searchTerm))
            );
            populateTable(tableBodyId, filteredData, columns, tableBodyId.replace('-table-body', ''));
        });
    }
    
    function setupTableSort(tableHeadId, tableBodyId, dataArray, columns) {
        const tableHead = document.querySelector(`#${tableBodyId}`).previousElementSibling;
        const sortableHeaders = tableHead.querySelectorAll('th[data-sort]');
        
        sortableHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const sortBy = header.getAttribute('data-sort');
                const sortedData = [...dataArray].sort((a, b) => {
                    if (a[sortBy] < b[sortBy]) return -1;
                    if (a[sortBy] > b[sortBy]) return 1;
                    return 0;
                });
                populateTable(tableBodyId, sortedData, columns, tableBodyId.replace('-table-body',''));
            });
        });
    }

    // --- INITIALIZE TABLES ---
    populateTable('panitia-table-body', data.panitia, ['nama', 'jabatan', 'kontak'], 'panitia');
    setupTableSearch('search-panitia', 'panitia-table-body', data.panitia, ['nama', 'jabatan']);
    setupTableSort('panitia-table', 'panitia-table-body', data.panitia, ['nama', 'jabatan', 'kontak']);

    populateTable('shohibul-table-body', data.shohibul, ['nama', 'hewan'], 'shohibul');
    setupTableSearch('search-shohibul', 'shohibul-table-body', data.shohibul, ['nama', 'hewan']);

    populateTable('mustahiq-table-body', data.mustahiq, ['nama', 'alamat', 'kategori'], 'mustahiq');
    setupTableSearch('search-mustahiq', 'mustahiq-table-body', data.mustahiq, ['nama', 'alamat']);

    // --- HEWAN PAGE ---
    function populateHewanTable() {
        const tableBody = document.getElementById('hewan-table-body');
        tableBody.innerHTML = '';
        data.hewan.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-3 border-b">${item.id}</td>
                <td class="p-3 border-b">${item.jenis}</td>
                <td class="p-3 border-b">${item.beratAwal}</td>
                <td class="p-3 border-b">${item.shohibul}</td>
                <td class="p-3 border-b">${item.beratBersih}</td>
                <td class="p-3 border-b text-center">
                    <button class="btn-delete" data-type="hewan" data-identifier="${item.id}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        updateHewanCount();
    }
    
    function updateHewanCount() {
        const counts = { Sapi: 0, Kambing: 0, Domba: 0 };
        data.hewan.forEach(h => counts[h.jenis]++);
        document.getElementById('total-sapi').textContent = counts.Sapi;
        document.getElementById('total-kambing').textContent = counts.Kambing;
        document.getElementById('total-domba').textContent = counts.Domba;
    }
    populateHewanTable();

    // --- DISTRIBUSSI PAGE ---
    let distribusiChart = null;

    function initializeChart() {
        const ctx = document.getElementById('distribusi-chart').getContext('2d');
        distribusiChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Shohibul', 'Panitia', 'Jamaah Sekitar', 'Mustahiq'],
                datasets: [{
                    label: 'Distribusi Daging (kg)',
                    data: [0, 0, 0, 0],
                    backgroundColor: [
                        'rgba(46, 125, 50, 0.7)',
                        'rgba(212, 175, 55, 0.7)',
                        'rgba(76, 175, 80, 0.7)',
                        'rgba(255, 255, 255, 0.7)'
                    ],
                    borderColor: [
                        'rgba(46, 125, 50, 1)',
                        'rgba(212, 175, 55, 1)',
                        'rgba(76, 175, 80, 1)',
                        'rgba(200, 200, 200, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed + ' kg';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    function hitungDistribusi() {
        const totalDaging = parseFloat(document.getElementById('total-daging-input').value) || 0;
        const persenShohibul = parseFloat(document.getElementById('persen-shohibul').value) || 0;
        const persenPanitia = parseFloat(document.getElementById('persen-panitia').value) || 0;
        const persenJamaah = parseFloat(document.getElementById('persen-jamaah').value) || 0;
        const persenMustahiq = parseFloat(document.getElementById('persen-mustahiq').value) || 0;

        const totalPersen = persenShohibul + persenPanitia + persenJamaah + persenMustahiq;
        if (totalPersen !== 100) {
            alert(`Total persentase harus 100%. Saat ini ${totalPersen}%.`);
            return null;
        }

        const hasil = {
            shohibul: (totalDaging * persenShohibul / 100).toFixed(2),
            panitia: (totalDaging * persenPanitia / 100).toFixed(2),
            jamaah: (totalDaging * persenJamaah / 100).toFixed(2),
            mustahiq: (totalDaging * persenMustahiq / 100).toFixed(2),
        };

        const tableBody = document.getElementById('distribusi-table-body');
        tableBody.innerHTML = `
            <tr class="border-b"><td class="p-3">Shohibul</td><td class="p-3">${persenShohibul}%</td><td class="p-3 font-semibold">${hasil.shohibul} kg</td></tr>
            <tr class="border-b"><td class="p-3">Panitia</td><td class="p-3">${persenPanitia}%</td><td class="p-3 font-semibold">${hasil.panitia} kg</td></tr>
            <tr class="border-b"><td class="p-3">Jamaah Sekitar</td><td class="p-3">${persenJamaah}%</td><td class="p-3 font-semibold">${hasil.jamaah} kg</td></tr>
            <tr class="border-b"><td class="p-3">Mustahiq</td><td class="p-3">${persenMustahiq}%</td><td class="p-3 font-semibold">${hasil.mustahiq} kg</td></tr>
        `;

        if (distribusiChart) {
            distribusiChart.data.datasets[0].data = Object.values(hasil);
            distribusiChart.update();
        }
        
        return hasil;
    }

    document.getElementById('hitung-distribusi').addEventListener('click', () => {
        const distribusiData = hitungDistribusi();
        if (distribusiData) {
            updateLaporan(distribusiData);
        }
    });
    
    if (document.getElementById('distribusi-chart')) {
        initializeChart();
        hitungDistribusi();
    }

    // --- LAPORAN PAGE ---
    function updateLaporan(distribusiData) {
        // Update Ringkasan Utama
        const counts = { Sapi: 0, Kambing: 0, Domba: 0 };
        data.hewan.forEach(h => counts[h.jenis]++);
        const totalHewan = counts.Sapi + counts.Kambing + counts.Domba;
        document.getElementById('lap-total-hewan-summary').textContent = totalHewan + ' ekor';
        
        const totalDaging = data.hewan.reduce((sum, h) => sum + parseFloat(h.beratBersih), 0);
        document.getElementById('lap-total-daging').textContent = totalDaging.toFixed(2) + ' kg';

        // Update Jumlah Peserta
        document.getElementById('lap-shohibul').textContent = data.shohibul.length;
        document.getElementById('lap-mustahiq').textContent = data.mustahiq.length;

        // --- PERUBAHAN: Update Rekap Hewan tanpa ikon ---
        const rekapHewanDiv = document.getElementById('laporan-rekap-hewan');
        rekapHewanDiv.innerHTML = `
            <div class="p-4 border border-gray-200 rounded-lg">
                <p class="font-bold text-gray-800 text-2xl">${counts.Sapi}</p>
                <p class="text-sm text-gray-600">Ekor Sapi</p>
            </div>
            <div class="p-4 border border-gray-200 rounded-lg">
                <p class="font-bold text-gray-800 text-2xl">${counts.Kambing}</p>
                <p class="text-sm text-gray-600">Ekor Kambing</p>
            </div>
            <div class="p-4 border border-gray-200 rounded-lg">
                <p class="font-bold text-gray-800 text-2xl">${counts.Domba}</p>
                <p class="text-sm text-gray-600">Ekor Domba</p>
            </div>
        `;

        // Update Distribusi Daging
        const laporanDiv = document.getElementById('laporan-distribusi');
        laporanDiv.innerHTML = `
            <div>
                <p class="dist-judul">Shohibul</p>
                <p class="dist-nilai">${distribusiData.shohibul}</p>
                <p class="dist-satuan">kg</p>
            </div>
            <div>
                <p class="dist-judul">Panitia</p>
                <p class="dist-nilai">${distribusiData.panitia}</p>
                <p class="dist-satuan">kg</p>
            </div>
            <div>
                <p class="dist-judul">Jamaah Sekitar</p>
                <p class="dist-nilai">${distribusiData.jamaah}</p>
                <p class="dist-satuan">kg</p>
            </div>
            <div>
                <p class="dist-judul">Mustahiq</p>
                <p class="dist-nilai">${distribusiData.mustahiq}</p>
                <p class="dist-satuan">kg</p>
            </div>
        `;
    }
    
    // --- CETAK LAPORAN ---
    document.getElementById('cetak-laporan').addEventListener('click', () => {
        window.print();
    });

});