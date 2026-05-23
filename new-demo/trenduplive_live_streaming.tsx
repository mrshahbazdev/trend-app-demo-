import React from 'react';
import { 
  Search, Bell, Maximize, Volume2, Flame, Star, ThumbsUp,
  Trophy, ChevronRight, Plus, Smile, Send,
  UserPlus, User, BarChart3, PieChart, MoreHorizontal, Eye
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans relative pb-[200px] antialiased [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      
      {/* --- TOP HEADER (Sticky) --- */}
      <header className="sticky top-0 left-0 w-full z-50 bg-[#040508]/95 backdrop-blur-md pt-12 pb-3 px-4 flex items-center justify-between border-b border-[#121419]">
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

      {/* --- VIDEO PLAYER SECTION --- */}
      <div className="relative w-full aspect-[4/3] bg-[#0A0D12]">
        <img 
          src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1000&auto=format&fit=crop" 
          alt="Live Stream" 
          className="w-full h-full object-cover"
        />
        
        {/* Top Badges */}
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

        {/* Top Right Controls */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-[#000000]/60 backdrop-blur-sm flex items-center justify-center hover:bg-[#000000]/80 transition-colors">
            <Volume2 className="w-[18px] h-[18px] text-white" strokeWidth={2} />
          </button>
          <button className="w-9 h-9 rounded-full bg-[#000000]/60 backdrop-blur-sm flex items-center justify-center hover:bg-[#000000]/80 transition-colors">
            <Maximize className="w-[16px] h-[16px] text-white" strokeWidth={2} />
          </button>
        </div>

        {/* Bottom Overlay & Info */}
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

      {/* --- TABS --- */}
      <div className="flex items-center justify-between px-5 pt-3 pb-0 border-b border-[#1A1C22]">
        <button className="text-[15.5px] font-bold text-[#FFFFFF] border-b-[3px] border-[#2ECC71] pb-2.5">Live Chat</button>
        <button className="text-[15.5px] font-semibold text-[#A0A2A8] pb-2.5 flex items-center gap-1.5 hover:text-white transition-colors">
          Q&A <span className="bg-[#1A1C22] text-[#E0E0E0] text-[11px] font-bold px-1.5 py-0.5 rounded">12</span>
        </button>
        <button className="text-[15.5px] font-semibold text-[#A0A2A8] pb-2.5 hover:text-white transition-colors">Highlights</button>
        <button className="text-[15.5px] font-semibold text-[#A0A2A8] pb-2.5 flex items-center gap-1 hover:text-white transition-colors">
          Reactions <Flame className="w-4 h-4 text-[#FF9800] fill-[#FF9800]" /> <span className="text-[#E0E0E0] text-[13px] font-bold ml-0.5">312</span>
        </button>
      </div>

      {/* --- SPLIT CONTENT AREA --- */}
      <div className="grid grid-cols-[1.3fr_1fr] gap-3 p-3 items-start">
        
        {/* LEFT COLUMN: CHAT */}
        <div className="flex flex-col gap-3.5">
          
          {/* Pinned Message */}
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
              Good morning everyone! Markets are reacting to inflation data and rate cut expectations. What are you watching most closely today? 👇
            </p>
          </div>

          {/* Chat Message 1 */}
          <div className="flex gap-3 pl-1">
            <div className="relative shrink-0">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" className="w-[34px] h-[34px] rounded-full object-cover" alt="Alex" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ECC71] border-[2px] border-[#040508] rounded-full"></div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className="font-bold text-[14.5px] text-[#F3F4F6]">Alex Morgan</span>
                <span className="text-[#8B8D93] text-[12px] font-medium">2m</span>
              </div>
              <p className="text-[#D1D5DB] text-[15px] leading-snug mb-2 font-medium">
                Earnings from the Mag 7 will set the tone 💯
              </p>
              <div className="flex gap-2">
                <div className="bg-[#121419] rounded-full px-2.5 py-1 flex items-center gap-1.5 border border-[#1A1C22]">
                  <ThumbsUp className="w-3.5 h-3.5 text-[#2ECC71] fill-[#2ECC71]" />
                  <span className="text-[12px] font-bold text-[#D1D5DB]">14</span>
                </div>
                <div className="bg-[#121419] rounded-full px-2.5 py-1 flex items-center gap-1.5 border border-[#1A1C22]">
                  <Flame className="w-3.5 h-3.5 text-[#FF9800] fill-[#FF9800]" />
                  <span className="text-[12px] font-bold text-[#D1D5DB]">6</span>
                </div>
                <div className="bg-[#121419] rounded-full w-[26px] h-[26px] flex items-center justify-center border border-[#1A1C22]">
                  <Plus className="w-4 h-4 text-[#A0A2A8]" />
                </div>
              </div>
            </div>
          </div>

          {/* Chat Message 2 (Thread Start) */}
          <div className="flex gap-3 pl-1 relative">
            <div className="relative shrink-0 z-10">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" className="w-[34px] h-[34px] rounded-full object-cover" alt="Priya" />
            </div>
            
            {/* Thread Connector Line */}
            <svg className="absolute top-[34px] left-[17px] w-[20px] h-[45px] pointer-events-none" fill="none" preserveAspectRatio="none">
               <path d="M 0 0 V 30 C 0 38 4 45 15 45 L 20 45" stroke="#2A2D35" strokeWidth="2" fill="none"/>
            </svg>

            <div className="flex flex-col flex-1 pb-2">
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className="font-bold text-[14.5px] text-[#F3F4F6]">Priya Sharma</span>
                <span className="text-[#8B8D93] text-[12px] font-medium">1m</span>
              </div>
              <p className="text-[#D1D5DB] text-[15px] leading-snug mb-2 font-medium">
                Bonds look interesting here. Yield curve flattening again.
              </p>
              <div className="flex gap-2">
                <div className="bg-[#0A1F16] border border-[#1C5A3E] rounded-full px-2.5 py-1 flex items-center gap-1.5">
                  <ThumbsUp className="w-3.5 h-3.5 text-[#2ECC71] fill-[#2ECC71]" />
                  <span className="text-[12px] font-bold text-[#2ECC71]">8</span>
                </div>
                <div className="bg-[#121419] rounded-full px-2.5 py-1 flex items-center gap-1.5 border border-[#1A1C22]">
                  <span className="text-[11px]">💯</span>
                  <span className="text-[12px] font-bold text-[#D1D5DB]">3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Thread Reply */}
          <div className="flex gap-3 pl-[38px] relative mt-[-6px]">
            <div className="relative shrink-0 z-10 pt-1.5">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" className="w-[28px] h-[28px] rounded-full object-cover" alt="Jason" />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-baseline gap-2 mt-1 mb-0.5">
                <span className="font-bold text-[14.5px] text-[#F3F4F6]">Jason Lin</span>
                <span className="text-[#8B8D93] text-[12px] font-medium">1m</span>
              </div>
              <span className="text-[#A0A2A8] text-[11.5px] font-medium mb-1">Replying to <span className="text-[#2ECC71] font-semibold">Priya Sharma</span></span>
              <p className="text-[#D1D5DB] text-[14.5px] leading-snug font-medium">
                Agree — watching 10Y closely.
              </p>
              <button className="text-[#A0A2A8] text-[12.5px] font-semibold mt-2 flex items-center gap-1 hover:text-white transition-colors text-left">
                View 2 more replies <ChevronRight className="w-3.5 h-3.5 rotate-90" />
              </button>
            </div>
          </div>

          {/* Chat Message 3 */}
          <div className="flex gap-3 pl-1 mt-2">
            <div className="relative shrink-0">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" className="w-[34px] h-[34px] rounded-full object-cover" alt="Marcus" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ECC71] border-[2px] border-[#040508] rounded-full"></div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className="font-bold text-[14.5px] text-[#F3F4F6]">Marcus Lee</span>
                <span className="text-[#8B8D93] text-[12px] font-medium">30s</span>
              </div>
              <p className="text-[#D1D5DB] text-[15px] leading-snug font-medium">
                USD strength is the wildcard today.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: WIDGETS */}
        <div className="flex flex-col gap-3.5">
          
          {/* Live Poll Widget */}
          <div className="bg-[#0A0D12] border border-[#1C1E23] rounded-[14px] p-3.5 flex flex-col shadow-lg">
            <div className="flex justify-between items-center mb-2.5">
              <div className="flex items-center gap-1.5 text-[#2ECC71] text-[12px] font-bold tracking-wide">
                 <BarChart3 className="w-4 h-4" />
                 LIVE POLL
              </div>
              <span className="text-[#A0A2A8] text-[11px] font-semibold">• 784 votes</span>
            </div>
            <h3 className="text-[#F3F4F6] text-[14.5px] font-semibold leading-[1.3] mb-3.5">
              What's the biggest market catalyst this week?
            </h3>
            
            <div className="flex flex-col gap-2.5">
              {/* Option 1 (Selected) */}
              <div className="relative w-full h-[32px] rounded-[8px] border border-[#2ECC71] bg-[#0A1F16] overflow-hidden flex items-center px-2.5">
                <div className="absolute left-0 top-0 h-full bg-[#163D28]" style={{ width: '45%' }}></div>
                <div className="relative z-10 w-full flex justify-between items-center text-[12.5px] font-bold text-white">
                  <span>CPI Data <span className="ml-1 text-[#2ECC71]">✓</span></span>
                  <span>45%</span>
                </div>
              </div>
              
              {/* Option 2 */}
              <div className="relative w-full h-[32px] rounded-[8px] border border-[#1E2026] bg-[#121419] overflow-hidden flex items-center px-2.5">
                <div className="absolute left-0 top-0 h-full bg-[#1C1F26]" style={{ width: '28%' }}></div>
                <div className="relative z-10 w-full flex justify-between items-center text-[12.5px] font-semibold text-[#D1D5DB]">
                  <span>Earnings Season</span>
                  <span>28%</span>
                </div>
              </div>

              {/* Option 3 */}
              <div className="relative w-full h-[32px] rounded-[8px] border border-[#1E2026] bg-[#121419] overflow-hidden flex items-center px-2.5">
                <div className="absolute left-0 top-0 h-full bg-[#1C1F26]" style={{ width: '17%' }}></div>
                <div className="relative z-10 w-full flex justify-between items-center text-[12.5px] font-semibold text-[#D1D5DB]">
                  <span>Fed Commentary</span>
                  <span>17%</span>
                </div>
              </div>

              {/* Option 4 */}
              <div className="relative w-full h-[32px] rounded-[8px] border border-[#1E2026] bg-[#121419] overflow-hidden flex items-center px-2.5">
                <div className="absolute left-0 top-0 h-full bg-[#1C1F26]" style={{ width: '10%' }}></div>
                <div className="relative z-10 w-full flex justify-between items-center text-[12.5px] font-semibold text-[#D1D5DB]">
                  <span>Geopolitics</span>
                  <span>10%</span>
                </div>
              </div>
            </div>
            
            <button className="text-[#2ECC71] text-[13px] font-bold mt-4 text-center w-full flex items-center justify-center gap-1 hover:text-[#28b463]">
              View all polls <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Top Contributors Widget */}
          <div className="bg-[#0A0D12] border border-[#1C1E23] rounded-[14px] p-3.5 flex flex-col shadow-lg">
            <div className="flex justify-between items-center mb-3.5">
              <div className="flex items-center gap-1.5 text-[#FFD700] text-[13px] font-bold">
                 <Trophy className="w-4 h-4" />
                 Top Contributors
              </div>
              <span className="text-[#A0A2A8] text-[11px] font-semibold flex items-center gap-0.5 cursor-pointer">
                All time <ChevronRight className="w-3 h-3" />
              </span>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[#8B8D93] text-[12.5px] font-bold w-[12px]">1</span>
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" className="w-[24px] h-[24px] rounded-full object-cover" alt="User" />
                  <span className="text-[#E5E7EB] text-[13px] font-semibold truncate w-[70px]">Alex Morgan</span>
                </div>
                <span className="text-white text-[13px] font-bold">2.4K</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[#8B8D93] text-[12.5px] font-bold w-[12px]">2</span>
                  <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" className="w-[24px] h-[24px] rounded-full object-cover" alt="User" />
                  <span className="text-[#E5E7EB] text-[13px] font-semibold truncate w-[70px]">Jason Patel</span>
                </div>
                <span className="text-white text-[13px] font-bold">1.8K</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[#8B8D93] text-[12.5px] font-bold w-[12px]">3</span>
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" className="w-[24px] h-[24px] rounded-full object-cover" alt="User" />
                  <span className="text-[#E5E7EB] text-[13px] font-semibold truncate w-[70px]">Priya Sharma</span>
                </div>
                <span className="text-white text-[13px] font-bold">1.2K</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" className="w-[20px] h-[20px] rounded-full border-[1.5px] border-[#0A0D12]" alt="User" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-[20px] h-[20px] rounded-full border-[1.5px] border-[#0A0D12]" alt="User" />
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop" className="w-[20px] h-[20px] rounded-full border-[1.5px] border-[#0A0D12]" alt="User" />
                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop" className="w-[20px] h-[20px] rounded-full border-[1.5px] border-[#0A0D12]" alt="User" />
              </div>
              <span className="text-[#A0A2A8] text-[11.5px] font-bold ml-1">+142</span>
            </div>
            
            <button className="text-[#2ECC71] text-[13px] font-bold mt-4 text-center w-full flex items-center justify-center gap-1 hover:text-[#28b463]">
              See leaderboard <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* --- FIXED BOTTOM ACTION AREA --- */}
      <div className="fixed bottom-[88px] left-0 w-full bg-[#040508] border-t border-[#121419] z-40">
        
        {/* Follow Room Banner */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1A1C22]">
          <div className="flex items-center gap-3.5">
            <div className="w-[40px] h-[40px] rounded-full border-[1.5px] border-[#1C5A3E] bg-[#0A1F16] flex items-center justify-center relative">
              <UserPlus className="w-[18px] h-[18px] text-[#2ECC71]" strokeWidth={2.5} />
              <div className="absolute w-[48px] h-[48px] rounded-full border border-[#163D28]"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-[14.5px] font-bold text-white tracking-wide">Follow this room for updates</span>
              <span className="text-[#A0A2A8] text-[12.5px] font-medium mt-[1px]">Join 12.8K followers</span>
            </div>
          </div>
          <button className="bg-[#2ECC71] hover:bg-[#28b463] text-[#040508] text-[14px] font-extrabold px-4 py-2 rounded-[10px] transition-colors">
            Follow Room
          </button>
        </div>

        {/* Input Box */}
        <div className="px-4 py-3.5 flex items-center gap-3 bg-[#040508]">
          <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" className="w-[40px] h-[40px] rounded-full object-cover border border-[#23252A] shrink-0" alt="Me" />
          
          <div className="flex-1 relative flex items-center bg-[#121419] border border-[#23252A] rounded-full h-[46px] px-4">
            <span className="text-[#8B8D93] text-[15px] font-medium flex-1 truncate">Share your thoughts...</span>
            <div className="flex items-center gap-3 text-[#A0A2A8]">
              <button className="hover:text-white transition-colors">
                <Plus className="w-[20px] h-[20px]" strokeWidth={2.5} />
              </button>
              <button className="hover:text-white transition-colors">
                <Smile className="w-[20px] h-[20px]" strokeWidth={2.5} />
              </button>
            </div>
          </div>
          
          <button className="shrink-0 hover:scale-105 transition-transform">
            <SendIcon className="w-[24px] h-[24px] text-[#2ECC71]" />
          </button>
        </div>
      </div>

      {/* --- NEW BOTTOM NAVIGATION BAR --- */}
      <div className="fixed bottom-0 left-0 w-full h-[88px] bg-[#040508]/95 backdrop-blur-xl border-t border-[#121419] flex justify-between items-start px-[18px] pt-3 pb-6 z-50">
        
        {/* Home */}
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]">
          <HomeNavIconOutline className="w-[24px] h-[24px] text-[#8B8D93]" />
          <span className="text-[11px] text-[#8B8D93] font-semibold">Home</span>
        </button>
        
        {/* Markets */}
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]">
          <BarChart3 className="w-[24px] h-[24px] text-[#8B8D93]" strokeWidth={2} />
          <span className="text-[11px] text-[#8B8D93] font-semibold">Markets</span>
        </button>
        
        {/* Chats */}
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]">
          <ChatsNavIcon className="w-[24px] h-[24px] text-[#8B8D93]" />
          <span className="text-[11px] text-[#8B8D93] font-semibold">Chats</span>
        </button>
        
        {/* Live (ACTIVE) */}
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]">
          <LiveNavIcon className="w-[24px] h-[24px] text-[#2ECC71]" />
          <span className="text-[11px] text-[#2ECC71] font-bold">Live</span>
        </button>
        
        {/* Profile */}
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]">
          <User className="w-[24px] h-[24px] text-[#8B8D93]" strokeWidth={2} />
          <span className="text-[11px] text-[#8B8D93] font-semibold">Profile</span>
        </button>

        {/* iOS Home Indicator */}
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full"></div>
      </div>

    </div>
  );
}

