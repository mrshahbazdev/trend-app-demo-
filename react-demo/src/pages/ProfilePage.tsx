import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Share, MoreHorizontal, User, Users, FileText, Heart, MessageCircle, Repeat, Image, Play, Camera, X, ExternalLink, Star, CheckCircle } from 'lucide-react';
import VerifiedBadge from '../components/VerifiedBadge';
import BottomNav from '../components/BottomNav';
import { useTheme } from '../context/ThemeContext';

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

const userVotes = [
  { question: "Will BTC hit $70k before June?", votedYes: true, yesPercent: 62, totalVotes: "2.8K", status: "Active", reward: "2.3x" },
  { question: "Fed rate cut before September?", votedYes: true, yesPercent: 71, totalVotes: "3.4K", status: "Won", reward: "1.8x" },
  { question: "Will ETH flip BTC market cap in 2024?", votedYes: false, yesPercent: 28, totalVotes: "1.2K", status: "Active", reward: "3.1x" },
  { question: "NVDA hits $1000 before earnings?", votedYes: true, yesPercent: 55, totalVotes: "892", status: "Lost", reward: "0x" },
];

const userProjects = [
  { name: "TrendUp Analytics", desc: "Open-source market analytics dashboard with real-time data feeds.", tech: ["React", "TypeScript", "WebSocket"], stars: 234, status: "Active", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400&auto=format&fit=crop" },
  { name: "CryptoSignals Bot", desc: "Automated trading signals based on technical analysis patterns.", tech: ["Python", "ML", "APIs"], stars: 567, status: "Active", image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=400&auto=format&fit=crop" },
  { name: "DeFi Portfolio Tracker", desc: "Multi-chain portfolio tracking with yield farming analytics.", tech: ["Web3", "Solidity", "React"], stars: 123, status: "Beta", image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=400&auto=format&fit=crop" },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { t } = useTheme();
  const [following, setFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('Posts');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [profileImg, setProfileImg] = useState("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop");
  const [coverImg, setCoverImg] = useState("https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1000&auto=format&fit=crop");
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showCoverUpload, setShowCoverUpload] = useState(false);
  const [uploadToast, setUploadToast] = useState('');
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const toggleLike = (i: number) => {
    setLikedPosts(prev => { const next = new Set(prev); if (next.has(i)) next.delete(i); else next.add(i); return next; });
  };

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImg(url);
      setShowImageUpload(false);
      setUploadToast('Profile photo updated!');
      setTimeout(() => setUploadToast(''), 2000);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverImg(url);
      setShowCoverUpload(false);
      setUploadToast('Cover photo updated!');
      setTimeout(() => setUploadToast(''), 2000);
    }
  };

  const tabs = ['Posts', 'Replies', 'Media', 'Likes', 'Votes', 'Projects'];

  return (
    <div className="min-h-screen font-sans relative pb-[90px] antialiased" style={{ backgroundColor: t.profileBg, color: t.text }}>
      {/* Cover Image with Upload */}
      <div className="absolute top-0 left-0 w-full h-[160px] z-0 group" style={{ backgroundColor: t.bgTer }}>
        <img src={coverImg} alt="Profile Banner" className="w-full h-full object-cover opacity-80" />
        <div className="absolute bottom-0 left-0 w-full h-[60px]" style={{ background: `linear-gradient(to top, ${t.profileBg}, transparent)` }}></div>
        <button
          onClick={() => setShowCoverUpload(true)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ opacity: 1 }}
        >
          <Camera className="w-4 h-4 text-white" />
        </button>
      </div>

      <header className="sticky top-0 left-0 w-full z-50 flex items-center justify-between px-4 pt-4 pb-4" style={{ background: `linear-gradient(to bottom, ${t.profileBg}cc, transparent)` }}>
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
            {/* Profile Image with Upload */}
            <div className="relative group">
              <div className="w-[96px] h-[96px] rounded-full overflow-hidden" style={{ border: `4px solid ${t.profileBg}`, backgroundColor: t.bgHover }}>
                <img src={profileImg} alt="Jason Lin" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 rounded-full" style={{ border: `2px solid ${t.profileBg}`, backgroundColor: t.profileBg }}>
                <VerifiedBadge className="w-[22px] h-[22px] text-[#2ECC71]" />
              </div>
              <button
                onClick={() => setShowImageUpload(true)}
                className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ opacity: 0.6 }}
              >
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => setFollowing(!following)}
                className="h-[34px] px-[22px] rounded-full text-[14.5px] font-bold tracking-wide transition-all"
                style={following ? { backgroundColor: 'transparent', border: `1px solid ${t.border3}`, color: t.textSubtle } : { backgroundColor: t.greenBg, color: '#FFFFFF' }}
              >
                {following ? 'Following' : 'Follow'}
              </button>
              <button onClick={() => navigate('/chats/detail')} className="w-[34px] h-[34px] rounded-full flex items-center justify-center" style={{ border: `1px solid ${t.border3}`, color: t.textSubtle }}>
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
              <span className="text-[15px]" style={{ color: t.textMuted }}>@jasonlin</span>
              <span className="text-[12px] font-bold px-[8px] py-[3px] rounded-md tracking-wide" style={{ backgroundColor: t.badgeCreator, color: t.badgeCreatorText }}>Creator</span>
            </div>
          </div>

          <div className="text-[15.5px] leading-[1.5] mb-6" style={{ color: t.textSec }}>
            <p>Building open tools for the future.</p>
            <p style={{ color: t.textMuted }}>AI · Web3 · Open Source</p>
          </div>

          <div className="flex items-center justify-between pr-4 mb-6">
            {[
              { icon: User, label: "Following", value: "312" },
              { icon: Users, label: "Followers", value: following ? "24.6K" : "24.5K" },
              { icon: FileText, label: "Posts", value: "1,847" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5 text-white">
                  <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} style={{ color: t.textMuted }} />
                  <span className="font-bold text-[16px]" style={{ color: t.text }}>{value}</span>
                </div>
                <span className="text-[13px] font-medium" style={{ color: t.textMuted }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 px-3 pt-1 pb-0 overflow-x-auto" style={{ borderBottom: `1px solid ${t.border}` }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="text-[14px] font-bold pb-2.5 whitespace-nowrap transition-colors"
              style={{ color: activeTab === tab ? t.text : t.textSubtle, borderBottom: activeTab === tab ? `3px solid ${t.green}` : 'none' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Posts Tab */}
        {activeTab === 'Posts' && (
          <div className="flex flex-col">
            {userPosts.map((post, i) => (
              <article key={i} className="px-4 pt-5 pb-3" style={{ borderBottom: `1px solid ${t.border}` }}>
                <div className="flex gap-3 mb-3">
                  <img src={profileImg} className="w-[44px] h-[44px] rounded-full object-cover" alt="Avatar" />
                  <div className="flex items-center gap-1 mt-[2px]">
                    <span className="font-bold text-[16px]">Jason Lin</span>
                    <VerifiedBadge className="w-[16px] h-[16px] text-[#2ECC71]" />
                    <span className="text-[#8B8D93] text-[14px] ml-1">@jasonlin · {post.time}</span>
                  </div>
                </div>
                <div className="pl-[56px]">
                  <p className="text-[15px] leading-[1.5] mb-3" style={{ color: t.textTer }}>{post.content}</p>
                  {post.image && (
                    <div className="rounded-[16px] overflow-hidden mb-3" style={{ border: `1px solid ${t.border}` }}>
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

        {/* Replies Tab */}
        {activeTab === 'Replies' && (
          <div className="flex flex-col">
            {userReplies.map((r, i) => (
              <div key={i} className="px-4 pt-5 pb-4" style={{ borderBottom: `1px solid ${t.border}` }}>
                <div className="text-[13px] mb-2" style={{ color: t.textMuted }}>Replying to <span style={{ color: t.green }}>{r.replyTo}</span></div>
                <div className="rounded-[12px] p-3 mb-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
                  <p className="text-[13px] italic" style={{ color: t.textMuted }}>"{r.original}"</p>
                </div>
                <div className="flex gap-3">
                  <img src={profileImg} className="w-[36px] h-[36px] rounded-full object-cover" alt="Avatar" />
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

        {/* Media Tab */}
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

        {/* Likes Tab */}
        {activeTab === 'Likes' && (
          <div className="flex flex-col">
            {userLikedPosts.map((post, i) => (
              <div key={i} className="px-4 pt-5 pb-3" style={{ borderBottom: `1px solid ${t.border}` }}>
                <div className="flex gap-3">
                  <img src={post.avatar} className="w-[44px] h-[44px] rounded-full object-cover" alt={post.user} />
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="font-bold text-[15px]" style={{ color: t.text }}>{post.user}</span>
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

        {/* Votes Tab */}
        {activeTab === 'Votes' && (
          <div className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#A0A2A8] text-[13px] font-medium">{userVotes.length} predictions</span>
              <span className="text-[#2ECC71] text-[13px] font-bold">Win Rate: 67%</span>
            </div>
            {userVotes.map((v, i) => (
              <div key={i} className="rounded-[16px] p-4" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
                <div className="flex items-start justify-between mb-3">
                  <p className="text-[15px] font-medium flex-1 pr-3" style={{ color: t.textSec }}>{v.question}</p>
                  <span className={`text-[11px] font-bold px-2 py-1 rounded-md whitespace-nowrap ${
                    v.status === 'Won' ? 'bg-[#2ECC71]/20 text-[#2ECC71]' :
                    v.status === 'Lost' ? 'bg-[#FF3B30]/20 text-[#FF3B30]' :
                    'bg-[#FF9800]/20 text-[#FF9800]'
                  }`}>{v.status}</span>
                </div>
                <div className="w-full h-[6px] rounded-full overflow-hidden mb-3" style={{ backgroundColor: t.bgTer }}>
                  <div className="h-full bg-gradient-to-r from-[#2ECC71] to-[#27ae60] rounded-full transition-all" style={{ width: `${v.yesPercent}%` }} />
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-3">
                    <span className={`font-bold ${v.votedYes ? 'text-[#2ECC71]' : 'text-[#FF3B30]'}`}>
                      Voted {v.votedYes ? 'Yes' : 'No'}
                    </span>
                    <span className="text-[#8B8D93]">{v.totalVotes} votes</span>
                  </div>
                  <span className="text-[#8B8D93]">Reward: <span className="text-[#F1D683] font-bold">{v.reward}</span></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'Projects' && (
          <div className="p-4 flex flex-col gap-4">
            {userProjects.map((p, i) => (
              <div key={i} className="rounded-[16px] overflow-hidden" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
                <img src={p.image} alt={p.name} className="w-full h-[120px] object-cover" />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[16px] font-bold" style={{ color: t.textSec }}>{p.name}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        p.status === 'Active' ? 'bg-[#2ECC71]/20 text-[#2ECC71]' : 'bg-[#4A9EFF]/20 text-[#4A9EFF]'
                      }`}>{p.status}</span>
                    </div>
                    <button className="text-[#8B8D93] hover:text-white">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[14px] leading-relaxed mb-3" style={{ color: t.textMuted }}>{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      {p.tech.map(techName => (
                        <span key={techName} className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: t.bgTer, border: `1px solid ${t.border2}`, color: t.textSubtle }}>{techName}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[#F1D683]">
                      <Star className="w-3.5 h-3.5 fill-[#F1D683]" />
                      <span className="text-[12px] font-bold">{p.stars}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hidden file inputs */}
      <input ref={profileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProfileUpload} />
      <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />

      {/* Profile Image Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 backdrop-blur-sm z-[60] flex items-center justify-center p-6" style={{ backgroundColor: t.overlay }}>
          <div className="rounded-[20px] p-6 max-w-[320px] w-full" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[17px] font-bold" style={{ color: t.text }}>Profile Photo</h3>
              <button onClick={() => setShowImageUpload(false)}><X className="w-5 h-5" style={{ color: t.textMuted }} /></button>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={() => profileInputRef.current?.click()} className="bg-[#2ECC71] text-[#040508] font-bold text-[15px] py-3 rounded-[12px] flex items-center justify-center gap-2">
                <Camera className="w-5 h-5" /> Upload Photo
              </button>
              <button onClick={() => { setProfileImg("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"); setShowImageUpload(false); setUploadToast('Profile photo updated!'); setTimeout(() => setUploadToast(''), 2000); }} className="bg-[#121419] border border-[#1C1E23] text-[#F3F4F6] font-bold text-[15px] py-3 rounded-[12px]">
                Choose Avatar
              </button>
              <button onClick={() => setShowImageUpload(false)} className="text-[#8B8D93] font-bold text-[14px] py-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Cover Upload Modal */}
      {showCoverUpload && (
        <div className="fixed inset-0 backdrop-blur-sm z-[60] flex items-center justify-center p-6" style={{ backgroundColor: t.overlay }}>
          <div className="rounded-[20px] p-6 max-w-[320px] w-full" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[17px] font-bold" style={{ color: t.text }}>Cover Photo</h3>
              <button onClick={() => setShowCoverUpload(false)}><X className="w-5 h-5" style={{ color: t.textMuted }} /></button>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={() => coverInputRef.current?.click()} className="bg-[#2ECC71] text-[#040508] font-bold text-[15px] py-3 rounded-[12px] flex items-center justify-center gap-2">
                <Camera className="w-5 h-5" /> Upload Cover
              </button>
              <button onClick={() => { setCoverImg("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"); setShowCoverUpload(false); setUploadToast('Cover photo updated!'); setTimeout(() => setUploadToast(''), 2000); }} className="bg-[#121419] border border-[#1C1E23] text-[#F3F4F6] font-bold text-[15px] py-3 rounded-[12px]">
                Choose from Gallery
              </button>
              <button onClick={() => setShowCoverUpload(false)} className="text-[#8B8D93] font-bold text-[14px] py-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Toast */}
      {uploadToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-2 bg-[#2ECC71] text-[#040508] font-bold text-[14px] px-5 py-2.5 rounded-full shadow-lg">
          <CheckCircle className="w-4 h-4" /> {uploadToast}
        </div>
      )}

      <BottomNav />
    </div>
  );
}
