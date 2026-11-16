import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const artikelDir = path.join(projectRoot, 'src', 'content', 'artikel');

function getIndonesianDate(date = new Date()) {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  const wibDate = new Date(utc + (3600000 * 7));
  const day = wibDate.getDate();
  const month = months[wibDate.getMonth()];
  const year = wibDate.getFullYear();
  return `${day} ${month} ${year}`;
}

const NATIONWIDE_TABLE = `## Tabel Jangkauan Mobilisasi Teknisi & Pengadaan Unit Se-Indonesia

Sentra AC melayani perancangan beban pendinginan, pengadaan unit baru/rekondisi, instalasi ducting, serta kontrak perawatan berkala ke seluruh koridor:

| Koridor Wilayah | Cakupan Kawasan Industri & Bisnis | Layanan Prioritas Lapangan | Moda Mobilisasi Alat | Estimasi Respon | Status Layanan |
|---|---|---|---|---|:---:|
| **Jabodetabek & Banten** | Cikarang, Karawang KIIC, BSD, TB Simatupang | Sewa Standing, Pengadaan VRF, Service Chiller | Armada Box Service Cepat | 1 – 2 Jam Kerja | Siap Survey & Eksekusi |
| **Jawa Barat & Bandung** | Pasteur, Cimahi, Purwakarta, Subang Smartpolitan | Ducting BJLS, AC Cassette Kantor, Chiller | Mobil Teknisi & Pick-up Material | Hari yang Sama | Siap Survey & Eksekusi |
| **Jawa Tengah & DIY** | Semarang Wijayakusuma, Kendal KIK, Solo, Sleman | Split Duct Pabrik, Kontrak Maintenance | Armada Service Cabang Jateng | 1 Hari Kerja | Siap Survey & Eksekusi |
| **Jawa Timur** | Surabaya SIER, Manyar JIIPE Gresik, Sidoarjo, Malang | Precision AC Server, Sewa Standing Pabrik | Pick-up & Truk Engkel HVAC | 1 Hari Kerja | Siap Survey & Eksekusi |
| **Sumatera Hub** | Medan KIM, Batamindo, Pekanbaru, Palembang | AC Industri Heavy-Duty, Bongkar Pasang B2B | Truk Lintas & Kapal Kargo | 2 – 4 Hari Kerja | Siap Survey & Eksekusi |
| **Kalimantan & IKN** | Balikpapan Kariangau, Samarinda, Banjarmasin | Chiller Tambang, Cassette Kantor Cabang | Ekspedisi Peti Kemas Laut | 4 – 7 Hari Kerja | Siap Survey & Eksekusi |
| **Sulawesi & Indonesia Timur** | Makassar KIMA, Morowali Smelter, Manado | Heavy-Duty Packaged AC, Maintenance Pabrik | Kapal Pelni & Kontainer Cepat | 5 – 9 Hari Kerja | Siap Survey & Eksekusi |`;

