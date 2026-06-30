import React, { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Leaf,
  Wallet,
  Percent,
  Home,
  GraduationCap,
  Hospital,
  Tent,
  Store,
  Bed,
  Bath,
  Sofa,
  Utensils,
  Car,
  Trees,
  Info,
  ListChecks,
  CheckCircle,
  Building,
  X,
  ChevronDown,
  ChevronUp,
  MapPin,
} from 'lucide-react';

type IconCard = {
  icon: LucideIcon;
  title: string;
  description?: string;
};

type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

type LightboxImage = {
  src: string;
  alt: string;
  fallback?: string | string[] | undefined;
};

type ImageWithFallbackProps = {
  src: string;
  fallback?: string | string[] | undefined;
  alt: string;
  className?: string;
  onClick?: () => void;
};

const logoImg = '/assets/brand/logo.png';
const logoSpecImg = '/assets/brand/logo2.png';
const footerLogoImg = '/assets/brand/logo3.png';

const posterDesktopImg = '/assets/brand/poster.png';
const posterMobileImg = '/assets/brand/poster2.png';
const posterMobileFallbackImg = '/assets/brand/poster 2.png';

const promoPosterDesktopImg = '/assets/brand/promoposter1x1.png';
const promoPosterMobileImg = '/assets/brand/promopostera4.png';

const denahImg = '/assets/brand/denah.png';
const gambar1Img = '/assets/brand/gambar 1.png';
const gambar2Img = '/assets/brand/gambar 2.png';
const gambar3Img = '/assets/brand/gambar 3.png';

const WHATSAPP_NUMBER = '62811826090';

const createWaLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const waLink = createWaLink(
  'Halo Admin, saya tertarik dengan promo Rumah Subsidi Pesona Bunga Cibatok.'
);

const waLinkPromo = createWaLink(
  'Halo Admin, saya mau klaim Promo Booking 500rb Rumah Subsidi Cibatok.'
);

const WhatsAppIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const navItems = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Lokasi', href: '#lokasi' },
  { label: 'Tipe & Spek', href: '#fasilitas' },
  { label: 'Pricelist', href: '#harga' },
];

const locationItems: IconCard[] = [
  {
    icon: GraduationCap,
    title: 'Kampus IPB',
    description: 'Akses dekat ke area Kampus IPB Dramaga.',
  },
  {
    icon: Hospital,
    title: 'Puskesmas',
    description: 'Dekat dengan fasilitas kesehatan sekitar Cibatok.',
  },
  {
    icon: Tent,
    title: 'Wisata Alam',
    description: 'Dikelilingi area wisata, curug, dan suasana pegunungan.',
  },
  {
    icon: Store,
    title: 'Fasilitas Umum',
    description: 'Dekat pasar, kuliner, dan kebutuhan harian keluarga.',
  },
];

const roomFeatures: IconCard[] = [
  { icon: Bed, title: '2 Kamar Tidur' },
  { icon: Bath, title: '1 Kamar Mandi' },
  { icon: Sofa, title: 'Ruang Tamu' },
  { icon: Utensils, title: 'Area Dapur' },
  { icon: Car, title: 'Carport' },
  { icon: Trees, title: 'Teras & Taman' },
];

const importantNotes = [
  'Sudah termasuk biaya Sertifikat HGB & IMB.',
  'Booking Fee Rp 500.000 tidak termasuk Harga Jual dan hangus dalam kondisi apapun.',
  'Harga Jual & Nilai KPR sewaktu-waktu dapat berubah.',
  'Kelebihan tanah dinilai Rp 1.500.000 / m².',
];

const kprRequirements = [
  'BI Checking Bersih',
  'Fotocopy KTP Suami/Istri',
  'Fotocopy Kartu Keluarga',
  'Fotocopy NPWP',
  'Fotocopy Surat Nikah',
  'Surat Keterangan Kerja',
  'Slip Gaji 3 Bulan Terakhir',
  'Rekening Koran 3 Bulan',
  'Surat Keterangan Belum Punya Rumah dari Kantor Desa',
];

const installmentItems = [
  {
    tenor: '10',
    label: 'Tenor 10 Tahun',
    price: 'Rp 1.933.000',
    highlight: false,
  },
  {
    tenor: '15',
    label: 'Tenor 15 Tahun',
    price: 'Rp 1.438.400',
    highlight: false,
  },
  {
    tenor: '20',
    label: 'Tenor 20 Tahun',
    price: 'Rp 1.198.000',
    highlight: true,
  },
];

