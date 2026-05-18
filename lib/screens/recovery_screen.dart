import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';
import '../widgets/grid_background.dart';

class RecoveryScreen extends StatefulWidget {
  const RecoveryScreen({super.key});

  @override
  State<RecoveryScreen> createState() => _RecoveryScreenState();
}

class _RecoveryScreenState extends State<RecoveryScreen> {
  int _step = 0;
  bool _obscureNew = true;
  bool _obscureConfirm = true;

  static const Color _emerald500 = AppColors.success;
  static const Color _red600 = AppColors.primary;
  static const Color _slate400 = AppColors.textSecondary;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GridBackground(
        child: SafeArea(
          child: Column(
            children: [
              // --- Top Bar ---
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                child: Row(
                  children: [
                    GestureDetector(
                      onTap: () {
                        if (_step > 0) {
                          setState(() => _step--);
                        } else {
                          Navigator.pop(context);
                        }
                      },
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
                    const Text('Recovery', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: Colors.white)),
                    const Spacer(),
                    // Step badge
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                      decoration: BoxDecoration(
                        color: _step == 2 ? _emerald500.withValues(alpha: 0.15) : _red600.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        '${_step + 1}/3',
                        style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: _step == 2 ? _emerald500 : _red600),
                      ),
                    ),
                  ],
                ),
              ),
              // --- Content ---
              Expanded(
                child: _step == 0
                    ? _enterPhrase()
                    : _step == 1
                        ? _verifyStep()
                        : _resetPassword(),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // --- Step 1: Enter Recovery Phrase ---
  Widget _enterPhrase() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Icon + Title
          Container(
            width: 56, height: 56,
            decoration: BoxDecoration(
              color: _red600.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(16),
            ),
            child: const Icon(Icons.key, color: _red600, size: 26),
          ),
          const SizedBox(height: 16),
          const Text('Enter Recovery Phrase', style: TextStyle(fontSize: 26, fontWeight: FontWeight.w900, color: Colors.white)),
          const SizedBox(height: 8),
          Text(
            'Enter the 12-word phrase you saved during account setup to recover your identity.',
            style: TextStyle(color: Colors.white.withValues(alpha: 0.5), fontSize: 14, height: 1.5),
          ),
          const SizedBox(height: 24),

          // Word grid (2 columns)
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2, childAspectRatio: 4, crossAxisSpacing: 10, mainAxisSpacing: 10,
            ),
            itemCount: 12,
            itemBuilder: (context, index) {
              return Container(
                padding: const EdgeInsets.symmetric(horizontal: 14),
                decoration: BoxDecoration(
                  color: AppColors.surfaceLight.withValues(alpha: 0.7),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
                ),
                child: Row(
                  children: [
                    SizedBox(width: 20, child: Text('${index + 1}', style: TextStyle(color: _slate400, fontSize: 11, fontWeight: FontWeight.w600))),
                    const SizedBox(width: 8),
                    Text(MockData.recoveryPhrase[index], style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w600)),
                  ],
                ),
              );
            },
          ),
          const SizedBox(height: 16),

          // Paste button
          SizedBox(
            width: double.infinity,
            height: 44,
            child: OutlinedButton.icon(
              onPressed: () {},
              icon: Icon(Icons.content_paste, size: 16, color: _slate400),
              label: Text('Paste from clipboard', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: _slate400)),
              style: OutlinedButton.styleFrom(
                side: BorderSide(color: Colors.white.withValues(alpha: 0.1)),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
          ),
          const SizedBox(height: 24),

          // Verify button
          SizedBox(
            width: double.infinity,
            height: 56,
            child: ElevatedButton(
              onPressed: () => setState(() => _step = 1),
              style: ElevatedButton.styleFrom(
                backgroundColor: _red600,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                elevation: 6,
                shadowColor: _red600.withValues(alpha: 0.3),
              ),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.verified_user_outlined, size: 20),
                  SizedBox(width: 10),
                  Text('Verify Phrase', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          Center(
            child: GestureDetector(
              onTap: () => Navigator.pop(context),
              child: Text('Back to Sign In', style: TextStyle(color: _slate400, fontSize: 13, fontWeight: FontWeight.w600)),
            ),
          ),
        ],
      ),
    );
  }

  // --- Step 2: Verify Words ---
  Widget _verifyStep() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 56, height: 56,
            decoration: BoxDecoration(
              color: AppColors.accent.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(16),
            ),
            child: const Icon(Icons.quiz, color: AppColors.accent, size: 26),
          ),
          const SizedBox(height: 16),
          const Text('Verify Recovery', style: TextStyle(fontSize: 26, fontWeight: FontWeight.w900, color: Colors.white)),
          const SizedBox(height: 8),
          Text(
            'Select the correct words from your phrase to confirm your identity.',
            style: TextStyle(color: Colors.white.withValues(alpha: 0.5), fontSize: 14, height: 1.5),
          ),
          const SizedBox(height: 28),

          _verifyCard('Word #3', ['velvet', 'canyon', 'fossil', 'anchor'], 0),
          const SizedBox(height: 16),
          _verifyCard('Word #7', ['drift', 'ember', 'summit', 'nexus'], 2),
          const SizedBox(height: 16),
          _verifyCard('Word #11', ['forge', 'pulse', 'blaze', 'prism'], 0),
          const SizedBox(height: 32),

          SizedBox(
            width: double.infinity,
            height: 56,
            child: ElevatedButton(
              onPressed: () => setState(() => _step = 2),
              style: ElevatedButton.styleFrom(
                backgroundColor: _red600,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                elevation: 6,
                shadowColor: _red600.withValues(alpha: 0.3),
              ),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.check_circle_outline, size: 20),
                  SizedBox(width: 10),
                  Text('Confirm Identity', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _verifyCard(String label, List<String> options, int correctIndex) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surfaceLight.withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13, color: _slate400)),
          const SizedBox(height: 10),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: options.asMap().entries.map((entry) {
              final isCorrect = entry.key == correctIndex;
              return GestureDetector(
                onTap: () {},
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                  decoration: BoxDecoration(
                    color: isCorrect ? _red600.withValues(alpha: 0.15) : Colors.white.withValues(alpha: 0.04),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(
                      color: isCorrect ? _red600.withValues(alpha: 0.5) : Colors.white.withValues(alpha: 0.08),
                    ),
                  ),
                  child: Text(
                    entry.value,
                    style: TextStyle(
                      color: isCorrect ? _red600 : Colors.white.withValues(alpha: 0.7),
                      fontSize: 13,
                      fontWeight: isCorrect ? FontWeight.w700 : FontWeight.w500,
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  // --- Step 3: Reset Password ---
  Widget _resetPassword() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Success banner
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: _emerald500.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: _emerald500.withValues(alpha: 0.2)),
            ),
            child: Row(
              children: [
                Container(
                  width: 24, height: 24,
                  decoration: const BoxDecoration(color: _emerald500, shape: BoxShape.circle),
                  child: const Icon(Icons.check, size: 14, color: Colors.white),
                ),
                const SizedBox(width: 12),
                const Text('Identity verified successfully', style: TextStyle(color: _emerald500, fontSize: 14, fontWeight: FontWeight.w700)),
              ],
            ),
          ),
          const SizedBox(height: 24),

          const Text('Set New Password', style: TextStyle(fontSize: 26, fontWeight: FontWeight.w900, color: Colors.white)),
          const SizedBox(height: 8),
          Text(
            'Create a strong password to secure your encrypted account and wallet access.',
            style: TextStyle(color: _slate400, fontSize: 14, height: 1.5),
          ),
          const SizedBox(height: 28),

          // New Password
          Text('NEW PASSWORD', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: _slate400, letterSpacing: 1.5)),
          const SizedBox(height: 8),
          _passwordField(obscure: _obscureNew, onToggle: () => setState(() => _obscureNew = !_obscureNew), prefixIcon: Icons.lock_outline),
          const SizedBox(height: 10),

          // Strength bars
          Row(
            children: [
              for (int i = 0; i < 4; i++) ...[
                if (i > 0) const SizedBox(width: 6),
                Expanded(child: Container(height: 4, decoration: BoxDecoration(color: _emerald500, borderRadius: BorderRadius.circular(2)))),
              ],
            ],
          ),
          const SizedBox(height: 6),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('VERY STRONG', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: _emerald500)),
              Text('Encryption: AES-256', style: TextStyle(fontSize: 10, color: _slate400)),
            ],
          ),
          const SizedBox(height: 24),

          // Confirm Password
          Text('CONFIRM PASSWORD', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: _slate400, letterSpacing: 1.5)),
          const SizedBox(height: 8),
          _passwordField(obscure: _obscureConfirm, onToggle: () => setState(() => _obscureConfirm = !_obscureConfirm), prefixIcon: Icons.verified_user_outlined),
          const SizedBox(height: 24),

          // Checklist
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.surfaceLight.withValues(alpha: 0.4),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.white.withValues(alpha: 0.05)),
            ),
            child: Column(
              children: [
                _checkItem('Minimum 12 characters', true),
                const SizedBox(height: 8),
                _checkItem('Uppercase & lowercase letters', true),
                const SizedBox(height: 8),
                _checkItem('Include numbers and symbols', true),
                const SizedBox(height: 8),
                _checkItem('Passwords match', false),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Warning
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: _red600.withValues(alpha: 0.05),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: _red600.withValues(alpha: 0.1)),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Icon(Icons.error_outline, color: _red600, size: 18),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Security Enforcement', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w700)),
                      const SizedBox(height: 4),
                      Text(
                        'All existing sessions on other devices will be signed out upon password reset.',
                        style: TextStyle(color: Colors.white.withValues(alpha: 0.5), fontSize: 11, height: 1.4),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Reset button
          SizedBox(
            width: double.infinity,
            height: 56,
            child: ElevatedButton(
              onPressed: () => Navigator.pushNamedAndRemoveUntil(context, '/home', (r) => false),
              style: ElevatedButton.styleFrom(
                backgroundColor: _red600,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                elevation: 6,
                shadowColor: _red600.withValues(alpha: 0.3),
              ),
              child: const Text('Reset Password', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800)),
            ),
          ),
          const SizedBox(height: 12),
          Center(
            child: GestureDetector(
              onTap: () => Navigator.pop(context),
              child: Text('Cancel and Return', style: TextStyle(color: _slate400, fontSize: 14, fontWeight: FontWeight.w600)),
            ),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }

  Widget _passwordField({required bool obscure, required VoidCallback onToggle, required IconData prefixIcon}) {
    return Container(
      height: 52,
      decoration: BoxDecoration(
        color: AppColors.surfaceLight.withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
      ),
      child: Row(
        children: [
          const SizedBox(width: 16),
          Icon(prefixIcon, size: 16, color: Colors.white.withValues(alpha: 0.3)),
          Expanded(
            child: TextField(
              obscureText: obscure,
              style: const TextStyle(color: Colors.white, fontSize: 14),
              decoration: InputDecoration(
                hintText: '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022',
                hintStyle: TextStyle(color: Colors.white.withValues(alpha: 0.15)),
                border: InputBorder.none,
                contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 16),
              ),
            ),
          ),
          GestureDetector(
            onTap: onToggle,
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Icon(obscure ? Icons.visibility_off : Icons.visibility, size: 18, color: Colors.white.withValues(alpha: 0.3)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _checkItem(String text, bool valid) {
    return Row(
      children: [
        Icon(valid ? Icons.check_circle : Icons.circle_outlined, size: 16, color: valid ? _emerald500 : _slate400),
        const SizedBox(width: 8),
        Text(text, style: TextStyle(color: valid ? _emerald500 : _slate400, fontSize: 13)),
      ],
    );
  }
}
