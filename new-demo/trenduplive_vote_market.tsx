import React from 'react';
import { 
  Search, Bell, SquarePen, ChevronLeft, ChevronRight, 
  Home, MessageCircle, Radio, User 
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#08090C] text-white font-sans relative overflow-hidden pb-[80px]">
      
      {/* --- TOP HEADER --- */}
      <header className="flex items-center justify-between px-4 pt-10 pb-4 sticky top-0 bg-[#08090C]/95 backdrop-blur-md z-50">
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-9 h-9" />
          <h1 className="text-[22px] font-bold tracking-tight text-[#FFFFFF]">TrendUpLive</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-[#121419] border border-[#1E2026] flex items-center justify-center hover:bg-[#1A1D24] transition-colors">
            <Search className="w-5 h-5 text-[#8B8D93]" strokeWidth={2} />
          </button>
          
          <button className="w-10 h-10 rounded-full bg-[#121419] border border-[#1E2026] flex items-center justify-center relative hover:bg-[#1A1D24] transition-colors">
            <Bell className="w-5 h-5 text-[#8B8D93]" strokeWidth={2} />
            <span className="absolute top-[10px] right-[10px] w-2 h-2 bg-[#FF3B30] rounded-full border border-[#121419]"></span>
          </button>
          
          <button className="w-10 h-10 rounded-full bg-[#00D1B2] flex items-center justify-center hover:bg-[#00B59A] transition-colors shadow-[0_0_15px_rgba(0,209,178,0.25)]">
            <SquarePen className="w-5 h-5 text-[#042F24]" strokeWidth={2.5} />
          </button>
        </div>
      </header>

      {/* --- MAIN TABS --- */}
      <div className="flex items-center justify-between px-8 py-3 border-b border-[#1A1D24]">
        <button className="text-[17px] font-semibold text-[#7E8596] hover:text-[#A0A2A8] transition-colors">Today</button>
        <button className="text-[17px] font-semibold text-[#7E8596] hover:text-[#A0A2A8] transition-colors">News</button>
        <button className="text-[17px] font-bold text-[#F1D683] border-b-[2.5px] border-[#F1D683] pb-1">Market trend</button>
      </div>

      {/* --- FILTER PILLS --- */}
      <div className="flex items-center gap-2.5 px-4 py-4 overflow-x-auto no-scrollbar">
        <button className="px-[18px] py-[6px] rounded-full bg-[#121419] border border-[#23252A] text-[#8B8D93] text-[14px] font-medium whitespace-nowrap">
          Crypto
        </button>
        <button className="px-[18px] py-[6px] rounded-full bg-[#0A1F16] border border-[#1C5A3E] text-[#2ECC71] text-[14px] font-medium whitespace-nowrap shadow-[0_0_10px_rgba(46,204,113,0.1)]">
          Vote
        </button>
        <button className="px-[18px] py-[6px] rounded-full bg-[#121419] border border-[#23252A] text-[#8B8D93] text-[14px] font-medium whitespace-nowrap">
          Categories
        </button>
        <button className="px-[18px] py-[6px] rounded-full bg-[#121419] border border-[#23252A] text-[#8B8D93] text-[14px] font-medium whitespace-nowrap">
          Chains
        </button>
      </div>

      {/* --- MAIN CARD --- */}
      <div className="px-4 mt-1">
        <div className="w-full rounded-[28px] p-5 border border-[#1E2026] bg-[#111216] shadow-2xl relative overflow-hidden">
          
          {/* Internal Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF7A00]/25 via-[#FF7A00]/5 to-transparent blur-2xl pointer-events-none"></div>

          {/* Top Info Row */}
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-2 bg-[#0C0D11] border border-[#1E2026] rounded-full pl-1 pr-3 py-1">
              <div className="w-[22px] h-[22px] rounded-full bg-[#2ECC71] flex items-center justify-center">
                <span className="text-[#0A1F16] text-[11px] font-bold">$T</span>
              </div>
              <span className="text-[#F3F4F6] text-[13px] font-bold tracking-tight">$TUP TrendUp</span>
              <span className="text-[#6A6C73] text-[10px] ml-[-2px]">▼</span>
            </div>

            <div className="bg-[#0C0D11] border border-[#1E2026] rounded-full px-3 py-1.5">
              <span className="text-[#8B8D93] text-[13px] font-medium">Epoch $46</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex flex-col items-center mb-5 relative z-10">
            <div className="flex items-center gap-3">
              <button className="w-6 h-6 rounded-full bg-[#0C0D11] border border-[#1E2026] flex items-center justify-center">
                <ChevronLeft className="w-3.5 h-3.5 text-[#8B8D93]" />
              </button>
              
              <div className="flex items-center gap-2 tracking-[0.1em] text-[12px] font-bold text-[#E0E0E0]">
                <span className="font-serif">RECOVERY</span>
                <div className="flex items-center gap-1.5 bg-[#0A1F16] border border-[#1C5A3E] px-[7px] py-[3px] rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2ECC71]"></div>
                  <span className="text-[#2ECC71] text-[10px] tracking-widest mt-[1px]">ACTIVE</span>
                </div>
              </div>

              <button className="w-6 h-6 rounded-full bg-[#0C0D11] border border-[#1E2026] flex items-center justify-center">
                <ChevronRight className="w-3.5 h-3.5 text-[#8B8D93]" />
              </button>
            </div>
            <span className="text-[#6A6C73] text-[12px] mt-1.5">Sell protections</span>
          </div>

          {/* Big Title */}
          <div className="flex flex-col items-center mb-[26px] relative z-10">
            <div className="flex items-center gap-3">
              {/* Glowing Info Icon */}
              <div className="w-[28px] h-[28px] rounded-full bg-gradient-to-br from-[#FF9800] to-[#F57C00] flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                <span className="text-[#4A2000] font-serif font-bold italic text-[16px] mt-[-1px]">i</span>
              </div>
              
              <h2 className="text-[34px] flex items-center gap-[6px]">
                <span className="font-serif font-bold text-[#FF8C00] tracking-wide">RECOVERY</span>
                <span className="font-serif italic text-[#A0A2A8] text-[32px]">Mode</span>
              </h2>
            </div>
            <span className="text-[#8B8D93] text-[13px] mt-1.5 font-medium">Epoch $46 • Ends in 5d 16h</span>
          </div>

          {/* Central Heartbeat Icon */}
          <div className="flex justify-center mb-8 relative z-10">
            <HeartbeatSVG className="w-[120px] h-[120px] drop-shadow-[0_0_20px_rgba(255,140,0,0.3)]" />
          </div>

          {/* Description */}
          <p className="text-center text-[#E0E0E0] text-[16.5px] font-medium mb-7 relative z-10">
            Steadier flow while the protocol cools down.
          </p>

          {/* Stats Row */}
          <div className="flex justify-between items-end mb-6 px-1 relative z-10">
            <div className="flex flex-col">
              <span className="text-[#8B8D93] text-[13px] font-medium mb-0.5">Wallet cap</span>
              <span className="text-[38px] font-bold text-white leading-none mb-[2px]">7%</span>
              <span className="text-[#6A6C73] text-[11px] font-medium">w2w vs baseline</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[#8B8D93] text-[13px] font-medium mb-0.5">Sell cap</span>
              <span className="text-[38px] font-bold text-white leading-none mb-[2px]">3%</span>
              <span className="text-[#6A6C73] text-[11px] font-medium">10% envelope</span>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="mb-[28px] relative z-10">
            <div className="w-full h-1.5 bg-[#1C1E23] rounded-full overflow-hidden mb-2.5">
              <div className="h-full bg-[#FFB300] rounded-full" style={{ width: '72%' }}></div>
            </div>
            <div className="flex justify-between text-[11px] font-bold tracking-wide">
              <span className="text-[#6A6C73]">Quorum <span className="text-white">72%</span></span>
              <span className="text-[#6A6C73]">TIME LEFT <span className="text-white">5d 16h</span></span>
            </div>
          </div>

          {/* Voting Buttons */}
          <div className="flex gap-[14px] relative z-10">
            <button className="flex-1 h-[58px] rounded-2xl bg-gradient-to-b from-[#8B2C2E] to-[#4A1617] border border-[#B03A3C] flex items-center justify-center shadow-[0_4px_15px_rgba(92,35,37,0.4)] hover:opacity-90 transition-opacity">
              <span className="text-[#FFFFFF] text-[19px] font-serif font-bold tracking-[0.15em] mt-[2px]">YES</span>
            </button>
            <button className="flex-1 h-[58px] rounded-2xl bg-[#0B0C10] border border-[#23252A] flex items-center justify-center hover:bg-[#121419] transition-colors">
              <span className="text-[#FFFFFF] text-[19px] font-serif font-bold tracking-[0.15em] mt-[2px]">NO</span>
            </button>
          </div>

        </div>
      </div>

      {/* --- BOTTOM NAVIGATION BAR --- */}
      <div className="fixed bottom-0 left-0 w-full h-[80px] bg-[#08090C]/95 backdrop-blur-xl border-t border-[#1A1D24] flex justify-around items-center px-2 z-50 pb-2">
        <button className="flex flex-col items-center gap-[5px] p-2">
          <Home className="w-6 h-6 text-[#6A6C73]" strokeWidth={1.5} />
          <span className="text-[10px] text-[#6A6C73] font-medium">Home</span>
        </button>
        
        <button className="flex flex-col items-center gap-[5px] p-2">
          <MarketPulseIcon className="w-6 h-6 text-[#F1D683]" />
          <span className="text-[10px] text-[#F1D683] font-bold">Markets</span>
        </button>
        
        <button className="flex flex-col items-center gap-[5px] p-2 relative">
          <MessageCircle className="w-6 h-6 text-[#6A6C73]" strokeWidth={1.5} />
          <span className="absolute top-[4px] right-[2px] w-[16px] h-[16px] bg-[#2979FF] rounded-full border-2 border-[#08090C] flex items-center justify-center text-[9px] font-bold text-white">4</span>
          <span className="text-[10px] text-[#6A6C73] font-medium">Chats</span>
        </button>
        
        <button className="flex flex-col items-center gap-[5px] p-2">
          <Radio className="w-6 h-6 text-[#6A6C73]" strokeWidth={1.5} />
          <span className="text-[10px] text-[#6A6C73] font-medium">Live</span>
        </button>
        
        <button className="flex flex-col items-center gap-[5px] p-2">
          <User className="w-6 h-6 text-[#6A6C73]" strokeWidth={1.5} />
          <span className="text-[10px] text-[#6A6C73] font-medium">Profile</span>
        </button>
      </div>

    </div>
  );
}

// Recreated Logo matching the top left app logo
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

// Refined Heartbeat SVG to perfectly match the glowing neon heart in the center
function HeartbeatSVG(props) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Outer Heart Shape */}
      <path 
        d="M 50 82 C 50 82 20 58 20 38 C 20 25 30 18 40 18 C 46 18 48 22 50 24 C 52 22 54 18 60 18 C 70 18 80 25 80 38 C 80 58 50 82 50 82 Z" 
        stroke="#FF8C00" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* The EKG Pulse line cutting through */}
      <path 
        d="M 28 50 L 40 50 L 45 38 L 52 64 L 60 48 L 65 50 L 72 50" 
        stroke="#FF8C00" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}

// Custom SVG for the bottom "Markets" pulse icon to match the image accurately
function MarketPulseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12h4l2 -5l4 10l2 -5h6" />
    </svg>
  );
}