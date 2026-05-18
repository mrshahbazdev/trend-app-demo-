import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class AppBottomNav extends StatelessWidget {
  final int currentIndex;

  const AppBottomNav({
    super.key,
    required this.currentIndex,
  });

  @override
  Widget build(BuildContext context) {
    final icons = [
      Icons.home_rounded,
      Icons.chat_bubble_outline_rounded,
      Icons.play_circle_outline_rounded,
      Icons.show_chart_rounded,
      Icons.person_outline_rounded
    ];
    final activeIcons = [
      Icons.home_rounded,
      Icons.chat_bubble_rounded,
      Icons.play_circle_rounded,
      Icons.show_chart_rounded,
      Icons.person_rounded
    ];
    final labels = ['Home', 'Chats', 'Live', 'Markets', 'Profile'];

    return Container(
      height: 72,
      decoration: BoxDecoration(
        color: AppColors.background.withValues(alpha: 0.95),
        border: Border(top: BorderSide(color: Colors.white.withValues(alpha: 0.06))),
      ),
      child: Row(
        children: List.generate(5, (i) {
          final on = currentIndex == i;
          return Expanded(
            child: GestureDetector(
              onTap: () {
                if (on) return; // Already on this tab

                final routes = ['/home', '/chats', '/livestream', '/market', '/profile'];

                // Navigate cleanly
                if (i == 0) {
                  Navigator.pushNamedAndRemoveUntil(context, '/home', (route) => false);
                } else {
                  Navigator.pushNamed(context, routes[i]);
                }
              },
              behavior: HitTestBehavior.opaque,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(12),
                      color: on ? AppColors.primary.withValues(alpha: 0.12) : Colors.transparent,
                    ),
                    child: Icon(
                      on ? activeIcons[i] : icons[i],
                      size: 22,
                      color: on ? AppColors.primary : AppColors.textMuted,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    labels[i],
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: on ? FontWeight.w800 : FontWeight.w600,
                      color: on ? Colors.white : AppColors.textMuted,
                    ),
                  ),
                ],
              ),
            ),
          );
        }),
      ),
    );
  }
}
