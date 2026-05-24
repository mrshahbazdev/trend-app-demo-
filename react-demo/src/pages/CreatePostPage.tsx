import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, Users, Globe, ChevronRight, ChevronDown, Image, Play, BarChart3, Type, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import VerifiedBadge from '../components/VerifiedBadge';

const MAX_CHARS = 500;

export default function CreatePostPage() {
  const navigate = useNavigate();
  const { t } = useTheme();
  const [text, setText] = useState('');
  const [posted, setPosted] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [showPoll, setShowPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [location, setLocation] = useState('');
  const [showLocation, setShowLocation] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'photo' | 'video' | 'poll' | 'merge'>('text');
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePost = () => {
    if (!text.trim() && images.length === 0) return;
    setPosted(true);
    setTimeout(() => navigate('/home'), 1200);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        newImages.push(URL.createObjectURL(file));
      });
      setImages(prev => [...prev, ...newImages].slice(0, 4));
    }
  };

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const addPollOption = () => {
    if (pollOptions.length < 4) setPollOptions(prev => [...prev, '']);
  };

  const handleTabClick = (tab: typeof activeTab) => {
    setActiveTab(tab);
    if (tab === 'photo' || tab === 'video') {
      fileRef.current?.click();
    } else if (tab === 'poll') {
      setShowPoll(prev => !prev);
    }
  };

  return (
    <div className="min-h-screen font-sans antialiased flex flex-col" style={{ backgroundColor: t.bg, color: t.text }}>
      {/* Header */}
      <header className="sticky top-0 w-full z-50 pt-4 pb-3 px-4 flex items-center justify-between" style={{ backgroundColor: t.bg }}>
        <button onClick={() => navigate(-1)} className="hover:opacity-70 transition-opacity">
          <X className="w-6 h-6" style={{ color: t.textSec }} />
        </button>
        <h1 className="text-[18px] font-bold" style={{ color: t.text }}>Create post</h1>
        <button className="text-[15px] font-medium" style={{ color: t.textMuted }}>
          Drafts
        </button>
      </header>

      <input ref={fileRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleImageUpload} />

      {posted ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${t.green}33` }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" style={{ color: t.green }}>
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[18px] font-bold" style={{ color: t.green }}>Post Published!</p>
          <p className="text-[14px]" style={{ color: t.textMuted }}>Your post is now live on the feed.</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {/* User info + Text area */}
          <div className="flex-1 px-4 pt-2">
            {/* Profile section */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-[44px] h-[44px] rounded-full overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
                  alt="Alex Morgan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[16px] font-bold" style={{ color: t.text }}>Alex Morgan</span>
                  <VerifiedBadge className="w-[18px] h-[18px]" style={{ color: t.green }} />
                </div>
                <button className="flex items-center gap-1">
                  <span className="text-[13px]" style={{ color: t.textMuted }}>@alexmorgan</span>
                  <ChevronDown className="w-3.5 h-3.5" style={{ color: t.textMuted }} />
                </button>
              </div>
            </div>

            {/* Text input */}
            <textarea
              value={text}
              onChange={e => {
                if (e.target.value.length <= MAX_CHARS) setText(e.target.value);
              }}
              placeholder="What's on your mind?"
              className="w-full bg-transparent text-[16px] placeholder-opacity-50 outline-none resize-none min-h-[180px] leading-relaxed"
              style={{ color: t.textSec, '--tw-placeholder-opacity': 1 } as React.CSSProperties}
              autoFocus
            />

            {/* Image Preview Grid */}
            {images.length > 0 && (
              <div className={`grid gap-2 mb-3 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {images.map((img, i) => (
                  <div key={i} className="relative rounded-[12px] overflow-hidden" style={{ border: `1px solid ${t.border2}` }}>
                    <img src={img} alt="Upload" className="w-full h-[140px] object-cover" />
                    <button onClick={() => removeImage(i)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center">
                      <Trash2 className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Poll Section */}
            {showPoll && (
              <div className="rounded-[16px] p-4 mb-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[14px] font-bold" style={{ color: t.textSec }}>Create Poll</h4>
                  <button onClick={() => setShowPoll(false)}><X className="w-4 h-4" style={{ color: t.textMuted }} /></button>
                </div>
                <input
                  value={pollQuestion}
                  onChange={e => setPollQuestion(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full rounded-[10px] px-3 py-2.5 text-[14px] outline-none mb-3"
                  style={{ backgroundColor: t.bgTer, border: `1px solid ${t.border2}`, color: t.text }}
                />
                {pollOptions.map((opt, i) => (
                  <input
                    key={i}
                    value={opt}
                    onChange={e => setPollOptions(prev => prev.map((o, j) => j === i ? e.target.value : o))}
                    placeholder={`Option ${i + 1}`}
                    className="w-full rounded-[10px] px-3 py-2 text-[14px] outline-none mb-2"
                    style={{ backgroundColor: t.bgTer, border: `1px solid ${t.border2}`, color: t.text }}
                  />
                ))}
                {pollOptions.length < 4 && (
                  <button onClick={addPollOption} className="text-[13px] font-bold mt-1" style={{ color: t.green }}>+ Add Option</button>
                )}
              </div>
            )}

            {/* Location Tag */}
            {location && (
              <div className="flex items-center gap-2 rounded-full px-3 py-1.5 mb-3 w-fit" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
                <MapPin className="w-3.5 h-3.5" style={{ color: t.green }} />
                <span className="text-[13px]" style={{ color: t.textSubtle }}>{location}</span>
                <button onClick={() => setLocation('')}><X className="w-3 h-3" style={{ color: t.textMuted }} /></button>
              </div>
            )}

            {/* Character counter */}
            <div className="flex justify-end mt-2">
              <span className="text-[13px] font-medium" style={{ color: text.length >= MAX_CHARS ? t.red : t.textDim }}>
                {text.length}/{MAX_CHARS}
              </span>
            </div>
          </div>

          {/* Content Type Tabs */}
          <div className="px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              {/* Text */}
              <button
                onClick={() => handleTabClick('text')}
                className="flex flex-col items-center gap-1.5 flex-1"
              >
                <div
                  className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center transition-all"
                  style={{
                    border: `1.5px solid ${activeTab === 'text' ? t.textSec : t.border2}`,
                    backgroundColor: activeTab === 'text' ? `${t.textSec}15` : 'transparent',
                  }}
                >
                  <Type className="w-6 h-6" style={{ color: t.textSec }} />
                </div>
                <span className="text-[11px] font-medium" style={{ color: t.textMuted }}>Text</span>
              </button>

              {/* Photo */}
              <button
                onClick={() => handleTabClick('photo')}
                className="flex flex-col items-center gap-1.5 flex-1"
              >
                <div
                  className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center transition-all"
                  style={{
                    border: `1.5px solid ${activeTab === 'photo' ? t.green : t.border2}`,
                    backgroundColor: activeTab === 'photo' ? `${t.green}15` : 'transparent',
                  }}
                >
                  <Image className="w-6 h-6" style={{ color: t.green }} />
                </div>
                <span className="text-[11px] font-medium" style={{ color: t.textMuted }}>Photo</span>
              </button>

              {/* Video */}
              <button
                onClick={() => handleTabClick('video')}
                className="flex flex-col items-center gap-1.5 flex-1"
              >
                <div
                  className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center transition-all"
                  style={{
                    border: `1.5px solid ${activeTab === 'video' ? t.green : t.border2}`,
                    backgroundColor: activeTab === 'video' ? `${t.green}15` : 'transparent',
                  }}
                >
                  <Play className="w-6 h-6" style={{ color: t.green }} />
                </div>
                <span className="text-[11px] font-medium" style={{ color: t.textMuted }}>Video</span>
              </button>

              {/* Poll */}
              <button
                onClick={() => handleTabClick('poll')}
                className="flex flex-col items-center gap-1.5 flex-1"
              >
                <div
                  className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center transition-all"
                  style={{
                    border: `1.5px solid ${activeTab === 'poll' ? t.green : t.border2}`,
                    backgroundColor: activeTab === 'poll' ? `${t.green}15` : 'transparent',
                  }}
                >
                  <BarChart3 className="w-6 h-6" style={{ color: t.green }} />
                </div>
                <span className="text-[11px] font-medium" style={{ color: t.textMuted }}>Poll</span>
              </button>

              {/* Merge Compare */}
              <button
                onClick={() => handleTabClick('merge')}
                className="flex flex-col items-center gap-1.5 flex-1"
              >
                <div
                  className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center transition-all"
                  style={{
                    border: `1.5px solid ${activeTab === 'merge' ? t.purple : t.border2}`,
                    backgroundColor: activeTab === 'merge' ? `${t.purple}15` : 'transparent',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={t.purple} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="10" height="14" rx="2" />
                    <rect x="11" y="7" width="10" height="14" rx="2" />
                  </svg>
                </div>
                <span className="text-[11px] font-medium text-center leading-tight" style={{ color: t.textMuted }}>
                  Merge{'\u00B7'}<br className="hidden" />Compare
                </span>
              </button>
            </div>
          </div>

          {/* Options List */}
          <div className="px-4 pb-2">
            <div className="rounded-[16px] overflow-hidden" style={{ backgroundColor: t.bgSec }}>
              {/* Add location */}
              <button
                onClick={() => setShowLocation(true)}
                className="flex items-center w-full px-4 py-3.5 transition-colors hover:opacity-80"
              >
                <MapPin className="w-5 h-5 mr-3" style={{ color: t.textMuted }} />
                <span className="flex-1 text-left text-[15px]" style={{ color: t.textSec }}>Add location</span>
                <ChevronRight className="w-5 h-5" style={{ color: t.textDim }} />
              </button>

              <div className="mx-4" style={{ borderTop: `1px solid ${t.border}` }} />

              {/* Tag people */}
              <button className="flex items-center w-full px-4 py-3.5 transition-colors hover:opacity-80">
                <Users className="w-5 h-5 mr-3" style={{ color: t.textMuted }} />
                <span className="flex-1 text-left text-[15px]" style={{ color: t.textSec }}>Tag people</span>
                <ChevronRight className="w-5 h-5" style={{ color: t.textDim }} />
              </button>

              <div className="mx-4" style={{ borderTop: `1px solid ${t.border}` }} />

              {/* Everyone can reply */}
              <button className="flex items-center w-full px-4 py-3.5 transition-colors hover:opacity-80">
                <Globe className="w-5 h-5 mr-3" style={{ color: t.textMuted }} />
                <div className="flex-1 text-left">
                  <span className="text-[15px] block" style={{ color: t.textSec }}>Everyone can reply</span>
                  <span className="text-[12px]" style={{ color: t.textDim }}>Change audience</span>
                </div>
                <ChevronRight className="w-5 h-5" style={{ color: t.textDim }} />
              </button>
            </div>
          </div>

          {/* Post Button */}
          <div className="px-4 pt-2 pb-6">
            <button
              onClick={handlePost}
              disabled={!text.trim() && images.length === 0}
              className="w-full py-[14px] rounded-full text-[16px] font-bold transition-all"
              style={{
                backgroundColor: (text.trim() || images.length > 0) ? t.green : t.green,
                color: '#000',
                opacity: (text.trim() || images.length > 0) ? 1 : 0.6,
              }}
            >
              Post
            </button>
          </div>

          {/* Location Selector Modal */}
          {showLocation && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
              <div className="rounded-t-[24px] w-full max-w-[430px] p-5 pb-8" style={{ backgroundColor: t.bgSec, borderTop: `1px solid ${t.border2}` }}>
                <h3 className="text-[17px] font-bold mb-4" style={{ color: t.text }}>Add Location</h3>
                {['New York, USA', 'San Francisco, USA', 'London, UK', 'Tokyo, Japan', 'Dubai, UAE'].map(loc => (
                  <button
                    key={loc}
                    onClick={() => { setLocation(loc); setShowLocation(false); }}
                    className="flex items-center gap-3 w-full py-3 px-2 transition-colors"
                    style={{ borderBottom: `1px solid ${t.border2}` }}
                  >
                    <MapPin className="w-4 h-4" style={{ color: t.textMuted }} />
                    <span className="text-[14px]" style={{ color: t.textSec }}>{loc}</span>
                  </button>
                ))}
                <button
                  onClick={() => setShowLocation(false)}
                  className="w-full mt-3 font-bold text-[14px] py-3 rounded-[12px]"
                  style={{ backgroundColor: t.bgTer, border: `1px solid ${t.border2}`, color: t.textSec }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
