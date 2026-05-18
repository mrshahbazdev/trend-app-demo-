import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class PinnedMessagesScreen extends StatelessWidget {
  const PinnedMessagesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Pinned Messages')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _pinnedMessage('stevej', 'The new protocol spec is finalized. Review before Monday.', 'Oct 24, 10:30 AM'),
          _pinnedMessage('alex', 'Meeting link: secure-room.trendup.app/42f91e', 'Oct 23, 2:15 PM'),
          _pinnedMessage('sarah', 'Important: Update your safety numbers after the key rotation.', 'Oct 22, 9:00 AM'),
        ],
      ),
    );
  }

  Widget _pinnedMessage(String sender, String content, String time) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.surfaceLight.withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.push_pin, size: 14, color: AppColors.primary),
              const SizedBox(width: 6),
              Text(sender, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
              const Spacer(),
              Text(time, style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
            ],
          ),
          const SizedBox(height: 8),
          Text(content, style: const TextStyle(color: AppColors.textSecondary, fontSize: 13, height: 1.4)),
        ],
      ),
    );
  }
}
