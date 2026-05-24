import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, UserPlus, MessageCircle, AtSign } from 'lucide-react';
import { notifications } from '../data/mockData';

const typeIcons = {
  like: Heart,
  follow: UserPlus,
  comment: MessageCircle,
  mention: AtSign,
};

const typeColors = {
  like: 'text-[#FF3B30]',
  follow: 'text-[#2ECC71]',
  comment: 'text-[#4A9EFF]',
  mention: 'text-[#A770EF]',
};

export default function NotificationsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans antialiased">
      <header className="sticky top-0 w-full z-50 bg-[#040508]/95 backdrop-blur-md pt-4 pb-3 px-4 flex items-center gap-4 border-b border-[#121419]">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-[#F3F4F6]" />
        </button>
        <h1 className="text-[23px] font-bold">Notifications</h1>
        <div className="ml-auto bg-[#FF3B30] w-6 h-6 rounded-full flex items-center justify-center">
          <span className="text-[11px] font-bold">{notifications.length}</span>
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
            }} className="flex items-center gap-4 px-4 py-4 border-b border-[#121419] hover:bg-[#0A0D12] transition-colors cursor-pointer active:bg-[#121419]">
              <div className="relative">
                <img src={n.avatar} className="w-[48px] h-[48px] rounded-full object-cover" alt={n.user} />
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#040508] border-2 border-[#040508] flex items-center justify-center`}>
                  <div className="w-5 h-5 rounded-full bg-[#121419] flex items-center justify-center">
                    <Icon className={`w-3 h-3 ${color}`} strokeWidth={2} />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[15px]">
                  <span className="font-bold text-[#F3F4F6]">{n.user}</span>
                  <span className="text-[#8B8D93] ml-1.5">{n.text}</span>
                </p>
                <span className="text-[#6A6C73] text-[13px]">{n.time} ago</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
