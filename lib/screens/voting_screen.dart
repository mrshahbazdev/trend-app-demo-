import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class VotingScreen extends StatelessWidget {
  const VotingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Governance', style: TextStyle(fontWeight: FontWeight.w700)),
        actions: [
          IconButton(icon: const Icon(Icons.history), onPressed: () {}),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.border),
              ),
              child: Row(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Voting Power', style: TextStyle(color: AppColors.textMuted, fontSize: 12)),
                      const SizedBox(height: 4),
                      const Text('2,450 TRU', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                    ],
                  ),
                  const Spacer(),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      const Text('Active Proposals', style: TextStyle(color: AppColors.textMuted, fontSize: 12)),
                      const SizedBox(height: 4),
                      const Text('2', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700, color: AppColors.primary)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            _proposalCard(
              'TIP-042: Expand Liquidity Mining Rewards',
              'Proposal to increase the liquidity mining reward allocation from 5% to 8% of total supply.',
              'Active',
              '2 days left',
              0.68,
              'For',
              true,
            ),
            const SizedBox(height: 16),
            _proposalCard(
              'TIP-041: Privacy Shield Protocol Upgrade',
              'Upgrade the core privacy protocol to include zero-knowledge proof verification for all messages.',
              'Active',
              '5 days left',
              0.82,
              'For',
              true,
            ),
            const SizedBox(height: 16),
            _proposalCard(
              'TIP-040: Community Treasury Fund',
              'Establish a community-managed treasury for grants and development bounties.',
              'Passed',
              'Ended Oct 20',
              0.91,
              'Passed',
              false,
            ),
          ],
        ),
      ),
    );
  }

  Widget _proposalCard(String title, String description, String status, String timeLeft, double approval, String voteLabel, bool canVote) {
    final isActive = status == 'Active';
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: isActive ? AppColors.primary.withValues(alpha: 0.3) : AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: (isActive ? AppColors.success : AppColors.textMuted).withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(status, style: TextStyle(color: isActive ? AppColors.success : AppColors.textMuted, fontSize: 10, fontWeight: FontWeight.w700)),
              ),
              const Spacer(),
              Text(timeLeft, style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
            ],
          ),
          const SizedBox(height: 12),
          Text(title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
          const SizedBox(height: 6),
          Text(description, style: const TextStyle(color: AppColors.textSecondary, fontSize: 13, height: 1.4)),
          const SizedBox(height: 16),
          Row(
            children: [
              Text('${(approval * 100).toInt()}% $voteLabel', style: TextStyle(color: AppColors.success, fontSize: 12, fontWeight: FontWeight.w600)),
              const Spacer(),
              Text('${((1 - approval) * 100).toInt()}% Against', style: const TextStyle(color: AppColors.error, fontSize: 12, fontWeight: FontWeight.w600)),
            ],
          ),
          const SizedBox(height: 8),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: approval,
              backgroundColor: AppColors.error.withValues(alpha: 0.3),
              valueColor: AlwaysStoppedAnimation(AppColors.success),
              minHeight: 6,
            ),
          ),
          if (canVote) ...[
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(backgroundColor: AppColors.success, padding: const EdgeInsets.symmetric(vertical: 10)),
                    child: const Text('Vote For'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: OutlinedButton(
                    onPressed: () {},
                    style: OutlinedButton.styleFrom(
                      side: const BorderSide(color: AppColors.error),
                      foregroundColor: AppColors.error,
                      padding: const EdgeInsets.symmetric(vertical: 10),
                    ),
                    child: const Text('Vote Against'),
                  ),
                ),
              ],
            ),
          ],
        ],
      ),
    );
  }
}
