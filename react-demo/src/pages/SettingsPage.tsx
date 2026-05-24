import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Shield, Wallet, Moon, ChevronRight, LogOut, User, Globe, HelpCircle, Check } from 'lucide-react';

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors ${on ? 'bg-[#2ECC71]' : 'bg-[#2A2E36]'}`}>
      <div className={`w-[20px] h-[20px] rounded-full bg-white transition-transform ${on ? 'translate-x-[20px]' : 'translate-x-0'}`} />
    </button>
  );
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { User, Wallet, Shield, Bell, Moon, Globe, HelpCircle };

const languages = ['English', 'Urdu', 'Arabic', 'Spanish', 'Chinese'];

export default function SettingsPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showBilling, setShowBilling] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [profileName, setProfileName] = useState('Jason Lin');
  const [profileBio, setProfileBio] = useState('Building open tools for the future.');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleItemClick = (label: string) => {
    if (label === 'Edit Profile') setShowEditProfile(!showEditProfile);
    else if (label === 'Billing & Subscription') setShowBilling(!showBilling);
    else if (label === 'Privacy & Security') setShowPrivacy(!showPrivacy);
    else if (label === 'Language') setShowLanguage(!showLanguage);
    else if (label === 'Help Center') setShowHelp(!showHelp);
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

  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans p-4 antialiased">
      <header className="pt-4 pb-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-[#F3F4F6]" />
        </button>
        <h1 className="text-[23px] font-bold">Settings</h1>
      </header>

      <div className="flex flex-col gap-8">
        {settingSections.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-[12px] font-bold text-[#A0A2A8] uppercase tracking-widest mb-3 ml-1">{section.title}</h2>
            <div className="bg-[#0A0D12] rounded-[16px] border border-[#1C1E23] overflow-hidden">
              {section.items.map((item, i) => {
                const Icon = iconMap[item.icon] ?? User;
                const isToggle = item.label === 'Dark Mode' || item.label === 'Notifications';
                const toggleVal = item.label === 'Dark Mode' ? darkMode : notifications;
                const onToggle = item.label === 'Dark Mode' ? () => setDarkMode(!darkMode) : () => setNotifications(!notifications);

                return (
                  <div key={i}>
                    <div
                      onClick={() => !isToggle && handleItemClick(item.label)}
                      className={`flex items-center justify-between p-4 cursor-pointer hover:bg-[#121419] transition-colors ${i !== section.items.length - 1 || (item.label === 'Edit Profile' && showEditProfile) || (item.label === 'Language' && showLanguage) ? 'border-b border-[#1C1E23]' : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <Icon className="w-5 h-5 text-[#8B8D93]" />
                        <span className="text-[15px] font-semibold">{item.label}</span>
                      </div>
                      {isToggle ? <Toggle on={toggleVal} onToggle={onToggle} /> : <ChevronRight className="w-5 h-5 text-[#8B8D93]" />}
                    </div>

                    {item.label === 'Edit Profile' && showEditProfile && (
                      <div className="p-4 bg-[#0D1117] border-b border-[#1C1E23]">
                        <div className="flex flex-col gap-3">
                          <div>
                            <label className="text-[12px] text-[#8B8D93] font-medium mb-1 block">Display Name</label>
                            <input value={profileName} onChange={e => setProfileName(e.target.value)} className="w-full bg-[#121419] border border-[#1C1E23] rounded-[10px] px-3 py-2.5 text-[14px] text-white outline-none focus:border-[#2ECC71]" />
                          </div>
                          <div>
                            <label className="text-[12px] text-[#8B8D93] font-medium mb-1 block">Bio</label>
                            <textarea value={profileBio} onChange={e => setProfileBio(e.target.value)} rows={2} className="w-full bg-[#121419] border border-[#1C1E23] rounded-[10px] px-3 py-2.5 text-[14px] text-white outline-none focus:border-[#2ECC71] resize-none" />
                          </div>
                          <button className="bg-[#2ECC71] text-[#040508] font-bold text-[14px] py-2.5 rounded-[10px]">Save Changes</button>
                        </div>
                      </div>
                    )}

                    {item.label === 'Billing & Subscription' && showBilling && (
                      <div className="p-4 bg-[#0D1117] border-b border-[#1C1E23]">
                        <div className="bg-gradient-to-r from-[#2ECC71]/20 to-[#2979FF]/20 border border-[#2ECC71]/30 rounded-[12px] p-4 mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[#2ECC71] font-bold text-[14px]">Pro Plan</span>
                            <span className="text-[#F3F4F6] font-bold text-[16px]">$9.99/mo</span>
                          </div>
                          <p className="text-[#8B8D93] text-[13px]">Next billing: June 15, 2026</p>
                        </div>
                        <div className="flex gap-3">
                          <button className="flex-1 bg-[#121419] border border-[#1C1E23] text-[#F3F4F6] font-bold text-[13px] py-2.5 rounded-[10px]">Change Plan</button>
                          <button className="flex-1 bg-[#121419] border border-[#FF3B30]/30 text-[#FF3B30] font-bold text-[13px] py-2.5 rounded-[10px]">Cancel</button>
                        </div>
                      </div>
                    )}

                    {item.label === 'Privacy & Security' && showPrivacy && (
                      <div className="p-4 bg-[#0D1117] border-b border-[#1C1E23]">
                        <div className="flex flex-col gap-3">
                          {[
                            { label: "Private Account", desc: "Only approved followers can see your posts", on: false },
                            { label: "Two-Factor Auth", desc: "Extra security for your account", on: true },
                            { label: "Read Receipts", desc: "Show when you've read messages", on: true },
                          ].map((s, si) => (
                            <PrivacyToggle key={si} label={s.label} desc={s.desc} defaultOn={s.on} />
                          ))}
                        </div>
                      </div>
                    )}

                    {item.label === 'Language' && showLanguage && (
                      <div className="bg-[#0D1117] border-b border-[#1C1E23]">
                        {languages.map(lang => (
                          <button
                            key={lang}
                            onClick={() => setSelectedLang(lang)}
                            className="flex items-center justify-between w-full px-4 py-3 hover:bg-[#121419] transition-colors border-b border-[#1C1E23] last:border-b-0"
                          >
                            <span className={`text-[14px] ${selectedLang === lang ? 'text-[#2ECC71] font-bold' : 'text-[#F3F4F6]'}`}>{lang}</span>
                            {selectedLang === lang && <Check className="w-5 h-5 text-[#2ECC71]" />}
                          </button>
                        ))}
                      </div>
                    )}

                    {item.label === 'Help Center' && showHelp && (
                      <div className="p-4 bg-[#0D1117] border-b border-[#1C1E23]">
                        <div className="flex flex-col gap-2">
                          {['FAQ', 'Contact Support', 'Report a Bug', 'Terms of Service', 'Privacy Policy'].map(link => (
                            <button key={link} className="text-left py-2.5 px-3 text-[14px] text-[#E5E7EB] hover:bg-[#121419] rounded-[8px] transition-colors">{link}</button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="flex items-center gap-4 p-4 text-[#FF3B30] font-bold border border-[#1C1E23] rounded-[16px] bg-[#0A0D12]"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#0A0D12] border border-[#1C1E23] rounded-[20px] p-6 max-w-[320px] w-full">
            <h3 className="text-[18px] font-bold text-center mb-2">Log Out?</h3>
            <p className="text-[#8B8D93] text-[14px] text-center mb-6">Are you sure you want to log out of TrendUpLive?</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => navigate('/welcome')} className="bg-[#FF3B30] text-white font-bold text-[15px] py-3 rounded-[12px]">Yes, Log Out</button>
              <button onClick={() => setShowLogoutConfirm(false)} className="bg-[#121419] border border-[#1C1E23] text-[#F3F4F6] font-bold text-[15px] py-3 rounded-[12px]">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PrivacyToggle({ label, desc, defaultOn }: { label: string; desc: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[14px] font-semibold text-[#F3F4F6]">{label}</p>
        <p className="text-[12px] text-[#8B8D93]">{desc}</p>
      </div>
      <Toggle on={on} onToggle={() => setOn(!on)} />
    </div>
  );
}
