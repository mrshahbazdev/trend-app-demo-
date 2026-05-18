import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';

class WalletScreen extends StatelessWidget {
  const WalletScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wallet & Identity', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(height: 1, color: Colors.white.withValues(alpha: 0.06)),
        ),
        actions: [
          Image.asset('assets/images/logo.png', width: 28, height: 28),
          const SizedBox(width: 12),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _glassCard(
              child: Stack(
                children: [
                  Positioned(
                    top: -20,
                    right: -20,
                    child: Container(
                      width: 120,
                      height: 120,
                      decoration: BoxDecoration(
                        color: AppColors.primary,
                        shape: BoxShape.circle,
                        boxShadow: [BoxShadow(color: AppColors.primary.withValues(alpha: 0.15), blurRadius: 80)],
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Container(
                              width: 48,
                              height: 48,
                              decoration: BoxDecoration(
                                color: AppColors.background,
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
                              ),
                              child: Icon(Icons.currency_bitcoin, size: 24, color: Colors.white.withValues(alpha: 0.9)),
                            ),
                            const SizedBox(width: 14),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('Ethereum Mainnet', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16)),
                                Row(
                                  children: [
                                    _statusBadge('Connected', AppColors.success),
                                  ],
                                ),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 20),
                        Row(
                          children: [
                            const Text('Balance', style: TextStyle(color: AppColors.textSecondary, fontSize: 13)),
                            const Spacer(),
                          ],
                        ),
                        const SizedBox(height: 6),
                        const Text('\$12,847.50', style: TextStyle(fontSize: 36, fontWeight: FontWeight.w800)),
                        const SizedBox(height: 4),
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                              decoration: BoxDecoration(
                                color: AppColors.success.withValues(alpha: 0.1),
                                borderRadius: BorderRadius.circular(4),
                                border: Border.all(color: AppColors.success.withValues(alpha: 0.2)),
                              ),
                              child: const Text('+\$342.18 (2.73%)', style: TextStyle(color: AppColors.success, fontSize: 12, fontWeight: FontWeight.w500)),
                            ),
                            const SizedBox(width: 8),
                            const Text('Today', style: TextStyle(color: AppColors.textMuted, fontSize: 12)),
                          ],
                        ),
                        const SizedBox(height: 16),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                          decoration: BoxDecoration(
                            color: const Color(0xFF181818),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: const Color(0xFFDFF352).withValues(alpha: 0.2)),
                          ),
                          child: Row(
                            children: [
                              Icon(Icons.account_balance_wallet, size: 14, color: const Color(0xFFDFF352)),
                              const SizedBox(width: 8),
                              Text('0x71C...4f92', style: TextStyle(color: const Color(0xFFDFF352), fontSize: 12, fontFamily: 'monospace')),
                              const SizedBox(width: 8),
                              Icon(Icons.copy, size: 12, color: const Color(0xFFDFF352).withValues(alpha: 0.6)),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                _actionButton(Icons.arrow_upward, 'Send'),
                const SizedBox(width: 12),
                _actionButton(Icons.arrow_downward, 'Receive'),
                const SizedBox(width: 12),
                _actionButton(Icons.swap_horiz, 'Swap'),
              ],
            ),
            const SizedBox(height: 24),
            const Text('Assets', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
            const SizedBox(height: 12),
            _glassCard(
              child: Column(
                children: MockData.cryptoData.asMap().entries.map((entry) {
                  final idx = entry.key;
                  final crypto = entry.value;
                  return Column(
                    children: [
                      if (idx > 0) _divider(),
                      _assetTile(crypto),
                    ],
                  );
                }).toList(),
              ),
            ),
            const SizedBox(height: 24),
            const Text('Recent Transactions', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
            const SizedBox(height: 12),
            _glassCard(
              child: Column(
                children: [
                  _txTile('Sent to 0x4a...2e', '-0.15 ETH', '\$571.84', 'Oct 24, 14:32', false),
                  _divider(),
                  _txTile('Received from Vault', '+200 USDC', '\$200.00', 'Oct 23, 09:15', true),
                  _divider(),
                  _txTile('Swap ETH → SOL', '-0.5 ETH', '\$1,906.12', 'Oct 22, 18:45', false),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  static Widget _glassCard({required Widget child}) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: AppColors.surfaceLight.withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
      ),
      clipBehavior: Clip.hardEdge,
      child: child,
    );
  }

  static Widget _divider() {
    return Container(height: 1, margin: const EdgeInsets.symmetric(horizontal: 16), color: Colors.white.withValues(alpha: 0.04));
  }

  Widget _actionButton(IconData icon, String label) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 16),
        decoration: BoxDecoration(
          color: AppColors.surfaceLight.withValues(alpha: 0.7),
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
        ),
        child: Column(
          children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: AppColors.primary.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: AppColors.primary, size: 20),
            ),
            const SizedBox(height: 8),
            Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
          ],
        ),
      ),
    );
  }

  Widget _assetTile(MockCrypto crypto) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: AppColors.background,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
            ),
            child: Center(
              child: Text(crypto.symbol[0], style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16)),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(crypto.name, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                Text(crypto.symbol, style: const TextStyle(color: AppColors.textMuted, fontSize: 12)),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(crypto.price, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
              Text(crypto.change, style: TextStyle(color: crypto.isPositive ? AppColors.success : AppColors.error, fontSize: 12)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _txTile(String title, String amount, String value, String time, bool isIncoming) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: (isIncoming ? AppColors.success : AppColors.primary).withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: (isIncoming ? AppColors.success : AppColors.primary).withValues(alpha: 0.2)),
            ),
            child: Icon(isIncoming ? Icons.arrow_downward : Icons.arrow_upward, size: 18, color: isIncoming ? AppColors.success : AppColors.primary),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.w500, fontSize: 13)),
                Text(time, style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(amount, style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13, color: isIncoming ? AppColors.success : AppColors.textPrimary)),
              Text(value, style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
            ],
          ),
        ],
      ),
    );
  }

  static Widget _statusBadge(String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: color.withValues(alpha: 0.2)),
      ),
      child: Text(text, style: TextStyle(color: color, fontSize: 11, fontWeight: FontWeight.w600)),
    );
  }
}
