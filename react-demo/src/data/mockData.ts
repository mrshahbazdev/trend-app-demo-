export const markets = [
  { name: "S&P 500", ticker: "SPX", price: "5,234.12", change: "+0.85%", trend: "up" as const },
  { name: "Nasdaq", ticker: "NDX", price: "18,122.45", change: "+1.24%", trend: "up" as const },
  { name: "Bitcoin", ticker: "BTC", price: "64,230.00", change: "-0.45%", trend: "down" as const },
  { name: "Gold", ticker: "XAU", price: "2,345.10", change: "+0.12%", trend: "up" as const },
  { name: "Apple", ticker: "AAPL", price: "172.30", change: "-0.67%", trend: "down" as const },
  { name: "NVIDIA", ticker: "NVDA", price: "895.40", change: "+2.15%", trend: "up" as const },
];

export const pinnedChats = [
  { id: 1, name: "Crypto Alpha Squad", lastMsg: "BTC breakout incoming?", time: "2m", unread: 3, verified: true, online: true },
];

export const recentChats = [
  { id: 2, name: "Stock Market Daily", lastMsg: "Earnings schedule posted", time: "1h", unread: 0, online: true, verified: false },
  { id: 3, name: "Jason Lin", lastMsg: "Check the 10Y yields", time: "3h", unread: 0, online: true, verified: false },
  { id: 4, name: "General Market Chat", lastMsg: "Anyone watching NVDA?", time: "5h", unread: 0, online: false, verified: false },
  { id: 5, name: "Forex Signals", lastMsg: "EUR/USD position update", time: "8h", unread: 0, online: true, verified: false },
];

export const chatMessages = [
  { id: 1, sender: 'other' as const, text: 'BTC is showing a strong breakout pattern!', time: '10:42 AM', read: true },
  { id: 2, sender: 'user' as const, text: 'Watching the resistance. Do you see the volume spike?', time: '10:43 AM', read: true },
  { id: 3, sender: 'other' as const, text: 'Yeah, it confirms the move. Buying in.', time: '10:44 AM', read: true },
];

export const stories = [
  { name: "Alex Morgan", followers: "1.3M", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop", verified: true, ring: "green" },
  { name: "World Pulse", followers: "530K", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=150&auto=format&fit=crop", verified: false, ring: "gradient-blue" },
  { name: "Tech Talk", followers: "214K", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop", verified: false, ring: "default" },
  { name: "Green Future", followers: "98K", img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=150&auto=format&fit=crop", verified: false, ring: "gradient-green" },
  { name: "Market Insight", followers: "392K", img: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=150&auto=format&fit=crop", verified: false, ring: "gradient-orange" },
];

export const feedPosts = [
  {
    id: 1,
    user: "Alex Morgan",
    handle: "@alexmorgan",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    verified: true,
    badge: "Creator",
    time: "2h",
    content: "Small daily habits compound into big life changes. Here are 3 that changed my mornings completely.",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop",
    likes: 42,
    comments: 12,
    reposts: 8,
  },
  {
    id: 2,
    user: "Jason Lin",
    handle: "@jasonlin",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop",
    verified: true,
    badge: "Creator",
    time: "4h",
    content: "Tech earnings this week will be pivotal. Here's what to watch for in the Magnificent 7 reports.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    likes: 128,
    comments: 34,
    reposts: 21,
  },
  {
    id: 3,
    user: "Crypto Whale",
    handle: "@cryptowhale",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    verified: false,
    badge: null,
    time: "6h",
    content: "BTC dominance is at 54% and climbing. Altseason might have to wait a bit longer. Accumulate wisely.",
    image: null,
    likes: 67,
    comments: 23,
    reposts: 15,
  },
];

export const settingSections = [
  {
    title: "Account",
    items: [
      { icon: "User", label: "Edit Profile" },
      { icon: "Wallet", label: "Billing & Subscription" },
      { icon: "Shield", label: "Privacy & Security" },
    ]
  },
  {
    title: "Preferences",
    items: [
      { icon: "Bell", label: "Notifications" },
      { icon: "Moon", label: "Dark Mode" },
      { icon: "Globe", label: "Language" },
    ]
  },
  {
    title: "Support",
    items: [
      { icon: "HelpCircle", label: "Help Center" },
    ]
  }
];
