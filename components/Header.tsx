
import React from 'react';
import { Sprout, Search, Bell, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartItemCount: number;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, cartItemCount, onOpenCart }) => {
  return (
    <header className="sticky top-0 z-50 bg-emerald-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <Sprout className="h-8 w-8 text-emerald-400" />
            <span className="text-xl font-bold tracking-tight">KaduAgro</span>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden sm:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-emerald-200" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg leading-5 bg-emerald-700/50 text-emerald-50 placeholder-emerald-200 focus:outline-none focus:bg-emerald-700 focus:ring-2 focus:ring-emerald-400 transition sm:text-sm"
                placeholder="Search crops in Kaduna..."
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenCart}
              className="relative p-2 rounded-full hover:bg-emerald-700 transition"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button className="p-2 rounded-full hover:bg-emerald-700 transition hidden sm:block">
              <Bell className="h-6 w-6" />
            </button>
            <div className="hidden md:block text-right">
              <p className="text-xs text-emerald-300">Market Status</p>
              <p className="text-sm font-medium">Markets Open</p>
            </div>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="pb-3 sm:hidden">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-emerald-200" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg leading-5 bg-emerald-700/50 text-emerald-50 placeholder-emerald-200 focus:outline-none focus:bg-emerald-700 focus:ring-2 focus:ring-emerald-400 transition sm:text-sm"
              placeholder="Search crops..."
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
