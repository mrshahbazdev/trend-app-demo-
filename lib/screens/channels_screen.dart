import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class ChannelsScreen extends StatelessWidget {
  const ChannelsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Channels')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _channelCard(
            'TrendUp Announcements',
            'Official updates and releases from the TrendUp team.',
            'Official',
            45200,
            true,
          ),
          const SizedBox(height: 12),
          _channelCard(
            'Crypto Alpha Signals',
            'Real-time market signals and analysis. Verified traders only.',
            'Verified',
            12800,
            true,
          ),
          const SizedBox(height: 12),
          _channelCard(
            'Privacy & Security News',
            'Daily curated news about privacy, encryption, and cybersecurity.',
            'Community',
            8400,
            false,
          ),
          const SizedBox(height: 12),
          _channelCard(
            'Developer Hub',
            'API updates, SDK releases, and integration guides.',
            'Official',
            3200,
            true,
          ),
        ],
      ),
    );
  }

  Widget _channelCard(String name, String desc, String type, int subscribers, bool subscribed) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CircleAvatar(
                radius: 20,
                backgroundColor: AppColors.surfaceLight,
                child: Text(name[0], style: const TextStyle(fontWeight: FontWeight.w700)),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(name, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15)),
                        const SizedBox(width: 6),
                        if (type == 'Official') const Icon(Icons.verified, size: 14, color: AppColors.accent),
                      ],
                    ),
                    Text('${_formatCount(subscribers)} subscribers', style: const TextStyle(color: AppColors.textMuted, fontSize: 12)),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(desc, style: const TextStyle(color: AppColors.textSecondary, fontSize: 13)),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            child: subscribed
                ? OutlinedButton(onPressed: () {}, child: const Text('Subscribed'))
                : ElevatedButton(onPressed: () {}, child: const Text('Subscribe')),
          ),
        ],
      ),
    );
  }

  String _formatCount(int count) {
    if (count >= 1000) return '${(count / 1000).toStringAsFixed(1)}k';
    return '$count';
  }
}
