import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, SquarePen, ChevronLeft, ChevronRight } from 'lucide-react';
import NewLogo from '../components/NewLogo';
import BottomNav from '../components/BottomNav';
import { useTheme } from '../context/ThemeContext';

export default function VoteMarketPage() {
  const navigate = useNavigate();
  const { t } = useTheme();
  const [voteYes, setVoteYes] = useState(62);
  const [hasVoted, setHasVoted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Vote');
  const [trendingVotes, setTrendingVotes] = useState([
    { q: "Will ETH flip BTC market cap in 2024?", votes: "1.2K", yes: 28, voted: false },
    { q: "Fed rate cut before September?", votes: "3.4K", yes: 71, voted: false },
    { q: "NVDA hits $1000 before earnings?", votes: "892", yes: 55, voted: false },
  ]);

  const handleTrendingVote = (idx: number, isYes: boolean) => {
    setTrendingVotes(prev => prev.map((m, i) => i === idx && !m.voted ? { ...m, voted: true, yes: isYes ? Math.min(m.yes + 3, 100) : Math.max(m.yes - 3, 0) } : m));
  };

  const handleVote = (isYes: boolean) => {
    if (hasVoted) return;
    setHasVoted(true);
    setVoteYes(prev => isYes ? Math.min(prev + 2, 100) : Math.max(prev - 2, 0));
  };

  return (
    <div className="min-h-screen font-sans relative overflow-hidden pb-[100px]" style={{ backgroundColor: t.bg, color: t.text }}>
      <header className="flex items-center justify-between px-4 pt-4 pb-4 sticky top-0 bg-[#08090C]/95 backdrop-blur-md z-50">
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-9 h-9" />
          <h1 className="text-[22px] font-bold tracking-tight text-[#FFFFFF]">TrendUpLive</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/search')} className="w-10 h-10 rounded-full bg-[#121419] border border-[#1E2026] flex items-center justify-center hover:bg-[#1A1D24] transition-colors">
            <Search className="w-5 h-5 text-[#8B8D93]" strokeWidth={2} />
          </button>
          <button onClick={() => navigate('/notifications')} className="w-10 h-10 rounded-full bg-[#121419] border border-[#1E2026] flex items-center justify-center relative hover:bg-[#1A1D24] transition-colors">
            <Bell className="w-5 h-5 text-[#8B8D93]" strokeWidth={2} />
            <span className="absolute top-[10px] right-[10px] w-2 h-2 bg-[#FF3B30] rounded-full border border-[#121419]"></span>
          </button>
          <button onClick={() => navigate('/create-post')} className="w-10 h-10 rounded-full bg-[#00D1B2] flex items-center justify-center hover:bg-[#00B59A] transition-colors shadow-[0_0_15px_rgba(0,209,178,0.25)]">
            <SquarePen className="w-5 h-5 text-[#042F24]" strokeWidth={2.5} />
          </button>
        </div>
      </header>

      <div className="flex items-center justify-between px-8 py-3 border-b border-[#1A1D24]">
        <button onClick={() => navigate('/home')} className="text-[17px] font-semibold text-[#7E8596] hover:text-[#A0A2A8] transition-colors">Today</button>
        <button onClick={() => navigate('/home')} className="text-[17px] font-semibold text-[#7E8596] hover:text-[#A0A2A8] transition-colors">News</button>
        <button className="text-[17px] font-bold text-[#F1D683] border-b-[2.5px] border-[#F1D683] pb-1">Market trend</button>
      </div>

      <div className="flex items-center gap-2.5 px-4 py-4 overflow-x-auto">
        {['Crypto', 'Vote', 'Categories', 'Chains'].map(pill => (
          <button
            key={pill}
            onClick={() => setActiveFilter(pill)}
            className={`px-[18px] py-[6px] rounded-full text-[14px] font-medium whitespace-nowrap transition-colors ${
              activeFilter === pill
                ? 'bg-[#0A1F16] border border-[#1C5A3E] text-[#2ECC71] shadow-[0_0_10px_rgba(46,204,113,0.1)]'
                : 'bg-[#121419] border border-[#23252A] text-[#8B8D93]'
            }`}
          >
            {pill}
          </button>
        ))}
      </div>

      <div className="px-4 mt-1">
        <div className="w-full rounded-[28px] p-5 border border-[#1E2026] bg-[#111216] shadow-2xl relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[radial-gradient(circle,_rgba(255,122,0,0.25)_0%,_rgba(255,122,0,0.05)_40%,_transparent_70%)] blur-2xl pointer-events-none"></div>

          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-2 bg-[#0C0D11] border border-[#1E2026] rounded-full pl-1 pr-3 py-1">
              <div className="w-[22px] h-[22px] rounded-full bg-[#2ECC71] flex items-center justify-center">
                <span className="text-[#0A1F16] text-[11px] font-bold">$T</span>
              </div>
              <span className="text-[#F3F4F6] text-[13px] font-bold tracking-tight">$TUP TrendUp</span>
            </div>
            <div className="bg-[#0C0D11] border border-[#1E2026] rounded-full px-3 py-1.5">
              <span className="text-[#8B8D93] text-[13px] font-medium">Epoch $46</span>
            </div>
          </div>

          <div className="flex flex-col items-center mb-5 relative z-10">
            <div className="flex items-center gap-3">
              <button className="w-6 h-6 rounded-full bg-[#0C0D11] border border-[#1E2026] flex items-center justify-center">
                <ChevronLeft className="w-3.5 h-3.5 text-[#8B8D93]" />
              </button>
              <div className="bg-[#FF7A00]/15 border border-[#FF7A00]/30 px-4 py-1.5 rounded-full">
                <span className="text-[#FF7A00] text-[13px] font-bold tracking-wide">VOTING LIVE</span>
              </div>
              <button className="w-6 h-6 rounded-full bg-[#0C0D11] border border-[#1E2026] flex items-center justify-center">
                <ChevronRight className="w-3.5 h-3.5 text-[#8B8D93]" />
              </button>
            </div>
          </div>

          <div className="text-center mb-6 relative z-10">
            <h3 className="text-[22px] font-extrabold text-white leading-tight mb-2">Will BTC hit $70k<br/>before June?</h3>
            <p className="text-[#8B8D93] text-[14px] font-medium">2,847 votes · Closes in 4d 12h</p>
          </div>

          <div className="flex gap-3 mb-6 relative z-10">
            <button
              onClick={() => handleVote(true)}
              className={`flex-1 h-[52px] rounded-[14px] font-bold text-[16px] flex justify-center items-center transition-all ${
                hasVoted
                  ? 'bg-[#2ECC71]/20 border border-[#2ECC71]/40 text-[#2ECC71]'
                  : 'bg-[#2ECC71] text-[#040508] hover:bg-[#27ae60]'
              }`}
            >
              Yes ({voteYes}%)
            </button>
            <button
              onClick={() => handleVote(false)}
              className={`flex-1 h-[52px] rounded-[14px] font-bold text-[16px] flex justify-center items-center transition-all ${
                hasVoted
                  ? 'bg-[#FF3B30]/20 border border-[#FF3B30]/40 text-[#FF3B30]'
                  : 'bg-[#FF3B30] text-white hover:bg-[#e0352c]'
              }`}
            >
              No ({100 - voteYes}%)
            </button>
          </div>

          <div className="w-full h-[6px] rounded-full bg-[#1E2026] overflow-hidden relative z-10 mb-4">
            <div className="h-full bg-gradient-to-r from-[#2ECC71] to-[#27ae60] rounded-full transition-all duration-500" style={{ width: `${voteYes}%` }}></div>
          </div>

          <div className="flex justify-between text-[#8B8D93] text-[12px] font-medium relative z-10">
            <span>Pool: 45,230 $TUP</span>
            <span>Est. reward: 2.3x</span>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <h3 className="text-[12px] font-bold text-[#A0A2A8] uppercase tracking-widest mb-3">Trending Markets</h3>
        {trendingVotes.map((m, i) => (
          <div key={i} className="bg-[#111216] border border-[#1E2026] rounded-[14px] p-4 mb-3">
            <p className="text-[#F3F4F6] text-[15px] font-medium mb-2">{m.q}</p>
            <div className="w-full h-[4px] rounded-full bg-[#1E2026] overflow-hidden mb-3">
              <div className="h-full bg-gradient-to-r from-[#2ECC71] to-[#27ae60] rounded-full transition-all duration-500" style={{ width: `${m.yes}%` }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8B8D93] text-[12px]">{m.votes} votes</span>
              {m.voted ? (
                <div className="flex gap-2">
                  <span className="text-[#2ECC71] text-[13px] font-bold">Yes {m.yes}%</span>
                  <span className="text-[#FF3B30] text-[13px] font-bold">No {100 - m.yes}%</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => handleTrendingVote(i, true)} className="px-3 py-1 rounded-full bg-[#2ECC71] text-[#040508] text-[12px] font-bold">Yes</button>
                  <button onClick={() => handleTrendingVote(i, false)} className="px-3 py-1 rounded-full bg-[#FF3B30] text-white text-[12px] font-bold">No</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
