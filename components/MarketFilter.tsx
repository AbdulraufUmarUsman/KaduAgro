
import React from 'react';
import { MARKETS } from './constants';
import { MapPin, Filter } from 'lucide-react';

interface MarketFilterProps {
  selectedMarketId: string;
  setSelectedMarketId: (id: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const MarketFilter: React.FC<MarketFilterProps> = ({ 
  selectedMarketId, 
  setSelectedMarketId,
  selectedCategory,
  setSelectedCategory
}) => {
  const categories = ['All', 'Grains', 'Tubers', 'Vegetables', 'Fruits', 'Spices', 'Others'];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100 mb-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="h-4 w-4 text-emerald-600" />
            Select Kaduna Market
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedMarketId('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedMarketId === 'all' 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              All Markets
            </button>
            {MARKETS.map((market) => (
              <button
                key={market.id}
                onClick={() => setSelectedMarketId(market.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedMarketId === market.id 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                {market.name}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-64">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Filter className="h-4 w-4 text-emerald-600" />
            Product Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-emerald-50 border-none rounded-lg py-2 px-3 text-emerald-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MarketFilter;
