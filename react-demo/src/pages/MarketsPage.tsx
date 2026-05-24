import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react';
import NewLogo from '../components/NewLogo';
import BottomNav from '../components/BottomNav';

const allMarkets = [
  { name: "S&P 500", ticker: "SPX", price: "5,234.12", change: "+0.85%", trend: "up" as const, category: "stocks" },
  { name: "Nasdaq", ticker: "NDX", price: "18,122.45", change: "+1.24%", trend: "up" as const, category: "stocks" },
  { name: "Bitcoin", ticker: "BTC", price: "64,230.00", change: "-0.45%", trend: "down" as const, category: "crypto" },
  { name: "Ethereum", ticker: "ETH", price: "3,456.78", change: "+2.10%", trend: "up" as const, category: "crypto" },
  { name: "Solana", ticker: "SOL", price: "178.45", change: "+5.67%", trend: "up" as const, category: "crypto" },
  { name: "Gold", ticker: "XAU", price: "2,345.10", change: "+0.12%", trend: "up" as const, category: "forex" },
  { name: "Apple", ticker: "AAPL", price: "172.30", change: "-0.67%", trend: "down" as const, category: "stocks" },
  { name: "NVIDIA", ticker: "NVDA", price: "895.40", change: "+2.15%", trend: "up" as const, category: "stocks" },
  { name: "EUR/USD", ticker: "EURUSD", price: "1.0892", change: "+0.34%", trend: "up" as const, category: "forex" },
  { name: "GBP/USD", ticker: "GBPUSD", price: "1.2734", change: "-0.12%", trend: "down" as const, category: "forex" },
  { name: "XRP", ticker: "XRP", price: "0.5423", change: "+3.45%", trend: "up" as const, category: "crypto" },
  { name: "Tesla", ticker: "TSLA", price: "178.90", change: "-1.23%", trend: "down" as const, category: "stocks" },
];

const watchlist = ['SPX', 'BTC', 'XAU', 'AAPL', 'NVDA', 'ETH'];

export default function MarketsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Watchlist');

  const filteredMarkets = activeTab === 'Watchlist'
    ? allMarkets.filter(m => watchlist.includes(m.ticker))
    : activeTab === 'Crypto'
    ? allMarkets.filter(m => m.category === 'crypto')
    : activeTab === 'Stocks'
    ? allMarkets.filter(m => m.category === 'stocks')
    : allMarkets.filter(m => m.category === 'forex');

  const sentiment = activeTab === 'Crypto' ? { label: 'Fear & Greed', value: 'Greed', change: '+8.2%' }
    : activeTab === 'Forex' ? { label: 'DXY Index', value: '104.32', change: '-0.45%' }
    : { label: 'Global Sentiment', value: 'Bullish', change: '+1.4%' };

  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans pb-[88px] antialiased">
      <header className="sticky top-0 left-0 w-full z-50 bg-[#040508]/95 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between border-b border-[#121419]">
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-[38px] h-[38px]" />
          <h1 className="text-[23px] font-bold tracking-tight text-[#FFFFFF]">Markets</h1>
        </div>
        <div className="flex items-center gap-3.5">
          <button onClick={() => navigate('/search')}><Search className="w-[24px] h-[24px] text-[#F3F4F6]" strokeWidth={2.5} /></button>
          <button onClick={() => navigate('/notifications')} className="relative"><Bell className="w-[24px] h-[24px] text-[#F3F4F6]" strokeWidth={2.5} /><span className="absolute top-[-2px] right-[-2px] w-[9px] h-[9px] bg-[#FF3B30] rounded-full border-[2px] border-[#040508]"></span></button>
        </div>
      </header>

      <div className="p-4">
        <div className="bg-[#0A0D12] border border-[#1C1E23] rounded-[16px] p-5 shadow-lg">
          <p className="text-[#A0A2A8] text-[12px] font-bold uppercase tracking-widest mb-1.5">{sentiment.label}</p>
          <div className="flex items-end gap-3">
            <h2 className="text-[32px] font-extrabold text-white tracking-tight">{sentiment.value}</h2>
            <span className={`text-[16px] font-extrabold pb-1.5 ${sentiment.change.startsWith('+') ? 'text-[#2ECC71]' : 'text-[#FF3B30]'}`}>{sentiment.change}</span>
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

      {/* Vote Market Banner */}
      <div className="px-4 pt-4 pb-2">
        <button
          onClick={() => navigate('/vote-market')}
          className="w-full bg-gradient-to-r from-[#FF7A00]/20 to-[#F1D683]/20 border border-[#FF7A00]/30 rounded-[14px] p-4 flex items-center justify-between hover:border-[#FF7A00]/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FF7A00]/20 flex items-center justify-center">
              <span className="text-[20px]">🗳️</span>
            </div>
            <div className="text-left">
              <p className="text-[#F1D683] text-[15px] font-bold">Vote Market</p>
              <p className="text-[#8B8D93] text-[12px]">Predict outcomes & earn rewards</p>
            </div>
          </div>
          <span className="text-[#FF7A00] text-[13px] font-bold">Vote Now →</span>
        </button>
      </div>

      <div className="px-4 py-2 flex flex-col gap-3">
        {filteredMarkets.map(m => (
          <div
            key={m.ticker}
            onClick={() => navigate(`/market-detail?ticker=${m.ticker}`)}
            className="flex items-center justify-between bg-[#0A0D12] p-4 rounded-[14px] border border-[#1C1E23] hover:border-[#2A2D35] transition-colors cursor-pointer active:scale-[0.98]"
          >
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