const INDONESIA_HUBS = [
  { name: 'Cikarang', region: 'Kawasan Industri Jababeka & EJIP', province: 'Jawa Barat', ambient: '33°C – 36°C dengan debu partikulat manufaktur berat', type: 'pabrik otomotif, elektronik, dan gudang logistik' },
  { name: 'Karawang', region: 'Kawasan Industri KIIC & Suryacipta', province: 'Jawa Barat', ambient: '34°C – 37°C kelembapan sedang beban mesin tinggi', type: 'fasilitas manufaktur presisi dan data center Tier-3' },
  { name: 'Jakarta Selatan', region: 'Koridor TB Simatupang & SCBD', province: 'DKI Jakarta', ambient: '31°C – 34°C dengan solar heat gain gedung kaca tinggi', type: 'gedung perkantoran Grade-A, perbankan, dan coworking space' },
  { name: 'Jakarta Barat', region: 'Kawasan Puri Indah & Kebon Jeruk', province: 'DKI Jakarta', ambient: '32°C – 35°C area komersial padat', type: 'ruko komersial 4 lantai, klinik medis, dan kantor ekspedisi' },
  { name: 'Jakarta Utara', region: 'Kelapa Gading, Pluit & Marunda Center', province: 'DKI Jakarta', ambient: '33°C – 36°C udara pesisir berkadar garam dan korosi tinggi', type: 'pergudangan pelabuhan, cold storage, dan ruko bisnis' },
  { name: 'Tangerang', region: 'BSD City & Gading Serpong', province: 'Banten', ambient: '32°C – 35°C intensitas pemakaian nonstop', type: 'head office korporat, restoran modern, dan showroom' },
  { name: 'Tangerang Industri', region: 'Kawasan Manis, Jatake & Cikupa', province: 'Banten', ambient: '33°C – 36°C beban panas mesin injeksi plastik & logam', type: 'pabrik kemasan, tekstil, dan industri pengolahan' },
  { name: 'Bekasi', region: 'Kawasan GIIC Deltamas & MM2100', province: 'Jawa Barat', ambient: '33°C – 36°C paparan panas industri kimia & baja', type: 'pabrik perakitan, stamping, dan food processing' },
  { name: 'Bogor', region: 'Sentul City & Gunung Putri', province: 'Jawa Barat', ambient: '28°C – 32°C kelembapan udara relatif tinggi (RH 80%)', type: 'resort ballroom, industri farmasi, dan fasilitas riset' },
  { name: 'Bandung', region: 'Soekarno Hatta & Kawasan Gedebage', province: 'Jawa Barat', ambient: '26°C – 30°C fluktuasi siang terik dan malam dingin', type: 'kantor konsultan, studio kreatif, dan sentra konveksi garmen' },
  { name: 'Semarang', region: 'Kawasan Candi & Pelabuhan Tanjung Emas', province: 'Jawa Tengah', ambient: '33°C – 36°C pesisir panas dan lembap', type: 'pabrik garmen ekspor, kantor logistik, dan hotel bintang' },
  { name: 'Kendal', region: 'Kawasan Industri Kendal (KIK)', province: 'Jawa Tengah', ambient: '32°C – 35°C koridor industri terpadu baru', type: 'pabrik tekstil modern, furnitur ekspor, dan baterai' },
  { name: 'Surabaya', region: 'Rungkut SIER & Margomulyo', province: 'Jawa Timur', ambient: '34°C – 37°C beban termal tropis pesisir Jawa Timur', type: 'kantor pusat regional, industri kimia, dan ekspedisi' },
  { name: 'Gresik', region: 'Kawasan Industri Manyar JIIPE', province: 'Jawa Timur', ambient: '33°C – 37°C uap kimia, semen, dan udara laut korosif', type: 'smelter tembaga, pabrik pupuk, dan pergudangan modern' },
  { name: 'Sidoarjo', region: 'Waru, Berbek Industri & Gedangan', province: 'Jawa Timur', ambient: '33°C – 36°C pusat UMKM dan pabrik manufaktur', type: 'gudang transit e-commerce, pabrik makanan, dan kantor cabang' },
  { name: 'Malang', region: 'Klojen, Blimbing & Karanglo', province: 'Jawa Timur', ambient: '27°C – 31°C iklim sejuk dataran tinggi', type: 'kampus universitas, rumah sakit rujukan, dan hotel resort' },
  { name: 'Solo / Surakarta', region: 'Solo Baru & Kawasan Palur', province: 'Jawa Tengah', ambient: '31°C – 34°C pusat perdagangan tekstil dan perhotelan', type: 'pusat grosir, convention center, dan perbankan' },
  { name: 'Yogyakarta', region: 'Sleman, Malioboro & Ring Road Utara', province: 'D.I. Yogyakarta', ambient: '30°C – 33°C kelembapan ruang meeting & event', type: 'boutique hotel, ballroom pertemuan, dan kantor teknologi' },
  { name: 'Medan', region: 'Kawasan Industri Medan (KIM 1-4) Mabar', province: 'Sumatera Utara', ambient: '32°C – 35°C uap minyak sawit dan kelembapan tropis', type: 'pabrik oleokimia, kantor pusat perkebunan, dan rumah sakit' },
  { name: 'Batam', region: 'Batamindo Mukakuning & Kabil Integrated', province: 'Kepulauan Riau', ambient: '31°C – 34°C pulau maritim standar ekspor Singapura', type: 'pabrik semikonduktor, perakitan presisi, dan galangan kapal' },
  { name: 'Pekanbaru', region: 'Arengka & Tuanku Tambusai', province: 'Riau', ambient: '33°C – 36°C panas terik khatulistiwa', type: 'head office kelapa sawit, logistik pulp & paper, dan dealer otomotif' },
  { name: 'Palembang', region: 'Kertapati & Soekarno Hatta By Pass', province: 'Sumatera Selatan', ambient: '32°C – 35°C dataran rendah sungai Musi', type: 'pabrik pupuk, kantor kontraktor batubara, dan mall komersial' },
  { name: 'Bandar Lampung', region: 'Panjang & Kawasan Industri Natar', province: 'Lampung', ambient: '32°C – 35°C pintu gerbang logistik Sumatera-Jawa', type: 'pabrik pakan ternak, pengolahan kopi, dan pergudangan' },
  { name: 'Balikpapan', region: 'Kariangau Interport & Sudirman Hub', province: 'Kalimantan Timur', ambient: '31°C – 34°C koridor pertambangan migas dan IKN', type: 'kantor kontraktor migas, workshop alat berat, dan mess perumahan' },
  { name: 'Samarinda', region: 'Palaran & Sungai Kunjang', province: 'Kalimantan Timur', ambient: '31°C – 35°C tepian Sungai Mahakam lembap', type: 'pelabuhan peti kemas, logistik tambang, dan ruko perbankan' },
  { name: 'Banjarmasin', region: 'Trisakti & Liang Anggang Banjarbaru', province: 'Kalimantan Selatan', ambient: '32°C – 35°C rawa pesisir dan perdagangan logistik', type: 'perkantoran pelabuhan batubara, hotel, dan cold storage' },
  { name: 'Pontianak', region: 'Khatulistiwa Siantan & Rasau Jaya', province: 'Kalimantan Barat', ambient: '32°C – 36°C lintasan tepat garis khatulistiwa', type: 'kantor perkebunan sawit, pabrik karet, dan sentra komersial' },
  { name: 'Makassar', region: 'Kawasan Industri Makassar (KIMA) Daya', province: 'Sulawesi Selatan', ambient: '33°C – 36°C gerbang logistik timur Indonesia', type: 'pabrik terigu, pengolahan hasil laut beku, dan rumah sakit' },
  { name: 'Denpasar & Badung', region: 'Kuta, Nusa Dua, Seminyak & Sunset Road', province: 'Bali', ambient: '31°C – 34°C standar pariwisata internasional', type: 'resort hotel bintang 5, villa komersial, resto fine dining' },
  { name: 'Manado', region: 'Kairagi, Paniki & Boulevard Kawasan Bisnis', province: 'Sulawesi Utara', ambient: '30°C – 34°C udara pesisir teluk berangin laut', type: 'hotel pariwisata bahari, bank daerah, dan pusat retail' }
];

