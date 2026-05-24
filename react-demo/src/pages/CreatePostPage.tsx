import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Image, BarChart3, MapPin, Smile, Hash } from 'lucide-react';

export default function CreatePostPage() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [posted, setPosted] = useState(false);

  const handlePost = () => {
    if (!text.trim()) return;
    setPosted(true);
    setTimeout(() => navigate('/home'), 1200);
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
          disabled={!text.trim()}
          className={`px-5 py-[7px] rounded-full text-[14px] font-bold transition-all ${
            text.trim()
              ? 'bg-[#2ECC71] text-[#040508] hover:bg-[#27ae60]'
              : 'bg-[#121419] text-[#6A6C73] cursor-not-allowed'
          }`}
        >
          Post
        </button>
      </header>

      {posted ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#2ECC71]/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#2ECC71]">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[18px] font-bold text-[#2ECC71]">Post Published!</p>
          <p className="text-[#8B8D93] text-[14px]">Redirecting to feed...</p>
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
                  className="w-full bg-transparent text-[16px] text-[#F3F4F6] placeholder-[#6A6C73] outline-none resize-none min-h-[200px] leading-relaxed"
                  autoFocus
                />
              </div>
            </div>
          </div>

          <div className="border-t border-[#121419] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <button className="text-[#2ECC71] hover:text-[#27ae60] transition-colors">
                  <Image className="w-[22px] h-[22px]" strokeWidth={1.5} />
                </button>
                <button className="text-[#2ECC71] hover:text-[#27ae60] transition-colors">
                  <BarChart3 className="w-[22px] h-[22px]" strokeWidth={1.5} />
                </button>
                <button className="text-[#2ECC71] hover:text-[#27ae60] transition-colors">
                  <Hash className="w-[22px] h-[22px]" strokeWidth={1.5} />
                </button>
                <button className="text-[#2ECC71] hover:text-[#27ae60] transition-colors">
                  <MapPin className="w-[22px] h-[22px]" strokeWidth={1.5} />
                </button>
                <button className="text-[#2ECC71] hover:text-[#27ae60] transition-colors">
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
