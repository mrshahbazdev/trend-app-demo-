import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';

class GroupsScreen extends StatelessWidget {
  const GroupsScreen({super.key});

  static const _groupGradients = [
    [Color(0xFF6366F1), Color(0xFFA855F7)],
    [Color(0xFFF43F5E), Color(0xFFFB923C)],
    [Color(0xFF10B981), Color(0xFF3B82F6)],
    [Color(0xFFF59E0B), Color(0xFFD946EF)],
    [Color(0xFFDFF352), Color(0xFF10B981)],
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.menu, size: 22),
          onPressed: () => Scaffold.of(context).openDrawer(),
        ),
        title: Row(
          children: [
            Image.asset('assets/images/logo.png', width: 28, height: 28),
            const SizedBox(width: 10),
            const Text('Groups', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
          ],
        ),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(height: 1, color: Colors.white.withValues(alpha: 0.06)),
        ),
        actions: [
          IconButton(icon: Icon(Icons.search, size: 20, color: AppColors.textPrimary.withValues(alpha: 0.5)), onPressed: () => Navigator.pushNamed(context, '/search')),
          IconButton(icon: Icon(Icons.group_add, size: 20, color: AppColors.textPrimary.withValues(alpha: 0.5)), onPressed: () => Navigator.pushNamed(context, '/create-group')),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 16),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Your Groups', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700)),
                  Text('View All (${MockData.groups.length})', style: const TextStyle(color: AppColors.primary, fontSize: 13, fontWeight: FontWeight.w600)),
                ],
              ),
            ),
            const SizedBox(height: 12),
            ...MockData.groups.take(3).toList().asMap().entries.map((e) => _groupTile(context, e.value, e.key)),
            const SizedBox(height: 24),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Container(height: 1, color: Colors.white.withValues(alpha: 0.06)),
            ),
            const SizedBox(height: 20),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Text('Quick Start', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
            ),
            const SizedBox(height: 12),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: [
                  _shapeButton(context, Icons.circle_outlined, 'Circle'),
                  const SizedBox(width: 12),
                  _shapeButton(context, Icons.crop_square, 'Square'),
                  const SizedBox(width: 12),
                  _shapeButton(context, Icons.hexagon_outlined, 'Hex'),
                ],
              ),
            ),
            const SizedBox(height: 24),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Container(height: 1, color: Colors.white.withValues(alpha: 0.06)),
            ),
            const SizedBox(height: 20),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16),
              child: Text('Discover Groups', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
            ),
            const SizedBox(height: 12),
            ...MockData.groups.skip(3).toList().asMap().entries.map((e) => _discoverGroupTile(context, e.value, e.key + 3)),
            const SizedBox(height: 24),
          ],
        ),
      ),
      floatingActionButton: Container(
        decoration: BoxDecoration(
          boxShadow: [BoxShadow(color: AppColors.primary.withValues(alpha: 0.4), blurRadius: 20)],
          shape: BoxShape.circle,
        ),
        child: FloatingActionButton(
          backgroundColor: AppColors.primary,
          onPressed: () => Navigator.pushNamed(context, '/create-group'),
          child: const Icon(Icons.add, color: Colors.white),
        ),
      ),
    );
  }

  Widget _groupTile(BuildContext context, MockGroup group, int index) {
    final colors = _groupGradients[index % _groupGradients.length];
    return InkWell(
      onTap: () => Navigator.pushNamed(context, '/chat'),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        child: Row(
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: colors),
                borderRadius: BorderRadius.circular(24),
              ),
              child: Center(
                child: Text(group.icon, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 18, color: Colors.white)),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(group.name, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15)),
                      const Spacer(),
                      Text(group.time, style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
                    ],
                  ),
                  const SizedBox(height: 2),
                  Row(
                    children: [
                      Text('${group.members} members', style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
                      if (group.burnTimer != null) ...[
                        const Text(' \u2022 ', style: TextStyle(color: AppColors.textMuted, fontSize: 11)),
                        Icon(Icons.timer, size: 10, color: AppColors.primary.withValues(alpha: 0.7)),
                        const SizedBox(width: 2),
                        Text(group.burnTimer!, style: TextStyle(color: AppColors.primary.withValues(alpha: 0.7), fontSize: 11)),
                      ],
                    ],
                  ),
                  const SizedBox(height: 2),
                  Text(group.lastMessage, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(color: AppColors.textSecondary, fontSize: 13)),
                ],
              ),
            ),
            if (group.unreadCount > 0)
              Container(
                margin: const EdgeInsets.only(left: 8),
                width: 8,
                height: 8,
                decoration: const BoxDecoration(color: AppColors.primary, shape: BoxShape.circle),
              ),
          ],
        ),
      ),
    );
  }

  Widget _shapeButton(BuildContext context, IconData icon, String label) {
    return Expanded(
      child: InkWell(
        onTap: () => Navigator.pushNamed(context, '/create-group'),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 16),
          decoration: BoxDecoration(
            color: const Color(0xFF1E293B).withValues(alpha: 0.7),
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
          ),
          child: Column(
            children: [
              Icon(icon, color: AppColors.primary, size: 28),
              const SizedBox(height: 8),
              Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _discoverGroupTile(BuildContext context, MockGroup group, int index) {
    final colors = _groupGradients[index % _groupGradients.length];
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: const Color(0xFF1E293B).withValues(alpha: 0.7),
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
        ),
        child: Row(
          children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: colors),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Center(
                child: Text(group.icon, style: const TextStyle(fontWeight: FontWeight.w700, color: Colors.white)),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(group.name, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                      const SizedBox(width: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                        decoration: BoxDecoration(
                          color: AppColors.accent.withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(4),
                          border: Border.all(color: AppColors.accent.withValues(alpha: 0.2)),
                        ),
                        child: Text(group.members > 1000 ? 'PUBLIC' : 'OFFICIAL', style: const TextStyle(color: AppColors.accent, fontSize: 8, fontWeight: FontWeight.w700)),
                      ),
                    ],
                  ),
                  Text('${_formatMembers(group.members)} members', style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
                ],
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
              decoration: BoxDecoration(
                color: AppColors.primary,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text('JOIN', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w700)),
            ),
          ],
        ),
      ),
    );
  }

  String _formatMembers(int count) {
    if (count >= 1000) return '${(count / 1000).toStringAsFixed(1)}k';
    return '$count';
  }
}