const HVAC_ARCHETYPES = [
  {
    slugSuffix: 'sewa-ac-standing-floor-event-pabrik',
    serviceTitle: 'Sewa AC Standing Floor 5 PK & 10 PK untuk Pabrik, Tenda & Event',
    seoKeyword: 'sewa ac standing',
    category: 'ac-floor-standing',
    tags: ['sewa ac standing', 'rental ac standing floor', 'ac event pabrik', 'ac tenda roder'],
    heroImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    coreNeed: 'kebutuhan pendinginan sementara (*temporary cooling*) berkapasitas besar untuk acara peresmian, gathering tahunan, shutdown maintenance pabrik, maupun ruang produksi tambahan',
    equipmentType: 'AC Floor Standing 5 PK (45.000 BTU/h) dan 10 PK (90.000 BTU/h) bersuspensi fan blower kencang',
    sopFocus: 'Pengecekan kecukupan daya panel listrik kVA, instalasi kabel NYYhy ber-MCB mandiri, dan pemasangan pipa buang drain air kondensasi agar tidak menggenangi karpet atau lantai produksi.',
    tableSpec: [
      ['Daya Pendinginan per Unit', '5 PK (45.000 – 48.000 BTU/h)', '10 PK (90.000 – 96.000 BTU/h)'],
      ['Konsumsi Daya Listrik', '4.200 – 4.800 Watt (3-Phase 380V)', '8.500 – 9.800 Watt (3-Phase 380V)'],
      ['Kebutuhan Suplai Listrik', 'Minimal MCB 3x16A', 'Minimal MCB 3x25A'],
      ['Radius Efektif Hembusan Udara', '12 – 16 Meter ke depan', '18 – 24 Meter turbo throw'],
      ['Aplikasi Ideal Lapangan', 'Tenda VIP, ruang seminar, lobby kantor', 'Hanggar pabrik, tenda roder, gudang logistik']
    ]
  },
  {
    slugSuffix: 'service-maintenance-ac-vrv-vrf-gedung-kantor',
    serviceTitle: 'Jasa Service & Preventive Maintenance AC VRV / VRF Gedung Kantor',
    seoKeyword: 'service ac vrv vrf',
    category: 'ac-commercial',
    tags: ['service ac vrv', 'maintenance vrf gedung', 'cuci chemical vrf', 'hvac commercial office'],
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    coreNeed: 'pemeliharaan berkala sistem pendingin multi-split variable refrigerant flow agar inverter kompresor outdoor bekerja seimbang tanpa error code trip di tengah jam kerja aktif',
    equipmentType: 'Sistem VRV / VRF Outdoor modular kapasitas 8 HP hingga 64 HP dengan puluhan indoor cassette & ducted',
    sopFocus: 'Pemeriksaan error code melalui remote check PCB checker, pembacaan subcooling & superheat refrigerant via manifold gauge digital, serta pencucian kondensor outdoor bertekanan tanpa merusak fin kisi aluminium.',
    tableSpec: [
      ['Pemeriksaan Tekanan Kerja', 'R410A / R32 High & Low Side', 'Toleransi tekanan sesuai kurva inverter'],
      ['Uji Arus Kompresor (Ampere)', 'Clamp meter digital true-RMS', 'Harus stabil di bawah RLA (Rated Load Amps)'],
      ['Pembersihan Evaporator & Kondensor', 'Chemical coil cleaner food-grade', 'PH netral tidak merusak lapisan blue-fin'],
      ['Inspeksi Jalur Komunikasi Refnet', 'Pengecekan kabel shield 2-core F1/F2', 'Bebas induksi elektromagnetik kabel power'],
      ['Garansi Pekerjaan Service', '30 – 90 Hari kalender', 'Termasuk monitoring berkala performa BTU']
    ]
  },
  {
    slugSuffix: 'pengadaan-pasang-ac-cassette-inverter-kantor',
    serviceTitle: 'Pengadaan & Pemasangan AC Cassette Inverter 4-Way Hemat Listrik',
    seoKeyword: 'pengadaan ac cassette',
    category: 'ac-cassette',
    tags: ['pasang ac cassette', 'ac cassette 4 way', 'pengadaan ac kantor', 'ac cassette inverter'],
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    coreNeed: 'instalasi unit AC tersembunyi di atas plafon (*ceiling-mounted*) dengan sirkulasi hembusan 360 derajat merata untuk ruang rapat direksi, open office modern, dan ruang publik eksklusif',
    equipmentType: 'AC Cassette 4-Way Inverter kapasitas 2.5 PK, 3 PK, 4 PK, hingga 5 PK berefisiensi CSPF bintang 5',
    sopFocus: 'Pemasangan gantungan tie rod ber-rubber damper anti-getar, penataan pompa drain bawaan unit dengan kemiringan pipa PVC minimal 1:100, dan proses evakuasi vakum pipa freon hingga di bawah 500 micron.',
    tableSpec: [
      ['Tipe Hembusan Udara', '4-Way Surround Airflow 360°', 'Bebas blindspot di sudut ruangan'],
      ['Tingkat Kebisingan Indoor', '32 – 41 dB(A) silent operation', 'Sangat tenang untuk ruang presentasi'],
      ['Standar Pipa Tembaga', 'Ketebalan minimal 0.76 – 0.81 mm', 'Wajib tembaga ASTM B280 annealed roll'],
      ['Pompa Drain Built-in', 'Lift head hingga 750 – 850 mm', 'Mencegah bocor air plafon gypsum'],
      ['Efisiensi Penghematan Listrik', 'Inverter Eco Mode otomatis', 'Turun hingga 35% dibanding sistem non-inverter']
    ]
  },
  {
    slugSuffix: 'kontrak-perawatan-rutin-ac-pabrik-dan-gedung',
    serviceTitle: 'Kontrak Service Perawatan Berkala AC Perusahaan & Gedung Bertingkat',
    seoKeyword: 'kontrak maintenance ac perusahaan',
    category: 'paket-jasa',
    tags: ['kontrak service ac', 'maintenance ac perusahaan', 'sop cuci ac gedung', 'perawatan hvac b2b'],
    heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    coreNeed: 'manajemen pemeliharaan terstruktur dengan SLA terukur untuk mencegah *downtime* mendadak, memperpanjang usia ekonomis unit, dan menstabilkan konsumsi listrik bulanan perusahaan',
    equipmentType: 'Paket terintegrasi mencakup seluruh unit Split Wall, Cassette, Standing Floor, hingga AHU Ducting',
    sopFocus: 'Jadwal kunjungan periodik bulanan atau triwulanan, kartu kontrol barcode di setiap unit mesin, berita acara teknisi (BAP), dan laporan bulanan efisiensi termal untuk divisi General Affairs (GA) / Facility Management.',
    tableSpec: [
      ['Frekuensi Kunjungan Service', 'Pilihan: 1 Bulan sekali / 2 Bulan sekali / 3 Bulan sekali', 'Sesuai tingkat kepadatan debu kawasan'],
      ['Cakupan Pekerjaan Standar', 'Cuci steam evaporator, kondensor, drain tray, cek arus & freon', 'Full overhaul pembersihan total'],
      ['Service Level Agreement (SLA)', 'Respon darurat maksimal 2 – 4 jam untuk unit kritis', 'Teknisi standby bersertifikat BNSP'],
      ['Dokumentasi Pekerjaan', 'BAP digital, foto before-after, checklist parameter mesin', 'Lengkap untuk syarat audit ISO 9001/14001'],
      ['Opsi Penggantian Sparepart', 'Diskon khusus penggantian kapasitor, motor fan, kompresor', 'Garansi part resmi pabrikan']
    ]
  },
  {
    slugSuffix: 'instalasi-ac-presisi-pac-server-room-data-center',
    serviceTitle: 'Instalasi & Rekayasa AC Presisi (PAC) Server Room & Data Center',
    seoKeyword: 'ac presisi server room',
    category: 'ac-commercial',
    tags: ['ac presisi server', 'precision air conditioner', 'pac data center', 'hvac cleanroom'],
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    coreNeed: 'pengendalian temperatur stabil 20°C – 22°C dan kelembapan konstan 45% – 55% RH secara nonstop 24/7/365 untuk rak server perbankan, telekomunikasi, dan ruang kontrol industri SCADA',
    equipmentType: 'Precision Air Conditioning (PAC) Direct Expansion (DX) Upflow / Downflow dengan modul Humidifier & Dehumidifier',
    sopFocus: 'Pemasangan plenum raised floor terisolasi, integrasi sistem otomatis dual-unit N+1 redundancy dengan automatic changeover controller, dan sensor pemantauan alarm temperatur via Modbus/SNMP.',
    tableSpec: [
      ['Rasio Sensible Heat (SHR)', 'Tinggi: 0.90 – 0.98', 'Fokus mendinginkan panas elektronik tanpa mengeringkan'],
      ['Toleransi Kontrol Suhu', 'Presisi ±0.5°C hingga ±1°C', 'Mencegah thermal throttling prosesor server'],
      ['Toleransi Kontrol Kelembapan', 'Presisi ±3% hingga ±5% RH', 'Mencegah listrik statis maupun kondensasi air'],
      ['Sistem Redundansi Standar', 'Konfigurasi N+1 atau 2N Aktif', 'Auto-switchover jika salah satu unit mengalami trip'],
      ['Sistem Pemantauan Terpusat', 'BMS Modbus RTU / SNMP Network Card', 'Notifikasi alarm real-time ke admin IT']
    ]
  },
  {
    slugSuffix: 'jual-beli-borongan-tukar-tambah-ac-bekas-kantor',
    serviceTitle: 'Jual Beli Borongan & Tukar Tambah AC Bekas Kantor / Gedung',
    seoKeyword: 'jual beli ac bekas kantor',
    category: 'paket-jasa',
    tags: ['beli ac bekas borongan', 'tukar tambah ac kantor', 'lelang ac kantor', 'ac second bergaransi'],
    heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    coreNeed: 'solusi monetisasi aset AC lama saat renovasi gedung, relokasi kantor, atau peremajaan unit borongan dengan penaksiran harga jujur dan proses bongkar rapi tanpa merusak struktur bangunan',
    equipmentType: 'Terima seluruh merk AC (Daikin, Panasonic, Gree, Mitsubishi, LG) tipe Split, Cassette, Floor Standing, hingga Chiller',
    sopFocus: 'Teknik pump-down refrigeran agar freon lama tersimpan di kompresor tanpa terbuang ke atmosfer, pencabutan pipa tembaga rapi, penutupan lubang bobokan dinding, dan armada angkut mandiri.',
    tableSpec: [
      ['Skema Penilaian Unit', 'Kondisi kompresor original, fisik indoor/outdoor, tahun produksi', 'Harga borongan transparan & kompetitif'],
      ['Skema Tukar Tambah (Trade-In)', 'Unit lama dihargai tinggi untuk memotong biaya unit baru inverter', 'Termasuk jasa pasang & pipa baru'],
      ['Tenaga Kerja Pembongkaran', 'Tim internal bersertifikat K3 ketinggian', 'Dilengkapi tangga scaffolding & APD lengkap'],
      ['Pembayaran Transaksi', 'Tunai di tempat atau transfer bank resmi perusahaan B2B', 'Faktur invoice & kuitansi resmi bertanda tangan'],
      ['Garansi Unit Rekondisi', 'Garansi dingin & mesin 3 hingga 6 bulan', 'Kompresor lulus uji pressure test 450 PSI']
    ]
  },
  {
    slugSuffix: 'fabrikasi-ducting-bjls-pir-ac-central-pabrik',
    serviceTitle: 'Fabrikasi & Instalasi Ducting AC Central BJLS / PIR Pabrik & Gedung',
    seoKeyword: 'ducting ac central pabrik',
    category: 'ac-commercial',
    tags: ['fabrikasi ducting bjls', 'ducting pir komersial', 'ac split duct pabrik', 'hvac air handling unit'],
    heroImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    coreNeed: 'penyaluran distribusi udara dingin dari Air Handling Unit (AHU) atau Split Duct ke seluruh penjuru ruangan dengan hambatan gesek statis (*external static pressure*) terhitung presisi',
    equipmentType: 'Saluran Ducting Plat BJLS (Lockformer TDC/TDF tebal 0.6–1.0 mm) atau Pre-Insulated Polyurethane (PIR)',
    sopFocus: 'Perhitungan Equal Friction Method agar hembusan tiap diffuser seimbang, isolasi glasswool density 32 kg/m³ berlapis aluminium foil anti-kondensasi (*sweating*), dan penambahan volume damper pengatur CFM.',
    tableSpec: [
      ['Pilihan Material Saluran', 'Plat Baja Lapis Seng (BJLS) Galvanis', 'Pre-Insulated Foam Board (PIR Double Foil)'],
      ['Ketahanan Tekanan Statis', 'Tinggi (>1.000 Pa) tahan benturan fisik', 'Menengah (<500 Pa) bobot ultra-ringan'],
      ['Pencegahan Kondensasi', 'Insulasi Glasswool / Nitrile Foam 25–50 mm', 'Thermal conductivity super rendah (0.022 W/m.K)'],
      ['Aksesori Sambungan', 'Flange TDC/TDF dengan corner clamp kedap udara', 'Profil aluminium H-bayonet & lem silikon neutral'],
      ['Pengujian Aliran Udara', 'Testing, Adjusting, & Balancing (TAB) CFM', 'Anemometer digital & vane hood bersertifikat']
    ]
  }
];

