export const markets = [
  { name: "S&P 500", ticker: "SPX", price: "5,234.12", change: "+0.85%", trend: "up" as const },
  { name: "Nasdaq", ticker: "NDX", price: "18,122.45", change: "+1.24%", trend: "up" as const },
  { name: "Bitcoin", ticker: "BTC", price: "64,230.00", change: "-0.45%", trend: "down" as const },
  { name: "Gold", ticker: "XAU", price: "2,345.10", change: "+0.12%", trend: "up" as const },
  { name: "Apple", ticker: "AAPL", price: "172.30", change: "-0.67%", trend: "down" as const },
  { name: "NVIDIA", ticker: "NVDA", price: "895.40", change: "+2.15%", trend: "up" as const },
];

export const pinnedChats = [
  { id: 1, name: "Crypto Alpha Squad", lastMsg: "BTC breakout incoming?", time: "2m", unread: 3, verified: true, online: true, room: "default" },
];

export const recentChats = [
  { id: 2, name: "NFT Collectors", lastMsg: "Just minted the new Azuki drop", time: "1h", unread: 0, online: true, verified: false, room: "nft" },
  { id: 3, name: "DeFi Strategies", lastMsg: "42% APY farm on Arbitrum", time: "3h", unread: 0, online: true, verified: false, room: "defi" },
  { id: 4, name: "Macro Economics", lastMsg: "CPI data comes out tomorrow", time: "5h", unread: 0, online: false, verified: false, room: "macro" },
  { id: 5, name: "Forex Signals", lastMsg: "EUR/USD position update", time: "8h", unread: 0, online: true, verified: false, room: "default" },
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

export const newsPosts = [
  {
    id: 101,
    user: "Reuters Finance",
    handle: "@reutersfinance",
    avatar: "https://images.unsplash.com/photo-1504711434969-e33886168d5c?q=80&w=100&auto=format&fit=crop",
    verified: true,
    badge: "News",
    time: "25m",
    content: "Federal Reserve signals potential rate cut in September as inflation cools to 2.4%. Markets rally on the announcement.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800&auto=format&fit=crop",
    likes: 312,
    comments: 87,
    reposts: 145,
  },
  {
    id: 102,
    user: "Bloomberg Markets",
    handle: "@bloombergmkts",
    avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=100&auto=format&fit=crop",
    verified: true,
    badge: "News",
    time: "1h",
    content: "NVIDIA surpasses Apple as world's second most valuable company. AI chip demand continues to surge with data center expansion.",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=800&auto=format&fit=crop",
    likes: 534,
    comments: 156,
    reposts: 234,
  },
  {
    id: 103,
    user: "CoinDesk",
    handle: "@coindesk",
    avatar: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=100&auto=format&fit=crop",
    verified: true,
    badge: "News",
    time: "2h",
    content: "Bitcoin ETF inflows hit record $1.2B in single day. Institutional adoption accelerating ahead of halving event.",
    image: null,
    likes: 891,
    comments: 234,
    reposts: 412,
  },
];

export const marketTrendPosts = [
  {
    id: 201,
    user: "Market Pulse",
    handle: "@marketpulse",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    verified: true,
    badge: "Analyst",
    time: "15m",
    content: "S&P 500 breaking above 5,250 resistance. Volume confirms the move. Next target: 5,400. Key support at 5,180.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    likes: 156,
    comments: 43,
    reposts: 67,
  },
  {
    id: 202,
    user: "Crypto Charts",
    handle: "@cryptocharts",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    verified: false,
    badge: null,
    time: "45m",
    content: "BTC forming a bull flag on the 4H chart. If it breaks $65K, we could see $72K quickly. RSI at 58 — room to run.",
    image: null,
    likes: 234,
    comments: 89,
    reposts: 56,
  },
  {
    id: 203,
    user: "Forex Daily",
    handle: "@forexdaily",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
    verified: true,
    badge: "Analyst",
    time: "1h",
    content: "EUR/USD testing 1.0900 resistance after ECB holds rates. DXY weakening on Fed pivot expectations. Watch 1.0950 for breakout.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800&auto=format&fit=crop",
    likes: 89,
    comments: 32,
    reposts: 21,
  },
];

export const notifications = [
  { id: 1, type: "like" as const, user: "Alex Morgan", text: "liked your post", time: "2m", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" },
  { id: 2, type: "follow" as const, user: "Jason Lin", text: "started following you", time: "15m", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" },
  { id: 3, type: "comment" as const, user: "Crypto Whale", text: "replied to your comment", time: "1h", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" },
  { id: 4, type: "mention" as const, user: "DeFi Whale", text: "mentioned you in a post", time: "2h", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" },
  { id: 5, type: "like" as const, user: "Market Pulse", text: "liked your comment", time: "3h", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" },
  { id: 6, type: "follow" as const, user: "Bloomberg Markets", text: "started following you", time: "5h", avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=100&auto=format&fit=crop" },
  { id: 7, type: "comment" as const, user: "Reuters Finance", text: "replied to your post", time: "8h", avatar: "https://images.unsplash.com/photo-1504711434969-e33886168d5c?q=80&w=100&auto=format&fit=crop" },
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
