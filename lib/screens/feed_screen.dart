import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';

class FeedScreen extends StatelessWidget {
  const FeedScreen({super.key});

  static const _avatarGradients = [
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
        title: const Text('Feed', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(height: 1, color: Colors.white.withValues(alpha: 0.06)),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.edit_square, size: 20, color: AppColors.textPrimary.withValues(alpha: 0.5)),
            onPressed: () => Navigator.pushNamed(context, '/compose'),
          ),
        ],
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: MockData.feedPosts.length,
        itemBuilder: (context, index) => _postCard(MockData.feedPosts[index], index),
      ),
    );
  }

  Widget _postCard(MockPost post, int index) {
    final colors = _avatarGradients[index % _avatarGradients.length];
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B).withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: colors),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Center(
                  child: Text(post.user.avatar, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 12, color: Colors.white)),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(post.user.name, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                        if (post.user.isVerified) ...[
                          const SizedBox(width: 4),
                          const Icon(Icons.verified, size: 14, color: AppColors.accent),
                        ],
                      ],
                    ),
                    Row(
                      children: [
                        Text(post.user.handle, style: const TextStyle(color: AppColors.textMuted, fontSize: 12)),
                        const SizedBox(width: 8),
                        Text('\u2022  ${post.time}', style: const TextStyle(color: AppColors.textMuted, fontSize: 12)),
                      ],
                    ),
                  ],
                ),
              ),
              Icon(Icons.more_horiz, color: AppColors.textMuted, size: 20),
            ],
          ),
          const SizedBox(height: 12),
          Text(post.content, style: const TextStyle(fontSize: 14, height: 1.5)),
          if (post.burnTimer != null) ...[
            const SizedBox(height: 8),
            Row(
              children: [
                Icon(Icons.timer, size: 12, color: AppColors.primary.withValues(alpha: 0.7)),
                const SizedBox(width: 4),
                Text('Burn timer: ${post.burnTimer}', style: TextStyle(color: AppColors.primary.withValues(alpha: 0.7), fontSize: 11)),
              ],
            ),
          ],
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.only(top: 12),
            decoration: BoxDecoration(border: Border(top: BorderSide(color: Colors.white.withValues(alpha: 0.04)))),
            child: Row(
              children: [
                _actionButton(Icons.favorite_border, _formatCount(post.likes)),
                const SizedBox(width: 24),
                _actionButton(Icons.chat_bubble_outline, _formatCount(post.comments)),
                const SizedBox(width: 24),
                _actionButton(Icons.repeat, _formatCount(post.reposts)),
                const Spacer(),
                Icon(Icons.bookmark_border, size: 18, color: AppColors.textMuted),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _actionButton(IconData icon, String count) {
    return Row(
      children: [
        Icon(icon, size: 18, color: AppColors.textMuted),
        const SizedBox(width: 4),
        Text(count, style: const TextStyle(color: AppColors.textMuted, fontSize: 12)),
      ],
    );
  }

  String _formatCount(int count) {
    if (count >= 1000) return '${(count / 1000).toStringAsFixed(1)}k';
    return '$count';
  }
}

class ComposeScreen extends StatelessWidget {
  const ComposeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Compose', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(height: 1, color: Colors.white.withValues(alpha: 0.06)),
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 8),
            child: Container(
              decoration: BoxDecoration(
                color: AppColors.primary,
                borderRadius: BorderRadius.circular(8),
              ),
              child: TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('Post', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w700)),
              ),
            ),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(colors: [Color(0xFFDC2626), Color(0xFF991B1B)]),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: const Center(
                    child: Text('S', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 16)),
                  ),
                ),
                const SizedBox(width: 12),
                const Expanded(
                  child: TextField(
                    maxLines: null,
                    decoration: InputDecoration(
                      hintText: "What's happening?",
                      border: InputBorder.none,
                      enabledBorder: InputBorder.none,
                      focusedBorder: InputBorder.none,
                      hintStyle: TextStyle(color: AppColors.textMuted, fontSize: 16),
                    ),
                    autofocus: true,
                  ),
                ),
              ],
            ),
            const Spacer(),
            Container(
              padding: const EdgeInsets.symmetric(vertical: 12),
              decoration: BoxDecoration(border: Border(top: BorderSide(color: Colors.white.withValues(alpha: 0.06)))),
              child: Row(
                children: [
                  IconButton(icon: Icon(Icons.image, color: AppColors.primary, size: 22), onPressed: () {}),
                  IconButton(icon: Icon(Icons.attach_file, color: AppColors.primary, size: 22), onPressed: () {}),
                  IconButton(icon: Icon(Icons.poll, color: AppColors.primary, size: 22), onPressed: () {}),
                  IconButton(icon: Icon(Icons.timer, color: AppColors.primary, size: 22), onPressed: () {}),
                  const Spacer(),
                  Row(
                    children: [
                      Icon(Icons.lock, size: 12, color: AppColors.success),
                      const SizedBox(width: 4),
                      const Text('E2EE', style: TextStyle(color: AppColors.success, fontSize: 11)),
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
