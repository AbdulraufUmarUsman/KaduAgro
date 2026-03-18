
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MarketPriceRecord, Product } from '../types';
import { CURRENCY_SYMBOL } from './constants';

interface MarketStatsProps {
  product: Product;
  history: { date: string, price: number }[];
}

const MarketStats: React.FC<MarketStatsProps> = ({ product, history }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Price Trend: {product.name}</h3>
          <p className="text-sm text-gray-500">Last 7 days price movement in Kaduna</p>
        </div>
        <div className="p-2 bg-emerald-50 rounded-lg">
          <span className="text-xs font-bold text-emerald-700 uppercase">Analysis</span>
        </div>
      </div>
      
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 10}} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 10}}
              tickFormatter={(value) => `${CURRENCY_SYMBOL}${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: number) => [`${CURRENCY_SYMBOL}${value}`, 'Price']}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#059669" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketStats;
