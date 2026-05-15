import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(height: 1, color: Colors.white.withValues(alpha: 0.06)),
        ),
        actions: [
          TextButton(
            onPressed: () {},
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: AppColors.primary,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text('Save', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w700)),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            const SizedBox(height: 8),
            Stack(
              children: [
                Container(
                  width: 96,
                  height: 96,
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: [Color(0xFFDC2626), Color(0xFF991B1B)],
                    ),
                    borderRadius: BorderRadius.circular(48),
                  ),
                  child: const Center(
                    child: Text('S', style: TextStyle(fontSize: 36, fontWeight: FontWeight.w700, color: Colors.white)),
                  ),
                ),
                Positioned(
                  bottom: 2,
                  right: 2,
                  child: Container(
                    width: 32,
                    height: 32,
                    decoration: BoxDecoration(
                      color: AppColors.primary,
                      shape: BoxShape.circle,
                      border: Border.all(color: AppColors.background, width: 2),
                    ),
                    child: const Icon(Icons.camera_alt, size: 14, color: Colors.white),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text('shahbaz', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800)),
                const SizedBox(width: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(colors: [Color(0xFFDC2626), Color(0xFF991B1B)]),
                    borderRadius: BorderRadius.circular(99),
                  ),
                  child: const Text('VERIFIED', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w800, letterSpacing: 0.5)),
                ),
              ],
            ),
            const Text('@shahbazdev', style: TextStyle(color: AppColors.textMuted, fontSize: 14)),
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
            _glassCard(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Display Name', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 12, color: AppColors.textMuted)),
                    const SizedBox(height: 8),
                    _inputField(MockData.currentUser.name),
                    const SizedBox(height: 16),
                    const Text('Bio', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 12, color: AppColors.textMuted)),
                    const SizedBox(height: 8),
                    _inputField(MockData.currentUser.bio ?? '', maxLines: 3),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            _glassCard(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: [
                    Icon(Icons.account_balance_wallet, size: 18, color: AppColors.textSecondary),
                    const SizedBox(width: 10),
                    const Text('Connected Wallet', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500)),
                    const Spacer(),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                      decoration: BoxDecoration(
                        color: const Color(0xFF181818),
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: const Color(0xFFDFF352).withValues(alpha: 0.2)),
                      ),
                      child: Text('0x71C...4f92', style: TextStyle(color: const Color(0xFFDFF352), fontSize: 12, fontFamily: 'monospace')),
                    ),
                  ],
                ),
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

  static Widget _glassCard({required Widget child}) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B).withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
      ),
      child: child,
    );
  }

  Widget _inputField(String value, {int maxLines = 1}) {
    return TextField(
      controller: TextEditingController(text: value),
      maxLines: maxLines,
      style: const TextStyle(fontSize: 14),
      decoration: InputDecoration(
        filled: true,
        fillColor: AppColors.surface,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: Colors.white.withValues(alpha: 0.1)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: Colors.white.withValues(alpha: 0.1)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.primary),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      ),
    );
  }
}

class PeerProfileScreen extends StatelessWidget {
  const PeerProfileScreen({super.key});

  static const _avatarGradient = [Color(0xFF6366F1), Color(0xFFA855F7)];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(height: 1, color: Colors.white.withValues(alpha: 0.06)),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            const SizedBox(height: 8),
            Container(
              width: 96,
              height: 96,
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: _avatarGradient,
                ),
                borderRadius: BorderRadius.circular(48),
              ),
              child: const Center(
                child: Text('S', style: TextStyle(fontSize: 36, fontWeight: FontWeight.w700, color: Colors.white)),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text('stevej', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800)),
                const SizedBox(width: 6),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: AppColors.success.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(color: AppColors.success.withValues(alpha: 0.2)),
                  ),
                  child: const Text('VERIFIED', style: TextStyle(color: AppColors.success, fontSize: 10, fontWeight: FontWeight.w700)),
                ),
              ],
            ),
            const Text('@stevej', style: TextStyle(color: AppColors.textMuted, fontSize: 14)),
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
                _actionBtn(context, Icons.chat_bubble_outline, 'Message', () => Navigator.pushNamed(context, '/chat')),
                const SizedBox(width: 16),
                _actionBtn(context, Icons.call_outlined, 'Call', () => Navigator.pushNamed(context, '/call')),
                const SizedBox(width: 16),
                _actionBtn(context, Icons.videocam_outlined, 'Video', () {}),
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

  Widget _actionBtn(BuildContext context, IconData icon, String label, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      child: Column(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: const Color(0xFF1E293B).withValues(alpha: 0.7),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
            ),
            child: Icon(icon, color: AppColors.primary, size: 22),
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
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B).withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13, color: AppColors.textMuted)),
          const SizedBox(height: 12),
          ...children,
        ],
      ),
    );
  }

  Widget _infoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: AppColors.textSecondary, fontSize: 13)),
          Text(value, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }

  Widget _actionRow(IconData icon, String label, {bool isDestructive = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: (isDestructive ? AppColors.error : AppColors.background).withValues(alpha: 0.3),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, size: 16, color: isDestructive ? AppColors.error : AppColors.textSecondary),
          ),
          const SizedBox(width: 10),
          Text(label, style: TextStyle(color: isDestructive ? AppColors.error : AppColors.textPrimary, fontSize: 14)),
          const Spacer(),
          Icon(Icons.chevron_right, size: 18, color: AppColors.textMuted),
        ],
      ),
    );
  }
}
