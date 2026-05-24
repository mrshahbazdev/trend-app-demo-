import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Maximize, Volume2, Flame, Star, ThumbsUp, Smile, Send, Eye, MoreHorizontal, HelpCircle, Sparkles, Gift, DollarSign, Headphones } from 'lucide-react';
import NewLogo from '../components/NewLogo';
import VerifiedBadge from '../components/VerifiedBadge';
import BottomNav from '../components/BottomNav';
import { useTheme } from '../context/ThemeContext';

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

const giftItems = [
  { emoji: "🌟", name: "Star", coins: 10 },
  { emoji: "💎", name: "Diamond", coins: 50 },
  { emoji: "🏆", name: "Trophy", coins: 100 },
  { emoji: "🚀", name: "Rocket", coins: 200 },
  { emoji: "👑", name: "Crown", coins: 500 },
  { emoji: "🔥", name: "Fire", coins: 20 },
];

export default function LiveStreamPage() {
  const navigate = useNavigate();
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState('Live Chat');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>(initialChat);
  const [likedMsgs, setLikedMsgs] = useState<Set<number>>(new Set());
  const [firedMsgs, setFiredMsgs] = useState<Set<number>>(new Set());
  const [qaUpvoted, setQaUpvoted] = useState<Set<number>>(new Set());
  const [reactions, setReactions] = useState(reactionEmojis);
  const [muted, setMuted] = useState(false);
  const [showGifting, setShowGifting] = useState(false);
  const [giftSent, setGiftSent] = useState('');

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
    setLikedMsgs(prev => { const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next; });
  };
  const toggleFire = (i: number) => {
    setFiredMsgs(prev => { const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next; });
  };
  const toggleQaUpvote = (i: number) => {
    setQaUpvoted(prev => { const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next; });
  };
  const addReaction = (idx: number) => {
    setReactions(prev => prev.map((r, i) => i === idx ? { ...r, count: r.count + 1 } : r));
  };
  const sendGift = (gift: typeof giftItems[0]) => {
    setGiftSent(`${gift.emoji} ${gift.name} sent!`);
    setShowGifting(false);
    setTimeout(() => setGiftSent(''), 2000);
  };

  const tabs = ['Live Chat', 'Q&A', 'Highlights', 'Reactions'];

  return (
    <div className="min-h-screen font-sans relative pb-[88px] antialiased flex flex-col" style={{ backgroundColor: t.bg, color: t.text }}>
      {/* Header */}
      <header className="sticky top-0 left-0 w-full z-50 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between" style={{ backgroundColor: t.backdrop, borderBottom: `1px solid ${t.border}` }}>
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-[38px] h-[38px]" />
          <h1 className="text-[23px] font-bold tracking-tight" style={{ color: t.text }}>TrendUpLive</h1>
        </div>
        <div className="flex items-center gap-3.5">
          <button onClick={() => navigate('/search')}><Search className="w-[24px] h-[24px]" strokeWidth={2.5} style={{ color: t.textSec }} /></button>
          <button onClick={() => navigate('/notifications')} className="relative"><Bell className="w-[24px] h-[24px]" strokeWidth={2.5} style={{ color: t.textSec }} /><span className="absolute top-[-2px] right-[-2px] w-[9px] h-[9px] rounded-full" style={{ backgroundColor: t.red, border: `2px solid ${t.bg}` }}></span></button>
        </div>
      </header>

      {/* Video Section - Compact */}
      <div className="relative w-full" style={{ height: '200px' }}>
        <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1000&auto=format&fit=crop" alt="Live Stream" className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <div className="bg-[#E63946] text-white text-[11px] font-bold px-2 py-0.5 rounded-[5px] flex items-center gap-1 shadow-md">
            <div className="w-[5px] h-[5px] bg-white rounded-full animate-pulse"></div>LIVE
          </div>
          <div className="bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-0.5 rounded-[5px] flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />1.2K
          </div>
        </div>
        <div className="absolute top-2 right-2 flex items-center gap-1.5">
          <button onClick={() => setMuted(!muted)} className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <Volume2 className={`w-4 h-4 ${muted ? 'text-[#FF3B30]' : 'text-white'}`} />
          </button>
          <button className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <Maximize className="w-4 h-4 text-white" />
          </button>
        </div>
        {/* Gifting button on right */}
        <button
          onClick={() => setShowGifting(true)}
          className="absolute bottom-2 right-2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: '#FFB300', border: '2px solid rgba(255,255,255,0.3)' }}
        >
          <Gift className="w-5 h-5 text-white" />
        </button>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent pt-10 pb-2 px-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" className="w-[30px] h-[30px] rounded-full object-cover border border-white/20" alt="Jason" />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[13px] text-white">Jason Lin</span>
                  <VerifiedBadge className="w-3.5 h-3.5 text-[#2ECC71]" />
                </div>
                <span className="text-white/60 text-[11px]">Morning Market Briefing</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[#2ECC71] text-[11px] font-bold">
              <div className="w-[6px] h-[6px] bg-[#2ECC71] rounded-full animate-pulse"></div>LIVE
            </div>
          </div>
        </div>
      </div>

      {/* Tabs - properly spaced */}
      <div className="flex items-center px-2 pt-2" style={{ borderBottom: `1px solid ${t.border}` }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 text-center text-[13px] pb-2 flex items-center justify-center gap-1"
            style={{
              fontWeight: activeTab === tab ? 700 : 600,
              color: activeTab === tab ? t.text : t.textMuted,
              borderBottom: activeTab === tab ? `3px solid ${t.green}` : '3px solid transparent',
            }}
          >
            {tab}
            {tab === 'Q&A' && <span className="text-[10px] font-bold px-1 py-0.5 rounded" style={{ backgroundColor: t.bgTer, color: t.textMuted }}>{qaList.length}</span>}
            {tab === 'Reactions' && <Flame className="w-3 h-3" style={{ color: '#FF9800', fill: '#FF9800' }} />}
          </button>
        ))}
      </div>

      {/* Tab Content - Scrollable area */}
      <div className="flex-1 overflow-y-auto" style={{ maxHeight: activeTab === 'Live Chat' ? 'calc(100vh - 200px - 56px - 44px - 88px - 56px)' : 'calc(100vh - 200px - 56px - 44px - 88px)' }}>
        {activeTab === 'Live Chat' && (
          <div className="p-3 flex flex-col gap-3">
            {/* Pinned message */}
            <div className="rounded-[12px] p-3 relative" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
              <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide mb-2" style={{ color: t.textMuted }}>
                <Star className="w-3.5 h-3.5" style={{ fill: t.textMuted }} />Pinned by Host
              </div>
              <div className="flex justify-between items-start mb-1.5">
                <div className="flex gap-2">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" className="w-[28px] h-[28px] rounded-full object-cover" alt="Jason" />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[13px]" style={{ color: t.text }}>Jason Lin</span>
                      <VerifiedBadge className="w-3.5 h-3.5" style={{ color: t.green }} />
                      <span className="text-[11px] font-medium ml-0.5" style={{ color: t.textMuted }}>Host</span>
                    </div>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4" style={{ color: t.textMuted }} />
              </div>
              <p className="text-[13px] leading-[1.4] font-medium" style={{ color: t.textSec }}>
                Good morning! Markets reacting to inflation data and rate cut expectations. What are you watching today?
              </p>
            </div>

            {/* Chat messages */}
            {chatMessages.map((msg, i) => (
              <div key={i} className="flex gap-2.5 pl-1">
                <div className="relative shrink-0">
                  <img src={msg.avatar} className="w-[30px] h-[30px] rounded-full object-cover" alt={msg.user} />
                  {msg.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.green, border: `2px solid ${t.bg}` }}></div>}
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-baseline gap-1.5 mb-0.5">
                    <span className="font-bold text-[13px]" style={{ color: t.text }}>{msg.user}</span>
                    <span className="text-[11px]" style={{ color: t.textDim }}>{msg.time}</span>
                  </div>
                  <p className="text-[13px] leading-snug mb-1.5" style={{ color: t.textSec }}>{msg.text}</p>
                  <div className="flex gap-1.5">
                    <button onClick={() => toggleLike(i)} className="rounded-full px-2 py-0.5 flex items-center gap-1" style={{ backgroundColor: t.bgTer, border: `1px solid ${likedMsgs.has(i) ? t.green : t.border2}` }}>
                      <ThumbsUp className="w-3 h-3" style={{ color: likedMsgs.has(i) ? t.green : t.textMuted, fill: likedMsgs.has(i) ? t.green : 'none' }} />
                      <span className="text-[11px] font-bold" style={{ color: t.textSec }}>{msg.likes + (likedMsgs.has(i) ? 1 : 0)}</span>
                    </button>
                    <button onClick={() => toggleFire(i)} className="rounded-full px-2 py-0.5 flex items-center gap-1" style={{ backgroundColor: t.bgTer, border: `1px solid ${firedMsgs.has(i) ? '#FF9800' : t.border2}` }}>
                      <Flame className="w-3 h-3" style={{ color: firedMsgs.has(i) ? '#FF9800' : t.textMuted, fill: firedMsgs.has(i) ? '#FF9800' : 'none' }} />
                      <span className="text-[11px] font-bold" style={{ color: t.textSec }}>{msg.fires + (firedMsgs.has(i) ? 1 : 0)}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Q&A' && (
          <div className="p-3 flex flex-col gap-2.5">
            {qaList.map((qa, i) => (
              <div key={i} className="rounded-[12px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
                <div className="flex gap-2.5 mb-2">
                  <img src={qa.avatar} className="w-[28px] h-[28px] rounded-full object-cover" alt={qa.user} />
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-1">
                      <HelpCircle className="w-3.5 h-3.5" style={{ color: t.blue }} />
                      <span className="font-bold text-[13px]" style={{ color: t.text }}>{qa.user}</span>
                    </div>
                    <p className="text-[13px] leading-relaxed" style={{ color: t.textSec }}>{qa.question}</p>
                  </div>
                </div>
                {qa.answered && (
                  <div className="rounded-[8px] p-2.5 ml-9 mb-2" style={{ backgroundColor: t.bgTer, border: `1px solid ${t.border2}` }}>
                    <div className="flex items-center gap-1 mb-1">
                      <VerifiedBadge className="w-3.5 h-3.5" style={{ color: t.green }} />
                      <span className="text-[12px] font-bold" style={{ color: t.green }}>Jason Lin (Host)</span>
                    </div>
                    <p className="text-[12px] leading-relaxed" style={{ color: t.textSec }}>{qa.answer}</p>
                  </div>
                )}
                <div className="flex items-center justify-between ml-9">
                  <button
                    onClick={() => toggleQaUpvote(i)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors"
                    style={{
                      backgroundColor: qaUpvoted.has(i) ? `${t.green}20` : t.bgTer,
                      color: qaUpvoted.has(i) ? t.green : t.textMuted,
                      border: `1px solid ${qaUpvoted.has(i) ? `${t.green}40` : t.border2}`,
                    }}
                  >
                    <ThumbsUp className="w-3 h-3" />{qa.upvotes + (qaUpvoted.has(i) ? 1 : 0)}
                  </button>
                  {!qa.answered && <span className="text-[11px] font-bold" style={{ color: '#FF9800' }}>Awaiting answer</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Highlights' && (
          <div className="p-3 flex flex-col gap-2.5">
            {highlights.map((h, i) => (
              <div key={i} className="rounded-[12px] p-3 flex gap-3 cursor-pointer transition-colors" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
                <div className="w-[50px] h-[50px] rounded-[8px] flex items-center justify-center shrink-0" style={{ backgroundColor: t.bgTer, border: `1px solid ${t.border2}` }}>
                  <Sparkles className="w-5 h-5 text-[#F1D683]" />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${t.green}15`, color: t.green }}>{h.time}</span>
                  <h3 className="font-bold text-[14px] mt-1" style={{ color: t.text }}>{h.title}</h3>
                  <p className="text-[12px] leading-relaxed" style={{ color: t.textMuted }}>{h.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Reactions' && (
          <div className="p-3">
            <p className="text-[12px] font-medium text-center mb-3" style={{ color: t.textMuted }}>Tap to react! Your reactions are live.</p>
            <div className="grid grid-cols-4 gap-2">
              {reactions.map((r, i) => (
                <button
                  key={i}
                  onClick={() => addReaction(i)}
                  className="rounded-[12px] p-3 flex flex-col items-center gap-1.5 transition-all active:scale-95"
                  style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}
                >
                  <span className="text-[26px]">{r.emoji}</span>
                  <span className="text-[13px] font-bold" style={{ color: t.text }}>{r.count}</span>
                  <span className="text-[10px]" style={{ color: t.textMuted }}>{r.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Chat Input - fixed at bottom above nav */}
      {activeTab === 'Live Chat' && (
        <div className="fixed bottom-[88px] left-0 w-full p-2 z-40" style={{ backgroundColor: t.bg, borderTop: `1px solid ${t.border}` }}>
          <div className="flex items-center gap-2 max-w-[430px] mx-auto">
            <div className="flex-1 rounded-full flex items-center px-3 py-2 transition-colors" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendChat()}
                placeholder="Say something..."
                className="bg-transparent flex-1 outline-none text-[13px]"
                style={{ color: t.text }}
              />
              <Smile className="w-4 h-4 ml-1.5" style={{ color: t.textMuted }} />
            </div>
            <button onClick={() => setShowGifting(true)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFB300' }}>
              <Gift className="w-4 h-4 text-white" />
            </button>
            <button onClick={sendChat} className="w-9 h-9 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: t.green }}>
              <Send className="w-4 h-4" style={{ color: t.bg }} />
            </button>
          </div>
        </div>
      )}

      {/* Gift Toast */}
      {giftSent && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] text-[14px] font-bold px-5 py-2.5 rounded-full shadow-lg animate-bounce" style={{ backgroundColor: '#FFB300', color: '#040508' }}>
          {giftSent}
        </div>
      )}

      {/* Gifting Modal */}
      {showGifting && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ backgroundColor: t.overlay }}>
          <div className="rounded-t-[20px] w-full max-w-[430px] p-4" style={{ backgroundColor: t.bgSec, borderTop: `1px solid ${t.border2}` }} onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full mx-auto mb-3" style={{ backgroundColor: t.border3 }} />
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[16px] font-bold flex items-center gap-2" style={{ color: t.text }}><Gift className="w-5 h-5 text-[#FFB300]" />Send a Gift</h3>
              <button onClick={() => setShowGifting(false)} className="text-[13px] font-bold" style={{ color: t.textMuted }}>Close</button>
            </div>
            <div className="flex items-center gap-2 mb-3 px-1">
              <DollarSign className="w-4 h-4" style={{ color: t.gold }} />
              <span className="text-[13px] font-bold" style={{ color: t.gold }}>Balance: 1,250 coins</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {giftItems.map((gift, i) => (
                <button
                  key={i}
                  onClick={() => sendGift(gift)}
                  className="rounded-[12px] p-3 flex flex-col items-center gap-1 transition-all active:scale-95"
                  style={{ backgroundColor: t.bgTer, border: `1px solid ${t.border2}` }}
                >
                  <span className="text-[28px]">{gift.emoji}</span>
                  <span className="text-[12px] font-bold" style={{ color: t.text }}>{gift.name}</span>
                  <span className="text-[10px] font-medium flex items-center gap-0.5" style={{ color: t.gold }}><DollarSign className="w-3 h-3" />{gift.coins}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Live Sub-categories */}
      <div className="px-4 py-4">
        <span className="text-[15px] font-bold block mb-3" style={{ color: t.text }}>More Live</span>
        <div className="flex gap-3">
          <button onClick={() => navigate('/podcast-live')} className="flex-1 rounded-[14px] p-4 flex flex-col items-center gap-2" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
            <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center" style={{ backgroundColor: `${t.purple}20` }}>
              <Headphones className="w-6 h-6" style={{ color: t.purple }} />
            </div>
            <span className="text-[13px] font-bold" style={{ color: t.text }}>Podcast</span>
            <span className="text-[11px] text-center" style={{ color: t.textMuted }}>2-4 speakers live</span>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-semibold text-red-500">3 Live Now</span>
            </div>
          </button>
          <button onClick={() => navigate('/audio-live')} className="flex-1 rounded-[14px] p-4 flex flex-col items-center gap-2" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
            <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center" style={{ backgroundColor: `${t.green}20` }}>
              <Volume2 className="w-6 h-6" style={{ color: t.green }} />
            </div>
            <span className="text-[13px] font-bold" style={{ color: t.text }}>Audio Live</span>
            <span className="text-[11px] text-center" style={{ color: t.textMuted }}>Solo audio stream</span>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-semibold text-red-500">5 Live Now</span>
            </div>
          </button>
        </div>
      </div>

      {/* Go Live Button */}
      <div className="fixed bottom-[100px] right-4 z-30">
        <button
          onClick={() => navigate('/go-live')}
          className="w-12 h-12 rounded-full bg-[#E63946] flex items-center justify-center shadow-[0_0_15px_rgba(230,57,70,0.4)] hover:bg-[#d32836] transition-all"
        >
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-2.5 bg-white rounded-full mb-0.5 animate-pulse" />
            <span className="text-[7px] text-white font-bold">LIVE</span>
          </div>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
