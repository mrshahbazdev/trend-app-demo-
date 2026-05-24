import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Lightbulb, CheckCircle, ShieldCheck } from 'lucide-react';
import NewLogo from '../components/NewLogo';

export default function UnlockPrivateChatPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#020305] text-white flex flex-col items-center py-10 px-4 font-sans relative overflow-hidden antialiased">
      <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#1a2b4c]/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="flex flex-col items-center mb-8 z-10 mt-4">
        <NewLogo className="w-[105px] h-[105px] mb-2" />
        <h1 className="text-[34px] font-bold tracking-tight mt-1 text-white drop-shadow-md">TrendUpLive</h1>
      </div>

      <div className="w-full max-w-[440px] bg-[#0A0B0F] border border-[#1C1E23] rounded-[2rem] p-6 sm:p-8 z-10 shadow-2xl">
        <div className="flex justify-between items-center mb-[28px]">
          <h2 className="text-[26px] sm:text-[28px] font-bold leading-none tracking-tight">Unlock Private chat</h2>
          <div className="flex items-center gap-1.5 text-[#8B8D93]">
            <span className="text-[13px] font-normal">Wallet connected</span>
            <CheckCircle className="w-4 h-4" strokeWidth={1.5} />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2.5">
            <label className="text-[#A0A2A8] text-[15px] font-normal px-1">
              TrendUp password (for this wallet)
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-[18px] w-5 h-5 text-[#8B8D93]" strokeWidth={1.5} />
              <input type={showPassword ? "text" : "password"} placeholder="Enter password" className="w-full h-[56px] bg-[#0A0B0F] border border-[#23252A] rounded-[14px] pl-[3.5rem] pr-12 text-[#F3F4F6] placeholder-[#6A6C73] focus:outline-none focus:border-[#4A4D55] transition-colors text-[16px]" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-[18px] text-[#8B8D93] hover:text-white transition-colors">
                {showPassword ? <EyeOff className="w-5 h-5" strokeWidth={1.5} /> : <Eye className="w-5 h-5" strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-[#A0A2A8] text-[15px] font-normal px-1">Confirm password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-[18px] w-5 h-5 text-[#8B8D93]" strokeWidth={1.5} />
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" className="w-full h-[56px] bg-[#0A0B0F] border border-[#23252A] rounded-[14px] pl-[3.5rem] pr-12 text-[#F3F4F6] placeholder-[#6A6C73] focus:outline-none focus:border-[#4A4D55] transition-colors text-[16px]" />
              <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-[18px] text-[#8B8D93] hover:text-white transition-colors">
                {showConfirmPassword ? <EyeOff className="w-5 h-5" strokeWidth={1.5} /> : <Eye className="w-5 h-5" strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 mb-1">
            <label className="text-[#A0A2A8] text-[15px] font-normal px-1">
              Password hint <span className="text-[#6A6C73]">(optional)</span>
            </label>
            <div className="relative flex items-center">
              <Lightbulb className="absolute left-[18px] w-5 h-5 text-[#8B8D93]" strokeWidth={1.5} />
              <input type="text" placeholder="Enter a hint (e.g., first pet's name)" className="w-full h-[56px] bg-[#0A0B0F] border border-[#23252A] rounded-[14px] pl-[3.5rem] pr-4 text-[#F3F4F6] placeholder-[#6A6C73] focus:outline-none focus:border-[#4A4D55] transition-colors text-[16px]" />
            </div>
            <p className="text-[#6A6C73] text-[13px] px-1 mt-0.5">
              For this wallet account only. Shown if you mistype.
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-1">
            <button
              onClick={() => navigate('/home')}
              className="w-full h-[56px] rounded-[14px] bg-gradient-to-b from-[#FFFFFF] via-[#D1D1D1] to-[#8C8D92] text-black font-semibold text-[17px] shadow-[0_2px_4px_rgba(255,255,255,0.05)] hover:opacity-90 transition-opacity flex justify-center items-center"
            >
              Unlock private chat
            </button>
            <button
              onClick={() => navigate('/home')}
              className="w-full h-[50px] flex justify-center items-center text-[#8B8D93] text-[15px] font-normal hover:text-white transition-colors"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-[32px] flex items-center text-[#64666B] space-x-2">
        <ShieldCheck className="w-[20px] h-[20px]" strokeWidth={1.5} />
        <span className="text-[14px] font-normal">Encrypted chats</span>
      </div>
    </div>
  );
}
