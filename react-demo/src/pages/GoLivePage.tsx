import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Mic, MicOff, Video, VideoOff, MessageCircle, Zap, X, Send, Smile, Eye, Share, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type LiveStep = 'setup' | 'preview' | 'live' | 'ended';

const liveViewers = [
  { name: "Alex Morgan", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" },
  { name: "Crypto Whale", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" },
  { name: "DeFi Fan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" },
];

const liveChatMsgs = [
  { user: "Alex Morgan", text: "Excited for this stream!", time: "now" },
  { user: "Crypto Whale", text: "Let's go! 🚀", time: "now" },
  { user: "DeFi Fan", text: "Great to see you live!", time: "now" },
];

export default function GoLivePage() {
  const navigate = useNavigate();
  const { t } = useTheme();
  const [step, setStep] = useState<LiveStep>('setup');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Markets');
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [viewerCount, setViewerCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [chatMessages, setChatMessages] = useState(liveChatMsgs);
  const [chatInput, setChatInput] = useState('');
  const [showChat, setShowChat] = useState(true);
  const [hearts, setHearts] = useState(0);
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  useEffect(() => {
    if (step === 'live') {
      const viewerInterval = setInterval(() => {
        setViewerCount(prev => Math.min(prev + Math.floor(Math.random() * 5) + 1, 1247));
      }, 2000);
      const durationInterval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
      const heartInterval = setInterval(() => {
        setHearts(prev => prev + Math.floor(Math.random() * 3) + 1);
      }, 3000);
      const chatInterval = setInterval(() => {
        const msgs = [
          "This is great content! 🔥",
          "What about ETH?",
          "Bullish on this!",
          "Thanks for the analysis",
          "Can you talk about altcoins?",
          "💎🙌",
          "When moon? 🌙",
          "Great stream!",
        ];
        const users = ["Alex M.", "TraderJoe", "CryptoKing", "MarketPro", "DeFi_Queen"];
        setChatMessages(prev => [
          { user: users[Math.floor(Math.random() * users.length)], text: msgs[Math.floor(Math.random() * msgs.length)], time: "now" },
          ...prev,
        ].slice(0, 50));
      }, 4000);

      return () => {
        clearInterval(viewerInterval);
        clearInterval(durationInterval);
        clearInterval(heartInterval);
        clearInterval(chatInterval);
      };
    }
  }, [step]);

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [{ user: "You (Host)", text: chatInput, time: "now" }, ...prev]);
    setChatInput('');
  };

  const goLive = () => {
    if (!title.trim()) return;
    setStep('preview');
  };

  const startStream = () => {
    setStep('live');
    setViewerCount(3);
  };

  const endStream = () => {
    setStep('ended');
    setShowEndConfirm(false);
  };

  // Setup Screen
  if (step === 'setup') {
    return (
      <div className="min-h-screen font-sans antialiased flex flex-col" style={{ backgroundColor: t.bg, color: t.text }}>
        <header className="sticky top-0 w-full z-50 bg-[#040508]/95 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between border-b border-[#121419]">
          <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-[#F3F4F6]" /></button>
          <h1 className="text-[18px] font-bold">Go Live</h1>
          <div className="w-6" />
        </header>

        <div className="flex-1 p-4 flex flex-col gap-5">
          <div>
            <label className="text-[12px] text-[#8B8D93] font-bold uppercase tracking-wider mb-2 block">Stream Title *</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Morning Market Briefing"
              className="w-full bg-[#0A0D12] border border-[#1C1E23] rounded-[12px] px-4 py-3 text-[15px] text-white outline-none focus:border-[#2ECC71]"
            />
          </div>

          <div>
            <label className="text-[12px] text-[#8B8D93] font-bold uppercase tracking-wider mb-2 block">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What will you be streaming about?"
              rows={3}
              className="w-full bg-[#0A0D12] border border-[#1C1E23] rounded-[12px] px-4 py-3 text-[15px] text-white outline-none focus:border-[#2ECC71] resize-none"
            />
          </div>

          <div>
            <label className="text-[12px] text-[#8B8D93] font-bold uppercase tracking-wider mb-2 block">Category</label>
            <div className="flex flex-wrap gap-2">
              {['Markets', 'Crypto', 'Forex', 'Stocks', 'Education', 'Q&A'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all ${
                    category === cat
                      ? 'bg-[#2ECC71] text-[#040508]'
                      : 'bg-[#121419] border border-[#1C1E23] text-[#A0A2A8]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[12px] text-[#8B8D93] font-bold uppercase tracking-wider mb-2 block">Stream Settings</label>
            <div className="bg-[#0A0D12] border border-[#1C1E23] rounded-[16px] overflow-hidden">
              {[
                { label: "Camera", icon: Video, on: cameraOn, toggle: () => setCameraOn(!cameraOn) },
                { label: "Microphone", icon: Mic, on: micOn, toggle: () => setMicOn(!micOn) },
              ].map((s, i) => (
                <div key={i} className={`flex items-center justify-between p-4 ${i === 0 ? 'border-b border-[#1C1E23]' : ''}`}>
                  <div className="flex items-center gap-3">
                    <s.icon className="w-5 h-5 text-[#8B8D93]" />
                    <span className="text-[15px] font-semibold">{s.label}</span>
                  </div>
                  <button onClick={s.toggle} className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors ${s.on ? 'bg-[#2ECC71]' : 'bg-[#2A2E36]'}`}>
                    <div className={`w-[20px] h-[20px] rounded-full bg-white transition-transform ${s.on ? 'translate-x-[20px]' : 'translate-x-0'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pb-4">
            <button
              onClick={goLive}
              disabled={!title.trim()}
              className={`w-full py-4 rounded-[16px] font-bold text-[16px] transition-all flex items-center justify-center gap-2 ${
                title.trim()
                  ? 'bg-[#E63946] text-white hover:bg-[#d32836] shadow-[0_0_20px_rgba(230,57,70,0.3)]'
                  : 'bg-[#1A1C22] text-[#6A6C73] cursor-not-allowed'
              }`}
            >
              <Zap className="w-5 h-5" /> Next: Preview
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Preview Screen
  if (step === 'preview') {
    return (
      <div className="min-h-screen font-sans antialiased flex flex-col" style={{ backgroundColor: t.bg, color: t.text }}>
        <header className="sticky top-0 w-full z-50 bg-[#040508]/95 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between border-b border-[#121419]">
          <button onClick={() => setStep('setup')}><ArrowLeft className="w-6 h-6 text-[#F3F4F6]" /></button>
          <h1 className="text-[18px] font-bold">Preview</h1>
          <div className="w-6" />
        </header>

        <div className="flex-1 flex flex-col">
          <div className="relative w-full aspect-[4/3] bg-[#0A0D12] flex items-center justify-center">
            {cameraOn ? (
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" alt="Camera Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-3">
                <VideoOff className="w-12 h-12 text-[#8B8D93]" />
                <span className="text-[#8B8D93] text-[14px]">Camera is off</span>
              </div>
            )}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
              <button onClick={() => setCameraOn(!cameraOn)} className={`w-12 h-12 rounded-full flex items-center justify-center ${cameraOn ? 'bg-white/20 backdrop-blur-sm' : 'bg-[#FF3B30]'}`}>
                {cameraOn ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-white" />}
              </button>
              <button onClick={() => setMicOn(!micOn)} className={`w-12 h-12 rounded-full flex items-center justify-center ${micOn ? 'bg-white/20 backdrop-blur-sm' : 'bg-[#FF3B30]'}`}>
                {micOn ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-white" />}
              </button>
              <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div className="p-4">
            <h2 className="text-[18px] font-bold mb-1">{title}</h2>
            {description && <p className="text-[#8B8D93] text-[14px] mb-2">{description}</p>}
            <span className="text-[12px] font-bold bg-[#2ECC71]/20 text-[#2ECC71] px-2 py-1 rounded">{category}</span>
          </div>

          <div className="mt-auto p-4 pb-8">
            <button
              onClick={startStream}
              className="w-full py-4 rounded-[16px] font-bold text-[16px] bg-[#E63946] text-white hover:bg-[#d32836] shadow-[0_0_20px_rgba(230,57,70,0.3)] flex items-center justify-center gap-2 transition-all"
            >
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              GO LIVE NOW
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Live Stream Screen
  if (step === 'live') {
    return (
      <div className="min-h-screen font-sans antialiased flex flex-col relative" style={{ backgroundColor: t.bg, color: t.text }}>
        {/* Video Area */}
        <div className="relative w-full aspect-[4/3] bg-[#0A0D12]">
          {cameraOn ? (
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" alt="Live Stream" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#0A0D12]">
              <VideoOff className="w-12 h-12 text-[#8B8D93]" />
            </div>
          )}

          {/* Top Overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-[#E63946] text-white text-[12px] font-bold px-2.5 py-1 rounded-[6px] flex items-center gap-1.5">
                <div className="w-[6px] h-[6px] bg-white rounded-full animate-pulse" />LIVE
              </div>
              <div className="bg-black/60 backdrop-blur-sm text-white text-[12px] font-semibold px-2.5 py-1 rounded-[6px] flex items-center gap-1.5">
                <Eye className="w-4 h-4" />{viewerCount.toLocaleString()}
              </div>
              <div className="bg-black/60 backdrop-blur-sm text-white text-[12px] font-semibold px-2.5 py-1 rounded-[6px]">
                {formatDuration(duration)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowChat(!showChat)} className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                <MessageCircle className={`w-4 h-4 ${showChat ? 'text-[#2ECC71]' : 'text-white'}`} />
              </button>
              <button className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                <Share className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
            <button onClick={() => setCameraOn(!cameraOn)} className={`w-11 h-11 rounded-full flex items-center justify-center ${cameraOn ? 'bg-white/20 backdrop-blur-sm' : 'bg-[#FF3B30]'}`}>
              {cameraOn ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-white" />}
            </button>
            <button onClick={() => setMicOn(!micOn)} className={`w-11 h-11 rounded-full flex items-center justify-center ${micOn ? 'bg-white/20 backdrop-blur-sm' : 'bg-[#FF3B30]'}`}>
              {micOn ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-white" />}
            </button>
            <button onClick={() => setShowEndConfirm(true)} className="w-11 h-11 rounded-full bg-[#FF3B30] flex items-center justify-center">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Floating Hearts */}
          {hearts > 0 && (
            <div className="absolute bottom-16 right-4 flex flex-col items-center gap-1">
              <Heart className="w-6 h-6 text-[#FF3B30] fill-[#FF3B30] animate-bounce" />
              <span className="text-[11px] text-white font-bold bg-black/40 px-1.5 py-0.5 rounded">{hearts}</span>
            </div>
          )}
        </div>

        {/* Stream Info */}
        <div className="px-4 py-3 border-b border-[#121419]">
          <h2 className="text-[16px] font-bold">{title}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[12px] font-bold bg-[#2ECC71]/20 text-[#2ECC71] px-2 py-0.5 rounded">{category}</span>
            <span className="text-[#8B8D93] text-[12px]">{viewerCount.toLocaleString()} watching</span>
          </div>
        </div>

        {/* Viewers */}
        <div className="px-4 py-2 flex items-center gap-2 border-b border-[#121419]">
          <div className="flex -space-x-2">
            {liveViewers.map((v, i) => (
              <img key={i} src={v.avatar} className="w-6 h-6 rounded-full border-2 border-[#040508] object-cover" alt={v.name} />
            ))}
          </div>
          <span className="text-[12px] text-[#8B8D93]">{liveViewers[0].name} and {viewerCount - 1} others watching</span>
        </div>

        {/* Chat */}
        {showChat && (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-3 flex flex-col gap-2 overflow-y-auto max-h-[200px]">
              {chatMessages.map((msg, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className={`text-[13px] font-bold shrink-0 ${msg.user.includes('Host') ? 'text-[#2ECC71]' : 'text-[#A0A2A8]'}`}>{msg.user}:</span>
                  <span className="text-[13px] text-[#D1D5DB]">{msg.text}</span>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-[#121419] flex gap-3">
              <div className="flex-1 bg-[#121419] rounded-full flex items-center px-4 py-2.5 border border-[#1C1E23]">
                <input
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendChat()}
                  placeholder="Chat as host..."
                  className="bg-transparent flex-1 outline-none text-[14px] text-white placeholder:text-[#8B8D93]"
                />
                <Smile className="w-5 h-5 text-[#A0A2A8] ml-2" />
              </div>
              <button onClick={sendChat} className="bg-[#2ECC71] p-2.5 rounded-full">
                <Send className="w-5 h-5 text-[#040508]" />
              </button>
            </div>
          </div>
        )}

        {/* End Confirm */}
        {showEndConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-[#0A0D12] border border-[#1C1E23] rounded-[20px] p-6 max-w-[320px] w-full">
              <h3 className="text-[18px] font-bold text-center mb-2">End Stream?</h3>
              <p className="text-[#8B8D93] text-[14px] text-center mb-6">Your {viewerCount.toLocaleString()} viewers will be disconnected.</p>
              <div className="flex flex-col gap-3">
                <button onClick={endStream} className="bg-[#FF3B30] text-white font-bold text-[15px] py-3 rounded-[12px]">End Stream</button>
                <button onClick={() => setShowEndConfirm(false)} className="bg-[#121419] border border-[#1C1E23] text-[#F3F4F6] font-bold text-[15px] py-3 rounded-[12px]">Keep Streaming</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Ended Screen
  return (
    <div className="min-h-screen font-sans antialiased flex flex-col items-center justify-center p-6" style={{ backgroundColor: t.bg, color: t.text }}>
      <div className="w-20 h-20 rounded-full bg-[#2ECC71]/20 flex items-center justify-center mb-5">
        <Zap className="w-10 h-10 text-[#2ECC71]" />
      </div>
      <h2 className="text-[24px] font-extrabold mb-2">Stream Ended</h2>
      <p className="text-[#8B8D93] text-[14px] mb-6 text-center">Great stream! Here's your summary.</p>

      <div className="bg-[#0A0D12] border border-[#1C1E23] rounded-[16px] p-5 w-full max-w-[340px] mb-6">
        <h3 className="text-[16px] font-bold mb-4">{title}</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Duration", value: formatDuration(duration) },
            { label: "Peak Viewers", value: viewerCount.toLocaleString() },
            { label: "Total Hearts", value: hearts.toString() },
            { label: "Chat Messages", value: chatMessages.length.toString() },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center bg-[#121419] rounded-[10px] p-3">
              <span className="text-[18px] font-bold text-[#F3F4F6]">{s.value}</span>
              <span className="text-[11px] text-[#8B8D93] mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-[340px]">
        <button onClick={() => navigate('/home')} className="bg-[#2ECC71] text-[#040508] font-bold text-[15px] py-3.5 rounded-[12px]">Back to Feed</button>
        <button onClick={() => { setStep('setup'); setDuration(0); setViewerCount(0); setHearts(0); setChatMessages(liveChatMsgs); }} className="bg-[#121419] border border-[#1C1E23] text-[#F3F4F6] font-bold text-[15px] py-3.5 rounded-[12px]">Go Live Again</button>
      </div>
    </div>
  );
}
