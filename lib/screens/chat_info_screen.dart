import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class ChatInfoScreen extends StatelessWidget {
  const ChatInfoScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Conversation Info')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            const CircleAvatar(radius: 40, backgroundColor: AppColors.surfaceLight, child: Text('S', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800))),
            const SizedBox(height: 12),
            const Text('stevej', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800)),
            const Text('@stevej', style: TextStyle(color: AppColors.textMuted)),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.lock, size: 12, color: AppColors.success),
                const SizedBox(width: 4),
                const Text('End-to-End Encrypted', style: TextStyle(color: AppColors.success, fontSize: 12)),
              ],
            ),
            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _quickAction(context, Icons.search, 'Search', '/search'),
                _quickAction(context, Icons.image, 'Media', '/media'),
                _quickAction(context, Icons.push_pin, 'Pinned', '/pinned'),
                _quickAction(context, Icons.notifications_off, 'Mute', null),
              ],
            ),
            const SizedBox(height: 24),
            _infoCard([
              _infoRow(Icons.timer, 'Disappearing Messages', 'Off', () => Navigator.pushNamed(context, '/disappearing')),
              _infoRow(Icons.lock, 'Encryption', 'E2EE Active', null),
              _infoRow(Icons.verified_user, 'Safety Number', 'Verified', () => Navigator.pushNamed(context, '/safety')),
            ]),
            const SizedBox(height: 12),
            _infoCard([
              _infoRow(Icons.image, 'Shared Media', '24 items', () => Navigator.pushNamed(context, '/media')),
              _infoRow(Icons.insert_drive_file, 'Shared Files', '8 files', () => Navigator.pushNamed(context, '/files')),
              _infoRow(Icons.link, 'Shared Links', '12 links', null),
            ]),
            const SizedBox(height: 12),
            _infoCard([
              _infoRow(Icons.block, 'Block stevej', null, null, isDestructive: true),
              _infoRow(Icons.flag, 'Report', null, null, isDestructive: true),
            ]),
          ],
        ),
      ),
    );
  }

  Widget _quickAction(BuildContext context, IconData icon, String label, String? route) {
    return InkWell(
      onTap: route != null ? () => Navigator.pushNamed(context, route) : null,
      child: Column(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(color: const Color(0xFF1E293B).withValues(alpha: 0.7), borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.white.withValues(alpha: 0.06))),
            child: Icon(icon, color: AppColors.primary, size: 22),
          ),
          const SizedBox(height: 6),
          Text(label, style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
        ],
      ),
    );
  }

  Widget _infoCard(List<Widget> children) {
    return Container(
      decoration: BoxDecoration(color: const Color(0xFF1E293B).withValues(alpha: 0.7), borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.white.withValues(alpha: 0.06))),
      child: Column(children: children),
    );
  }

  Widget _infoRow(IconData icon, String title, String? value, VoidCallback? onTap, {bool isDestructive = false}) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Row(
          children: [
            Icon(icon, size: 20, color: isDestructive ? AppColors.error : AppColors.textSecondary),
            const SizedBox(width: 14),
            Text(title, style: TextStyle(fontSize: 14, color: isDestructive ? AppColors.error : AppColors.textPrimary)),
            const Spacer(),
            if (value != null) Text(value, style: const TextStyle(color: AppColors.textMuted, fontSize: 13)),
            const SizedBox(width: 4),
            Icon(Icons.chevron_right, size: 18, color: AppColors.textMuted),
          ],
        ),
      ),
    );
  }
}
