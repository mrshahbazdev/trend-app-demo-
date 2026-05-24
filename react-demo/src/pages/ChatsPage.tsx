import { useNavigate } from 'react-router-dom';
import { Search, Bell, MessageSquare, CheckCircle2, Star } from 'lucide-react';
import NewLogo from '../components/NewLogo';
import BottomNav from '../components/BottomNav';
import { pinnedChats, recentChats } from '../data/mockData';

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
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 bg-[#0A0D12] p-4 rounded-[14px] border border-[#1C1E23] hover:border-[#2A2D35] transition-colors cursor-pointer ${isPinned ? 'shadow-md border-[#2A2D35]' : ''}`}
    >
      <div className="relative w-[48px] h-[48px] bg-[#121419] rounded-[12px] flex items-center justify-center border border-[#1C1E23]">
        <MessageSquare className="w-6 h-6 text-[#A0A2A8]" />
        {chat.online && <div className="absolute bottom-[-2px] right-[-2px] w-3 h-3 bg-[#2ECC71] rounded-full border-[2px] border-[#040508]"></div>}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center mb-0.5">
          <div className="flex items-center gap-1">
            <span className="font-bold text-[15px] text-[#F3F4F6]">{chat.name}</span>
            {chat.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#2ECC71] fill-[#040508]" />}
          </div>
          <span className="text-[#8B8D93] text-[12px] font-semibold">{chat.time}</span>
        </div>
        <p className="text-[#A0A2A8] text-[14px] font-medium truncate">{chat.lastMsg}</p>
      </div>
      {chat.unread > 0 && (
        <div className="w-[22px] h-[22px] bg-[#2ECC71] rounded-full flex items-center justify-center">
          <span className="text-[11px] font-bold text-[#040508]">{chat.unread}</span>
        </div>
      )}
    </div>
  );
}

export default function ChatsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans pb-[88px] antialiased">
      <header className="sticky top-0 left-0 w-full z-50 bg-[#040508]/95 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between border-b border-[#121419]">
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-[38px] h-[38px]" />
          <h1 className="text-[23px] font-bold tracking-tight text-[#FFFFFF]">Chats</h1>
        </div>
        <div className="flex items-center gap-3.5">
          <button onClick={() => navigate('/search')}><Search className="w-[24px] h-[24px] text-[#F3F4F6]" strokeWidth={2.5} /></button>
          <button onClick={() => navigate('/notifications')} className="relative"><Bell className="w-[24px] h-[24px] text-[#F3F4F6]" strokeWidth={2.5} /><span className="absolute top-[-2px] right-[-2px] w-[9px] h-[9px] bg-[#FF3B30] rounded-full border-[2px] border-[#040508]"></span></button>
        </div>
      </header>

      <div className="px-4 mt-4">
        <h2 className="text-[12px] font-bold text-[#A0A2A8] uppercase tracking-widest mb-3 flex items-center gap-2">
          <Star className="w-3.5 h-3.5 fill-[#A0A2A8]" /> Pinned
        </h2>
        {pinnedChats.map(chat => (
          <ChatCard key={chat.id} chat={chat} isPinned onClick={() => navigate(`/chats/detail?room=${chat.room || 'default'}`)} />
        ))}
      </div>

      <div className="px-4 mt-6">
        <h2 className="text-[12px] font-bold text-[#A0A2A8] uppercase tracking-widest mb-3">Recent Messages</h2>
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
