
export interface Product {
  id: string;
  name: string;
  category: 'Grains' | 'Tubers' | 'Vegetables' | 'Fruits' | 'Spices' | 'Others';
  basePrice: number;
  unit: string;
  image: string;
  packageOptions?: { label: string; multiplier: number }[];
}

export interface Market {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  image: string;
  description: string;
}

export interface MarketPriceRecord {
  productId: string;
  marketId: string;
  currentPrice: number;
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

export interface AIInsight {
  marketCondition: string;
  tradingTips: string[];
  outlook: 'bullish' | 'bearish' | 'neutral';
}

export interface CartItem {
  id: string;
  product: Product;
  marketId: string;
  marketName: string;
  packageLabel: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
