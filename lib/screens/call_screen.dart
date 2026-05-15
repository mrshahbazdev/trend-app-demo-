import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';

class CallScreen extends StatelessWidget {
  const CallScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 40),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(color: AppColors.success.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(4)),
              child: const Text('E2EE ACTIVE \u2022 HD Voice', style: TextStyle(color: AppColors.success, fontSize: 10, fontWeight: FontWeight.w800)),
            ),
            const Spacer(),
            const CircleAvatar(
              radius: 56,
              backgroundColor: AppColors.surfaceLight,
              child: Text('S', style: TextStyle(fontSize: 36, fontWeight: FontWeight.w800)),
            ),
            const SizedBox(height: 24),
            const Text('stevej', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800)),
            const SizedBox(height: 8),
            const Text('Encrypted call', style: TextStyle(color: AppColors.textSecondary)),
            const SizedBox(height: 8),
            const Text('02:34', style: TextStyle(fontSize: 18, color: AppColors.textMuted, fontWeight: FontWeight.w300)),
            const Spacer(),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _callAction(Icons.mic_off, 'Mute'),
                _callAction(Icons.volume_up, 'Speaker'),
                _callAction(Icons.videocam, 'Video'),
                _callAction(Icons.headphones, 'Audio'),
              ],
            ),
            const SizedBox(height: 40),
            GestureDetector(
              onTap: () => Navigator.pop(context),
              child: Container(
                width: 64,
                height: 64,
                decoration: const BoxDecoration(color: AppColors.error, shape: BoxShape.circle),
                child: const Icon(Icons.call_end, color: Colors.white, size: 28),
              ),
            ),
            const SizedBox(height: 16),
            const Text('TrendUp Secure Layer 2.0', style: TextStyle(color: AppColors.textMuted, fontSize: 10)),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _callAction(IconData icon, String label) {
    return Column(
      children: [
        Container(
          width: 52,
          height: 52,
          decoration: BoxDecoration(color: const Color(0xFF1E293B).withValues(alpha: 0.7), shape: BoxShape.circle, border: Border.all(color: Colors.white.withValues(alpha: 0.06))),
          child: Icon(icon, color: AppColors.textPrimary, size: 22),
        ),
        const SizedBox(height: 6),
        Text(label, style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
      ],
    );
  }
}

class CallHistoryScreen extends StatelessWidget {
  const CallHistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Calls')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              children: [
                _filterChip('All', true),
                const SizedBox(width: 8),
                _filterChip('Missed', false),
                const SizedBox(width: 8),
                _filterChip('Incoming', false),
                const SizedBox(width: 8),
                _filterChip('Outgoing', false),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: MockData.callHistory.length,
              itemBuilder: (context, index) {
                final call = MockData.callHistory[index];
                return ListTile(
                  leading: CircleAvatar(
                    backgroundColor: AppColors.surfaceLight,
                    child: Text(call['avatar']!, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
                  ),
                  title: Text(call['name']!, style: TextStyle(color: call['type'] == 'missed' ? AppColors.error : AppColors.textPrimary)),
                  subtitle: Text(
                    '${call['time']}${call['duration'] != null ? ' \u2022 ${call['duration']}' : ''}',
                    style: const TextStyle(fontSize: 12, color: AppColors.textMuted),
                  ),
                  trailing: Icon(
                    call['type'] == 'missed' ? Icons.phone_missed : (call['type'] == 'incoming' ? Icons.call_received : Icons.call_made),
                    color: call['type'] == 'missed' ? AppColors.error : AppColors.success,
                    size: 18,
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _filterChip(String label, bool active) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
      decoration: BoxDecoration(
        color: active ? AppColors.primary.withValues(alpha: 0.15) : AppColors.surface,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: active ? AppColors.primary.withValues(alpha: 0.3) : AppColors.border),
      ),
      child: Text(label, style: TextStyle(color: active ? AppColors.primary : AppColors.textSecondary, fontSize: 12)),
    );
  }
}
