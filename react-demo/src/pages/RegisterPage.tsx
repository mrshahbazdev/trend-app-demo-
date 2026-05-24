import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, ShieldCheck, Wallet, MoreHorizontal, ChevronDown } from 'lucide-react';
import NewLogo from '../components/NewLogo';

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" fill="currentColor" className={className}>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center py-10 px-4 font-sans relative overflow-hidden antialiased">
      <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#1a2b4c]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="flex flex-col items-center mb-8 z-10 mt-4">
        <NewLogo className="w-[105px] h-[105px] mb-2" />
        <h1 className="text-[34px] font-bold tracking-tight mt-1">TrendUpLive</h1>
      </div>

      <div className="w-full max-w-[440px] bg-[#0C0D11] border border-[#1A1C22] rounded-[2rem] p-6 sm:p-8 z-10 shadow-2xl">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-[28px] font-bold leading-none tracking-tight">Create account</h2>
          <p className="text-[#8B8D93] text-[14px] font-medium pb-1">
            Already have an account? <button onClick={() => navigate('/login')} className="text-white hover:underline ml-1">Log in</button>
          </p>
        </div>

        <div className="flex flex-col gap-[14px]">
          <button className="w-full flex items-center h-[56px] px-4 bg-transparent border border-[#23252A] rounded-2xl hover:bg-[#15171C] transition-colors group">
            <AppleIcon className="w-[22px] h-[22px] text-white ml-1 mr-4" />
            <span className="text-[#8B8D93] group-hover:text-gray-300 transition-colors text-[16px] font-medium tracking-wide">Continue with Apple ID</span>
          </button>

          <div className="relative flex items-center">
            <User className="absolute left-[18px] w-5 h-5 text-[#8B8D93]" strokeWidth={2.5} />
            <input type="text" placeholder="Choose username or @handle" className="w-full h-[56px] bg-transparent border border-[#23252A] rounded-2xl pl-[3.5rem] pr-4 text-white placeholder-[#787A80] focus:outline-none focus:border-[#4A4D55] transition-colors text-[16px]" />
          </div>

          <div className="relative flex items-center">
            <Lock className="absolute left-[18px] w-5 h-5 text-[#8B8D93]" strokeWidth={2.5} />
            <input type={showPassword ? "text" : "password"} placeholder="Create password" className="w-full h-[56px] bg-transparent border border-[#23252A] rounded-2xl pl-[3.5rem] pr-12 text-white placeholder-[#787A80] focus:outline-none focus:border-[#4A4D55] transition-colors text-[16px]" />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-5 text-[#8B8D93] hover:text-white transition-colors">
              {showPassword ? <EyeOff className="w-[22px] h-[22px]" strokeWidth={2} /> : <Eye className="w-[22px] h-[22px]" strokeWidth={2} />}
            </button>
          </div>

          <div className="relative flex items-center">
            <Lock className="absolute left-[18px] w-5 h-5 text-[#8B8D93]" strokeWidth={2.5} />
            <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" className="w-full h-[56px] bg-transparent border border-[#23252A] rounded-2xl pl-[3.5rem] pr-12 text-white placeholder-[#787A80] focus:outline-none focus:border-[#4A4D55] transition-colors text-[16px]" />
            <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-5 text-[#8B8D93] hover:text-white transition-colors">
              {showConfirmPassword ? <EyeOff className="w-[22px] h-[22px]" strokeWidth={2} /> : <Eye className="w-[22px] h-[22px]" strokeWidth={2} />}
            </button>
          </div>

          <div className="relative flex items-center">
            <div className="absolute left-[18px] text-[#8B8D93] flex items-center justify-center border-2 border-[#8B8D93] rounded-md w-[22px] h-[22px]">
              <span className="text-[14px] font-bold leading-none mt-[1px]">?</span>
            </div>
            <input type="text" placeholder="Recovery hint" className="w-full h-[56px] bg-transparent border border-[#23252A] rounded-2xl pl-[3.5rem] pr-4 text-white placeholder-[#787A80] focus:outline-none focus:border-[#4A4D55] transition-colors text-[16px]" />
          </div>

          <p className="text-[#64666B] text-[13px] px-1 mt-[-2px] mb-1">
            A private hint to help you remember your password. Not a reset method.
          </p>

          <button
            onClick={() => navigate('/home')}
            className="w-full h-[54px] rounded-[14px] bg-gradient-to-b from-[#FFFFFF] via-[#E2E2E2] to-[#999A9F] text-black font-semibold text-[17px] shadow-[0_2px_4px_rgba(255,255,255,0.1)] hover:opacity-90 transition-opacity flex justify-center items-center mt-1"
          >
            Create with Apple
          </button>

          <div className="flex items-center justify-center my-[18px]">
            <div className="h-[1px] bg-[#1E2025] flex-1"></div>
            <span className="text-[#64666B] text-[14px] px-4 font-medium">Or sign up with</span>
            <div className="h-[1px] bg-[#1E2025] flex-1"></div>
          </div>

          <button
            onClick={() => navigate('/wallet-connected')}
            className="w-full flex items-center h-[56px] px-5 bg-transparent border border-[#23252A] rounded-2xl hover:bg-[#15171C] transition-colors group"
          >
            <Wallet className="w-[22px] h-[22px] text-white mr-4" strokeWidth={2} />
            <span className="text-[#E0E0E0] text-[16px] font-medium">Create with wallet</span>
          </button>

          <button className="w-full flex items-center h-[56px] px-5 bg-transparent border border-[#23252A] rounded-2xl hover:bg-[#15171C] transition-colors group">
            <GoogleIcon className="w-[22px] h-[22px] text-white mr-4" />
            <span className="text-[#E0E0E0] text-[16px] font-medium">Create with Google</span>
          </button>

          <button className="w-full flex items-center justify-between h-[56px] px-5 bg-transparent border border-[#23252A] rounded-2xl hover:bg-[#15171C] transition-colors group">
            <div className="flex items-center">
              <div className="w-[22px] h-[22px] border-2 border-white rounded-full flex items-center justify-center mr-4">
                <MoreHorizontal className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
              <span className="text-[#E0E0E0] text-[16px] font-medium">More options</span>
            </div>
            <ChevronDown className="w-5 h-5 text-[#8B8D93]" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="mt-8 flex items-center text-[#64666B] space-x-2">
        <ShieldCheck className="w-[22px] h-[22px]" strokeWidth={2} />
        <span className="text-[14px] font-medium">Encrypted chats E2E</span>
      </div>
    </div>
  );
}
