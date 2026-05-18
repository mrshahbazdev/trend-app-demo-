import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/bottom_nav.dart';
import '../widgets/app_drawer.dart';
import 'inbox_screen.dart';
import 'groups_screen.dart';
import 'contacts_screen.dart';
import 'settings_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    InboxScreen(),
    GroupsScreen(),
    ContactsScreen(),
    SettingsScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      drawer: const AppDrawer(),
      body: IndexedStack(index: _currentIndex, children: _screens),
      bottomNavigationBar: _bottomNav(),
    );
  }

  Widget _bottomNav() {
    final icons = [Icons.home_rounded, Icons.chat_bubble_outline_rounded, Icons.play_circle_outline_rounded, Icons.show_chart_rounded, Icons.person_outline_rounded];
    final activeIcons = [Icons.home_rounded, Icons.chat_bubble_rounded, Icons.play_circle_rounded, Icons.show_chart_rounded, Icons.person_rounded];
    final labels = ['Home', 'Chats', 'Live', 'Markets', 'Profile'];
    return Container(
      height: 76,
      decoration: BoxDecoration(
        color: AppColors.bottomNavBg,
        border: Border(top: BorderSide(color: Colors.white.withValues(alpha: 0.06))),
        boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.2), blurRadius: 20, offset: const Offset(0, -4))],
      ),
      child: Row(children: List.generate(5, (i) {
        final on = i == 1;
        return Expanded(child: GestureDetector(
          onTap: () {
            if (i == 1) return;
            if (i == 0) { Navigator.pop(context); return; }
            final routes = ['', '', '/livestream', '/market', '/profile'];
            if (routes[i].isNotEmpty) {
              Navigator.pushNamed(context, routes[i]);
            }
          },
          behavior: HitTestBehavior.opaque,
          child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
            AnimatedContainer(
              duration: const Duration(milliseconds: 250),
              curve: Curves.easeOutCubic,
              padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 7),
              decoration: BoxDecoration(
                color: on ? AppColors.primary.withValues(alpha: 0.12) : Colors.transparent,
                borderRadius: BorderRadius.circular(AppRadius.lg),
              ),
              child: Icon(on ? activeIcons[i] : icons[i], color: on ? AppColors.primary : AppColors.textMuted, size: 22),
            ),
            const SizedBox(height: 3),
            Text(labels[i], style: TextStyle(fontSize: 10, fontWeight: on ? FontWeight.w800 : FontWeight.w500, color: on ? AppColors.primary : AppColors.textMuted)),
          ]),
        ));
      })),
    );
  }
}
