import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class StickersScreen extends StatelessWidget {
  const StickersScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Stickers')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              decoration: const InputDecoration(
                hintText: 'Search stickers...',
                prefixIcon: Icon(Icons.search, size: 20, color: AppColors.textMuted),
                contentPadding: EdgeInsets.symmetric(vertical: 10),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                _categoryTab('Recent', true),
                const SizedBox(width: 8),
                _categoryTab('Trending', false),
                const SizedBox(width: 8),
                _categoryTab('Crypto', false),
                const SizedBox(width: 8),
                _categoryTab('Security', false),
              ],
            ),
          ),
          const SizedBox(height: 16),
          Expanded(
            child: GridView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 4, crossAxisSpacing: 8, mainAxisSpacing: 8),
              itemCount: 16,
              itemBuilder: (context, index) {
                final emojis = ['\u{1F512}', '\u{1F525}', '\u{1F6E1}', '\u{2705}', '\u{1F4B0}', '\u{1F680}', '\u{1F30D}', '\u{26A1}', '\u{1F4AA}', '\u{1F440}', '\u{2764}', '\u{1F389}', '\u{1F4AC}', '\u{2B50}', '\u{1F451}', '\u{1F3AF}'];
                return Container(
                  decoration: BoxDecoration(color: const Color(0xFF1E293B).withValues(alpha: 0.7), borderRadius: BorderRadius.circular(12)),
                  child: Center(child: Text(emojis[index], style: const TextStyle(fontSize: 28))),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _categoryTab(String label, bool active) {
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
}
