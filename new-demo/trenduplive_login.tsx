import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, ShieldCheck, Wallet, MoreHorizontal, ChevronDown, ChevronRight, Check } from 'lucide-react';

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);
  const [rememberPass, setRememberPass] = useState(false);

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
        <div className="flex justify-between items-end mb-[28px]">
          <h2 className="text-[32px] font-bold leading-none tracking-tight">Log in</h2>
          <p className="text-[#8B8D93] text-[14px] font-medium pb-[3px]">
            New here? <a href="#" className="text-white hover:underline ml-1">Create account</a>
          </p>
        </div>

        {/* Form Container */}
        <div className="flex flex-col gap-[14px]">
          
          {/* Username Input */}
          <div className="relative flex items-center">
            <User className="absolute left-[18px] w-5 h-5 text-[#8B8D93]" strokeWidth={2} />
            <input 
              type="text" 
              placeholder="Username or @handle" 
              className="w-full h-[56px] bg-[#0A0B0F] border border-[#23252A] rounded-[14px] pl-[3.5rem] pr-4 text-[#F3F4F6] placeholder-[#6A6C73] focus:outline-none focus:border-[#4A4D55] transition-colors text-[16px]"
            />
          </div>

          {/* Password Input */}
          <div className="relative flex items-center">
            <Lock className="absolute left-[18px] w-5 h-5 text-[#8B8D93]" strokeWidth={2} />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              className="w-full h-[56px] bg-[#0A0B0F] border border-[#23252A] rounded-[14px] pl-[3.5rem] pr-12 text-[#F3F4F6] placeholder-[#6A6C73] focus:outline-none focus:border-[#4A4D55] transition-colors text-[16px]"
            />
            <button 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-[18px] text-[#8B8D93] hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" strokeWidth={1.5} /> : <Eye className="w-5 h-5" strokeWidth={1.5} />}
            </button>
          </div>

          {/* Options Row */}
          <div className="flex flex-col gap-3 mt-1 mb-2 px-1">
            {/* Remember Username */}
            <label className="flex items-center cursor-pointer group w-max">
              <div className={`w-[18px] h-[18px] border rounded-[4px] flex items-center justify-center mr-3 transition-colors ${rememberUser ? 'bg-[#23252A] border-[#23252A]' : 'border-[#3A3C40] group-hover:border-[#5A5C60]'}`}>
                {rememberUser && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
              </div>
              <span className="text-[#8B8D93] text-[15px] select-none group-hover:text-[#A0A2A8] transition-colors">Remember username</span>
            </label>

            {/* Remember Password & Forgot Password */}
            <div className="flex justify-between items-center w-full">
              <label className="flex items-center cursor-pointer group">
                <div className={`w-[18px] h-[18px] border rounded-[4px] flex items-center justify-center mr-3 transition-colors ${rememberPass ? 'bg-[#23252A] border-[#23252A]' : 'border-[#3A3C40] group-hover:border-[#5A5C60]'}`}>
                  {rememberPass && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                </div>
                <span className="text-[#8B8D93] text-[15px] select-none group-hover:text-[#A0A2A8] transition-colors">Remember password</span>
              </label>
              
              <a href="#" className="text-[#8B8D93] text-[15px] hover:text-white transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          {/* Primary Action Button (Metallic Gradient) */}
          <button className="w-full h-[54px] rounded-[14px] bg-gradient-to-b from-[#FFFFFF] via-[#D1D1D1] to-[#8C8D92] text-black font-semibold text-[17px] shadow-[0_2px_4px_rgba(255,255,255,0.05)] hover:opacity-90 transition-opacity flex justify-center items-center mt-2">
            Log in
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center mt-6 mb-[18px]">
            <div className="h-[1px] bg-[#1E2025] flex-1"></div>
            <span className="text-[#64666B] text-[14px] px-4 font-normal">Or continue with</span>
            <div className="h-[1px] bg-[#1E2025] flex-1"></div>
          </div>

          {/* Alternative Options */}
          
          {/* Connect Wallet */}
          <button className="w-full flex items-center h-[56px] px-5 bg-transparent border border-[#23252A] rounded-[14px] hover:bg-[#15171C] transition-colors group">
            <Wallet className="w-[20px] h-[20px] text-white mr-4" strokeWidth={1.5} />
            <span className="text-[#E0E0E0] text-[16px] font-normal">Connect wallet</span>
          </button>

          {/* More Options */}
          <button className="w-full flex items-center justify-between h-[56px] px-5 bg-transparent border border-[#23252A] rounded-[14px] hover:bg-[#15171C] transition-colors group">
            <div className="flex items-center">
              <div className="w-[20px] h-[20px] border border-white rounded-full flex items-center justify-center mr-4">
                 <MoreHorizontal className="w-3.5 h-3.5 text-white" strokeWidth={2} />
              </div>
              <span className="text-[#E0E0E0] text-[16px] font-normal">More options</span>
            </div>
            <ChevronDown className="w-5 h-5 text-[#8B8D93]" strokeWidth={2} />
          </button>

          {/* Log in as guest */}
          <button className="w-full flex items-center justify-between h-[64px] px-5 bg-transparent border border-[#23252A] rounded-[14px] hover:bg-[#15171C] transition-colors group">
            <div className="flex items-center">
              <User className="w-[20px] h-[20px] text-white mr-4" strokeWidth={1.5} />
              <div className="flex flex-col items-start">
                <span className="text-[#E0E0E0] text-[16px] font-normal leading-tight">Log in as guest</span>
                <span className="text-[#6A6C73] text-[13px] font-normal leading-tight mt-0.5">Browse public content only</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#8B8D93]" strokeWidth={2} />
          </button>

        </div>
      </div>

      {/* Footer */}
      <div className="mt-[32px] flex items-center text-[#64666B] space-x-2">
        <ShieldCheck className="w-[20px] h-[20px]" strokeWidth={1.5} />
        <span className="text-[14px] font-normal">Encrypted chats E2E</span>
      </div>
    </div>
  );
}

// Recreated Logo matching exactly the user's uploaded "lightLogo" image
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