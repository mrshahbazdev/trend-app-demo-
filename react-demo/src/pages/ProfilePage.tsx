import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Share, MoreHorizontal, User, Users, FileText, Heart, MessageCircle, Repeat, Image, Play } from 'lucide-react';
import VerifiedBadge from '../components/VerifiedBadge';
import BottomNav from '../components/BottomNav';

const userPosts = [
  { content: "Building open tools for the future. The AI revolution isn't just about models — it's about infrastructure.", time: "3h", likes: 89, comments: 12, reposts: 7, image: null as string | null },
  { content: "Markets are showing interesting patterns this week. Tech earnings could be the catalyst for the next move.", time: "1d", likes: 234, comments: 45, reposts: 23, image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop" },
  { content: "Just published my weekly analysis on the crypto market. Key levels to watch for BTC and ETH.", time: "2d", likes: 156, comments: 34, reposts: 18, image: null },
];

const userReplies = [
  { replyTo: "@alexmorgan", original: "What's your outlook on tech stocks?", reply: "I think tech will continue to outperform. AI spending is accelerating and margins are improving.", time: "5h", likes: 45 },
  { replyTo: "@cryptowhale", original: "Is BTC going to break $70K?", reply: "The setup looks bullish. Volume is increasing and institutional flows are strong. Could see a breakout soon.", time: "12h", likes: 67 },
  { replyTo: "@marketpulse", original: "Thoughts on the Fed meeting?", reply: "Rate cut in September is increasingly likely. Market is pricing it in at 85% probability.", time: "1d", likes: 32 },
];

const userMedia = [
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=400&auto=format&fit=crop",
];

const userLikedPosts = [
  { user: "Alex Morgan", handle: "@alexmorgan", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop", content: "Small daily habits compound into big life changes.", time: "2h", likes: 42, verified: true },
  { user: "Crypto Whale", handle: "@cryptowhale", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop", content: "BTC dominance is at 54% and climbing.", time: "6h", likes: 67, verified: false },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const [following, setFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('Posts');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const toggleLike = (i: number) => {
    setLikedPosts(prev => { const next = new Set(prev); if (next.has(i)) next.delete(i); else next.add(i); return next; });
  };

  return (
    <div className="min-h-screen bg-[#020305] text-white font-sans relative pb-[90px] antialiased">
      <div className="absolute top-0 left-0 w-full h-[160px] bg-[#12161A] z-0">
        <img src="https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1000&auto=format&fit=crop" alt="Profile Banner" className="w-full h-full object-cover opacity-80" />
        <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-[#020305] to-transparent"></div>
      </div>

      <header className="sticky top-0 left-0 w-full z-50 bg-gradient-to-b from-[#020305]/80 to-transparent flex items-center justify-between px-4 pt-4 pb-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white drop-shadow-md">
            <ChevronLeft className="w-[26px] h-[26px]" strokeWidth={2.5} />
          </button>
          <div className="flex items-center gap-[6px] drop-shadow-md">
            <h1 className="text-[20px] font-bold tracking-tight">Jason Lin</h1>
            <VerifiedBadge className="w-5 h-5 text-[#2ECC71]" />
          </div>
        </div>
        <div className="flex items-center gap-[18px] text-white drop-shadow-md">
          <button><Share className="w-[22px] h-[22px]" strokeWidth={2} /></button>
          <button onClick={() => navigate('/settings')}><MoreHorizontal className="w-[26px] h-[26px]" strokeWidth={2} /></button>
        </div>
      </header>

      <div className="relative z-10 pt-[50px]">
        <div className="px-4">
          <div className="flex justify-between items-end mb-[14px]">
            <div className="relative">
              <div className="w-[96px] h-[96px] rounded-full border-[4px] border-[#020305] bg-[#1A1D24] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" alt="Jason Lin" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 border-2 border-[#020305] rounded-full bg-[#020305]">
                <VerifiedBadge className="w-[22px] h-[22px] text-[#2ECC71]" />
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => setFollowing(!following)}
                className={`h-[34px] px-[22px] rounded-full text-[14.5px] font-bold tracking-wide transition-all ${
                  following
                    ? 'bg-transparent border border-[#2A2E36] text-[#A0A2A8] hover:border-[#FF3B30] hover:text-[#FF3B30]'
                    : 'bg-[#178544] hover:bg-[#126b36] text-white'
                }`}
              >
                {following ? 'Following' : 'Follow'}
              </button>
              <button onClick={() => navigate('/chats/detail')} className="w-[34px] h-[34px] rounded-full border border-[#2A2E36] flex items-center justify-center text-[#A0A2A8]">
                <MessageCircle className="w-[18px] h-[18px]" strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-1.5">
              <h2 className="text-[24px] font-bold leading-tight">Jason Lin</h2>
              <VerifiedBadge className="w-[22px] h-[22px] text-[#2ECC71]" />
            </div>
            <div className="flex items-center gap-2 mt-[2px]">
              <span className="text-[#8B8D93] text-[15px]">@jasonlin</span>
              <span className="bg-[#24133D] text-[#A770EF] text-[12px] font-bold px-[8px] py-[3px] rounded-md tracking-wide">Creator</span>
            </div>
          </div>

          <div className="text-[15.5px] text-[#F3F4F6] leading-[1.5] mb-6">
            <p>Building open tools for the future.</p>
            <p className="text-[#8B8D93]">AI · Web3 · Open Source</p>
          </div>

          <div className="flex items-center justify-between pr-4 mb-6">
            {[
              { icon: User, label: "Following", value: "312" },
              { icon: Users, label: "Followers", value: following ? "24.6K" : "24.5K" },
              { icon: FileText, label: "Posts", value: "1,847" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5 text-white">
                  <Icon className="w-[18px] h-[18px] text-[#8B8D93]" strokeWidth={1.5} />
                  <span className="font-bold text-[16px]">{value}</span>
                </div>
                <span className="text-[#8B8D93] text-[13px] font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8 px-5 pt-1 pb-0 border-b border-[#1A1C22]">
          {['Posts', 'Replies', 'Media', 'Likes'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[15.5px] font-bold pb-2.5 ${activeTab === tab ? 'text-[#FFFFFF] border-b-[3px] border-[#2ECC71]' : 'text-[#A0A2A8] hover:text-white transition-colors'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Posts' && (
          <div className="flex flex-col">
            {userPosts.map((post, i) => (
              <article key={i} className="px-4 pt-5 pb-3 border-b border-[#121419]">
                <div className="flex gap-3 mb-3">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" className="w-[44px] h-[44px] rounded-full object-cover" alt="Avatar" />
                  <div className="flex items-center gap-1 mt-[2px]">
                    <span className="font-bold text-[16px]">Jason Lin</span>
                    <VerifiedBadge className="w-[16px] h-[16px] text-[#2ECC71]" />
                    <span className="text-[#8B8D93] text-[14px] ml-1">@jasonlin · {post.time}</span>
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
                    <button onClick={() => toggleLike(i)} className={`flex items-center gap-1.5 text-[13px] font-medium transition-colors ${likedPosts.has(i) ? 'text-[#FF3B30]' : 'hover:text-[#FF3B30]'}`}>
                      <Heart className={`w-[18px] h-[18px] ${likedPosts.has(i) ? 'fill-[#FF3B30]' : ''}`} strokeWidth={1.5} />{post.likes + (likedPosts.has(i) ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1.5 text-[13px] font-medium hover:text-[#2ECC71] transition-colors">
                      <MessageCircle className="w-[18px] h-[18px]" strokeWidth={1.5} />{post.comments}
                    </button>
                    <button className="flex items-center gap-1.5 text-[13px] font-medium hover:text-[#2979FF] transition-colors">
                      <Repeat className="w-[18px] h-[18px]" strokeWidth={1.5} />{post.reposts}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'Replies' && (
          <div className="flex flex-col">
            {userReplies.map((r, i) => (
              <div key={i} className="px-4 pt-5 pb-4 border-b border-[#121419]">
                <div className="text-[#8B8D93] text-[13px] mb-2">Replying to <span className="text-[#2ECC71]">{r.replyTo}</span></div>
                <div className="bg-[#0A0D12] border border-[#1C1E23] rounded-[12px] p-3 mb-3">
                  <p className="text-[#8B8D93] text-[13px] italic">"{r.original}"</p>
                </div>
                <div className="flex gap-3">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" className="w-[36px] h-[36px] rounded-full object-cover" alt="Avatar" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="font-bold text-[14px]">Jason Lin</span>
                      <VerifiedBadge className="w-4 h-4 text-[#2ECC71]" />
                      <span className="text-[#8B8D93] text-[13px] ml-1">{r.time}</span>
                    </div>
                    <p className="text-[#E5E7EB] text-[14px] leading-relaxed">{r.reply}</p>
                    <button onClick={() => toggleLike(100 + i)} className={`flex items-center gap-1.5 text-[13px] font-medium mt-2 transition-colors ${likedPosts.has(100 + i) ? 'text-[#FF3B30]' : 'text-[#8B8D93] hover:text-[#FF3B30]'}`}>
                      <Heart className={`w-4 h-4 ${likedPosts.has(100 + i) ? 'fill-[#FF3B30]' : ''}`} strokeWidth={1.5} />{r.likes + (likedPosts.has(100 + i) ? 1 : 0)}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Media' && (
          <div className="grid grid-cols-3 gap-[2px] p-[2px]">
            {userMedia.map((src, i) => (
              <div key={i} className="aspect-square relative cursor-pointer group">
                <img src={src} alt="Media" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  {i === 4 && <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />}
                  {i !== 4 && <Image className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Likes' && (
          <div className="flex flex-col">
            {userLikedPosts.map((post, i) => (
              <div key={i} className="px-4 pt-5 pb-3 border-b border-[#121419]">
                <div className="flex gap-3">
                  <img src={post.avatar} className="w-[44px] h-[44px] rounded-full object-cover" alt={post.user} />
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="font-bold text-[15px]">{post.user}</span>
                      {post.verified && <VerifiedBadge className="w-4 h-4 text-[#2ECC71]" />}
                      <span className="text-[#8B8D93] text-[13px] ml-1">{post.handle} · {post.time}</span>
                    </div>
                    <p className="text-[#E5E7EB] text-[15px] leading-relaxed">{post.content}</p>
                    <div className="flex items-center gap-1.5 text-[#FF3B30] text-[13px] font-medium mt-2">
                      <Heart className="w-4 h-4 fill-[#FF3B30]" strokeWidth={1.5} />{post.likes}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
