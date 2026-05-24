import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Shield, Zap, Globe, Users, Heart } from 'lucide-react';
import NewLogo from '../components/NewLogo';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans p-4 antialiased pb-10">
      <header className="pt-4 pb-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-[#F3F4F6]" />
        </button>
        <h1 className="text-[23px] font-bold">About</h1>
      </header>

      <div className="flex flex-col items-center mb-8">
        <NewLogo className="w-[80px] h-[80px] mb-4" />
        <h2 className="text-[28px] font-extrabold text-white mb-1">TrendUpLive</h2>
        <p className="text-[#8B8D93] text-[14px] font-medium">Version 2.0.0 (Demo)</p>
      </div>

      <div className="bg-[#0A0D12] border border-[#1C1E23] rounded-[16px] p-5 mb-6">
        <p className="text-[15px] text-[#D1D5DB] leading-[1.6]">
          TrendUpLive is the all-in-one platform for market enthusiasts. Get real-time insights, 
          join live discussions, vote on market predictions, and connect with a community of traders and analysts.
        </p>
      </div>

      <h3 className="text-[12px] font-bold text-[#A0A2A8] uppercase tracking-widest mb-3 ml-1">Features</h3>
      <div className="bg-[#0A0D12] border border-[#1C1E23] rounded-[16px] overflow-hidden mb-6">
        {[
          { icon: Zap, title: "Real-Time Feed", desc: "Stay updated with market news, analyst insights, and creator posts." },
          { icon: Globe, title: "Live Streaming", desc: "Watch and participate in live market analysis sessions." },
          { icon: Shield, title: "Vote Market", desc: "Predict market outcomes and earn rewards for correct predictions." },
          { icon: Users, title: "Community", desc: "Connect with traders, analysts, and creators worldwide." },
          { icon: Heart, title: "Personalized", desc: "Curated content based on your interests and trading style." },
        ].map((f, i) => (
          <div key={i} className={`flex items-start gap-4 p-4 ${i !== 4 ? 'border-b border-[#1C1E23]' : ''}`}>
            <div className="w-10 h-10 rounded-[10px] bg-[#2ECC71]/10 flex items-center justify-center shrink-0">
              <f.icon className="w-5 h-5 text-[#2ECC71]" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#F3F4F6] mb-0.5">{f.title}</h4>
              <p className="text-[#8B8D93] text-[13px] leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-[12px] font-bold text-[#A0A2A8] uppercase tracking-widest mb-3 ml-1">Legal</h3>
      <div className="bg-[#0A0D12] border border-[#1C1E23] rounded-[16px] overflow-hidden mb-6">
        {['Terms of Service', 'Privacy Policy', 'Community Guidelines', 'Licenses'].map((item, i) => (
          <button key={i} className={`flex items-center justify-between w-full p-4 hover:bg-[#121419] transition-colors ${i !== 3 ? 'border-b border-[#1C1E23]' : ''}`}>
            <span className="text-[15px] text-[#F3F4F6] font-medium">{item}</span>
            <ExternalLink className="w-4 h-4 text-[#8B8D93]" />
          </button>
        ))}
      </div>

      <div className="text-center mt-6">
        <p className="text-[#8B8D93] text-[13px]">Made with ❤️ by TrendUpLive Team</p>
        <p className="text-[#6A6C73] text-[12px] mt-1">© 2026 TrendUpLive. All rights reserved.</p>
      </div>
    </div>
  );
}
