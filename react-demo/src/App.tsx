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

export default function App() {
  return (
    <HashRouter>
      <div className="max-w-[430px] mx-auto min-h-screen bg-[#040508] relative shadow-2xl">
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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
