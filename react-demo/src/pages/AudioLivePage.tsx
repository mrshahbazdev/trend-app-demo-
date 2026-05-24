import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreHorizontal, Mic, MicOff, Heart, MessageCircle, Share2, Hand, Send, X, Volume2 } from 'lucide-react';
import VerifiedBadge from '../components/VerifiedBadge';
import { useTheme } from '../context/ThemeContext';

interface AudioHost {
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
  isSpeaking: boolean;
}

const host: AudioHost = {
  name: 'Jason Lin',
  handle: '@jasonlin',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
  verified: true,
  isSpeaking: true,
};

const recentMessages = [
  { user: 'Alex M.', text: 'Great insights on the macro outlook!', time: '1m', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop' },
  { user: 'Priya P.', text: 'What about the EUR/USD pair?', time: '2m', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop' },
  { user: 'DeFi Whale', text: '🔥 This is fire content', time: '3m', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop' },
  { user: 'Market Pro', text: 'Can you cover gold next?', time: '4m', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop' },
  { user: 'Trader X', text: 'Absolutely agree on the support levels', time: '5m', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop' },
];

const topicTags = ['Markets', 'Trading', 'Analysis', 'Forex', 'Live Commentary'];

export default function AudioLivePage() {
  const navigate = useNavigate();
  const { t } = useTheme();
  const [showChat, setShowChat] = useState(false);
  const [chatText, setChatText] = useState('');
  const [liked, setLiked] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [muted, setMuted] = useState(true);
  const [likeCount, setLikeCount] = useState(342);

  return (
    <div className="min-h-screen font-sans antialiased flex flex-col" style={{ backgroundColor: t.bg, color: t.text }}>
      {/* Header */}
      <header className="px-4 pt-4 pb-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" style={{ color: t.text }} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[13px] font-bold text-red-500">AUDIO LIVE</span>
            </div>
            <span className="text-[11px]" style={{ color: t.textMuted }}>842 listening</span>
          </div>
        </div>
        <button><MoreHorizontal className="w-5 h-5" style={{ color: t.textMuted }} /></button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-4 pt-8">
        {/* Host Avatar with audio visualization */}
        <div className="relative mb-6">
          <div className="w-[140px] h-[140px] rounded-full p-[4px]" style={{ border: `3px solid ${t.green}`, boxShadow: `0 0 30px ${t.green}25` }}>
            <img src={host.avatar} className="w-full h-full rounded-full object-cover" alt={host.name} />
          </div>
          {/* Mic status */}
          <div className="absolute -bottom-1 right-2 w-[32px] h-[32px] rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: t.green }}>
            <Mic className="w-4 h-4 text-white" />
          </div>
          {/* Speaking pulse */}
          <div className="absolute inset-0 rounded-full animate-ping" style={{ border: `2px solid ${t.green}`, opacity: 0.2 }} />
        </div>

        {/* Host Info */}
        <div className="flex items-center gap-1.5 mb-1">
          <h2 className="text-[20px] font-bold" style={{ color: t.text }}>{host.name}</h2>
          {host.verified && <VerifiedBadge className="w-[18px] h-[18px]" style={{ color: t.green }} />}
        </div>
        <span className="text-[14px]" style={{ color: t.textMuted }}>{host.handle}</span>

        {/* Audio Wave */}
        <div className="flex items-end gap-[3px] mt-5 h-[40px]">
          {[6, 14, 10, 22, 16, 28, 12, 20, 8, 24, 14, 18, 10, 26, 8, 16, 12, 20, 6].map((h, i) => (
            <div key={i} className="w-[4px] rounded-full animate-pulse" style={{ height: `${h}px`, backgroundColor: t.green, animationDelay: `${i * 0.08}s`, opacity: 0.6 + (h / 40) }} />
          ))}
        </div>

        {/* Title */}
        <div className="mt-6 text-center px-4">
          <h3 className="text-[16px] font-bold" style={{ color: t.text }}>Live Market Commentary</h3>
          <p className="text-[13px] mt-1" style={{ color: t.textMuted }}>Real-time analysis of market movements, trade setups, and macro trends.</p>
        </div>

        {/* Topics */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {topicTags.map(tag => (
            <span key={tag} className="text-[11px] px-3 py-1 rounded-full font-medium" style={{ backgroundColor: t.bgTer, color: t.textMuted, border: `1px solid ${t.border2}` }}>{tag}</span>
          ))}
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-6 mt-6">
          <div className="flex items-center gap-1.5">
            <Volume2 className="w-4 h-4" style={{ color: t.textMuted }} />
            <span className="text-[12px] font-medium" style={{ color: t.textMuted }}>842</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4" style={{ color: t.red }} />
            <span className="text-[12px] font-medium" style={{ color: t.textMuted }}>{likeCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4" style={{ color: t.textMuted }} />
            <span className="text-[12px] font-medium" style={{ color: t.textMuted }}>128</span>
          </div>
        </div>

        {/* Recent Chat Preview */}
        <div className="w-full mt-6 rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold" style={{ color: t.text }}>Live Chat</span>
            <button onClick={() => setShowChat(true)} className="text-[11px] font-semibold" style={{ color: t.green }}>View all</button>
          </div>
          {recentMessages.slice(0, 3).map((m, i) => (
            <div key={i} className="flex items-start gap-2 py-1.5">
              <img src={m.avatar} className="w-[24px] h-[24px] rounded-full object-cover shrink-0" alt={m.user} />
              <div className="min-w-0">
                <span className="text-[11px] font-bold" style={{ color: t.text }}>{m.user}</span>
                <p className="text-[12px] truncate" style={{ color: t.textMuted }}>{m.text}</p>
              </div>
              <span className="text-[10px] shrink-0 ml-auto" style={{ color: t.textDim }}>{m.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Overlay */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: t.bg }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${t.border}` }}>
            <span className="text-[16px] font-bold" style={{ color: t.text }}>Live Chat</span>
            <button onClick={() => setShowChat(false)}><X className="w-5 h-5" style={{ color: t.textMuted }} /></button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3">
            {recentMessages.map((m, i) => (
              <div key={i} className="flex items-start gap-2 mb-3">
                <img src={m.avatar} className="w-[28px] h-[28px] rounded-full object-cover shrink-0" alt={m.user} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold" style={{ color: t.text }}>{m.user}</span>
                    <span className="text-[10px]" style={{ color: t.textMuted }}>{m.time}</span>
                  </div>
                  <p className="text-[13px] mt-0.5" style={{ color: t.textSec }}>{m.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 flex gap-2" style={{ borderTop: `1px solid ${t.border}` }}>
            <input
              value={chatText}
              onChange={e => setChatText(e.target.value)}
              placeholder="Say something..."
              className="flex-1 h-[40px] px-3 rounded-full text-[13px] outline-none"
              style={{ backgroundColor: t.bgInput, color: t.text, border: `1px solid ${t.border2}` }}
            />
            <button className="w-[40px] h-[40px] rounded-full flex items-center justify-center" style={{ backgroundColor: t.green }}>
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="px-4 py-4 flex items-center justify-between" style={{ borderTop: `1px solid ${t.border}`, backgroundColor: t.bgSec }}>
        <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-full text-[13px] font-semibold" style={{ backgroundColor: `${t.red}20`, color: t.red }}>
          Leave
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => { setLiked(!liked); setLikeCount(liked ? likeCount - 1 : likeCount + 1); }} className="w-[40px] h-[40px] rounded-full flex items-center justify-center" style={{ backgroundColor: t.bgTer }}>
            <Heart className="w-5 h-5" style={{ color: liked ? t.red : t.textMuted, fill: liked ? t.red : 'none' }} />
          </button>
          <button onClick={() => setShowChat(true)} className="w-[40px] h-[40px] rounded-full flex items-center justify-center" style={{ backgroundColor: t.bgTer }}>
            <MessageCircle className="w-5 h-5" style={{ color: t.textMuted }} />
          </button>
          <button onClick={() => setMuted(!muted)} className="w-[40px] h-[40px] rounded-full flex items-center justify-center" style={{ backgroundColor: t.bgTer }}>
            {muted ? <MicOff className="w-5 h-5" style={{ color: t.textMuted }} /> : <Mic className="w-5 h-5" style={{ color: t.green }} />}
          </button>
          <button onClick={() => setHandRaised(!handRaised)} className="w-[40px] h-[40px] rounded-full flex items-center justify-center" style={{ backgroundColor: handRaised ? `${t.orange}20` : t.bgTer }}>
            <Hand className="w-5 h-5" style={{ color: handRaised ? t.orange : t.textMuted }} />
          </button>
          <button className="w-[40px] h-[40px] rounded-full flex items-center justify-center" style={{ backgroundColor: t.bgTer }}>
            <Share2 className="w-5 h-5" style={{ color: t.textMuted }} />
          </button>
        </div>
      </div>
    </div>
  );
}
