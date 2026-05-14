import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';

class FeedScreen extends StatelessWidget {
  const FeedScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Feed', style: TextStyle(fontWeight: FontWeight.w700)),
        actions: [
          IconButton(icon: const Icon(Icons.edit_square), onPressed: () => Navigator.pushNamed(context, '/compose')),
        ],
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: MockData.feedPosts.length,
        separatorBuilder: (_, _) => const Divider(height: 24),
        itemBuilder: (context, index) => _postCard(MockData.feedPosts[index]),
      ),
    );
  }

  Widget _postCard(MockPost post) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            CircleAvatar(
              radius: 20,
              backgroundColor: AppColors.surfaceLight,
              child: Text(post.user.avatar, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 11)),
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
            const Icon(Icons.more_horiz, color: AppColors.textMuted, size: 20),
          ],
        ),
        const SizedBox(height: 12),
        Text(post.content, style: const TextStyle(fontSize: 14, height: 1.5)),
        if (post.burnTimer != null) ...[
          const SizedBox(height: 8),
          Row(
            children: [
              Icon(Icons.timer, size: 12, color: AppColors.primary),
              const SizedBox(width: 4),
              Text('Burn timer: ${post.burnTimer}', style: const TextStyle(color: AppColors.primary, fontSize: 11)),
            ],
          ),
        ],
        const SizedBox(height: 12),
        Row(
          children: [
            _actionButton(Icons.favorite_border, _formatCount(post.likes)),
            const SizedBox(width: 24),
            _actionButton(Icons.chat_bubble_outline, _formatCount(post.comments)),
            const SizedBox(width: 24),
            _actionButton(Icons.repeat, _formatCount(post.reposts)),
            const Spacer(),
            const Icon(Icons.bookmark_border, size: 18, color: AppColors.textMuted),
          ],
        ),
      ],
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
        title: const Text('Compose'),
        actions: [
          ElevatedButton(
            onPressed: () => Navigator.pop(context),
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
              minimumSize: Size.zero,
            ),
            child: const Text('Post'),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const CircleAvatar(
                  radius: 20,
                  backgroundColor: AppColors.primary,
                  child: Text('S', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700)),
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
              decoration: const BoxDecoration(border: Border(top: BorderSide(color: AppColors.border))),
              child: Row(
                children: [
                  IconButton(icon: const Icon(Icons.image, color: AppColors.primary, size: 22), onPressed: () {}),
                  IconButton(icon: const Icon(Icons.attach_file, color: AppColors.primary, size: 22), onPressed: () {}),
                  IconButton(icon: const Icon(Icons.poll, color: AppColors.primary, size: 22), onPressed: () {}),
                  IconButton(icon: const Icon(Icons.timer, color: AppColors.primary, size: 22), onPressed: () {}),
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
