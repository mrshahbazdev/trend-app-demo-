import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, SquarePen, ChevronRight, Users, Hash, Flame, Star, Sparkles } from 'lucide-react';
import NewLogo from '../components/NewLogo';
import BottomNav from '../components/BottomNav';
import VerifiedBadge from '../components/VerifiedBadge';
import { useTheme } from '../context/ThemeContext';

const featuredTopics = [
  { name: 'Bitcoin Halving', posts: '12.4K posts', trend: 'Trending', color: '#F7931A', icon: '₿' },
  { name: 'AI Revolution', posts: '8.7K posts', trend: 'Trending', color: '#7C3AED', icon: '🤖' },
  { name: 'DeFi Summer 2.0', posts: '6.2K posts', trend: 'Hot', color: '#2ECC71', icon: '🔥' },
  { name: 'Ethereum ETF', posts: '5.1K posts', trend: 'Breaking', color: '#627EEA', icon: '📊' },
];

const trendingCommunities = [
  { name: 'Crypto Alpha', members: '142K', avatar: '', avatarLetter: 'C', avatarColor: '#F7931A', verified: true, desc: 'Premium crypto analysis & calls', online: 3241 },
  { name: 'DeFi Builders', members: '89K', avatar: '', avatarLetter: 'D', avatarColor: '#2ECC71', verified: true, desc: 'Building the future of finance', online: 1873 },
  { name: 'NFT Collectors', members: '67K', avatar: '', avatarLetter: 'N', avatarColor: '#7C3AED', verified: false, desc: 'Digital art & collectibles community', online: 982 },
  { name: 'Macro Insights', members: '54K', avatar: '', avatarLetter: 'M', avatarColor: '#2979FF', verified: true, desc: 'Global macro & economic analysis', online: 1456 },
  { name: 'Web3 Gaming', members: '38K', avatar: '', avatarLetter: 'W', avatarColor: '#FF7A00', verified: false, desc: 'Play-to-earn & blockchain gaming', online: 723 },
];

