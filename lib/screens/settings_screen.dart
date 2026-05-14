import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Row(
          children: [
            const Icon(Icons.shield, color: AppColors.primary, size: 22),
            const SizedBox(width: 8),
            const Text('TrendUp', style: TextStyle(fontWeight: FontWeight.w700)),
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 8),
            Center(
              child: Column(
                children: [
                  const CircleAvatar(
                    radius: 36,
                    backgroundColor: AppColors.primary,
                    child: Text('S', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.w700)),
                  ),
                  const SizedBox(height: 12),
                  const Text('Settings', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800)),
                ],
              ),
            ),
            const SizedBox(height: 24),
            _sectionHeader('Privacy & Security'),
            _settingsTile(context, Icons.shield_outlined, 'Secure Mode', trailing: _statusBadge('Active', AppColors.success)),
            _settingsTile(context, Icons.lock_outline, 'E2EE Status', trailing: _statusBadge('Active', AppColors.success)),
            _settingsTile(context, Icons.timer_outlined, 'Auto-lock timer', trailing: const Text('15m', style: TextStyle(color: AppColors.textSecondary, fontSize: 13))),
            _sectionHeader('Notifications'),
            _settingsTile(context, Icons.volume_up_outlined, 'Notification Sounds', hasSwitch: true, switchValue: true),
            _settingsTile(context, Icons.notifications_off_outlined, 'Mute All', hasSwitch: true, switchValue: false),
            _settingsTile(context, Icons.visibility_outlined, 'Show Preview', hasSwitch: true, switchValue: true),
            _sectionHeader('Devices'),
            _deviceTile('iPhone 15 Pro', 'Current Session \u2022 London, UK', true),
            const SizedBox(height: 8),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: OutlinedButton.icon(
                onPressed: () => Navigator.pushNamed(context, '/devices'),
                icon: const Icon(Icons.add, size: 18),
                label: const Text('Approve new device'),
                style: OutlinedButton.styleFrom(minimumSize: const Size(double.infinity, 44)),
              ),
            ),
            _sectionHeader('Account'),
            InkWell(
              onTap: () => Navigator.pushNamed(context, '/profile'),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                child: Row(
                  children: [
                    const CircleAvatar(
                      radius: 20,
                      backgroundColor: AppColors.surfaceLight,
                      child: Text('S', style: TextStyle(fontWeight: FontWeight.w600)),
                    ),
                    const SizedBox(width: 12),
                    const Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('shahbaz', style: TextStyle(fontWeight: FontWeight.w600)),
                        Text('@shahbazdev', style: TextStyle(color: AppColors.textMuted, fontSize: 12)),
                      ],
                    ),
                    const Spacer(),
                    const Icon(Icons.chevron_right, color: AppColors.textMuted),
                  ],
                ),
              ),
            ),
            _settingsTile(context, Icons.key, 'Change Password'),
            _settingsTile(context, Icons.security, '2FA Setup', onTap: () => Navigator.pushNamed(context, '/2fa')),
            _settingsTile(context, Icons.wallet, 'Wallet', onTap: () => Navigator.pushNamed(context, '/wallet')),
            _settingsTile(context, Icons.block, 'Blocked Users', onTap: () => Navigator.pushNamed(context, '/blocked')),
            _settingsTile(context, Icons.notifications_outlined, 'Notifications', onTap: () => Navigator.pushNamed(context, '/notifications')),
            _settingsTile(context, Icons.info_outline, 'About TrendUp'),
            const SizedBox(height: 16),
            Center(
              child: TextButton(
                onPressed: () => Navigator.pushNamedAndRemoveUntil(context, '/landing', (r) => false),
                child: const Text('Sign Out', style: TextStyle(color: AppColors.error)),
              ),
            ),
            const SizedBox(height: 8),
            Center(
              child: Column(
                children: [
                  const Text('TrendUp Secure v4.2.1-stable', style: TextStyle(color: AppColors.textMuted, fontSize: 11)),
                  const SizedBox(height: 2),
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.lock, size: 10, color: AppColors.success.withValues(alpha: 0.6)),
                      const SizedBox(width: 4),
                      Text('End-to-End Encryption Verified', style: TextStyle(color: AppColors.success.withValues(alpha: 0.6), fontSize: 10)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _sectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 24, 16, 8),
      child: Text(title, style: const TextStyle(color: AppColors.textMuted, fontSize: 12, fontWeight: FontWeight.w600, letterSpacing: 0.5)),
    );
  }

  Widget _settingsTile(BuildContext context, IconData icon, String title, {Widget? trailing, bool hasSwitch = false, bool switchValue = false, VoidCallback? onTap}) {
    return InkWell(
      onTap: onTap ?? () {},
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Row(
          children: [
            Icon(icon, color: AppColors.textSecondary, size: 22),
            const SizedBox(width: 14),
            Expanded(child: Text(title, style: const TextStyle(fontSize: 15))),
            ?trailing,
            if (hasSwitch)
              SizedBox(
                height: 24,
                child: Switch(value: switchValue, onChanged: (_) {}, activeTrackColor: AppColors.primary),
              ),
            if (!hasSwitch && trailing == null)
              const Icon(Icons.chevron_right, color: AppColors.textMuted, size: 20),
          ],
        ),
      ),
    );
  }

  Widget _statusBadge(String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(4),
      ),
      child: Text(text, style: TextStyle(color: color, fontSize: 11, fontWeight: FontWeight.w600)),
    );
  }

  Widget _deviceTile(String name, String info, bool isCurrent) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(10)),
            child: const Icon(Icons.phone_iphone, color: AppColors.textSecondary, size: 22),
          ),
          const SizedBox(width: 12),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(name, style: const TextStyle(fontWeight: FontWeight.w500)),
              Text(info, style: const TextStyle(color: AppColors.textMuted, fontSize: 12)),
            ],
          ),
          const Spacer(),
          if (isCurrent) _statusBadge('Current', AppColors.success),
        ],
      ),
    );
  }
}
