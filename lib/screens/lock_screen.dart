import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class LockScreen extends StatefulWidget {
  const LockScreen({super.key});

  @override
  State<LockScreen> createState() => _LockScreenState();
}

class _LockScreenState extends State<LockScreen> {
  final List<int?> _pin = List.filled(6, null);
  int _currentIndex = 0;

  void _onKeyPress(int number) {
    if (_currentIndex < 6) {
      setState(() {
        _pin[_currentIndex] = number;
        _currentIndex++;
      });
      if (_currentIndex == 6) {
        final nav = Navigator.of(context);
        Future.delayed(const Duration(milliseconds: 300), () {
          nav.pushNamedAndRemoveUntil('/home', (r) => false);
        });
      }
    }
  }

  void _onDelete() {
    if (_currentIndex > 0) {
      setState(() {
        _currentIndex--;
        _pin[_currentIndex] = null;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.shield, color: AppColors.primary, size: 24),
                const SizedBox(width: 8),
                const Text('TrendUp', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
              ],
            ),
            const Spacer(flex: 2),
            const Text('Session Locked', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800)),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: AppColors.success.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(4),
              ),
              child: const Text('E2EE ACTIVE', style: TextStyle(color: AppColors.success, fontSize: 10, fontWeight: FontWeight.w700, letterSpacing: 1)),
            ),
            const SizedBox(height: 16),
            const Text('Enter your 6-digit PIN', style: TextStyle(color: AppColors.textSecondary)),
            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(6, (i) => _pinDot(i)),
            ),
            const Spacer(),
            _buildKeypad(),
            const SizedBox(height: 16),
            TextButton(
              onPressed: () {},
              child: const Text('Forgot PIN? Use Password', style: TextStyle(color: AppColors.primary, fontSize: 13)),
            ),
            TextButton(
              onPressed: () => Navigator.pushNamedAndRemoveUntil(context, '/landing', (r) => false),
              child: const Text('Sign Out', style: TextStyle(color: AppColors.textMuted, fontSize: 13)),
            ),
            const SizedBox(height: 8),
            Text('Device: Secure Element Active', style: TextStyle(color: AppColors.textMuted, fontSize: 11)),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  Widget _pinDot(int index) {
    final filled = _pin[index] != null;
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 8),
      width: 16,
      height: 16,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: filled ? AppColors.primary : Colors.transparent,
        border: Border.all(color: filled ? AppColors.primary : AppColors.textMuted, width: 2),
      ),
    );
  }

  Widget _buildKeypad() {
    return Column(
      children: [
        Row(mainAxisAlignment: MainAxisAlignment.center, children: [_keyButton(1), _keyButton(2), _keyButton(3)]),
        Row(mainAxisAlignment: MainAxisAlignment.center, children: [_keyButton(4), _keyButton(5), _keyButton(6)]),
        Row(mainAxisAlignment: MainAxisAlignment.center, children: [_keyButton(7), _keyButton(8), _keyButton(9)]),
        Row(mainAxisAlignment: MainAxisAlignment.center, children: [
          const SizedBox(width: 80, height: 64),
          _keyButton(0),
          SizedBox(
            width: 80,
            height: 64,
            child: IconButton(onPressed: _onDelete, icon: const Icon(Icons.backspace_outlined, color: AppColors.textSecondary)),
          ),
        ]),
      ],
    );
  }

  Widget _keyButton(int number) {
    return SizedBox(
      width: 80,
      height: 64,
      child: TextButton(
        onPressed: () => _onKeyPress(number),
        child: Text('$number', style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w300, color: AppColors.textPrimary)),
      ),
    );
  }
}
