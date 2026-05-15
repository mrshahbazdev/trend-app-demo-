import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class FileShareScreen extends StatelessWidget {
  const FileShareScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Shared Files')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _fileItem('compliance_report.pdf', '1.2 MB', 'stevej', 'Oct 24', Icons.picture_as_pdf, true),
          _fileItem('wallet_backup.enc', '256 KB', 'You', 'Oct 23', Icons.lock, true),
          _fileItem('meeting_notes.md', '48 KB', 'alex', 'Oct 22', Icons.description, false),
          _fileItem('protocol_v4_spec.pdf', '3.8 MB', 'stevej', 'Oct 20', Icons.picture_as_pdf, true),
          _fileItem('screenshot_2024.png', '820 KB', 'You', 'Oct 18', Icons.image, false),
        ],
      ),
    );
  }

  Widget _fileItem(String name, String size, String sender, String date, IconData icon, bool encrypted) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B).withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
      ),
      child: Row(
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(color: AppColors.surfaceLight, borderRadius: BorderRadius.circular(10)),
            child: Icon(icon, color: AppColors.primary, size: 22),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(name, style: const TextStyle(fontWeight: FontWeight.w500, fontSize: 14)),
                Row(
                  children: [
                    Text('$size \u2022 $sender \u2022 $date', style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
                    if (encrypted) ...[
                      const SizedBox(width: 6),
                      Icon(Icons.lock, size: 10, color: AppColors.success),
                    ],
                  ],
                ),
              ],
            ),
          ),
          IconButton(icon: const Icon(Icons.download, color: AppColors.textSecondary, size: 20), onPressed: () {}),
        ],
      ),
    );
  }
}