const accordionItems: AccordionItem[] = [
  {
    id: 'ket',
    title: 'Keterangan Penting',
    content:
      'Termasuk Sertifikat HGB & IMB. Booking fee 500rb tidak termasuk harga jual dan hangus dalam kondisi apapun. Harga dapat berubah sewaktu-waktu.',
  },
  {
    id: 'syarat',
    title: 'Persyaratan KPR',
    content:
      'BI Checking bersih, KTP, KK, NPWP, surat nikah, surat keterangan kerja, slip gaji, rekening koran 3 bulan, dan surat belum punya rumah.',
  },
];

const getFallbackList = (fallback?: string | string[] | undefined) => {
  if (!fallback) return [];
  return Array.isArray(fallback) ? fallback.filter(Boolean) : [fallback];
};

const ImageWithFallback = ({
  src,
  fallback,
  alt,
  className,
  onClick,
}: ImageWithFallbackProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const sources = [src, ...getFallbackList(fallback)];

  useEffect(() => {
    setImageIndex(0);
  }, [src]);

  return (
    <img
      src={sources[imageIndex]}
      alt={alt}
      className={className}
      onClick={onClick}
      onError={() => {
        setImageIndex((current) =>
          current < sources.length - 1 ? current + 1 : current
        );
      }}
    />
  );
};

