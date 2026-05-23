import React from 'react';
import { 
  Search, Bell, MessageSquare, BarChart3, User, 
  MoreVertical, Smile, Plus, Send, CheckCircle2, Star
} from 'lucide-react';

export default function App() {
  const pinnedChats = [
    { id: 1, name: "Crypto Alpha Squad", lastMsg: "BTC breakout incoming?", time: "2m", unread: 3, verified: true },
  ];
  
  const recentChats = [
    { id: 2, name: "Stock Market Daily", lastMsg: "Earnings schedule posted", time: "1h", unread: 0, online: true },
    { id: 3, name: "Jason Lin", lastMsg: "Check the 10Y yields", time: "3h", unread: 0, online: true },
    { id: 4, name: "General Market Chat", lastMsg: "Anyone watching NVDA?", time: "5h", unread: 0, online: false },
    { id: 5, name: "Forex Signals", lastMsg: "EUR/USD position update", time: "8h", unread: 0, online: true },
  ];

  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans pb-[88px] antialiased">
      
      {/* Header */}
      <header className="sticky top-0 left-0 w-full z-50 bg-[#040508]/95 backdrop-blur-md pt-12 pb-3 px-4 flex items-center justify-between border-b border-[#121419]">
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-[38px] h-[38px]" />
          <h1 className="text-[23px] font-bold tracking-tight text-[#FFFFFF]">Chats</h1>
        </div>
        <div className="flex items-center gap-3.5">
          <Search className="w-[24px] h-[24px] text-[#F3F4F6]" strokeWidth={2.5} />
          <Bell className="w-[24px] h-[24px] text-[#F3F4F6]" strokeWidth={2.5} />
        </div>
      </header>

      {/* Pinned Section */}
      <div className="px-4 mt-4">
        <h2 className="text-[12px] font-bold text-[#A0A2A8] uppercase tracking-widest mb-3 flex items-center gap-2">
          <Star className="w-3.5 h-3.5 fill-[#A0A2A8]" /> Pinned
        </h2>
        {pinnedChats.map((chat) => (
          <ChatCard key={chat.id} chat={chat} isPinned />
        ))}
      </div>

      {/* Recent Section */}
      <div className="px-4 mt-6">
        <h2 className="text-[12px] font-bold text-[#A0A2A8] uppercase tracking-widest mb-3">Recent Messages</h2>
        <div className="flex flex-col gap-2">
          {recentChats.map((chat) => (
            <ChatCard key={chat.id} chat={chat} />
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full h-[88px] bg-[#040508]/95 backdrop-blur-xl border-t border-[#121419] flex justify-between items-start px-[18px] pt-3 pb-6 z-50">
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]"><HomeNavIconOutline className="w-[24px] h-[24px] text-[#8B8D93]" /><span className="text-[11px] text-[#8B8D93] font-semibold">Home</span></button>
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]"><BarChart3 className="w-[24px] h-[24px] text-[#8B8D93]" strokeWidth={2} /><span className="text-[11px] text-[#8B8D93] font-semibold">Markets</span></button>
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]"><ChatsNavIcon className="w-[24px] h-[24px] text-[#2ECC71]" /><span className="text-[11px] text-[#2ECC71] font-bold">Chats</span></button>
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]"><LiveNavIcon className="w-[24px] h-[24px] text-[#8B8D93]" /><span className="text-[11px] text-[#8B8D93] font-semibold">Live</span></button>
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]"><User className="w-[24px] h-[24px] text-[#8B8D93]" strokeWidth={2} /><span className="text-[11px] text-[#8B8D93] font-semibold">Profile</span></button>
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full"></div>
      </div>
    </div>
  );
}

function ChatCard({ chat, isPinned }) {
  return (
    <div className={`flex items-center gap-4 bg-[#0A0D12] p-4 rounded-[14px] border border-[#1C1E23] hover:border-[#2A2D35] transition-colors cursor-pointer ${isPinned ? 'shadow-md border-[#2A2D35]' : ''}`}>
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
        <div className="w-5 h-5 bg-[#2ECC71] rounded-full flex items-center justify-center text-[11px] font-extrabold text-[#040508]">
          {chat.unread}
        </div>
      )}
    </div>
  );
}

function NewLogo(props) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="outer-gradient" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB300" />
          <stop offset="25%" stopColor="#FF1744" />
          <stop offset="50%" stopColor="#D500F9" />
          <stop offset="75%" stopColor="#2979FF" />
          <stop offset="100%" stopColor="#00E5FF" />
        </linearGradient>
        <linearGradient id="inner-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#00E676" />
          <stop offset="100%" stopColor="#00B8D4" />
        </linearGradient>
      </defs>
      <path d="M 60 16 A 37 37 0 1 0 78 67" stroke="url(#outer-gradient)" strokeWidth="9" strokeLinecap="round" />
      <path d="M 37 61 A 21 21 0 0 0 73 48" stroke="url(#inner-gradient)" strokeWidth="9" strokeLinecap="round" />
      <path d="M 35 52 L 46 43 L 55 43 L 64 35 L 75 25" stroke="#FFB300" strokeWidth="3.5" />
      <circle cx="35" cy="52" r="4.5" fill="#FF4B4B" />
      <circle cx="46" cy="43" r="4.5" fill="#FFB300" />
      <circle cx="55" cy="43" r="4.5" fill="#FFD500" />
      <circle cx="64" cy="35" r="4.5" fill="#FFE600" />
      <path d="M 68 23 L 79 19 L 77 31 Z" fill="#2ECC71" stroke="#2ECC71" strokeLinejoin="round" strokeWidth="1" />
    </svg>
  );
}

function HomeNavIconOutline(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> }
function ChatsNavIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M8 12h.01M12 12h.01M16 12h.01" strokeWidth="3" /></svg> }
function LiveNavIcon(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" /><path d="M16 8.5a5 5 0 0 1 0 7M8 8.5a5 5 0 0 0 0 7" /><path d="M19 5.5a9 9 0 0 1 0 13M5 5.5a9 9 0 0 0 0 13" /></svg> }