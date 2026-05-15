import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class PollsScreen extends StatelessWidget {
  const PollsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Polls')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _pollCard(
            'Best Encryption Standard?',
            'Alpha Core Node',
            [
              _PollOption('AES-256-GCM', 0.45, 128),
              _PollOption('ChaCha20-Poly1305', 0.35, 99),
              _PollOption('XSalsa20', 0.15, 42),
              _PollOption('Other', 0.05, 14),
            ],
            true,
            '18h left',
          ),
          const SizedBox(height: 16),
          _pollCard(
            'Should we enable burn-after-read by default?',
            'TrendUp Community',
            [
              _PollOption('Yes, enable it', 0.62, 247),
              _PollOption('No, keep optional', 0.31, 124),
              _PollOption('Depends on context', 0.07, 28),
            ],
            false,
            'Ended',
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: AppColors.primary,
        onPressed: () {},
        child: const Icon(Icons.add, color: Colors.white),
      ),
    );
  }

  Widget _pollCard(String question, String group, List<_PollOption> options, bool active, String timeLabel) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B).withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: active ? AppColors.primary.withValues(alpha: 0.3) : AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(group, style: const TextStyle(color: AppColors.textMuted, fontSize: 12)),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: (active ? AppColors.success : AppColors.textMuted).withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(timeLabel, style: TextStyle(color: active ? AppColors.success : AppColors.textMuted, fontSize: 10, fontWeight: FontWeight.w600)),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(question, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800)),
          const SizedBox(height: 16),
          ...options.map((o) => _pollOptionBar(o, active)),
          const SizedBox(height: 8),
          Text('${options.fold<int>(0, (sum, o) => sum + o.votes)} votes', style: const TextStyle(color: AppColors.textMuted, fontSize: 12)),
        ],
      ),
    );
  }

  Widget _pollOptionBar(_PollOption option, bool active) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Stack(
        children: [
          Container(
            width: double.infinity,
            height: 40,
            decoration: BoxDecoration(
              color: AppColors.background,
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
            ),
          ),
          FractionallySizedBox(
            widthFactor: option.percentage,
            child: Container(
              height: 40,
              decoration: BoxDecoration(
                color: AppColors.primary.withValues(alpha: 0.2),
                borderRadius: BorderRadius.circular(8),
              ),
            ),
          ),
          SizedBox(
            height: 40,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: Row(
                children: [
                  Text(option.label, style: const TextStyle(fontSize: 13)),
                  const Spacer(),
                  Text('${(option.percentage * 100).toInt()}%', style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _PollOption {
  final String label;
  final double percentage;
  final int votes;
  const _PollOption(this.label, this.percentage, this.votes);
}
