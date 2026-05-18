import 'package:flutter/material.dart';
import '../widgets/grid_background.dart';

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({super.key});

  static const _red = Color(0xFFDC2626);
  static const _bg = Color(0xFF0F172A);
  static const _cardBg = Color(0xFF1E293B);
  static const _muted = Color(0xFF94A3B8);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _bg,
      appBar: AppBar(
        backgroundColor: _bg,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('All Notifications', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Colors.white)),
        centerTitle: true,
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(color: Colors.white.withValues(alpha: 0.06), height: 1),
        ),
      ),
      body: GridBackground(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            const Padding(
              padding: EdgeInsets.only(bottom: 12, left: 4),
              child: Text('New', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: Colors.white)),
            ),
            _notifItem(Icons.bolt_rounded, 'Breaking News', 'Agency publishes raw data report', '2m', true),
            _notifItem(Icons.how_to_vote_rounded, 'Governance', 'Sell limits poll - quorum reached 72%', '15m', true),
            _notifItem(Icons.trending_up_rounded, 'Market Alert', 'BTC crossed \$68,000 resistance', '32m', true),
            
            const Padding(
              padding: EdgeInsets.only(top: 16, bottom: 12, left: 4),
              child: Text('Earlier', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: Colors.white)),
            ),
            _notifItem(Icons.person_add_rounded, 'New Follower', '\$creator started following you', '1h', false),
            _notifItem(Icons.chat_bubble_rounded, 'Comment', 'Julia replied to your post', '2h', false),
            _notifItem(Icons.sensors_rounded, 'Live Stream', 'Morning newsroom is starting now', '3h', false),
            _notifItem(Icons.verified_rounded, 'Verified', 'Your source was fact-checked', '4h', false),
            _notifItem(Icons.account_balance_wallet_rounded, 'Wallet', 'Deposit confirmed - 0.5 ETH', '5h', false),
            _notifItem(Icons.how_to_vote_rounded, 'Governance', 'Fee tier pilot proposal passed', '1d', false),
            _notifItem(Icons.person_add_rounded, 'New Follower', 'Markets desk started following you', '2d', false),
            _notifItem(Icons.chat_bubble_rounded, 'Comment', 'Truth desk cited your video', '2d', false),
          ],
        ),
      ),
    );
  }

  Widget _notifItem(IconData ic, String title, String sub, String time, bool unread) => Container(
    margin: const EdgeInsets.only(bottom: 10), padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(borderRadius: BorderRadius.circular(16),
      color: unread ? _red.withValues(alpha: 0.04) : _cardBg.withValues(alpha: 0.5),
      border: Border.all(color: unread ? _red.withValues(alpha: 0.12) : Colors.white.withValues(alpha: 0.06))),
    child: Row(children: [
      Container(width: 44, height: 44, decoration: BoxDecoration(borderRadius: BorderRadius.circular(12),
        color: (unread ? _red : _muted).withValues(alpha: 0.1)),
        child: Icon(ic, size: 20, color: unread ? _red : _muted)),
      const SizedBox(width: 14),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(title, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: unread ? Colors.white : _muted)),
        const SizedBox(height: 4),
        Text(sub, style: TextStyle(fontSize: 12, color: Colors.white.withValues(alpha: 0.6))),
      ])),
      Column(children: [
        Text(time, style: const TextStyle(fontSize: 11, color: _muted, fontWeight: FontWeight.w600)),
        if (unread) ...[const SizedBox(height: 6), Container(width: 8, height: 8, decoration: const BoxDecoration(shape: BoxShape.circle, color: _red))],
      ]),
    ]),
  );
}
