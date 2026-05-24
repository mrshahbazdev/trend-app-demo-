import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react';
import NewLogo from '../components/NewLogo';
import BottomNav from '../components/BottomNav';
import { useTheme } from '../context/ThemeContext';

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
  const { t } = useTheme();
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
    <div className="min-h-screen font-sans pb-[88px] antialiased" style={{ backgroundColor: t.bg, color: t.text }}>
      <header className="sticky top-0 left-0 w-full z-50 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between" style={{ backgroundColor: t.backdrop, borderBottom: `1px solid ${t.border}` }}>
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-[38px] h-[38px]" />
          <h1 className="text-[23px] font-bold tracking-tight" style={{ color: t.text }}>Markets</h1>
        </div>
        <div className="flex items-center gap-3.5">
          <button onClick={() => navigate('/search')}><Search className="w-[24px] h-[24px]" strokeWidth={2.5} style={{ color: t.textSec }} /></button>
          <button onClick={() => navigate('/notifications')} className="relative"><Bell className="w-[24px] h-[24px]" strokeWidth={2.5} style={{ color: t.textSec }} /><span className="absolute top-[-2px] right-[-2px] w-[9px] h-[9px] rounded-full" style={{ backgroundColor: t.red, border: `2px solid ${t.bg}` }}></span></button>
        </div>
      </header>

      <div className="p-4">
        <div className="rounded-[16px] p-5 shadow-lg" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <p className="text-[12px] font-bold uppercase tracking-widest mb-1.5" style={{ color: t.textSubtle }}>{sentiment.label}</p>
          <div className="flex items-end gap-3">
            <h2 className="text-[32px] font-extrabold tracking-tight" style={{ color: t.text }}>{sentiment.value}</h2>
            <span className={`text-[16px] font-extrabold pb-1.5`} style={{ color: sentiment.change.startsWith('+') ? t.green : t.red }}>{sentiment.change}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 px-5 pt-1 pb-0" style={{ borderBottom: `1px solid ${t.border}` }}>
        {['Watchlist', 'Crypto', 'Stocks', 'Forex'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="text-[15.5px] font-bold pb-2.5 transition-colors"
            style={{ color: activeTab === tab ? t.text : t.textSubtle, borderBottom: activeTab === tab ? `3px solid ${t.green}` : 'none' }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 pb-2">
        <button
          onClick={() => navigate('/vote-market')}
          className="w-full rounded-[14px] p-4 flex items-center justify-between transition-colors"
          style={{ background: `linear-gradient(to right, ${t.orange}20, ${t.gold}20)`, border: `1px solid ${t.orange}30` }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${t.orange}20` }}>
              <span className="text-[20px]">🗳️</span>
            </div>
            <div className="text-left">
              <p className="text-[15px] font-bold" style={{ color: t.gold }}>Vote Market</p>
              <p className="text-[12px]" style={{ color: t.textMuted }}>Predict outcomes & earn rewards</p>
            </div>
          </div>
          <span className="text-[13px] font-bold" style={{ color: t.orange }}>Vote Now →</span>
        </button>
      </div>

      <div className="px-4 py-2 flex flex-col gap-3">
        {filteredMarkets.map(m => (
          <div
            key={m.ticker}
            onClick={() => navigate(`/market-detail?ticker=${m.ticker}`)}
            className="flex items-center justify-between p-4 rounded-[14px] transition-colors cursor-pointer active:scale-[0.98]"
            style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center" style={{ backgroundColor: t.bgTer, border: `1px solid ${t.border2}` }}>
                <BarChart3 className="w-5 h-5" strokeWidth={1.5} style={{ color: t.textSubtle }} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[15px]" style={{ color: t.textSec }}>{m.name}</span>
                <span className="text-[12px] font-semibold" style={{ color: t.textMuted }}>{m.ticker}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-bold text-[15px]" style={{ color: t.textSec }}>{m.price}</span>
              <div className="flex items-center gap-0.5 text-[12.5px] font-bold" style={{ color: m.trend === 'up' ? t.green : t.red }}>
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
