import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
        actions: [
          TextButton(onPressed: () {}, child: const Text('Save', style: TextStyle(color: AppColors.primary))),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Stack(
              children: [
                const CircleAvatar(
                  radius: 48,
                  backgroundColor: AppColors.surfaceLight,
                  child: Text('S', style: TextStyle(fontSize: 32, fontWeight: FontWeight.w700)),
                ),
                Positioned(
                  bottom: 0,
                  right: 0,
                  child: Container(
                    padding: const EdgeInsets.all(6),
                    decoration: BoxDecoration(color: AppColors.primary, shape: BoxShape.circle, border: Border.all(color: AppColors.background, width: 2)),
                    child: const Icon(Icons.camera_alt, size: 14, color: Colors.white),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            const Text('shahbaz', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700)),
            const Text('@shahbazdev', style: TextStyle(color: AppColors.textMuted)),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _statItem('12', 'Contacts'),
                const SizedBox(width: 32),
                _statItem('5', 'Groups'),
                const SizedBox(width: 32),
                _statItem('\u2713', 'Verified'),
              ],
            ),
            const SizedBox(height: 24),
            _field('Display Name', MockData.currentUser.name),
            const SizedBox(height: 16),
            _bioField(),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppColors.border)),
              child: Row(
                children: [
                  const Text('Connected Wallet', style: TextStyle(fontSize: 13)),
                  const Spacer(),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(color: AppColors.success.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(4)),
                    child: const Text('Verified', style: TextStyle(color: AppColors.success, fontSize: 10, fontWeight: FontWeight.w600)),
                  ),
                  const SizedBox(width: 8),
                  const Text('0x71C...4f92', style: TextStyle(color: AppColors.textSecondary, fontSize: 13, fontFamily: 'monospace')),
                ],
              ),
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () => Navigator.pushNamed(context, '/qr-share'),
                icon: const Icon(Icons.share, size: 18),
                label: const Text('Share Profile'),
              ),
            ),
            const SizedBox(height: 8),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () => Navigator.pushNamed(context, '/qr-share'),
                icon: const Icon(Icons.qr_code, size: 18),
                label: const Text('My QR Code'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _statItem(String value, String label) {
    return Column(
      children: [
        Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
        Text(label, style: const TextStyle(color: AppColors.textMuted, fontSize: 12)),
      ],
    );
  }

  Widget _field(String label, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
        const SizedBox(height: 6),
        TextField(
          controller: TextEditingController(text: value),
          decoration: const InputDecoration(),
        ),
      ],
    );
  }

  Widget _bioField() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Bio', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
        const SizedBox(height: 6),
        TextField(
          controller: TextEditingController(text: MockData.currentUser.bio),
          maxLines: 3,
          decoration: const InputDecoration(),
        ),
      ],
    );
  }
}

class PeerProfileScreen extends StatelessWidget {
  const PeerProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Profile')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            const CircleAvatar(
              radius: 48,
              backgroundColor: AppColors.surfaceLight,
              child: Text('S', style: TextStyle(fontSize: 32, fontWeight: FontWeight.w700)),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text('stevej', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700)),
                const SizedBox(width: 6),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(color: AppColors.success.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(4)),
                  child: const Text('VERIFIED', style: TextStyle(color: AppColors.success, fontSize: 10, fontWeight: FontWeight.w700)),
                ),
              ],
            ),
            const Text('@stevej', style: TextStyle(color: AppColors.textMuted)),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.lock, size: 12, color: AppColors.success),
                const SizedBox(width: 4),
                const Text('E2EE Active \u2022 Safety number verified', style: TextStyle(color: AppColors.success, fontSize: 11)),
              ],
            ),
            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _actionButton(Icons.chat_bubble_outline, 'Message', () => Navigator.pushNamed(context, '/chat')),
                const SizedBox(width: 16),
                _actionButton(Icons.call_outlined, 'Call', () => Navigator.pushNamed(context, '/call')),
                const SizedBox(width: 16),
                _actionButton(Icons.videocam_outlined, 'Video', () {}),
              ],
            ),
            const SizedBox(height: 24),
            _infoSection('About', [
              _infoRow('Member since', 'Jan 2026'),
              _infoRow('Shared groups', 'Family, Work'),
            ]),
            const SizedBox(height: 16),
            _infoSection('Privacy & Safety', [
              _actionRow(Icons.notifications_off_outlined, 'Mute notifications'),
              _actionRow(Icons.timer, 'Ephemeral timer Off'),
              _actionRow(Icons.block, 'Block user', isDestructive: true),
              _actionRow(Icons.flag_outlined, 'Report', isDestructive: true),
            ]),
          ],
        ),
      ),
    );
  }

  Widget _actionButton(IconData icon, String label, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      child: Column(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppColors.border)),
            child: Icon(icon, color: AppColors.primary),
          ),
          const SizedBox(height: 6),
          Text(label, style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
        ],
      ),
    );
  }

  Widget _infoSection(String title, List<Widget> children) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppColors.border)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14, color: AppColors.textMuted)),
          const SizedBox(height: 12),
          ...children,
        ],
      ),
    );
  }

  Widget _infoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: AppColors.textSecondary, fontSize: 13)),
          Text(value, style: const TextStyle(fontSize: 13)),
        ],
      ),
    );
  }

  Widget _actionRow(IconData icon, String label, {bool isDestructive = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        children: [
          Icon(icon, size: 20, color: isDestructive ? AppColors.error : AppColors.textSecondary),
          const SizedBox(width: 12),
          Text(label, style: TextStyle(color: isDestructive ? AppColors.error : AppColors.textPrimary, fontSize: 14)),
          const Spacer(),
          Icon(Icons.chevron_right, size: 18, color: AppColors.textMuted),
        ],
      ),
    );
  }
}
