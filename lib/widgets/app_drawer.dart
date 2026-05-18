import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class AppDrawer extends StatelessWidget {
  const AppDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: AppColors.background,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.horizontal(right: Radius.circular(24)),
      ),
      child: SafeArea(
        child: Column(
          children: [
            Container(
              width: double.infinity,
              padding: const EdgeInsets.fromLTRB(20, 28, 20, 20),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [AppColors.primary.withValues(alpha: 0.08), AppColors.background],
                ),
                border: Border(bottom: BorderSide(color: Colors.white.withValues(alpha: 0.06))),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.all(3),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.primary.withValues(alpha: 0.2)),
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(13),
                      child: Image.asset('assets/images/logo.png', width: 48, height: 48),
                    ),
                  ),
                  const SizedBox(height: 14),
                  const Text('TrendUp', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900, letterSpacing: -0.3)),
                  const SizedBox(height: 2),
                  Text('PRIVATE BY DESIGN', style: TextStyle(color: AppColors.primary.withValues(alpha: 0.7), fontSize: 10, fontWeight: FontWeight.w700, letterSpacing: 2)),
                ],
              ),
            ),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.symmetric(vertical: 8),
                children: [
                  _sectionLabel('MAIN'),
                  _navItem(context, Icons.home_rounded, 'Hub', '/hub'),
                  _navItem(context, Icons.chat_bubble_rounded, 'Messages', '/chats', arguments: 0),
                  _navItem(context, Icons.group_rounded, 'Groups', '/chats', arguments: 1),
                  _navItem(context, Icons.contacts_rounded, 'Contacts', '/chats', arguments: 2),
                  _sectionLabel('SOCIAL'),
                  _navItem(context, Icons.dynamic_feed_rounded, 'Feed', '/feed'),
                  _navItem(context, Icons.auto_stories_rounded, 'Stories', '/stories'),
                  _navItem(context, Icons.poll_rounded, 'Polls', '/polls'),
                  _navItem(context, Icons.tv_rounded, 'Channels', '/channels'),
                  _navItem(context, Icons.podcasts_rounded, 'Podcasts', '/podcasts'),
                  _navItem(context, Icons.live_tv_rounded, 'Live Stream', '/livestream'),
                  _sectionLabel('FINANCE'),
                  _navItem(context, Icons.account_balance_wallet_rounded, 'Wallet', '/wallet'),
                  _navItem(context, Icons.show_chart_rounded, 'Markets', '/market'),
                  _navItem(context, Icons.newspaper_rounded, 'News', '/news'),
                  _navItem(context, Icons.how_to_vote_rounded, 'Governance', '/voting'),
                  _sectionLabel('COMMUNICATION'),
                  _navItem(context, Icons.edit_note_rounded, 'New Message', '/new-message'),
                  _navItem(context, Icons.phone_rounded, 'Calls', '/calls'),
                  _navItem(context, Icons.search_rounded, 'Search', '/search'),
                  _navItem(context, Icons.notifications_rounded, 'Notifications', '/notifications'),
                  _sectionLabel('SECURITY'),
                  _navItem(context, Icons.shield_rounded, 'Secure Mode', '/secure-mode'),
                  _navItem(context, Icons.security_rounded, '2FA Setup', '/2fa'),
                  _navItem(context, Icons.devices_rounded, 'Linked Devices', '/devices'),
                  _navItem(context, Icons.block_rounded, 'Blocked Users', '/blocked'),
                  _navItem(context, Icons.verified_user_rounded, 'Safety Number', '/safety'),
                  _navItem(context, Icons.timer_rounded, 'Disappearing Msgs', '/disappearing'),
                  _sectionLabel('MORE'),
                  _navItem(context, Icons.person_rounded, 'Profile', '/profile'),
                  _navItem(context, Icons.qr_code_rounded, 'QR Code', '/qr-share'),
                  _navItem(context, Icons.person_add_rounded, 'Invite Friends', '/invite'),
                  _navItem(context, Icons.image_rounded, 'Media', '/media'),
                  _navItem(context, Icons.insert_drive_file_rounded, 'Files', '/files'),
                  _navItem(context, Icons.push_pin_rounded, 'Pinned Messages', '/pinned'),
                  _navItem(context, Icons.emoji_emotions_rounded, 'Stickers', '/stickers'),
                  _navItem(context, Icons.group_add_rounded, 'Create Group', '/create-group'),
                  _navItem(context, Icons.restore_rounded, 'Recovery', '/recovery'),
                  _navItem(context, Icons.settings_rounded, 'Settings', '/chats', arguments: 3),
                ],
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              decoration: BoxDecoration(
                color: AppColors.surface.withValues(alpha: 0.5),
                border: Border(top: BorderSide(color: Colors.white.withValues(alpha: 0.06))),
              ),
              child: Row(
                children: [
                  Container(
                    width: 38,
                    height: 38,
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [Color(0xFFDC2626), Color(0xFF991B1B)],
                      ),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Center(
                      child: Text('S', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 15)),
                    ),
                  ),
                  const SizedBox(width: 12),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('shahbaz', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 14)),
                        Text('@shahbazdev', style: TextStyle(color: AppColors.textMuted, fontSize: 11)),
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: AppColors.success.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.lock_rounded, size: 11, color: AppColors.success),
                        const SizedBox(width: 3),
                        Text('E2EE', style: TextStyle(color: AppColors.success, fontSize: 9, fontWeight: FontWeight.w700)),
                      ],
                    ),
                  ),
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
      padding: const EdgeInsets.fromLTRB(20, 20, 20, 6),
      child: Text(label, style: TextStyle(color: AppColors.textMuted.withValues(alpha: 0.7), fontSize: 10, fontWeight: FontWeight.w800, letterSpacing: 1.5)),
    );
  }

  Widget _navItem(BuildContext context, IconData icon, String label, String route, {Object? arguments}) {
    return ListTile(
      leading: Container(
        width: 32,
        height: 32,
        decoration: BoxDecoration(
          color: AppColors.surfaceLight.withValues(alpha: 0.4),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(icon, size: 17, color: AppColors.textSecondary),
      ),
      title: Text(label, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500)),
      dense: true,
      visualDensity: const VisualDensity(vertical: -1),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      onTap: () {
        final navigator = Navigator.of(context);
        navigator.pop();
        navigator.pushNamed(route, arguments: arguments);
      },
    );
  }
}
