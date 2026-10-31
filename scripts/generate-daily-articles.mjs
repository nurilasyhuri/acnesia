import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const artikelDir = path.join(projectRoot, 'src', 'content', 'artikel');

const TOPIC_POOL = [
  {
    slug: 'perhitungan-static-pressure-dimensi-ducting-ac-central-pabrik',
    title: 'Perhitungan External Static Pressure (ESP) & Dimensi Ducting AC Central Pabrik',
    description: 'Panduan teknis menghitung static pressure loss, gesekan udara BJLS, dan penentuan dimensi ducting AC central serta AHU pada ruang produksi pabrik.',
    category: 'Desain & Rekayasa',
    tags: ['static pressure ducting', 'ducting bjls', 'ac central pabrik', 'ahu industri'],
    heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    content: `# Perhitungan External Static Pressure (ESP) & Dimensi Ducting AC Central Pabrik

Keluhan yang paling sering muncul pasca pemasangan sistem Air Handling Unit (AHU) atau AC Split Duct di area produksi pabrik dan gudang industri adalah **hembusan udara di diffuser ujung ruangan terasa loyo, bising gemuruh di dekat unit mesin, atau motor fan terbakar akibat kelebihan beban arus**. Akar masalah dari kegagalan ini hampir selalu bersumber dari salah satu hal krusial: salah menghitung **External Static Pressure (ESP)** dan penentuan dimensi saluran udara (*ducting design*).

Banyak pelaksana lapangan hanya mengandalkan "feeling" tukang plat seng dalam menentukan ukuran ducting BJLS (Baja Lapis Seng). Ketika hambatan gesek (*friction loss*) di sepanjang jalur ducting, elbow, reducer, volume damper, dan HEPA filter melebihi kapasitas dorong blower fan, debit volume udara (CFM) yang sampai ke ruang kerja akan anjlok drastis.

---

## 1. Konsep Dasar Total Pressure: Static Pressure vs Velocity Pressure

Dalam dinamika fluida tata udara HVAC:

\`\`\`
Total Pressure (TP) = Static Pressure (SP) + Velocity Pressure (VP)
\`\`\`

- **Static Pressure (SP)**: Tekanan potensial yang menekan dinding ducting ke arah luar. Inilah tenaga yang dibutuhkan untuk mendorong udara menembus hambatan kisi-kisi filter, coil pendingin, percabangan pipa, dan diffuser register.
- **Velocity Pressure (VP)**: Tekanan kinetik akibat kecepatan pergerakan udara di dalam saluran.

Metode perancangan ducting yang paling stabil untuk area pabrik dan cleanroom adalah **Equal Friction Method (Metode Gesekan Merata)**. Pada metode ini, ukuran ducting dihitung menyusut secara proporsional di setiap percabangan agar tingkat kehilangan tekanan konstan pada kisaran **0.08 hingga 0.1 inch WG (Water Gauge) per 100 kaki panjang ducting (atau 0.8–1.0 Pa/meter)**.

---

> ### Catatan Mandor & Poin Kritis Lapangan
> 1. **Radius Belokan Elbow Wajib Menggunakan Turning Vane**: Hindari membuat elbow siku 90 derajat tajam tanpa sudu pengarah (*turning vanes*). Turbulensi udara di sudut mati elbow tajam menyumbang kehilangan tekanan statis hingga setara dengan 15 meter panjang ducting lurus! Pasang turning vane aerodinamis ganda di setiap lekukan belokan utama dekat outlet AHU.
> 2. **Periksa Drop Pressure Filter Saat Kotor**: Jangan menghitung ESP hanya berdasarkan kondisi filter baru yang masih bersih. HEPA filter H14 memiliki *initial pressure drop* sekitar 150 Pa, tetapi saat jenuh debu bisa melonjak hingga *final pressure drop* 350–450 Pa. Jika fan blower dipilih pas-pasan, debit udara ke ruang produksi steril akan mati total dalam waktu 3 bulan.

---

## 2. Tabel Standar Kecepatan Udara Maksimal di Dalam Ducting Industri

| Bagian Saluran Ducting | Kecepatan Udara Maksimal (FPM) | Rekomendasi Material & Tebal BJLS |
|---|---|---|
| **Main Ducting Dekat AHU** | 1.800 – 2.200 FPM | BJLS 80 – BJLS 100 (Tebal 0.8 – 1.0 mm) |
| **Branch Duct (Cabang Utama)** | 1.200 – 1.500 FPM | BJLS 60 – BJLS 70 (Tebal 0.6 – 0.7 mm) |
| **Runout ke Diffuser / Grille** | 600 – 800 FPM | BJLS 50 atau Flexible Duct Insulasi |
| **Return Air Ducting** | 1.000 – 1.200 FPM | Dilengkapi akustik lining peredam suara |

---

## Tabel Jangkauan Fabrikasi Ducting & Instalasi HVAC Se-Indonesia

Sentra AC melayani perancangan rekayasa, fabrikasi ducting BJLS/PIR menggunakan mesin CNC plasma cutter, serta instalasi AHU komersial di seluruh kawasan industri Nusantara:

| Wilayah / Koridor | Kawasan Industri Utama | Karakteristik Beban Pendinginan | Moda Mobilisasi & Material | Estimasi Lead Time | Status Layanan |
|---|---|---|---|---|:---:|
| **Koridor Jawa** | Cikarang, Karawang, KIIC, MM2100, Rungkut Surabaya | Pabrik otomotif, farmasi, FMCG, elektronik | Armada Truk Wingbox & Teknisi HVAC | 1 – 3 Hari Kerja | Siap Survey & Eksekusi |
| **Koridor Sumatera** | Kawasan Industri Medan (KIM), Dumai, Batam | Pengolahan sawit, petrokimia, manufaktur | Truk Lintas Sumatera & Kapal Kargo | 3 – 6 Hari Kerja | Siap Survey & Eksekusi |
| **Koridor Kalimantan** | Balikpapan Kariangau, Banjarmasin, Bontang | Workshop pertambangan & smelter | Ekspedisi Peti Kemas Tanjung Perak | 5 – 9 Hari Kerja | Siap Survey & Eksekusi |
| **Koridor Sulawesi** | Kawasan Industri Makassar (KIMA), Morowali | Smelter nikel, pengolahan hasil laut | Kargo Kapal Kontainer Cepat | 6 – 10 Hari Kerja | Siap Survey & Eksekusi |
| **Koridor Bali & Nusra** | Denpasar, Mataram, Kawasan Mandalika | Hotel bintang lima, resort, convention center | Truk Ekspedisi Darat Ferry Penyeberangan | 3 – 5 Hari Kerja | Siap Survey & Eksekusi |
| **Koridor Maluku & Papua** | Timika, Sorong, Jayapura | Fasilitas pertambangan, bandara, rumah sakit | Kargo Udara Khusus & Tol Laut Pelni | 8 – 15 Hari Kerja | Siap Survey & Eksekusi |

---

## Tanya Jawab Teknis (FAQ)

### Mengapa ducting AC di pabrik sering meneteskan air kondensasi (sweating)?
Kondensasi terjadi karena ketebalan insulasi thermal luar (glasswool atau closed-cell elastomeric nitrile foam) tidak mencukupi untuk mengisolasi selisih suhu antara udara dingin di dalam ducting (12°C–14°C) dengan udara luar pabrik yang lembap dan panas (33°C, RH 85%). Pastikan insulasi memiliki ketebalan minimal 25–50 mm dengan kerapatan (*density*) minimal 32 kg/m³ dan dilapis aluminium foil ber-scrim tanpa sobekan.

### Apa perbedaan ducting BJLS dengan ducting Polyurethane (PIR)?
Ducting BJLS menggunakan lembaran plat galvanis yang dilapisi insulasi luar secara terpisah, sangat kokoh untuk tekanan statis tinggi (>1.000 Pa) dan tahan benturan. Sedangkan pre-insulated PIR ducting menggunakan busa busa kaku berlapis aluminium foil ganda yang sangat ringan dan cepat dirakit, cocok untuk tekanan statis menengah (<500 Pa) di area komersial dan kantor.

---

## Solusi Tata Udara Industri Presisi Bersama Sentra AC

Hindari kerugian akibat salah desain kapasitas AHU dan ducting. Tim mechanical engineer Sentra AC siap membantu perhitungan software cooling load (HAP), fabrikasi presisi, dan uji balancing aliran udara (TAB):

- **Katalog Unit Komersial**: [Lihat AC Commercial & VRF](/produk/ac-commercial/)
- **Layanan Lengkap**: [Jasa Pengadaan & Pemasangan AC Gedung](/layanan/)
- **Konsultasi WhatsApp**: [Hubungi Tim HVAC Engineer (0857-4188-3391)](https://wa.me/6285741883391?text=Halo%20Sentra%20AC,%20saya%20ingin%20konsultasi%20perhitungan%20ducting%20dan%20AHU%20pabrik)

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Mengapa ducting AC di pabrik meneteskan air kondensasi (sweating)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kondensasi terjadi akibat insulasi tidak cukup tebal menahan perbedaan suhu dingin ducting dan udara lembap luar. Gunakan insulasi minimal 25-50 mm density 32 kg/m3 berlapis foil rapat."
      }
    },
    {
      "@type": "Question",
      "name": "Apa perbedaan ducting BJLS dengan ducting Polyurethane (PIR)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BJLS sangat kokoh untuk tekanan statis tinggi pabrik (>1000 Pa). PIR ducting ringan dan cepat dipasang untuk tekanan statis menengah pada gedung komersial."
      }
    }
  ]
}
\`\`\`
`
  },
  {
    slug: 'panduan-pemasangan-vav-box-variable-air-volume-gedung',
    title: 'Panduan Pemasangan VAV (Variable Air Volume) Box Hemat Energi Gedung Bertingkat',
    description: 'SOP instalasi VAV box pada sistem AC central gedung bertingkat: kalibrasi actuator damper, sensor aliran udara pitot tube, dan penghematan energi VFD chiller.',
    category: 'HVAC Komersial',
    tags: ['vav box', 'variable air volume', 'ac central gedung', 'efisiensi energi hvac'],
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=1200&q=80',
    content: `# Panduan Pemasangan VAV (Variable Air Volume) Box Hemat Energi Gedung Bertingkat

Pada gedung perkantoran bertingkat (*commercial high-rise office*), kebutuhan beban pendinginan di setiap ruangan bersifat dinamis sepanjang hari. Ruang rapat di sisi barat gedung membutuhkan suplai udara dingin maksimal saat terik matahari sore dan dipenuhi puluhan orang. Namun satu jam kemudian ketika rapat selesai, ruangan tersebut kosong dan hanya membutuhkan seperlima debit udara normal.

Sistem konvensional Constant Air Volume (CAV) membuang energi sangat besar karena terus memasok volume udara penuh tanpa mempedulikan okupansi. Penerapan **VAV (Variable Air Volume) Box** yang terintegrasi dengan Variable Frequency Drive (VFD) pada motor blower AHU mampu memangkas konsumsi listrik sistem tata udara hingga **25% hingga 40% per tahun**.

---

## 1. Prinsip Kerja & Anatomi Unit VAV Terminal Box

VAV Box adalah unit pengatur volume udara yang dipasang di atas plafon sebelum saluran cabang masuk ke diffuser tiap zona ruangan.

Komponen utama VAV Box meliputi:

1. **Velocity Pressure Sensor (Multi-Point Crossflow Averaging Sensor)**: Batang tabung pitot yang membaca perbedaan tekanan udara masuk untuk mengukur debit aliran riil (CFM) secara presisi.
2. **Modulating Damper Blade**: Daun damper aerodinamis dengan gasket perimeter kedap udara (*low leakage damper*) yang digerakkan oleh motor aktuator digital.
3. **Electronic DDC Controller**: Otak digital VAV yang menerima sinyal suhu dari termostat dinding ruangan, membandingkannya dengan setpoint, lalu memerintahkan aktuator untuk membuka atau menutup damper secara proporsional.
4. **Electric / Hydronic Reheat Coil (Opsional)**: Pemanas tambahan untuk mencegah ruangan menjadi terlalu dingin (*over-cooling*) saat damper menutup ke posisi debit minimum.

---

> ### Catatan Mandor & Poin Kritis Lapangan
> 1. **Panjang Pipa Lurus Sebelum Masuk VAV Box Wajib Minimal 3x Diameter Saluran**: Sensor pitot tube VAV sangat sensitif terhadap turbulensi pusaran udara. Jangan pernah menempatkan elbow flexibel langsung di leher inlet VAV box! Sediakan jarak pipa ducting lurus minimal 3 hingga 5 kali diameter inlet pipa sebelum masuk ke sensor agar pembacaan aliran CFM tidak kacau.
> 2. **Atur Minimum Flow Stop Damper Minimal 20–30%**: Jangan biarkan damper VAV box menutup rapat 100% saat ruangan kosong. Suplai udara minimum sebesar 20–30% wajib tetap mengalir demi menjaga sirkulasi udara segar (fresh air ventilation standar ASHRAE 62.1) dan mencegah ruangan menjadi pengap atau lembap.

---

## 2. Integrasi VAV dengan Variable Speed Drive (VFD) AHU

Keberhasilan efisiensi sistem VAV bergantung pada koordinasi antara VAV terminal di ruangan dengan kontrol blower di AHU:

Ketika beberapa VAV box di ruangan menutup, tekanan statis di dalam main ducting akan meningkat. Sensor static pressure yang dipasang di 2/3 panjang main ducting akan mendeteksi kenaikan tekanan ini dan mengirim sinyal ke VFD motor AHU untuk menurunkan kecepatan putaran kipas (RPM). Dengan hukum kipas (*affinity laws*), penurunan kecepatan kipas sebesar 20% akan menurunkan konsumsi daya motor listrik sebesar **hampir 50% ($Power \propto RPM^3$)**!

---

## Tabel Jangkauan Pengadaan Unit VAV & Testing Balancing Se-Indonesia

| Wilayah / Koridor | Kota / Kawasan Pusat | Tipe Gedung Komersial | Moda Pengiriman & Setting | Estimasi Lead Time | Status Layanan |
|---|---|---|---|---|:---:|
| **Koridor Jawa** | Jakarta SCBD, Thamrin, Surabaya Barat, Bandung | Perkantoran Grade-A & Rumah Sakit | Armada Box Sentra AC & Engineer | 1 – 3 Hari Kerja | Ready Stock & Testing |
| **Koridor Sumatera** | Medan Podomoro, Pekanbaru, Palembang Icon | Gedung perbankan & pusat perbelanjaan | Truk Lintas Sumatera & Kapal Ro-Ro | 3 – 6 Hari Kerja | Ready Stock & Testing |
| **Koridor Kalimantan** | Balikpapan Grand City, Samarinda, IKN Nusantara | Gedung pemerintahan baru & BUMN | Peti Kemas Laut Surabaya-Balikpapan | 5 – 9 Hari Kerja | Ready Stock & Testing |
| **Koridor Sulawesi** | Makassar Pettarani, Manado Boulevard | Hotel bintang & gedung bertingkat | Kargo Kapal Laut Kontainer | 6 – 10 Hari Kerja | Ready Stock & Testing |
| **Koridor Bali & Nusra** | Kuta, Nusa Dua, Seminyak, Mataram | Luxury resort & ballroom hotel | Jalur Darat & Penyeberangan Ferry | 3 – 5 Hari Kerja | Ready Stock & Testing |
| **Koridor Maluku & Papua** | Jayapura, Sorong, Timika | Gedung kantor perwakilan & bandara | Ekspedisi Udara & Tol Laut Pelni | 8 – 14 Hari Kerja | Ready Stock & Testing |

---

## Tanya Jawab Teknis (FAQ)

### Apakah sistem VAV bisa dipasang pada gedung eksisting (retrofit)?
Bisa. Retrofit dari sistem CAV ke VAV dilakukan dengan memotong saluran cabang plafon untuk menyelipkan VAV box, mengganti termostat lama dengan termostat digital DDC, dan memasang inverter VFD pada panel motor AHU eksisting.

### Bagaimana mengatasi kebisingan desis udara saat damper VAV box menutup sempit?
Gunakan VAV box yang memiliki lapisan attenuator peredam akustik di dalam selongsongnya (*sound attenuator casing*) dan pastikan tekanan statis main ducting dikontrol stabil oleh VFD agar tidak terjadi lonjakan tekanan berlebih di leher inlet damper.

---

## Konsultasi Modernisasi HVAC Gedung Bersama Sentra AC

Turunkan tagihan listrik gedung Anda dengan rekayasa otomasi VAV teruji bersama Sentra AC:

- **Katalog Layanan Komersial**: [Pengadaan & Instalasi AC Komersial](/produk/ac-commercial/)
- **Artikel Terkait**: [Keunggulan Sistem VRV/VRF untuk Gedung Kantor](/artikel/keunggulan-ac-vrv-vrf-gedung-kantor/)
- **Kontak Engineer via WhatsApp**: [Hubungi 0857-4188-3391](https://wa.me/6285741883391?text=Halo%20Sentra%20AC,%20saya%20ingin%20konsultasi%20sistem%20VAV%20gedung)

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Apakah sistem VAV bisa dipasang pada gedung eksisting (retrofit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bisa. Dilakukan dengan menyelipkan VAV box di cabang plafon, termostat digital DDC, dan penambahan VFD inverter pada motor blower AHU."
      }
    },
    {
      "@type": "Question",
      "name": "Bagaimana mengatasi desis udara saat damper VAV box menyempit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gunakan box dengan sound attenuator internal dan kontrol tekanan main ducting via VFD agar tidak terjadi tekanan statis berlebih."
      }
    }
  ]
}
\`\`\`
`
  }
];

