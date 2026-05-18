import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/grid_background.dart';

class ForgotPasswordScreen extends StatelessWidget {
  const ForgotPasswordScreen({super.key});

  static const Color _red600 = AppColors.primary;
  static const Color _slate400 = AppColors.textSecondary;
  static const Color _emerald500 = AppColors.success;

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
                          color: AppColors.surfaceLight,
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
                    const SizedBox(width: 40),
                  ],
                ),
                const SizedBox(height: 40),

                // --- Icon ---
                Container(
                  width: 72, height: 72,
                  decoration: BoxDecoration(
                    color: _red600.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: const Icon(Icons.lock_reset, color: _red600, size: 36),
                ),
                const SizedBox(height: 24),
                const Text('Forgot Password?', style: TextStyle(fontSize: 26, fontWeight: FontWeight.w900, color: Colors.white)),
                const SizedBox(height: 8),
                Text(
                  'Enter your TrendUp handle or email and we\'ll send you a secure reset link.',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.white.withValues(alpha: 0.5), fontSize: 14, height: 1.5),
                ),
                const SizedBox(height: 36),

                // --- Glass card ---
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: AppColors.surfaceLight.withValues(alpha: 0.7),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
                    boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.2), blurRadius: 20, offset: const Offset(0, 8))],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('HANDLE OR EMAIL', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: _slate400, letterSpacing: 1.5)),
                      const SizedBox(height: 8),
                      Container(
                        height: 52,
                        decoration: BoxDecoration(
                          color: AppColors.background.withValues(alpha: 0.6),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
                        ),
                        child: TextField(
                          style: const TextStyle(color: Colors.white, fontSize: 14),
                          decoration: InputDecoration(
                            hintText: '@username or email',
                            hintStyle: TextStyle(color: Colors.white.withValues(alpha: 0.2)),
                            border: InputBorder.none,
                            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                            prefixIcon: Icon(Icons.alternate_email, size: 18, color: Colors.white.withValues(alpha: 0.3)),
                          ),
                        ),
                      ),
                      const SizedBox(height: 24),

                      // Send reset link button
                      SizedBox(
                        width: double.infinity,
                        height: 56,
                        child: ElevatedButton(
                          onPressed: () {
                            // Show success snackbar
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Row(
                                  children: [
                                    const Icon(Icons.check_circle, color: Colors.white, size: 18),
                                    const SizedBox(width: 10),
                                    const Text('Reset link sent! Check your inbox.'),
                                  ],
                                ),
                                backgroundColor: _emerald500,
                                behavior: SnackBarBehavior.floating,
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                              ),
                            );
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: _red600,
                            foregroundColor: Colors.white,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                            elevation: 6,
                            shadowColor: _red600.withValues(alpha: 0.3),
                          ),
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.send_rounded, size: 20),
                              SizedBox(width: 10),
                              Text('Send Reset Link', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),

                // --- Divider ---
                Row(
                  children: [
                    Expanded(child: Divider(color: Colors.white.withValues(alpha: 0.08))),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: Text('OR', style: TextStyle(color: Colors.white.withValues(alpha: 0.3), fontSize: 12, fontWeight: FontWeight.w700, letterSpacing: 1)),
                    ),
                    Expanded(child: Divider(color: Colors.white.withValues(alpha: 0.08))),
                  ],
                ),
                const SizedBox(height: 20),

                // --- Recovery Phrase button ---
                SizedBox(
                  width: double.infinity,
                  height: 56,
                  child: OutlinedButton(
                    onPressed: () => Navigator.pushNamed(context, '/recovery'),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: Colors.white,
                      side: BorderSide(color: Colors.white.withValues(alpha: 0.1)),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    ),
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.key, size: 18),
                        SizedBox(width: 10),
                        Text('Use Recovery Phrase', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700)),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  'If you saved your 12-word recovery phrase,\nyou can reset your password directly.',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.white.withValues(alpha: 0.3), fontSize: 12, height: 1.5),
                ),
                const SizedBox(height: 36),

                // --- E2EE badge ---
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                  decoration: BoxDecoration(
                    color: _emerald500.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: _emerald500.withValues(alpha: 0.15)),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.lock, size: 13, color: _emerald500),
                      const SizedBox(width: 8),
                      const Text('Secure Password Recovery', style: TextStyle(color: _emerald500, fontSize: 11, fontWeight: FontWeight.w600)),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
