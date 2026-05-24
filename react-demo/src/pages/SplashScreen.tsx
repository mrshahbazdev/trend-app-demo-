import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function SplashScreen() {
  const navigate = useNavigate();
  const { t } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome', { replace: true });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans antialiased" style={{ backgroundColor: t.bg }}>
      <img
        src="/logo.gif"
        alt="TrendUpLive"
        className="w-[160px] h-[160px]"
      />
      <h1 className="text-[28px] font-bold tracking-tight text-white mt-4">TrendUpLive</h1>
    </div>
  );
}
