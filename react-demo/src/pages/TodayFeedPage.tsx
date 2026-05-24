import { useState } from 'react';
import { Search, Bell, MapPin, MoreHorizontal, Heart, MessageCircle, Repeat, Share } from 'lucide-react';
import NewLogo from '../components/NewLogo';
import VerifiedBadge from '../components/VerifiedBadge';
import BottomNav from '../components/BottomNav';
import { stories, feedPosts } from '../data/mockData';

function SquarePenIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.375 2.625a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
    </svg>
  );
}

export default function TodayFeedPage() {
  const [activeTab, setActiveTab] = useState('Today');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans relative pb-[90px] antialiased">
      <header className="sticky top-0 left-0 w-full z-50 bg-[#040508]/95 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between border-b border-[#121419]">
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-[38px] h-[38px]" />
          <h1 className="text-[22px] font-bold tracking-tight text-[#FFFFFF]">TrendUpLive</h1>
        </div>
        <div className="flex items-center gap-3.5">
          <button className="hover:text-gray-300 transition-colors">
            <Search className="w-[22px] h-[22px] text-[#F3F4F6]" strokeWidth={2} />
          </button>
          <button className="relative hover:text-gray-300 transition-colors">
            <Bell className="w-[22px] h-[22px] text-[#F3F4F6]" strokeWidth={2} />
            <span className="absolute top-[-2px] right-[-2px] w-[9px] h-[9px] bg-[#FF3B30] rounded-full border-[2px] border-[#040508]"></span>
          </button>
          <button className="w-[34px] h-[34px] rounded-full bg-[#00D1B2] flex items-center justify-center hover:bg-[#00B59A] transition-colors shadow-[0_0_15px_rgba(0,209,178,0.3)]">
            <SquarePenIcon className="w-[18px] h-[18px] text-[#042F24]" />
          </button>
        </div>
      </header>

      <div className="flex items-center justify-between px-8 pt-4 pb-0 border-b border-[#1A1C22]">
        {['Today', 'News', 'Market Trend'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[15px] pb-3 px-1 ${activeTab === tab ? 'font-bold text-[#FFFFFF] border-b-[3px] border-[#2ECC71]' : 'font-medium text-[#8B8D93] hover:text-gray-300 transition-colors'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 px-4 py-[14px] overflow-x-auto">
        {['All', 'Topics', 'Creators'].map((pill, i) => (
          <button
            key={pill}
            className={`px-5 py-[6px] rounded-full text-[14px] font-medium whitespace-nowrap ${i === 0 ? 'bg-transparent border border-[#2ECC71] text-[#2ECC71]' : 'bg-[#121419] border border-[#23252A] text-[#E0E0E0]'}`}
          >
            {pill}
          </button>
        ))}
        <button className="px-4 py-[6px] rounded-full bg-[#121419] border border-[#23252A] text-[#E0E0E0] text-[14px] font-medium whitespace-nowrap flex items-center gap-1.5">
          <MapPin className="w-[14px] h-[14px] text-[#8B8D93]" strokeWidth={2} />
          Near You
        </button>
      </div>

      <div className="flex items-start gap-4 px-4 pb-4 border-b border-[#121419] overflow-x-auto">
        {stories.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 min-w-[72px]">
            <div className="relative">
              <div className={`w-[64px] h-[64px] rounded-full p-[2px] overflow-hidden ${
                s.ring === 'green' ? 'border-[2px] border-[#2ECC71]' :
                s.ring === 'gradient-blue' ? 'bg-gradient-to-tr from-[#2979FF] via-[#00E5FF] to-[#D500F9] p-[2.5px]' :
                s.ring === 'gradient-green' ? 'bg-gradient-to-tr from-[#2ECC71] to-[#2979FF] p-[2.5px]' :
                s.ring === 'gradient-orange' ? 'bg-gradient-to-tr from-[#FFB300] to-[#FF1744] p-[2.5px]' :
                'border-[2px] border-[#23252A]'
              }`}>
                <div className={`w-full h-full rounded-full overflow-hidden ${s.ring !== 'green' && s.ring !== 'default' ? 'bg-[#040508] border-[2px] border-[#040508]' : ''}`}>
                  <img src={s.img} className="w-full h-full rounded-full object-cover" alt={s.name} />
                </div>
              </div>
              {s.verified && (
                <div className="absolute bottom-0 right-0 border-[2px] border-[#040508] rounded-full bg-[#040508]">
                  <VerifiedBadge className="w-[16px] h-[16px] text-[#2ECC71]" />
                </div>
              )}
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-bold text-white text-center leading-tight">{s.name}</span>
              <span className="text-[10px] text-[#8B8D93]">{s.followers}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        {feedPosts.map(post => (
          <article key={post.id} className="flex flex-col px-4 pt-5 pb-3 border-b border-[#121419]">
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-3">
                <img src={post.avatar} className="w-[44px] h-[44px] rounded-full object-cover" alt="Avatar" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 mt-[2px]">
                    <span className="font-bold text-[16px]">{post.user}</span>
                    {post.verified && <VerifiedBadge className="w-[16px] h-[16px] text-[#2ECC71]" />}
                    <span className="text-[#8B8D93] text-[14px] ml-1">{post.handle}</span>
                    <span className="text-[#8B8D93] text-[14px] px-0.5">·</span>
                    <span className="text-[#8B8D93] text-[14px]">{post.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {post.badge && <span className="bg-[#24133D] text-[#A770EF] text-[11px] font-bold px-[8px] py-[4px] rounded-md tracking-wide">{post.badge}</span>}
                <button className="text-[#8B8D93] hover:text-white transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="pl-[56px]">
              <p className="text-[15px] text-[#E5E7EB] leading-[1.5] mb-3">{post.content}</p>
              {post.image && (
                <div className="rounded-[16px] overflow-hidden mb-3 border border-[#16181D]">
                  <img src={post.image} alt="Post" className="w-full h-auto object-cover max-h-[220px]" />
                </div>
              )}
              <div className="flex items-center justify-between text-[#8B8D93] pr-4 mt-2">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 text-[13px] font-medium hover:text-[#FF3B30] transition-colors ${likedPosts.has(post.id) ? 'text-[#FF3B30]' : ''}`}
                >
                  <Heart className={`w-[18px] h-[18px] ${likedPosts.has(post.id) ? 'fill-[#FF3B30]' : ''}`} strokeWidth={1.5} />
                  {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                </button>
                <button className="flex items-center gap-1.5 text-[13px] font-medium hover:text-[#2ECC71] transition-colors">
                  <MessageCircle className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  {post.comments}
                </button>
                <button className="flex items-center gap-1.5 text-[13px] font-medium hover:text-[#2979FF] transition-colors">
                  <Repeat className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  {post.reposts}
                </button>
                <button className="flex items-center gap-1.5 text-[13px] font-medium hover:text-white transition-colors">
                  <Share className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
