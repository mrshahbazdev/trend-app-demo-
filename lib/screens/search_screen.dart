import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class SearchScreen extends StatelessWidget {
  const SearchScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: TextField(
          autofocus: true,
          decoration: const InputDecoration(
            hintText: 'Search messages, contacts, groups...',
            border: InputBorder.none,
            enabledBorder: InputBorder.none,
            focusedBorder: InputBorder.none,
            hintStyle: TextStyle(color: AppColors.textMuted, fontSize: 15),
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel', style: TextStyle(color: AppColors.primary))),
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Row(
              children: [
                _filterChip('All', true),
                const SizedBox(width: 8),
                _filterChip('Messages', false),
                const SizedBox(width: 8),
                _filterChip('Contacts', false),
                const SizedBox(width: 8),
                _filterChip('Groups', false),
                const SizedBox(width: 8),
                _filterChip('Files', false),
              ],
            ),
          ),
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Text('RECENT SEARCHES', style: TextStyle(color: AppColors.textMuted, fontSize: 11, fontWeight: FontWeight.w600, letterSpacing: 1)),
          ),
          _recentItem(Icons.schedule, 'stevej protocol updates'),
          _recentItem(Icons.schedule, 'wallet address 0x4a'),
          _recentItem(Icons.schedule, 'Alpha Core Node'),
          const Divider(height: 24),
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Text('SUGGESTED', style: TextStyle(color: AppColors.textMuted, fontSize: 11, fontWeight: FontWeight.w600, letterSpacing: 1)),
          ),
          _suggestedItem(Icons.lock, 'Encrypted files'),
          _suggestedItem(Icons.timer, 'Burn-after-read messages'),
          _suggestedItem(Icons.group, 'Active groups'),
        ],
      ),
    );
  }

  Widget _filterChip(String label, bool active) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
      decoration: BoxDecoration(
        color: active ? AppColors.primary.withValues(alpha: 0.15) : AppColors.surface,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: active ? AppColors.primary.withValues(alpha: 0.3) : AppColors.border),
      ),
      child: Text(label, style: TextStyle(color: active ? AppColors.primary : AppColors.textSecondary, fontSize: 12)),
    );
  }

  Widget _recentItem(IconData icon, String text) {
    return ListTile(
      leading: Icon(icon, color: AppColors.textMuted, size: 20),
      title: Text(text, style: const TextStyle(fontSize: 14)),
      trailing: const Icon(Icons.north_west, size: 16, color: AppColors.textMuted),
      dense: true,
    );
  }

  Widget _suggestedItem(IconData icon, String text) {
    return ListTile(
      leading: Icon(icon, color: AppColors.primary, size: 20),
      title: Text(text, style: const TextStyle(fontSize: 14)),
      trailing: const Icon(Icons.chevron_right, size: 18, color: AppColors.textMuted),
      dense: true,
    );
  }
}
