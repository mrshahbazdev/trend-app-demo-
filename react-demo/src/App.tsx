import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginOptionsPage from './pages/LoginOptionsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WalletConnectedPage from './pages/WalletConnectedPage';
import UnlockPrivateChatPage from './pages/UnlockPrivateChatPage';
import TodayFeedPage from './pages/TodayFeedPage';
import MarketsPage from './pages/MarketsPage';
import ChatsPage from './pages/ChatsPage';
import ChatDetailPage from './pages/ChatDetailPage';
import LiveStreamPage from './pages/LiveStreamPage';
import VoteMarketPage from './pages/VoteMarketPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotificationsPage from './pages/NotificationsPage';
import CreatePostPage from './pages/CreatePostPage';
import SplashScreen from './pages/SplashScreen';
import SearchPage from './pages/SearchPage';
import StoryViewerPage from './pages/StoryViewerPage';
import MarketDetailPage from './pages/MarketDetailPage';
import AboutPage from './pages/AboutPage';
import PodcastsPage from './pages/PodcastsPage';
import GoLivePage from './pages/GoLivePage';
import DiscoverPage from './pages/DiscoverPage';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { t } = useTheme();
  return (
    <HashRouter>
      <div className="max-w-[430px] mx-auto min-h-screen relative shadow-2xl" style={{ backgroundColor: t.bg }}>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/welcome" element={<LoginOptionsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/wallet-connected" element={<WalletConnectedPage />} />
          <Route path="/unlock-private-chat" element={<UnlockPrivateChatPage />} />
          <Route path="/home" element={<TodayFeedPage />} />
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/vote-market" element={<VoteMarketPage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/chats/detail" element={<ChatDetailPage />} />
          <Route path="/live" element={<LiveStreamPage />} />
          <Route path="/go-live" element={<GoLivePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/story" element={<StoryViewerPage />} />
          <Route path="/market-detail" element={<MarketDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/podcasts" element={<PodcastsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
