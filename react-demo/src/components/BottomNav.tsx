import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, User, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function HomeNavIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}


function LiveNavIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="2" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
      <path d="M7.76 16.24a6 6 0 0 1 0-8.49" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M4.93 19.07a10 10 0 0 1 0-14.14" />
    </svg>
  );
}

const tabs = [
  { key: 'home', label: 'Home', path: '/home', Icon: HomeNavIcon },
  { key: 'markets', label: 'Markets', path: '/markets', Icon: BarChart3 },
  { key: 'chats', label: 'Chats', path: '/chats', Icon: MessageSquare },
  { key: 'live', label: 'Live', path: '/live', Icon: LiveNavIcon },
  { key: 'profile', label: 'Profile', path: '/profile', Icon: User },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTheme();

  const activeTab = tabs.find(t => location.pathname.startsWith(t.path))?.key ?? 'home';

  return (
    <div
      className="fixed bottom-0 left-0 w-full h-[88px] backdrop-blur-xl flex justify-between items-start px-[18px] pt-3 pb-6 z-50"
      style={{ backgroundColor: t.navBg, borderTop: `1px solid ${t.border}` }}
    >
      {tabs.map(({ key, label, path, Icon }) => {
        const active = activeTab === key;
        return (
          <button
            key={key}
            onClick={() => navigate(path)}
            className="flex flex-col items-center gap-1.5 min-w-[56px]"
          >
            <Icon className="w-[24px] h-[24px]" strokeWidth={2} style={{ color: active ? t.green : t.textMuted }} />
            <span className="text-[11px] font-semibold" style={{ color: active ? t.green : t.textMuted, fontWeight: active ? 700 : 600 }}>{label}</span>
          </button>
        );
      })}
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full" style={{ backgroundColor: t.text }}></div>
    </div>
  );
}
