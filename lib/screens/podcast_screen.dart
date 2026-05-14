import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class PodcastScreen extends StatelessWidget {
  const PodcastScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Podcasts')),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Padding(
              padding: EdgeInsets.all(16),
              child: Text('Live Now', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
            ),
            _livePodcast(context),
            const Padding(
              padding: EdgeInsets.fromLTRB(16, 24, 16, 12),
              child: Text('Popular Channels', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
            ),
            _channelTile('CryptoTalks', 'Daily market analysis and crypto news', '4.2k listeners', Icons.trending_up),
            _channelTile('Privacy First', 'Discussions on digital privacy and security', '2.8k listeners', Icons.shield),
            _channelTile('Web3 Builders', 'For developers building the decentralized web', '1.5k listeners', Icons.code),
            _channelTile('DeFi Deep Dive', 'Understanding decentralized finance protocols', '3.1k listeners', Icons.account_balance),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _livePodcast(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppColors.primary.withValues(alpha: 0.2), AppColors.surface],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.primary.withValues(alpha: 0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(color: AppColors.error, borderRadius: BorderRadius.circular(4)),
                child: const Text('LIVE', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.w700)),
              ),
              const SizedBox(width: 8),
              const Text('342 listening', style: TextStyle(color: AppColors.textMuted, fontSize: 12)),
            ],
          ),
          const SizedBox(height: 12),
          const Text('The Future of Encrypted Communication', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
          const SizedBox(height: 4),
          const Text('CryptoTalks \u2022 Episode 142', style: TextStyle(color: AppColors.textSecondary, fontSize: 13)),
          const SizedBox(height: 16),
          Row(
            children: [
              ...['T', 'S', 'A'].map((a) => Padding(
                padding: const EdgeInsets.only(right: 4),
                child: CircleAvatar(radius: 14, backgroundColor: AppColors.surfaceLight, child: Text(a, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600))),
              )),
              const SizedBox(width: 4),
              const Text('3 speakers', style: TextStyle(color: AppColors.textMuted, fontSize: 11)),
              const Spacer(),
              ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8), minimumSize: Size.zero),
                child: const Text('Join', style: TextStyle(fontSize: 13)),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _channelTile(String name, String desc, String listeners, IconData icon) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppColors.border)),
            child: Icon(icon, color: AppColors.primary, size: 24),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(name, style: const TextStyle(fontWeight: FontWeight.w600)),
                Text(desc, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(color: AppColors.textSecondary, fontSize: 12)),
                Text(listeners, style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
              ],
            ),
          ),
          OutlinedButton(
            onPressed: () {},
            style: OutlinedButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6), minimumSize: Size.zero),
            child: const Text('Follow', style: TextStyle(fontSize: 12)),
          ),
        ],
      ),
    );
  }
}
