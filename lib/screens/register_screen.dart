import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  int _currentStep = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            if (_currentStep > 0) {
              setState(() => _currentStep--);
            } else {
              Navigator.pop(context);
            }
          },
        ),
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.shield, color: AppColors.primary, size: 20),
            const SizedBox(width: 8),
            const Text('TrendUp'),
          ],
        ),
        centerTitle: true,
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 16),
            child: Center(
              child: Text('Step ${_currentStep + 1} of 3', style: const TextStyle(color: AppColors.textMuted, fontSize: 13)),
            ),
          ),
        ],
      ),
      body: SafeArea(child: _buildStep()),
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

  Widget _buildIdentityStep() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Create your account', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800)),
          const SizedBox(height: 32),
          const Text('Choose a handle', style: TextStyle(fontWeight: FontWeight.w600)),
          const SizedBox(height: 8),
          TextField(
            decoration: InputDecoration(
              prefixText: '@ ',
              prefixStyle: const TextStyle(color: AppColors.textMuted),
              hintText: 'username',
              suffixIcon: const Icon(Icons.check_circle, color: AppColors.success, size: 20),
            ),
          ),
          const SizedBox(height: 4),
          const Text('Handle is available', style: TextStyle(color: AppColors.success, fontSize: 12)),
          const SizedBox(height: 20),
          const Text('Display name', style: TextStyle(fontWeight: FontWeight.w600)),
          const SizedBox(height: 8),
          const TextField(decoration: InputDecoration(hintText: 'How others see you')),
          const SizedBox(height: 20),
          const Text('Password', style: TextStyle(fontWeight: FontWeight.w600)),
          const SizedBox(height: 8),
          const TextField(obscureText: true, decoration: InputDecoration(hintText: '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022')),
          const SizedBox(height: 8),
          _passwordStrengthBar(),
          const SizedBox(height: 20),
          const Text('Confirm password', style: TextStyle(fontWeight: FontWeight.w600)),
          const SizedBox(height: 8),
          const TextField(obscureText: true, decoration: InputDecoration(hintText: '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022')),
          const SizedBox(height: 16),
          _passwordRequirements(),
          const SizedBox(height: 32),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () => setState(() => _currentStep = 1),
              child: const Text('Next'),
            ),
          ),
          const SizedBox(height: 16),
          Center(
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text('Already have an account? ', style: TextStyle(color: AppColors.textSecondary, fontSize: 13)),
                GestureDetector(
                  onTap: () => Navigator.pushReplacementNamed(context, '/signin'),
                  child: const Text('Sign in', style: TextStyle(color: AppColors.primary, fontSize: 13, fontWeight: FontWeight.w600)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _passwordStrengthBar() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Expanded(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: LinearProgressIndicator(
                  value: 0.75,
                  backgroundColor: AppColors.surface,
                  valueColor: const AlwaysStoppedAnimation(AppColors.warning),
                  minHeight: 4,
                ),
              ),
            ),
            const SizedBox(width: 12),
            const Text('Strong', style: TextStyle(color: AppColors.warning, fontSize: 12, fontWeight: FontWeight.w600)),
          ],
        ),
      ],
    );
  }

  Widget _passwordRequirements() {
    return Column(
      children: [
        _requirementRow('8+ characters', true),
        _requirementRow('One uppercase letter', true),
        _requirementRow('One number', true),
        _requirementRow('One special character', false),
      ],
    );
  }

  Widget _requirementRow(String text, bool met) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2),
      child: Row(
        children: [
          Icon(met ? Icons.check_circle : Icons.circle_outlined, size: 16, color: met ? AppColors.success : AppColors.textMuted),
          const SizedBox(width: 8),
          Text(text, style: TextStyle(color: met ? AppColors.success : AppColors.textMuted, fontSize: 12)),
        ],
      ),
    );
  }

  Widget _buildSecurityStep() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Set up security', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800)),
          const SizedBox(height: 8),
          const Text('Choose how you want to protect and recover your TrendUp account.', style: TextStyle(color: AppColors.textSecondary)),
          const SizedBox(height: 24),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppColors.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.primary.withValues(alpha: 0.3)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Text('Recovery Phrase', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                    const SizedBox(width: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(color: AppColors.primary.withValues(alpha: 0.2), borderRadius: BorderRadius.circular(4)),
                      child: const Text('Recommended', style: TextStyle(color: AppColors.primary, fontSize: 10, fontWeight: FontWeight.w600)),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 3,
                    childAspectRatio: 3,
                    crossAxisSpacing: 8,
                    mainAxisSpacing: 8,
                  ),
                  itemCount: MockData.recoveryPhrase.length,
                  itemBuilder: (context, index) {
                    return Container(
                      decoration: BoxDecoration(
                        color: AppColors.background,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: AppColors.border),
                      ),
                      child: Center(
                        child: RichText(
                          text: TextSpan(children: [
                            TextSpan(text: '${index + 1}  ', style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
                            TextSpan(text: MockData.recoveryPhrase[index], style: const TextStyle(color: AppColors.textPrimary, fontSize: 13, fontWeight: FontWeight.w500)),
                          ]),
                        ),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  child: OutlinedButton.icon(
                    onPressed: () {},
                    icon: const Icon(Icons.copy, size: 16),
                    label: const Text('Copy to clipboard'),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppColors.warning.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Row(
              children: [
                Icon(Icons.warning_amber, color: AppColors.warning, size: 16),
                SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Save these words securely. You cannot recover your account without them.',
                    style: TextStyle(color: AppColors.warning, fontSize: 11),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () => setState(() => _currentStep = 2),
              child: const Text('Next Step'),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCompleteStep() {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          const Spacer(),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
            decoration: BoxDecoration(
              color: AppColors.success.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(20),
            ),
            child: const Text('REGISTRATION COMPLETE', style: TextStyle(color: AppColors.success, fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 1)),
          ),
          const SizedBox(height: 24),
          const Text("You're all set!", style: TextStyle(fontSize: 32, fontWeight: FontWeight.w800)),
          const SizedBox(height: 8),
          const Text(
            'Your messages are now secured with military-grade\nend-to-end encryption.',
            textAlign: TextAlign.center,
            style: TextStyle(color: AppColors.textSecondary),
          ),
          const SizedBox(height: 40),
          _completionStep(Icons.check_circle, 'Account created', 'Handle registered on secure relay', true),
          _completionStep(Icons.check_circle, 'Encryption keys generated', '256-bit AES keys stored locally', true),
          _completionStep(Icons.check_circle, 'Device bound', 'Hardware signature verified', true),
          const Spacer(),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () => Navigator.pushNamedAndRemoveUntil(context, '/home', (r) => false),
              child: const Text('Start Messaging'),
            ),
          ),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            child: OutlinedButton(
              onPressed: () => Navigator.pushNamed(context, '/invite'),
              child: const Text('Invite Friends'),
            ),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }

  Widget _completionStep(IconData icon, String title, String subtitle, bool done) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Icon(icon, color: done ? AppColors.success : AppColors.textMuted, size: 24),
          const SizedBox(width: 16),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15)),
              Text(subtitle, style: const TextStyle(color: AppColors.textMuted, fontSize: 12)),
            ],
          ),
        ],
      ),
    );
  }
}
