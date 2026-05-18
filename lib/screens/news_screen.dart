import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class NewsScreen extends StatelessWidget {
  const NewsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('News', style: TextStyle(fontWeight: FontWeight.w800)),
        actions: [
          IconButton(icon: const Icon(Icons.search), onPressed: () {}),
          IconButton(icon: const Icon(Icons.filter_list), onPressed: () {}),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Row(
                children: [
                  _categoryChip('All', true),
                  const SizedBox(width: 8),
                  _categoryChip('Crypto', false),
                  const SizedBox(width: 8),
                  _categoryChip('Security', false),
                  const SizedBox(width: 8),
                  _categoryChip('Tech', false),
                ],
              ),
            ),
            _featuredNews(),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              child: Text('Latest', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
            ),
            _newsTile('Bitcoin Surpasses \$97K Amid ETF Inflows', 'CryptoDaily', '2h', 'Crypto'),
            _newsTile('EU Passes Landmark Encryption Protection Act', 'TechWatch', '4h', 'Security'),
            _newsTile('Solana TVL Hits New ATH at \$14.2B', 'DeFi Pulse', '6h', 'Crypto'),
            _newsTile('Zero-Knowledge Proofs: The Future of Privacy', 'Privacy Magazine', '8h', 'Tech'),
            _newsTile('Metamask Reaches 100M Monthly Users', 'Web3 Today', '12h', 'Crypto'),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _categoryChip(String label, bool active) {
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

  Widget _featuredNews() {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppColors.primary.withValues(alpha: 0.2), AppColors.surface],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.primary.withValues(alpha: 0.2)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
            decoration: BoxDecoration(color: AppColors.primary.withValues(alpha: 0.2), borderRadius: BorderRadius.circular(4)),
            child: const Text('BREAKING', style: TextStyle(color: AppColors.primary, fontSize: 10, fontWeight: FontWeight.w800)),
          ),
          const SizedBox(height: 12),
          const Text('TrendUp Protocol v4.0 Released with Enhanced Zero-Knowledge Messaging', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, height: 1.3)),
          const SizedBox(height: 8),
          const Text('The latest update introduces revolutionary privacy features including burn-after-read proofs and device-bound encryption.', style: TextStyle(color: AppColors.textSecondary, fontSize: 13, height: 1.4)),
          const SizedBox(height: 12),
          Row(
            children: [
              const Text('TrendUp Blog', style: TextStyle(color: AppColors.primary, fontSize: 12, fontWeight: FontWeight.w500)),
              const SizedBox(width: 8),
              const Text('\u2022', style: TextStyle(color: AppColors.textMuted)),
              const SizedBox(width: 8),
              const Text('Just now', style: TextStyle(color: AppColors.textMuted, fontSize: 12)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _newsTile(String title, String source, String time, String category) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 72,
            height: 72,
            decoration: BoxDecoration(color: AppColors.surfaceLight, borderRadius: BorderRadius.circular(8)),
            child: const Icon(Icons.article, color: AppColors.textMuted),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14, height: 1.3)),
                const SizedBox(height: 6),
                Row(
                  children: [
                    Text(source, style: const TextStyle(color: AppColors.primary, fontSize: 11)),
                    const SizedBox(width: 8),
                    Text('\u2022  $time', style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
                    const Spacer(),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                      decoration: BoxDecoration(color: AppColors.surfaceLight.withValues(alpha: 0.7), borderRadius: BorderRadius.circular(4)),
                      child: Text(category, style: const TextStyle(fontSize: 10, color: AppColors.textSecondary)),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
