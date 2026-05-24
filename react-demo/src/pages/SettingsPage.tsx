import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Shield, Wallet, Moon, ChevronRight, LogOut, User, Globe, HelpCircle, Check, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  const { t } = useTheme();
  return (
    <button onClick={onToggle} className="w-[44px] h-[24px] rounded-full p-[2px] transition-colors" style={{ backgroundColor: on ? t.green : t.border3 }}>
      <div className={`w-[20px] h-[20px] rounded-full bg-white transition-transform ${on ? 'translate-x-[20px]' : 'translate-x-0'}`} />
    </button>
  );
}

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = { User, Wallet, Shield, Bell, Moon, Sun, Globe, HelpCircle };

const languages = ['English', 'Urdu', 'Arabic', 'Spanish', 'Chinese'];

export default function SettingsPage() {
  const navigate = useNavigate();
  const { t, isDark, toggleTheme } = useTheme();
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
    else if (label === 'About') navigate('/about');
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
        { icon: isDark ? "Moon" : "Sun", label: isDark ? "Dark Mode" : "Light Mode" },
        { icon: "Globe", label: "Language" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: "HelpCircle", label: "Help Center" },
        { icon: "HelpCircle", label: "About" },
      ]
    }
  ];

  return (
    <div className="min-h-screen font-sans p-4 antialiased" style={{ backgroundColor: t.bg, color: t.text }}>
      <header className="pt-4 pb-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6" style={{ color: t.textSec }} />
        </button>
        <h1 className="text-[23px] font-bold" style={{ color: t.text }}>Settings</h1>
      </header>

      <div className="flex flex-col gap-8">
        {settingSections.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-[12px] font-bold uppercase tracking-widest mb-3 ml-1" style={{ color: t.textSubtle }}>{section.title}</h2>
            <div className="rounded-[16px] overflow-hidden" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
              {section.items.map((item, i) => {
                const Icon = iconMap[item.icon] ?? User;
                const isThemeToggle = item.label === 'Dark Mode' || item.label === 'Light Mode';
                const isNotifToggle = item.label === 'Notifications';
                const isToggle = isThemeToggle || isNotifToggle;
                const toggleVal = isThemeToggle ? isDark : notifications;
                const onToggle = isThemeToggle ? toggleTheme : () => setNotifications(!notifications);

                return (
                  <div key={i}>
                    <div
                      onClick={() => !isToggle && handleItemClick(item.label)}
                      className="flex items-center justify-between p-4 cursor-pointer transition-colors"
                      style={{ borderBottom: i !== section.items.length - 1 ? `1px solid ${t.border2}` : undefined }}
                    >
                      <div className="flex items-center gap-4">
                        <Icon className="w-5 h-5" style={{ color: t.textMuted }} />
                        <span className="text-[15px] font-semibold" style={{ color: t.text }}>{item.label}</span>
                      </div>
                      {isToggle ? <Toggle on={toggleVal} onToggle={onToggle} /> : <ChevronRight className="w-5 h-5" style={{ color: t.textMuted }} />}
                    </div>

                    {item.label === 'Edit Profile' && showEditProfile && (
                      <div className="p-4" style={{ backgroundColor: t.bgTer, borderBottom: `1px solid ${t.border2}` }}>
                        <div className="flex flex-col gap-3">
                          <div>
                            <label className="text-[12px] font-medium mb-1 block" style={{ color: t.textMuted }}>Display Name</label>
                            <input value={profileName} onChange={e => setProfileName(e.target.value)} className="w-full rounded-[10px] px-3 py-2.5 text-[14px] outline-none" style={{ backgroundColor: t.bgInput, border: `1px solid ${t.border2}`, color: t.text }} />
                          </div>
                          <div>
                            <label className="text-[12px] font-medium mb-1 block" style={{ color: t.textMuted }}>Bio</label>
                            <textarea value={profileBio} onChange={e => setProfileBio(e.target.value)} rows={2} className="w-full rounded-[10px] px-3 py-2.5 text-[14px] outline-none resize-none" style={{ backgroundColor: t.bgInput, border: `1px solid ${t.border2}`, color: t.text }} />
                          </div>
                          <button className="font-bold text-[14px] py-2.5 rounded-[10px]" style={{ backgroundColor: t.green, color: t.bg }}>Save Changes</button>
                        </div>
                      </div>
                    )}

                    {item.label === 'Billing & Subscription' && showBilling && (
                      <div className="p-4" style={{ backgroundColor: t.bgTer, borderBottom: `1px solid ${t.border2}` }}>
                        <div className="rounded-[12px] p-4 mb-3" style={{ background: `linear-gradient(to right, ${t.green}20, ${t.blue}20)`, border: `1px solid ${t.green}30` }}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-[14px]" style={{ color: t.green }}>Pro Plan</span>
                            <span className="font-bold text-[16px]" style={{ color: t.textSec }}>$9.99/mo</span>
                          </div>
                          <p className="text-[13px]" style={{ color: t.textMuted }}>Next billing: June 15, 2026</p>
                        </div>
                        <div className="flex gap-3">
                          <button className="flex-1 font-bold text-[13px] py-2.5 rounded-[10px]" style={{ backgroundColor: t.bgInput, border: `1px solid ${t.border2}`, color: t.textSec }}>Change Plan</button>
                          <button className="flex-1 font-bold text-[13px] py-2.5 rounded-[10px]" style={{ backgroundColor: t.bgInput, border: `1px solid ${t.red}30`, color: t.red }}>Cancel</button>
                        </div>
                      </div>
                    )}

                    {item.label === 'Privacy & Security' && showPrivacy && (
                      <div className="p-4" style={{ backgroundColor: t.bgTer, borderBottom: `1px solid ${t.border2}` }}>
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
                      <div style={{ backgroundColor: t.bgTer, borderBottom: `1px solid ${t.border2}` }}>
                        {languages.map(lang => (
                          <button
                            key={lang}
                            onClick={() => setSelectedLang(lang)}
                            className="flex items-center justify-between w-full px-4 py-3 transition-colors"
                            style={{ borderBottom: `1px solid ${t.border2}` }}
                          >
                            <span className="text-[14px]" style={{ color: selectedLang === lang ? t.green : t.textSec, fontWeight: selectedLang === lang ? 700 : 400 }}>{lang}</span>
                            {selectedLang === lang && <Check className="w-5 h-5" style={{ color: t.green }} />}
                          </button>
                        ))}
                      </div>
                    )}

                    {item.label === 'Help Center' && showHelp && (
                      <div className="p-4" style={{ backgroundColor: t.bgTer, borderBottom: `1px solid ${t.border2}` }}>
                        <div className="flex flex-col gap-2">
                          {['FAQ', 'Contact Support', 'Report a Bug', 'Terms of Service', 'Privacy Policy'].map(link => (
                            <button key={link} className="text-left py-2.5 px-3 text-[14px] rounded-[8px] transition-colors" style={{ color: t.textTer }}>{link}</button>
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
          className="flex items-center gap-4 p-4 font-bold rounded-[16px]"
          style={{ color: t.red, backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-6" style={{ backgroundColor: t.overlay }}>
          <div className="rounded-[20px] p-6 max-w-[320px] w-full" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
            <h3 className="text-[18px] font-bold text-center mb-2" style={{ color: t.text }}>Log Out?</h3>
            <p className="text-[14px] text-center mb-6" style={{ color: t.textMuted }}>Are you sure you want to log out of TrendUpLive?</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => navigate('/welcome')} className="text-white font-bold text-[15px] py-3 rounded-[12px]" style={{ backgroundColor: t.red }}>Yes, Log Out</button>
              <button onClick={() => setShowLogoutConfirm(false)} className="font-bold text-[15px] py-3 rounded-[12px]" style={{ backgroundColor: t.bgTer, border: `1px solid ${t.border2}`, color: t.textSec }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PrivacyToggle({ label, desc, defaultOn }: { label: string; desc: string; defaultOn: boolean }) {
  const { t } = useTheme();
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[14px] font-semibold" style={{ color: t.textSec }}>{label}</p>
        <p className="text-[12px]" style={{ color: t.textMuted }}>{desc}</p>
      </div>
      <Toggle on={on} onToggle={() => setOn(!on)} />
    </div>
  );
}
