import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class SafetyNumberScreen extends StatelessWidget {
  const SafetyNumberScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Safety Number')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            const Text('Verify Safety Number', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800)),
            const SizedBox(height: 8),
            const Text(
              'To verify the security of your end-to-end encryption with stevej, compare the numbers below.',
              textAlign: TextAlign.center,
              style: TextStyle(color: AppColors.textSecondary, fontSize: 14),
            ),
            const SizedBox(height: 32),
            Container(
              width: 160,
              height: 160,
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12)),
              child: const Center(child: Icon(Icons.qr_code, size: 120, color: Colors.black87)),
            ),
            const SizedBox(height: 24),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: const Color(0xFF1E293B).withValues(alpha: 0.7), borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.white.withValues(alpha: 0.06))),
              child: const Text(
                '37829 12472 18293 84712\n92847 38192 47281 19283\n28471 93827 41829 37182',
                textAlign: TextAlign.center,
                style: TextStyle(fontFamily: 'monospace', fontSize: 16, letterSpacing: 2, height: 1.8),
              ),
            ),
            const SizedBox(height: 24),
            SizedBox(width: double.infinity, child: ElevatedButton.icon(onPressed: () {}, icon: const Icon(Icons.check, size: 18), label: const Text('Mark as Verified'))),
            const SizedBox(height: 12),
            SizedBox(width: double.infinity, child: OutlinedButton.icon(onPressed: () {}, icon: const Icon(Icons.qr_code_scanner, size: 18), label: const Text('Scan QR Code'))),
            const Spacer(),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.lock, size: 12, color: AppColors.success),
                const SizedBox(width: 4),
                const Text('Safety numbers are derived from your encryption keys', style: TextStyle(color: AppColors.success, fontSize: 10)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
