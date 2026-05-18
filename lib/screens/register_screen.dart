import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';
import '../widgets/grid_background.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  int _currentStep = 0;
  int _securityOption = 0; // 0=phrase, 1=wallet, 2=skip
  bool _obscurePass = true;
  bool _obscureConfirm = true;

  final _handleController = TextEditingController();
  final _displayController = TextEditingController();
  final _passController = TextEditingController();
  final _confirmController = TextEditingController();

  String _password = '';
  String _confirmPassword = '';
  String _handle = '';
  
  
  
  
  

  // Password checks
  bool get _has8Chars => _password.length >= 8;
  bool get _hasUpper => _password.contains(RegExp(r'[A-Z]'));
  bool get _hasNumber => _password.contains(RegExp(r'[0-9]'));
  bool get _hasSpecial => _password.contains(RegExp(r'[!@#\$%^&*(),.?":{}|<>]'));
  bool get _passwordsMatch => _password.isNotEmpty && _password == _confirmPassword;
  int get _strengthCount => [_has8Chars, _hasUpper, _hasNumber, _hasSpecial].where((v) => v).length;

  String get _strengthLabel {
    if (_password.isEmpty) return '';
    switch (_strengthCount) {
      case 0: case 1: return 'WEAK';
      case 2: return 'FAIR';
      case 3: return 'STRONG';
      case 4: return 'VERY STRONG';
      default: return '';
    }
  }

  Color get _strengthColor {
    switch (_strengthCount) {
      case 0: case 1: return AppColors.primary;
      case 2: return AppColors.warning;
      case 3: return AppColors.success;
      case 4: return AppColors.successDark;
      default: return AppColors.textSecondary;
    }
  }

  bool get _handleValid => _handle.length >= 3;

  @override
  void initState() {
    super.initState();
    _handleController.addListener(() => setState(() => _handle = _handleController.text));
    _passController.addListener(() => setState(() => _password = _passController.text));
    _confirmController.addListener(() => setState(() => _confirmPassword = _confirmController.text));
  }

  @override
  void dispose() {
    _handleController.dispose();
    _displayController.dispose();
    _passController.dispose();
    _confirmController.dispose();
    super.dispose();
  }

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
                        if (_currentStep > 0) {
                          setState(() => _currentStep--);
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
                    const Text('TrendUp', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: Colors.white)),
                    const Spacer(),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                      decoration: BoxDecoration(
                        color: _currentStep == 2 ? AppColors.success.withValues(alpha: 0.15) : AppColors.primary.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        '${_currentStep + 1}/3',
                        style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: _currentStep == 2 ? AppColors.success : AppColors.primary),
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(child: _buildStep()),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStep() {
    switch (_currentStep) {
      case 0: return _buildIdentityStep();
      case 1: return _buildSecurityStep();
      case 2: return _buildCompleteStep();
      default: return _buildIdentityStep();
    }
  }

  // --- Dark glass input ---
  Widget _glassInput({String? hint, String? prefixText, Widget? suffix, bool obscure = false, TextEditingController? controller}) {
    return Container(
      height: 52,
      decoration: BoxDecoration(
        color: AppColors.surfaceLight.withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
      ),
      child: TextField(
        controller: controller,
        obscureText: obscure,
        style: const TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w500),
        decoration: InputDecoration(
          hintText: hint,
          prefixText: prefixText,
          prefixStyle: TextStyle(color: AppColors.textSecondary, fontWeight: FontWeight.w500),
          hintStyle: TextStyle(color: Colors.white.withValues(alpha: 0.2)),
          border: InputBorder.none,
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
          suffixIcon: suffix,
        ),
      ),
    );
  }

  // --- STEP 1: Create Identity ---
  Widget _buildIdentityStep() {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Step indicator
          Row(
            children: [
              Text('STEP 1 OF 3', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.primary, letterSpacing: 1.5)),
              const SizedBox(width: 12),
              Expanded(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: 0.33,
                    backgroundColor: Colors.white.withValues(alpha: 0.08),
                    valueColor: AlwaysStoppedAnimation(AppColors.primary),
                    minHeight: 4,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          const Text('Create your identity', style: TextStyle(fontSize: 26, fontWeight: FontWeight.w900, color: Colors.white)),
          const SizedBox(height: 6),
          Text(
            'Set up your secure handle and password for TrendUp.',
            style: TextStyle(color: Colors.white.withValues(alpha: 0.5), fontSize: 14, height: 1.5),
          ),
          const SizedBox(height: 28),

          // Handle
          Text('TRENDUP HANDLE', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.textSecondary, letterSpacing: 1.5)),
          const SizedBox(height: 8),
          _glassInput(
            controller: _handleController,
            prefixText: '@ ',
            hint: 'username',
            suffix: _handle.isEmpty
                ? null
                : Icon(
                    _handleValid ? Icons.check_circle : Icons.cancel,
                    color: _handleValid ? AppColors.success : AppColors.primary,
                    size: 20,
                  ),
          ),
          if (_handle.isNotEmpty) ...[
            const SizedBox(height: 6),
            Row(
              children: [
                const SizedBox(width: 4),
                Icon(
                  _handleValid ? Icons.check : Icons.close,
                  size: 12,
                  color: _handleValid ? AppColors.success : AppColors.primary,
                ),
                const SizedBox(width: 4),
                Text(
                  _handleValid ? 'Handle is available' : 'Min 3 characters required',
                  style: TextStyle(color: _handleValid ? AppColors.success : AppColors.primary, fontSize: 11, fontWeight: FontWeight.w500),
                ),
              ],
            ),
          ],
          const SizedBox(height: 20),

          // Display name
          Text('DISPLAY NAME', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.textSecondary, letterSpacing: 1.5)),
          const SizedBox(height: 8),
          _glassInput(controller: _displayController, hint: 'How others see you'),
          const SizedBox(height: 20),

          // Password
          Text('PASSWORD', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.textSecondary, letterSpacing: 1.5)),
          const SizedBox(height: 8),
          _glassInput(
            controller: _passController,
            hint: 'Create a strong password',
            obscure: _obscurePass,
            suffix: GestureDetector(
              onTap: () => setState(() => _obscurePass = !_obscurePass),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Icon(_obscurePass ? Icons.visibility_off : Icons.visibility, size: 18, color: Colors.white.withValues(alpha: 0.4)),
              ),
            ),
          ),
          const SizedBox(height: 10),

          // Strength meter - REAL TIME
          Row(
            children: [
              for (int i = 0; i < 4; i++) ...[
                if (i > 0) const SizedBox(width: 6),
                Expanded(
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 300),
                    height: 4,
                    decoration: BoxDecoration(
                      color: _password.isEmpty
                          ? AppColors.borderLight
                          : i < _strengthCount ? _strengthColor : AppColors.borderLight,
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),
              ],
            ],
          ),
          if (_password.isNotEmpty) ...[
            const SizedBox(height: 6),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(_strengthLabel, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: _strengthColor)),
                Text('${(_strengthCount * 25)}% Secure', style: TextStyle(fontSize: 10, color: AppColors.textSecondary)),
              ],
            ),
          ],
          const SizedBox(height: 20),

          // Confirm password
          Text('CONFIRM PASSWORD', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.textSecondary, letterSpacing: 1.5)),
          const SizedBox(height: 8),
          _glassInput(
            controller: _confirmController,
            hint: 'Re-enter password',
            obscure: _obscureConfirm,
            suffix: GestureDetector(
              onTap: () => setState(() => _obscureConfirm = !_obscureConfirm),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Icon(_obscureConfirm ? Icons.visibility_off : Icons.visibility, size: 18, color: Colors.white.withValues(alpha: 0.4)),
              ),
            ),
          ),
          if (_confirmPassword.isNotEmpty) ...[
            const SizedBox(height: 6),
            Row(
              children: [
                const SizedBox(width: 4),
                Icon(
                  _passwordsMatch ? Icons.check_circle : Icons.cancel,
                  size: 12,
                  color: _passwordsMatch ? AppColors.success : AppColors.primary,
                ),
                const SizedBox(width: 4),
                Text(
                  _passwordsMatch ? 'Passwords match' : 'Passwords do not match',
                  style: TextStyle(color: _passwordsMatch ? AppColors.success : AppColors.primary, fontSize: 11, fontWeight: FontWeight.w500),
                ),
              ],
            ),
          ],
          const SizedBox(height: 20),

          // Requirements - REAL TIME
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.surfaceLight.withValues(alpha: 0.4),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: Colors.white.withValues(alpha: 0.05)),
            ),
            child: Column(
              children: [
                _checkItem('8+ characters', _has8Chars),
                const SizedBox(height: 8),
                _checkItem('One uppercase letter', _hasUpper),
                const SizedBox(height: 8),
                _checkItem('One number', _hasNumber),
                const SizedBox(height: 8),
                _checkItem('One special character', _hasSpecial),
                const SizedBox(height: 8),
                _checkItem('Passwords match', _passwordsMatch),
              ],
            ),
          ),
          const SizedBox(height: 28),

          // Continue button
          SizedBox(
            width: double.infinity,
            height: 56,
            child: ElevatedButton(
              onPressed: () => setState(() => _currentStep = 1),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                elevation: 6,
                shadowColor: AppColors.primary.withValues(alpha: 0.3),
              ),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Continue', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                  SizedBox(width: 10),
                  Icon(Icons.arrow_forward_rounded, size: 20),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),

          // Sign in link
          Center(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Already have an account? ', style: TextStyle(color: Colors.white.withValues(alpha: 0.4), fontSize: 13)),
                GestureDetector(
                  onTap: () => Navigator.pushReplacementNamed(context, '/signin'),
                  child: const Text('Sign in', style: TextStyle(color: AppColors.primary, fontSize: 13, fontWeight: FontWeight.w700)),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // E2EE badge
          Center(
            child: Opacity(
              opacity: 0.35,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.lock, size: 12, color: Colors.white),
                  const SizedBox(width: 6),
                  Text('END-TO-END ENCRYPTED REGISTRATION', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: Colors.white, letterSpacing: 1.5)),
                ],
              ),
            ),
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }

  // --- STEP 2: Security ---
  Widget _buildSecurityStep() {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Step indicator
          Row(
            children: [
              const Text('STEP 2 OF 3', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.primary, letterSpacing: 1.5)),
              const SizedBox(width: 12),
              Expanded(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: 0.66,
                    backgroundColor: Colors.white.withValues(alpha: 0.08),
                    valueColor: const AlwaysStoppedAnimation(AppColors.primary),
                    minHeight: 4,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          const Text('Set up security', style: TextStyle(fontSize: 26, fontWeight: FontWeight.w900, color: Colors.white)),
          const SizedBox(height: 6),
          Text(
            'Choose how you want to protect and recover your TrendUp account.',
            style: TextStyle(color: Colors.white.withValues(alpha: 0.5), fontSize: 14, height: 1.5),
          ),
          const SizedBox(height: 24),

          // Option 1: Recovery Phrase
          GestureDetector(
            onTap: () => setState(() => _securityOption = 0),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.surfaceLight.withValues(alpha: 0.7),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: _securityOption == 0 ? AppColors.primary.withValues(alpha: 0.3) : Colors.white.withValues(alpha: 0.08),
                  width: _securityOption == 0 ? 1.5 : 1,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 40, height: 40,
                        decoration: BoxDecoration(
                          color: _securityOption == 0 ? AppColors.primary.withValues(alpha: 0.15) : Colors.white.withValues(alpha: 0.05),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Icon(Icons.key, color: _securityOption == 0 ? AppColors.primary : AppColors.textSecondary, size: 18),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('Recovery Phrase', style: TextStyle(fontWeight: FontWeight.w700, color: Colors.white, fontSize: 15)),
                            const SizedBox(height: 2),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                              decoration: BoxDecoration(color: AppColors.success.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(10)),
                              child: const Text('RECOMMENDED', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: AppColors.success)),
                            ),
                          ],
                        ),
                      ),
                      _radioCircle(_securityOption == 0),
                    ],
                  ),
                  // Expanded content only when selected
                  if (_securityOption == 0) ...[
                    const SizedBox(height: 16),
                    GridView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2, childAspectRatio: 4, crossAxisSpacing: 8, mainAxisSpacing: 8,
                      ),
                      itemCount: MockData.recoveryPhrase.length,
                      itemBuilder: (context, index) {
                        return Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12),
                          decoration: BoxDecoration(
                            color: AppColors.background.withValues(alpha: 0.6),
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
                          ),
                          child: Row(
                            children: [
                              SizedBox(width: 16, child: Text('${index + 1}', style: TextStyle(color: AppColors.textSecondary, fontSize: 11))),
                              const SizedBox(width: 6),
                              Text(MockData.recoveryPhrase[index], style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w600)),
                            ],
                          ),
                        );
                      },
                    ),
                    const SizedBox(height: 12),
                    SizedBox(
                      width: double.infinity,
                      height: 44,
                      child: OutlinedButton.icon(
                        onPressed: () {},
                        icon: Icon(Icons.copy, size: 14, color: AppColors.textSecondary),
                        label: Text('Copy to clipboard', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.textSecondary)),
                        style: OutlinedButton.styleFrom(
                          side: BorderSide(color: Colors.white.withValues(alpha: 0.1)),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: AppColors.primary.withValues(alpha: 0.08),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: AppColors.primary.withValues(alpha: 0.15)),
                      ),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Icon(Icons.error_outline, color: AppColors.primary, size: 16),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Text(
                              'Save these words securely. You cannot recover your account without them. TrendUp does not store your keys.',
                              style: TextStyle(color: Colors.white.withValues(alpha: 0.7), fontSize: 12, fontWeight: FontWeight.w500, height: 1.5),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),

          // Option 2: Connect Wallet
          _optionCard(Icons.account_balance_wallet, 'Connect Wallet', 'Use MetaMask or Phantom', 1),
          const SizedBox(height: 12),

          // Option 3: Skip
          _optionCard(Icons.fast_forward, 'Skip for now', 'Not recommended', 2, warn: true),
          const SizedBox(height: 28),

          // Back + Next Step buttons
          Row(
            children: [
              Expanded(
                child: SizedBox(
                  height: 56,
                  child: OutlinedButton(
                    onPressed: () => setState(() => _currentStep = 0),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: Colors.white,
                      side: BorderSide(color: Colors.white.withValues(alpha: 0.1)),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    ),
                    child: const Text('Back', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                flex: 2,
                child: SizedBox(
                  height: 56,
                  child: ElevatedButton(
                    onPressed: () => setState(() => _currentStep = 2),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      elevation: 6,
                      shadowColor: AppColors.primary.withValues(alpha: 0.3),
                    ),
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text('Next Step', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                        SizedBox(width: 8),
                        Icon(Icons.arrow_forward_rounded, size: 18),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          Center(
            child: Opacity(
              opacity: 0.35,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.lock, size: 12, color: Colors.white),
                  const SizedBox(width: 6),
                  Text('END-TO-END ENCRYPTED', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: Colors.white, letterSpacing: 1.5)),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }

  Widget _radioCircle(bool selected) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      width: 22, height: 22,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(color: selected ? AppColors.primary : Colors.white.withValues(alpha: 0.15), width: 2),
      ),
      child: selected
          ? Center(child: Container(width: 10, height: 10, decoration: const BoxDecoration(color: AppColors.primary, shape: BoxShape.circle)))
          : null,
    );
  }

  Widget _optionCard(IconData icon, String title, String subtitle, int optionIndex, {bool warn = false}) {
    final selected = _securityOption == optionIndex;
    return GestureDetector(
      onTap: () => setState(() => _securityOption = optionIndex),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.surfaceLight.withValues(alpha: 0.7),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: selected ? AppColors.primary.withValues(alpha: 0.3) : Colors.white.withValues(alpha: 0.08),
            width: selected ? 1.5 : 1,
          ),
        ),
        child: Row(
          children: [
            Container(
              width: 40, height: 40,
              decoration: BoxDecoration(
                color: selected ? AppColors.primary.withValues(alpha: 0.15) : Colors.white.withValues(alpha: 0.05),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Icon(icon, color: selected ? AppColors.primary : AppColors.textSecondary, size: 18),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: TextStyle(fontWeight: FontWeight.w700, color: selected ? Colors.white : Colors.white.withValues(alpha: 0.7))),
                  Text(subtitle, style: TextStyle(fontSize: 11, color: warn ? const Color(0xFFFBBF24) : AppColors.textSecondary, fontWeight: warn ? FontWeight.w500 : FontWeight.w400)),
                ],
              ),
            ),
            _radioCircle(selected),
          ],
        ),
      ),
    );
  }

  // --- STEP 3: Complete ---
  Widget _buildCompleteStep() {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          // Progress
          Row(
            children: [
              for (int i = 0; i < 3; i++) ...[
                if (i > 0) const SizedBox(width: 6),
                Expanded(child: Container(height: 4, decoration: BoxDecoration(color: AppColors.success, borderRadius: BorderRadius.circular(2)))),
              ],
            ],
          ),
          const SizedBox(height: 40),

          // Success icon
          Container(
            width: 96, height: 96,
            decoration: BoxDecoration(
              color: AppColors.success,
              shape: BoxShape.circle,
              boxShadow: [BoxShadow(color: AppColors.success.withValues(alpha: 0.3), blurRadius: 30, spreadRadius: 4)],
            ),
            child: const Icon(Icons.verified_user, size: 48, color: Colors.white),
          ),
          const SizedBox(height: 24),
          const Text("You're all set!", style: TextStyle(fontSize: 30, fontWeight: FontWeight.w900, color: Colors.white)),
          const SizedBox(height: 12),
          SizedBox(
            width: 280,
            child: RichText(
              textAlign: TextAlign.center,
              text: TextSpan(
                style: TextStyle(color: Colors.white.withValues(alpha: 0.5), fontSize: 14, height: 1.6),
                children: [
                  const TextSpan(text: 'Your messages are now secured with '),
                  TextSpan(text: 'military-grade', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600, decoration: TextDecoration.underline, decorationColor: AppColors.success)),
                  const TextSpan(text: ' end-to-end encryption.'),
                ],
              ),
            ),
          ),
          const SizedBox(height: 36),

          // Checklist
          _completionStep(Icons.check, 'Account created', 'Handle registered on secure relay', true),
          const SizedBox(height: 10),
          _completionStep(Icons.check, 'Encryption keys generated', '256-bit AES keys stored locally', true),
          const SizedBox(height: 10),
          _completionStep(Icons.check, 'Device bound', 'Hardware signature verified', true),
          const Spacer(),

          // Buttons
          SizedBox(
            width: double.infinity,
            height: 56,
            child: ElevatedButton(
              onPressed: () => Navigator.pushNamedAndRemoveUntil(context, '/home', (r) => false),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.success,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                elevation: 6,
                shadowColor: AppColors.success.withValues(alpha: 0.35),
              ),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.chat_bubble_rounded, size: 20),
                  SizedBox(width: 10),
                  Text('Start Messaging', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            height: 56,
            child: OutlinedButton(
              onPressed: () => Navigator.pushNamed(context, '/invite'),
              style: OutlinedButton.styleFrom(
                foregroundColor: Colors.white,
                side: BorderSide(color: Colors.white.withValues(alpha: 0.1)),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.person_add_alt_1_outlined, size: 20),
                  SizedBox(width: 10),
                  Text('Invite Friends', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15)),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }

  Widget _completionStep(IconData icon, String title, String subtitle, bool done) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surfaceLight.withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
      ),
      child: Row(
        children: [
          Container(
            width: 32, height: 32,
            decoration: BoxDecoration(color: AppColors.success.withValues(alpha: 0.15), shape: BoxShape.circle),
            child: Icon(icon, color: AppColors.success, size: 14),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14, color: Colors.white)),
                Text(subtitle, style: TextStyle(color: AppColors.textSecondary, fontSize: 12)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _checkItem(String text, bool valid) {
    return Row(
      children: [
        Icon(valid ? Icons.check_circle : Icons.circle_outlined, size: 16, color: valid ? AppColors.success : AppColors.textSecondary),
        const SizedBox(width: 8),
        Text(text, style: TextStyle(color: valid ? AppColors.success : AppColors.textSecondary, fontSize: 12)),
      ],
    );
  }
}