const SectionHeader = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) => (
  <div className="text-center mb-8 md:mb-10">
    <span className="text-[#1B4D3E] font-extrabold uppercase tracking-[0.2em] text-[11px] md:text-xs">
      {eyebrow}
    </span>

    <h2 className="text-3xl md:text-4xl font-black text-gray-950 mt-2">
      {title}
    </h2>

    {description && (
      <p className="mt-3 text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    )}
  </div>
);

const FeatureCard = ({ icon: Icon, title }: IconCard) => (
  <div className="group bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-all">
    <div className="w-12 h-12 mx-auto mb-3 bg-[#F4F7F5] text-[#1B4D3E] rounded-2xl flex items-center justify-center group-hover:bg-[#1B4D3E] group-hover:text-white transition-colors">
      <Icon className="w-6 h-6" />
    </div>
    <p className="text-sm font-extrabold text-gray-800">{title}</p>
  </div>
);

const LocationCard = ({ icon: Icon, title, description }: IconCard) => (
  <div className="bg-[#1B4D3E]/55 p-5 md:p-6 rounded-3xl border border-[#2D6A4F] hover:bg-[#1B4D3E] transition-colors">
    <Icon className="w-9 h-9 md:w-10 md:h-10 text-[#D4AF37] mb-4" />
    <h3 className="font-extrabold text-lg mb-2">{title}</h3>
    <p className="text-sm text-[#E9EFEA] leading-relaxed">{description}</p>
  </div>
);

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('ket');
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(
    null
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsModalOpen(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const toggleAccordion = (id: string) => {
    setOpenAccordion((current) => (current === id ? null : id));
  };

  const openLightbox = (
    src: string,
    alt: string,
    fallback?: string | string[] | undefined
  ) => {
    setLightboxImage({ src, alt, fallback });
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <div className="font-sans text-gray-800 bg-[#F7F7F3] antialiased selection:bg-[#1B4D3E] selection:text-white min-h-screen pb-24 md:pb-0">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html { scroll-behavior: smooth; }

            .wa-float {
              animation: pulse-wa 2s infinite;
            }

            @keyframes pulse-wa {
              0% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
              }
              70% {
                transform: scale(1.04);
                box-shadow: 0 0 0 14px rgba(37, 211, 102, 0);
              }
              100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
              }
            }
          `,
        }}
      />

      <nav className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          <a href="#beranda" className="flex items-center">
            <ImageWithFallback
              src={logoImg}
              fallback={logoImg}
              alt="Pesona Bunga Cibatok"
              className="h-9 md:h-12 w-auto object-contain"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-[#1B4D3E] text-sm font-extrabold transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-[#1B4D3E] hover:bg-[#0F2922] text-white px-6 py-3 rounded-full text-sm font-extrabold shadow-lg transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5 text-[#D4AF37]" />
            Hubungi Kami
          </a>

          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="md:hidden bg-[#1B4D3E] text-white px-4 py-2 rounded-full text-[11px] font-extrabold shadow"
          >
            Hubungi
          </a>
        </div>
      </nav>

      <main>
        <section
          id="beranda"
          className="relative pt-24 md:pt-32 pb-12 md:pb-20 bg-white overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#E9F3EE] rounded-full blur-3xl opacity-70 translate-x-24 -translate-y-24" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F6E7B4] rounded-full blur-3xl opacity-40 -translate-x-24 translate-y-24" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F4F7F5] text-[#1B4D3E] font-extrabold text-[11px] uppercase tracking-wider mb-5 border border-[#E9EFEA]">
                  <Leaf className="w-4 h-4 text-[#D4AF37]" />
                  Rumah Subsidi Premium
                </div>

                <h1 className="text-[36px] sm:text-5xl lg:text-6xl font-black text-gray-950 leading-[1.05] mb-5">
                  Hunian Asri
                  <br />
                  <span className="text-[#1B4D3E]">View Pegunungan</span>
                </h1>

                <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-7">
                  Miliki rumah nyaman di Cibatok, Bogor. Cocok untuk keluarga
                  muda yang ingin punya hunian pertama dengan harga terjangkau,
                  lingkungan sejuk, dan akses strategis.
                </p>

                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0 mb-7">
                  <div className="bg-white border border-[#E9EFEA] text-[#1B4D3E] px-4 py-4 rounded-2xl font-extrabold shadow-sm flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <div className="text-left">
                      <p className="text-[10px] text-gray-500 font-bold">
                        Angsuran
                      </p>
                      <p className="text-xs sm:text-sm">1 Juta-an</p>
                    </div>
                  </div>

                  <div className="bg-[#1B4D3E] text-white px-4 py-4 rounded-2xl font-extrabold shadow-md flex items-center gap-3">
                    <Percent className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <div className="text-left">
                      <p className="text-[10px] text-white/70 font-bold">
                        DP Mulai
                      </p>
                      <p className="text-xs sm:text-sm">Hanya 1%</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 max-w-md mx-auto lg:mx-0">
                  <a
                    href={waLinkPromo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebd5c] text-white px-6 py-4 rounded-2xl text-base font-black transition-all shadow-lg hover:-translate-y-0.5"
                  >
                    <WhatsAppIcon className="w-6 h-6" />
                    Booking Cuma 500rb
                  </a>

                  <a
                    href="#harga"
                    className="inline-flex items-center justify-center bg-white text-[#1B4D3E] px-6 py-4 rounded-2xl text-base font-black border border-gray-100 shadow-sm hover:shadow-md transition-all"
                  >
                    Lihat Harga
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative w-full max-w-lg mx-auto">
                  <div className="absolute inset-0 bg-[#F4F7F5] rounded-[2rem] rotate-3 scale-105 border border-[#E9EFEA]" />

                  <div className="relative bg-white p-2 rounded-[2rem] shadow-2xl border border-gray-100">
                    <ImageWithFallback
                      src={posterDesktopImg}
                      fallback={posterDesktopImg}
                      alt="Poster Rumah Subsidi Pesona Bunga Cibatok"
                      onClick={() =>
                        openLightbox(
                          posterDesktopImg,
                          'Poster Rumah Subsidi Pesona Bunga Cibatok'
                        )
                      }
                      className="hidden md:block rounded-[1.5rem] w-full aspect-square object-cover cursor-zoom-in"
                    />

                    <ImageWithFallback
                      src={posterMobileImg}
                      fallback={[posterMobileFallbackImg, posterDesktopImg]}
                      alt="Poster Mobile Rumah Subsidi Pesona Bunga Cibatok"
                      onClick={() =>
                        openLightbox(
                          posterMobileImg,
                          'Poster Mobile Rumah Subsidi Pesona Bunga Cibatok',
                          [posterMobileFallbackImg, posterDesktopImg]
                        )
                      }
                      className="md:hidden rounded-[1.5rem] w-full aspect-[1/1.414] object-cover cursor-zoom-in"
                    />
                  </div>

                  <div className="absolute -bottom-5 left-4 md:-left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                    <div className="bg-[#F4F7F5] w-11 h-11 rounded-full flex items-center justify-center text-[#1B4D3E]">
                      <Home className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500 font-bold">
                        Spesial Promo
                      </p>
                      <p className="font-black text-gray-950 text-sm">
                        FREE BPHTB*
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="md:hidden px-4 -mt-2 mb-8 relative z-10">
          <div className="max-w-md mx-auto bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-black text-[#0F2922] text-lg">
                  Tipe 27/60
                </h2>
                <p className="text-[11px] text-gray-500">
                  Compact, fungsional, dan nyaman.
                </p>
              </div>

              <div className="bg-[#1B4D3E] text-white text-[10px] font-black px-3 py-2 rounded-2xl">
                DP 1%
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {roomFeatures.slice(0, 3).map(({ icon: Icon, title }) => (
                <div
                  key={title}
                  className="bg-[#F7F7F3] rounded-2xl p-3 text-center"
                >
                  <Icon className="mx-auto mb-1 w-5 h-5 text-[#1B4D3E]" />
                  <p className="text-[11px] font-extrabold">
                    {title
                      .replace('Kamar Tidur', 'KT')
                      .replace('Kamar Mandi', 'KM')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="lokasi"
          className="py-14 md:py-16 bg-[#0F2922] text-white border-y border-[#1B4D3E]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 text-[#D4AF37] font-extrabold text-[11px] uppercase tracking-[0.2em] mb-3">
                <MapPin className="w-4 h-4" />
                Lokasi Strategis
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-[#F4F7F5]">
                Dekat Fasilitas Harian
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {locationItems.map((item) => (
                <LocationCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section id="fasilitas" className="py-12 md:py-14 bg-[#F7F7F3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-4 md:mb-5">
              <ImageWithFallback
                src={logoSpecImg}
                fallback={logoImg}
                alt="Logo Pesona Bunga Cibatok"
                className="w-[320px] md:w-[500px] lg:w-[620px] h-auto object-contain"
              />
            </div>

            <SectionHeader
              eyebrow="Spesifikasi Bangunan"
              title="Tipe 27/60"
              description="Desain modern minimalis dengan tata ruang fungsional untuk kebutuhan keluarga pertama."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
              <div className="h-full grid grid-cols-1 gap-4 md:gap-6 lg:grid-rows-3">
                <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-white">
                  <ImageWithFallback
                    src={gambar1Img}
                    fallback={gambar2Img}
                    alt="Tampak Depan Rumah"
                    onClick={() =>
                      openLightbox(gambar1Img, 'Tampak Depan Rumah')
                    }
                    className="w-full h-full min-h-[220px] md:min-h-[260px] lg:min-h-0 object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                  />
                </div>

                <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-white">
                  <ImageWithFallback
                    src={gambar2Img}
                    fallback={gambar1Img}
                    alt="Tampak Samping Rumah"
                    onClick={() =>
                      openLightbox(gambar2Img, 'Tampak Samping Rumah')
                    }
                    className="w-full h-full min-h-[220px] md:min-h-[260px] lg:min-h-0 object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                  />
                </div>

                <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-white">
                  <ImageWithFallback
                    src={gambar3Img}
                    fallback={gambar1Img}
                    alt="Tampak Malam Rumah"
                    onClick={() =>
                      openLightbox(gambar3Img, 'Tampak Malam Rumah')
                    }
                    className="w-full h-full min-h-[220px] md:min-h-[260px] lg:min-h-0 object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                  />
                </div>
              </div>

              <div className="bg-white p-5 md:p-8 lg:p-10 rounded-3xl shadow-xl border border-gray-100 h-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 border-b border-gray-100 pb-5">
                  <div>
                    <h3 className="text-2xl font-black text-gray-950">
                      Denah Ruangan
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Luas Tanah 60 m² / Luas Bangunan 27 m²
                    </p>
                  </div>

                  <span className="bg-[#F4F7F5] text-[#1B4D3E] px-4 py-2 rounded-xl text-sm font-black border border-[#E9EFEA] w-fit">
                    LT 60 / LB 27
                  </span>
                </div>

                <div className="bg-gray-50 rounded-3xl p-4 md:p-6 mb-7 border border-gray-100 flex items-center justify-center">
                  <ImageWithFallback
                    src={denahImg}
                    fallback={denahImg}
                    alt="Denah Tipe 27/60"
                    onClick={() => openLightbox(denahImg, 'Denah Tipe 27/60')}
                    className="w-full max-h-[620px] object-contain rounded-2xl cursor-zoom-in mx-auto"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                  {roomFeatures.map((item) => (
                    <FeatureCard key={item.title} {...item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="harga" className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Transparan & Terjangkau"
              title="Pricelist Rumah Subsidi"
            />

            <div className="md:hidden space-y-5 mb-10">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-[#0F2922] text-white p-5">
                  <p className="text-xs uppercase tracking-[0.2em] font-extrabold text-white/70 mb-2">
                    Pricelist
                  </p>
                  <h3 className="text-2xl font-black">Type 27/60</h3>
                </div>

                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#F7F7F3] rounded-2xl p-4">
                      <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">
                        LT
                      </p>
                      <p className="text-2xl font-black text-gray-900">
                        60 m²
                      </p>
                    </div>

                    <div className="bg-[#F7F7F3] rounded-2xl p-4">
                      <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">
                        LB
                      </p>
                      <p className="text-2xl font-black text-gray-900">
                        27 m²
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#F4F7F5] border border-[#E9EFEA] rounded-2xl p-4">
                    <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">
                      Harga Jual
                    </p>
                    <p className="text-3xl font-black text-[#1B4D3E]">
                      Rp 185.000.000
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border border-gray-200 rounded-2xl p-4">
                      <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">
                        Booking Fee
                      </p>
                      <p className="text-lg font-black text-gray-900">
                        Rp 500.000
                      </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-4">
                      <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">
                        DP 1%
                      </p>
                      <p className="text-lg font-black text-gray-900">
                        Rp 1.850.000
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-4">
                    <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">
                      KPR Bank
                    </p>
                    <p className="text-2xl font-black text-gray-900">
                      Rp 179.150.000
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-3xl border border-gray-200 p-5">
                <h4 className="font-black text-gray-950 mb-5 text-center text-xl leading-tight">
                  Estimasi Angsuran Flat KPR Bank
                </h4>

                <div className="space-y-4">
                  {installmentItems.map((item) => (
                    <div
                      key={item.tenor}
                      className={`bg-white p-5 rounded-3xl text-center relative ${
                        item.highlight
                          ? 'border-2 border-[#2D6A4F] shadow-lg'
                          : 'border border-gray-200 shadow-sm'
                      }`}
                    >
                      {item.highlight && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-white text-[10px] font-black px-4 py-1 rounded-full shadow-md">
                          TERLARIS
                        </div>
                      )}

                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 font-black text-xl ${
                          item.highlight
                            ? 'bg-[#F4F7F5] text-[#1B4D3E]'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {item.tenor}
                      </div>

                      <div className="text-base text-gray-500 font-bold mb-2">
                        {item.label}
                      </div>

                      <div className="text-3xl font-black text-[#1B4D3E] leading-none">
                        {item.price}
                      </div>

                      <div className="text-sm text-gray-500 mt-1">/bln</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-10">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#0F2922] text-white text-center">
                      <tr>
                        <th className="px-5 py-5 font-black text-xs uppercase tracking-wider border-r border-[#1B4D3E]">
                          Type
                        </th>
                        <th className="px-5 py-5 font-black text-xs uppercase tracking-wider border-r border-[#1B4D3E]">
                          LT
                        </th>
                        <th className="px-5 py-5 font-black text-xs uppercase tracking-wider border-r border-[#1B4D3E]">
                          LB
                        </th>
                        <th className="px-5 py-5 font-black text-xs uppercase tracking-wider border-r border-[#1B4D3E] bg-[#1B4D3E] text-[#D4AF37]">
                          Harga Jual
                        </th>
                        <th className="px-5 py-5 font-black text-xs uppercase tracking-wider border-r border-[#1B4D3E]">
                          Booking Fee
                        </th>
                        <th className="px-5 py-5 font-black text-xs uppercase tracking-wider border-r border-[#1B4D3E]">
                          DP 1%
                        </th>
                        <th className="px-5 py-5 font-black text-xs uppercase tracking-wider">
                          KPR Bank
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-center text-gray-800 bg-white">
                      <tr className="hover:bg-[#F4F7F5] transition-colors">
                        <td className="px-5 py-6 font-black text-xl border-r border-gray-100 border-b">
                          27/60
                        </td>
                        <td className="px-5 py-6 font-bold border-r border-gray-100 border-b">
                          60 m²
                        </td>
                        <td className="px-5 py-6 font-bold border-r border-gray-100 border-b">
                          27 m²
                        </td>
                        <td className="px-5 py-6 font-black text-[#1B4D3E] text-lg border-r border-gray-100 border-b">
                          Rp 185.000.000
                        </td>
                        <td className="px-5 py-6 font-black border-r border-gray-100 border-b">
                          Rp 500.000
                        </td>
                        <td className="px-5 py-6 border-r border-gray-100 border-b">
                          <div className="font-black text-gray-950">
                            Rp 1.850.000
                          </div>
                          <div className="text-[10px] text-gray-500 mt-1 leading-tight">
                            Disiapkan di rekening tabungan
                            <br />
                            untuk angsuran pertama
                          </div>
                        </td>
                        <td className="px-5 py-6 font-black text-lg border-b border-gray-100">
                          Rp 179.150.000
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-50 p-5 md:p-8 border-t border-gray-200">
                  <h4 className="font-black text-gray-950 mb-6 text-center text-lg">
                    Estimasi Angsuran Flat KPR Bank
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
                    {installmentItems.map((item) => (
                      <div
                        key={item.tenor}
                        className={`bg-white p-6 rounded-3xl text-center relative hover:-translate-y-1 transition-transform ${
                          item.highlight
                            ? 'border-2 border-[#2D6A4F] shadow-lg'
                            : 'border border-gray-200 shadow-sm'
                        }`}
                      >
                        {item.highlight && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-white text-[10px] font-black px-4 py-1 rounded-full shadow-md">
                            TERLARIS
                          </div>
                        )}

                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-black ${
                            item.highlight
                              ? 'bg-[#F4F7F5] text-[#1B4D3E]'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {item.tenor}
                        </div>

                        <div className="text-sm text-gray-500 font-bold mb-1">
                          {item.label}
                        </div>

                        <div className="text-2xl font-black text-[#1B4D3E]">
                          {item.price}{' '}
                          <span className="text-sm font-normal text-gray-500">
                            /bln
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-[#F4F7F5] p-5 md:p-8 rounded-3xl border border-[#E9EFEA]">
                <h4 className="font-black text-xl text-[#0F2922] mb-6 flex items-center gap-3">
                  <div className="bg-[#1B4D3E] text-white w-9 h-9 rounded-xl flex items-center justify-center">
                    <Info className="w-4 h-4" />
                  </div>
                  Keterangan Penting
                </h4>

                <ul className="space-y-3">
                  {importantNotes.map((note, index) => (
                    <li
                      key={note}
                      className="flex items-start bg-white p-4 rounded-2xl shadow-sm border border-[#F4F7F5]/50"
                    >
                      <span className="bg-[#E9EFEA] text-[#1B4D3E] rounded-lg w-6 h-6 flex items-center justify-center text-xs font-black mr-3 shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-gray-700">
                        {note}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 p-4 bg-red-50 border border-red-100 rounded-2xl">
                  <p className="text-xs font-semibold text-red-600 leading-relaxed">
                    *Apabila nilai plafon KPR lebih rendah dari ketentuan bank,
                    konsumen wajib menambah uang muka / DP.
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 md:p-8 rounded-3xl border border-gray-200 shadow-sm">
                <h4 className="font-black text-xl text-gray-950 mb-6 flex items-center gap-3">
                  <div className="bg-gray-100 text-gray-700 w-9 h-9 rounded-xl flex items-center justify-center">
                    <ListChecks className="w-4 h-4" />
                  </div>
                  Persyaratan KPR
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {kprRequirements.map((item) => (
                    <div
                      key={item}
                      className="flex items-start p-3 rounded-2xl hover:bg-gray-50 transition-colors"
                    >
                      <CheckCircle className="text-[#2D6A4F] mr-3 w-5 h-5 mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-700 font-bold leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:hidden mt-6 space-y-3">
              {accordionItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full p-4 flex justify-between items-center font-black text-sm text-[#1B4D3E]"
                  >
                    {item.title}
                    {openAccordion === item.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {openAccordion === item.id && (
                    <div className="px-4 pb-4 text-xs text-gray-600 leading-relaxed">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0F2922] text-white py-14 md:py-16 border-t-4 border-[#2D6A4F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-center md:text-left">
              <div className="inline-block mb-5">
                <ImageWithFallback
                  src={footerLogoImg}
                  fallback={logoImg}
                  alt="Pesona Bunga Cibatok"
                  className="h-24 md:h-32 lg:h-36 w-auto object-contain"
                />
              </div>

              <p className="text-[#E9EFEA] text-sm max-w-sm mx-auto md:mx-0 leading-relaxed">
                Perumahan subsidi dengan view pegunungan sejuk dan asri di
                Cibatok, Bogor.
              </p>
            </div>

            <div className="text-center md:text-right">
              <p className="font-medium text-[#E9EFEA] text-sm mb-1">
                Developed by
              </p>

              <p className="font-black text-xl mb-6 text-white tracking-wide flex justify-center md:justify-end items-center gap-2">
                <Building className="text-[#2D6A4F] w-5 h-5" />
                PT. IRGIE SELARAS PERSADA
              </p>

              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-white text-[#0F2922] px-6 py-3 rounded-full font-black text-sm hover:bg-gray-100 transition-colors shadow-lg"
              >
                <WhatsAppIcon className="text-[#25D366] w-6 h-6" />
                Hubungi Marketing
              </a>
            </div>
          </div>

          <div className="border-t border-[#1B4D3E] mt-10 pt-7 text-center text-[#E9EFEA]/60 text-xs font-medium leading-relaxed">
            &copy; {new Date().getFullYear()} PT. Irgie Selaras Persada. All
            rights reserved.
            <br />
            <span className="italic mt-2 inline-block">
              *Syarat & ketentuan berlaku. Informasi ini bukan merupakan
              penawaran mengikat.
            </span>
          </div>
        </div>
      </footer>

      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="wa-float hidden md:flex fixed bottom-8 right-8 z-40 bg-[#25D366] text-white w-16 h-16 rounded-full items-center justify-center shadow-[0_8px_20px_rgba(37,211,102,0.4)] hover:bg-[#1ebd5c] transition-colors"
        aria-label="Hubungi via WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8" />
      </a>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-gray-100 p-3">
        <div className="max-w-md mx-auto grid grid-cols-[52px_1fr] gap-2">
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="wa-float bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-lg"
            aria-label="Hubungi via WhatsApp"
          >
            <WhatsAppIcon className="w-6 h-6" />
          </a>

          <a
            href={waLinkPromo}
            target="_blank"
            rel="noreferrer"
            className="bg-[#1B4D3E] text-white py-3 rounded-2xl font-black text-sm text-center shadow-lg"
          >
            Klaim Promo Booking 500rb
          </a>
        </div>
      </div>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition"
            aria-label="Tutup gambar"
          >
            <X className="w-5 h-5" />
          </button>

          <ImageWithFallback
            src={lightboxImage.src}
            fallback={lightboxImage.fallback}
            alt={lightboxImage.alt}
            className="max-w-[95vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}

      <div
        className={`fixed inset-0 z-[60] flex items-center justify-center p-3 md:p-4 bg-[#0F2922]/80 backdrop-blur-sm transition-opacity duration-300 ${
          isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsModalOpen(false)}
      >
        <div
          className={`relative w-full max-w-[92vw] md:max-w-[760px] transform transition-transform duration-300 ${
            isModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-3 right-3 md:top-4 md:right-4 z-20 text-white bg-black/45 hover:bg-black/65 rounded-full w-10 h-10 md:w-11 md:h-11 flex items-center justify-center transition shadow-lg"
            aria-label="Tutup promo"
          >
            <X className="w-5 h-5" />
          </button>

          <a
            href={waLinkPromo}
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsModalOpen(false)}
            className="block"
          >
            <ImageWithFallback
              src={promoPosterDesktopImg}
              fallback={promoPosterDesktopImg}
              alt="Promo Rumah Subsidi Desktop"
              className="hidden md:block w-full h-auto rounded-[2rem] shadow-2xl cursor-pointer"
            />

            <ImageWithFallback
              src={promoPosterMobileImg}
              fallback={promoPosterMobileImg}
              alt="Promo Rumah Subsidi Mobile"
              className="md:hidden w-full h-auto max-h-[88vh] object-contain rounded-[1.5rem] shadow-2xl cursor-pointer"
            />
          </a>
        </div>
      </div>
    </div>
  );
}