const topCreators = [
  { name: 'Alex Morgan', handle: '@alexmorgan', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop', verified: true, followers: '1.3M', category: 'Lifestyle' },
  { name: 'Jason Lin', handle: '@jasonlin', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop', verified: true, followers: '892K', category: 'Tech' },
  { name: 'Sarah Chen', handle: '@sarahchen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop', verified: true, followers: '654K', category: 'Finance' },
  { name: 'Crypto Whale', handle: '@cryptowhale', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop', verified: false, followers: '543K', category: 'Crypto' },
];

const browseCategories = [
  { name: 'Crypto', icon: '₿', count: '2.4K communities', color: '#F7931A' },
  { name: 'Technology', icon: '💻', count: '1.8K communities', color: '#2979FF' },
  { name: 'Finance', icon: '📈', count: '1.2K communities', color: '#2ECC71' },
  { name: 'Gaming', icon: '🎮', count: '956 communities', color: '#7C3AED' },
  { name: 'Art & Design', icon: '🎨', count: '734 communities', color: '#FF7A00' },
  { name: 'Science', icon: '🔬', count: '521 communities', color: '#06B6D4' },
  { name: 'Sports', icon: '⚽', count: '483 communities', color: '#DC2626' },
  { name: 'Music', icon: '🎵', count: '412 communities', color: '#EC4899' },
];

export default function DiscoverPage() {
  const navigate = useNavigate();
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState('Topics');
  const [searchText, setSearchText] = useState('');

  return (
    <div className="min-h-screen font-sans pb-[88px] antialiased" style={{ backgroundColor: t.bg, color: t.text }}>
      {/* Header */}
      <header className="sticky top-0 left-0 w-full z-50 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between" style={{ backgroundColor: t.backdrop, borderBottom: `1px solid ${t.border}` }}>
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-[38px] h-[38px]" />
          <h1 className="text-[23px] font-bold tracking-tight" style={{ color: t.text }}>TrendUpLive</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/search')}><Search className="w-[22px] h-[22px]" strokeWidth={2.5} style={{ color: t.textSec }} /></button>
          <button onClick={() => navigate('/notifications')} className="relative">
            <Bell className="w-[22px] h-[22px]" strokeWidth={2.5} style={{ color: t.textSec }} />
            <span className="absolute top-[-2px] right-[-2px] w-[9px] h-[9px] rounded-full" style={{ backgroundColor: t.red, border: `2px solid ${t.bg}` }} />
          </button>
          <button onClick={() => navigate('/create-post')} className="w-[36px] h-[36px] rounded-full flex items-center justify-center" style={{ backgroundColor: t.green }}>
            <SquarePen className="w-[18px] h-[18px]" strokeWidth={2.5} style={{ color: '#000' }} />
          </button>
        </div>
      </header>

      {/* Title */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-[28px] font-bold" style={{ color: t.text }}>Discover</h2>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 rounded-[12px] px-3 py-2.5" style={{ backgroundColor: t.bgInput, border: `1px solid ${t.border2}` }}>
          <Search className="w-4 h-4" style={{ color: t.textMuted }} />
          <input
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="Search topics, communities, creators..."
            className="flex-1 bg-transparent outline-none text-[14px]"
            style={{ color: t.text }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center px-6" style={{ borderBottom: `1px solid ${t.border}` }}>
        {['Topics', 'Communities', 'Creators'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="flex-1 text-center text-[15px] font-bold pb-2.5 transition-colors"
            style={{ color: activeTab === tab ? t.text : t.textMuted, borderBottom: activeTab === tab ? `2.5px solid ${t.green}` : '2.5px solid transparent' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Topics Tab */}
      {activeTab === 'Topics' && (
        <div>
          {/* Featured Topics */}
          <div className="px-4 mt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4" style={{ color: t.orange }} />
                <span className="text-[16px] font-bold" style={{ color: t.text }}>Featured Topics</span>
              </div>
              <span className="text-[13px] font-semibold" style={{ color: t.green }}>View all</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {featuredTopics.map(topic => (
                <div key={topic.name} className="min-w-[200px] rounded-[16px] p-4 relative overflow-hidden" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10 flex items-center justify-center text-[48px]">{topic.icon}</div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: topic.trend === 'Breaking' ? `${t.red}20` : topic.trend === 'Hot' ? `${t.orange}20` : `${t.green}20`, color: topic.trend === 'Breaking' ? t.red : topic.trend === 'Hot' ? t.orange : t.green }}>
                    {topic.trend}
                  </span>
                  <h4 className="text-[16px] font-bold mt-2" style={{ color: t.text }}>{topic.name}</h4>
                  <p className="text-[12px] mt-1" style={{ color: t.textMuted }}>{topic.posts}</p>
                  <button className="mt-3 text-[12px] font-bold flex items-center gap-0.5" style={{ color: t.green }}>Explore <ChevronRight className="w-3.5 h-3.5" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Hashtags */}
          <div className="px-4 mt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Hash className="w-4 h-4" style={{ color: t.green }} />
                <span className="text-[16px] font-bold" style={{ color: t.text }}>Trending Hashtags</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['#BitcoinHalving', '#AI', '#DeFi', '#Solana', '#Layer2', '#RWA', '#GameFi', '#Memecoin', '#ETF', '#Web3', '#NFT', '#DAO'].map(tag => (
                <button key={tag} className="px-3 py-1.5 rounded-full text-[13px] font-medium" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}`, color: t.textSec }}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Browse Categories */}
          <div className="px-4 mt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[16px] font-bold" style={{ color: t.text }}>Browse Categories</span>
              <span className="text-[13px] font-semibold" style={{ color: t.green }}>View all</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {browseCategories.map(cat => (
                <button key={cat.name} className="flex items-center gap-3 p-3 rounded-[14px]" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
                  <span className="text-[20px]">{cat.icon}</span>
                  <div className="text-left">
                    <span className="text-[14px] font-bold block" style={{ color: t.text }}>{cat.name}</span>
                    <span className="text-[11px]" style={{ color: t.textMuted }}>{cat.count}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Communities Tab */}
      {activeTab === 'Communities' && (
        <div>
          {/* Filter pills */}
          <div className="flex gap-2 px-4 pt-3">
            {['For You', 'Popular', 'New', 'Verified'].map((f, i) => (
              <button key={f} className="px-3 py-[6px] rounded-full text-[12px] font-semibold whitespace-nowrap" style={{
                backgroundColor: i === 0 ? `${t.green}20` : 'transparent',
                border: `1px solid ${i === 0 ? t.green : t.border2}`,
                color: i === 0 ? t.green : t.textMuted,
              }}>{f}</button>
            ))}
          </div>

          {/* Community list */}
          <div className="px-4 mt-3">
            {trendingCommunities.map(community => (
              <div key={community.name} className="flex items-center gap-3 py-3" style={{ borderBottom: `1px solid ${t.border}` }}>
                <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: community.avatarColor }}>
                  <span className="text-[18px] font-bold text-white">{community.avatarLetter}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[15px] font-bold" style={{ color: t.text }}>{community.name}</span>
                    {community.verified && <VerifiedBadge className="w-4 h-4" style={{ color: t.green }} />}
                  </div>
                  <p className="text-[12px] truncate mt-0.5" style={{ color: t.textMuted }}>{community.desc}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[11px] flex items-center gap-1" style={{ color: t.textMuted }}>
                      <Users className="w-3 h-3" /> {community.members}
                    </span>
                    <span className="text-[11px] flex items-center gap-1" style={{ color: t.green }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.green }} /> {community.online.toLocaleString()} online
                    </span>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-full text-[12px] font-bold" style={{ backgroundColor: t.green, color: '#000' }}>Join</button>
              </div>
            ))}
          </div>

          {/* Suggested for you */}
          <div className="px-4 mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" style={{ color: t.gold }} />
                <span className="text-[15px] font-bold" style={{ color: t.text }}>Suggested for You</span>
              </div>
              <span className="text-[13px] font-semibold" style={{ color: t.green }}>View all</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[
                { name: 'On-Chain Data', members: '28K', desc: 'Analytics & insights' },
                { name: 'Yield Farmers', members: '19K', desc: 'Best yield strategies' },
                { name: 'Bitcoin Maxis', members: '45K', desc: 'BTC maximalists hub' },
              ].map(c => (
                <div key={c.name} className="min-w-[160px] rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
                  <span className="text-[14px] font-bold block" style={{ color: t.text }}>{c.name}</span>
                  <span className="text-[11px]" style={{ color: t.textMuted }}>{c.desc}</span>
                  <div className="flex items-center gap-1 mt-2">
                    <Users className="w-3 h-3" style={{ color: t.textMuted }} />
                    <span className="text-[11px]" style={{ color: t.textMuted }}>{c.members}</span>
                  </div>
                  <button className="mt-2 w-full py-1.5 rounded-full text-[11px] font-bold text-center" style={{ border: `1px solid ${t.green}`, color: t.green }}>Join</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Creators Tab */}
      {activeTab === 'Creators' && (
        <div>
          {/* Filter pills */}
          <div className="flex gap-2 px-4 pt-3">
            {['All', 'Crypto', 'Tech', 'Finance', 'Lifestyle'].map((f, i) => (
              <button key={f} className="px-3 py-[6px] rounded-full text-[12px] font-semibold whitespace-nowrap" style={{
                backgroundColor: i === 0 ? `${t.green}20` : 'transparent',
                border: `1px solid ${i === 0 ? t.green : t.border2}`,
                color: i === 0 ? t.green : t.textMuted,
              }}>{f}</button>
            ))}
          </div>

          {/* Creator spotlight */}
          <div className="px-4 mt-3">
            <div className="rounded-[16px] p-4 relative overflow-hidden" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.green}30` }}>
              <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1" style={{ color: t.green }}>
                <Star className="w-3 h-3" /> Featured Creator
              </span>
              <div className="flex items-center gap-3 mt-3">
                <img src={topCreators[0].avatar} alt={topCreators[0].name} className="w-[52px] h-[52px] rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[16px] font-bold" style={{ color: t.text }}>{topCreators[0].name}</span>
                    <VerifiedBadge className="w-4 h-4" style={{ color: t.green }} />
                  </div>
                  <span className="text-[12px]" style={{ color: t.textMuted }}>{topCreators[0].handle}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[12px] font-semibold" style={{ color: t.text }}>{topCreators[0].followers}</span>
                    <span className="text-[11px]" style={{ color: t.textMuted }}>followers</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${t.purple}20`, color: t.purple }}>{topCreators[0].category}</span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-full text-[13px] font-bold" style={{ backgroundColor: t.green, color: '#000' }}>Follow</button>
              </div>
            </div>
          </div>

          {/* Top Creators list */}
          <div className="px-4 mt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[16px] font-bold" style={{ color: t.text }}>Top Creators</span>
              <span className="text-[13px] font-semibold" style={{ color: t.green }}>View all</span>
            </div>
            {topCreators.slice(1).map((creator, idx) => (
              <div key={creator.handle} className="flex items-center gap-3 py-3" style={{ borderBottom: `1px solid ${t.border}` }}>
                <span className="text-[14px] font-medium w-[20px]" style={{ color: t.textMuted }}>{idx + 2}</span>
                <img src={creator.avatar} alt={creator.name} className="w-[44px] h-[44px] rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[15px] font-bold" style={{ color: t.text }}>{creator.name}</span>
                    {creator.verified && <VerifiedBadge className="w-3.5 h-3.5" style={{ color: t.green }} />}
                  </div>
                  <span className="text-[12px]" style={{ color: t.textMuted }}>{creator.handle}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-semibold" style={{ color: t.text }}>{creator.followers}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: t.bgTer, color: t.textMuted }}>{creator.category}</span>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-full text-[12px] font-bold" style={{ border: `1px solid ${t.green}`, color: t.green }}>Follow</button>
              </div>
            ))}
          </div>

          {/* Rising Creators */}
          <div className="px-4 mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" style={{ color: t.gold }} />
                <span className="text-[15px] font-bold" style={{ color: t.text }}>Rising Creators</span>
              </div>
              <span className="text-[13px] font-semibold" style={{ color: t.green }}>View all</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[
                { name: 'DeFi Dave', handle: '@defidave', followers: '28K', cat: 'DeFi' },
                { name: 'Chain Queen', handle: '@chainqueen', followers: '19K', cat: 'NFTs' },
                { name: 'Macro Mike', handle: '@macromike', followers: '12K', cat: 'Macro' },
              ].map(c => (
                <div key={c.handle} className="min-w-[150px] rounded-[14px] p-3 text-center" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: t.bgTer }}>
                    <span className="text-[14px] font-bold" style={{ color: t.text }}>{c.name.charAt(0)}</span>
                  </div>
                  <span className="text-[13px] font-bold block mt-2" style={{ color: t.text }}>{c.name}</span>
                  <span className="text-[11px]" style={{ color: t.textMuted }}>{c.handle}</span>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className="text-[11px] font-semibold" style={{ color: t.text }}>{c.followers}</span>
                    <span className="text-[10px] px-1 py-0.5 rounded" style={{ backgroundColor: t.bgTer, color: t.textMuted }}>{c.cat}</span>
                  </div>
                  <button className="mt-2 w-full py-1.5 rounded-full text-[11px] font-bold" style={{ border: `1px solid ${t.green}`, color: t.green }}>Follow</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
