import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class TwoFAScreen extends StatelessWidget {
  const TwoFAScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('2FA Setup')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(color: AppColors.accent.withValues(alpha: 0.15), shape: BoxShape.circle),
              child: const Icon(Icons.security, size: 36, color: AppColors.accent),
            ),
            const SizedBox(height: 16),
            const Text('Two-Factor Authentication', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800)),
            const SizedBox(height: 8),
            const Text('Add an extra layer of security to your account.', textAlign: TextAlign.center, style: TextStyle(color: AppColors.textSecondary)),
            const SizedBox(height: 32),
            _methodCard(Icons.phone_android, 'Authenticator App', 'Use Google Authenticator, Authy, etc.', true),
            const SizedBox(height: 12),
            _methodCard(Icons.sms, 'SMS Verification', 'Receive codes via SMS (less secure)', false),
            const SizedBox(height: 12),
            _methodCard(Icons.key, 'Hardware Key', 'Use a YubiKey or similar device', false),
            const SizedBox(height: 32),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: const Color(0xFF1E293B).withValues(alpha: 0.7), borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.white.withValues(alpha: 0.06))),
              child: Column(
                children: [
                  const Text('Scan QR Code', style: TextStyle(fontWeight: FontWeight.w600)),
                  const SizedBox(height: 12),
                  Container(
                    width: 160,
                    height: 160,
                    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(8)),
                    child: const Center(child: Icon(Icons.qr_code, size: 120, color: Colors.black87)),
                  ),
                  const SizedBox(height: 12),
                  const Text('Or enter key manually:', style: TextStyle(color: AppColors.textMuted, fontSize: 12)),
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    decoration: BoxDecoration(color: AppColors.background, borderRadius: BorderRadius.circular(6)),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Text('TREN-DUSP-ECUR-E2E4', style: TextStyle(fontFamily: 'monospace', letterSpacing: 1, fontSize: 14)),
                        const SizedBox(width: 8),
                        Icon(Icons.copy, size: 16, color: AppColors.textMuted),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            const Text('Enter Verification Code', style: TextStyle(fontWeight: FontWeight.w600)),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(6, (i) => Container(
                width: 40,
                height: 48,
                margin: const EdgeInsets.symmetric(horizontal: 4),
                decoration: BoxDecoration(color: const Color(0xFF1E293B).withValues(alpha: 0.7), borderRadius: BorderRadius.circular(8), border: Border.all(color: Colors.white.withValues(alpha: 0.06))),
                child: Center(child: Text(i < 3 ? '${i + 1}' : '', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w600))),
              )),
            ),
            const SizedBox(height: 24),
            SizedBox(width: double.infinity, child: ElevatedButton(onPressed: () {}, child: const Text('Enable 2FA'))),
          ],
        ),
      ),
    );
  }

  Widget _methodCard(IconData icon, String title, String desc, bool selected) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B).withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: selected ? AppColors.primary : AppColors.border),
      ),
      child: Row(
        children: [
          Icon(icon, color: selected ? AppColors.primary : AppColors.textSecondary),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                Text(desc, style: const TextStyle(color: AppColors.textMuted, fontSize: 12)),
              ],
            ),
          ),
          if (selected) const Icon(Icons.check_circle, color: AppColors.primary, size: 20),
        ],
      ),
    );
  }
}
