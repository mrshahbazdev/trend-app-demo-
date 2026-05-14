import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';

class WalletScreen extends StatelessWidget {
  const WalletScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wallet'),
        actions: [
          IconButton(icon: const Icon(Icons.qr_code_scanner), onPressed: () {}),
          IconButton(icon: const Icon(Icons.more_vert), onPressed: () {}),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [AppColors.primary.withValues(alpha: 0.3), AppColors.surface],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.primary.withValues(alpha: 0.2)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Text('Balance', style: TextStyle(color: AppColors.textSecondary, fontSize: 13)),
                      const Spacer(),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(color: AppColors.success.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(4)),
                        child: const Text('CONNECTED', style: TextStyle(color: AppColors.success, fontSize: 10, fontWeight: FontWeight.w700)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  const Text('\$12,847.50', style: TextStyle(fontSize: 36, fontWeight: FontWeight.w800)),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(color: AppColors.success.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(4)),
                        child: const Text('+\$342.18 (2.73%)', style: TextStyle(color: AppColors.success, fontSize: 12, fontWeight: FontWeight.w500)),
                      ),
                      const SizedBox(width: 8),
                      const Text('Today', style: TextStyle(color: AppColors.textMuted, fontSize: 12)),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      const Icon(Icons.account_balance_wallet, size: 14, color: AppColors.textMuted),
                      const SizedBox(width: 6),
                      const Text('0x71C...4f92', style: TextStyle(color: AppColors.textSecondary, fontSize: 12, fontFamily: 'monospace')),
                      const SizedBox(width: 8),
                      const Icon(Icons.copy, size: 12, color: AppColors.textMuted),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                _walletAction(Icons.arrow_upward, 'Send'),
                const SizedBox(width: 12),
                _walletAction(Icons.arrow_downward, 'Receive'),
                const SizedBox(width: 12),
                _walletAction(Icons.swap_horiz, 'Swap'),
              ],
            ),
            const SizedBox(height: 24),
            const Text('Assets', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
            const SizedBox(height: 12),
            ...MockData.cryptoData.map(_assetTile),
            const SizedBox(height: 24),
            const Text('Recent Transactions', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
            const SizedBox(height: 12),
            _txTile('Sent to 0x4a...2e', '-0.15 ETH', '\$571.84', 'Oct 24, 14:32', false),
            _txTile('Received from Vault', '+200 USDC', '\$200.00', 'Oct 23, 09:15', true),
            _txTile('Swap ETH → SOL', '-0.5 ETH', '\$1,906.12', 'Oct 22, 18:45', false),
          ],
        ),
      ),
    );
  }

  Widget _walletAction(IconData icon, String label) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 16),
        decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppColors.border)),
        child: Column(
          children: [
            Icon(icon, color: AppColors.primary),
            const SizedBox(height: 6),
            Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500)),
          ],
        ),
      ),
    );
  }

  Widget _assetTile(MockCrypto crypto) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          CircleAvatar(
            radius: 20,
            backgroundColor: AppColors.surfaceLight,
            child: Text(crypto.symbol[0], style: const TextStyle(fontWeight: FontWeight.w700)),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(crypto.name, style: const TextStyle(fontWeight: FontWeight.w600)),
                Text(crypto.symbol, style: const TextStyle(color: AppColors.textMuted, fontSize: 12)),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(crypto.price, style: const TextStyle(fontWeight: FontWeight.w600)),
              Text(crypto.change, style: TextStyle(color: crypto.isPositive ? AppColors.success : AppColors.error, fontSize: 12)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _txTile(String title, String amount, String value, String time, bool isIncoming) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(color: (isIncoming ? AppColors.success : AppColors.primary).withValues(alpha: 0.15), borderRadius: BorderRadius.circular(8)),
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
}
