import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SquarePen, Shield, Lock, Pin, Volume2, VolumeX, ChevronRight, CheckCheck } from 'lucide-react';
import NewLogo from '../components/NewLogo';
import BottomNav from '../components/BottomNav';
import VerifiedBadge from '../components/VerifiedBadge';
import { useTheme } from '../context/ThemeContext';

const chatItems = [
  {
    id: 1,
    name: 'Alex Morgan',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    verified: true,
    lastMsg: 'Thanks for the insights! That makes...',
    time: '9:41 AM',
    unread: 2,
    encrypted: true,
    online: false,
  },
  {
    id: 2,
    name: 'Northside Newsroom',
    avatar: '',
    avatarLetter: 'N',
    avatarColor: '#7C3AED',
    verified: true,
    muted: true,
    lastMsg: 'Sarah Chen: New parks initiative...',
    time: '9:32 AM',
    unread: 8,
    online: false,
  },
  {
    id: 3,
    name: 'Tech Talk',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop',
    verified: false,
    lastMsg: 'Jason Lin: Open-source AI models...',
    time: '9:15 AM',
    unread: 12,
    encrypted: true,
    pinned: true,
    online: false,
  },
  {
    id: 4,
    name: 'Green Future',
    avatar: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=100&auto=format&fit=crop',
    verified: true,
    lastMsg: 'You: Here\'s the report you asked for.',
    time: 'Yesterday',
    unread: 0,
    read: true,
    online: false,
  },
];

const expandedChat = {
  name: 'World Pulse',
  avatar: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=100&auto=format&fit=crop',
  verified: true,
  members: 128,
  online: 32,
};

const lastChat = {
  id: 5,
  name: 'Sarah Chen',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
  verified: true,
  lastMsg: 'Just submitted the analysis on the bridg...',
  time: 'Yesterday',
  unread: 3,
  encrypted: true,
  online: true,
};

