
import React, { useState } from 'react';
import { Product, MarketPriceRecord, CartItem } from '../types';
import { CURRENCY_SYMBOL, MARKETS } from './constants';
import { TrendingUp, TrendingDown, Clock, Map, Phone, ShoppingCart, X, ZoomIn, ZoomOut, ImageOff, CheckCircle2, Truck, Loader2 } from 'lucide-react';

// Haversine formula to calculate distance between two coordinates in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

interface ProductCardProps {
  product: Product;
  priceRecord: MarketPriceRecord;
  onRefresh: () => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, priceRecord, onRefresh, onAddToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  // Order Modal States
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  
  // Buyer Info States
  const [buyerName, setBuyerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  const market = MARKETS.find(m => m.id === priceRecord.marketId);
  
  const currentPackage = product.packageOptions ? product.packageOptions[selectedPackageIndex] : { label: product.unit, multiplier: 1 };
  const currentPackagePrice = priceRecord.currentPrice * currentPackage.multiplier;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG').format(price);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsZoomed(false);
    if (!isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  const handleContact = () => {
    // Open email client with the provided email address
    window.location.href = `mailto:abdulraufumarsk20@gmail.com?subject=Inquiry about ${encodeURIComponent(product.name)} at ${encodeURIComponent(market?.name || 'Kaduna Market')}`;
  };

  const handleOrderClick = () => {
    setIsOrderModalOpen(true);
    setQuantity(1);
    setSelectedPackageIndex(0);
  };

  const confirmAddToCart = () => {
    onAddToCart({
      product,
      marketId: market?.id || '',
      marketName: market?.name || 'Unknown',
      packageLabel: currentPackage.label,
      quantity,
      unitPrice: currentPackagePrice,
      totalPrice: currentPackagePrice * quantity
    });
    setIsOrderModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden border border-orange-50 hover:shadow-xl transition-all duration-300 flex flex-col group">
        <div 
          className="relative h-48 overflow-hidden cursor-zoom-in bg-gray-100 flex items-center justify-center"
          onClick={toggleModal}
        >
          {imgError ? (
            <div className="flex flex-col items-center text-gray-400">
              <ImageOff size={40} />
              <span className="text-[10px] mt-2 font-bold uppercase">Image Unavailable</span>
            </div>
          ) : (
            <img 
              src={product.image} 
              alt={product.name} 
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          )}
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
          </div>
          <div className="absolute top-3 right-3 z-10">
            <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-emerald-800 shadow-sm uppercase">
              {product.category}
            </span>
          </div>
          {priceRecord.trend !== 'stable' && (
            <div className={`absolute top-3 left-3 z-10 px-2 py-1 rounded-lg flex items-center gap-1 text-white text-xs font-bold shadow-sm ${
              priceRecord.trend === 'up' ? 'bg-red-500' : 'bg-emerald-500'
            }`}>
              {priceRecord.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {priceRecord.trend === 'up' ? '+Increase' : '-Price Drop'}
            </div>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition">{product.name}</h3>
              <p className="text-xs text-emerald-600 font-medium">{market?.name}</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-gray-900">
                {CURRENCY_SYMBOL}{formatPrice(priceRecord.currentPrice)}
              </span>
              <p className="text-[10px] text-gray-500 font-bold uppercase">Per {product.unit}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 pb-4 border-b border-gray-100">
            <Clock size={14} className="text-gray-400" />
            <span className="text-xs text-gray-500">Updated {priceRecord.lastUpdated}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-auto pt-4">
            <button 
              className="flex items-center justify-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold hover:bg-emerald-100 transition"
              onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(market?.name || 'Kaduna Market')}`, '_blank')}
            >
              <Map size={14} />
              Directions
            </button>
            <button 
              className="flex items-center justify-center gap-1 px-3 py-2 bg-orange-50 text-orange-700 rounded-lg text-xs font-bold hover:bg-orange-100 transition"
              onClick={handleContact}
            >
              <Phone size={14} />
              Contact
            </button>
            <button 
              className="col-span-2 flex items-center justify-center gap-2 px-3 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 active:scale-95 transition shadow-lg shadow-emerald-100"
              onClick={handleOrderClick}
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Order Delivery Modal */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <ShoppingCart className="text-emerald-600" size={20} />
                Add to Cart
              </h3>
              <button 
                onClick={() => setIsOrderModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <div className="flex gap-3 items-center">
                  <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                  <div>
                    <h4 className="font-bold text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-500">From {market?.name}</p>
                  </div>
                </div>

                {product.packageOptions && product.packageOptions.length > 0 && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Package Size</label>
                    <select 
                      value={selectedPackageIndex}
                      onChange={(e) => setSelectedPackageIndex(Number(e.target.value))}
                      className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    >
                      {product.packageOptions.map((pkg, idx) => (
                        <option key={idx} value={idx}>
                          {pkg.label} - {CURRENCY_SYMBOL}{formatPrice(priceRecord.currentPrice * pkg.multiplier)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Quantity</label>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold hover:bg-gray-200 transition"
                    >-</button>
                    <span className="text-lg font-black w-8 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold hover:bg-gray-200 transition"
                    >+</button>
                  </div>
                </div>

                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                  <div className="flex justify-between text-base">
                    <span className="font-bold text-emerald-900">Total</span>
                    <span className="font-black text-emerald-700">
                      {CURRENCY_SYMBOL}{formatPrice(currentPackagePrice * quantity)}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={confirmAddToCart}
                  className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold text-base hover:bg-emerald-700 active:scale-95 transition shadow-lg shadow-emerald-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={toggleModal}
        >
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={toggleZoom}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition backdrop-blur"
              title={isZoomed ? "Zoom Out" : "Zoom In"}
            >
              {isZoomed ? <ZoomOut size={24} /> : <ZoomIn size={24} />}
            </button>
            <button 
              onClick={toggleModal}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition backdrop-blur"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center pointer-events-none">
            <div 
              className={`transition-all duration-300 pointer-events-auto ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
              }`}
              onClick={toggleZoom}
            >
              {imgError ? (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 flex flex-col items-center text-white">
                  <ImageOff size={64} className="mb-4 text-emerald-400" />
                  <h2 className="text-xl font-bold">Image Unavailable</h2>
                  <p className="text-emerald-200 mt-2">Could not load the high-resolution version.</p>
                </div>
              ) : (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-h-[85vh] max-w-full rounded-lg shadow-2xl object-contain"
                />
              )}
              <div className="mt-4 text-center">
                <h2 className="text-white text-xl font-bold">{product.name}</h2>
                <p className="text-emerald-400 font-medium">{product.category} • {market?.name}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
