import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class HubScreen extends StatelessWidget {
  const HubScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Image.asset('assets/images/logo.png', width: 28, height: 28),
            const SizedBox(width: 8),
            const Text('TrendUp Hub', style: TextStyle(fontWeight: FontWeight.w700)),
          ],
        ),
        actions: [
          IconButton(icon: const Icon(Icons.notifications_outlined), onPressed: () => Navigator.pushNamed(context, '/notifications')),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Welcome to TrendUp', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800)),
            const Text('Your secure digital hub', style: TextStyle(color: AppColors.textSecondary)),
            const SizedBox(height: 24),
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              childAspectRatio: 1.4,
              children: [
                _hubCard(context, Icons.chat_bubble, 'Messages', '3 unread', AppColors.accent, '/home'),
                _hubCard(context, Icons.account_balance_wallet, 'Wallet', '\$12,847', AppColors.success, '/wallet'),
                _hubCard(context, Icons.newspaper, 'News', '12 new', AppColors.warning, '/news'),
                _hubCard(context, Icons.show_chart, 'Markets', 'BTC +2.1%', AppColors.primary, '/market'),
                _hubCard(context, Icons.how_to_vote, 'Governance', '2 active', AppColors.accent, '/voting'),
                _hubCard(context, Icons.dynamic_feed, 'Feed', '5 posts', AppColors.primary, '/feed'),
                _hubCard(context, Icons.podcasts, 'Podcasts', '3 live', AppColors.warning, '/podcasts'),
                _hubCard(context, Icons.live_tv, 'Live', '1 stream', AppColors.error, '/livestream'),
              ],
            ),
            const SizedBox(height: 24),
            const Text('Quick Actions', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
            const SizedBox(height: 12),
            Row(
              children: [
                _quickAction(context, Icons.person_add, 'Invite', '/invite'),
                const SizedBox(width: 12),
                _quickAction(context, Icons.qr_code, 'QR Code', '/qr-share'),
                const SizedBox(width: 12),
                _quickAction(context, Icons.lock, 'Security', '/2fa'),
                const SizedBox(width: 12),
                _quickAction(context, Icons.phone, 'Calls', '/calls'),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _hubCard(BuildContext context, IconData icon, String title, String subtitle, Color color, String route) {
    return InkWell(
      onTap: () => Navigator.pushNamed(context, route),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: color.withValues(alpha: 0.2)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, color: color, size: 28),
            const Spacer(),
            Text(title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15)),
            const SizedBox(height: 2),
            Text(subtitle, style: TextStyle(color: color, fontSize: 12, fontWeight: FontWeight.w500)),
          ],
        ),
      ),
    );
  }

  Widget _quickAction(BuildContext context, IconData icon, String label, String route) {
    return Expanded(
      child: InkWell(
        onTap: () => Navigator.pushNamed(context, route),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 14),
          decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppColors.border)),
          child: Column(
            children: [
              Icon(icon, color: AppColors.primary, size: 22),
              const SizedBox(height: 6),
              Text(label, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w500)),
            ],
          ),
        ),
      ),
    );
  }
}
