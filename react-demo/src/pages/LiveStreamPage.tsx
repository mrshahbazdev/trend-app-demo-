import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Maximize, Volume2, Flame, Star, ThumbsUp, Plus, Smile, Send, Eye, MoreHorizontal, HelpCircle, Sparkles } from 'lucide-react';
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

interface ChatMsg {
  user: string;
  avatar: string;
  text: string;
  likes: number;
  fires: number;
  time: string;
  online: boolean;
}

const initialChat: ChatMsg[] = [
  { user: "Alex Morgan", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop", text: "Earnings from the Mag 7 will set the tone", likes: 14, fires: 6, time: "2m", online: true },
  { user: "Priya Patel", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop", text: "What about the 10-year yield? It's been climbing all week.", likes: 8, fires: 3, time: "3m", online: false },
  { user: "DeFi Whale", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop", text: "BTC dominance is at 54%. Altseason is delayed.", likes: 22, fires: 11, time: "5m", online: true },
];

const qaList = [
  { user: "Alex Morgan", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop", question: "What's your take on the Fed's next move regarding interest rates?", upvotes: 42, answered: true, answer: "I think the Fed will likely hold in July but signal a September cut. The inflation data supports this path." },
  { user: "Crypto Whale", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop", question: "Is it a good time to accumulate BTC below $65K?", upvotes: 31, answered: true, answer: "Historically, buying before a halving has been profitable. Dollar-cost averaging is the safest approach here." },
  { user: "Mike Johnson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop", question: "Which sectors will benefit most from rate cuts?", upvotes: 28, answered: false, answer: "" },
  { user: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop", question: "What's the outlook for small-cap stocks in Q3?", upvotes: 15, answered: false, answer: "" },
];

const highlights = [
  { time: "0:05:23", title: "Opening Market Overview", description: "Jason breaks down the pre-market action and key levels to watch today." },
  { time: "0:12:45", title: "Fed Rate Cut Analysis", description: "Deep dive into the latest CPI data and what it means for the September FOMC meeting." },
  { time: "0:24:10", title: "BTC Technical Analysis", description: "Key support and resistance levels for Bitcoin with live chart walkthrough." },
  { time: "0:35:30", title: "NVIDIA Earnings Preview", description: "What to expect from NVDA earnings and how it could impact the broader tech sector." },
  { time: "0:45:00", title: "Viewer Q&A Session", description: "Jason answers the top-voted questions from the live audience." },
];

const reactionEmojis = [
  { emoji: "🔥", count: 312, label: "Fire" },
  { emoji: "🚀", count: 187, label: "Rocket" },
  { emoji: "💎", count: 134, label: "Diamond" },
  { emoji: "📈", count: 98, label: "Chart Up" },
  { emoji: "👏", count: 76, label: "Clap" },
  { emoji: "🐻", count: 45, label: "Bear" },
  { emoji: "🐂", count: 203, label: "Bull" },
  { emoji: "💰", count: 89, label: "Money" },
];

export default function LiveStreamPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Live Chat');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>(initialChat);
  const [likedMsgs, setLikedMsgs] = useState<Set<number>>(new Set());
  const [firedMsgs, setFiredMsgs] = useState<Set<number>>(new Set());
  const [qaUpvoted, setQaUpvoted] = useState<Set<number>>(new Set());
  const [reactions, setReactions] = useState(reactionEmojis);
  const [muted, setMuted] = useState(false);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [{
      user: "You",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
      text: chatInput,
      likes: 0,
      fires: 0,
      time: "now",
      online: true,
    }, ...prev]);
    setChatInput('');
  };

  const toggleLike = (i: number) => {
    setLikedMsgs(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const toggleFire = (i: number) => {
    setFiredMsgs(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const toggleQaUpvote = (i: number) => {
    setQaUpvoted(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const addReaction = (idx: number) => {
    setReactions(prev => prev.map((r, i) => i === idx ? { ...r, count: r.count + 1 } : r));
  };

  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans relative pb-[200px] antialiased">
      <header className="sticky top-0 left-0 w-full z-50 bg-[#040508]/95 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between border-b border-[#121419]">
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-[38px] h-[38px]" />
          <h1 className="text-[23px] font-bold tracking-tight text-[#FFFFFF]">TrendUpLive</h1>
        </div>
        <div className="flex items-center gap-3.5">
          <button onClick={() => navigate('/search')}><Search className="w-[24px] h-[24px] text-[#F3F4F6]" strokeWidth={2.5} /></button>
          <button onClick={() => navigate('/notifications')} className="relative"><Bell className="w-[24px] h-[24px] text-[#F3F4F6]" strokeWidth={2.5} /><span className="absolute top-[-2px] right-[-2px] w-[10px] h-[10px] bg-[#FF3B30] rounded-full border-[2px] border-[#040508]"></span></button>
          <button onClick={() => navigate('/create-post')} className="w-[36px] h-[36px] rounded-full bg-[#00D1B2] flex items-center justify-center hover:bg-[#00B59A] transition-colors shadow-[0_0_15px_rgba(0,209,178,0.3)]">
            <SquarePenIcon className="w-[18px] h-[18px] text-[#042F24]" />
          </button>
        </div>
      </header>

      <div className="relative w-full aspect-[4/3] bg-[#0A0D12]">
        <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1000&auto=format&fit=crop" alt="Live Stream" className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="bg-[#E63946] text-white text-[12px] font-bold px-2.5 py-1 rounded-[6px] flex items-center gap-1.5 shadow-md tracking-wide">
            <div className="w-[6px] h-[6px] bg-white rounded-full animate-pulse"></div>LIVE
          </div>
          <div className="bg-[#000000]/60 backdrop-blur-sm text-white text-[12px] font-semibold px-2.5 py-1 rounded-[6px] flex items-center gap-1.5">
            <Eye className="w-4 h-4" strokeWidth={2.5} />1.2K
          </div>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button onClick={() => setMuted(!muted)} className="w-9 h-9 rounded-full bg-[#000000]/60 backdrop-blur-sm flex items-center justify-center">
            <Volume2 className={`w-[18px] h-[18px] ${muted ? 'text-[#FF3B30]' : 'text-white'}`} strokeWidth={2} />
          </button>
          <button className="w-9 h-9 rounded-full bg-[#000000]/60 backdrop-blur-sm flex items-center justify-center">
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
              <div className="w-[8px] h-[8px] bg-[#2ECC71] rounded-full"></div>LIVE
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
            {tab === 'Q&A' && <span className="bg-[#1A1C22] text-[#E0E0E0] text-[11px] font-bold px-1.5 py-0.5 rounded">{qaList.length}</span>}
            {tab === 'Reactions' && (
              <>
                <Flame className="w-4 h-4 text-[#FF9800] fill-[#FF9800]" />
                <span className="text-[#E0E0E0] text-[13px] font-bold ml-0.5">{reactions.reduce((a, r) => a + r.count, 0)}</span>
              </>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'Live Chat' && (
        <div className="p-3 flex flex-col gap-3.5">
          <div className="bg-[#0A0D12] border border-[#1C1E23] rounded-[14px] p-3.5 relative">
            <div className="flex items-center gap-1.5 text-[#A0A2A8] text-[12px] font-bold tracking-wide mb-2.5">
              <Star className="w-4 h-4 fill-[#A0A2A8]" />Pinned by Host
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

          {chatMessages.map((msg, i) => (
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
                  <button onClick={() => toggleLike(i)} className={`bg-[#121419] rounded-full px-2.5 py-1 flex items-center gap-1.5 border ${likedMsgs.has(i) ? 'border-[#2ECC71]' : 'border-[#1A1C22]'}`}>
                    <ThumbsUp className={`w-3.5 h-3.5 ${likedMsgs.has(i) ? 'text-[#2ECC71] fill-[#2ECC71]' : 'text-[#8B8D93]'}`} />
                    <span className="text-[12px] font-bold text-[#D1D5DB]">{msg.likes + (likedMsgs.has(i) ? 1 : 0)}</span>
                  </button>
                  <button onClick={() => toggleFire(i)} className={`bg-[#121419] rounded-full px-2.5 py-1 flex items-center gap-1.5 border ${firedMsgs.has(i) ? 'border-[#FF9800]' : 'border-[#1A1C22]'}`}>
                    <Flame className={`w-3.5 h-3.5 ${firedMsgs.has(i) ? 'text-[#FF9800] fill-[#FF9800]' : 'text-[#8B8D93]'}`} />
                    <span className="text-[12px] font-bold text-[#D1D5DB]">{msg.fires + (firedMsgs.has(i) ? 1 : 0)}</span>
                  </button>
                  <div className="bg-[#121419] rounded-full w-[26px] h-[26px] flex items-center justify-center border border-[#1A1C22]">
                    <Plus className="w-4 h-4 text-[#A0A2A8]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Q&A' && (
        <div className="p-3 flex flex-col gap-3">
          {qaList.map((qa, i) => (
            <div key={i} className="bg-[#0A0D12] border border-[#1C1E23] rounded-[14px] p-4">
              <div className="flex gap-3 mb-3">
                <img src={qa.avatar} className="w-[32px] h-[32px] rounded-full object-cover" alt={qa.user} />
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <HelpCircle className="w-4 h-4 text-[#4A9EFF]" />
                    <span className="font-bold text-[14px] text-[#F3F4F6]">{qa.user}</span>
                  </div>
                  <p className="text-[#E5E7EB] text-[14.5px] leading-relaxed">{qa.question}</p>
                </div>
              </div>
              {qa.answered && (
                <div className="bg-[#0D1117] border border-[#1C1E23] rounded-[10px] p-3 ml-10 mb-3">
                  <div className="flex items-center gap-1 mb-1">
                    <VerifiedBadge className="w-4 h-4 text-[#2ECC71]" />
                    <span className="text-[13px] font-bold text-[#2ECC71]">Jason Lin (Host)</span>
                  </div>
                  <p className="text-[#D1D5DB] text-[13px] leading-relaxed">{qa.answer}</p>
                </div>
              )}
              <div className="flex items-center justify-between ml-10">
                <button
                  onClick={() => toggleQaUpvote(i)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold transition-colors ${
                    qaUpvoted.has(i) ? 'bg-[#2ECC71]/20 text-[#2ECC71] border border-[#2ECC71]/30' : 'bg-[#121419] text-[#8B8D93] border border-[#1C1E23]'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {qa.upvotes + (qaUpvoted.has(i) ? 1 : 0)}
                </button>
                {!qa.answered && <span className="text-[#FF9800] text-[12px] font-bold">Awaiting answer</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Highlights' && (
        <div className="p-3 flex flex-col gap-3">
          {highlights.map((h, i) => (
            <div key={i} className="bg-[#0A0D12] border border-[#1C1E23] rounded-[14px] p-4 flex gap-4 cursor-pointer hover:border-[#2A2D35] transition-colors">
              <div className="w-[60px] h-[60px] rounded-[10px] bg-[#121419] border border-[#1C1E23] flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-[#F1D683]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#2ECC71] text-[12px] font-bold bg-[#2ECC71]/10 px-2 py-0.5 rounded">{h.time}</span>
                </div>
                <h3 className="font-bold text-[15px] text-[#F3F4F6] mb-1">{h.title}</h3>
                <p className="text-[#8B8D93] text-[13px] leading-relaxed">{h.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Reactions' && (
        <div className="p-4">
          <p className="text-[#A0A2A8] text-[13px] font-medium text-center mb-4">Tap to react! Your reactions are live.</p>
          <div className="grid grid-cols-4 gap-3">
            {reactions.map((r, i) => (
              <button
                key={i}
                onClick={() => addReaction(i)}
                className="bg-[#0A0D12] border border-[#1C1E23] rounded-[16px] p-4 flex flex-col items-center gap-2 hover:border-[#2ECC71] transition-all active:scale-95"
              >
                <span className="text-[32px]">{r.emoji}</span>
                <span className="text-[#F3F4F6] text-[14px] font-bold">{r.count}</span>
                <span className="text-[#8B8D93] text-[11px]">{r.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Live Chat' && (
        <div className="fixed bottom-[88px] left-0 w-full p-3 bg-[#040508] border-t border-[#121419] z-40">
          <div className="flex items-center gap-3 max-w-[430px] mx-auto">
            <div className="flex-1 bg-[#121419] rounded-[24px] flex items-center px-4 py-3 border border-[#1C1E23] focus-within:border-[#2ECC71] transition-colors">
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendChat()}
                placeholder="Say something..."
                className="bg-transparent flex-1 outline-none text-[14px] placeholder:text-[#8B8D93] text-white"
              />
              <Smile className="w-5 h-5 text-[#A0A2A8] ml-2" />
            </div>
            <button onClick={sendChat} className="bg-[#2ECC71] p-3 rounded-full shadow-[0_0_15px_rgba(46,204,113,0.3)]">
              <Send className="w-5 h-5 text-[#040508]" />
            </button>
          </div>
        </div>
      )}

      {/* Go Live Button */}
      <div className="fixed bottom-[100px] right-4 z-40">
        <button
          onClick={() => navigate('/go-live')}
          className="w-14 h-14 rounded-full bg-[#E63946] flex items-center justify-center shadow-[0_0_20px_rgba(230,57,70,0.4)] hover:bg-[#d32836] transition-all"
        >
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-white rounded-full mb-0.5 animate-pulse" />
            <span className="text-[8px] text-white font-bold">LIVE</span>
          </div>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
