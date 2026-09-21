import { BUSINESS_INFO } from '../data/businessInfo';

export const WHATSAPP_BASE = `https://wa.me/${BUSINESS_INFO.whatsappNumber}`;

export function generateGeneralInquiryUrl(sourcePage: string = 'homepage'): string {
  const text = `Halo ACNesia, saya ingin berkonsultasi mengenai kebutuhan AC untuk bisnis / kantor kami (Ref: ${sourcePage}).`;
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}

export function generateProductInquiryUrl(productName: string, capacity?: string, brand?: string): string {
  let text = `Halo ACNesia, saya ingin menanyakan penawaran pengadaan unit AC:\n• Produk: ${productName}`;
  if (capacity) text += `\n• Kapasitas: ${capacity}`;
  if (brand) text += `\n• Merek: ${brand}`;
  text += `\n\nMohon informasi ketersediaan unit, opsi kapasitas, dan estimasi penawaran resminya. Terima kasih!`;
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}

export function generateServiceInquiryUrl(serviceName: string, unitCount?: string, location?: string): string {
  let text = `Halo ACNesia, saya ingin mengajukan layanan teknis AC:\n• Jenis Layanan: ${serviceName}`;
  if (unitCount) text += `\n• Estimasi Jumlah Unit: ${unitCount}`;
  if (location) text += `\n• Lokasi: ${location}`;
  text += `\n\nMohon informasi ketersediaan teknisi dan jadwal survey lokasi. Terima kasih!`;
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}

export function generateRentalInquiryUrl(unitType: string, duration: string, refPage: string = 'sewa-ac'): string {
  const text = `Halo ACNesia, saya ingin mengajukan sewa / rental AC:\n• Tipe Unit: ${unitType}\n• Durasi Sewa: ${duration}\n(Ref: ${refPage})\n\nMohon informasi ketersediaan unit dan estimasi biaya paket rental. Terima kasih!`;
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}

export interface RfqParams {
  name: string;
  company?: string;
  location?: string;
  items: string[];
  notes?: string;
}

export function generateRfqUrl(rfq: RfqParams): string {
  let text = `Halo ACNesia, saya ingin mengajukan Permintaan Penawaran (RFQ):\n` +
    `• Nama PIC: ${rfq.name}\n`;
  if (rfq.company) text += `• Perusahaan / Instansi: ${rfq.company}\n`;
  if (rfq.location) text += `• Lokasi / Kota: ${rfq.location}\n`;
  text += `\n📋 Rincian Kebutuhan:\n`;
  rfq.items.forEach((item, i) => {
    text += `${i + 1}. ${item}\n`;
  });
  if (rfq.notes) {
    text += `\n📝 Catatan Khusus: ${rfq.notes}\n`;
  }
  text += `\nMohon dikirimkan proposal penawaran dan konfirmasi jadwal survey jika diperlukan. Terima kasih!`;
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}
