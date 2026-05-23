import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Lightbulb, CheckCircle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <div className="flex justify-between items-center mb-[28px]">
          <h2 className="text-[26px] sm:text-[28px] font-bold leading-none tracking-tight">Unlock Private chat</h2>
          <div className="flex items-center gap-1.5 text-[#8B8D93]">
            <span className="text-[13px] font-normal">Wallet connected</span>
            <CheckCircle className="w-4 h-4" strokeWidth={1.5} />
          </div>
        </div>

        {/* Form Container */}
        <div className="flex flex-col gap-5">
          
          {/* Create Password Input Group */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[#A0A2A8] text-[15px] font-normal px-1">
              TrendUp password (for this wallet)
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-[18px] w-5 h-5 text-[#8B8D93]" strokeWidth={1.5} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter password" 
                className="w-full h-[56px] bg-[#0A0B0F] border border-[#23252A] rounded-[14px] pl-[3.5rem] pr-12 text-[#F3F4F6] placeholder-[#6A6C73] focus:outline-none focus:border-[#4A4D55] transition-colors text-[16px]"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-[18px] text-[#8B8D93] hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" strokeWidth={1.5} /> : <Eye className="w-5 h-5" strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input Group */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[#A0A2A8] text-[15px] font-normal px-1">
              Confirm password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-[18px] w-5 h-5 text-[#8B8D93]" strokeWidth={1.5} />
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Confirm password" 
                className="w-full h-[56px] bg-[#0A0B0F] border border-[#23252A] rounded-[14px] pl-[3.5rem] pr-12 text-[#F3F4F6] placeholder-[#6A6C73] focus:outline-none focus:border-[#4A4D55] transition-colors text-[16px]"
              />
              <button 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-[18px] text-[#8B8D93] hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" strokeWidth={1.5} /> : <Eye className="w-5 h-5" strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          {/* Password Hint Input Group */}
          <div className="flex flex-col gap-2.5 mb-1">
            <label className="text-[#A0A2A8] text-[15px] font-normal px-1">
              Password hint <span className="text-[#6A6C73]">(optional)</span>
            </label>
            <div className="relative flex items-center">
              <Lightbulb className="absolute left-[18px] w-5 h-5 text-[#8B8D93]" strokeWidth={1.5} />
              <input 
                type="text" 
                placeholder="Enter a hint (e.g., first pet's name)" 
                className="w-full h-[56px] bg-[#0A0B0F] border border-[#23252A] rounded-[14px] pl-[3.5rem] pr-4 text-[#F3F4F6] placeholder-[#6A6C73] focus:outline-none focus:border-[#4A4D55] transition-colors text-[16px]"
              />
            </div>
            <p className="text-[#6A6C73] text-[13px] px-1 mt-0.5">
              For this wallet account only. Shown if you mistype.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-1">
            {/* Primary Button */}
            <button className="w-full h-[56px] rounded-[14px] bg-gradient-to-b from-[#FFFFFF] via-[#D1D1D1] to-[#8C8D92] text-black font-semibold text-[17px] shadow-[0_2px_4px_rgba(255,255,255,0.05)] hover:opacity-90 transition-opacity flex justify-center items-center">
              Save and unlock Private
            </button>

            {/* Secondary Button */}
            <button className="w-full h-[56px] rounded-[14px] bg-transparent border border-[#23252A] text-[#E0E0E0] font-normal text-[16px] hover:bg-[#15171C] transition-colors flex justify-center items-center">
              Skip for now
            </button>
          </div>

          {/* Bottom Helper Text */}
          <p className="text-[#6A6C73] text-[13px] text-center mt-2 px-2">
            Wallet stays connected. Password only for Private/Secret.
          </p>

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