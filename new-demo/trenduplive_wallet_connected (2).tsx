import React from 'react';
import { Wallet, Check, Lock, ChevronRight, ShieldCheck } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#020305] text-white flex flex-col items-center py-10 px-4 font-sans relative overflow-hidden antialiased">
      {/* Subtle background glow */}
      <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#1a2b4c]/15 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Logo Section */}
      <div className="flex flex-col items-center mb-8 z-10 mt-4">
        <NewLogo className="w-[105px] h-[105px] mb-2" />
        <h1 className="text-[34px] font-bold tracking-tight mt-1 text-white shadow-black drop-shadow-md">TrendUpLive</h1>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[440px] bg-[#0A0B0F] border border-[#1C1E23] rounded-[2rem] p-6 sm:p-8 z-10 shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-[26px]">
          <div className="flex items-center gap-2.5 mt-1">
            <h2 className="text-[28px] sm:text-[30px] font-bold leading-none tracking-tight">Wallet connected</h2>
            <SolidGreenCheck className="w-6 h-6 mt-[2px]" />
          </div>
          
          <div className="flex flex-col items-end pt-[2px]">
            <span className="text-[#8B8D93] text-[13px] font-normal mb-[2px]">Prefer @handle?</span>
            <a href="#" className="text-[#F3F4F6] text-[14px] font-medium hover:underline">Create account</a>
          </div>
        </div>

        {/* Form/Action Container */}
        <div className="flex flex-col gap-6">
          
          {/* Active Wallet Display */}
          <div className="w-full flex items-center h-[60px] px-[18px] bg-[#0A0B0F] border border-[#23252A] rounded-[14px]">
            <Wallet className="w-[22px] h-[22px] text-white mr-4" strokeWidth={1.5} />
            <span className="text-[#8B8D93] text-[16px] font-normal flex-1">Wallet connected</span>
            <Check className="w-5 h-5 text-[#2ECC71]" strokeWidth={2.5} />
          </div>

          {/* Features List */}
          <div className="flex flex-col mt-[-4px] mb-[-4px] px-1">
            <p className="text-[#E0E0E0] text-[16px] font-medium mb-3.5">You can use TrendUp for:</p>
            <ul className="flex flex-col gap-[12px]">
              {['Feed, live, markets', 'Voting', 'Open chats (encrypted)'].map((text, i) => (
                <li key={i} className="flex items-center gap-3.5">
                  <div className="w-[5px] h-[5px] rounded-full bg-[#64666B] ml-1"></div>
                  <span className="text-[#8B8D93] text-[15px] font-normal">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Security Notice Box */}
          <div className="flex items-center gap-4 p-[14px] rounded-[14px] border border-[#23252A] bg-[#0A0B0F]">
            <div className="w-[42px] h-[42px] rounded-full border border-[#23252A] flex items-center justify-center shrink-0 bg-[#0E1015]">
              <ShieldLockIcon className="w-5 h-5 text-[#8B8D93]" />
            </div>
            <p className="text-[#8B8D93] text-[14px] leading-[1.45] font-normal">
              Private & Secret chat needs a<br />TrendUp password on this wallet.
            </p>
          </div>

          {/* Primary Action Button (Metallic Gradient) */}
          <button className="w-full h-[56px] rounded-[14px] bg-gradient-to-b from-[#FFFFFF] via-[#D1D1D1] to-[#8C8D92] text-black font-semibold text-[17px] shadow-[0_2px_4px_rgba(255,255,255,0.05)] hover:opacity-90 transition-opacity flex justify-center items-center mt-[-2px]">
            Continue — browse & vote
          </button>

          {/* Set Chat Password Button */}
          <button className="w-full flex items-center justify-between h-[60px] px-[18px] bg-transparent border border-[#23252A] rounded-[14px] hover:bg-[#15171C] transition-colors group mt-[-4px]">
            <div className="flex items-center">
              <Lock className="w-[20px] h-[20px] text-[#8B8D93] mr-4" strokeWidth={1.5} />
              <span className="text-[#A0A2A8] group-hover:text-[#E0E0E0] transition-colors text-[16px] font-normal">Set chat password now</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#8B8D93]" strokeWidth={1.5} />
          </button>

        </div>
      </div>

      {/* Footer */}
      <div className="mt-[32px] flex items-center text-[#64666B] space-x-2">
        <ShieldCheck className="w-[20px] h-[20px]" strokeWidth={1.5} />
        <span className="text-[14px] font-normal">Encrypted chats</span>
      </div>
    </div>
  );
}

// Custom Solid Green Check SVG to match the header exactly
function SolidGreenCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="10" fill="#2ECC71" />
      <path d="M8 12.5L10.5 15L16 9" stroke="#0A0B0F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Custom Shield with Inner Lock SVG to match the info box exactly
function ShieldLockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Outer Shield */}
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      {/* Inner Lock Base */}
      <rect x="9" y="11" width="6" height="5" rx="1" fill="currentColor" stroke="none" />
      {/* Inner Lock Shackle */}
      <path d="M10.5 11V9.5C10.5 8.67157 11.1716 8 12 8C12.8284 8 13.5 8.67157 13.5 9.5V11" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

// Recreated Logo matching exactly the user's uploaded image
function NewLogo(props) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        {/* Outer Ring Gradient (Yellow -> Red -> Purple -> Blue -> Cyan) */}
        <linearGradient id="outer-gradient" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB300" />
          <stop offset="25%" stopColor="#FF1744" />
          <stop offset="50%" stopColor="#D500F9" />
          <stop offset="75%" stopColor="#2979FF" />
          <stop offset="100%" stopColor="#00E5FF" />
        </linearGradient>

        {/* Inner Smile Gradient (Green -> Cyan) */}
        <linearGradient id="inner-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#00E676" />
          <stop offset="100%" stopColor="#00B8D4" />
        </linearGradient>
      </defs>

      {/* Outer Ring */}
      <path 
        d="M 60 16 A 37 37 0 1 0 78 67" 
        stroke="url(#outer-gradient)" 
        strokeWidth="9" 
        strokeLinecap="round" 
      />

      {/* Inner Smile */}
      <path 
        d="M 37 61 A 21 21 0 0 0 73 48" 
        stroke="url(#inner-gradient)" 
        strokeWidth="9" 
        strokeLinecap="round" 
      />

      {/* Trend Line joining the dots */}
      <path 
        d="M 35 52 L 46 43 L 55 43 L 64 35 L 75 25" 
        stroke="#FFB300" 
        strokeWidth="3.5" 
      />

      {/* Multi-colored trend dots */}
      <circle cx="35" cy="52" r="4.5" fill="#FF4B4B" /> {/* Red */}
      <circle cx="46" cy="43" r="4.5" fill="#FFB300" /> {/* Orange */}
      <circle cx="55" cy="43" r="4.5" fill="#FFD500" /> {/* Yellow */}
      <circle cx="64" cy="35" r="4.5" fill="#FFE600" /> {/* Light Yellow */}

      {/* Green Arrow Head */}
      <path d="M 68 23 L 79 19 L 77 31 Z" fill="#2ECC71" stroke="#2ECC71" strokeLinejoin="round" strokeWidth="1" />
    </svg>
  );
}