import 'package:flutter/material.dart';
import 'theme/app_theme.dart';
import 'screens/landing_screen.dart';
import 'screens/signin_screen.dart';
import 'screens/register_screen.dart';
import 'screens/lock_screen.dart';
import 'screens/securing_screen.dart';
import 'screens/home_screen.dart';
import 'screens/today_hub_screen.dart';
import 'screens/chat_screen.dart';
import 'screens/chat_info_screen.dart';
import 'screens/new_message_screen.dart';
import 'screens/call_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/wallet_screen.dart';
import 'screens/notifications_screen.dart';
import 'screens/search_screen.dart';
import 'screens/recovery_screen.dart';
import 'screens/forgot_password_screen.dart';
import 'screens/hub_screen.dart';
import 'screens/news_screen.dart';
import 'screens/market_screen.dart';
import 'screens/voting_screen.dart';
import 'screens/feed_screen.dart';
import 'screens/stories_screen.dart';
import 'screens/polls_screen.dart';
import 'screens/livestream_screen.dart';
import 'screens/podcast_screen.dart';
import 'screens/channels_screen.dart';
import 'screens/invite_screen.dart';
import 'screens/twofa_screen.dart';
import 'screens/devices_screen.dart';
import 'screens/blocked_screen.dart';
import 'screens/media_screen.dart';
import 'screens/safety_screen.dart';
import 'screens/disappearing_screen.dart';
import 'screens/stickers_screen.dart';
import 'screens/pinned_screen.dart';
import 'screens/create_group_screen.dart';
import 'screens/qr_share_screen.dart';
import 'screens/file_share_screen.dart';
import 'screens/secure_mode_screen.dart';
import 'screens/notifications_screen.dart';

void main() {
  runApp(const TrendUpApp());
}

class TrendUpApp extends StatelessWidget {
  const TrendUpApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TrendUp',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      initialRoute: '/landing',
      routes: {
        '/landing': (_) => const LandingScreen(),
        '/signin': (_) => const SignInScreen(),
        '/register': (_) => const RegisterScreen(),
        '/lock': (_) => const LockScreen(),
        '/securing': (_) => const SecuringScreen(),
        '/home': (_) => const TodayHubScreen(),
        '/chats': (_) => const HomeScreen(),
        '/notifications': (_) => const NotificationsScreen(),
        '/chat': (_) => const ChatScreen(),
        '/chat-info': (_) => const ChatInfoScreen(),
        '/new-message': (_) => const NewMessageScreen(),
        '/call': (_) => const CallScreen(),
        '/video-call': (_) => const CallScreen(),
        '/calls': (_) => const CallHistoryScreen(),
        '/profile': (_) => const ProfileScreen(),
        '/peer-profile': (_) => const PeerProfileScreen(),
        '/wallet': (_) => const WalletScreen(),
        '/notifications': (_) => const NotificationsScreen(),
        '/search': (_) => const SearchScreen(),
        '/recovery': (_) => const RecoveryScreen(),
        '/forgot': (_) => const ForgotPasswordScreen(),
        '/hub': (_) => const HubScreen(),
        '/news': (_) => const NewsScreen(),
        '/market': (_) => const MarketScreen(),
        '/voting': (_) => const VotingScreen(),
        '/feed': (_) => const FeedScreen(),
        '/compose': (_) => const ComposeScreen(),
        '/stories': (_) => const StoriesScreen(),
        '/polls': (_) => const PollsScreen(),
        '/livestream': (_) => const LiveStreamScreen(),
        '/podcasts': (_) => const PodcastScreen(),
        '/channels': (_) => const ChannelsScreen(),
        '/invite': (_) => const InviteScreen(),
        '/2fa': (_) => const TwoFAScreen(),
        '/devices': (_) => const DevicesScreen(),
        '/blocked': (_) => const BlockedUsersScreen(),
        '/media': (_) => const MediaScreen(),
        '/safety': (_) => const SafetyNumberScreen(),
        '/disappearing': (_) => const DisappearingMessagesScreen(),
        '/stickers': (_) => const StickersScreen(),
        '/pinned': (_) => const PinnedMessagesScreen(),
        '/create-group': (_) => const CreateGroupScreen(),
        '/qr-share': (_) => const QrShareScreen(),
        '/files': (_) => const FileShareScreen(),
        '/secure-mode': (_) => const SecureModeScreen(),
        '/add-contact': (_) => const NewMessageScreen(),
      },
    );
  }
}
