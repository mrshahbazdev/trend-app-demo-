import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Notifications'),
        actions: [
          TextButton(onPressed: () {}, child: const Text('Mark all read', style: TextStyle(color: AppColors.primary, fontSize: 13))),
        ],
      ),
      body: ListView.separated(
        itemCount: MockData.notifications.length,
        separatorBuilder: (_, _) => const Divider(height: 1),
        itemBuilder: (context, index) {
          final n = MockData.notifications[index];
          return _notificationTile(n);
        },
      ),
    );
  }

  Widget _notificationTile(MockNotification n) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(color: _iconColor(n.type).withValues(alpha: 0.15), borderRadius: BorderRadius.circular(10)),
            child: Icon(_iconData(n.icon), color: _iconColor(n.type), size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(n.title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                const SizedBox(height: 2),
                Text(n.description, style: const TextStyle(color: AppColors.textSecondary, fontSize: 13)),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Text(n.time, style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
        ],
      ),
    );
  }

  IconData _iconData(String icon) {
    switch (icon) {
      case 'chat': return Icons.chat_bubble_outline;
      case 'group': return Icons.group;
      case 'shield': return Icons.shield_outlined;
      case 'device': return Icons.devices;
      case 'warning': return Icons.warning_amber;
      case 'wallet': return Icons.account_balance_wallet;
      default: return Icons.notifications;
    }
  }

  Color _iconColor(String type) {
    switch (type) {
      case 'message': return AppColors.accent;
      case 'group': return AppColors.success;
      case 'security': return AppColors.warning;
      case 'device': return AppColors.accent;
      case 'warning': return AppColors.error;
      case 'wallet': return AppColors.primary;
      default: return AppColors.textSecondary;
    }
  }
}