// ---- METICULOUSLY MATCHED CUSTOM SVGs ----

// TrendUp Logo (Top Left)
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

// Custom Top Right Compose Icon
function SquarePenIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

// Sunburst style verified badge with a black checkmark
function VerifiedBadge(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 1.5l2.6 2.4 3.5-.6 1.2 3.4 3.2 1.6-1.4 3.2 1.4 3.2-3.2 1.6-1.2 3.4-3.5-.6-2.6 2.4-2.6-2.4-3.5.6-1.2-3.4-3.2-1.6 1.4-3.2-1.4-3.2 3.2-1.6 1.2-3.4 3.5.6L12 1.5z" />
      <path d="M10 15.5l-3.5-3.5 1.5-1.5 2 2 5.5-5.5 1.5 1.5-7 7z" fill="#040508" />
    </svg>
  );
}

// Send Icon tailored to the input box (points up-right)
function SendIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

// Home Nav Icon
function HomeNavIconOutline(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

// Custom squared bubble for "Chats"
function ChatsNavIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      <path d="M8 12h.01M12 12h.01M16 12h.01" strokeWidth="3" />
    </svg>
  );
}

// Exact match for the "Live" broadcast icon (Active)
function LiveNavIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <path d="M16 8.5a5 5 0 0 1 0 7M8 8.5a5 5 0 0 0 0 7" />
      <path d="M19 5.5a9 9 0 0 1 0 13M5 5.5a9 9 0 0 0 0 13" />
    </svg>
  );
}