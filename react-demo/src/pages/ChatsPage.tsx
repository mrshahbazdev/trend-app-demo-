import { useNavigate } from 'react-router-dom';
import { Search, Bell, MessageSquare, CheckCircle2, Star } from 'lucide-react';
import NewLogo from '../components/NewLogo';
import BottomNav from '../components/BottomNav';
import { pinnedChats, recentChats } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

interface Chat {
  id: number;
  name: string;
  lastMsg: string;
  time: string;
  unread: number;
  verified?: boolean;
  online?: boolean;
  room?: string;
}

function ChatCard({ chat, isPinned, onClick }: { chat: Chat; isPinned?: boolean; onClick: () => void }) {
  const { t } = useTheme();
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-4 rounded-[14px] transition-colors cursor-pointer"
      style={{ backgroundColor: t.bgSec, border: `1px solid ${isPinned ? t.border3 : t.border2}` }}
    >
      <div className="relative w-[48px] h-[48px] rounded-[12px] flex items-center justify-center" style={{ backgroundColor: t.bgTer, border: `1px solid ${t.border2}` }}>
        <MessageSquare className="w-6 h-6" style={{ color: t.textSubtle }} />
        {chat.online && <div className="absolute bottom-[-2px] right-[-2px] w-3 h-3 rounded-full" style={{ backgroundColor: t.green, border: `2px solid ${t.bg}` }}></div>}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center mb-0.5">
          <div className="flex items-center gap-1">
            <span className="font-bold text-[15px]" style={{ color: t.textSec }}>{chat.name}</span>
            {chat.verified && <CheckCircle2 className="w-3.5 h-3.5" style={{ color: t.green }} />}
          </div>
          <span className="text-[12px] font-semibold" style={{ color: t.textMuted }}>{chat.time}</span>
        </div>
        <p className="text-[14px] font-medium truncate" style={{ color: t.textSubtle }}>{chat.lastMsg}</p>
      </div>
      {chat.unread > 0 && (
        <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center" style={{ backgroundColor: t.green }}>
          <span className="text-[11px] font-bold" style={{ color: t.bg }}>{chat.unread}</span>
        </div>
      )}
    </div>
  );
}

export default function ChatsPage() {
  const navigate = useNavigate();
  const { t } = useTheme();

  return (
    <div className="min-h-screen font-sans pb-[88px] antialiased" style={{ backgroundColor: t.bg, color: t.text }}>
      <header className="sticky top-0 left-0 w-full z-50 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between" style={{ backgroundColor: t.backdrop, borderBottom: `1px solid ${t.border}` }}>
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-[38px] h-[38px]" />
          <h1 className="text-[23px] font-bold tracking-tight" style={{ color: t.text }}>Chats</h1>
        </div>
        <div className="flex items-center gap-3.5">
          <button onClick={() => navigate('/search')}><Search className="w-[24px] h-[24px]" strokeWidth={2.5} style={{ color: t.textSec }} /></button>
          <button onClick={() => navigate('/notifications')} className="relative"><Bell className="w-[24px] h-[24px]" strokeWidth={2.5} style={{ color: t.textSec }} /><span className="absolute top-[-2px] right-[-2px] w-[9px] h-[9px] rounded-full" style={{ backgroundColor: t.red, border: `2px solid ${t.bg}` }}></span></button>
        </div>
      </header>

      <div className="px-4 mt-4">
        <h2 className="text-[12px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: t.textSubtle }}>
          <Star className="w-3.5 h-3.5" style={{ fill: t.textSubtle, color: t.textSubtle }} /> Pinned
        </h2>
        {pinnedChats.map(chat => (
          <ChatCard key={chat.id} chat={chat} isPinned onClick={() => navigate(`/chats/detail?room=${chat.room || 'default'}`)} />
        ))}
      </div>

      <div className="px-4 mt-6">
        <h2 className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: t.textSubtle }}>Recent Messages</h2>
        <div className="flex flex-col gap-2">
          {recentChats.map(chat => (
            <ChatCard key={chat.id} chat={chat} onClick={() => navigate(`/chats/detail?room=${chat.room || 'default'}`)} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
