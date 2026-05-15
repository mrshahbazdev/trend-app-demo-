import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class StoriesScreen extends StatelessWidget {
  const StoriesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Stories')),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              height: 100,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                children: [
                  _storyCircle('You', '+', true),
                  _storyCircle('stevej', 'S', false, hasStory: true),
                  _storyCircle('alex', 'A', false, hasStory: true),
                  _storyCircle('sarah', 'SC', false, hasStory: true),
                  _storyCircle('julian', 'J', false),
                  _storyCircle('marcus', 'M', false),
                ],
              ),
            ),
            const Divider(),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              child: Text('Recent Updates', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800)),
            ),
            _storyFeedItem('stevej', 'Encrypted status update', '2h', true),
            _storyFeedItem('alex', 'Just verified my wallet!', '4h', true),
            _storyFeedItem('sarah', 'New security badge unlocked', '6h', false),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: AppColors.primary,
        onPressed: () {},
        child: const Icon(Icons.camera_alt, color: Colors.white),
      ),
    );
  }

  Widget _storyCircle(String name, String avatar, bool isAdd, {bool hasStory = false}) {
    return Padding(
      padding: const EdgeInsets.only(right: 16),
      child: Column(
        children: [
          Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(
                color: hasStory ? AppColors.primary : (isAdd ? AppColors.border : AppColors.surface),
                width: 2,
              ),
            ),
            child: CircleAvatar(
              backgroundColor: isAdd ? AppColors.surface : AppColors.surfaceLight,
              child: isAdd
                  ? const Icon(Icons.add, color: AppColors.primary)
                  : Text(avatar, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
            ),
          ),
          const SizedBox(height: 4),
          Text(name, style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
        ],
      ),
    );
  }

  Widget _storyFeedItem(String name, String content, String time, bool encrypted) {
    return ListTile(
      leading: Container(
        width: 44,
        height: 44,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(color: AppColors.primary, width: 2),
        ),
        child: CircleAvatar(
          backgroundColor: AppColors.surfaceLight,
          child: Text(name[0].toUpperCase(), style: const TextStyle(fontWeight: FontWeight.w600)),
        ),
      ),
      title: Row(
        children: [
          Text(name, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
          if (encrypted) ...[
            const SizedBox(width: 6),
            Icon(Icons.lock, size: 12, color: AppColors.success),
          ],
        ],
      ),
      subtitle: Text(content, style: const TextStyle(color: AppColors.textSecondary, fontSize: 12)),
      trailing: Text(time, style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
    );
  }
}
