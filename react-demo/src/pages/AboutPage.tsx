import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Shield, Zap, Globe, Users, Heart } from 'lucide-react';
import NewLogo from '../components/NewLogo';
import { useTheme } from '../context/ThemeContext';

export default function AboutPage() {
  const navigate = useNavigate();
  const { t } = useTheme();

  return (
    <div className="min-h-screen font-sans p-4 antialiased pb-10" style={{ backgroundColor: t.bg, color: t.text }}>
      <header className="pt-4 pb-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6" style={{ color: t.textSec }} />
        </button>
        <h1 className="text-[23px] font-bold" style={{ color: t.text }}>About</h1>
      </header>

      <div className="flex flex-col items-center mb-8">
        <NewLogo className="w-[80px] h-[80px] mb-4" />
        <h2 className="text-[28px] font-extrabold mb-1" style={{ color: t.text }}>TrendUpLive</h2>
        <p className="text-[14px] font-medium" style={{ color: t.textMuted }}>Version 2.0.0 (Demo)</p>
      </div>

      <div className="rounded-[16px] p-5 mb-6" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
        <p className="text-[15px] leading-[1.6]" style={{ color: t.textTer }}>
          TrendUpLive is the all-in-one platform for market enthusiasts. Get real-time insights, 
          join live discussions, vote on market predictions, and connect with a community of traders and analysts.
        </p>
      </div>

      <h3 className="text-[12px] font-bold uppercase tracking-widest mb-3 ml-1" style={{ color: t.textSubtle }}>Features</h3>
      <div className="rounded-[16px] overflow-hidden mb-6" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
        {[
          { icon: Zap, title: "Real-Time Feed", desc: "Stay updated with market news, analyst insights, and creator posts." },
          { icon: Globe, title: "Live Streaming", desc: "Watch and participate in live market analysis sessions." },
          { icon: Shield, title: "Vote Market", desc: "Predict market outcomes and earn rewards for correct predictions." },
          { icon: Users, title: "Community", desc: "Connect with traders, analysts, and creators worldwide." },
          { icon: Heart, title: "Personalized", desc: "Curated content based on your interests and trading style." },
        ].map((f, i) => (
          <div key={i} className="flex items-start gap-4 p-4" style={{ borderBottom: i !== 4 ? `1px solid ${t.border2}` : undefined }}>
            <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0" style={{ backgroundColor: `${t.green}18` }}>
              <f.icon className="w-5 h-5" style={{ color: t.green }} />
            </div>
            <div>
              <h4 className="text-[15px] font-bold mb-0.5" style={{ color: t.textSec }}>{f.title}</h4>
              <p className="text-[13px] leading-relaxed" style={{ color: t.textMuted }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-[12px] font-bold uppercase tracking-widest mb-3 ml-1" style={{ color: t.textSubtle }}>Legal</h3>
      <div className="rounded-[16px] overflow-hidden mb-6" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
        {['Terms of Service', 'Privacy Policy', 'Community Guidelines', 'Licenses'].map((item, i) => (
          <button key={i} className="flex items-center justify-between w-full p-4 transition-colors" style={{ borderBottom: i !== 3 ? `1px solid ${t.border2}` : undefined }}>
            <span className="text-[15px] font-medium" style={{ color: t.textSec }}>{item}</span>
            <ExternalLink className="w-4 h-4" style={{ color: t.textMuted }} />
          </button>
        ))}
      </div>

      <div className="text-center mt-6">
        <p className="text-[13px]" style={{ color: t.textMuted }}>Made with ❤️ by TrendUpLive Team</p>
        <p className="text-[12px] mt-1" style={{ color: t.textDim }}>© 2026 TrendUpLive. All rights reserved.</p>
      </div>
    </div>
  );
}
