import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Star, Bell, Share, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { markets } from '../data/mockData';

const timeframes = ['1H', '1D', '1W', '1M', '3M', '1Y'];

function MiniChart({ trend }: { trend: 'up' | 'down' }) {
  const color = trend === 'up' ? '#2ECC71' : '#FF3B30';
  const points = trend === 'up'
    ? 'M0,40 L15,35 L30,38 L45,25 L60,28 L75,15 L90,18 L105,10 L120,5'
    : 'M0,5 L15,10 L30,8 L45,20 L60,18 L75,30 L90,28 L105,35 L120,40';
  return (
    <svg viewBox="0 0 120 45" className="w-full h-[120px]">
      <path d={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d={`${points} L120,45 L0,45 Z`} fill={`${color}15`} />
    </svg>
  );
}

export default function MarketDetailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ticker = searchParams.get('ticker') || 'BTC';
  const [activeTimeframe, setActiveTimeframe] = useState('1D');
  const [watchlisted, setWatchlisted] = useState(false);

  const market = markets.find(m => m.ticker === ticker) || markets[0];
  const isUp = market.trend === 'up';

  const stats = [
    { label: 'Open', value: isUp ? '$63,890.00' : '$64,520.00' },
    { label: 'High', value: isUp ? '$65,100.00' : '$64,800.00' },
    { label: 'Low', value: isUp ? '$63,500.00' : '$63,200.00' },
    { label: 'Volume', value: '24.5B' },
    { label: 'Mkt Cap', value: '1.24T' },
    { label: '52W High', value: '$73,800.00' },
  ];

  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans antialiased">
      <header className="sticky top-0 w-full z-50 bg-[#040508]/95 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between border-b border-[#121419]">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6 text-[#F3F4F6]" />
          </button>
          <div>
            <h1 className="text-[18px] font-bold">{market.name}</h1>
            <span className="text-[#8B8D93] text-[13px]">{market.ticker}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setWatchlisted(!watchlisted)}>
            <Star className={`w-5 h-5 ${watchlisted ? 'fill-[#F1D683] text-[#F1D683]' : 'text-[#8B8D93]'}`} />
          </button>
          <Bell className="w-5 h-5 text-[#8B8D93]" />
          <Share className="w-5 h-5 text-[#8B8D93]" />
        </div>
      </header>

      <div className="px-4 pt-5">
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="text-[36px] font-extrabold tracking-tight">{market.price}</p>
            <div className={`flex items-center gap-1 text-[16px] font-bold ${isUp ? 'text-[#2ECC71]' : 'text-[#FF3B30]'}`}>
              {isUp ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
              {market.change}
            </div>
          </div>
        </div>

        <div className="my-4">
          <MiniChart trend={market.trend} />
        </div>

        <div className="flex gap-2 mb-6">
          {timeframes.map(tf => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={`flex-1 py-2 rounded-lg text-[13px] font-bold transition-colors ${
                activeTimeframe === tf
                  ? 'bg-[#2ECC71] text-[#040508]'
                  : 'bg-[#121419] text-[#8B8D93] border border-[#1C1E23]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map(s => (
            <div key={s.label} className="bg-[#0A0D12] border border-[#1C1E23] rounded-[12px] p-3.5">
              <p className="text-[#8B8D93] text-[12px] font-medium mb-1">{s.label}</p>
              <p className="text-[#F3F4F6] text-[15px] font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mb-6">
          <button className="flex-1 h-[50px] bg-[#2ECC71] text-[#040508] font-bold text-[16px] rounded-[14px]">Buy</button>
          <button className="flex-1 h-[50px] bg-[#FF3B30] text-white font-bold text-[16px] rounded-[14px]">Sell</button>
        </div>

        <div className="mb-6">
          <h3 className="text-[12px] font-bold text-[#A0A2A8] uppercase tracking-widest mb-3">About</h3>
          <p className="text-[#8B8D93] text-[14px] leading-relaxed">
            {market.name} ({market.ticker}) is currently trading at {market.price} with a {market.change} change. Market sentiment remains {isUp ? 'bullish with strong buying pressure' : 'cautious with some selling pressure'}.
          </p>
        </div>
      </div>
    </div>
  );
}
