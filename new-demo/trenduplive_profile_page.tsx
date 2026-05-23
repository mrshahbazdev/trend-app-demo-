import React from 'react';
import { 
  ChevronLeft, Share, MoreHorizontal, User, Users, FileText, 
  CheckCircle2, Heart, MessageCircle, Repeat, Share2, Scale 
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#020305] text-white font-sans relative pb-[90px] antialiased">
      
      {/* --- BANNER (Absolute positioned behind header) --- */}
      <div className="absolute top-0 left-0 w-full h-[160px] bg-[#12161A] z-0">
        <img 
          src="https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1000&auto=format&fit=crop" 
          alt="Profile Banner" 
          className="w-full h-full object-cover opacity-80"
        />
        {/* Dark gradient overlay to blend into the background below */}
        <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-[#020305] to-transparent"></div>
      </div>

      {/* --- TOP HEADER (Floating over banner) --- */}
      <header className="sticky top-0 left-0 w-full z-50 bg-gradient-to-b from-[#020305]/80 to-transparent flex items-center justify-between px-4 pt-[44px] pb-4 transition-colors">
        <div className="flex items-center gap-4">
          <button className="text-white hover:text-gray-300 transition-colors drop-shadow-md">
            <ChevronLeft className="w-[26px] h-[26px]" strokeWidth={2.5} />
          </button>
          <div className="flex items-center gap-[6px] drop-shadow-md">
            <h1 className="text-[20px] font-bold tracking-tight">Jason Lin</h1>
            <VerifiedBadge className="w-5 h-5 text-[#2ECC71]" />
          </div>
        </div>
        <div className="flex items-center gap-[18px] text-white drop-shadow-md">
          <button className="hover:text-gray-300 transition-colors">
            <Share className="w-[22px] h-[22px]" strokeWidth={2} />
          </button>
          <button className="hover:text-gray-300 transition-colors">
            <MoreHorizontal className="w-[26px] h-[26px]" strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* --- MAIN SCROLLABLE CONTENT --- */}
      <div className="relative z-10 pt-[50px]">
        
        {/* --- PROFILE INFO SECTION --- */}
        <div className="px-4">
          
          {/* Avatar & Follow Button Row */}
          <div className="flex justify-between items-end mb-[14px]">
            <div className="relative">
              <div className="w-[96px] h-[96px] rounded-full border-[4px] border-[#020305] bg-[#1A1D24] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" 
                  alt="Jason Lin" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Overlapping Verified Badge */}
              <div className="absolute bottom-0 right-0 border-2 border-[#020305] rounded-full bg-[#020305]">
                <VerifiedBadge className="w-[22px] h-[22px] text-[#2ECC71]" />
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <button className="h-[34px] px-[22px] rounded-full bg-[#178544] hover:bg-[#126b36] transition-colors text-white text-[14.5px] font-bold tracking-wide">
                Follow
              </button>
              <button className="w-[34px] h-[34px] rounded-full border border-[#2A2E36] flex items-center justify-center text-[#A0A2A8] hover:bg-[#121419] transition-colors">
                <MoreHorizontal className="w-[18px] h-[18px]" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Name & Handle */}
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-1.5">
              <h2 className="text-[24px] font-bold leading-tight">Jason Lin</h2>
              <VerifiedBadge className="w-[22px] h-[22px] text-[#2ECC71]" />
            </div>
            <div className="flex items-center gap-2 mt-[2px]">
              <span className="text-[#8B8D93] text-[15px]">@jasonlin</span>
              <span className="bg-[#24133D] text-[#A770EF] text-[12px] font-bold px-[8px] py-[3px] rounded-md tracking-wide">Creator</span>
            </div>
          </div>

          {/* Bio */}
          <div className="text-[15.5px] text-[#F3F4F6] leading-[1.5] mb-6">
            <p>Building open tools for the future.</p>
            <p className="text-[#8B8D93]">AI • Web3 • Open Source</p>
          </div>

          {/* Stats Grid */}
          <div className="flex items-center justify-between pr-4 mb-6">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-white">
                <User className="w-[18px] h-[18px] text-[#8B8D93]" strokeWidth={1.5} />
                <span className="font-bold text-[16px]">312</span>
              </div>
              <span className="text-[#8B8D93] text-[13px] font-medium">Following</span>
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-white">
                <Users className="w-[18px] h-[18px] text-[#8B8D93]" strokeWidth={1.5} />
                <span className="font-bold text-[16px]">124.6K</span>
              </div>
              <span className="text-[#8B8D93] text-[13px] font-medium">Followers</span>
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-white">
                <FileText className="w-[18px] h-[18px] text-[#8B8D93]" strokeWidth={1.5} />
                <span className="font-bold text-[16px]">312</span>
              </div>
              <span className="text-[#8B8D93] text-[13px] font-medium">Posts</span>
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-white">
                <CheckCircle2 className="w-[18px] h-[18px] text-[#8B8D93]" strokeWidth={1.5} />
                <span className="font-bold text-[16px]">1.2K</span>
              </div>
              <span className="text-[#8B8D93] text-[13px] font-medium">Votes cast</span>
            </div>
          </div>
        </div>

        {/* --- TABS --- */}
        <div className="flex items-center justify-between px-4 border-b border-[#1A1C22] mb-1">
          <button className="text-[15px] font-medium text-[#8B8D93] pb-3.5 hover:text-white transition-colors">About</button>
          <button className="text-[15px] font-bold text-[#2ECC71] border-b-[2px] border-[#2ECC71] pb-3.5">Posts</button>
          <button className="text-[15px] font-medium text-[#8B8D93] pb-3.5 hover:text-white transition-colors">Media</button>
          <button className="text-[15px] font-medium text-[#8B8D93] pb-3.5 hover:text-white transition-colors">Votes</button>
          <button className="text-[15px] font-medium text-[#8B8D93] pb-3.5 hover:text-white transition-colors">Projects</button>
        </div>

        {/* --- FEED SECTION --- */}
        <div className="flex flex-col">
          
          {/* POST 1: Northside Release */}
          <article className="flex flex-col px-4 pt-4 pb-[18px] border-b border-[#16181D]">
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-2.5">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" className="w-[42px] h-[42px] rounded-full object-cover" alt="Avatar" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="font-bold text-[15px]">Jason Lin</span>
                    <VerifiedBadge className="w-[16px] h-[16px] text-[#2ECC71]" />
                    <span className="text-[#8B8D93] text-[14px] ml-1">@jasonlin</span>
                    <span className="text-[#8B8D93] text-[14px] px-0.5">·</span>
                    <span className="text-[#8B8D93] text-[14px]">2h</span>
                  </div>
                </div>
              </div>
              <button className="text-[#8B8D93] hover:text-white transition-colors mt-1">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="pl-[52px]">
              <p className="text-[15.5px] text-[#E5E7EB] leading-[1.45] mb-[14px]">
                Just shipped a major update to Northside — faster indexing, smarter feeds, and new community tools. Explore it now! 🚀
              </p>
              
              <div className="rounded-[16px] bg-gradient-to-r from-[#030906] to-[#080B0F] border border-[#16271D] overflow-hidden flex items-stretch mb-[14px] cursor-pointer hover:border-[#1F3A2A] transition-colors h-[100px]">
                <div className="w-[120px] bg-[#020503] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute w-[60px] h-[60px] bg-[#2ECC71] blur-[35px] opacity-25"></div>
                  <NorthsideLogo className="w-[50px] h-[50px] relative z-10 drop-shadow-[0_0_12px_rgba(46,204,113,0.7)]" />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-center border-l border-[#16271D]">
                  <h3 className="font-bold text-[16px] text-white flex items-center gap-1.5 mb-[2px]">
                    Northside <span className="text-[#2ECC71]">v2.4</span>
                  </h3>
                  <p className="text-[#8B8D93] text-[13.5px] leading-snug">
                    AI-powered tools for smarter communities.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[#8B8D93] pr-2">
                <div className="flex items-center gap-1.5 text-[#FF3B30] cursor-pointer">
                  <Heart className="w-[18px] h-[18px] fill-[#FF3B30]" strokeWidth={2} />
                  <span className="text-[13px] font-medium">1.2K</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <MessageCircle className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  <span className="text-[13px] font-medium">128</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <Repeat className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  <span className="text-[13px] font-medium">342</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <Scale className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  <span className="text-[13px] font-medium">Merge · Compare</span>
                </div>
                <button className="hover:text-white transition-colors cursor-pointer">
                  <Share2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </article>

          {/* POST 2: Sunset Run */}
          <article className="flex flex-col px-4 pt-4 pb-[18px] border-b border-[#16181D]">
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-2.5">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" className="w-[42px] h-[42px] rounded-full object-cover" alt="Avatar" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="font-bold text-[15px]">Jason Lin</span>
                    <VerifiedBadge className="w-[16px] h-[16px] text-[#2ECC71]" />
                    <span className="text-[#8B8D93] text-[14px] ml-1">@jasonlin</span>
                    <span className="text-[#8B8D93] text-[14px] px-0.5">·</span>
                    <span className="text-[#8B8D93] text-[14px]">1d</span>
                  </div>
                </div>
              </div>
              <button className="text-[#8B8D93] hover:text-white transition-colors mt-1">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="pl-[52px]">
              <p className="text-[15.5px] text-[#E5E7EB] leading-[1.45] mb-[12px]">
                Sunset runs {'>'} everything. Reset for the mind and the body. 🏃🌅
              </p>
              
              <div className="rounded-[16px] overflow-hidden mb-[14px] border border-[#16181D]">
                <img 
                  src="https://images.unsplash.com/photo-1528287942171-fbe365d1d9cb?q=80&w=800&auto=format&fit=crop" 
                  alt="Sunset runner" 
                  className="w-full h-auto object-cover max-h-[200px]"
                />
              </div>

              <div className="flex items-center justify-between text-[#8B8D93] pr-2">
                <div className="flex items-center gap-1.5 text-[#FF3B30] cursor-pointer">
                  <Heart className="w-[18px] h-[18px] fill-[#FF3B30]" strokeWidth={2} />
                  <span className="text-[13px] font-medium">842</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <MessageCircle className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  <span className="text-[13px] font-medium">94</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <Repeat className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  <span className="text-[13px] font-medium">210</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <Scale className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  <span className="text-[13px] font-medium">Merge · Compare</span>
                </div>
                <button className="hover:text-white transition-colors cursor-pointer">
                  <Share2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* --- EXACT BOTTOM NAVIGATION BAR --- */}
      <div className="fixed bottom-0 left-0 w-full h-[88px] bg-[#020305]/95 backdrop-blur-xl border-t border-[#121419] flex justify-between items-start px-[28px] pt-3 pb-6 z-50">
        
        {/* Home (Active) */}
        <button className="flex flex-col items-center gap-1">
          <HomeNavIcon className="w-[26px] h-[26px] text-[#2ECC71]" />
          <span className="text-[11px] text-[#2ECC71] font-medium">Home</span>
        </button>
        
        {/* Markets */}
        <button className="flex flex-col items-center gap-1">
          <MarketsNavIcon className="w-[26px] h-[26px] text-[#8B8D93]" />
          <span className="text-[11px] text-[#8B8D93] font-medium">Markets</span>
        </button>
        
        {/* Center FAB (+) */}
        <div className="flex flex-col items-center justify-start mt-[-4px]">
          <button className="w-[46px] h-[46px] rounded-full bg-[#1A1C22] flex items-center justify-center hover:bg-[#23262E] transition-colors">
             <PlusIcon className="w-[22px] h-[22px] text-[#FFFFFF]" />
          </button>
        </div>
        
        {/* Chats */}
        <button className="flex flex-col items-center gap-1">
          <ChatsNavIcon className="w-[26px] h-[26px] text-[#8B8D93]" />
          <span className="text-[11px] text-[#8B8D93] font-medium">Chats</span>
        </button>
        
        {/* Live */}
        <button className="flex flex-col items-center gap-1">
          <LiveNavIcon className="w-[26px] h-[26px] text-[#8B8D93]" />
          <span className="text-[11px] text-[#8B8D93] font-medium">Live</span>
        </button>

        {/* iOS Home Indicator */}
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFFFFF] rounded-full"></div>
      </div>

    </div>
  );
}

