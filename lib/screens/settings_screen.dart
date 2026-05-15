import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.menu, size: 22),
          onPressed: () => Scaffold.of(context).openDrawer(),
        ),
        title: Row(
          children: [
            Image.asset('assets/images/logo.png', width: 28, height: 28),
            const SizedBox(width: 10),
            const Text('Settings', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
          ],
        ),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(height: 1, color: Colors.white.withValues(alpha: 0.06)),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 20),
            _glassCard(
              child: InkWell(
                onTap: () => Navigator.pushNamed(context, '/profile'),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      Container(
                        width: 56,
                        height: 56,
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                            colors: [Color(0xFFDC2626), Color(0xFF991B1B)],
                          ),
                          borderRadius: BorderRadius.circular(28),
                        ),
                        child: const Center(
                          child: Text('S', style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w700)),
                        ),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                const Text('shahbaz', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 17)),
                                const SizedBox(width: 6),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                  decoration: BoxDecoration(
                                    gradient: const LinearGradient(colors: [Color(0xFFDC2626), Color(0xFF991B1B)]),
                                    borderRadius: BorderRadius.circular(99),
                                  ),
                                  child: const Text('PRO', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w800, letterSpacing: 0.5)),
                                ),
                              ],
                            ),
                            const SizedBox(height: 2),
                            const Text('@shahbazdev', style: TextStyle(color: AppColors.textMuted, fontSize: 13)),
                          ],
                        ),
                      ),
                      Icon(Icons.chevron_right, color: AppColors.textMuted, size: 22),
                    ],
                  ),
                ),
              ),
            ),
            _sectionLabel('PRIVACY & SECURITY'),
            _glassCard(
              child: Column(
                children: [
                  _settingItem(context, Icons.shield_outlined, 'Secure Mode', trailing: _badge('Active', AppColors.success), onTap: () => Navigator.pushNamed(context, '/secure-mode')),
                  _divider(),
                  _settingItem(context, Icons.lock_outline, 'E2EE Status', trailing: _badge('Active', AppColors.success)),
                  _divider(),
                  _settingItem(context, Icons.timer_outlined, 'Auto-lock timer', trailing: Text('15m', style: TextStyle(color: AppColors.textMuted, fontSize: 13))),
                ],
              ),
            ),
            _sectionLabel('NOTIFICATIONS'),
            _glassCard(
              child: Column(
                children: [
                  _settingItem(context, Icons.volume_up_outlined, 'Notification Sounds', hasToggle: true, toggleOn: true),
                  _divider(),
                  _settingItem(context, Icons.notifications_off_outlined, 'Mute All', hasToggle: true, toggleOn: false),
                  _divider(),
                  _settingItem(context, Icons.visibility_outlined, 'Show Preview', hasToggle: true, toggleOn: true),
                ],
              ),
            ),
            _sectionLabel('DEVICES'),
            _glassCard(
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(14),
                    child: Row(
                      children: [
                        Container(
                          width: 40,
                          height: 40,
                          decoration: BoxDecoration(
                            color: AppColors.background,
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
                          ),
                          child: const Icon(Icons.phone_iphone, color: AppColors.textSecondary, size: 22),
                        ),
                        const SizedBox(width: 12),
                        const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('iPhone 15 Pro', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                            Text('Current Session \u2022 London, UK', style: TextStyle(color: AppColors.textMuted, fontSize: 12)),
                          ],
                        ),
                        const Spacer(),
                        _badge('Current', AppColors.success),
                      ],
                    ),
                  ),
                  _divider(),
                  InkWell(
                    onTap: () => Navigator.pushNamed(context, '/devices'),
                    child: Padding(
                      padding: const EdgeInsets.all(14),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.add, size: 16, color: AppColors.primary),
                          const SizedBox(width: 6),
                          Text('Approve new device', style: TextStyle(color: AppColors.primary, fontSize: 13, fontWeight: FontWeight.w600)),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            _sectionLabel('ACCOUNT'),
            _glassCard(
              child: Column(
                children: [
                  _settingItem(context, Icons.key, 'Change Password'),
                  _divider(),
                  _settingItem(context, Icons.security, '2FA Setup', onTap: () => Navigator.pushNamed(context, '/2fa')),
                  _divider(),
                  _settingItem(context, Icons.wallet, 'Wallet', onTap: () => Navigator.pushNamed(context, '/wallet')),
                  _divider(),
                  _settingItem(context, Icons.block, 'Blocked Users', onTap: () => Navigator.pushNamed(context, '/blocked')),
                  _divider(),
                  _settingItem(context, Icons.notifications_outlined, 'Notifications', onTap: () => Navigator.pushNamed(context, '/notifications')),
                ],
              ),
            ),
            _sectionLabel('MORE'),
            _glassCard(
              child: Column(
                children: [
                  _settingItem(context, Icons.qr_code, 'QR Code', onTap: () => Navigator.pushNamed(context, '/qr-share')),
                  _divider(),
                  _settingItem(context, Icons.person_add, 'Invite Friends', onTap: () => Navigator.pushNamed(context, '/invite')),
                  _divider(),
                  _settingItem(context, Icons.restore, 'Recovery', onTap: () => Navigator.pushNamed(context, '/recovery')),
                  _divider(),
                  _settingItem(context, Icons.verified_user, 'Safety Number', onTap: () => Navigator.pushNamed(context, '/safety')),
                  _divider(),
                  _settingItem(context, Icons.timer, 'Disappearing Messages', onTap: () => Navigator.pushNamed(context, '/disappearing')),
                  _divider(),
                  _settingItem(context, Icons.info_outline, 'About TrendUp'),
                ],
              ),
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: () => Navigator.pushNamedAndRemoveUntil(context, '/landing', (r) => false),
                style: OutlinedButton.styleFrom(
                  side: BorderSide(color: AppColors.error.withValues(alpha: 0.3)),
                  foregroundColor: AppColors.error,
                ),
                child: const Text('Sign Out'),
              ),
            ),
            const SizedBox(height: 16),
            Center(
              child: Column(
                children: [
                  const Text('TrendUp Secure v4.2.1-stable', style: TextStyle(color: AppColors.textMuted, fontSize: 11)),
                  const SizedBox(height: 2),
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.lock, size: 10, color: AppColors.success.withValues(alpha: 0.5)),
                      const SizedBox(width: 4),
                      Text('End-to-End Encryption Verified', style: TextStyle(color: AppColors.success.withValues(alpha: 0.5), fontSize: 10)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  static Widget _glassCard({required Widget child}) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B).withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
      ),
      child: child,
    );
  }

  static Widget _divider() {
    return Container(
      height: 1,
      margin: const EdgeInsets.symmetric(horizontal: 14),
      color: Colors.white.withValues(alpha: 0.04),
    );
  }

  Widget _sectionLabel(String text) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(4, 24, 4, 10),
      child: Text(text, style: TextStyle(color: AppColors.textMuted, fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 1)),
    );
  }

  Widget _settingItem(BuildContext context, IconData icon, String title, {Widget? trailing, bool hasToggle = false, bool toggleOn = false, VoidCallback? onTap}) {
    return InkWell(
      onTap: onTap ?? () {},
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 13),
        child: Row(
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: AppColors.background.withValues(alpha: 0.5),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(icon, color: AppColors.textSecondary, size: 18),
            ),
            const SizedBox(width: 12),
            Expanded(child: Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500))),
            ?trailing,
            if (hasToggle)
              SizedBox(
                height: 24,
                child: Switch(value: toggleOn, onChanged: (_) {}, activeTrackColor: AppColors.primary),
              ),
            if (!hasToggle && trailing == null)
              Icon(Icons.chevron_right, color: AppColors.textMuted, size: 18),
          ],
        ),
      ),
    );
  }

  static Widget _badge(String text, Color color) {
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
