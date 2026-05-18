import 'package:flutter/material.dart';
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
      backgroundColor: const Color(0xFF0F172A),
      drawer: const AppDrawer(),
      body: IndexedStack(index: _currentIndex, children: _screens),
      bottomNavigationBar: _bottomNav(),
    );
  }

  Widget _bottomNav() {
    final icons = [Icons.home_rounded, Icons.chat_bubble_outline_rounded, Icons.play_circle_outline_rounded, Icons.show_chart_rounded, Icons.person_outline_rounded];
    final labels = ['Home', 'Chats', 'Live', 'Markets', 'Profile'];
    return Container(
      height: 72,
      decoration: BoxDecoration(color: const Color(0xFF0F172A).withValues(alpha: 0.95),
        border: Border(top: BorderSide(color: Colors.white.withValues(alpha: 0.06)))),
      child: Row(children: List.generate(5, (i) {
        final on = i == 1; // 1 is Chats, which is this screen
        return Expanded(child: GestureDetector(
          onTap: () {
            if (i == 1) return; // Already on Chats
            if (i == 0) { Navigator.pop(context); return; } // Go back to Home/Today Hub
            final routes = ['', '', '/livestream', '/market', '/profile'];
            if (routes[i].isNotEmpty) {
              Navigator.pushNamed(context, routes[i]);
            }
          },
          child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
            AnimatedContainer(duration: const Duration(milliseconds: 200),
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
              decoration: BoxDecoration(color: on ? const Color(0xFFDC2626).withValues(alpha: 0.15) : Colors.transparent, borderRadius: BorderRadius.circular(16)),
              child: Icon(icons[i], color: on ? const Color(0xFFDC2626) : const Color(0xFF94A3B8), size: 24)),
            const SizedBox(height: 4),
            Text(labels[i], style: TextStyle(fontSize: 10, fontWeight: on ? FontWeight.w800 : FontWeight.w600, color: on ? const Color(0xFFDC2626) : const Color(0xFF94A3B8))),
          ]),
        ));
      })),
    );
  }
}
