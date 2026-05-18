import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class DevicesScreen extends StatelessWidget {
  const DevicesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Linked Devices')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Current Device', style: TextStyle(color: AppColors.textMuted, fontSize: 12, fontWeight: FontWeight.w600, letterSpacing: 0.5)),
            const SizedBox(height: 12),
            _deviceCard('iPhone 15 Pro', 'iOS 18.1 \u2022 TrendUp v4.2.1', 'London, UK', true, 'Active now'),
            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Linked Devices', style: TextStyle(color: AppColors.textMuted, fontSize: 12, fontWeight: FontWeight.w600, letterSpacing: 0.5)),
                Text('2 of 5', style: const TextStyle(color: AppColors.textMuted, fontSize: 12)),
              ],
            ),
            const SizedBox(height: 12),
            _deviceCard('MacBook Pro', 'macOS 15.0 \u2022 Chrome', 'London, UK', false, 'Last active: 2h ago'),
            const SizedBox(height: 12),
            _deviceCard('iPad Air', 'iPadOS 18.0 \u2022 Safari', 'London, UK', false, 'Last active: Yesterday'),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.add, size: 18),
                label: const Text('Link New Device'),
              ),
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.warning.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  const Icon(Icons.info_outline, color: AppColors.warning, size: 16),
                  const SizedBox(width: 8),
                  const Expanded(
                    child: Text(
                      'Each device generates unique encryption keys. Removing a device will permanently revoke its access.',
                      style: TextStyle(color: AppColors.warning, fontSize: 11),
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

  Widget _deviceCard(String name, String info, String location, bool isCurrent, String status) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surfaceLight.withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: isCurrent ? AppColors.success.withValues(alpha: 0.3) : AppColors.border),
      ),
      child: Row(
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(color: AppColors.surfaceLight, borderRadius: BorderRadius.circular(10)),
            child: Icon(
              name.contains('Mac') ? Icons.laptop_mac : (name.contains('iPad') ? Icons.tablet_mac : Icons.phone_iphone),
              color: AppColors.textSecondary,
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(name, style: const TextStyle(fontWeight: FontWeight.w600)),
                    if (isCurrent) ...[
                      const SizedBox(width: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                        decoration: BoxDecoration(color: AppColors.success.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(4)),
                        child: const Text('Current', style: TextStyle(color: AppColors.success, fontSize: 9, fontWeight: FontWeight.w600)),
                      ),
                    ],
                  ],
                ),
                Text(info, style: const TextStyle(color: AppColors.textMuted, fontSize: 12)),
                Text('$location \u2022 $status', style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
              ],
            ),
          ),
          if (!isCurrent)
            IconButton(
              icon: const Icon(Icons.link_off, color: AppColors.error, size: 20),
              onPressed: () {},
            ),
        ],
      ),
    );
  }
}
