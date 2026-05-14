import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class E2eeBadge extends StatelessWidget {
  final String? text;

  const E2eeBadge({super.key, this.text});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: AppColors.e2eeBadge.withValues(alpha: 0.3),
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: AppColors.success.withValues(alpha: 0.3)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.lock, size: 10, color: AppColors.success.withValues(alpha: 0.8)),
          const SizedBox(width: 4),
          Text(
            text ?? 'E2EE',
            style: TextStyle(
              color: AppColors.success.withValues(alpha: 0.8),
              fontSize: 10,
              fontWeight: FontWeight.w600,
              letterSpacing: 0.5,
            ),
          ),
        ],
      ),
    );
  }
}

class BurnTimerBadge extends StatelessWidget {
  final String time;

  const BurnTimerBadge({super.key, required this.time});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
      decoration: BoxDecoration(
        color: AppColors.primary.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(4),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.timer, size: 10, color: AppColors.primary),
          const SizedBox(width: 3),
          Text(time, style: const TextStyle(color: AppColors.primary, fontSize: 10, fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }
}
