import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Play, Pause, Heart, Clock, Headphones, ChevronDown, X } from 'lucide-react';
import NewLogo from '../components/NewLogo';
import BottomNav from '../components/BottomNav';
import { useTheme } from '../context/ThemeContext';

const podcasts = [
  {
    id: 1,
    title: "Crypto Morning Brief",
    host: "Alex Morgan",
    hostAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=300&auto=format&fit=crop",
    category: "Crypto",
    episodes: [
      { id: 101, title: "Bitcoin's Path to $100K — Bull Case Analysis", duration: "32:15", date: "May 23, 2026", plays: "12.4K" },
      { id: 102, title: "Ethereum ETF Approval: What It Means for DeFi", duration: "28:40", date: "May 22, 2026", plays: "9.8K" },
      { id: 103, title: "Solana vs Ethereum: L1 War Heats Up", duration: "45:10", date: "May 20, 2026", plays: "15.2K" },
    ],
    subscribers: "24.5K",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Market Pulse Weekly",
    host: "Jason Lin",
    hostAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=300&auto=format&fit=crop",
    category: "Stocks",
    episodes: [
      { id: 201, title: "NVIDIA Earnings Deep Dive — AI Boom Continues", duration: "38:22", date: "May 23, 2026", plays: "18.7K" },
      { id: 202, title: "Fed Rate Decision: Reading Between the Lines", duration: "42:05", date: "May 21, 2026", plays: "22.1K" },
      { id: 203, title: "Small Caps Revival — Hidden Gems for Q3", duration: "35:50", date: "May 19, 2026", plays: "11.3K" },
    ],
    subscribers: "31.2K",
    rating: 4.9,
  },
  {
    id: 3,
    title: "DeFi Decoded",
    host: "Priya Patel",
    hostAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=300&auto=format&fit=crop",
    category: "DeFi",
    episodes: [
      { id: 301, title: "Yield Farming in 2026 — Best Strategies", duration: "40:30", date: "May 22, 2026", plays: "8.5K" },
      { id: 302, title: "Real World Assets (RWA) — The Next DeFi Wave", duration: "36:15", date: "May 20, 2026", plays: "14.6K" },
      { id: 303, title: "Liquid Staking Explained — ETH Staking Wars", duration: "29:45", date: "May 18, 2026", plays: "7.2K" },
    ],
    subscribers: "15.8K",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Forex Frontline",
    host: "Mike Johnson",
    hostAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=300&auto=format&fit=crop",
    category: "Forex",
    episodes: [
      { id: 401, title: "Dollar Strength: How Long Can It Last?", duration: "33:20", date: "May 23, 2026", plays: "6.3K" },
      { id: 402, title: "EUR/USD Technical Breakdown — Key Levels", duration: "27:55", date: "May 21, 2026", plays: "5.1K" },
      { id: 403, title: "Japanese Yen Crisis — BOJ's Next Move", duration: "41:10", date: "May 19, 2026", plays: "9.4K" },
    ],
    subscribers: "12.1K",
    rating: 4.6,
  },
];

const categories = ['All', 'Crypto', 'Stocks', 'DeFi', 'Forex'];

