import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';

class ContactsScreen extends StatelessWidget {
  const ContactsScreen({super.key});

  static const _avatarGradients = [
    [Color(0xFF6366F1), Color(0xFFA855F7)],
    [Color(0xFFF43F5E), Color(0xFFFB923C)],
    [AppColors.success, AppColors.accent],
    [Color(0xFFF59E0B), Color(0xFFD946EF)],
    [Color(0xFFDFF352), AppColors.success],
  ];

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
          icon: const Icon(Icons.menu, size: 22),
          onPressed: () => Scaffold.of(context).openDrawer(),
        ),
        title: const Text('Contacts', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(height: 1, color: Colors.white.withValues(alpha: 0.06)),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.person_add_outlined, size: 20, color: AppColors.textPrimary.withValues(alpha: 0.5)),
            onPressed: () => Navigator.pushNamed(context, '/add-contact'),
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
            child: Container(
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
              ),
              child: TextField(
                decoration: InputDecoration(
                  hintText: 'Search contacts',
                  prefixIcon: Icon(Icons.search, size: 18, color: AppColors.textMuted),
                  border: InputBorder.none,
                  contentPadding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                  hintStyle: TextStyle(fontSize: 13, color: AppColors.textMuted),
                ),
                style: const TextStyle(fontSize: 13),
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
                        ...contacts.asMap().entries.map((e) => _contactTile(context, e.value, e.key)),
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
        color: active ? AppColors.primary.withValues(alpha: 0.1) : Colors.transparent,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: active ? AppColors.primary.withValues(alpha: 0.3) : Colors.white.withValues(alpha: 0.08)),
      ),
      child: Text(label, style: TextStyle(color: active ? AppColors.primary : AppColors.textSecondary, fontSize: 12)),
    );
  }

  Widget _contactTile(BuildContext context, MockUser user, int index) {
    final colors = _avatarGradients[index % _avatarGradients.length];
    return InkWell(
      onTap: () => Navigator.pushNamed(context, '/peer-profile'),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: Row(
          children: [
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: colors,
                ),
                borderRadius: BorderRadius.circular(22),
              ),
              child: Center(
                child: Text(user.avatar, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14, color: Colors.white)),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(user.name, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15)),
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
