import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, TrendingUp, Hash, Users } from 'lucide-react';
import VerifiedBadge from '../components/VerifiedBadge';

const trendingTopics = [
  { tag: "#Bitcoin", posts: "12.4K posts", trend: "+24%" },
  { tag: "#FedRateCut", posts: "8.7K posts", trend: "+89%" },
  { tag: "#NVIDIA", posts: "6.2K posts", trend: "+45%" },
  { tag: "#AltSeason", posts: "4.1K posts", trend: "+12%" },
  { tag: "#Forex", posts: "3.8K posts", trend: "+8%" },
];

const suggestedUsers = [
  { name: "Alex Morgan", handle: "@alexmorgan", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop", verified: true, followers: "1.3M" },
  { name: "Jason Lin", handle: "@jasonlin", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop", verified: true, followers: "24.5K" },
  { name: "Crypto Whale", handle: "@cryptowhale", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop", verified: false, followers: "8.2K" },
  { name: "DeFi Whale", handle: "@defiwhale", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop", verified: false, followers: "15.7K" },
];

const allResults = [
  ...suggestedUsers.map(u => ({ type: 'user' as const, ...u })),
  ...trendingTopics.map(t => ({ type: 'topic' as const, ...t })),
];

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Top');

  const filtered = query.trim()
    ? allResults.filter(r =>
        r.type === 'user'
          ? r.name.toLowerCase().includes(query.toLowerCase()) || r.handle.toLowerCase().includes(query.toLowerCase())
          : r.tag.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans antialiased">
      <header className="sticky top-0 w-full z-50 bg-[#040508]/95 backdrop-blur-md pt-4 pb-3 px-4 flex items-center gap-3 border-b border-[#121419]">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-[#F3F4F6]" />
        </button>
        <div className="flex-1 bg-[#121419] rounded-full flex items-center px-4 py-2.5 border border-[#1C1E23] focus-within:border-[#2ECC71] transition-colors">
          <Search className="w-5 h-5 text-[#8B8D93] mr-3" strokeWidth={2} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search people, topics, markets..."
            className="bg-transparent flex-1 outline-none text-[15px] placeholder:text-[#6A6C73] text-white"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-[#8B8D93] text-[13px] font-medium ml-2">Clear</button>
          )}
        </div>
      </header>

      {query.trim() ? (
        <>
          <div className="flex items-center gap-6 px-5 pt-3 border-b border-[#1A1C22]">
            {['Top', 'People', 'Topics', 'Markets'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[14px] pb-2.5 ${activeTab === tab ? 'font-bold text-white border-b-[3px] border-[#2ECC71]' : 'font-medium text-[#8B8D93]'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex flex-col">
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-[#6A6C73]">
                <Search className="w-12 h-12 mb-3" strokeWidth={1} />
                <p className="text-[16px] font-medium">No results for "{query}"</p>
              </div>
            )}
            {filtered.map((r, i) => (
              r.type === 'user' ? (
                <div key={i} onClick={() => navigate('/profile')} className="flex items-center gap-4 px-4 py-3.5 hover:bg-[#0A0D12] transition-colors cursor-pointer">
                  <img src={r.avatar} className="w-[44px] h-[44px] rounded-full object-cover" alt={r.name} />
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[15px]">{r.name}</span>
                      {r.verified && <VerifiedBadge className="w-4 h-4 text-[#2ECC71]" />}
                    </div>
                    <span className="text-[#8B8D93] text-[13px]">{r.handle} · {r.followers} followers</span>
                  </div>
                  <button className="px-4 py-1.5 rounded-full bg-[#2ECC71] text-[#040508] text-[13px] font-bold">Follow</button>
                </div>
              ) : (
                <div key={i} className="flex items-center gap-4 px-4 py-3.5 hover:bg-[#0A0D12] transition-colors cursor-pointer">
                  <div className="w-[44px] h-[44px] rounded-full bg-[#121419] border border-[#1C1E23] flex items-center justify-center">
                    <Hash className="w-5 h-5 text-[#8B8D93]" />
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-[15px]">{r.tag}</span>
                    <span className="text-[#8B8D93] text-[13px] block">{r.posts}</span>
                  </div>
                  <span className="text-[#2ECC71] text-[13px] font-bold">{r.trend}</span>
                </div>
              )
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="px-4 mt-5">
            <h2 className="text-[12px] font-bold text-[#A0A2A8] uppercase tracking-widest mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Trending
            </h2>
            {trendingTopics.map((t, i) => (
              <div key={i} onClick={() => setQuery(t.tag)} className="flex items-center justify-between py-3.5 border-b border-[#121419] cursor-pointer hover:bg-[#0A0D12] transition-colors px-1">
                <div>
                  <span className="font-bold text-[15px] text-[#F3F4F6]">{t.tag}</span>
                  <span className="text-[#8B8D93] text-[13px] block mt-0.5">{t.posts}</span>
                </div>
                <span className="text-[#2ECC71] text-[13px] font-bold">{t.trend}</span>
              </div>
            ))}
          </div>

          <div className="px-4 mt-6">
            <h2 className="text-[12px] font-bold text-[#A0A2A8] uppercase tracking-widest mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" /> Suggested
            </h2>
            {suggestedUsers.map((u, i) => (
              <div key={i} onClick={() => navigate('/profile')} className="flex items-center gap-4 py-3.5 border-b border-[#121419] cursor-pointer hover:bg-[#0A0D12] transition-colors px-1">
                <img src={u.avatar} className="w-[44px] h-[44px] rounded-full object-cover" alt={u.name} />
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[15px]">{u.name}</span>
                    {u.verified && <VerifiedBadge className="w-4 h-4 text-[#2ECC71]" />}
                  </div>
                  <span className="text-[#8B8D93] text-[13px]">{u.handle}</span>
                </div>
                <button className="px-4 py-1.5 rounded-full bg-[#2ECC71] text-[#040508] text-[13px] font-bold">Follow</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
