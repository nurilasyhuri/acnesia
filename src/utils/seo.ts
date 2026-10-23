import { BUSINESS_INFO } from '../data/businessInfo';

export const CANONICAL_BASE = 'https://sentraac.com';

export function ensureAbsoluteUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${CANONICAL_BASE}${cleanPath}`;
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HVACBusiness'],
    '@id': `${CANONICAL_BASE}/#business`,
    name: BUSINESS_INFO.name,
    alternateName: [
      'Sentra AC Jual Beli, Sewa, Service & Pasang AC Malang',
      'Sentra AC Spesialis AC Baru & Bekas Kantor Gedung',
      'Jasa Service, Cuci & Sewa AC Standing Sentra AC',
    ],
    url: `${CANONICAL_BASE}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${CANONICAL_BASE}/images/og/default-og.jpg`,
      width: 1200,
      height: 630,
    },
    image: [
      `${CANONICAL_BASE}/images/hero/hero-sentraac.webp`,
      `${CANONICAL_BASE}/images/og/default-og.jpg`,
    ],
    description: BUSINESS_INFO.description,
    telephone: `+${BUSINESS_INFO.whatsappNumber}`,
    email: BUSINESS_INFO.email,
    priceRange: '$$',
    currenciesAccepted: 'IDR',
    paymentAccepted: 'Cash, Bank Transfer, Invoice B2B',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.district,
      addressRegion: BUSINESS_INFO.address.province,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: 'ID',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    areaServed: BUSINESS_INFO.serviceAreas.map((area) => ({
      '@type': 'AdministrativeArea',
      name: area,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Layanan Jual Beli, Sewa, Service, Pasang & Cuci AC Sentra AC',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Jual Beli Unit AC Baru & Bekas',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'AC Split Wall Mounted 0.5 PK - 2.5 PK Baru & Bekas' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'AC Cassette 4-Way Plafon 2 PK - 5 PK' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'AC Floor Standing 3 PK - 5 PK Komersial' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'AC Ceiling Ducted Central Gedung & Kantor' } },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Jasa Service, Pasang, Cuci & Sewa AC',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Jual Beli & Tukar Tambah AC Baru dan Bekas Borongan' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sewa AC Standing 3 PK - 10 PK & AC Split Harian Bulanan' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Jasa Service AC Panggilan, Perbaikan Bocor & Isi Freon' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Jasa Pasang & Bongkar Pasang AC Standar Vakum' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Jasa Cuci AC Steam & Preventive Maintenance Berkala' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kontrak Maintenance AC Kantor, Gedung & Perusahaan' } },
          ],
        },
      ],
    },
  };
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${CANONICAL_BASE}/#website`,
    url: `${CANONICAL_BASE}/`,
    name: BUSINESS_INFO.name,
    alternateName: 'Sentra AC - Jual Beli, Sewa, Service, Pasang & Cuci AC',
    description: BUSINESS_INFO.description,
    publisher: {
      '@id': `${CANONICAL_BASE}/#business`,
    },
    inLanguage: 'id-ID',
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const entry: Record<string, any> = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
      };
      if (item.url) {
        entry.item = ensureAbsoluteUrl(item.url);
      }
      return entry;
    }),
  };
}

export interface ProductSchemaInput {
  title: string;
  description: string;
  thumbnail: string;
  brand?: string;
  category?: string;
  slug: string;
  sku?: string;
  price?: number;
  priceDisplay?: string;
  stockStatus?: string;
  variants?: Array<{
    name: string;
    price: number;
    priceDisplay: string;
    sku?: string;
    unit?: string;
  }>;
  specs?: Record<string, any>;
}

