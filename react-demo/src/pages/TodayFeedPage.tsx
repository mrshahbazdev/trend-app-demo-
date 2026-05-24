import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, MapPin, MoreHorizontal, Heart, MessageCircle, Repeat, Share, Bookmark, Flag, VolumeX, Ban, EyeOff, Link, X } from 'lucide-react';
import NewLogo from '../components/NewLogo';
import VerifiedBadge from '../components/VerifiedBadge';
import BottomNav from '../components/BottomNav';
import { stories, feedPosts, newsPosts, marketTrendPosts, livePosts } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

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
  const { t } = useTheme();
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
    <article className="flex flex-col px-4 pt-5 pb-3" style={{ borderBottom: `1px solid ${t.border}` }}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3">
          <img onClick={() => navigate('/profile')} src={post.avatar} className="w-[44px] h-[44px] rounded-full object-cover cursor-pointer" alt="Avatar" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1 mt-[2px]">
              <span onClick={() => navigate('/profile')} className="font-bold text-[16px] cursor-pointer hover:underline" style={{ color: t.text }}>{post.user}</span>
              {post.verified && <VerifiedBadge className="w-[16px] h-[16px]" style={{ color: t.green }} />}
              <span className="text-[14px] px-0.5 ml-auto" style={{ color: t.textMuted }}>·</span>
              <span className="text-[14px]" style={{ color: t.textMuted }}>{post.time}</span>
            </div>
            <span className="text-[13px]" style={{ color: t.textMuted }}>{post.handle}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {post.badge && (
            <span className="text-[11px] font-bold px-[8px] py-[4px] rounded-md tracking-wide" style={{
              backgroundColor: post.badge === 'News' ? t.badgeNews : post.badge === 'Analyst' ? t.badgeAnalyst : t.badgeCreator,
              color: post.badge === 'News' ? t.badgeNewsText : post.badge === 'Analyst' ? t.badgeAnalystText : t.badgeCreatorText,
            }}>{post.badge}</span>
          )}
          <button onClick={() => setShowMenu(!showMenu)} className="transition-colors relative" style={{ color: t.textMuted }}>
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="pl-[56px]">
        <p className="text-[15px] leading-[1.5] mb-3" style={{ color: t.textTer }}>{post.content}</p>
        {post.image && (
          <div className="rounded-[16px] overflow-hidden mb-3" style={{ border: `1px solid ${t.border}` }}>
            <img src={post.image} alt="Post" className="w-full h-auto object-cover max-h-[220px]" />
          </div>
        )}
        <div className="flex items-center justify-between pr-4 mt-2" style={{ color: t.textMuted }}>
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
        <div className="absolute inset-0" style={{ backgroundColor: t.overlay }} />
        <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto rounded-t-[24px] p-2 pb-8 z-50" style={{ backgroundColor: t.bgSec, borderTop: `1px solid ${t.border2}` }} onClick={e => e.stopPropagation()}>
          <div className="w-10 h-1 rounded-full mx-auto mb-3 mt-1" style={{ backgroundColor: t.border3 }} />
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className="flex items-center gap-4 w-full px-4 py-3.5 rounded-[12px] transition-colors"
              style={{ color: item.danger ? t.red : t.textSec }}
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
      <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-end justify-center" style={{ backgroundColor: t.overlay }}>
        <div className="rounded-t-[24px] w-full max-w-[430px] max-h-[70vh] flex flex-col" style={{ backgroundColor: t.bgSec, borderTop: `1px solid ${t.border2}` }}>
          <div className="flex items-center justify-between p-4" style={{ borderBottom: `1px solid ${t.border2}` }}>
            <h3 className="text-[17px] font-bold" style={{ color: t.text }}>Comments ({comments.length})</h3>
            <button onClick={() => setShowComments(false)} className="text-[14px] font-bold" style={{ color: t.textMuted }}>Close</button>
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
          <div className="p-3 flex gap-3" style={{ borderTop: `1px solid ${t.border2}` }}>
            <input value={commentText} onChange={e => setCommentText(e.target.value)} onKeyDown={e => e.key === 'Enter' && addComment()} placeholder="Add a comment..." className="flex-1 rounded-full px-4 py-2.5 text-[14px] outline-none" style={{ backgroundColor: t.bgTer, border: `1px solid ${t.border2}`, color: t.text }} />
            <button onClick={addComment} className="font-bold text-[13px] px-4 rounded-full" style={{ backgroundColor: t.green, color: '#040508' }}>Post</button>
          </div>
        </div>
      </div>
    )}

    {/* Repost Modal */}
    {showRepost && (
      <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-6" style={{ backgroundColor: t.overlay }}>
        <div className="rounded-[20px] p-6 max-w-[320px] w-full" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <h3 className="text-[17px] font-bold text-center mb-2" style={{ color: t.text }}>Repost?</h3>
          <p className="text-[14px] text-center mb-5" style={{ color: t.textMuted }}>Share this post with your followers?</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => { setReposted(true); setShowRepost(false); }} className="text-white font-bold text-[15px] py-3 rounded-[12px]" style={{ backgroundColor: t.blue }}>Repost</button>
            <button onClick={() => setShowRepost(false)} className="font-bold text-[15px] py-3 rounded-[12px]" style={{ backgroundColor: t.bgTer, border: `1px solid ${t.border2}`, color: t.textSec }}>Quote Repost</button>
            <button onClick={() => setShowRepost(false)} className="font-bold text-[14px] py-2" style={{ color: t.textMuted }}>Cancel</button>
          </div>
        </div>
      </div>
    )}

    {/* Share Sheet */}
    {showShare && (
      <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-end justify-center" style={{ backgroundColor: t.overlay }}>
        <div className="rounded-t-[24px] w-full max-w-[430px] p-5" style={{ backgroundColor: t.bgSec, borderTop: `1px solid ${t.border2}` }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[17px] font-bold" style={{ color: t.text }}>Share</h3>
            <button onClick={() => setShowShare(false)}><X className="w-5 h-5" style={{ color: t.textMuted }} /></button>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {[
              { name: 'Copy Link', icon: '🔗', color: t.textMuted },
              { name: 'Twitter', icon: '𝕏', color: '#1DA1F2' },
              { name: 'Telegram', icon: '✈️', color: '#0088CC' },
              { name: 'WhatsApp', icon: '💬', color: '#25D366' },
              { name: 'Instagram', icon: '📷', color: '#E4405F' },
              { name: 'Email', icon: '📧', color: t.textMuted },
              { name: 'Messages', icon: '💌', color: t.green },
              { name: 'More', icon: '⋯', color: t.textMuted },
            ].map(s => (
              <button key={s.name} onClick={() => handleShare(s.name)} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-[20px] transition-colors" style={{ backgroundColor: t.bgTer, border: `1px solid ${t.border2}` }}>
                  {s.icon}
                </div>
                <span className="text-[11px]" style={{ color: t.textMuted }}>{s.name}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setShowShare(false)} className="w-full font-bold text-[15px] py-3 rounded-[12px]" style={{ backgroundColor: t.bgTer, border: `1px solid ${t.border2}`, color: t.textSec }}>Cancel</button>
        </div>
      </div>
    )}
    </>
  );
}

export default function TodayFeedPage() {
  const navigate = useNavigate();
  const { t } = useTheme();
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

  const currentPosts = activeTab === 'News' ? newsPosts : activeTab === 'Market Trend' ? marketTrendPosts : activeTab === 'Live' ? livePosts : feedPosts;
  const filters = ['All', 'Topics', 'Creators'];

  return (
    <div className="min-h-screen font-sans relative pb-[90px] antialiased" style={{ backgroundColor: t.bg, color: t.text }}>
      <header className="sticky top-0 left-0 w-full z-50 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between" style={{ backgroundColor: t.backdrop, borderBottom: `1px solid ${t.border}` }}>
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-[38px] h-[38px]" />
          <h1 className="text-[22px] font-bold tracking-tight" style={{ color: t.text }}>TrendUpLive</h1>
        </div>
        <div className="flex items-center gap-3.5">
          <button onClick={() => navigate('/search')} className="transition-colors">
            <Search className="w-[22px] h-[22px]" strokeWidth={2} style={{ color: t.textSec }} />
          </button>
          <button onClick={() => navigate('/notifications')} className="relative transition-colors">
            <Bell className="w-[22px] h-[22px]" strokeWidth={2} style={{ color: t.textSec }} />
            <span className="absolute top-[-2px] right-[-2px] w-[9px] h-[9px] rounded-full" style={{ backgroundColor: t.red, border: `2px solid ${t.bg}` }}></span>
          </button>
          <button onClick={() => navigate('/create-post')} className="w-[34px] h-[34px] rounded-full bg-[#00D1B2] flex items-center justify-center hover:bg-[#00B59A] transition-colors shadow-[0_0_15px_rgba(0,209,178,0.3)]">
            <SquarePenIcon className="w-[18px] h-[18px] text-[#042F24]" />
          </button>
        </div>
      </header>

      <div className="flex items-center justify-between px-8 pt-4 pb-0" style={{ borderBottom: `1px solid ${t.border}` }}>
        {['Today', 'News', 'Live', 'Market Trend'].map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); if (tab === 'Market Trend') navigate('/vote-market'); }}
            className="text-[15px] pb-3 px-1"
            style={{
              fontWeight: activeTab === tab ? 700 : 500,
              color: activeTab === tab ? t.text : t.textMuted,
              borderBottom: activeTab === tab ? `3px solid ${t.green}` : 'none',
            }}
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
            className="px-5 py-[6px] rounded-full text-[14px] font-medium whitespace-nowrap transition-colors"
            style={{
              backgroundColor: activeFilter === pill ? 'transparent' : t.bgTer,
              border: `1px solid ${activeFilter === pill ? t.green : t.border3}`,
              color: activeFilter === pill ? t.green : t.textTer,
            }}
          >
            {pill}
          </button>
        ))}
        <button
          onClick={() => setActiveFilter('Near You')}
          className="px-4 py-[6px] rounded-full text-[14px] font-medium whitespace-nowrap flex items-center gap-1.5 transition-colors"
          style={{
            backgroundColor: activeFilter === 'Near You' ? 'transparent' : t.bgTer,
            border: `1px solid ${activeFilter === 'Near You' ? t.green : t.border3}`,
            color: activeFilter === 'Near You' ? t.green : t.textTer,
          }}
        >
          <MapPin className="w-[14px] h-[14px]" strokeWidth={2} />
          Near You
        </button>
      </div>

      {(activeTab === 'Today' || activeTab === 'Live') && (
        <div className="flex items-start gap-4 px-4 pb-4 overflow-x-auto" style={{ borderBottom: `1px solid ${t.border}` }}>
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
                  <div className={`w-full h-full rounded-full overflow-hidden`} style={{ backgroundColor: s.ring !== 'green' && s.ring !== 'default' ? t.bg : undefined, borderColor: s.ring !== 'green' && s.ring !== 'default' ? t.bg : undefined, borderWidth: s.ring !== 'green' && s.ring !== 'default' ? 2 : undefined }}>
                    <img src={s.img} className="w-full h-full rounded-full object-cover" alt={s.name} />
                  </div>
                </div>
                {s.verified && (
                  <div className="absolute bottom-0 right-0 rounded-full" style={{ border: `2px solid ${t.bg}`, backgroundColor: t.bg }}>
                    <VerifiedBadge className="w-[16px] h-[16px]" style={{ color: t.green }} />
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-bold text-center leading-tight" style={{ color: t.text }}>{s.name}</span>
                <span className="text-[10px]" style={{ color: t.textMuted }}>{s.followers}</span>
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
