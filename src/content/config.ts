import { defineCollection, z } from 'astro:content';

const produkCollection = defineCollection({
  type: 'content',
  schema: () => z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['ac-split', 'ac-cassette', 'ac-floor-standing', 'ac-commercial', 'paket-jasa']),
    condition: z.enum(['Unit Baru', 'Second Rekondisi', 'Paket Jasa', 'Sewa Unit']).default('Unit Baru'),
    capacity: z.string().optional(),
    brand: z.string().optional(),
    price: z.number().optional(),
    priceDisplay: z.string().optional(),
    compareAtPriceDisplay: z.string().optional(),
    stockStatus: z.enum(['ready', 'po', 'hubungi-kami']).default('ready'),
    featured: z.boolean().default(false),
    thumbnail: z.string(),
    specs: z.record(z.string()).optional(),
    orderPriority: z.number().default(99),
    variants: z.array(z.object({
      name: z.string(),
      price: z.number(),
      priceDisplay: z.string(),
      sku: z.string().optional(),
      unit: z.string().optional(),
    })).optional(),
  }),
});

const layananCollection = defineCollection({
  type: 'content',
  schema: () => z.object({
    title: z.string(),
    tagline: z.string().optional(),
    description: z.string(),
    serviceType: z.string().optional(),
    heroImage: z.string(),
    targetAudience: z.array(z.string()).optional(),
    scopeOfWork: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    orderPriority: z.number().default(99),
    featured: z.boolean().default(false),
  }),
});

const solusiCollection = defineCollection({
  type: 'content',
  schema: () => z.object({
    title: z.string(),
    target: z.string(),
    description: z.string(),
    heroImage: z.string(),
    painPoints: z.array(z.string()).optional(),
    solutions: z.array(z.string()).optional(),
    recommendedTypes: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
  }),
});

const artikelCollection = defineCollection({
  type: 'content',
  schema: () => z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    updatedDate: z.string().optional(),
    author: z.string().default('Tim HVAC Engineer Sentra AC'),
    category: z.string(),
    tags: z.array(z.string()),
    heroImage: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  produk: produkCollection,
  layanan: layananCollection,
  solusi: solusiCollection,
  artikel: artikelCollection,
};
