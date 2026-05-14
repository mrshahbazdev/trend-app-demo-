import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class AppDrawer extends StatelessWidget {
  const AppDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: AppColors.background,
      child: SafeArea(
        child: Column(
          children: [
            Container(
              width: double.infinity,
              padding: const EdgeInsets.fromLTRB(20, 24, 20, 16),
              decoration: BoxDecoration(
                border: Border(bottom: BorderSide(color: AppColors.border)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Image.asset('assets/images/logo.png', width: 48, height: 48),
                  const SizedBox(height: 12),
                  const Text('TrendUp', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800)),
                  const Text('Private by Design', style: TextStyle(color: AppColors.textMuted, fontSize: 13)),
                ],
              ),
            ),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.symmetric(vertical: 8),
                children: [
                  _sectionLabel('MAIN'),
                  _navItem(context, Icons.home, 'Hub', '/hub'),
                  _navItem(context, Icons.chat_bubble, 'Messages', '/home'),
                  _navItem(context, Icons.group, 'Groups', '/home'),
                  _navItem(context, Icons.contacts, 'Contacts', '/home'),
                  _sectionLabel('SOCIAL'),
                  _navItem(context, Icons.dynamic_feed, 'Feed', '/feed'),
                  _navItem(context, Icons.auto_stories, 'Stories', '/stories'),
                  _navItem(context, Icons.poll, 'Polls', '/polls'),
                  _navItem(context, Icons.tv, 'Channels', '/channels'),
                  _navItem(context, Icons.podcasts, 'Podcasts', '/podcasts'),
                  _navItem(context, Icons.live_tv, 'Live Stream', '/livestream'),
                  _sectionLabel('FINANCE'),
                  _navItem(context, Icons.account_balance_wallet, 'Wallet', '/wallet'),
                  _navItem(context, Icons.show_chart, 'Markets', '/market'),
                  _navItem(context, Icons.newspaper, 'News', '/news'),
                  _navItem(context, Icons.how_to_vote, 'Governance', '/voting'),
                  _sectionLabel('COMMUNICATION'),
                  _navItem(context, Icons.edit_square, 'New Message', '/new-message'),
                  _navItem(context, Icons.phone, 'Calls', '/calls'),
                  _navItem(context, Icons.search, 'Search', '/search'),
                  _navItem(context, Icons.notifications, 'Notifications', '/notifications'),
                  _sectionLabel('SECURITY'),
                  _navItem(context, Icons.shield, 'Secure Mode', '/secure-mode'),
                  _navItem(context, Icons.security, '2FA Setup', '/2fa'),
                  _navItem(context, Icons.devices, 'Linked Devices', '/devices'),
                  _navItem(context, Icons.block, 'Blocked Users', '/blocked'),
                  _navItem(context, Icons.verified_user, 'Safety Number', '/safety'),
                  _navItem(context, Icons.timer, 'Disappearing Msgs', '/disappearing'),
                  _sectionLabel('MORE'),
                  _navItem(context, Icons.person, 'Profile', '/profile'),
                  _navItem(context, Icons.qr_code, 'QR Code', '/qr-share'),
                  _navItem(context, Icons.person_add, 'Invite Friends', '/invite'),
                  _navItem(context, Icons.image, 'Media', '/media'),
                  _navItem(context, Icons.insert_drive_file, 'Files', '/files'),
                  _navItem(context, Icons.push_pin, 'Pinned Messages', '/pinned'),
                  _navItem(context, Icons.emoji_emotions, 'Stickers', '/stickers'),
                  _navItem(context, Icons.group_add, 'Create Group', '/create-group'),
                  _navItem(context, Icons.restore, 'Recovery', '/recovery'),
                  _navItem(context, Icons.settings, 'Settings', '/home'),
                ],
              ),
            ),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(border: Border(top: BorderSide(color: AppColors.border))),
              child: Row(
                children: [
                  const CircleAvatar(
                    radius: 18,
                    backgroundColor: AppColors.primary,
                    child: Text('S', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 14)),
                  ),
                  const SizedBox(width: 10),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('shahbaz', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
                        Text('@shahbazdev', style: TextStyle(color: AppColors.textMuted, fontSize: 11)),
                      ],
                    ),
                  ),
                  Icon(Icons.lock, size: 14, color: AppColors.success),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _sectionLabel(String label) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 4),
      child: Text(label, style: const TextStyle(color: AppColors.textMuted, fontSize: 10, fontWeight: FontWeight.w700, letterSpacing: 1.2)),
    );
  }

  Widget _navItem(BuildContext context, IconData icon, String label, String route) {
    return ListTile(
      leading: Icon(icon, size: 20, color: AppColors.textSecondary),
      title: Text(label, style: const TextStyle(fontSize: 14)),
      dense: true,
      visualDensity: const VisualDensity(vertical: -2),
      contentPadding: const EdgeInsets.symmetric(horizontal: 20),
      onTap: () {
        Navigator.pop(context);
        Navigator.pushNamed(context, route);
      },
    );
  }
}
