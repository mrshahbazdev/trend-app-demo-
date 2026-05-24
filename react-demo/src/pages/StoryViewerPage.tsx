import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { X, Heart, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import VerifiedBadge from '../components/VerifiedBadge';
import { stories } from '../data/mockData';

const storyContent = [
  { text: "Morning market analysis: BTC testing key resistance at $65K. Volume increasing significantly.", bg: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop" },
  { text: "Breaking: Global markets rally on positive economic data from China and EU.", bg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" },
  { text: "Tech stocks are on fire today! NVDA up 5%, AMD up 3.2%. AI spending continues to surge.", bg: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" },
  { text: "Sustainability matters. Green energy stocks seeing increased institutional buying this quarter.", bg: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800&auto=format&fit=crop" },
  { text: "Weekly market wrap: S&P 500 hits new ATH. What's next for bulls and bears?", bg: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=800&auto=format&fit=crop" },
];

export default function StoryViewerPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const startIdx = parseInt(searchParams.get('idx') || '0', 10);
  const [currentIdx, setCurrentIdx] = useState(startIdx);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [reply, setReply] = useState('');

  const story = stories[currentIdx] || stories[0];
  const content = storyContent[currentIdx] || storyContent[0];

  useEffect(() => {
    setProgress(0);
    setLiked(false);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentIdx < stories.length - 1) {
            setCurrentIdx(p => p + 1);
            return 0;
          } else {
            navigate(-1);
            return 100;
          }
        }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [currentIdx, navigate]);

  const goNext = () => {
    if (currentIdx < stories.length - 1) {
      setCurrentIdx(p => p + 1);
    } else {
      navigate(-1);
    }
  };

  const goPrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(p => p - 1);
    }
  };

  const handleReply = () => {
    if (!reply.trim()) return;
    setReply('');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={content.bg} alt="Story" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex gap-1 px-3 pt-3">
          {stories.map((_, i) => (
            <div key={i} className="flex-1 h-[3px] bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-100"
                style={{ width: i < currentIdx ? '100%' : i === currentIdx ? `${progress}%` : '0%' }}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="flex items-center gap-3">
            <img src={story.img} className="w-[36px] h-[36px] rounded-full object-cover border-2 border-[#2ECC71]" alt={story.name} />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-[14px]">{story.name}</span>
                {story.verified && <VerifiedBadge className="w-4 h-4 text-[#2ECC71]" />}
              </div>
              <span className="text-[12px] text-white/60">{story.followers} followers · 2h ago</span>
            </div>
          </div>
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-between px-2">
          <button onClick={goPrev} className={`w-10 h-10 rounded-full bg-black/30 flex items-center justify-center ${currentIdx === 0 ? 'opacity-30' : ''}`}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 flex items-center justify-center px-6">
            <p className="text-[20px] font-bold text-center leading-relaxed drop-shadow-lg">{content.text}</p>
          </div>
          <button onClick={goNext} className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="px-4 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-white/10 backdrop-blur-md rounded-full flex items-center px-4 py-3 border border-white/20">
              <input
                value={reply}
                onChange={e => setReply(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleReply()}
                placeholder="Reply to story..."
                className="bg-transparent flex-1 outline-none text-[14px] placeholder:text-white/50 text-white"
              />
            </div>
            <button onClick={() => setLiked(!liked)} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Heart className={`w-5 h-5 ${liked ? 'fill-[#FF3B30] text-[#FF3B30]' : 'text-white'}`} />
            </button>
            {reply.trim() && (
              <button onClick={handleReply} className="w-10 h-10 rounded-full bg-[#2ECC71] flex items-center justify-center">
                <Send className="w-5 h-5 text-black" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
