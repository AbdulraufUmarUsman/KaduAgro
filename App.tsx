
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import MarketFilter from './components/MarketFilter';
import ProductCard from './components/ProductCard';
import MarketStats from './components/MarketStats';
import Cart from './components/Cart';
import { MARKETS, PRODUCTS } from './components/constants';
import { MarketPriceRecord, AIInsight, CartItem } from './types';
import { getMarketInsights } from './services/geminiService';
import { RefreshCcw, Sparkles, TrendingUp, AlertCircle, Loader2, MapPin, Navigation } from 'lucide-react';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarketId, setSelectedMarketId] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRecords, setPriceRecords] = useState<MarketPriceRecord[]>([]);
  const [insights, setInsights] = useState<AIInsight | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadingInsights, setLoadingInsights] = useState(false);
  
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Generate mock prices initially
  const generatePrices = useCallback(() => {
    setIsRefreshing(true);
    const newRecords: MarketPriceRecord[] = [];
    
    PRODUCTS.forEach(product => {
      MARKETS.forEach(market => {
        // Random fluctuation around base price
        const fluctuation = (Math.random() - 0.5) * 0.2; // +/- 10%
        const currentPrice = Math.round(product.basePrice * (1 + fluctuation));
        
        const trends: ('up' | 'down' | 'stable')[] = ['up', 'down', 'stable'];
        const trend = trends[Math.floor(Math.random() * trends.length)];
        
        newRecords.push({
          productId: product.id,
          marketId: market.id,
          currentPrice,
          lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          trend
        });
      });
    });
    
    setPriceRecords(newRecords);
    setTimeout(() => setIsRefreshing(false), 800);
  }, []);

  useEffect(() => {
    generatePrices();
  }, [generatePrices]);

  // Handle AI Insights
  useEffect(() => {
    const fetchInsights = async () => {
      const marketName = selectedMarketId === 'all' 
        ? "Kaduna Major Markets" 
        : MARKETS.find(m => m.id === selectedMarketId)?.name || "Kaduna Markets";
      
      setLoadingInsights(true);
      const res = await getMarketInsights(marketName, filteredProducts.length);
      setInsights(res);
      setLoadingInsights(false);
    };

    fetchInsights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMarketId, selectedCategory]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const displayedRecords = useMemo(() => {
    return priceRecords.filter(r => {
      const isCorrectMarket = selectedMarketId === 'all' || r.marketId === selectedMarketId;
      const isCorrectProduct = filteredProducts.some(p => p.id === r.productId);
      return isCorrectMarket && isCorrectProduct;
    });
  }, [priceRecords, selectedMarketId, filteredProducts]);

  const selectedMarket = useMemo(() => {
    return MARKETS.find(m => m.id === selectedMarketId);
  }, [selectedMarketId]);

  // Mock history for a single featured product (Maize)
  const featuredHistory = [
    { date: 'Mon', price: 800 },
    { date: 'Tue', price: 820 },
    { date: 'Wed', price: 790 },
    { date: 'Thu', price: 850 },
    { date: 'Fri', price: 840 },
    { date: 'Sat', price: 860 },
    { date: 'Sun', price: 850 },
  ];

  // Cart Handlers
  const handleAddToCart = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: `${item.product.id}-${item.marketId}-${item.packageLabel}-${Date.now()}`
    };
    setCartItems(prev => [...prev, newItem]);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity, totalPrice: item.unitPrice * quantity };
      }
      return item;
    }));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen pb-12 flex flex-col">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        cartItemCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
      />
      
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onClearCart={handleClearCart}
      />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-black text-gray-900">Current Market Prices</h1>
                <p className="text-gray-500 font-medium">Real-time agricultural price tracker for Kaduna State.</p>
              </div>
              <button 
                onClick={generatePrices}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-bold hover:bg-emerald-200 transition disabled:opacity-50"
              >
                <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Updating...' : 'Refresh Prices'}
              </button>
            </div>

            <MarketFilter 
              selectedMarketId={selectedMarketId} 
              setSelectedMarketId={setSelectedMarketId}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            {selectedMarket && (
              <div className="mb-8 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row">
                <div className="md:w-1/3 h-56 md:h-auto relative">
                  <img 
                    src={selectedMarket.image} 
                    alt={selectedMarket.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 md:w-2/3 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-emerald-600 mb-2">
                    <MapPin className="h-5 w-5" />
                    <span className="font-semibold">{selectedMarket.location}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMarket.name}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{selectedMarket.description}</p>
                  
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMarket.coordinates.lat},${selectedMarket.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition shadow-sm"
                    >
                      <Navigation className="h-4 w-4" />
                      Get Directions
                    </a>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${selectedMarket.coordinates.lat},${selectedMarket.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm"
                    >
                      <MapPin className="h-4 w-4" />
                      View on Map
                    </a>
                  </div>
                </div>
              </div>
            )}

            {displayedRecords.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <AlertCircle className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium text-lg">No products found matching your filters.</p>
                <button 
                  onClick={() => { setSelectedMarketId('all'); setSelectedCategory('All'); setSearchQuery(''); }}
                  className="mt-4 text-emerald-600 font-bold underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedRecords.map((record, index) => {
                  const product = PRODUCTS.find(p => p.id === record.productId)!;
                  return (
                    <ProductCard 
                      key={`${record.marketId}-${record.productId}-${index}`} 
                      product={product} 
                      priceRecord={record}
                      onRefresh={generatePrices}
                      onAddToCart={handleAddToCart}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar Area */}
          <aside className="w-full lg:w-80 space-y-6">
            {/* AI Insights Card */}
            <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition">
                <Sparkles className="h-20 w-20" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-emerald-400/20 p-2 rounded-lg">
                    <Sparkles className="h-5 w-5 text-emerald-300" />
                  </div>
                  <h2 className="text-lg font-bold">KaduAgro AI Insight</h2>
                </div>
                
                {loadingInsights ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-400 mb-2" />
                    <p className="text-xs text-emerald-200">Analyzing market trends...</p>
                  </div>
                ) : insights ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Outlook</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        insights.outlook === 'bullish' ? 'bg-emerald-500' : 
                        insights.outlook === 'bearish' ? 'bg-red-500' : 'bg-gray-500'
                      }`}>
                        {insights.outlook}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-emerald-50">
                      {insights.marketCondition}
                    </p>
                    <div className="pt-4 space-y-2">
                      <p className="text-xs font-black uppercase text-emerald-400 tracking-widest">Trader Tips</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-emerald-100">
                        {insights.tradingTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-emerald-200">Connect to the internet for smart AI trading insights.</p>
                )}
              </div>
            </div>

            {/* Quick Stats Widget */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                Market Pulse
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Avg. Price Chg</span>
                  <span className="text-sm font-bold text-emerald-600">+2.4% Today</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Most Volatile</span>
                  <span className="text-sm font-bold text-orange-600">Onions</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Stock Availability</span>
                  <span className="text-sm font-bold text-emerald-600">High</span>
                </div>
              </div>
            </div>

            {/* Price Chart for default product */}
            <MarketStats 
              product={PRODUCTS.find(p => p.id === 'p4')!} 
              history={featuredHistory} 
            />
          </aside>
        </div>
      </main>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t sm:hidden z-50">
        <button 
          onClick={generatePrices}
          className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-200 active:scale-95 transition flex items-center justify-center gap-2"
        >
          <RefreshCcw size={18} className={isRefreshing ? 'animate-spin' : ''} />
          Refresh Local Prices
        </button>
      </div>

      <footer className="mt-12 py-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© 2024 KaduAgro • Kaduna State Ministry of Agriculture (Simulated)</p>
          <div className="flex justify-center gap-4 mt-2">
            <span className="text-[10px] font-bold text-emerald-600 cursor-pointer">Terms</span>
            <span className="text-[10px] font-bold text-emerald-600 cursor-pointer">Privacy</span>
            <span className="text-[10px] font-bold text-emerald-600 cursor-pointer">Contact Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
