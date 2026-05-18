import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class SecureModeScreen extends StatelessWidget {
  const SecureModeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Secure Mode')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(color: AppColors.success.withValues(alpha: 0.15), shape: BoxShape.circle),
              child: const Icon(Icons.shield, size: 40, color: AppColors.success),
            ),
            const SizedBox(height: 16),
            const Text('Secure Mode', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800)),
            Container(
              margin: const EdgeInsets.only(top: 4),
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              decoration: BoxDecoration(color: AppColors.success.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(20)),
              child: const Text('ACTIVE', style: TextStyle(color: AppColors.success, fontSize: 11, fontWeight: FontWeight.w800, letterSpacing: 1)),
            ),
            const SizedBox(height: 8),
            const Text('Enhanced privacy protections are enabled.', style: TextStyle(color: AppColors.textSecondary)),
            const SizedBox(height: 32),
            _featureToggle(Icons.visibility_off, 'Hide Online Status', 'Others cannot see when you are online', true),
            _featureToggle(Icons.notifications_off, 'Silent Notifications', 'Notifications with no preview content', true),
            _featureToggle(Icons.screenshot, 'Screenshot Protection', 'Block screenshots in the app', false),
            _featureToggle(Icons.timer, 'Auto-Lock', 'Lock app after 1 minute of inactivity', true),
            _featureToggle(Icons.delete_forever, 'Burn on Exit', 'Delete messages when session ends', false),
            _featureToggle(Icons.vpn_lock, 'Force Relay', 'Route all traffic through secure relays', true),
            const SizedBox(height: 24),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(color: AppColors.warning.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(8)),
              child: Row(
                children: [
                  const Icon(Icons.info_outline, color: AppColors.warning, size: 16),
                  const SizedBox(width: 8),
                  const Expanded(child: Text('Secure Mode may limit some features for maximum privacy.', style: TextStyle(color: AppColors.warning, fontSize: 11))),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _featureToggle(IconData icon, String title, String desc, bool enabled) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(color: AppColors.surfaceLight.withValues(alpha: 0.7), borderRadius: BorderRadius.circular(10)),
            child: Icon(icon, color: enabled ? AppColors.success : AppColors.textMuted, size: 20),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                Text(desc, style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
              ],
            ),
          ),
          SizedBox(
            height: 24,
            child: Switch(value: enabled, onChanged: (_) {}, activeTrackColor: AppColors.success),
          ),
        ],
      ),
    );
  }
}