export function getProductSchema(product: ProductSchemaInput) {
  const productUrl = `${CANONICAL_BASE}/produk/${product.slug}/`;
  const imageUrl = ensureAbsoluteUrl(product.thumbnail);

  const merchantPolicy = {
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'ID',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 7,
      returnMethod: 'https://schema.org/ReturnByMail',
      returnFees: 'https://schema.org/FreeReturn',
    },
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingRate: {
        '@type': 'MonetaryAmount',
        value: '0',
        currency: 'IDR',
      },
      shippingDestination: [
        {
          '@type': 'DefinedRegion',
          addressCountry: 'ID',
        },
      ],
    },
  };

  let offers: Record<string, any>;

  if (product.variants && product.variants.length > 1) {
    const prices = product.variants.map((v) => v.price).filter((p) => p > 0);
    const lowPrice = prices.length > 0 ? Math.min(...prices) : (product.price || 0);
    const highPrice = prices.length > 0 ? Math.max(...prices) : (product.price || 0);

    offers = {
      '@type': 'AggregateOffer',
      priceCurrency: 'IDR',
      lowPrice: String(lowPrice),
      highPrice: String(highPrice),
      offerCount: String(product.variants.length),
      priceValidUntil: '2027-12-31',
      url: productUrl,
      offers: product.variants.map((v) => ({
        '@type': 'Offer',
        name: `${product.title} - ${v.name}`,
        priceCurrency: 'IDR',
        price: String(v.price),
        sku: v.sku || product.sku,
        priceValidUntil: '2027-12-31',
        availability: product.stockStatus === 'po' ? 'https://schema.org/PreOrder' : product.stockStatus === 'hubungi-kami' ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        url: productUrl,
        seller: {
          '@id': `${CANONICAL_BASE}/#business`,
        },
        ...merchantPolicy,
      })),
    };
  } else {
    const effectivePrice = product.price && product.price > 0
      ? product.price
      : product.variants?.[0]?.price || 0;

    offers = {
      '@type': 'Offer',
      priceCurrency: 'IDR',
      price: String(effectivePrice),
      sku: product.sku || product.variants?.[0]?.sku,
      priceValidUntil: '2027-12-31',
      availability: product.stockStatus === 'po' ? 'https://schema.org/PreOrder' : product.stockStatus === 'hubungi-kami' ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: productUrl,
      seller: {
        '@id': `${CANONICAL_BASE}/#business`,
      },
      ...merchantPolicy,
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${productUrl}#product`,
    url: productUrl,
    name: product.title,
    description: product.description,
    image: imageUrl,
    brand: {
      '@type': 'Brand',
      name: product.brand || BUSINESS_INFO.name,
    },
    category: product.category || 'Air Conditioning',
    offers,
  };
}

export function getServiceSchema(service: {
  title: string;
  description: string;
  slug: string;
  serviceType?: string;
  image?: string;
  heroImage?: string;
  scopeOfWork?: string[];
}) {
  const serviceUrl = `${CANONICAL_BASE}/layanan/${service.slug}/`;
  const img = service.heroImage || service.image;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    url: serviceUrl,
    name: service.title,
    serviceType: service.serviceType || 'Commercial HVAC & Air Conditioning Services',
    description: service.description,
    provider: {
      '@id': `${CANONICAL_BASE}/#business`,
    },
    areaServed: BUSINESS_INFO.serviceAreas.map((area) => ({
      '@type': 'AdministrativeArea',
      name: area,
    })),
    ...(img ? { image: ensureAbsoluteUrl(img) } : {}),
  };
}

export function getArticleSchema(article: {
  title: string;
  description: string;
  publishDate: string;
  updatedDate?: string;
  author: string;
  slug: string;
  image?: string;
  heroImage?: string;
}) {
  const articleUrl = `${CANONICAL_BASE}/artikel/${article.slug}/`;
  const img = article.heroImage || article.image || '/images/og/default-og.jpg';
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${articleUrl}#article`,
    headline: article.title,
    description: article.description,
    image: ensureAbsoluteUrl(img),
    datePublished: article.publishDate,
    dateModified: article.updatedDate || article.publishDate,
    author: {
      '@type': 'Person',
      name: article.author || 'Tim Teknisi & Engineer Sentra AC',
      url: `${CANONICAL_BASE}/tentang-kami/`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${CANONICAL_BASE}/#business`,
      name: BUSINESS_INFO.name,
      url: `${CANONICAL_BASE}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${CANONICAL_BASE}/images/og/default-og.jpg`,
        width: 1200,
        height: 630,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };
}

export function getCollectionPageSchema(data: {
  name: string;
  description: string;
  url: string;
  items?: Array<{ name: string; url: string; description?: string }>;
}) {
  const pageUrl = ensureAbsoluteUrl(data.url);
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#collection`,
    url: pageUrl,
    name: data.name,
    description: data.description,
    isPartOf: {
      '@id': `${CANONICAL_BASE}/#website`,
    },
  };

  if (data.items && data.items.length > 0) {
    schema.mainEntity = {
      '@type': 'ItemList',
      itemListElement: data.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: ensureAbsoluteUrl(item.url),
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
      })),
    };
  }

  return schema;
}
