import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome', { replace: true });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center font-sans antialiased">
      <img
        src="/logo.gif"
        alt="TrendUpLive"
        className="w-[160px] h-[160px]"
      />
      <h1 className="text-[28px] font-bold tracking-tight text-white mt-4">TrendUpLive</h1>
    </div>
  );
}
