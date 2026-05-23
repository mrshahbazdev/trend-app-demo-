import React from 'react';
import { 
  Search, Bell, TrendingUp, ArrowUpRight, ArrowDownRight, 
  BarChart3, User, ChevronRight, Eye
} from 'lucide-react';

export default function App() {
  const markets = [
    { name: "S&P 500", ticker: "SPX", price: "5,234.12", change: "+0.85%", trend: "up" },
    { name: "Nasdaq", ticker: "NDX", price: "18,122.45", change: "+1.24%", trend: "up" },
    { name: "Bitcoin", ticker: "BTC", price: "64,230.00", change: "-0.45%", trend: "down" },
    { name: "Gold", ticker: "XAU", price: "2,345.10", change: "+0.12%", trend: "up" },
    { name: "Apple", ticker: "AAPL", price: "172.30", change: "-0.67%", trend: "down" },
    { name: "NVIDIA", ticker: "NVDA", price: "895.40", change: "+2.15%", trend: "up" },
  ];

  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans pb-[88px] antialiased">
      
      {/* Header (Matching Style) */}
      <header className="sticky top-0 left-0 w-full z-50 bg-[#040508]/95 backdrop-blur-md pt-12 pb-3 px-4 flex items-center justify-between border-b border-[#121419]">
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-[38px] h-[38px]" />
          <h1 className="text-[23px] font-bold tracking-tight text-[#FFFFFF]">Markets</h1>
        </div>
        <div className="flex items-center gap-3.5">
          <Search className="w-[24px] h-[24px] text-[#F3F4F6]" strokeWidth={2.5} />
          <Bell className="w-[24px] h-[24px] text-[#F3F4F6]" strokeWidth={2.5} />
        </div>
      </header>

      {/* Hero Stats */}
      <div className="p-4">
        <div className="bg-[#0A0D12] border border-[#1C1E23] rounded-[16px] p-5 shadow-lg">
          <p className="text-[#A0A2A8] text-[12px] font-bold uppercase tracking-widest mb-1.5">Global Sentiment</p>
          <div className="flex items-end gap-3">
            <h2 className="text-[32px] font-extrabold text-white tracking-tight">Bullish</h2>
            <span className="text-[#2ECC71] text-[16px] font-extrabold pb-1.5">+1.4%</span>
          </div>
        </div>
      </div>

      {/* Tabs (Matching Style) */}
      <div className="flex items-center gap-8 px-5 pt-1 pb-0 border-b border-[#1A1C22]">
        {['Watchlist', 'Crypto', 'Stocks', 'Forex'].map((tab, i) => (
          <button key={tab} className={`text-[15.5px] font-bold ${i === 0 ? 'text-[#FFFFFF] border-b-[3px] border-[#2ECC71] pb-2.5' : 'text-[#A0A2A8] pb-2.5 hover:text-white transition-colors'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Market List */}
      <div className="px-4 py-4 flex flex-col gap-3">
        {markets.map((m) => (
          <div key={m.ticker} className="flex items-center justify-between bg-[#0A0D12] p-4 rounded-[14px] border border-[#1C1E23] hover:border-[#2A2D35] transition-colors">
            <div className="flex flex-col">
              <span className="font-bold text-[15px] text-[#F3F4F6]">{m.name}</span>
              <span className="text-[#8B8D93] text-[12px] font-semibold">{m.ticker}</span>
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

      {/* Bottom Nav (Exact Match) */}
      <div className="fixed bottom-0 left-0 w-full h-[88px] bg-[#040508]/95 backdrop-blur-xl border-t border-[#121419] flex justify-between items-start px-[18px] pt-3 pb-6 z-50">
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]"><HomeNavIconOutline className="w-[24px] h-[24px] text-[#8B8D93]" /><span className="text-[11px] text-[#8B8D93] font-semibold">Home</span></button>
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]"><BarChart3 className="w-[24px] h-[24px] text-[#2ECC71]" strokeWidth={2} /><span className="text-[11px] text-[#2ECC71] font-bold">Markets</span></button>
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]"><ChatsNavIcon className="w-[24px] h-[24px] text-[#8B8D93]" /><span className="text-[11px] text-[#8B8D93] font-semibold">Chats</span></button>
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]"><LiveNavIcon className="w-[24px] h-[24px] text-[#8B8D93]" /><span className="text-[11px] text-[#8B8D93] font-semibold">Live</span></button>
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]"><User className="w-[24px] h-[24px] text-[#8B8D93]" strokeWidth={2} /><span className="text-[11px] text-[#8B8D93] font-semibold">Profile</span></button>
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full"></div>
      </div>
    </div>
  );
}

function NewLogo(props) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="outer-gradient" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB300" />
          <stop offset="25%" stopColor="#FF1744" />
          <stop offset="50%" stopColor="#D500F9" />
          <stop offset="75%" stopColor="#2979FF" />
          <stop offset="100%" stopColor="#00E5FF" />
        </linearGradient>
        <linearGradient id="inner-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#00E676" />
          <stop offset="100%" stopColor="#00B8D4" />
        </linearGradient>
      </defs>
      <path d="M 60 16 A 37 37 0 1 0 78 67" stroke="url(#outer-gradient)" strokeWidth="9" strokeLinecap="round" />
      <path d="M 37 61 A 21 21 0 0 0 73 48" stroke="url(#inner-gradient)" strokeWidth="9" strokeLinecap="round" />
      <path d="M 35 52 L 46 43 L 55 43 L 64 35 L 75 25" stroke="#FFB300" strokeWidth="3.5" />
      <circle cx="35" cy="52" r="4.5" fill="#FF4B4B" />
      <circle cx="46" cy="43" r="4.5" fill="#FFB300" />
      <circle cx="55" cy="43" r="4.5" fill="#FFD500" />
      <circle cx="64" cy="35" r="4.5" fill="#FFE600" />
      <path d="M 68 23 L 79 19 L 77 31 Z" fill="#2ECC71" stroke="#2ECC71" strokeLinejoin="round" strokeWidth="1" />
    </svg>
  );
}

function HomeNavIconOutline(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> }
function ChatsNavIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M8 12h.01M12 12h.01M16 12h.01" strokeWidth="3" /></svg> }
function LiveNavIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" /><path d="M16 8.5a5 5 0 0 1 0 7M8 8.5a5 5 0 0 0 0 7" /><path d="M19 5.5a9 9 0 0 1 0 13M5 5.5a9 9 0 0 0 0 13" /></svg> }