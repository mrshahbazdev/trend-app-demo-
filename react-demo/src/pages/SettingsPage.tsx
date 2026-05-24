import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Shield, Wallet, Moon, ChevronRight, LogOut, User, Globe, HelpCircle } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  User,
  Wallet,
  Shield,
  Bell,
  Moon,
  Globe,
  HelpCircle,
};

const settingSections = [
  {
    title: "Account",
    items: [
      { icon: "User", label: "Edit Profile" },
      { icon: "Wallet", label: "Billing & Subscription" },
      { icon: "Shield", label: "Privacy & Security" },
    ]
  },
  {
    title: "Preferences",
    items: [
      { icon: "Bell", label: "Notifications" },
      { icon: "Moon", label: "Dark Mode" },
      { icon: "Globe", label: "Language" },
    ]
  },
  {
    title: "Support",
    items: [
      { icon: "HelpCircle", label: "Help Center" },
    ]
  }
];

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans p-4">
      <header className="pt-4 pb-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-[#F3F4F6]" />
        </button>
        <h1 className="text-[23px] font-bold">Settings</h1>
      </header>

      <div className="flex flex-col gap-8">
        {settingSections.map((section, idx) => {
          return (
            <div key={idx}>
              <h2 className="text-[12px] font-bold text-[#A0A2A8] uppercase tracking-widest mb-3 ml-1">{section.title}</h2>
              <div className="bg-[#0A0D12] rounded-[16px] border border-[#1C1E23] overflow-hidden">
                {section.items.map((item, i) => {
                  const Icon = iconMap[item.icon] ?? User;
                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-4 cursor-pointer hover:bg-[#121419] transition-colors ${i !== section.items.length - 1 ? 'border-b border-[#1C1E23]' : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <Icon className="w-5 h-5 text-[#8B8D93]" />
                        <span className="text-[15px] font-semibold">{item.label}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#8B8D93]" />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <button
          onClick={() => navigate('/welcome')}
          className="flex items-center gap-4 p-4 text-[#FF3B30] font-bold border border-[#1C1E23] rounded-[16px] bg-[#0A0D12]"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </div>
  );
}
