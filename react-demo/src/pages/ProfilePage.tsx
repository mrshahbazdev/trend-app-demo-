import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Share, MoreHorizontal, User, Users, FileText, Heart, MessageCircle, Repeat } from 'lucide-react';
import VerifiedBadge from '../components/VerifiedBadge';
import BottomNav from '../components/BottomNav';

export default function ProfilePage() {
  const navigate = useNavigate();

  const posts = [
    {
      content: "Building open tools for the future. The AI revolution isn't just about models — it's about infrastructure.",
      time: "3h",
      likes: 89,
      comments: 12,
      reposts: 7,
    },
    {
      content: "Markets are showing interesting patterns this week. Tech earnings could be the catalyst for the next move.",
      time: "1d",
      likes: 234,
      comments: 45,
      reposts: 23,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020305] text-white font-sans relative pb-[90px] antialiased">
      <div className="absolute top-0 left-0 w-full h-[160px] bg-[#12161A] z-0">
        <img src="https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1000&auto=format&fit=crop" alt="Profile Banner" className="w-full h-full object-cover opacity-80" />
        <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-[#020305] to-transparent"></div>
      </div>

      <header className="sticky top-0 left-0 w-full z-50 bg-gradient-to-b from-[#020305]/80 to-transparent flex items-center justify-between px-4 pt-4 pb-4 transition-colors">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white hover:text-gray-300 transition-colors drop-shadow-md">
            <ChevronLeft className="w-[26px] h-[26px]" strokeWidth={2.5} />
          </button>
          <div className="flex items-center gap-[6px] drop-shadow-md">
            <h1 className="text-[20px] font-bold tracking-tight">Jason Lin</h1>
            <VerifiedBadge className="w-5 h-5 text-[#2ECC71]" />
          </div>
        </div>
        <div className="flex items-center gap-[18px] text-white drop-shadow-md">
          <button className="hover:text-gray-300 transition-colors">
            <Share className="w-[22px] h-[22px]" strokeWidth={2} />
          </button>
          <button onClick={() => navigate('/settings')} className="hover:text-gray-300 transition-colors">
            <MoreHorizontal className="w-[26px] h-[26px]" strokeWidth={2} />
          </button>
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
              <button className="h-[34px] px-[22px] rounded-full bg-[#178544] hover:bg-[#126b36] transition-colors text-white text-[14.5px] font-bold tracking-wide">
                Follow
              </button>
              <button className="w-[34px] h-[34px] rounded-full border border-[#2A2E36] flex items-center justify-center text-[#A0A2A8] hover:bg-[#121419] transition-colors">
                <MoreHorizontal className="w-[18px] h-[18px]" strokeWidth={2} />
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
              { icon: Users, label: "Followers", value: "24.5K" },
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
          {['Posts', 'Replies', 'Media', 'Likes'].map((tab, i) => (
            <button key={tab} className={`text-[15.5px] font-bold pb-2.5 ${i === 0 ? 'text-[#FFFFFF] border-b-[3px] border-[#2ECC71]' : 'text-[#A0A2A8] hover:text-white transition-colors'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col">
          {posts.map((post, i) => (
            <article key={i} className="px-4 pt-5 pb-3 border-b border-[#121419]">
              <div className="flex gap-3 mb-3">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" className="w-[44px] h-[44px] rounded-full object-cover" alt="Avatar" />
                <div className="flex items-center gap-1 mt-[2px]">
                  <span className="font-bold text-[16px]">Jason Lin</span>
                  <VerifiedBadge className="w-[16px] h-[16px] text-[#2ECC71]" />
                  <span className="text-[#8B8D93] text-[14px] ml-1">@jasonlin</span>
                  <span className="text-[#8B8D93] text-[14px] px-0.5">·</span>
                  <span className="text-[#8B8D93] text-[14px]">{post.time}</span>
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
                  <button className="flex items-center gap-1.5 text-[13px] font-medium hover:text-[#FF3B30] transition-colors">
                    <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-[13px] font-medium hover:text-[#2ECC71] transition-colors">
                    <MessageCircle className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 text-[13px] font-medium hover:text-[#2979FF] transition-colors">
                    <Repeat className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    {post.reposts}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
