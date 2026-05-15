import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';

class RecoveryScreen extends StatefulWidget {
  const RecoveryScreen({super.key});

  @override
  State<RecoveryScreen> createState() => _RecoveryScreenState();
}

class _RecoveryScreenState extends State<RecoveryScreen> {
  int _step = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Recovery'),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 16),
            child: Center(child: Text('Step ${_step + 1} of 3', style: const TextStyle(color: AppColors.textMuted, fontSize: 13))),
          ),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: _step == 0
              ? _enterPhrase()
              : _step == 1
                  ? _verifyStep()
                  : _successStep(),
        ),
      ),
    );
  }

  Widget _enterPhrase() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Enter Recovery Phrase', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800)),
        const SizedBox(height: 8),
        const Text('Enter the 12-word phrase you saved during setup.', style: TextStyle(color: AppColors.textSecondary)),
        const SizedBox(height: 24),
        Expanded(
          child: GridView.builder(
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3, childAspectRatio: 2.5, crossAxisSpacing: 8, mainAxisSpacing: 8),
            itemCount: 12,
            itemBuilder: (context, index) {
              return Container(
                decoration: BoxDecoration(
                  color: const Color(0xFF1E293B).withValues(alpha: 0.7),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
                ),
                child: Center(
                  child: Text('${index + 1}.  ${MockData.recoveryPhrase[index]}', style: const TextStyle(fontSize: 12)),
                ),
              );
            },
          ),
        ),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: () => setState(() => _step = 1),
            child: const Text('Verify Phrase'),
          ),
        ),
      ],
    );
  }

  Widget _verifyStep() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Verify Recovery', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800)),
        const SizedBox(height: 8),
        const Text('Select the correct words to verify your recovery phrase.', style: TextStyle(color: AppColors.textSecondary)),
        const SizedBox(height: 24),
        _verifyRow('Word #3', ['metal', 'guard', 'breeze', 'ocean'], 0),
        _verifyRow('Word #7', ['winter', 'legacy', 'active', 'shield'], 2),
        _verifyRow('Word #11', ['crypto', 'trend', 'vessel', 'trophy'], 0),
        const Spacer(),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: () => setState(() => _step = 2),
            child: const Text('Verify'),
          ),
        ),
      ],
    );
  }

  Widget _verifyRow(String label, List<String> options, int correctIndex) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: const TextStyle(fontWeight: FontWeight.w600)),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            children: options.asMap().entries.map((entry) {
              final isCorrect = entry.key == correctIndex;
              return ChoiceChip(
                label: Text(entry.value),
                selected: isCorrect,
                selectedColor: AppColors.primary.withValues(alpha: 0.2),
                backgroundColor: AppColors.surface,
                labelStyle: TextStyle(color: isCorrect ? AppColors.primary : AppColors.textSecondary, fontSize: 13),
                side: BorderSide(color: isCorrect ? AppColors.primary : AppColors.border),
                onSelected: (_) {},
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _successStep() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Icon(Icons.check_circle, color: AppColors.success, size: 64),
        const SizedBox(height: 24),
        const Text('Account Recovered!', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800)),
        const SizedBox(height: 8),
        const Text('Your identity has been verified and keys restored.', textAlign: TextAlign.center, style: TextStyle(color: AppColors.textSecondary)),
        const SizedBox(height: 40),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: () => Navigator.pushNamedAndRemoveUntil(context, '/home', (r) => false),
            child: const Text('Continue to TrendUp'),
          ),
        ),
      ],
    );
  }
}
