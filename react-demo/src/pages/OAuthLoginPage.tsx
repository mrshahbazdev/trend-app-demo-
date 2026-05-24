import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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

const providerConfig = {
  google: {
    name: 'Google',
    color: '#4285F4',
    bgColor: '#FFFFFF',
    textColor: '#3C4043',
    inputBg: '#F1F3F4',
    borderColor: '#DADCE0',
    buttonBg: '#1A73E8',
    buttonText: '#FFFFFF',
    icon: GoogleIcon,
    emailPlaceholder: 'Email or phone',
    forgotText: 'Forgot email?',
    createText: 'Create account',
    footerLeft: 'Learn more',
    footerRight: 'Help',
  },
  apple: {
    name: 'Apple',
    color: '#000000',
    bgColor: '#000000',
    textColor: '#F5F5F7',
    inputBg: '#1D1D1F',
    borderColor: '#424245',
    buttonBg: '#0071E3',
    buttonText: '#FFFFFF',
    icon: AppleIcon,
    emailPlaceholder: 'Apple ID',
    forgotText: 'Forgot Apple ID?',
    createText: 'Create Apple ID',
    footerLeft: 'Privacy Policy',
    footerRight: 'Terms of Use',
  },
  github: {
    name: 'GitHub',
    color: '#FFFFFF',
    bgColor: '#0D1117',
    textColor: '#F0F6FC',
    inputBg: '#161B22',
    borderColor: '#30363D',
    buttonBg: '#238636',
    buttonText: '#FFFFFF',
    icon: GitHubIcon,
    emailPlaceholder: 'Username or email address',
    forgotText: 'Forgot password?',
    createText: 'Create an account',
    footerLeft: 'Terms',
    footerRight: 'Privacy',
  },
};

export default function OAuthLoginPage() {
  const navigate = useNavigate();
  const { provider } = useParams<{ provider: string }>();
  useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const config = providerConfig[provider as keyof typeof providerConfig] || providerConfig.google;
  const Icon = config.icon;

  const handleNext = () => {
    if (!email.trim()) {
      setError(`Please enter your ${config.name} email`);
      return;
    }
    setError('');
    setShowPasswordField(true);
  };

  const handleSignIn = () => {
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/home');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased" style={{ backgroundColor: config.bgColor }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${config.textColor}10` }}>
          <ArrowLeft className="w-5 h-5" style={{ color: config.textColor }} />
        </button>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" style={{ color: config.textColor, opacity: 0.5 }} />
          <span className="text-[12px]" style={{ color: config.textColor, opacity: 0.5 }}>Secure connection</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-6 pt-8">
        {/* Provider Logo */}
        <div className="mb-6">
          {provider === 'google' ? (
            <Icon className="w-[72px] h-[72px]" />
          ) : (
            <div className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center" style={{ backgroundColor: provider === 'apple' ? '#333' : '#21262D', border: `1px solid ${config.borderColor}` }}>
              <Icon className={`w-[40px] h-[40px] ${provider === 'github' || provider === 'apple' ? 'text-white' : ''}`} />
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-[24px] font-semibold mb-1" style={{ color: config.textColor }}>
          Sign in{provider === 'apple' ? ' with Apple ID' : provider === 'github' ? ' to GitHub' : ''}
        </h1>
        <p className="text-[14px] mb-6" style={{ color: config.textColor, opacity: 0.6 }}>
          {provider === 'google' ? 'Use your Google Account' : provider === 'apple' ? 'Use your Apple ID to continue' : 'to continue to TrendUpLive'}
        </p>

        {/* Form */}
        <div className="w-full max-w-[360px]">
          {/* Email field */}
          <div className="mb-4">
            <label className="text-[12px] font-medium mb-1.5 block" style={{ color: config.textColor, opacity: 0.7 }}>
              {config.emailPlaceholder}
            </label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={config.emailPlaceholder}
              className="w-full h-[48px] rounded-[8px] px-4 text-[15px] outline-none transition-colors"
              style={{
                backgroundColor: config.inputBg,
                color: config.textColor,
                border: `1px solid ${error && !email.trim() ? '#FF3B30' : config.borderColor}`,
              }}
              onKeyDown={e => e.key === 'Enter' && (showPasswordField ? handleSignIn() : handleNext())}
            />
          </div>

          {/* Password field */}
          {showPasswordField && (
            <div className="mb-4">
              <label className="text-[12px] font-medium mb-1.5 block" style={{ color: config.textColor, opacity: 0.7 }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-[48px] rounded-[8px] px-4 pr-12 text-[15px] outline-none transition-colors"
                  style={{
                    backgroundColor: config.inputBg,
                    color: config.textColor,
                    border: `1px solid ${error && !password.trim() ? '#FF3B30' : config.borderColor}`,
                  }}
                  onKeyDown={e => e.key === 'Enter' && handleSignIn()}
                />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff className="w-5 h-5" style={{ color: config.textColor, opacity: 0.5 }} /> : <Eye className="w-5 h-5" style={{ color: config.textColor, opacity: 0.5 }} />}
                </button>
              </div>
            </div>
          )}

          {/* Error */}
          {error && <p className="text-[13px] mb-3" style={{ color: '#FF3B30' }}>{error}</p>}

          {/* Forgot link */}
          <div className="flex items-center justify-between mb-6">
            <button className="text-[13px] font-medium" style={{ color: config.buttonBg }}>{config.forgotText}</button>
            {!showPasswordField && <button className="text-[13px] font-medium" style={{ color: config.buttonBg }}>{config.createText}</button>}
          </div>

          {/* Action Button */}
          <button
            onClick={showPasswordField ? handleSignIn : handleNext}
            disabled={loading}
            className="w-full h-[48px] rounded-[8px] text-[15px] font-semibold transition-opacity disabled:opacity-60"
            style={{ backgroundColor: config.buttonBg, color: config.buttonText }}
          >
            {loading ? 'Signing in...' : showPasswordField ? 'Sign in' : 'Next'}
          </button>

          {/* Provider-specific disclaimer */}
          <div className="mt-6 text-center">
            <p className="text-[11px] leading-[1.6]" style={{ color: config.textColor, opacity: 0.4 }}>
              This is a demo mock login page for TrendUpLive.{' '}
              No actual {config.name} authentication occurs.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 flex items-center justify-between" style={{ borderTop: `1px solid ${config.borderColor}` }}>
        <div className="flex items-center gap-4">
          <button className="text-[12px]" style={{ color: config.textColor, opacity: 0.5 }}>{config.footerLeft}</button>
          <button className="text-[12px]" style={{ color: config.textColor, opacity: 0.5 }}>{config.footerRight}</button>
        </div>
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${provider !== 'google' ? 'text-white/30' : ''}`} />
          <span className="text-[11px]" style={{ color: config.textColor, opacity: 0.3 }}>{config.name}</span>
        </div>
      </div>
    </div>
  );
}
