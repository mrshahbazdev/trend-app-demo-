import { useState } from 'react';
import { Search, Bell, ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react';
import NewLogo from '../components/NewLogo';
import BottomNav from '../components/BottomNav';
import { markets } from '../data/mockData';

export default function MarketsPage() {
  const [activeTab, setActiveTab] = useState('Watchlist');

  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans pb-[88px] antialiased">
      <header className="sticky top-0 left-0 w-full z-50 bg-[#040508]/95 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between border-b border-[#121419]">
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-[38px] h-[38px]" />
          <h1 className="text-[23px] font-bold tracking-tight text-[#FFFFFF]">Markets</h1>
        </div>
        <div className="flex items-center gap-3.5">
          <Search className="w-[24px] h-[24px] text-[#F3F4F6]" strokeWidth={2.5} />
          <Bell className="w-[24px] h-[24px] text-[#F3F4F6]" strokeWidth={2.5} />
        </div>
      </header>

      <div className="p-4">
        <div className="bg-[#0A0D12] border border-[#1C1E23] rounded-[16px] p-5 shadow-lg">
          <p className="text-[#A0A2A8] text-[12px] font-bold uppercase tracking-widest mb-1.5">Global Sentiment</p>
          <div className="flex items-end gap-3">
            <h2 className="text-[32px] font-extrabold text-white tracking-tight">Bullish</h2>
            <span className="text-[#2ECC71] text-[16px] font-extrabold pb-1.5">+1.4%</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 px-5 pt-1 pb-0 border-b border-[#1A1C22]">
        {['Watchlist', 'Crypto', 'Stocks', 'Forex'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[15.5px] font-bold pb-2.5 ${activeTab === tab ? 'text-[#FFFFFF] border-b-[3px] border-[#2ECC71]' : 'text-[#A0A2A8] hover:text-white transition-colors'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-4 py-4 flex flex-col gap-3">
        {markets.map(m => (
          <div key={m.ticker} className="flex items-center justify-between bg-[#0A0D12] p-4 rounded-[14px] border border-[#1C1E23] hover:border-[#2A2D35] transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-[40px] h-[40px] rounded-[10px] bg-[#121419] border border-[#1C1E23] flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[#A0A2A8]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[15px] text-[#F3F4F6]">{m.name}</span>
                <span className="text-[#8B8D93] text-[12px] font-semibold">{m.ticker}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-bold text-[15px] text-[#F3F4F6]">{m.price}</span>
              <div className={`flex items-center gap-0.5 text-[12.5px] font-bold ${m.trend === 'up' ? 'text-[#2ECC71]' : 'text-[#FF3B30]'}`}>
                {m.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {m.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
