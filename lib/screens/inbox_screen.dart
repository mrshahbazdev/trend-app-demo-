import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';

class InboxScreen extends StatelessWidget {
  const InboxScreen({super.key});

  static const _avatarGradients = [
    [Color(0xFF6366F1), Color(0xFFA855F7)],
    [Color(0xFFF43F5E), Color(0xFFFB923C)],
    [AppColors.success, AppColors.accent],
    [Color(0xFFF59E0B), Color(0xFFD946EF)],
    [Color(0xFFDFF352), AppColors.success],
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
            const Text('TrendUp', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
          ],
        ),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(height: 1, color: Colors.white.withValues(alpha: 0.06)),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.notifications_outlined, size: 20, color: AppColors.textPrimary.withValues(alpha: 0.5)),
            onPressed: () => Navigator.pushNamed(context, '/notifications'),
          ),
          IconButton(
            icon: Icon(Icons.search, size: 20, color: AppColors.textPrimary.withValues(alpha: 0.5)),
            onPressed: () => Navigator.pushNamed(context, '/search'),
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
                  hintText: 'Search name, @handle, or wallet',
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
                _tabChip('Inbox', true),
                const SizedBox(width: 8),
                _tabChip('Groups', false),
                const SizedBox(width: 8),
                _tabChip('Requests', false),
                const Spacer(),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppColors.primary,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.edit, size: 12, color: Colors.white),
                      SizedBox(width: 4),
                      Text('NEW', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w700)),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),
          Expanded(
            child: ListView.builder(
              itemCount: MockData.conversations.length,
              itemBuilder: (context, index) {
                final conv = MockData.conversations[index];
                final isFirst = index == 0;
                return _conversationTile(context, conv, index, isFirst);
              },
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(vertical: 10),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.lock, size: 10, color: AppColors.success.withValues(alpha: 0.5)),
                const SizedBox(width: 4),
                Text(
                  'End-to-End Encrypted Conversations',
                  style: TextStyle(color: AppColors.success.withValues(alpha: 0.5), fontSize: 10),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _tabChip(String label, bool active) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
      decoration: BoxDecoration(
        color: active ? AppColors.primary.withValues(alpha: 0.1) : Colors.transparent,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: active ? AppColors.primary.withValues(alpha: 0.3) : Colors.white.withValues(alpha: 0.08),
        ),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: active ? AppColors.primary : AppColors.textSecondary,
          fontSize: 12,
          fontWeight: active ? FontWeight.w600 : FontWeight.w400,
        ),
      ),
    );
  }

  Widget _conversationTile(BuildContext context, MockConversation conv, int index, bool isActive) {
    final colors = _avatarGradients[index % _avatarGradients.length];
    return InkWell(
      onTap: () => Navigator.pushNamed(context, '/chat'),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          color: isActive ? AppColors.primary.withValues(alpha: 0.08) : Colors.transparent,
          border: isActive
              ? const Border(left: BorderSide(color: AppColors.primary, width: 3))
              : null,
        ),
        child: Row(
          children: [
            Stack(
              children: [
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: colors,
                    ),
                    borderRadius: BorderRadius.circular(24),
                  ),
                  child: Center(
                    child: Text(
                      conv.user.avatar,
                      style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16, color: Colors.white),
                    ),
                  ),
                ),
                if (conv.user.isOnline)
                  Positioned(
                    bottom: 1,
                    right: 1,
                    child: Container(
                      width: 12,
                      height: 12,
                      decoration: BoxDecoration(
                        color: AppColors.success,
                        shape: BoxShape.circle,
                        border: Border.all(color: AppColors.background, width: 2),
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(conv.user.name,
                          style: TextStyle(
                            fontWeight: conv.unreadCount > 0 ? FontWeight.w700 : FontWeight.w600,
                            fontSize: 15,
                          )),
                      if (conv.user.isVerified) ...[
                        const SizedBox(width: 4),
                        const Icon(Icons.verified, size: 14, color: AppColors.accent),
                      ],
                      const Spacer(),
                      Text(conv.time, style: TextStyle(color: AppColors.textMuted, fontSize: 11)),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          conv.lastMessage,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            color: conv.unreadCount > 0 ? AppColors.textSecondary : AppColors.textMuted,
                            fontSize: 13,
                          ),
                        ),
                      ),
                      if (conv.unreadCount > 0)
                        Container(
                          margin: const EdgeInsets.only(left: 8),
                          width: 8,
                          height: 8,
                          decoration: const BoxDecoration(
                            color: AppColors.primary,
                            shape: BoxShape.circle,
                          ),
                        ),
                      if (conv.burnTimer != null)
                        Padding(
                          padding: const EdgeInsets.only(left: 6),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(Icons.timer, size: 10, color: AppColors.primary.withValues(alpha: 0.7)),
                              const SizedBox(width: 2),
                              Text(conv.burnTimer!, style: TextStyle(color: AppColors.primary.withValues(alpha: 0.7), fontSize: 10)),
                            ],
                          ),
                        ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
