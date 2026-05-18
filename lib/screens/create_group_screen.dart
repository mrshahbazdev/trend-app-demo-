import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';

class CreateGroupScreen extends StatelessWidget {
  const CreateGroupScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Create Group')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Stack(
                children: [
                  CircleAvatar(
                    radius: 40,
                    backgroundColor: AppColors.surface,
                    child: const Icon(Icons.group, size: 36, color: AppColors.textMuted),
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
            ),
            const SizedBox(height: 24),
            const Text('Group Name', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
            const SizedBox(height: 8),
            const TextField(decoration: InputDecoration(hintText: 'Enter group name')),
            const SizedBox(height: 20),
            const Text('Description', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
            const SizedBox(height: 8),
            const TextField(maxLines: 3, decoration: InputDecoration(hintText: 'What is this group about?')),
            const SizedBox(height: 20),
            const Text('Privacy', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
            const SizedBox(height: 8),
            _privacyOption(Icons.lock, 'Private', 'Invite only, E2EE enabled', true),
            const SizedBox(height: 8),
            _privacyOption(Icons.public, 'Public', 'Anyone can join, E2EE enabled', false),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Burn Timer', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(color: AppColors.primary.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(6)),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.timer, size: 14, color: AppColors.primary),
                      const SizedBox(width: 4),
                      const Text('24 hours', style: TextStyle(color: AppColors.primary, fontSize: 12)),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            const Text('Add Members', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
            const SizedBox(height: 8),
            TextField(
              decoration: const InputDecoration(
                hintText: 'Search contacts...',
                prefixIcon: Icon(Icons.search, size: 20, color: AppColors.textMuted),
                contentPadding: EdgeInsets.symmetric(vertical: 10),
              ),
            ),
            const SizedBox(height: 12),
            ...MockData.contacts.take(5).map((c) => _contactRow(c)),
            const SizedBox(height: 24),
            SizedBox(width: double.infinity, child: ElevatedButton(onPressed: () => Navigator.pop(context), child: const Text('Create Group'))),
          ],
        ),
      ),
    );
  }

  Widget _privacyOption(IconData icon, String title, String desc, bool selected) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.surfaceLight.withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: selected ? AppColors.primary : AppColors.border),
      ),
      child: Row(
        children: [
          Icon(icon, color: selected ? AppColors.primary : AppColors.textSecondary, size: 22),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: TextStyle(fontWeight: FontWeight.w600, color: selected ? AppColors.primary : AppColors.textPrimary)),
                Text(desc, style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
              ],
            ),
          ),
          if (selected) const Icon(Icons.check_circle, color: AppColors.primary, size: 20),
        ],
      ),
    );
  }

  Widget _contactRow(MockUser c) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        children: [
          CircleAvatar(radius: 18, backgroundColor: AppColors.surfaceLight, child: Text(c.avatar, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600))),
          const SizedBox(width: 10),
          Text(c.name, style: const TextStyle(fontSize: 14)),
          const Spacer(),
          Checkbox(value: false, onChanged: (_) {}, activeColor: AppColors.primary),
        ],
      ),
    );
  }
}
