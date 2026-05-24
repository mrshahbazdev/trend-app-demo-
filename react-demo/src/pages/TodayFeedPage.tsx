import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, MapPin, MoreHorizontal, Heart, MessageCircle, Repeat, Share, Bookmark, Flag, VolumeX, Ban, EyeOff, Link, X } from 'lucide-react';
import NewLogo from '../components/NewLogo';
import VerifiedBadge from '../components/VerifiedBadge';
import BottomNav from '../components/BottomNav';
import { stories, feedPosts, newsPosts, marketTrendPosts } from '../data/mockData';

function SquarePenIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.375 2.625a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
    </svg>
  );
}

interface PostData {
  id: number;
  user: string;
  handle: string;
  avatar: string;
  verified: boolean;
  badge: string | null;
  time: string;
  content: string;
  image: string | null;
  likes: number;
  comments: number;
  reposts: number;
}

const mockComments = [
  { user: "Alex M.", text: "Great insight! Totally agree with this.", time: "2m", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" },
  { user: "Priya P.", text: "This is exactly what I was thinking.", time: "5m", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" },
  { user: "DeFi Fan", text: "Can you elaborate more on this?", time: "12m", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" },
  { user: "Market Pro", text: "This confirms my analysis too.", time: "18m", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" },
];

function PostCard({ post, liked, onToggleLike }: { post: PostData; liked: boolean; onToggleLike: () => void }) {
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);
  const [showRepost, setShowRepost] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(mockComments);
  const [shareToast, setShareToast] = useState('');

  const addComment = () => {
    if (!commentText.trim()) return;
    setComments(prev => [{ user: "You", text: commentText, time: "now", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" }, ...prev]);
    setCommentText('');
  };

  const handleShare = (platform: string) => {
    setShareToast(`Shared to ${platform}!`);
    setTimeout(() => { setShareToast(''); setShowShare(false); }, 1200);
  };

  const menuItems = [
    { icon: Bookmark, label: saved ? 'Unsave' : 'Save Post', action: () => { setSaved(!saved); setShowMenu(false); } },
    { icon: EyeOff, label: 'Not Interested', action: () => setShowMenu(false) },
    { icon: VolumeX, label: `Mute ${post.user}`, action: () => setShowMenu(false) },
    { icon: Ban, label: `Block ${post.user}`, action: () => setShowMenu(false), danger: true },
    { icon: Flag, label: 'Report Post', action: () => setShowMenu(false), danger: true },
    { icon: Link, label: 'Copy Link', action: () => { setShareToast('Link copied!'); setShowMenu(false); setTimeout(() => setShareToast(''), 1500); } },
  ];

  return (
    <>
    <article className="flex flex-col px-4 pt-5 pb-3 border-b border-[#121419]">
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3">
          <img onClick={() => navigate('/profile')} src={post.avatar} className="w-[44px] h-[44px] rounded-full object-cover cursor-pointer" alt="Avatar" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1 mt-[2px]">
              <span onClick={() => navigate('/profile')} className="font-bold text-[16px] cursor-pointer hover:underline">{post.user}</span>
              {post.verified && <VerifiedBadge className="w-[16px] h-[16px] text-[#2ECC71]" />}
              <span className="text-[#8B8D93] text-[14px] ml-1">{post.handle}</span>
              <span className="text-[#8B8D93] text-[14px] px-0.5">·</span>
              <span className="text-[#8B8D93] text-[14px]">{post.time}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {post.badge && (
            <span className={`text-[11px] font-bold px-[8px] py-[4px] rounded-md tracking-wide ${
              post.badge === 'News' ? 'bg-[#1A2332] text-[#4A9EFF]' :
              post.badge === 'Analyst' ? 'bg-[#1A3322] text-[#2ECC71]' :
              'bg-[#24133D] text-[#A770EF]'
            }`}>{post.badge}</span>
          )}
          <button onClick={() => setShowMenu(!showMenu)} className="text-[#8B8D93] hover:text-white transition-colors relative">
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
            onClick={onToggleLike}
            className={`flex items-center gap-1.5 text-[13px] font-medium hover:text-[#FF3B30] transition-colors ${liked ? 'text-[#FF3B30]' : ''}`}
          >
            <Heart className={`w-[18px] h-[18px] ${liked ? 'fill-[#FF3B30]' : ''}`} strokeWidth={1.5} />
            {post.likes + (liked ? 1 : 0)}
          </button>
          <button onClick={() => setShowComments(true)} className="flex items-center gap-1.5 text-[13px] font-medium hover:text-[#2ECC71] transition-colors">
            <MessageCircle className="w-[18px] h-[18px]" strokeWidth={1.5} />
            {post.comments}
          </button>
          <button onClick={() => setShowRepost(true)} className={`flex items-center gap-1.5 text-[13px] font-medium transition-colors ${reposted ? 'text-[#2979FF]' : 'hover:text-[#2979FF]'}`}>
            <Repeat className={`w-[18px] h-[18px]`} strokeWidth={1.5} />
            {post.reposts + (reposted ? 1 : 0)}
          </button>
          <button onClick={() => setShowShare(true)} className="flex items-center gap-1.5 text-[13px] font-medium hover:text-white transition-colors">
            <Share className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </article>

    {/* 3-dot Menu */}
    {showMenu && (
      <div className="fixed inset-0 z-50" onClick={() => setShowMenu(false)}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-[#0A0D12] border-t border-[#1C1E23] rounded-t-[24px] p-2 pb-8 z-50" onClick={e => e.stopPropagation()}>
          <div className="w-10 h-1 bg-[#2A2E36] rounded-full mx-auto mb-3 mt-1" />
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-[12px] transition-colors hover:bg-[#121419] ${item.danger ? 'text-[#FF3B30]' : 'text-[#F3F4F6]'}`}
            >
              <item.icon className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-[15px] font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    )}

    {/* Toast */}
    {shareToast && (
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] bg-[#2ECC71] text-[#040508] font-bold text-[14px] px-5 py-2.5 rounded-full shadow-lg animate-bounce">
        {shareToast}
      </div>
    )}

    {/* Comments Sheet */}
    {showComments && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
        <div className="bg-[#0A0D12] border-t border-[#1C1E23] rounded-t-[24px] w-full max-w-[430px] max-h-[70vh] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-[#1C1E23]">
            <h3 className="text-[17px] font-bold">Comments ({comments.length})</h3>
            <button onClick={() => setShowComments(false)} className="text-[#8B8D93] text-[14px] font-bold">Close</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {comments.map((c, i) => (
              <div key={i} className="flex gap-3">
                <img src={c.avatar} className="w-8 h-8 rounded-full object-cover" alt={c.user} />
                <div className="flex-1">
                  <div className="flex items-baseline gap-2"><span className="font-bold text-[13px]">{c.user}</span><span className="text-[#8B8D93] text-[11px]">{c.time}</span></div>
                  <p className="text-[14px] text-[#D1D5DB]">{c.text}</p>
                  <div className="flex items-center gap-4 mt-1.5">
                    <button className="text-[11px] text-[#8B8D93] font-medium hover:text-[#FF3B30]">❤️ Like</button>
                    <button className="text-[11px] text-[#8B8D93] font-medium hover:text-[#2ECC71]">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-[#1C1E23] flex gap-3">
            <input value={commentText} onChange={e => setCommentText(e.target.value)} onKeyDown={e => e.key === 'Enter' && addComment()} placeholder="Add a comment..." className="flex-1 bg-[#121419] border border-[#1C1E23] rounded-full px-4 py-2.5 text-[14px] text-white outline-none focus:border-[#2ECC71]" />
            <button onClick={addComment} className="bg-[#2ECC71] text-[#040508] font-bold text-[13px] px-4 rounded-full">Post</button>
          </div>
        </div>
      </div>
    )}

    {/* Repost Modal */}
    {showRepost && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
        <div className="bg-[#0A0D12] border border-[#1C1E23] rounded-[20px] p-6 max-w-[320px] w-full">
          <h3 className="text-[17px] font-bold text-center mb-2">Repost?</h3>
          <p className="text-[#8B8D93] text-[14px] text-center mb-5">Share this post with your followers?</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => { setReposted(true); setShowRepost(false); }} className="bg-[#2979FF] text-white font-bold text-[15px] py-3 rounded-[12px]">Repost</button>
            <button onClick={() => setShowRepost(false)} className="bg-[#121419] border border-[#1C1E23] text-[#F3F4F6] font-bold text-[15px] py-3 rounded-[12px]">Quote Repost</button>
            <button onClick={() => setShowRepost(false)} className="text-[#8B8D93] font-bold text-[14px] py-2">Cancel</button>
          </div>
        </div>
      </div>
    )}

    {/* Share Sheet */}
    {showShare && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
        <div className="bg-[#0A0D12] border-t border-[#1C1E23] rounded-t-[24px] w-full max-w-[430px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[17px] font-bold">Share</h3>
            <button onClick={() => setShowShare(false)}><X className="w-5 h-5 text-[#8B8D93]" /></button>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {[
              { name: 'Copy Link', icon: '🔗' },
              { name: 'Twitter', icon: '𝕏' },
              { name: 'Telegram', icon: '✈️' },
              { name: 'WhatsApp', icon: '💬' },
              { name: 'Instagram', icon: '📷' },
              { name: 'Email', icon: '📧' },
              { name: 'Messages', icon: '💌' },
              { name: 'More', icon: '⋯' },
            ].map(s => (
              <button key={s.name} onClick={() => handleShare(s.name)} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-[#121419] border border-[#1C1E23] flex items-center justify-center text-[20px] hover:border-[#2ECC71] transition-colors">
                  {s.icon}
                </div>
                <span className="text-[11px] text-[#8B8D93]">{s.name}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setShowShare(false)} className="w-full bg-[#121419] border border-[#1C1E23] text-[#F3F4F6] font-bold text-[15px] py-3 rounded-[12px]">Cancel</button>
        </div>
      </div>
    )}
    </>
  );
}

export default function TodayFeedPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Today');
  const [activeFilter, setActiveFilter] = useState('All');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const currentPosts = activeTab === 'News' ? newsPosts : activeTab === 'Market Trend' ? marketTrendPosts : feedPosts;
  const filters = ['All', 'Topics', 'Creators'];

  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans relative pb-[90px] antialiased">
      <header className="sticky top-0 left-0 w-full z-50 bg-[#040508]/95 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between border-b border-[#121419]">
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-[38px] h-[38px]" />
          <h1 className="text-[22px] font-bold tracking-tight text-[#FFFFFF]">TrendUpLive</h1>
        </div>
        <div className="flex items-center gap-3.5">
          <button onClick={() => navigate('/search')} className="hover:text-gray-300 transition-colors">
            <Search className="w-[22px] h-[22px] text-[#F3F4F6]" strokeWidth={2} />
          </button>
          <button onClick={() => navigate('/notifications')} className="relative hover:text-gray-300 transition-colors">
            <Bell className="w-[22px] h-[22px] text-[#F3F4F6]" strokeWidth={2} />
            <span className="absolute top-[-2px] right-[-2px] w-[9px] h-[9px] bg-[#FF3B30] rounded-full border-[2px] border-[#040508]"></span>
          </button>
          <button onClick={() => navigate('/create-post')} className="w-[34px] h-[34px] rounded-full bg-[#00D1B2] flex items-center justify-center hover:bg-[#00B59A] transition-colors shadow-[0_0_15px_rgba(0,209,178,0.3)]">
            <SquarePenIcon className="w-[18px] h-[18px] text-[#042F24]" />
          </button>
        </div>
      </header>

      <div className="flex items-center justify-between px-8 pt-4 pb-0 border-b border-[#1A1C22]">
        {['Today', 'News', 'Market Trend'].map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); if (tab === 'Market Trend') navigate('/vote-market'); }}
            className={`text-[15px] pb-3 px-1 ${activeTab === tab ? 'font-bold text-[#FFFFFF] border-b-[3px] border-[#2ECC71]' : 'font-medium text-[#8B8D93] hover:text-gray-300 transition-colors'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 px-4 py-[14px] overflow-x-auto">
        {filters.map(pill => (
          <button
            key={pill}
            onClick={() => setActiveFilter(pill)}
            className={`px-5 py-[6px] rounded-full text-[14px] font-medium whitespace-nowrap transition-colors ${
              activeFilter === pill
                ? 'bg-transparent border border-[#2ECC71] text-[#2ECC71]'
                : 'bg-[#121419] border border-[#23252A] text-[#E0E0E0]'
            }`}
          >
            {pill}
          </button>
        ))}
        <button
          onClick={() => setActiveFilter('Near You')}
          className={`px-4 py-[6px] rounded-full text-[14px] font-medium whitespace-nowrap flex items-center gap-1.5 transition-colors ${
            activeFilter === 'Near You'
              ? 'bg-transparent border border-[#2ECC71] text-[#2ECC71]'
              : 'bg-[#121419] border border-[#23252A] text-[#E0E0E0]'
          }`}
        >
          <MapPin className="w-[14px] h-[14px]" strokeWidth={2} />
          Near You
        </button>
      </div>

      {activeTab === 'Today' && (
        <div className="flex items-start gap-4 px-4 pb-4 border-b border-[#121419] overflow-x-auto">
          {stories.map((s, i) => (
            <div key={i} onClick={() => navigate(`/story?idx=${i}`)} className="flex flex-col items-center gap-1.5 min-w-[72px] cursor-pointer">
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
      )}

      <div className="flex flex-col">
        {currentPosts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            liked={likedPosts.has(post.id)}
            onToggleLike={() => toggleLike(post.id)}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
