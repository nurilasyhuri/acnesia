---
title: 'Perhitungan External Static Pressure (ESP) & Dimensi Ducting AC Central Pabrik'
description: 'Panduan teknis menghitung static pressure loss, gesekan udara BJLS, dan penentuan dimensi ducting AC central serta AHU pada ruang produksi pabrik.'
publishDate: '31 Oktober 2026'
author: 'Tim HVAC Engineer Sentra AC'
category: 'Desain & Rekayasa'
tags: ["static pressure ducting","ducting bjls","ac central pabrik","ahu industri"]
heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80'
---

# Perhitungan External Static Pressure (ESP) & Dimensi Ducting AC Central Pabrik

Keluhan yang paling sering muncul pasca pemasangan sistem Air Handling Unit (AHU) atau AC Split Duct di area produksi pabrik dan gudang industri adalah **hembusan udara di diffuser ujung ruangan terasa loyo, bising gemuruh di dekat unit mesin, atau motor fan terbakar akibat kelebihan beban arus**. Akar masalah dari kegagalan ini hampir selalu bersumber dari salah satu hal krusial: salah menghitung **External Static Pressure (ESP)** dan penentuan dimensi saluran udara (*ducting design*).

Banyak pelaksana lapangan hanya mengandalkan "feeling" tukang plat seng dalam menentukan ukuran ducting BJLS (Baja Lapis Seng). Ketika hambatan gesek (*friction loss*) di sepanjang jalur ducting, elbow, reducer, volume damper, dan HEPA filter melebihi kapasitas dorong blower fan, debit volume udara (CFM) yang sampai ke ruang kerja akan anjlok drastis.

---

## 1. Konsep Dasar Total Pressure: Static Pressure vs Velocity Pressure

Dalam dinamika fluida tata udara HVAC:

```
Total Pressure (TP) = Static Pressure (SP) + Velocity Pressure (VP)
```

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

```json
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
```
