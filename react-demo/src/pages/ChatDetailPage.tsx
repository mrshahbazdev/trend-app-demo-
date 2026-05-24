import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Video, MoreVertical, Smile, Plus, Send, CheckCircle2 } from 'lucide-react';
import { chatMessages } from '../data/mockData';

interface Message {
  id: number;
  sender: 'user' | 'other';
  text: string;
  time: string;
  read: boolean;
}

export default function ChatDetailPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(chatMessages);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    setMessages([...messages, newMsg]);
    setInput('');
    setTimeout(() => {
      const replies = [
        "Interesting point! The volume confirms it.",
        "I'm watching the same levels. Let's see how it plays out.",
        "Great analysis! The market is definitely heating up.",
        "Agreed. This could be a major breakout.",
      ];
      const reply: Message = {
        id: messages.length + 2,
        sender: 'other',
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true,
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#040508] text-white font-sans flex flex-col">
      <header className="sticky top-0 w-full z-50 bg-[#040508]/90 backdrop-blur-xl pt-4 pb-3 px-4 flex items-center justify-between border-b border-[#121419]">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/chats')}>
            <ArrowLeft className="w-6 h-6 text-[#F3F4F6]" />
          </button>
          <div className="relative w-10 h-10 bg-[#121419] rounded-full border border-[#1C1E23] flex items-center justify-center font-bold text-[#2ECC71]">
            CT
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ECC71] border-2 border-[#040508] rounded-full"></div>
          </div>
          <div>
            <h1 className="text-[15px] font-bold">Crypto Alpha Squad</h1>
            <p className="text-[#8B8D93] text-[11px] font-semibold">1.2k members</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Phone className="w-5 h-5 text-[#8B8D93]" />
          <Video className="w-5 h-5 text-[#8B8D93]" />
          <MoreVertical className="w-5 h-5 text-[#8B8D93]" />
        </div>
      </header>

      <div className="flex-1 p-4 flex flex-col gap-5 overflow-y-auto">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.sender !== 'user' && (
              <div className="w-8 h-8 rounded-full bg-[#121419] mr-2 flex items-center justify-center text-[10px] font-bold shrink-0">CT</div>
            )}
            <div className={`max-w-[70%] px-4 py-3 rounded-[18px] ${m.sender === 'user' ? 'bg-[#2ECC71] text-[#040508] rounded-br-[4px]' : 'bg-[#121419] text-[#F3F4F6] rounded-bl-[4px]'}`}>
              <p className="text-[14px] leading-relaxed font-medium">{m.text}</p>
              <div className={`flex items-center gap-1 mt-1.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span className={`text-[10px] ${m.sender === 'user' ? 'text-[#040508]/60' : 'text-[#8B8D93]'}`}>{m.time}</span>
                {m.sender === 'user' && <CheckCircle2 className="w-3 h-3 opacity-60" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-[#121419] bg-[#040508]">
        <div className="flex items-center gap-3">
          <button className="p-2 bg-[#121419] rounded-full border border-[#1C1E23]">
            <Plus className="w-6 h-6 text-[#A0A2A8]" />
          </button>
          <div className="flex-1 bg-[#121419] rounded-[24px] flex items-center px-4 py-3 border border-[#1C1E23] focus-within:border-[#2ECC71] transition-colors">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="bg-transparent flex-1 outline-none text-[14px] placeholder:text-[#8B8D93] text-white"
            />
            <Smile className="w-5 h-5 text-[#A0A2A8]" />
          </div>
          <button onClick={sendMessage} className="bg-[#2ECC71] p-3 rounded-full shadow-[0_0_15px_rgba(46,204,113,0.3)]">
            <Send className="w-5 h-5 text-[#040508]" />
          </button>
        </div>
      </div>
    </div>
  );
}
