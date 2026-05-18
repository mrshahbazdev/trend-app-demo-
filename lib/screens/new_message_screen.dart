import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';

class NewMessageScreen extends StatelessWidget {
  const NewMessageScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('New Message')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              autofocus: true,
              decoration: const InputDecoration(
                hintText: 'Search by name, @handle, or wallet address',
                prefixIcon: Icon(Icons.search, size: 20, color: AppColors.textMuted),
                contentPadding: EdgeInsets.symmetric(vertical: 10),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                _actionButton(Icons.group_add, 'New Group'),
                const SizedBox(width: 12),
                _actionButton(Icons.qr_code_scanner, 'Scan QR'),
                const SizedBox(width: 12),
                _actionButton(Icons.person_add, 'Invite'),
              ],
            ),
          ),
          const Padding(
            padding: EdgeInsets.fromLTRB(16, 20, 16, 8),
            child: Align(
              alignment: Alignment.centerLeft,
              child: Text('SUGGESTED', style: TextStyle(color: AppColors.textMuted, fontSize: 11, fontWeight: FontWeight.w600, letterSpacing: 1)),
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: MockData.contacts.length,
              itemBuilder: (context, index) {
                final c = MockData.contacts[index];
                return ListTile(
                  leading: CircleAvatar(
                    radius: 22,
                    backgroundColor: AppColors.surfaceLight,
                    child: Text(c.avatar, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 12)),
                  ),
                  title: Row(
                    children: [
                      Text(c.name, style: const TextStyle(fontWeight: FontWeight.w500, fontSize: 15)),
                      if (c.isVerified) ...[
                        const SizedBox(width: 4),
                        const Icon(Icons.verified, size: 14, color: AppColors.accent),
                      ],
                    ],
                  ),
                  subtitle: Text(c.handle, style: const TextStyle(color: AppColors.textMuted, fontSize: 12)),
                  trailing: c.isOnline
                      ? Container(width: 8, height: 8, decoration: const BoxDecoration(color: AppColors.success, shape: BoxShape.circle))
                      : null,
                  onTap: () {
                    Navigator.pushReplacementNamed(context, '/chat');
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _actionButton(IconData icon, String label) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(color: AppColors.surfaceLight.withValues(alpha: 0.7), borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.white.withValues(alpha: 0.06))),
        child: Column(
          children: [
            Icon(icon, color: AppColors.primary, size: 22),
            const SizedBox(height: 6),
            Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w500)),
          ],
        ),
      ),
    );
  }
}