export function generateDailyArticles(count = 1) {
  console.log(`[ARTICLE-GENERATOR] Checking existing articles in ${artikelDir}...`);
  if (!fs.existsSync(artikelDir)) {
    fs.mkdirSync(artikelDir, { recursive: true });
  }

  const existingFiles = fs.readdirSync(artikelDir).filter((f) => f.endsWith('.md'));
  const existingSlugs = new Set(existingFiles.map((f) => f.replace(/\.md$/, '')));

  console.log(`[ARTICLE-GENERATOR] Found ${existingSlugs.size} existing articles.`);

  const availableTopics = TOPIC_POOL.filter((t) => !existingSlugs.has(t.slug));

  if (availableTopics.length === 0) {
    console.log('[ARTICLE-GENERATOR] No new topics available in pool. All topics already published!');
    return [];
  }

  const toPublish = availableTopics.slice(0, count);
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const formattedDate = `${day} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;

  const generatedFiles = [];

  for (const item of toPublish) {
    const filePath = path.join(artikelDir, `${item.slug}.md`);
    const frontmatter = `---
title: '${item.title}'
description: '${item.description}'
publishDate: '${formattedDate}'
author: 'Tim HVAC Engineer Sentra AC'
category: '${item.category}'
tags: ${JSON.stringify(item.tags)}
heroImage: '${item.heroImage}'
---

`;
    const fullContent = frontmatter + item.content.trim() + '\n';
    fs.writeFileSync(filePath, fullContent, 'utf8');
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