// ---- METICULOUSLY MATCHED CUSTOM SVGs ----

// Sunburst style verified badge with a black checkmark
function VerifiedBadge(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 1.5l2.6 2.4 3.5-.6 1.2 3.4 3.2 1.6-1.4 3.2 1.4 3.2-3.2 1.6-1.2 3.4-3.5-.6-2.6 2.4-2.6-2.4-3.5.6-1.2-3.4-3.2-1.6 1.4-3.2-1.4-3.2 3.2-1.6 1.2-3.4 3.5.6L12 1.5z" />
      <path d="M10 15.5l-3.5-3.5 1.5-1.5 2 2 5.5-5.5 1.5 1.5-7 7z" fill="#020305" />
    </svg>
  );
}

// Slanted glowing N
function NorthsideLogo(props) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 32L12 8" stroke="#2ECC71" strokeWidth="5.5" strokeLinecap="square" />
      <path d="M28 32L28 8" stroke="#2ECC71" strokeWidth="5.5" strokeLinecap="square" />
      <path d="M12 8L28 32" stroke="#2ECC71" strokeWidth="6" />
    </svg>
  );
}

// Distinct House Icon (Outline with square inside)
function HomeNavIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3L4 10v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V10z"/>
      <rect x="9" y="14" width="6" height="7" rx="1"/>
    </svg>
  );
}

// Distinct 3-bar chart icon
function MarketsNavIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 20V12" />
      <path d="M12 20V6" />
      <path d="M18 20V10" />
    </svg>
  );
}

// Large simple plus
function PlusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

// Chat bubble with 3 dots
function ChatsNavIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      <path d="M8 12h.01M12 12h.01M16 12h.01" strokeWidth="2.5" />
    </svg>
  );
}

// Antenna/Broadcast dot with arcs
function LiveNavIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <path d="M16 8.5a5 5 0 0 1 0 7M8 8.5a5 5 0 0 0 0 7" />
      <path d="M19 5.5a9 9 0 0 1 0 13M5 5.5a9 9 0 0 0 0 13" />
    </svg>
  );
}