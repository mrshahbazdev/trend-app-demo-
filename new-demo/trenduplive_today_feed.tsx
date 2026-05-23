import React from 'react';
import { 
  Search, Bell, MapPin, MoreHorizontal, 
  Heart, MessageCircle, Repeat, Share, 
  Users, User, PieChart, BarChart3, Home 
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans relative pb-[90px] antialiased [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      
      {/* --- TOP HEADER (Sticky) --- */}
      <header className="sticky top-0 left-0 w-full z-50 bg-[#040508]/95 backdrop-blur-md pt-12 pb-3 px-4 flex items-center justify-between border-b border-[#121419]">
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-[38px] h-[38px]" />
          <h1 className="text-[22px] font-bold tracking-tight text-[#FFFFFF]">TrendUpLive</h1>
        </div>
        
        <div className="flex items-center gap-3.5">
          <button className="hover:text-gray-300 transition-colors">
            <Search className="w-[22px] h-[22px] text-[#F3F4F6]" strokeWidth={2} />
          </button>
          
          <button className="relative hover:text-gray-300 transition-colors">
            <Bell className="w-[22px] h-[22px] text-[#F3F4F6]" strokeWidth={2} />
            <span className="absolute top-[-2px] right-[-2px] w-[9px] h-[9px] bg-[#FF3B30] rounded-full border-[2px] border-[#040508]"></span>
          </button>
          
          <button className="w-[34px] h-[34px] rounded-full bg-[#00D1B2] flex items-center justify-center hover:bg-[#00B59A] transition-colors shadow-[0_0_15px_rgba(0,209,178,0.3)]">
            <SquarePenIcon className="w-[18px] h-[18px] text-[#042F24]" />
          </button>
        </div>
      </header>

      {/* --- MAIN TABS --- */}
      <div className="flex items-center justify-between px-8 pt-4 pb-0 border-b border-[#1A1C22]">
        <button className="text-[15px] font-bold text-[#FFFFFF] border-b-[3px] border-[#2ECC71] pb-3 px-1">Today</button>
        <button className="text-[15px] font-medium text-[#8B8D93] pb-3 hover:text-gray-300 transition-colors">News</button>
        <button className="text-[15px] font-medium text-[#8B8D93] pb-3 hover:text-gray-300 transition-colors">Market Trend</button>
      </div>

      {/* --- FILTER PILLS --- */}
      <div className="flex items-center gap-3 px-4 py-[14px] overflow-x-auto no-scrollbar [&::-webkit-scrollbar]:hidden">
        <button className="px-5 py-[6px] rounded-full bg-transparent border border-[#2ECC71] text-[#2ECC71] text-[14px] font-medium whitespace-nowrap">
          All
        </button>
        <button className="px-5 py-[6px] rounded-full bg-[#121419] border border-[#23252A] text-[#E0E0E0] text-[14px] font-medium whitespace-nowrap">
          Topics
        </button>
        <button className="px-5 py-[6px] rounded-full bg-[#121419] border border-[#23252A] text-[#E0E0E0] text-[14px] font-medium whitespace-nowrap">
          Creators
        </button>
        <button className="px-4 py-[6px] rounded-full bg-[#121419] border border-[#23252A] text-[#E0E0E0] text-[14px] font-medium whitespace-nowrap flex items-center gap-1.5">
          <MapPin className="w-[14px] h-[14px] text-[#8B8D93]" strokeWidth={2} />
          Near You
        </button>
      </div>

      {/* --- CREATORS CAROUSEL --- */}
      <div className="flex items-start gap-4 px-4 pb-4 border-b border-[#121419] overflow-x-auto no-scrollbar [&::-webkit-scrollbar]:hidden">
        
        {/* Story 1 */}
        <div className="flex flex-col items-center gap-1.5 min-w-[72px]">
          <div className="relative">
            <div className="w-[64px] h-[64px] rounded-full border-[2px] border-[#2ECC71] p-[2px] overflow-hidden">
               <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" className="w-full h-full rounded-full object-cover" alt="Alex" />
            </div>
            <div className="absolute bottom-0 right-0 border-[2px] border-[#040508] rounded-full bg-[#040508]">
              <VerifiedBadge className="w-[16px] h-[16px] text-[#2ECC71]" />
            </div>
          </div>
          <div className="flex flex-col items-center">
             <span className="text-[11px] font-bold text-white text-center leading-tight">Alex Morgan</span>
             <span className="text-[10px] text-[#8B8D93]">1.3M</span>
          </div>
        </div>

        {/* Story 2 (Blue Ring) */}
        <div className="flex flex-col items-center gap-1.5 min-w-[72px]">
          <div className="relative w-[64px] h-[64px] rounded-full bg-gradient-to-tr from-[#2979FF] via-[#00E5FF] to-[#D500F9] p-[2.5px]">
            <div className="w-full h-full rounded-full bg-[#040508] overflow-hidden border-[2px] border-[#040508]">
               <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=150&auto=format&fit=crop" className="w-full h-full object-cover" alt="Pulse" />
            </div>
          </div>
          <div className="flex flex-col items-center">
             <span className="text-[11px] font-medium text-[#E0E0E0] text-center leading-tight">World Pulse</span>
             <span className="text-[10px] text-[#8B8D93]">530K</span>
          </div>
        </div>

        {/* Story 3 */}
        <div className="flex flex-col items-center gap-1.5 min-w-[72px]">
          <div className="relative">
            <div className="w-[64px] h-[64px] rounded-full border-[2px] border-[#23252A] p-[2px] overflow-hidden">
               <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop" className="w-full h-full rounded-full object-cover" alt="Tech Talk" />
            </div>
          </div>
          <div className="flex flex-col items-center">
             <span className="text-[11px] font-medium text-[#E0E0E0] text-center leading-tight">Tech Talk</span>
             <span className="text-[10px] text-[#8B8D93]">214K</span>
          </div>
        </div>

        {/* Story 4 (Green Ring) */}
        <div className="flex flex-col items-center gap-1.5 min-w-[72px]">
          <div className="relative w-[64px] h-[64px] rounded-full bg-gradient-to-tr from-[#2ECC71] to-[#2979FF] p-[2.5px]">
            <div className="w-full h-full rounded-full bg-[#040508] overflow-hidden border-[2px] border-[#040508]">
               <img src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=150&auto=format&fit=crop" className="w-full h-full object-cover" alt="Green Future" />
            </div>
          </div>
          <div className="flex flex-col items-center">
             <span className="text-[11px] font-medium text-[#E0E0E0] text-center leading-tight">Green Future</span>
             <span className="text-[10px] text-[#8B8D93]">98K</span>
          </div>
        </div>

        {/* Story 5 (Orange Ring) */}
        <div className="flex flex-col items-center gap-1.5 min-w-[72px]">
          <div className="relative w-[64px] h-[64px] rounded-full bg-gradient-to-tr from-[#FFB300] to-[#FF1744] p-[2.5px]">
            <div className="w-full h-full rounded-full bg-[#040508] overflow-hidden border-[2px] border-[#040508]">
               <img src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=150&auto=format&fit=crop" className="w-full h-full object-cover" alt="Insight" />
            </div>
          </div>
          <div className="flex flex-col items-center">
             <span className="text-[11px] font-medium text-[#E0E0E0] text-center leading-tight">Market Insight</span>
             <span className="text-[10px] text-[#8B8D93]">392K</span>
          </div>
        </div>

      </div>

      {/* --- FEED SECTION --- */}
      <div className="flex flex-col">
        
        {/* POST 1: Alex Morgan */}
        <article className="flex flex-col px-4 pt-5 pb-3 border-b border-[#121419]">
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-3">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" className="w-[44px] h-[44px] rounded-full object-cover" alt="Avatar" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1 mt-[2px]">
                  <span className="font-bold text-[16px]">Alex Morgan</span>
                  <VerifiedBadge className="w-[16px] h-[16px] text-[#2ECC71]" />
                  <span className="text-[#8B8D93] text-[14px] ml-1">@alexmorgan</span>
                  <span className="text-[#8B8D93] text-[14px] px-0.5">·</span>
                  <span className="text-[#8B8D93] text-[14px]">2h</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-[#24133D] text-[#A770EF] text-[11px] font-bold px-[8px] py-[4px] rounded-md tracking-wide">Creator</span>
              <button className="text-[#8B8D93] hover:text-white transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="pl-[56px]">
            <p className="text-[15px] text-[#E5E7EB] leading-[1.5] mb-3">
              Small daily habits compound into big life changes. Here are 3 that changed my mornings completely.
            </p>
            
            <div className="rounded-[16px] overflow-hidden mb-3 border border-[#16181D]">
              <img 
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop" 
                alt="Coffee on desk" 
                className="w-full h-auto object-cover max-h-[220px]"
              />
            </div>

            <div className="flex items-center justify-between text-[#8B8D93] pr-4 mt-2">
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <MessageCircle className="w-[18px] h-[18px]" strokeWidth={1.5} />
                <span className="text-[13px] font-medium">128</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Repeat className="w-[18px] h-[18px]" strokeWidth={1.5} />
                <span className="text-[13px] font-medium">342</span>
              </div>
              <div className="flex items-center gap-2 text-[#FF3B30] cursor-pointer">
                <Heart className="w-[18px] h-[18px] fill-[#FF3B30]" strokeWidth={2} />
                <span className="text-[13px] font-medium">1.2K</span>
              </div>
              <button className="hover:text-white transition-colors cursor-pointer">
                <ShareIcon className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </article>

        {/* POST 2: Northside Newsroom (Text with side image layout) */}
        <article className="flex flex-col px-4 pt-5 pb-3 border-b border-[#121419]">
          <div className="flex justify-between items-start mb-2">
            <div className="flex gap-3">
              <div className="w-[44px] h-[44px] rounded-xl border border-[#24133D] bg-[#0F081C] flex items-center justify-center overflow-hidden">
                 <span className="text-[#A770EF] text-[24px] font-bold font-serif leading-none italic">N</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 mt-[2px]">
                  <span className="font-bold text-[16px]">Northside Newsroom</span>
                  <VerifiedBadge className="w-[16px] h-[16px] text-[#2ECC71]" />
                  <span className="text-[#8B8D93] text-[14px] ml-1">@northsidenews</span>
                  <span className="text-[#8B8D93] text-[14px] px-0.5">·</span>
                  <span className="text-[#8B8D93] text-[14px]">3h</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-[#0A1F16] text-[#2ECC71] text-[11px] font-bold px-[8px] py-[4px] rounded-md tracking-wide">Local</span>
              <button className="text-[#8B8D93] hover:text-white transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="pl-[56px] flex gap-3">
            <div className="flex-1 flex flex-col justify-between">
              <p className="text-[14.5px] text-[#E5E7EB] leading-[1.45] mb-2">
                City council approves new parks initiative 🌳<br/>
                More green spaces, more community events, more reasons to step outside.
              </p>
              <div className="flex items-center gap-1.5 text-[#8B8D93] mt-auto">
                <MapPin className="w-[14px] h-[14px]" strokeWidth={2} />
                <span className="text-[13px]">Northside, CA</span>
              </div>
            </div>
            
            {/* Side Image */}
            <div className="w-[110px] h-[110px] rounded-[14px] overflow-hidden shrink-0 border border-[#16181D]">
              <img 
                src="https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=400&auto=format&fit=crop" 
                alt="Park rendering" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="pl-[56px]">
            <div className="flex items-center justify-between text-[#8B8D93] pr-4 mt-4">
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <MessageCircle className="w-[18px] h-[18px]" strokeWidth={1.5} />
                <span className="text-[13px] font-medium">56</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Repeat className="w-[18px] h-[18px]" strokeWidth={1.5} />
                <span className="text-[13px] font-medium">89</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
                <span className="text-[13px] font-medium">412</span>
              </div>
              <button className="hover:text-white transition-colors cursor-pointer">
                <ShareIcon className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </article>

        {/* POST 3: Jason Lin */}
        <article className="flex flex-col px-4 pt-5 pb-0 border-b border-[#121419]">
          <div className="flex justify-between items-start mb-3">
            <div className="flex gap-3">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" className="w-[44px] h-[44px] rounded-full object-cover" alt="Avatar" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1 mt-[2px]">
                  <span className="font-bold text-[16px]">Jason Lin</span>
                  <VerifiedBadge className="w-[16px] h-[16px] text-[#2ECC71]" />
                  <span className="text-[#8B8D93] text-[14px] ml-1">@jasonlin</span>
                  <span className="text-[#8B8D93] text-[14px] px-0.5">·</span>
                  <span className="text-[#8B8D93] text-[14px]">4h</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-[#0A1A2F] text-[#3B82F6] text-[11px] font-bold px-[8px] py-[4px] rounded-md tracking-wide">Tech</span>
              <button className="text-[#8B8D93] hover:text-white transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="pl-[56px]">
            <p className="text-[15px] text-[#E5E7EB] leading-[1.5] mb-3">
              Big news: Open-source AI models just got a major upgrade. Here's what it means 👇
            </p>
            
            <div className="rounded-t-[16px] overflow-hidden border-t border-l border-r border-[#16181D] h-[80px]">
              <img 
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop" 
                alt="AI Tech" 
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </article>
      </div>

      {/* --- NEW BOTTOM NAVIGATION BAR --- */}
      <div className="fixed bottom-0 left-0 w-full h-[88px] bg-[#040508]/95 backdrop-blur-xl border-t border-[#121419] flex justify-between items-start px-[18px] pt-3 pb-6 z-50">
        
        {/* Home (Active - Outline Icon) */}
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]">
          <HomeNavIconOutline className="w-[24px] h-[24px] text-[#2ECC71]" />
          <span className="text-[10px] text-[#2ECC71] font-bold">Home</span>
        </button>
        
        {/* Markets */}
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]">
          <BarChart3 className="w-[24px] h-[24px] text-[#8B8D93]" strokeWidth={1.5} />
          <span className="text-[10px] text-[#8B8D93] font-medium">Markets</span>
        </button>
        
        {/* Communities */}
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]">
          <CommunitiesNavIcon className="w-[24px] h-[24px] text-[#8B8D93]" />
          <span className="text-[10px] text-[#8B8D93] font-medium">Communities</span>
        </button>
        
        {/* Portfolio */}
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]">
          <PieChart className="w-[24px] h-[24px] text-[#8B8D93]" strokeWidth={1.5} />
          <span className="text-[10px] text-[#8B8D93] font-medium">Portfolio</span>
        </button>
        
        {/* Profile */}
        <button className="flex flex-col items-center gap-1.5 min-w-[56px]">
          <User className="w-[24px] h-[24px] text-[#8B8D93]" strokeWidth={1.5} />
          <span className="text-[10px] text-[#8B8D93] font-medium">Profile</span>
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

// Custom Top Right Compose Icon (Square with angled pen)
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

// Share/Upload Icon for posts
function ShareIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

// New Home Nav Icon (Outline house with slightly rounded roof)
function HomeNavIconOutline(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

// New Communities Nav Icon (3 people outline)
function CommunitiesNavIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}