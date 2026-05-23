import React from 'react';
import { Mail, ShieldCheck } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#07090E] text-white flex justify-center items-center p-4 font-sans antialiased">
      <div className="w-full max-w-[360px] flex flex-col">
        
        {/* Auth Options List */}
        <div className="flex flex-col gap-[10px]">
          
          {/* Connect Wallet */}
          <button className="flex items-center w-full h-[56px] px-4 bg-[#0D111A] border border-[#1C212D] rounded-[14px] hover:bg-[#121722] transition-colors group">
            <WalletIcon className="w-5 h-5 text-white mr-4" />
            <span className="text-[15px] text-[#F3F4F6] font-normal">Connect wallet</span>
            <div className="ml-auto flex items-center justify-center px-2.5 py-1 border border-[#232936] rounded-[6px] bg-[#10151F] group-hover:bg-[#161C28] transition-colors">
              <span className="text-[12px] text-[#7A818E] font-medium leading-none tracking-wide">Web3</span>
            </div>
          </button>

          {/* Continue with Google */}
          <button className="flex items-center w-full h-[56px] px-4 bg-[#0D111A] border border-[#1C212D] rounded-[14px] hover:bg-[#121722] transition-colors">
            <GoogleIcon className="w-5 h-5 mr-4" />
            <span className="text-[15px] text-[#F3F4F6] font-normal">Continue with Google</span>
          </button>

          {/* Continue with Apple */}
          <button className="flex items-center w-full h-[56px] px-4 bg-[#0D111A] border border-[#1C212D] rounded-[14px] hover:bg-[#121722] transition-colors">
            <AppleIcon className="w-5 h-5 text-white mr-4" />
            <span className="text-[15px] text-[#F3F4F6] font-normal">Continue with Apple</span>
          </button>

          {/* Continue with GitHub */}
          <button className="flex items-center w-full h-[56px] px-4 bg-[#0D111A] border border-[#1C212D] rounded-[14px] hover:bg-[#121722] transition-colors">
            <GitHubIcon className="w-5 h-5 text-white mr-4" />
            <span className="text-[15px] text-[#F3F4F6] font-normal">Continue with GitHub</span>
          </button>

          {/* Email magic link */}
          <button className="flex items-center w-full h-[56px] px-4 bg-[#0D111A] border border-[#1C212D] rounded-[14px] hover:bg-[#121722] transition-colors">
            <Mail className="w-5 h-5 text-white mr-4" strokeWidth={1.5} />
            <span className="text-[15px] text-[#F3F4F6] font-normal">Email magic link</span>
          </button>

        </div>

        {/* Browse without account */}
        <div className="mt-8 mb-7 flex justify-center">
          <button className="text-[14.5px] text-[#A6ABB5] hover:text-[#F3F4F6] transition-colors font-normal">
            Browse without account
          </button>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-[#1C212D] w-full mb-6"></div>

        {/* Footer Notice */}
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

// ---- Custom Inline SVGs tailored for this screen ----

function WalletIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1" />
      <path d="M16 10h5v4h-5a2 2 0 0 1 0-4Z" />
    </svg>
  );
}

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function AppleIcon(props) {
  return (
    <svg viewBox="0 0 384 512" fill="currentColor" {...props}>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}