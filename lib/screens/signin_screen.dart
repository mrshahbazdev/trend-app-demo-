import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/grid_background.dart';

class SignInScreen extends StatefulWidget {
  const SignInScreen({super.key});

  @override
  State<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  bool _obscurePassword = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GridBackground(
        child: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              children: [
                const SizedBox(height: 12),
                // --- Top Bar ---
                Row(
                  children: [
                    GestureDetector(
                      onTap: () => Navigator.pop(context),
                      child: Container(
                        width: 40, height: 40,
                        decoration: BoxDecoration(
                          color: const Color(0xFF1E293B),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
                        ),
                        child: const Icon(Icons.arrow_back_ios_new, size: 16, color: Colors.white),
                      ),
                    ),
                    const Spacer(),
                    Image.asset('assets/images/logo.png', width: 32, height: 32),
                    const SizedBox(width: 8),
                    const Text('TrendUp', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: Colors.white)),
                    const Spacer(),
                    const SizedBox(width: 40), // Balance
                  ],
                ),
                const SizedBox(height: 28),

                // --- Hero ---
                Container(
                  width: 64, height: 64,
                  decoration: BoxDecoration(
                    color: const Color(0xFF1E293B),
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
                    boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.3), blurRadius: 20)],
                  ),
                  child: Image.asset('assets/images/logo.png', width: 40, height: 40),
                ),
                const SizedBox(height: 16),
                const Text('Access Vault', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900, color: Colors.white, letterSpacing: -0.3)),
                const SizedBox(height: 6),
                Text(
                  'PRIVATE BY DESIGN · E2E ENCRYPTED',
                  style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: Colors.white.withValues(alpha: 0.4), letterSpacing: 2),
                ),
                const SizedBox(height: 28),

                // --- Card 1: Username & Password ---
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: const Color(0xFF1E293B).withValues(alpha: 0.7),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
                    boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.2), blurRadius: 20, offset: const Offset(0, 8))],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Badge
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: AppColors.primary.withValues(alpha: 0.1),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: const Text('USERNAME · PASSWORD', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: AppColors.primary, letterSpacing: 0.5)),
                          ),
                          Icon(Icons.key, size: 16, color: Colors.white.withValues(alpha: 0.2)),
                        ],
                      ),
                      const SizedBox(height: 20),

                      // Handle
                      Text('TrendUp Handle', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: Colors.white.withValues(alpha: 0.5))),
                      const SizedBox(height: 6),
                      _darkInput(hintText: '@username', prefixText: null),
                      const SizedBox(height: 16),

                      // Password
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Master Password', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: Colors.white.withValues(alpha: 0.5))),
                          GestureDetector(
                            onTap: () => Navigator.pushNamed(context, '/forgot'),
                            child: const Text('Forgot?', style: TextStyle(color: AppColors.primary, fontSize: 11, fontWeight: FontWeight.w600)),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Container(
                        height: 48,
                        decoration: BoxDecoration(
                          color: const Color(0xFF0F172A).withValues(alpha: 0.6),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
                        ),
                        child: TextField(
                          obscureText: _obscurePassword,
                          style: const TextStyle(color: Colors.white, fontSize: 14),
                          decoration: InputDecoration(
                            hintText: '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022',
                            hintStyle: TextStyle(color: Colors.white.withValues(alpha: 0.2)),
                            border: InputBorder.none,
                            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                            suffixIcon: GestureDetector(
                              onTap: () => setState(() => _obscurePassword = !_obscurePassword),
                              child: Icon(_obscurePassword ? Icons.visibility_off : Icons.visibility, size: 18, color: Colors.white.withValues(alpha: 0.2)),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),

                      // Buttons row
                      Row(
                        children: [
                          Expanded(
                            child: SizedBox(
                              height: 48,
                              child: OutlinedButton(
                                onPressed: () => Navigator.pushNamed(context, '/register'),
                                style: OutlinedButton.styleFrom(
                                  foregroundColor: Colors.white,
                                  side: BorderSide(color: Colors.white.withValues(alpha: 0.1)),
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                ),
                                child: const Text('Register', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700)),
                              ),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            flex: 2,
                            child: SizedBox(
                              height: 48,
                              child: ElevatedButton(
                                onPressed: () => Navigator.pushNamedAndRemoveUntil(context, '/home', (r) => false),
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: AppColors.primary,
                                  foregroundColor: Colors.white,
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                  elevation: 6,
                                  shadowColor: AppColors.primary.withValues(alpha: 0.3),
                                ),
                                child: const Text('Sign in', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700)),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),

                // --- Card 2: Web3 Wallet (stacked offset) ---
                Transform.translate(
                  offset: const Offset(0, -12),
                  child: Container(
                    padding: const EdgeInsets.fromLTRB(20, 28, 20, 20),
                    decoration: BoxDecoration(
                      color: const Color(0xFF1E293B).withValues(alpha: 0.7),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
                    ),
                    child: Column(
                      children: [
                        // Badge
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                              decoration: BoxDecoration(
                                color: const Color(0xFF0D9488).withValues(alpha: 0.1),
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: const Text('WEB3 WALLET', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: Color(0xFF2DD4BF), letterSpacing: 0.5)),
                            ),
                            Row(
                              children: [
                                Container(width: 6, height: 6, decoration: const BoxDecoration(color: Color(0xFF14B8A6), shape: BoxShape.circle)),
                                const SizedBox(width: 6),
                                Text('DECENTRALIZED', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: const Color(0xFF14B8A6).withValues(alpha: 0.8), letterSpacing: 0.5)),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),

                        // Wallet buttons
                        Row(
                          children: [
                            Expanded(
                              child: SizedBox(
                                height: 48,
                                child: ElevatedButton.icon(
                                  onPressed: () => _connectBrowserWallet(),
                                  icon: const Icon(Icons.power, size: 16),
                                  label: const Text('Browser Wallet', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: const Color(0xFF0D9488),
                                    foregroundColor: Colors.white,
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 10),
                            Expanded(
                              child: SizedBox(
                                height: 48,
                                child: OutlinedButton.icon(
                                  onPressed: () => _showPasteAddress(),
                                  icon: const Icon(Icons.content_paste, size: 16),
                                  label: const Text('Paste Address', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
                                  style: OutlinedButton.styleFrom(
                                    foregroundColor: Colors.white,
                                    side: BorderSide(color: Colors.white.withValues(alpha: 0.1)),
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 4),

                // --- E2EE Badge ---
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                  decoration: BoxDecoration(
                    color: const Color(0xFF10B981).withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: const Color(0xFF10B981).withValues(alpha: 0.15)),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.lock, size: 13, color: Color(0xFF10B981)),
                      const SizedBox(width: 8),
                      const Text('End-to-End Encrypted Session', style: TextStyle(color: Color(0xFF10B981), fontSize: 11, fontWeight: FontWeight.w600)),
                    ],
                  ),
                ),
                const SizedBox(height: 20),

                // --- Create account link ---
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text('No account? ', style: TextStyle(color: Colors.white.withValues(alpha: 0.4), fontSize: 13)),
                    GestureDetector(
                      onTap: () => Navigator.pushNamed(context, '/register'),
                      child: const Text('Create one', style: TextStyle(color: AppColors.primary, fontSize: 13, fontWeight: FontWeight.w700)),
                    ),
                  ],
                ),
                const SizedBox(height: 24),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _connectBrowserWallet() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (_) => AlertDialog(
        backgroundColor: const Color(0xFF1E293B),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        content: Column(mainAxisSize: MainAxisSize.min, children: [
          const SizedBox(height: 12),
          const CircularProgressIndicator(color: Color(0xFF0D9488), strokeWidth: 3),
          const SizedBox(height: 20),
          const Text('Connecting wallet...', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 15)),
          const SizedBox(height: 8),
          Text('Waiting for browser extension', style: TextStyle(color: Colors.white.withValues(alpha: 0.5), fontSize: 12)),
        ]),
      ),
    );
    Future.delayed(const Duration(seconds: 2), () {
      if (!mounted) return;
      Navigator.pop(context); // close dialog
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: const Text('✓ Wallet connected: 0x7a3b...f9e2', style: TextStyle(fontWeight: FontWeight.w600)),
        backgroundColor: const Color(0xFF0D9488),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ));
      Future.delayed(const Duration(milliseconds: 800), () {
        if (!mounted) return;
        Navigator.pushNamedAndRemoveUntil(context, '/home', (r) => false);
      });
    });
  }

  void _showPasteAddress() {
    final controller = TextEditingController();
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        backgroundColor: const Color(0xFF1E293B),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text('Paste Wallet Address', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 16)),
        content: Column(mainAxisSize: MainAxisSize.min, children: [
          Container(
            height: 48,
            decoration: BoxDecoration(
              color: const Color(0xFF0F172A).withValues(alpha: 0.6),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
            ),
            child: TextField(
              controller: controller,
              style: const TextStyle(color: Colors.white, fontSize: 13),
              decoration: InputDecoration(
                hintText: '0x... or ENS name',
                hintStyle: TextStyle(color: Colors.white.withValues(alpha: 0.2)),
                border: InputBorder.none,
                contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
              ),
            ),
          ),
          const SizedBox(height: 8),
          Text('Enter your wallet address or ENS domain', style: TextStyle(fontSize: 11, color: Colors.white.withValues(alpha: 0.4))),
        ]),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel', style: TextStyle(color: Colors.white.withValues(alpha: 0.5))),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              final addr = controller.text.isNotEmpty ? controller.text : '0x7a3b...f9e2';
              ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                content: Text('✓ Connected: ${addr.length > 12 ? '${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}' : addr}',
                  style: const TextStyle(fontWeight: FontWeight.w600)),
                backgroundColor: const Color(0xFF0D9488),
                behavior: SnackBarBehavior.floating,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ));
              Future.delayed(const Duration(milliseconds: 800), () {
                if (!mounted) return;
                Navigator.pushNamedAndRemoveUntil(context, '/home', (r) => false);
              });
            },
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF0D9488), foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10))),
            child: const Text('Connect', style: TextStyle(fontWeight: FontWeight.w700)),
          ),
        ],
      ),
    );
  }

  Widget _darkInput({required String hintText, String? prefixText}) {
    return Container(
      height: 48,
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A).withValues(alpha: 0.6),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
      ),
      child: TextField(
        style: const TextStyle(color: Colors.white, fontSize: 14),
        decoration: InputDecoration(
          hintText: hintText,
          hintStyle: TextStyle(color: Colors.white.withValues(alpha: 0.2)),
          border: InputBorder.none,
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        ),
      ),
    );
  }
}
