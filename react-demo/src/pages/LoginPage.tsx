import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, ShieldCheck, Wallet, MoreHorizontal, ChevronDown, ChevronRight, Check } from 'lucide-react';
import NewLogo from '../components/NewLogo';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);
  const [rememberPass, setRememberPass] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError('');
    if (!username.trim()) { setError('Please enter your username'); return; }
    if (!password.trim()) { setError('Please enter your password'); return; }
    if (password.length < 4) { setError('Password must be at least 4 characters'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/home'); }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#020305] text-white flex flex-col items-center py-10 px-4 font-sans relative overflow-hidden antialiased">
      <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#1a2b4c]/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="flex flex-col items-center mb-8 z-10 mt-4">
        <NewLogo className="w-[105px] h-[105px] mb-2" />
        <h1 className="text-[34px] font-bold tracking-tight mt-1 text-white drop-shadow-md">TrendUpLive</h1>
      </div>

      <div className="w-full max-w-[440px] bg-[#0A0B0F] border border-[#1C1E23] rounded-[2rem] p-6 sm:p-8 z-10 shadow-2xl">
        <div className="flex justify-between items-end mb-[28px]">
          <h2 className="text-[32px] font-bold leading-none tracking-tight">Log in</h2>
          <p className="text-[#8B8D93] text-[14px] font-medium pb-[3px]">
            New here? <button onClick={() => navigate('/register')} className="text-white hover:underline ml-1">Create account</button>
          </p>
        </div>

        <div className="flex flex-col gap-[14px]">
          <div className="relative flex items-center">
            <User className="absolute left-[18px] w-5 h-5 text-[#8B8D93]" strokeWidth={2} />
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username or @handle" className={`w-full h-[56px] bg-[#0A0B0F] border rounded-[14px] pl-[3.5rem] pr-4 text-[#F3F4F6] placeholder-[#6A6C73] focus:outline-none transition-colors text-[16px] ${error && !username.trim() ? 'border-[#FF3B30]' : 'border-[#23252A] focus:border-[#4A4D55]'}`} />
          </div>

          <div className="relative flex items-center">
            <Lock className="absolute left-[18px] w-5 h-5 text-[#8B8D93]" strokeWidth={2} />
            <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="Password" className={`w-full h-[56px] bg-[#0A0B0F] border rounded-[14px] pl-[3.5rem] pr-12 text-[#F3F4F6] placeholder-[#6A6C73] focus:outline-none transition-colors text-[16px] ${error && !password.trim() ? 'border-[#FF3B30]' : 'border-[#23252A] focus:border-[#4A4D55]'}`} />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-[18px] text-[#8B8D93] hover:text-white transition-colors">
              {showPassword ? <EyeOff className="w-5 h-5" strokeWidth={1.5} /> : <Eye className="w-5 h-5" strokeWidth={1.5} />}
            </button>
          </div>

          <div className="flex flex-col gap-3 mt-1 mb-2 px-1">
            <label className="flex items-center cursor-pointer group w-max" onClick={() => setRememberUser(!rememberUser)}>
              <div className={`w-[18px] h-[18px] border rounded-[4px] flex items-center justify-center mr-3 transition-colors ${rememberUser ? 'bg-[#23252A] border-[#23252A]' : 'border-[#3A3C40] group-hover:border-[#5A5C60]'}`}>
                {rememberUser && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
              </div>
              <span className="text-[#8B8D93] text-[15px] select-none group-hover:text-[#A0A2A8] transition-colors">Remember username</span>
            </label>

            <div className="flex justify-between items-center w-full">
              <label className="flex items-center cursor-pointer group" onClick={() => setRememberPass(!rememberPass)}>
                <div className={`w-[18px] h-[18px] border rounded-[4px] flex items-center justify-center mr-3 transition-colors ${rememberPass ? 'bg-[#23252A] border-[#23252A]' : 'border-[#3A3C40] group-hover:border-[#5A5C60]'}`}>
                  {rememberPass && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                </div>
                <span className="text-[#8B8D93] text-[15px] select-none group-hover:text-[#A0A2A8] transition-colors">Remember password</span>
              </label>
              <button className="text-[#8B8D93] text-[15px] hover:text-white transition-colors">Forgot password?</button>
            </div>
          </div>

          {error && <p className="text-[#FF3B30] text-[13px] font-medium px-1 -mt-1">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-[54px] rounded-[14px] bg-gradient-to-b from-[#FFFFFF] via-[#D1D1D1] to-[#8C8D92] text-black font-semibold text-[17px] shadow-[0_2px_4px_rgba(255,255,255,0.05)] hover:opacity-90 transition-opacity flex justify-center items-center mt-2 disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>

          <div className="flex items-center justify-center mt-6 mb-[18px]">
            <div className="h-[1px] bg-[#1E2025] flex-1"></div>
            <span className="text-[#64666B] text-[14px] px-4 font-normal">Or continue with</span>
            <div className="h-[1px] bg-[#1E2025] flex-1"></div>
          </div>

          <button
            onClick={() => navigate('/wallet-connected')}
            className="w-full flex items-center h-[56px] px-5 bg-transparent border border-[#23252A] rounded-[14px] hover:bg-[#15171C] transition-colors group"
          >
            <Wallet className="w-[20px] h-[20px] text-white mr-4" strokeWidth={1.5} />
            <span className="text-[#E0E0E0] text-[16px] font-normal">Connect wallet</span>
          </button>

          <button className="w-full flex items-center justify-between h-[56px] px-5 bg-transparent border border-[#23252A] rounded-[14px] hover:bg-[#15171C] transition-colors group">
            <div className="flex items-center">
              <div className="w-[20px] h-[20px] border border-white rounded-full flex items-center justify-center mr-4">
                <MoreHorizontal className="w-3.5 h-3.5 text-white" strokeWidth={2} />
              </div>
              <span className="text-[#E0E0E0] text-[16px] font-normal">More options</span>
            </div>
            <ChevronDown className="w-5 h-5 text-[#8B8D93]" strokeWidth={2} />
          </button>

          <button
            onClick={() => navigate('/home')}
            className="w-full flex items-center justify-between h-[64px] px-5 bg-transparent border border-[#23252A] rounded-[14px] hover:bg-[#15171C] transition-colors group"
          >
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

      <div className="mt-[32px] flex items-center text-[#64666B] space-x-2">
        <ShieldCheck className="w-[20px] h-[20px]" strokeWidth={1.5} />
        <span className="text-[14px] font-normal">Encrypted chats E2E</span>
      </div>
    </div>
  );
}
