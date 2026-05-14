import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class SecuringScreen extends StatefulWidget {
  const SecuringScreen({super.key});

  @override
  State<SecuringScreen> createState() => _SecuringScreenState();
}

class _SecuringScreenState extends State<SecuringScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  double _progress = 0.0;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 3))
      ..addListener(() => setState(() => _progress = _controller.value))
      ..forward().then((_) {
        Navigator.pushNamedAndRemoveUntil(context, '/home', (r) => false);
      });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            children: [
              const SizedBox(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.shield, color: AppColors.primary, size: 24),
                  const SizedBox(width: 8),
                  const Text('TrendUp', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                ],
              ),
              const Spacer(),
              Container(
                width: 80,
                height: 80,
                decoration: BoxDecoration(
                  color: AppColors.primary.withValues(alpha: 0.15),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.shield, size: 40, color: AppColors.primary),
              ),
              const SizedBox(height: 8),
              const Text('Private by Design', style: TextStyle(color: AppColors.primary, fontSize: 12, letterSpacing: 2)),
              const SizedBox(height: 32),
              const Text('Securing your device', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800)),
              const SizedBox(height: 8),
              const Text('This may take a few moments.', style: TextStyle(color: AppColors.textSecondary)),
              const SizedBox(height: 32),
              ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: LinearProgressIndicator(
                  value: _progress,
                  backgroundColor: AppColors.surface,
                  valueColor: const AlwaysStoppedAnimation(AppColors.primary),
                  minHeight: 6,
                ),
              ),
              const SizedBox(height: 8),
              Text('Initializing Core... ${(_progress * 100).toInt()}%', style: const TextStyle(color: AppColors.textMuted, fontSize: 12)),
              const SizedBox(height: 40),
              _securityStep(Icons.lock, 'Encryption', 'Keys generated locally', _progress > 0.3),
              _securityStep(Icons.timer, 'Ephemeral controls', 'Timers available after setup', _progress > 0.6),
              _securityStep(Icons.storage, 'Minimal metadata', 'Policy-owned retention', _progress > 0.9),
              const Spacer(),
              Text(
                'TrendUp uses hardware-backed security modules to ensure\nyour identity remains yours alone.',
                textAlign: TextAlign.center,
                style: TextStyle(color: AppColors.textMuted, fontSize: 11, height: 1.5),
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }

  Widget _securityStep(IconData icon, String title, String subtitle, bool done) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: done ? AppColors.success.withValues(alpha: 0.15) : AppColors.surface,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, color: done ? AppColors.success : AppColors.textMuted, size: 20),
          ),
          const SizedBox(width: 16),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: TextStyle(fontWeight: FontWeight.w600, color: done ? AppColors.textPrimary : AppColors.textMuted)),
              Text(subtitle, style: TextStyle(color: AppColors.textMuted, fontSize: 12)),
            ],
          ),
          const Spacer(),
          if (done) const Icon(Icons.check_circle, color: AppColors.success, size: 20),
        ],
      ),
    );
  }
}