function generateProceduralArticle(hub, archetype) {
  const slug = `${archetype.slugSuffix}-${hub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const title = `${archetype.serviceTitle} di ${hub.name}: Solusi Pendinginan Presisi & Bergaransi`;
  const description = `Layanan ${archetype.seoKeyword} profesional di ${hub.name}, ${hub.province} (${hub.region}). Menangani ${hub.type} dengan teknisi HVAC tersertifikasi dan garansi resmi.`;

  const intro = `Aktivitas operasional di **${hub.name}, ${hub.province}**—khususnya pada koridor **${hub.region}**—menuntut performa tata udara yang andal. Wilayah ini didominasi oleh fasilitas ${hub.type} yang beroperasi di bawah kondisi iklim mikro ${hub.ambient}. Kerusakan sistem AC, penurunan debit hembusan udara dingin, maupun kebocoran refrigeran dapat langsung mengganggu kenyamanan kerja, menurunkan produktivitas karyawan, hingga berisiko merusak peralatan produksi yang sensitif terhadap temperatur.

Untuk menjawab tantangan tersebut, **Sentra AC** menghadirkan layanan spesialis **${archetype.serviceTitle.toLowerCase()}** di kawasan **${hub.name}** dengan standar rekayasa termal presisi, suku cadang original, dan jaminan purna jual resmi.`;

  const section1 = `Kebutuhan sistem tata udara di wilayah **${hub.name}** memiliki karakteristik tersendiri karena tingginya paparan ${hub.ambient}. Dalam skenario ${hub.type}, sistem pendingin tidak hanya dituntut mampu mencapai target temperatur 22°C–24°C, tetapi juga harus sanggup beroperasi secara efisien dalam durasi panjang tanpa mengalami *overheating* pada kompresor outdoor.

Layanan ini difokuskan untuk mengakomodasi ${archetype.coreNeed}. Kami menurunkan tim mechanical engineer dan teknisi berpengalaman yang memahami betul spesifikasi teknis unit **${archetype.equipmentType}**, sehingga setiap pekerjaan penanganan AC di ${hub.name} diselesaikan dengan cepat dan minim gangguan terhadap aktivitas bisnis Anda.`;

  const mandor1 = `**Proteksi Terhadap Debu & Panas Lingkungan ${hub.name}:** Pada area industri dan komersial padat di ${hub.name}, kondensor outdoor wajib diletakkan pada posisi dengan sirkulasi udara bebas hambatan minimal 1 meter dari dinding dan diberi pelindung anti-debu. Lakukan pembersihan chemical rutin agar kompresor tidak bekerja pada beban arus berlebih (*high ampere cut-off*).`;
  const mandor2 = `**Standar Teknis Vakum & Sambungan Pipa:** ${archetype.sopFocus} Hindari metode purgging manual menggunakan freon tanpa pompa vakum karena sisa uap air di dalam pipa tembaga akan memicu korosi asam dan penyumbatan kapiler dalam hitungan bulan.`;

  const tableHeader = ['Parameter Evaluasi Teknis', 'Spesifikasi Standar Sentra AC', 'Keunggulan Operasional di Lapangan'];
  const tableRows = archetype.tableSpec.map(item => [item[0], item[1], item[2]]);

  const steps = [
    { title: `Survey Beban Pendinginan & Kapasitas di ${hub.name}`, desc: `Perhitungan luas ruangan, tinggi plafon, solar heat gain dari kaca gedung, serta beban panas internal peralatan elektronik menggunakan standar ASHRAE.` },
    { title: `Pemilihan Unit & Rekayasa Jalur Pipa / Kelistrikan`, desc: `Penentuan jalur pipa tembaga terpendek dengan oil trap jika elevasi outdoor lebih tinggi dari indoor, serta instalasi kabel grounding mandiri.` },
    { title: `Eksekusi Pemasangan / Service Sesuai SOP Presisi`, desc: `Penerapan prosedur vacuum test <500 micron, leak test nitrogen 450 PSI, serta pembersihan evaporator dengan mesin steam jet tekanan terkontrol.` },
    { title: `Testing, Commissioning & Serah Terima Garansi`, desc: `Pengukuran delta suhu inlet/outlet minimal 8°C–12°C, pengecekan tegangan voltase serta arus ampere kompresor, dan penyerahan lembar garansi resmi Sentra AC.` }
  ];

  const faqs = [
    {
      q: `Berapa lama estimasi respon teknisi Sentra AC ke lokasi proyek di ${hub.name}?`,
      a: `Untuk area ${hub.name} dan sekitarnya, tim teknisi kami dapat melakukan survei lapangan atau penanganan darurat dalam rentang 1 hingga 3 jam kerja tergantung jadwal mobilisasi tim cabang terdekat.`
    },
    {
      q: `Apakah pekerjaan ${archetype.seoKeyword} di ${hub.name} mendapatkan garansi tertulis?`,
      a: `Ya, seluruh instalasi unit baru mendapatkan garansi resmi pabrikan hingga 3–5 tahun, dan setiap pekerjaan perbaikan/service mendapatkan garansi dingin serta kebocoran tertulis dari Sentra AC selama 30 hingga 90 hari kalender.`
    },
    {
      q: `Bagaimana skema pembayaran untuk pengadaan atau kontrak service perusahaan di ${hub.name}?`,
      a: `Kami melayani skema pembayaran B2B fleksibel dengan invoice resmi perusahaan, faktur pajak PPN jika dibutuhkan, serta opsi termin pembayaran untuk kontrak maintenance tahunan.`
    }
  ];

  return {
    slug,
    title,
    description,
    category: archetype.category,
    tags: [
      `ac ${hub.name.toLowerCase()}`,
      `service ac ${hub.name.toLowerCase()}`,
      archetype.seoKeyword,
      ...archetype.tags
    ],
    heroImage: archetype.heroImage,
    intro,
    section1,
    mandorNotes: [mandor1, mandor2],
    tableHeader,
    tableRows,
    steps,
    faqs,
    hub,
    archetype
  };
}

function renderArticleMarkdown(art, publishDate) {
  const tableHeaderStr = `| ${art.tableHeader.join(' | ')} |\n| ${art.tableHeader.map(() => '---').join(' | ')} |`;
  const tableRowsStr = art.tableRows.map(row => `| ${row.join(' | ')} |`).join('\n');
  const mandorNotesStr = art.mandorNotes.map((note, idx) => `> ${idx + 1}. ${note}`).join('\n>\n');
  const stepsStr = art.steps.map((st, idx) => `${idx + 1}. **${st.title}:** ${st.desc}`).join('\n');
  const faqsMarkdown = art.faqs.map(f => `### ${f.q}\n${f.a}`).join('\n\n');
  const schemaFaqs = art.faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.a.replace(/\n/g, ' ').replace(/"/g, '\\"')
    }
  }));

  return `---
title: '${art.title.replace(/'/g, "''")}'
description: '${art.description.replace(/'/g, "''")}'
publishDate: '${publishDate}'
author: 'Tim HVAC Engineer Sentra AC'
category: '${art.category}'
tags: [${art.tags.map(t => `'${t}'`).join(', ')}]
heroImage: '${art.heroImage}'
featured: false
---

# ${art.title}

${art.intro}

---

## 1. Analisis Kebutuhan Pendinginan di ${art.hub.name}

${art.section1}

---

> ### Catatan Mandor & Poin Kritis Lapangan
${mandorNotesStr}

---

## 2. Tabel Spesifikasi & Parameter Teknis Layanan

${tableHeaderStr}
${tableRowsStr}

---

## 3. SOP Pelaksanaan Proyek Sentra AC di ${art.hub.name}

${stepsStr}

---

${NATIONWIDE_TABLE}

---

## Tanya Jawab Teknis (FAQ)

${faqsMarkdown}

---

## Solusi Tata Udara Terpercaya Bersama Sentra AC

Optimalkan sistem pendingin di fasilitas gedung dan pabrik Anda di wilayah **${art.hub.name}** bersama tim HVAC profesional Sentra AC:

- **Katalog Unit Komersial**: [Lihat AC Commercial & VRF](/produk/ac-commercial/)
- **Layanan Lengkap**: [Jasa Pengadaan & Service AC Gedung](/layanan/)
- **Konsultasi WhatsApp**: [Hubungi Tim HVAC Engineer (0857-4188-3391)](https://wa.me/6285741883391?text=${encodeURIComponent(`Halo Sentra AC, saya ingin konsultasi kebutuhan ${art.archetype.serviceTitle} untuk lokasi di ${art.hub.name}`)})

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": ${JSON.stringify(schemaFaqs, null, 2)}
}
\`\`\`
`;
}

