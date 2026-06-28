export interface Product {
  id: string;
  name: string;
  nameEn: string;
  category: 'coffee' | 'vinyl';
  price: number;
  description: string;
  origin?: string;
  badge?: string;
  emoji: string;
}

export const products: Product[] = [
  {
    id: 'coffee-01',
    name: 'Espresso Đơn',
    nameEn: 'Single Espresso',
    category: 'coffee',
    price: 45000,
    description:
      'Chiết xuất từ hạt Arabica Cầu Đất rang medium-dark. Crema dày mịn, hậu vị đắng ngọt dịu dàng kéo dài.',
    origin: 'Đà Lạt, Việt Nam',
    badge: 'Bestseller',
    emoji: '☕',
  },
  {
    id: 'coffee-02',
    name: 'Cold Brew Fruity',
    nameEn: 'Fruity Cold Brew',
    category: 'coffee',
    price: 75000,
    description:
      'Cold brew ủ lạnh 18 giờ từ hạt Ethiopia Yirgacheffe. Hương trái cây nhiệt đới, mận chín, không đắng.',
    origin: 'Ethiopia Yirgacheffe',
    badge: 'Mới',
    emoji: '🧋',
  },
  {
    id: 'coffee-03',
    name: 'Cà Phê Sữa Đá',
    nameEn: 'Vietnamese Iced Coffee',
    category: 'coffee',
    price: 55000,
    description:
      'Robusta Buôn Ma Thuột phin truyền thống với sữa đặc Ngôi Sao. Đậm đà, ngọt ngào, không thể thiếu.',
    origin: 'Buôn Ma Thuột',
    badge: 'Truyền thống',
    emoji: '🥛',
  },
  {
    id: 'vinyl-01',
    name: 'Jazz Tối Muộn',
    nameEn: 'Late Night Jazz Vol.1',
    category: 'vinyl',
    price: 320000,
    description:
      'LP 180g. Curation bởi DJ Minhato — Miles Davis, Chet Baker, Bill Evans. Âm thanh ấm áp như ánh đèn quán khuya.',
    badge: 'Limited',
    emoji: '🎷',
  },
  {
    id: 'vinyl-02',
    name: 'Lo-fi Sài Gòn Mưa',
    nameEn: 'Saigon Rainy Lo-fi',
    category: 'vinyl',
    price: 280000,
    description:
      'EP 7-inch. Lofi hip-hop thuần Việt — mưa, tiếng xe, tiếng phin — sản xuất bởi Duy Hưng Beats.',
    badge: 'Độc quyền',
    emoji: '🌧️',
  },
  {
    id: 'vinyl-03',
    name: 'Soul & Groove Pack',
    nameEn: 'Soul & Groove Vinyl Pack',
    category: 'vinyl',
    price: 490000,
    description:
      'Bộ 3 đĩa: Soul, R&B & Funk thập niên 70s — Marvin Gaye, Curtis Mayfield, Al Green. Bộ sưu tập cần có.',
    badge: 'Pack deal',
    emoji: '🎵',
  },
];

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
