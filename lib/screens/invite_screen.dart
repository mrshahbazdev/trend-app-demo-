import 'package:flutter/material.dart';

class InviteScreen extends StatelessWidget {
  const InviteScreen({super.key});

  static const Color _lightBg = Color(0xFFF8FAFC);
  static const Color _slate900 = Color(0xFF0F172A);
  static const Color _slate700 = Color(0xFF334155);
  static const Color _slate500 = Color(0xFF64748B);
  static const Color _slate400 = Color(0xFF94A3B8);
  static const Color _slate200 = Color(0xFFE2E8F0);
  static const Color _red600 = Color(0xFFDC2626);
  static const Color _emerald500 = Color(0xFF10B981);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _lightBg,
      appBar: AppBar(
        backgroundColor: _lightBg,
        elevation: 0,
        scrolledUnderElevation: 0,
        leading: Padding(
          padding: const EdgeInsets.only(left: 8),
          child: Center(
            child: GestureDetector(
              onTap: () => Navigator.pop(context),
              child: Container(
                width: 38, height: 38,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: _slate200),
                ),
                child: const Icon(Icons.arrow_back_ios_new, size: 16, color: _slate900),
              ),
            ),
          ),
        ),
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Image.asset('assets/images/logo.png', width: 32, height: 32),
            const SizedBox(width: 8),
            const Text('Invite Friends', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: _slate900)),
          ],
        ),
        centerTitle: true,
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 16),
            child: Center(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                decoration: BoxDecoration(
                  color: const Color(0xFFFEF2F2),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Text('5 left', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: _red600)),
              ),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // --- Hero Card ---
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  begin: Alignment.topLeft, end: Alignment.bottomRight,
                  colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
                ),
                borderRadius: BorderRadius.circular(20),
                boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.12), blurRadius: 20, offset: const Offset(0, 8))],
              ),
              child: Column(
                children: [
                  Container(
                    width: 56, height: 56,
                    decoration: BoxDecoration(
                      color: _red600.withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: const Icon(Icons.card_giftcard, color: _red600, size: 28),
                  ),
                  const SizedBox(height: 16),
                  const Text('Share the Privacy', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: Colors.white)),
                  const SizedBox(height: 6),
                  Text(
                    'Invite friends to join TrendUp\'s\nend-to-end encrypted network',
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.white.withValues(alpha: 0.5), fontSize: 13, height: 1.5),
                  ),
                  const SizedBox(height: 20),
                  // Invite link
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.08),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
                    ),
                    child: Row(
                      children: [
                        Icon(Icons.link, size: 16, color: Colors.white.withValues(alpha: 0.4)),
                        const SizedBox(width: 10),
                        const Expanded(
                          child: Text('trendup.app/invite/0x71C4f92', style: TextStyle(color: Colors.white, fontSize: 13, fontFamily: 'monospace', fontWeight: FontWeight.w500)),
                        ),
                        GestureDetector(
                          onTap: () {},
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                            decoration: BoxDecoration(color: _red600, borderRadius: BorderRadius.circular(8)),
                            child: const Text('Copy', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w700)),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // --- Share Via ---
            const Text('Share via', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: _slate900)),
            const SizedBox(height: 14),
            Row(
              children: [
                _shareChip(Icons.sms, 'SMS', const Color(0xFF3B82F6), const Color(0xFFEFF6FF)),
                const SizedBox(width: 10),
                _shareChip(Icons.email_outlined, 'Email', const Color(0xFF8B5CF6), const Color(0xFFF5F3FF)),
                const SizedBox(width: 10),
                _shareChip(Icons.qr_code_rounded, 'QR Code', _emerald500, const Color(0xFFECFDF5)),
                const SizedBox(width: 10),
                _shareChip(Icons.share_rounded, 'More', _slate500, const Color(0xFFF1F5F9)),
              ],
            ),
            const SizedBox(height: 28),

            // --- Contacts on TrendUp ---
            Row(
              children: [
                const Text('On TrendUp', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: _slate900)),
                const SizedBox(width: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(color: const Color(0xFFDCFCE7), borderRadius: BorderRadius.circular(10)),
                  child: const Text('2', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: Color(0xFF15803D))),
                ),
              ],
            ),
            const SizedBox(height: 14),
            _contactCard('JD', 'Jane Doe', '@jane_crypto', true, true, const LinearGradient(colors: [Color(0xFFEA580C), Color(0xFFDC2626)])),
            const SizedBox(height: 10),
            _contactCard('MK', 'Mike Knight', '+1 ••• 4492', false, true, const LinearGradient(colors: [Color(0xFF475569), Color(0xFF334155)])),
            const SizedBox(height: 28),

            // --- Not on TrendUp ---
            Row(
              children: [
                const Text('Invite to TrendUp', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: _slate900)),
                const SizedBox(width: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(color: const Color(0xFFFEF2F2), borderRadius: BorderRadius.circular(10)),
                  child: const Text('3', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: _red600)),
                ),
              ],
            ),
            const SizedBox(height: 14),
            _contactCard('AL', 'Alice Lawson', '+44 ••• 8821', false, false, const LinearGradient(colors: [Color(0xFF94A3B8), Color(0xFF64748B)])),
            const SizedBox(height: 10),
            _contactCard('BT', 'Bob Thompson', '+1 ••• 1029', false, false, const LinearGradient(colors: [Color(0xFF94A3B8), Color(0xFF64748B)])),
            const SizedBox(height: 10),
            _contactCard('CR', 'Chris Rock', '+1 ••• 5521', false, false, const LinearGradient(colors: [Color(0xFF94A3B8), Color(0xFF64748B)])),
            const SizedBox(height: 32),

            // --- Footer ---
            Center(
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.lock_outline, size: 13, color: _emerald500),
                  const SizedBox(width: 6),
                  Text('Invites are end-to-end encrypted', style: TextStyle(color: _emerald500, fontSize: 11, fontWeight: FontWeight.w600)),
                ],
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  Widget _shareChip(IconData icon, String label, Color iconColor, Color bgColor) {
    return Expanded(
      child: GestureDetector(
        onTap: () {},
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 14),
          decoration: BoxDecoration(
            color: bgColor,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: iconColor.withValues(alpha: 0.15)),
          ),
          child: Column(
            children: [
              Icon(icon, size: 22, color: iconColor),
              const SizedBox(height: 6),
              Text(label, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: iconColor)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _contactCard(String initials, String name, String subtitle, bool verified, bool onTrendUp, Gradient avatarGradient) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: _slate200.withValues(alpha: 0.8)),
        boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.03), blurRadius: 8, offset: const Offset(0, 2))],
      ),
      child: Row(
        children: [
          Container(
            width: 44, height: 44,
            decoration: BoxDecoration(gradient: avatarGradient, shape: BoxShape.circle),
            child: Center(child: Text(initials, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 14))),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(name, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: _slate900)),
                    if (verified) ...[
                      const SizedBox(width: 5),
                      const Icon(Icons.verified, size: 14, color: Color(0xFF3B82F6)),
                    ],
                  ],
                ),
                const SizedBox(height: 2),
                Text(subtitle, style: const TextStyle(fontSize: 12, color: _slate400)),
              ],
            ),
          ),
          if (onTrendUp)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: _lightBg,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: _slate200),
              ),
              child: const Text('Message', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: _slate700)),
            )
          else
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
              decoration: BoxDecoration(
                color: _red600,
                borderRadius: BorderRadius.circular(12),
                boxShadow: [BoxShadow(color: _red600.withValues(alpha: 0.25), blurRadius: 8, offset: const Offset(0, 2))],
              ),
              child: const Text('Invite', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Colors.white)),
            ),
        ],
      ),
    );
  }
}
