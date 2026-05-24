import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Image, BarChart3, MapPin, Smile, Hash, Camera, Film, Trash2 } from 'lucide-react';

const emojiList = ['😀', '🔥', '🚀', '💎', '📈', '📉', '🐂', '🐻', '💰', '🎯', '💡', '👏'];

export default function CreatePostPage() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [posted, setPosted] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showPoll, setShowPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [location, setLocation] = useState('');
  const [showLocation, setShowLocation] = useState(false);
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

  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans antialiased flex flex-col">
      <header className="sticky top-0 w-full z-50 bg-[#040508]/95 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between border-b border-[#121419]">
        <button onClick={() => navigate(-1)} className="hover:text-gray-300 transition-colors">
          <X className="w-6 h-6 text-[#F3F4F6]" />
        </button>
        <h1 className="text-[18px] font-bold">Create Post</h1>
        <button
          onClick={handlePost}
          disabled={!text.trim() && images.length === 0}
          className={`px-5 py-[7px] rounded-full text-[14px] font-bold transition-all ${
            (text.trim() || images.length > 0)
              ? 'bg-[#2ECC71] text-[#040508] hover:bg-[#27ae60]'
              : 'bg-[#121419] text-[#6A6C73] cursor-not-allowed'
          }`}
        >
          Post
        </button>
      </header>

      <input ref={fileRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleImageUpload} />

      {posted ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#2ECC71]/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#2ECC71]">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[18px] font-bold text-[#2ECC71]">Post Published!</p>
          <p className="text-[#8B8D93] text-[14px]">Your post is now live on the feed.</p>
        </div>
      ) : (
        <>
          <div className="flex-1 p-4">
            <div className="flex gap-3">
              <div className="w-[44px] h-[44px] rounded-full bg-gradient-to-tr from-[#2ECC71] to-[#2979FF] flex items-center justify-center text-[16px] font-bold shrink-0">
                Y
              </div>
              <div className="flex-1">
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="What's happening in the markets?"
                  className="w-full bg-transparent text-[16px] text-[#F3F4F6] placeholder-[#6A6C73] outline-none resize-none min-h-[120px] leading-relaxed"
                  autoFocus
                />

                {/* Image Preview Grid */}
                {images.length > 0 && (
                  <div className={`grid gap-2 mb-3 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {images.map((img, i) => (
                      <div key={i} className="relative rounded-[12px] overflow-hidden border border-[#1C1E23]">
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
                  <div className="bg-[#0A0D12] border border-[#1C1E23] rounded-[16px] p-4 mb-3">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-[14px] font-bold text-[#F3F4F6]">Create Poll</h4>
                      <button onClick={() => setShowPoll(false)}><X className="w-4 h-4 text-[#8B8D93]" /></button>
                    </div>
                    <input
                      value={pollQuestion}
                      onChange={e => setPollQuestion(e.target.value)}
                      placeholder="Ask a question..."
                      className="w-full bg-[#121419] border border-[#1C1E23] rounded-[10px] px-3 py-2.5 text-[14px] text-white outline-none focus:border-[#2ECC71] mb-3"
                    />
                    {pollOptions.map((opt, i) => (
                      <input
                        key={i}
                        value={opt}
                        onChange={e => setPollOptions(prev => prev.map((o, j) => j === i ? e.target.value : o))}
                        placeholder={`Option ${i + 1}`}
                        className="w-full bg-[#121419] border border-[#1C1E23] rounded-[10px] px-3 py-2 text-[14px] text-white outline-none focus:border-[#2ECC71] mb-2"
                      />
                    ))}
                    {pollOptions.length < 4 && (
                      <button onClick={addPollOption} className="text-[#2ECC71] text-[13px] font-bold mt-1">+ Add Option</button>
                    )}
                  </div>
                )}

                {/* Location Tag */}
                {location && (
                  <div className="flex items-center gap-2 bg-[#0A0D12] border border-[#1C1E23] rounded-full px-3 py-1.5 mb-3 w-fit">
                    <MapPin className="w-3.5 h-3.5 text-[#2ECC71]" />
                    <span className="text-[13px] text-[#A0A2A8]">{location}</span>
                    <button onClick={() => setLocation('')}><X className="w-3 h-3 text-[#8B8D93]" /></button>
                  </div>
                )}

                {/* Emoji Picker */}
                {showEmoji && (
                  <div className="flex flex-wrap gap-2 bg-[#0A0D12] border border-[#1C1E23] rounded-[12px] p-3 mb-3">
                    {emojiList.map(emoji => (
                      <button key={emoji} onClick={() => { setText(prev => prev + emoji); setShowEmoji(false); }} className="text-[24px] hover:scale-110 transition-transform">
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Location Selector */}
          {showLocation && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
              <div className="bg-[#0A0D12] border-t border-[#1C1E23] rounded-t-[24px] w-full max-w-[430px] p-5 pb-8">
                <h3 className="text-[17px] font-bold mb-4">Add Location</h3>
                {['New York, USA', 'San Francisco, USA', 'London, UK', 'Tokyo, Japan', 'Dubai, UAE'].map(loc => (
                  <button key={loc} onClick={() => { setLocation(loc); setShowLocation(false); }} className="flex items-center gap-3 w-full py-3 px-2 border-b border-[#1C1E23] hover:bg-[#121419] transition-colors">
                    <MapPin className="w-4 h-4 text-[#8B8D93]" />
                    <span className="text-[14px] text-[#F3F4F6]">{loc}</span>
                  </button>
                ))}
                <button onClick={() => setShowLocation(false)} className="w-full mt-3 bg-[#121419] border border-[#1C1E23] text-[#F3F4F6] font-bold text-[14px] py-3 rounded-[12px]">Cancel</button>
              </div>
            </div>
          )}

          <div className="border-t border-[#121419] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <button onClick={() => fileRef.current?.click()} className="text-[#2ECC71] hover:text-[#27ae60] transition-colors relative">
                  <Image className="w-[22px] h-[22px]" strokeWidth={1.5} />
                  {images.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2ECC71] text-[#040508] text-[9px] font-bold rounded-full flex items-center justify-center">{images.length}</span>
                  )}
                </button>
                <button onClick={() => fileRef.current?.click()} className="text-[#2ECC71] hover:text-[#27ae60] transition-colors">
                  <Camera className="w-[22px] h-[22px]" strokeWidth={1.5} />
                </button>
                <button onClick={() => fileRef.current?.click()} className="text-[#2ECC71] hover:text-[#27ae60] transition-colors">
                  <Film className="w-[22px] h-[22px]" strokeWidth={1.5} />
                </button>
                <button onClick={() => setShowPoll(!showPoll)} className={`transition-colors ${showPoll ? 'text-[#27ae60]' : 'text-[#2ECC71] hover:text-[#27ae60]'}`}>
                  <BarChart3 className="w-[22px] h-[22px]" strokeWidth={1.5} />
                </button>
                <button onClick={() => setText(prev => prev + '#')} className="text-[#2ECC71] hover:text-[#27ae60] transition-colors">
                  <Hash className="w-[22px] h-[22px]" strokeWidth={1.5} />
                </button>
                <button onClick={() => setShowLocation(true)} className={`transition-colors ${location ? 'text-[#27ae60]' : 'text-[#2ECC71] hover:text-[#27ae60]'}`}>
                  <MapPin className="w-[22px] h-[22px]" strokeWidth={1.5} />
                </button>
                <button onClick={() => setShowEmoji(!showEmoji)} className="text-[#2ECC71] hover:text-[#27ae60] transition-colors">
                  <Smile className="w-[22px] h-[22px]" strokeWidth={1.5} />
                </button>
              </div>
              <span className={`text-[13px] font-medium ${text.length > 280 ? 'text-[#FF3B30]' : 'text-[#6A6C73]'}`}>
                {text.length}/280
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