export function generateDailyArticles(count = 1) {
  console.log(`[ARTICLE-GENERATOR] Checking existing articles in ${artikelDir}...`);
  if (!fs.existsSync(artikelDir)) {
    fs.mkdirSync(artikelDir, { recursive: true });
  }

  const existingFiles = fs.readdirSync(artikelDir).filter((f) => f.endsWith('.md'));
  const existingSlugs = new Set(existingFiles.map((f) => f.replace(/\.md$/, '')));

  console.log(`[ARTICLE-GENERATOR] Found ${existingSlugs.size} existing articles.`);

  // Build programmatic matrix: 30 hubs x 7 archetypes = 210 targeted articles
  const candidateTopics = [];
  for (const hub of INDONESIA_HUBS) {
    for (const archetype of HVAC_ARCHETYPES) {
      candidateTopics.push(generateProceduralArticle(hub, archetype));
    }
  }

  const availableTopics = candidateTopics.filter((art) => !existingSlugs.has(art.slug));

  if (availableTopics.length === 0) {
    console.log('[ARTICLE-GENERATOR] All 210+ programmatic topics already published!');
    return [];
  }

  const toPublish = availableTopics.slice(0, count);
  const formattedDate = getIndonesianDate();
  const generatedFiles = [];

  for (const item of toPublish) {
    const filePath = path.join(artikelDir, `${item.slug}.md`);
    const content = renderArticleMarkdown(item, formattedDate);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[ARTICLE-GENERATOR] Published new article: ${filePath}`);
    generatedFiles.push(filePath);
  }

  console.log(`[ARTICLE-GENERATOR] Successfully created ${generatedFiles.length} new article(s)!`);
  return generatedFiles;
}

// CLI execution support
const args = process.argv.slice(2);
let count = 1;
const countIdx = args.indexOf('--count');
if (countIdx !== -1 && args[countIdx + 1]) {
  count = parseInt(args[countIdx + 1], 10);
}

generateDailyArticles(count);