export default function PodcastsPage() {
  const navigate = useNavigate();
  const { t } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedPodcast, setExpandedPodcast] = useState<number | null>(null);
  const [playingEpisode, setPlayingEpisode] = useState<{ podcastId: number; episodeId: number } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [showPlayer, setShowPlayer] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const filtered = activeCategory === 'All' ? podcasts : podcasts.filter(p => p.category === activeCategory);

  const currentPodcast = playingEpisode ? podcasts.find(p => p.id === playingEpisode.podcastId) : null;
  const currentEpisode = currentPodcast?.episodes.find(e => e.id === playingEpisode?.episodeId);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying]);

  const playEpisode = (podcastId: number, episodeId: number) => {
    setPlayingEpisode({ podcastId, episodeId });
    setProgress(0);
    setIsPlaying(true);
    setShowPlayer(true);
  };

  const toggleLike = (episodeId: number) => {
    setLiked(prev => {
      const next = new Set(prev);
      next.has(episodeId) ? next.delete(episodeId) : next.add(episodeId);
      return next;
    });
  };

  const formatProgress = (pct: number, duration: string) => {
    const parts = duration.split(':');
    const totalSec = parseInt(parts[0]) * 60 + parseInt(parts[1]);
    const currentSec = Math.floor((pct / 100) * totalSec);
    const m = Math.floor(currentSec / 60);
    const s = currentSec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen font-sans pb-[88px] antialiased" style={{ backgroundColor: t.bg, color: t.text }}>
      <header className="sticky top-0 left-0 w-full z-50 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between" style={{ backgroundColor: t.backdrop, borderBottom: `1px solid ${t.border}` }}>
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-[38px] h-[38px]" />
          <h1 className="text-[23px] font-bold tracking-tight" style={{ color: t.text }}>Podcasts</h1>
        </div>
        <div className="flex items-center gap-3.5">
          <button onClick={() => navigate('/search')}><Search className="w-[24px] h-[24px]" strokeWidth={2.5} style={{ color: t.textSec }} /></button>
          <button onClick={() => navigate('/notifications')} className="relative"><Bell className="w-[24px] h-[24px]" strokeWidth={2.5} style={{ color: t.textSec }} /><span className="absolute top-[-2px] right-[-2px] w-[9px] h-[9px] rounded-full" style={{ backgroundColor: t.red, border: `2px solid ${t.bg}` }}></span></button>
        </div>
      </header>

      {/* Category Pills */}
      <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-colors"
            style={{
              backgroundColor: activeCategory === cat ? t.green : t.bgSec,
              color: activeCategory === cat ? '#FFFFFF' : t.textMuted,
              border: `1px solid ${activeCategory === cat ? t.green : t.border2}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Podcast */}
      {filtered.length > 0 && (
        <div className="px-4 pb-4">
          <div className="rounded-[16px] overflow-hidden relative" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
            <img src={filtered[0].cover} alt={filtered[0].title} className="w-full h-[160px] object-cover" />
            <div className="absolute top-0 left-0 w-full h-[160px]" style={{ background: `linear-gradient(to top, ${t.bgSec}, transparent 60%)` }} />
            <div className="p-4 -mt-10 relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: `${t.green}20`, color: t.green }}>{filtered[0].category}</span>
                <span className="text-[11px] font-medium flex items-center gap-1" style={{ color: t.textMuted }}><Headphones className="w-3 h-3" />{filtered[0].subscribers}</span>
              </div>
              <h2 className="text-[18px] font-extrabold mb-1" style={{ color: t.text }}>{filtered[0].title}</h2>
              <p className="text-[13px] font-medium mb-3" style={{ color: t.textMuted }}>by {filtered[0].host} · ⭐ {filtered[0].rating}</p>
              <button
                onClick={() => playEpisode(filtered[0].id, filtered[0].episodes[0].id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold"
                style={{ backgroundColor: t.green, color: '#FFFFFF' }}
              >
                <Play className="w-4 h-4" fill="white" /> Play Latest
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Podcast List */}
      <div className="px-4">
        <h3 className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: t.textSubtle }}>
          {activeCategory === 'All' ? 'All Shows' : `${activeCategory} Shows`}
        </h3>
        <div className="flex flex-col gap-3">
          {filtered.map(podcast => (
            <div key={podcast.id}>
              <div
                className="flex items-center gap-3 p-3 rounded-[14px] cursor-pointer transition-colors"
                style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}
                onClick={() => setExpandedPodcast(expandedPodcast === podcast.id ? null : podcast.id)}
              >
                <img src={podcast.cover} alt={podcast.title} className="w-[60px] h-[60px] rounded-[10px] object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ backgroundColor: `${t.green}20`, color: t.green }}>{podcast.category}</span>
                  </div>
                  <h4 className="text-[15px] font-bold truncate" style={{ color: t.text }}>{podcast.title}</h4>
                  <p className="text-[12px] font-medium" style={{ color: t.textMuted }}>{podcast.host} · {podcast.episodes.length} episodes</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] font-semibold" style={{ color: t.textMuted }}>⭐ {podcast.rating}</span>
                  <ChevronDown className="w-4 h-4 transition-transform" style={{ color: t.textMuted, transform: expandedPodcast === podcast.id ? 'rotate(180deg)' : undefined }} />
                </div>
              </div>

              {/* Episodes List */}
              {expandedPodcast === podcast.id && (
                <div className="mt-1 ml-2 flex flex-col gap-1">
                  {podcast.episodes.map(ep => {
                    const isCurrentlyPlaying = playingEpisode?.episodeId === ep.id;
                    return (
                      <div
                        key={ep.id}
                        className="flex items-center gap-3 p-3 rounded-[12px] transition-colors"
                        style={{ backgroundColor: isCurrentlyPlaying ? `${t.green}10` : t.bgTer, border: isCurrentlyPlaying ? `1px solid ${t.green}40` : `1px solid transparent` }}
                      >
                        <button
                          onClick={() => {
                            if (isCurrentlyPlaying) {
                              setIsPlaying(!isPlaying);
                              setShowPlayer(true);
                            } else {
                              playEpisode(podcast.id, ep.id);
                            }
                          }}
                          className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: isCurrentlyPlaying ? t.green : `${t.green}20` }}
                        >
                          {isCurrentlyPlaying && isPlaying
                            ? <Pause className="w-4 h-4" style={{ color: '#FFFFFF' }} />
                            : <Play className="w-4 h-4" fill={isCurrentlyPlaying ? '#FFFFFF' : t.green} style={{ color: isCurrentlyPlaying ? '#FFFFFF' : t.green }} />
                          }
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold truncate" style={{ color: isCurrentlyPlaying ? t.green : t.text }}>{ep.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] flex items-center gap-0.5" style={{ color: t.textMuted }}><Clock className="w-3 h-3" />{ep.duration}</span>
                            <span className="text-[11px]" style={{ color: t.textDim }}>{ep.date}</span>
                            <span className="text-[11px]" style={{ color: t.textDim }}>{ep.plays} plays</span>
                          </div>
                        </div>
                        <button onClick={() => toggleLike(ep.id)}>
                          <Heart className="w-4 h-4" style={{ color: liked.has(ep.id) ? t.red : t.textMuted, fill: liked.has(ep.id) ? t.red : 'none' }} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mini Player */}
      {showPlayer && currentEpisode && currentPodcast && (
        <div
          className="fixed bottom-[88px] left-0 w-full z-40 px-3"
        >
          <div className="max-w-[430px] mx-auto rounded-[14px] p-3 backdrop-blur-xl" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}`, boxShadow: '0 -4px 20px rgba(0,0,0,0.3)' }}>
            <div className="flex items-center gap-3">
              <img src={currentPodcast.cover} alt="" className="w-[42px] h-[42px] rounded-[8px] object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold truncate" style={{ color: t.text }}>{currentEpisode.title}</p>
                <p className="text-[11px]" style={{ color: t.textMuted }}>{currentPodcast.host}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsPlaying(!isPlaying)} className="w-[34px] h-[34px] rounded-full flex items-center justify-center" style={{ backgroundColor: t.green }}>
                  {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" fill="white" />}
                </button>
                <button onClick={() => { setShowPlayer(false); setIsPlaying(false); setPlayingEpisode(null); }}>
                  <X className="w-4 h-4" style={{ color: t.textMuted }} />
                </button>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-mono" style={{ color: t.textDim }}>{formatProgress(progress, currentEpisode.duration)}</span>
              <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ backgroundColor: t.bgTer }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: t.green }} />
              </div>
              <span className="text-[10px] font-mono" style={{ color: t.textDim }}>{currentEpisode.duration}</span>
            </div>
          </div>
        </div>
      )}

      {/* Full Player Modal */}
      {/* Could expand mini player to full screen — keeping mini for now */}

      <BottomNav />
    </div>
  );
}
