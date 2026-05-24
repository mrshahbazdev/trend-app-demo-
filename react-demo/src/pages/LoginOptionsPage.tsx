import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ShieldCheck, ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
import NewLogo from '../components/NewLogo';
import { useTheme } from '../context/ThemeContext';

function WalletIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1" />
      <path d="M16 10h5v4h-5a2 2 0 0 1 0-4Z" />
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

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" fill="currentColor" className={className}>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

export default function LoginOptionsPage() {
  const navigate = useNavigate();
  const { t } = useTheme();
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 font-sans antialiased" style={{ backgroundColor: t.bg, color: t.text }}>
      <div className="flex flex-col items-center mb-8">
        <NewLogo className="w-[80px] h-[80px] mb-2" />
        <h1 className="text-[28px] font-bold tracking-tight mt-1">TrendUpLive</h1>
      </div>

      <div className="w-full max-w-[360px] flex flex-col">
        <div className="flex flex-col gap-[10px]">
          <button
            onClick={() => navigate('/wallet-connected')}
            className="flex items-center w-full h-[56px] px-4 bg-[#0D111A] border border-[#1C212D] rounded-[14px] hover:bg-[#121722] transition-colors group"
          >
            <WalletIcon className="w-5 h-5 text-white mr-4" />
            <span className="text-[15px] text-[#F3F4F6] font-normal">Connect wallet</span>
            <div className="ml-auto flex items-center justify-center px-2.5 py-1 border border-[#232936] rounded-[6px] bg-[#10151F] group-hover:bg-[#161C28] transition-colors">
              <span className="text-[12px] text-[#7A818E] font-medium leading-none tracking-wide">Web3</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/login')}
            className="flex items-center w-full h-[56px] px-4 bg-[#0D111A] border border-[#1C212D] rounded-[14px] hover:bg-[#121722] transition-colors"
          >
            <Mail className="w-5 h-5 text-white mr-4" strokeWidth={1.5} />
            <span className="text-[15px] text-[#F3F4F6] font-normal">Email magic link</span>
          </button>

          {/* More Options Button */}
          <button
            type="button"
            onClick={() => { setShowMore(prev => !prev); }}
            className="flex items-center w-full h-[56px] px-4 bg-[#0D111A] border border-[#1C212D] rounded-[14px] hover:bg-[#121722] transition-colors"
          >
            <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center mr-4">
              <MoreHorizontal className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </div>
            <span className="text-[15px] text-[#F3F4F6] font-normal">More options</span>
            <div className="ml-auto">
              {showMore ? <ChevronUp className="w-5 h-5 text-[#7A818E]" /> : <ChevronDown className="w-5 h-5 text-[#7A818E]" />}
            </div>
          </button>

          {/* Expandable Social Login Options */}
          {showMore && (
            <div className="flex flex-col gap-[10px] animate-in">
              <button
                onClick={() => navigate('/auth/google')}
                className="flex items-center w-full h-[56px] px-4 bg-[#0D111A] border border-[#1C212D] rounded-[14px] hover:bg-[#121722] transition-colors"
              >
                <GoogleIcon className="w-5 h-5 mr-4" />
                <span className="text-[15px] text-[#F3F4F6] font-normal">Continue with Google</span>
              </button>

              <button
                onClick={() => navigate('/auth/apple')}
                className="flex items-center w-full h-[56px] px-4 bg-[#0D111A] border border-[#1C212D] rounded-[14px] hover:bg-[#121722] transition-colors"
              >
                <AppleIcon className="w-5 h-5 text-white mr-4" />
                <span className="text-[15px] text-[#F3F4F6] font-normal">Continue with Apple</span>
              </button>

              <button
                onClick={() => navigate('/auth/github')}
                className="flex items-center w-full h-[56px] px-4 bg-[#0D111A] border border-[#1C212D] rounded-[14px] hover:bg-[#121722] transition-colors"
              >
                <GitHubIcon className="w-5 h-5 text-white mr-4" />
                <span className="text-[15px] text-[#F3F4F6] font-normal">Continue with GitHub</span>
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 mb-7 flex justify-center">
          <button
            onClick={() => navigate('/home')}
            className="text-[14.5px] text-[#A6ABB5] hover:text-[#F3F4F6] transition-colors font-normal"
          >
            Browse without account
          </button>
        </div>

        <div className="h-[1px] bg-[#1C212D] w-full mb-6"></div>

        <div className="flex items-start gap-[14px] px-1">
          <ShieldCheck className="w-[20px] h-[20px] text-[#7A818E] shrink-0 mt-[1px]" strokeWidth={1.5} />
          <div className="text-[14px] leading-[1.5] text-[#7A818E] font-normal">
            Private chats need @handle or wallet + password.<br/>
            <button className="hover:text-[#F3F4F6] transition-colors text-[#A6ABB5]">Learn more</button>
          </div>
        </div>
      </div>
    </div>
  );
}
