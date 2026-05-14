import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';

class ContactsScreen extends StatelessWidget {
  const ContactsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final grouped = <String, List<MockUser>>{};
    for (final c in MockData.contacts) {
      final letter = c.name[0].toUpperCase();
      grouped.putIfAbsent(letter, () => []).add(c);
    }
    final sortedKeys = grouped.keys.toList()..sort();

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.menu),
          onPressed: () => Scaffold.of(context).openDrawer(),
        ),
        title: const Text('Contacts', style: TextStyle(fontWeight: FontWeight.w700)),
        actions: [
          IconButton(icon: const Icon(Icons.person_add_outlined), onPressed: () => Navigator.pushNamed(context, '/add-contact')),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: TextField(
              decoration: const InputDecoration(
                hintText: 'Search contacts',
                prefixIcon: Icon(Icons.search, size: 20, color: AppColors.textMuted),
                contentPadding: EdgeInsets.symmetric(vertical: 10),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                _filterChip('Favorites', false),
                const SizedBox(width: 8),
                _filterChip('Recent', false),
                const SizedBox(width: 8),
                _filterChip('Verified', false),
              ],
            ),
          ),
          const SizedBox(height: 8),
          Expanded(
            child: Stack(
              children: [
                ListView.builder(
                  itemCount: sortedKeys.length,
                  itemBuilder: (context, index) {
                    final letter = sortedKeys[index];
                    final contacts = grouped[letter]!;
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                          child: Text(letter, style: const TextStyle(color: AppColors.primary, fontWeight: FontWeight.w700, fontSize: 14)),
                        ),
                        ...contacts.map((c) => _contactTile(context, c)),
                      ],
                    );
                  },
                ),
                Positioned(
                  right: 4,
                  top: 0,
                  bottom: 0,
                  child: Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((l) =>
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 1),
                          child: Text(l, style: const TextStyle(color: AppColors.textMuted, fontSize: 9, fontWeight: FontWeight.w500)),
                        ),
                      ).toList(),
                    ),
                  ),
                ),
              ],
            ),
          ),
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

  Widget _contactTile(BuildContext context, MockUser user) {
    return InkWell(
      onTap: () => Navigator.pushNamed(context, '/peer-profile'),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: Row(
          children: [
            CircleAvatar(
              radius: 22,
              backgroundColor: AppColors.surfaceLight,
              child: Text(user.avatar, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 12)),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(user.name, style: const TextStyle(fontWeight: FontWeight.w500, fontSize: 15)),
                      if (user.isVerified) ...[
                        const SizedBox(width: 4),
                        const Icon(Icons.verified, size: 14, color: AppColors.accent),
                      ],
                    ],
                  ),
                  Text(user.handle, style: const TextStyle(color: AppColors.textMuted, fontSize: 12)),
                ],
              ),
            ),
            if (user.isOnline)
              Container(
                width: 8,
                height: 8,
                decoration: const BoxDecoration(color: AppColors.success, shape: BoxShape.circle),
              ),
          ],
        ),
      ),
    );
  }
}
