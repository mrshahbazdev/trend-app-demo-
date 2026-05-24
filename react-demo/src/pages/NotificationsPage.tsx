import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, UserPlus, MessageCircle, AtSign } from 'lucide-react';
import { notifications } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const typeIcons = {
  like: Heart,
  follow: UserPlus,
  comment: MessageCircle,
  mention: AtSign,
};

export default function NotificationsPage() {
  const navigate = useNavigate();
  const { t } = useTheme();

  const typeColors: Record<string, string> = {
    like: t.red,
    follow: t.green,
    comment: t.blue,
    mention: t.purple,
  };

  return (
    <div className="min-h-screen font-sans antialiased" style={{ backgroundColor: t.bg, color: t.text }}>
      <header className="sticky top-0 w-full z-50 backdrop-blur-md pt-4 pb-3 px-4 flex items-center gap-4" style={{ backgroundColor: t.backdrop, borderBottom: `1px solid ${t.border}` }}>
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6" style={{ color: t.textSec }} />
        </button>
        <h1 className="text-[23px] font-bold" style={{ color: t.text }}>Notifications</h1>
        <div className="ml-auto w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: t.red }}>
          <span className="text-[11px] font-bold text-white">{notifications.length}</span>
        </div>
      </header>

      <div className="flex flex-col">
        {notifications.map(n => {
          const Icon = typeIcons[n.type];
          const color = typeColors[n.type];
          return (
            <div key={n.id} onClick={() => {
              if (n.type === 'follow') navigate('/profile');
              else if (n.type === 'like' || n.type === 'comment') navigate('/home');
              else if (n.type === 'mention') navigate('/home');
            }} className="flex items-center gap-4 px-4 py-4 transition-colors cursor-pointer" style={{ borderBottom: `1px solid ${t.border}` }}>
              <div className="relative">
                <img src={n.avatar} className="w-[48px] h-[48px] rounded-full object-cover" alt={n.user} />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: t.bg, border: `2px solid ${t.bg}` }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: t.bgTer }}>
                    <Icon className="w-3 h-3" strokeWidth={2} style={{ color }} />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[15px]">
                  <span className="font-bold" style={{ color: t.textSec }}>{n.user}</span>
                  <span className="ml-1.5" style={{ color: t.textMuted }}>{n.text}</span>
                </p>
                <span className="text-[13px]" style={{ color: t.textDim }}>{n.time} ago</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
