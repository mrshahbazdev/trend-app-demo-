import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class QrShareScreen extends StatelessWidget {
  const QrShareScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('QR Code')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            const Spacer(),
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.border),
              ),
              child: Column(
                children: [
                  const CircleAvatar(
                    radius: 32,
                    backgroundColor: AppColors.primary,
                    child: Text('S', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.w700)),
                  ),
                  const SizedBox(height: 12),
                  const Text('shahbaz', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                  const Text('@shahbazdev', style: TextStyle(color: AppColors.textMuted)),
                  const SizedBox(height: 20),
                  Container(
                    width: 200,
                    height: 200,
                    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12)),
                    child: const Center(child: Icon(Icons.qr_code, size: 160, color: Colors.black87)),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.lock, size: 12, color: AppColors.success),
                      const SizedBox(width: 4),
                      const Text('Secure Identity Verified', style: TextStyle(color: AppColors.success, fontSize: 12)),
                    ],
                  ),
                ],
              ),
            ),
            const Spacer(),
            SizedBox(width: double.infinity, child: ElevatedButton.icon(onPressed: () {}, icon: const Icon(Icons.share, size: 18), label: const Text('Share QR Code'))),
            const SizedBox(height: 12),
            SizedBox(width: double.infinity, child: OutlinedButton.icon(onPressed: () {}, icon: const Icon(Icons.qr_code_scanner, size: 18), label: const Text('Scan QR Code'))),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }
}
