import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreHorizontal, Mic, MicOff, Hand, MessageCircle, Share2, Users, Heart, Send, X } from 'lucide-react';
import VerifiedBadge from '../components/VerifiedBadge';
import { useTheme } from '../context/ThemeContext';

interface Speaker {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  role: 'host' | 'co-host' | 'speaker' | 'listener';
  verified: boolean;
  isMuted: boolean;
  isSpeaking: boolean;
}

const speakers: Speaker[] = [
  { id: 1, name: 'Alex Morgan', handle: '@alexmorgan', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop', role: 'host', verified: true, isMuted: false, isSpeaking: true },
  { id: 2, name: 'Jason Lin', handle: '@jasonlin', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop', role: 'co-host', verified: true, isMuted: false, isSpeaking: false },
  { id: 3, name: 'Priya Patel', handle: '@priyapatel', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop', role: 'speaker', verified: false, isMuted: true, isSpeaking: false },
  { id: 4, name: 'Mike Johnson', handle: '@mikejohnson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop', role: 'speaker', verified: false, isMuted: false, isSpeaking: false },
];

const listeners = [
  { name: 'Sarah C.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop' },
  { name: 'DeFi Fan', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop' },
  { name: 'Crypto W.', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100&auto=format&fit=crop' },
  { name: 'Market Pro', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop' },
  { name: 'Trader X', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcabd9c?q=80&w=100&auto=format&fit=crop' },
  { name: 'Luna', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop' },
];

const chatMessages = [
  { user: 'Sarah C.', text: 'Great discussion! Love the analysis on BTC.', time: '1m' },
  { user: 'DeFi Fan', text: 'Can we talk about ETH staking yields?', time: '2m' },
  { user: 'Crypto W.', text: '🔥🔥🔥 This is fire!', time: '3m' },
  { user: 'Market Pro', text: 'What about the macro outlook for Q3?', time: '4m' },
  { user: 'Trader X', text: 'Agree with Jason on the support levels.', time: '5m' },
];

export default function PodcastLivePage() {
  const navigate = useNavigate();
  const { t } = useTheme();
  const [showChat, setShowChat] = useState(false);
  const [chatText, setChatText] = useState('');
  const [handRaised, setHandRaised] = useState(false);
  const [liked, setLiked] = useState(false);

  const roleLabel = (role: string) => {
    switch (role) {
      case 'host': return { text: 'Host', color: t.green };
      case 'co-host': return { text: 'Co-Host', color: t.blue };
      case 'speaker': return { text: 'Speaker', color: t.orange };
      default: return { text: 'Listener', color: t.textMuted };
    }
  };

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
              <span className="text-[13px] font-bold text-red-500">LIVE</span>
            </div>
            <span className="text-[11px]" style={{ color: t.textMuted }}>1.2K listening</span>
          </div>
        </div>
        <button><MoreHorizontal className="w-5 h-5" style={{ color: t.textMuted }} /></button>
      </header>

      {/* Podcast Info */}
      <div className="px-4 py-4" style={{ borderBottom: `1px solid ${t.border}` }}>
        <h2 className="text-[18px] font-bold" style={{ color: t.text }}>Crypto Morning Brief — Live</h2>
        <p className="text-[13px] mt-1" style={{ color: t.textMuted }}>Weekly deep dive into markets, crypto trends, and DeFi strategies with live audience Q&A.</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: `${t.green}20`, color: t.green }}>Crypto</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: `${t.blue}20`, color: t.blue }}>Markets</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: `${t.orange}20`, color: t.orange }}>DeFi</span>
        </div>
      </div>

      {/* Speakers Grid */}
      <div className="flex-1 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[14px] font-bold" style={{ color: t.text }}>Speakers</span>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" style={{ color: t.textMuted }} />
            <span className="text-[12px]" style={{ color: t.textMuted }}>{speakers.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {speakers.map(s => {
            const role = roleLabel(s.role);
            return (
              <div key={s.id} className="flex flex-col items-center p-4 rounded-[16px] relative" style={{ backgroundColor: t.bgSec, border: `1px solid ${s.isSpeaking ? t.green : t.border2}`, boxShadow: s.isSpeaking ? `0 0 20px ${t.green}15` : 'none' }}>
                {/* Speaking indicator ring */}
                <div className="relative mb-2">
                  <div className={`w-[72px] h-[72px] rounded-full p-[3px]`} style={{ border: s.isSpeaking ? `3px solid ${t.green}` : '3px solid transparent' }}>
                    <img src={s.avatar} className="w-full h-full rounded-full object-cover" alt={s.name} />
                  </div>
                  {/* Mic indicator */}
                  <div className="absolute -bottom-1 -right-1 w-[24px] h-[24px] rounded-full flex items-center justify-center" style={{ backgroundColor: s.isMuted ? t.red : t.green }}>
                    {s.isMuted ? <MicOff className="w-3 h-3 text-white" /> : <Mic className="w-3 h-3 text-white" />}
                  </div>
                  {s.isSpeaking && (
                    <div className="absolute -top-1 -left-1">
                      <div className="w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: t.green, opacity: 0.4 }} />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[13px] font-bold text-center" style={{ color: t.text }}>{s.name}</span>
                  {s.verified && <VerifiedBadge className="w-[14px] h-[14px]" style={{ color: t.green }} />}
                </div>
                <span className="text-[11px]" style={{ color: t.textMuted }}>{s.handle}</span>
                <span className="text-[10px] font-semibold mt-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: `${role.color}20`, color: role.color }}>{role.text}</span>

                {/* Audio wave visualization for speaking */}
                {s.isSpeaking && (
                  <div className="flex items-end gap-[2px] mt-2 h-[16px]">
                    {[3, 8, 5, 12, 7, 10, 4, 9, 6].map((h, i) => (
                      <div key={i} className="w-[3px] rounded-full animate-pulse" style={{ height: `${h}px`, backgroundColor: t.green, animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Listeners */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[14px] font-bold" style={{ color: t.text }}>Listeners</span>
            <span className="text-[12px]" style={{ color: t.textMuted }}>{listeners.length}+ in the room</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {listeners.map((l, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <img src={l.avatar} className="w-[40px] h-[40px] rounded-full object-cover" alt={l.name} />
                <span className="text-[10px]" style={{ color: t.textMuted }}>{l.name}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-1">
              <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center" style={{ backgroundColor: t.bgTer }}>
                <span className="text-[11px] font-bold" style={{ color: t.textMuted }}>+1.2K</span>
              </div>
              <span className="text-[10px]" style={{ color: t.textMuted }}>more</span>
            </div>
          </div>
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
            {chatMessages.map((m, i) => (
              <div key={i} className="flex gap-2 mb-3">
                <div className="flex-1">
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
          <button onClick={() => setLiked(!liked)} className="w-[40px] h-[40px] rounded-full flex items-center justify-center" style={{ backgroundColor: t.bgTer }}>
            <Heart className="w-5 h-5" style={{ color: liked ? t.red : t.textMuted, fill: liked ? t.red : 'none' }} />
          </button>
          <button onClick={() => setShowChat(true)} className="w-[40px] h-[40px] rounded-full flex items-center justify-center" style={{ backgroundColor: t.bgTer }}>
            <MessageCircle className="w-5 h-5" style={{ color: t.textMuted }} />
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