export default function ChatsPage() {
  const navigate = useNavigate();
  const { t } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchText, setSearchText] = useState('');

  return (
    <div className="min-h-screen font-sans pb-[88px] antialiased" style={{ backgroundColor: t.bg, color: t.text }}>
      {/* Header */}
      <header className="sticky top-0 left-0 w-full z-50 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between" style={{ backgroundColor: t.backdrop, borderBottom: `1px solid ${t.border}` }}>
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-[38px] h-[38px]" />
          <h1 className="text-[23px] font-bold tracking-tight" style={{ color: t.text }}>TrendUpLive</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/search')}><Search className="w-[22px] h-[22px]" strokeWidth={2.5} style={{ color: t.textSec }} /></button>
          <button className="w-[36px] h-[36px] rounded-full flex items-center justify-center" style={{ backgroundColor: `${t.green}20`, border: `1px solid ${t.green}40` }}>
            <Shield className="w-[18px] h-[18px]" style={{ color: t.green }} />
          </button>
          <button onClick={() => navigate('/create-post')} className="w-[36px] h-[36px] rounded-full flex items-center justify-center" style={{ backgroundColor: t.green }}>
            <SquarePen className="w-[18px] h-[18px]" strokeWidth={2.5} style={{ color: '#000' }} />
          </button>
        </div>
      </header>

      {/* Title */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-[28px] font-bold" style={{ color: t.text }}>Messages</h2>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 rounded-[12px] px-3 py-2.5" style={{ backgroundColor: t.bgInput, border: `1px solid ${t.border2}` }}>
          <Search className="w-4 h-4" style={{ color: t.textMuted }} />
          <input
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="Search messages or users..."
            className="flex-1 bg-transparent outline-none text-[14px]"
            style={{ color: t.text }}
          />
          <button className="w-6 h-6 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.textMuted} strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="14" y2="12" /><line x1="4" y1="18" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 px-4 pb-3">
        {['All', 'Direct', 'Groups', 'Secure'].map(f => (
          <button key={f} onClick={() => setActiveFilter(f)}
            className="px-4 py-[6px] rounded-full text-[13px] font-semibold flex items-center gap-1"
            style={{
              backgroundColor: activeFilter === f ? `${t.green}20` : 'transparent',
              border: `1.5px solid ${activeFilter === f ? t.green : t.border2}`,
              color: activeFilter === f ? t.green : t.textMuted,
            }}>
            {f}
            {f === 'Secure' && <Lock className="w-3 h-3" />}
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div className="px-4">
        {chatItems.map(chat => (
          <button key={chat.id} onClick={() => navigate(`/chats/detail?room=default`)} className="flex items-center gap-3 w-full py-3 text-left" style={{ borderBottom: `1px solid ${t.border}` }}>
            <div className="relative w-[48px] h-[48px] shrink-0">
              {chat.avatar ? (
                <img src={chat.avatar} alt={chat.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <div className="w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: chat.avatarColor }}>
                  <span className="text-[18px] font-bold text-white">{chat.avatarLetter}</span>
                </div>
              )}
              {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full" style={{ backgroundColor: t.green, border: `2px solid ${t.bg}` }} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[15px] font-bold" style={{ color: t.text }}>{chat.name}</span>
                {chat.verified && <VerifiedBadge className="w-[16px] h-[16px]" style={{ color: t.green }} />}
                {chat.muted && <VolumeX className="w-3.5 h-3.5" style={{ color: t.textDim }} />}
                {chat.encrypted && <Lock className="w-3 h-3" style={{ color: t.textMuted }} />}
                {chat.pinned && <Pin className="w-3 h-3" style={{ color: t.textMuted }} />}
              </div>
              <p className="text-[13px] truncate mt-0.5" style={{ color: t.textMuted }}>{chat.lastMsg}</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-[11px]" style={{ color: t.textMuted }}>{chat.time}</span>
              {chat.unread > 0 ? (
                <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center" style={{ backgroundColor: t.green }}>
                  <span className="text-[10px] font-bold" style={{ color: '#000' }}>{chat.unread}</span>
                </div>
              ) : chat.read ? (
                <CheckCheck className="w-4 h-4" style={{ color: t.green }} />
              ) : null}
            </div>
          </button>
        ))}
      </div>

      {/* Expanded Group Chat Card */}
      <div className="px-4 mt-2">
        <div className="rounded-[16px] p-4" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.green}30` }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img src={expandedChat.avatar} alt={expandedChat.name} className="w-[44px] h-[44px] rounded-full object-cover" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[15px] font-bold" style={{ color: t.text }}>{expandedChat.name}</span>
                  <VerifiedBadge className="w-[16px] h-[16px]" style={{ color: t.green }} />
                </div>
                <span className="text-[12px]" style={{ color: t.green }}>{expandedChat.members} members, {expandedChat.online} online</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Pin className="w-4 h-4" style={{ color: t.textMuted }} />
              <span className="text-[16px]" style={{ color: t.textMuted }}>•••</span>
            </div>
          </div>

          {/* Encryption notice */}
          <div className="rounded-[12px] p-3 flex items-center gap-3 mb-3" style={{ backgroundColor: `${t.green}10`, border: `1px solid ${t.green}30` }}>
            <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${t.green}20` }}>
              <Lock className="w-4 h-4" style={{ color: t.green }} />
            </div>
            <div className="flex-1">
              <span className="text-[12px] font-bold" style={{ color: t.green }}>End-to-end encrypted</span>
              <p className="text-[11px]" style={{ color: t.textMuted }}>Messages and calls are secured with TrendUpLive encryption.</p>
            </div>
            <button className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ border: `1px solid ${t.green}`, color: t.green }}>Verify Group</button>
          </div>

          {/* Disappearing messages */}
          <div className="flex items-center gap-3 py-2" style={{ borderBottom: `1px solid ${t.border}` }}>
            <Volume2 className="w-4 h-4" style={{ color: t.textMuted }} />
            <div className="flex-1">
              <span className="text-[13px] font-bold" style={{ color: t.text }}>Disappearing messages</span>
              <p className="text-[11px]" style={{ color: t.textMuted }}>Messages will disappear after 7 days</p>
            </div>
            <span className="text-[12px] font-semibold flex items-center gap-0.5" style={{ color: t.textMuted }}>7 days <ChevronRight className="w-3.5 h-3.5" /></span>
          </div>

          {/* Group activity */}
          <div className="flex items-center gap-3 py-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.textMuted} strokeWidth="2"><path d="M2 12 L6 8 L10 14 L14 6 L18 10 L22 4" /></svg>
            <div className="flex-1">
              <span className="text-[13px] font-bold" style={{ color: t.text }}>Group activity</span>
              <p className="text-[11px]" style={{ color: t.textMuted }}>Alex Morgan is typing...</p>
            </div>
            <div className="w-5 h-5 rounded-full" style={{ border: `2px solid ${t.green}` }} />
          </div>

          {/* Open Chat button */}
          <button onClick={() => navigate('/chats/detail?room=default')} className="w-full mt-3 py-2.5 rounded-[12px] text-[14px] font-bold text-center" style={{ border: `1px solid ${t.green}`, color: t.green }}>
            Open Chat
          </button>
        </div>
      </div>

      {/* Last chat item */}
      <div className="px-4 mt-2">
        <button onClick={() => navigate('/chats/detail?room=default')} className="flex items-center gap-3 w-full py-3 text-left">
          <div className="relative w-[48px] h-[48px] shrink-0">
            <img src={lastChat.avatar} alt={lastChat.name} className="w-full h-full rounded-full object-cover" />
            {lastChat.online && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full" style={{ backgroundColor: t.green, border: `2px solid ${t.bg}` }} />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[15px] font-bold" style={{ color: t.text }}>{lastChat.name}</span>
              {lastChat.verified && <VerifiedBadge className="w-[16px] h-[16px]" style={{ color: t.green }} />}
              {lastChat.encrypted && <Lock className="w-3 h-3" style={{ color: t.textMuted }} />}
            </div>
            <p className="text-[13px] truncate mt-0.5" style={{ color: t.textMuted }}>{lastChat.lastMsg}</p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-[11px]" style={{ color: t.textMuted }}>{lastChat.time}</span>
            <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center" style={{ backgroundColor: t.green }}>
              <span className="text-[10px] font-bold" style={{ color: '#000' }}>{lastChat.unread}</span>
            </div>
          </div>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
