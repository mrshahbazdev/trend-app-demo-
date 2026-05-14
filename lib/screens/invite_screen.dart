import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class InviteScreen extends StatelessWidget {
  const InviteScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Invite Friends')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(color: AppColors.primary.withValues(alpha: 0.15), shape: BoxShape.circle),
              child: const Icon(Icons.person_add, size: 36, color: AppColors.primary),
            ),
            const SizedBox(height: 16),
            const Text('Invite to TrendUp', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800)),
            const SizedBox(height: 8),
            const Text('Share your invite link with friends to join the secure network.', textAlign: TextAlign.center, style: TextStyle(color: AppColors.textSecondary)),
            const SizedBox(height: 24),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppColors.border)),
              child: Column(
                children: [
                  const Text('Your Invite Link', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                    decoration: BoxDecoration(color: AppColors.background, borderRadius: BorderRadius.circular(8)),
                    child: Row(
                      children: [
                        const Expanded(child: Text('trendup.app/invite/0x71C4f92', style: TextStyle(color: AppColors.primary, fontSize: 13, fontFamily: 'monospace'))),
                        IconButton(icon: const Icon(Icons.copy, size: 18, color: AppColors.textMuted), onPressed: () {}, constraints: const BoxConstraints(), padding: EdgeInsets.zero),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            SizedBox(width: double.infinity, child: ElevatedButton.icon(onPressed: () {}, icon: const Icon(Icons.share, size: 18), label: const Text('Share Invite Link'))),
            const SizedBox(height: 12),
            SizedBox(width: double.infinity, child: OutlinedButton.icon(onPressed: () {}, icon: const Icon(Icons.qr_code, size: 18), label: const Text('Show QR Code'))),
            const Spacer(),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.lock, size: 12, color: AppColors.success),
                const SizedBox(width: 4),
                const Text('Invites are end-to-end encrypted', style: TextStyle(color: AppColors.success, fontSize: 11)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
