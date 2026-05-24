import { useState } from 'react';
import { Search, Bell, Maximize, Volume2, Flame, Star, ThumbsUp, Plus, Smile, Send, Eye, MoreHorizontal } from 'lucide-react';
import NewLogo from '../components/NewLogo';
import VerifiedBadge from '../components/VerifiedBadge';
import BottomNav from '../components/BottomNav';

function SquarePenIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.375 2.625a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
    </svg>
  );
}

export default function LiveStreamPage() {
  const [activeTab, setActiveTab] = useState('Live Chat');
  const [chatInput, setChatInput] = useState('');

  const liveChatMessages = [
    { user: "Alex Morgan", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop", text: "Earnings from the Mag 7 will set the tone", likes: 14, fires: 6, time: "2m", online: true },
    { user: "Priya Patel", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop", text: "What about the 10-year yield? It's been climbing all week.", likes: 8, fires: 3, time: "3m", online: false },
    { user: "DeFi Whale", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop", text: "BTC dominance is at 54%. Altseason is delayed.", likes: 22, fires: 11, time: "5m", online: true },
  ];

  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans relative pb-[200px] antialiased">
      <header className="sticky top-0 left-0 w-full z-50 bg-[#040508]/95 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between border-b border-[#121419]">
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-[38px] h-[38px]" />
          <h1 className="text-[23px] font-bold tracking-tight text-[#FFFFFF]">TrendUpLive</h1>
        </div>
        <div className="flex items-center gap-3.5">
          <button className="hover:text-gray-300 transition-colors">
            <Search className="w-[24px] h-[24px] text-[#F3F4F6]" strokeWidth={2.5} />
          </button>
          <button className="relative hover:text-gray-300 transition-colors">
            <Bell className="w-[24px] h-[24px] text-[#F3F4F6]" strokeWidth={2.5} />
            <span className="absolute top-[-2px] right-[-2px] w-[10px] h-[10px] bg-[#FF3B30] rounded-full border-[2px] border-[#040508]"></span>
          </button>
          <button className="w-[36px] h-[36px] rounded-full bg-[#00D1B2] flex items-center justify-center hover:bg-[#00B59A] transition-colors shadow-[0_0_15px_rgba(0,209,178,0.3)]">
            <SquarePenIcon className="w-[18px] h-[18px] text-[#042F24]" />
          </button>
        </div>
      </header>

      <div className="relative w-full aspect-[4/3] bg-[#0A0D12]">
        <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1000&auto=format&fit=crop" alt="Live Stream" className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="bg-[#E63946] text-white text-[12px] font-bold px-2.5 py-1 rounded-[6px] flex items-center gap-1.5 shadow-md tracking-wide">
            <div className="w-[6px] h-[6px] bg-white rounded-full animate-pulse"></div>
            LIVE
          </div>
          <div className="bg-[#000000]/60 backdrop-blur-sm text-white text-[12px] font-semibold px-2.5 py-1 rounded-[6px] flex items-center gap-1.5">
            <Eye className="w-4 h-4" strokeWidth={2.5} />
            1.2K
          </div>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-[#000000]/60 backdrop-blur-sm flex items-center justify-center hover:bg-[#000000]/80 transition-colors">
            <Volume2 className="w-[18px] h-[18px] text-white" strokeWidth={2} />
          </button>
          <button className="w-9 h-9 rounded-full bg-[#000000]/60 backdrop-blur-sm flex items-center justify-center hover:bg-[#000000]/80 transition-colors">
            <Maximize className="w-[16px] h-[16px] text-white" strokeWidth={2} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#040508] via-[#040508]/90 to-transparent pt-14 pb-4 px-4">
          <h2 className="text-[28px] font-extrabold text-white leading-tight mb-1.5 tracking-tight">Morning Market<br/>Briefing</h2>
          <p className="text-[#D1D5DB] text-[15px] font-medium mb-4">Daily insights. Global impact.</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" className="w-[38px] h-[38px] rounded-full object-cover border border-[#23252A]" alt="Jason" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[15px] text-white">Jason Lin</span>
                  <VerifiedBadge className="w-4 h-4 text-[#2ECC71]" />
                </div>
                <span className="text-[#A0A2A8] text-[13px] font-medium">Tech & Markets Analyst</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[#2ECC71] text-[12px] font-bold tracking-widest mr-2">
              <div className="w-[8px] h-[8px] bg-[#2ECC71] rounded-full"></div>
              LIVE
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 pt-3 pb-0 border-b border-[#1A1C22]">
        {['Live Chat', 'Q&A', 'Highlights', 'Reactions'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[15.5px] pb-2.5 flex items-center gap-1.5 ${activeTab === tab ? 'font-bold text-[#FFFFFF] border-b-[3px] border-[#2ECC71]' : 'font-semibold text-[#A0A2A8] hover:text-white transition-colors'}`}
          >
            {tab}
            {tab === 'Q&A' && <span className="bg-[#1A1C22] text-[#E0E0E0] text-[11px] font-bold px-1.5 py-0.5 rounded">12</span>}
            {tab === 'Reactions' && (
              <>
                <Flame className="w-4 h-4 text-[#FF9800] fill-[#FF9800]" />
                <span className="text-[#E0E0E0] text-[13px] font-bold ml-0.5">312</span>
              </>
            )}
          </button>
        ))}
      </div>

      <div className="p-3 flex flex-col gap-3.5">
        <div className="bg-[#0A0D12] border border-[#1C1E23] rounded-[14px] p-3.5 relative">
          <div className="flex items-center gap-1.5 text-[#A0A2A8] text-[12px] font-bold tracking-wide mb-2.5">
            <Star className="w-4 h-4 fill-[#A0A2A8]" />
            Pinned by Host
          </div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex gap-2.5">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" className="w-[32px] h-[32px] rounded-full object-cover" alt="Jason" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[14.5px] text-[#F3F4F6]">Jason Lin</span>
                  <VerifiedBadge className="w-4 h-4 text-[#2ECC71]" />
                  <span className="text-[#A0A2A8] text-[12px] font-medium ml-0.5">Host</span>
                </div>
                <span className="text-[#8B8D93] text-[12px] font-medium mt-[-1px]">2m ago</span>
              </div>
            </div>
            <MoreHorizontal className="w-5 h-5 text-[#A0A2A8]" />
          </div>
          <p className="text-[#E5E7EB] text-[14.5px] leading-[1.45] font-medium">
            Good morning everyone! Markets are reacting to inflation data and rate cut expectations. What are you watching most closely today?
          </p>
        </div>

        {liveChatMessages.map((msg, i) => (
          <div key={i} className="flex gap-3 pl-1">
            <div className="relative shrink-0">
              <img src={msg.avatar} className="w-[34px] h-[34px] rounded-full object-cover" alt={msg.user} />
              {msg.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ECC71] border-[2px] border-[#040508] rounded-full"></div>}
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className="font-bold text-[14.5px] text-[#F3F4F6]">{msg.user}</span>
                <span className="text-[#8B8D93] text-[12px] font-medium">{msg.time}</span>
              </div>
              <p className="text-[#D1D5DB] text-[15px] leading-snug mb-2 font-medium">{msg.text}</p>
              <div className="flex gap-2">
                <div className="bg-[#121419] rounded-full px-2.5 py-1 flex items-center gap-1.5 border border-[#1A1C22]">
                  <ThumbsUp className="w-3.5 h-3.5 text-[#2ECC71] fill-[#2ECC71]" />
                  <span className="text-[12px] font-bold text-[#D1D5DB]">{msg.likes}</span>
                </div>
                <div className="bg-[#121419] rounded-full px-2.5 py-1 flex items-center gap-1.5 border border-[#1A1C22]">
                  <Flame className="w-3.5 h-3.5 text-[#FF9800] fill-[#FF9800]" />
                  <span className="text-[12px] font-bold text-[#D1D5DB]">{msg.fires}</span>
                </div>
                <div className="bg-[#121419] rounded-full w-[26px] h-[26px] flex items-center justify-center border border-[#1A1C22]">
                  <Plus className="w-4 h-4 text-[#A0A2A8]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-[88px] left-0 w-full p-3 bg-[#040508] border-t border-[#121419] z-40">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-[#121419] rounded-[24px] flex items-center px-4 py-3 border border-[#1C1E23] focus-within:border-[#2ECC71] transition-colors">
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Say something..."
              className="bg-transparent flex-1 outline-none text-[14px] placeholder:text-[#8B8D93] text-white"
            />
            <Smile className="w-5 h-5 text-[#A0A2A8] ml-2" />
          </div>
          <button className="bg-[#2ECC71] p-3 rounded-full shadow-[0_0_15px_rgba(46,204,113,0.3)]">
            <Send className="w-5 h-5 text-[#040508]" />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
