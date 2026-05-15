import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class BlockedUsersScreen extends StatelessWidget {
  const BlockedUsersScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Blocked Users')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(color: const Color(0xFF1E293B).withValues(alpha: 0.7), borderRadius: BorderRadius.circular(8)),
              child: const Text(
                'Blocked users cannot send you messages, see your online status, or invite you to groups.',
                style: TextStyle(color: AppColors.textSecondary, fontSize: 13),
              ),
            ),
          ),
          _blockedUser('spam_bot_42', '@spam_bot_42', 'Blocked Oct 20'),
          _blockedUser('unknown_peer', '@unknown_0x7a', 'Blocked Oct 18'),
          const Padding(
            padding: EdgeInsets.all(32),
            child: Column(
              children: [
                Icon(Icons.block, size: 48, color: AppColors.surfaceLight),
                SizedBox(height: 12),
                Text('2 blocked users', style: TextStyle(color: AppColors.textMuted, fontSize: 13)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _blockedUser(String name, String handle, String date) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          CircleAvatar(radius: 20, backgroundColor: AppColors.surfaceLight, child: Text(name[0].toUpperCase(), style: const TextStyle(fontWeight: FontWeight.w600))),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(name, style: const TextStyle(fontWeight: FontWeight.w500)),
                Text('$handle \u2022 $date', style: const TextStyle(color: AppColors.textMuted, fontSize: 12)),
              ],
            ),
          ),
          OutlinedButton(
            onPressed: () {},
            style: OutlinedButton.styleFrom(
              side: const BorderSide(color: AppColors.error),
              foregroundColor: AppColors.error,
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
              minimumSize: Size.zero,
            ),
            child: const Text('Unblock', style: TextStyle(fontSize: 12)),
          ),
        ],
      ),
    );
  }
}
