import 'dart:math';
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/grid_background.dart';

class LandingScreen extends StatefulWidget {
  const LandingScreen({super.key});

  @override
  State<LandingScreen> createState() => _LandingScreenState();
}

class _LandingScreenState extends State<LandingScreen> with TickerProviderStateMixin {
  late AnimationController _floatController;
  late AnimationController _pulseController;
  late AnimationController _rotateController;
  late Animation<double> _floatAnim;
  late Animation<double> _pulseAnim;
  late Animation<double> _glowAnim;

  @override
  void initState() {
    super.initState();

    // Float up and down
    _floatController = AnimationController(vsync: this, duration: const Duration(milliseconds: 3000))
      ..repeat(reverse: true);
    _floatAnim = Tween<double>(begin: -8, end: 8).animate(
      CurvedAnimation(parent: _floatController, curve: Curves.easeInOut),
    );

    // Scale pulse
    _pulseController = AnimationController(vsync: this, duration: const Duration(milliseconds: 2000))
      ..repeat(reverse: true);
    _pulseAnim = Tween<double>(begin: 1.0, end: 1.06).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );

    // Glow pulse
    _glowAnim = Tween<double>(begin: 0.15, end: 0.4).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );

    // Slow rotate
    _rotateController = AnimationController(vsync: this, duration: const Duration(seconds: 20))
      ..repeat();
  }

  @override
  void dispose() {
    _floatController.dispose();
    _pulseController.dispose();
    _rotateController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GridBackground(
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 28),
            child: Column(
              children: [
                const SizedBox(height: 16),
                // --- Minimal top bar ---
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Image.asset('assets/images/logo.png', width: 28, height: 28),
                    const SizedBox(width: 10),
                    const Text(
                      'TrendUp',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Colors.white),
                    ),
                  ],
                ),
                const Spacer(flex: 3),

                // --- Animated Logo ---
                AnimatedBuilder(
                  animation: Listenable.merge([_floatController, _pulseController, _rotateController]),
                  builder: (context, child) {
                    return Transform.translate(
                      offset: Offset(0, _floatAnim.value),
                      child: Transform.scale(
                        scale: _pulseAnim.value,
                        child: Container(
                          width: 110,
                          height: 110,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(30),
                            boxShadow: [
                              BoxShadow(
                                color: Color(0xFFDC2626).withValues(alpha: _glowAnim.value),
                                blurRadius: 50,
                                spreadRadius: 8,
                              ),
                              BoxShadow(
                                color: Color(0xFFDC2626).withValues(alpha: _glowAnim.value * 0.3),
                                blurRadius: 100,
                                spreadRadius: 20,
                              ),
                            ],
                          ),
                          child: Stack(
                            alignment: Alignment.center,
                            children: [
                              // Rotating ring
                              Transform.rotate(
                                angle: _rotateController.value * 2 * pi,
                                child: Container(
                                  width: 110,
                                  height: 110,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(30),
                                    border: Border.all(
                                      color: const Color(0xFFDC2626).withValues(alpha: 0.2),
                                      width: 1.5,
                                    ),
                                    gradient: SweepGradient(
                                      colors: [
                                        const Color(0xFFDC2626).withValues(alpha: 0.0),
                                        const Color(0xFFDC2626).withValues(alpha: 0.3),
                                        const Color(0xFFDC2626).withValues(alpha: 0.0),
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                              // Logo
                              ClipRRect(
                                borderRadius: BorderRadius.circular(26),
                                child: Image.asset('assets/images/logo.png', width: 96, height: 96, fit: BoxFit.cover),
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 28),

                // --- Title ---
                const Text(
                  'TrendUp',
                  style: TextStyle(
                    fontSize: 38,
                    fontWeight: FontWeight.w900,
                    color: AppColors.textPrimary,
                    letterSpacing: -0.5,
                  ),
                ),
                const SizedBox(height: 8),

                // --- Subtitle ---
                Text(
                  'PRIVATE BY DESIGN',
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w700,
                    color: const Color(0xFFDC2626).withValues(alpha: 0.9),
                    letterSpacing: 4,
                  ),
                ),
                const SizedBox(height: 36),

                // --- Feature Badges ---
                Opacity(
                  opacity: 0.5,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      _featureBadge(Icons.lock, 'E2EE'),
                      _dot(),
                      _featureBadge(Icons.auto_delete, 'Ephemeral'),
                      _dot(),
                      _featureBadge(Icons.account_balance_wallet, 'Integrated'),
                    ],
                  ),
                ),

                const Spacer(flex: 3),

                // --- Primary Button ---
                SizedBox(
                  width: double.infinity,
                  height: 56,
                  child: ElevatedButton(
                    onPressed: () => Navigator.pushNamed(context, '/register'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFDC2626),
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      elevation: 8,
                      shadowColor: const Color(0xFFDC2626).withValues(alpha: 0.4),
                    ),
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.person_add_alt_1, size: 20),
                        SizedBox(width: 10),
                        Text('Create New Account', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, letterSpacing: 0.3)),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 14),

                // --- Secondary Button ---
                SizedBox(
                  width: double.infinity,
                  height: 56,
                  child: OutlinedButton(
                    onPressed: () => Navigator.pushNamed(context, '/signin'),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: Colors.white,
                      backgroundColor: const Color(0xFF1E293B).withValues(alpha: 0.5),
                      side: BorderSide(color: Colors.white.withValues(alpha: 0.1)),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    ),
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.account_balance_wallet_outlined, size: 20),
                        SizedBox(width: 10),
                        Text('Import Existing Wallet', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600, letterSpacing: 0.3)),
                      ],
                    ),
                  ),
                ),

                const Spacer(flex: 1),

                // --- Trust Footer ---
                Opacity(
                  opacity: 0.35,
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.lock_outline, size: 12, color: AppColors.textPrimary),
                          const SizedBox(width: 6),
                          const Text(
                            'End-to-End Encrypted',
                            style: TextStyle(color: AppColors.textPrimary, fontSize: 11, fontWeight: FontWeight.w600),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      const SizedBox(
                        width: 260,
                        child: Text(
                          'Your keys, your data. TrendUp never stores your private messages or identity on central servers.',
                          textAlign: TextAlign.center,
                          style: TextStyle(color: AppColors.textPrimary, fontSize: 10, height: 1.5),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _featureBadge(IconData icon, String label) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, size: 11, color: AppColors.textPrimary),
        const SizedBox(width: 5),
        Text(label, style: const TextStyle(color: AppColors.textPrimary, fontSize: 11, fontWeight: FontWeight.w500)),
      ],
    );
  }

  Widget _dot() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      child: Container(
        width: 3,
        height: 3,
        decoration: const BoxDecoration(color: AppColors.textPrimary, shape: BoxShape.circle),
      ),
    );
  }
}
