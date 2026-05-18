import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  static const Color primary = Color(0xFFDC2626);
  static const Color primaryDark = Color(0xFFB91C1C);
  static const Color primaryLight = Color(0xFFEF4444);
  static const Color background = Color(0xFF0A0F1E);
  static const Color surface = Color(0xFF141B2D);
  static const Color surfaceLight = Color(0xFF1E293B);
  static const Color surfaceBright = Color(0xFF273548);
  static const Color cardDark = Color(0xFF121929);
  static const Color textPrimary = Color(0xFFF1F5F9);
  static const Color textSecondary = Color(0xFF94A3B8);
  static const Color textMuted = Color(0xFF64748B);
  static const Color border = Color(0xFF1E293B);
  static const Color borderLight = Color(0xFF334155);
  static const Color success = Color(0xFF22C55E);
  static const Color successDark = Color(0xFF16A34A);
  static const Color warning = Color(0xFFF59E0B);
  static const Color error = Color(0xFFEF4444);
  static const Color accent = Color(0xFF3B82F6);
  static const Color accentLight = Color(0xFF60A5FA);
  static const Color chatBubbleSent = Color(0xFF1A2E4A);
  static const Color chatBubbleReceived = Color(0xFF141B2D);
  static const Color bottomNavBg = Color(0xFF080C18);
  static const Color e2eeBadge = Color(0xFF166534);
  static const Color glassCard = Color(0xB3141B2D);
  static const Color glassBorder = Color(0x14FFFFFF);
  static const Color redGlow = Color(0x33DC2626);
  static const Color shimmer = Color(0xFF1E293B);

  static const List<Color> primaryGradient = [Color(0xFFEF4444), Color(0xFFDC2626), Color(0xFFB91C1C)];
  static const List<Color> accentGradient = [Color(0xFF6366F1), Color(0xFFA855F7)];
  static const List<Color> successGradient = [Color(0xFF22C55E), Color(0xFF16A34A)];
  static const List<Color> warmGradient = [Color(0xFFF43F5E), Color(0xFFFB923C)];
  static const List<Color> coolGradient = [Color(0xFF06B6D4), Color(0xFF3B82F6)];
}

class AppSpacing {
  static const double xs = 4;
  static const double sm = 8;
  static const double md = 12;
  static const double lg = 16;
  static const double xl = 20;
  static const double xxl = 24;
  static const double xxxl = 32;
}

class AppRadius {
  static const double sm = 8;
  static const double md = 12;
  static const double lg = 16;
  static const double xl = 20;
  static const double xxl = 24;
  static const double pill = 100;
}

class AppShadows {
  static List<BoxShadow> glow(Color color, {double blur = 20, double spread = 0}) => [
    BoxShadow(color: color.withValues(alpha: 0.25), blurRadius: blur, spreadRadius: spread),
  ];

  static List<BoxShadow> get cardShadow => [
    BoxShadow(color: Colors.black.withValues(alpha: 0.2), blurRadius: 16, offset: const Offset(0, 4)),
  ];

  static List<BoxShadow> get elevatedShadow => [
    BoxShadow(color: Colors.black.withValues(alpha: 0.3), blurRadius: 24, offset: const Offset(0, 8)),
  ];
}

class AppTheme {
  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      primaryColor: AppColors.primary,
      scaffoldBackgroundColor: AppColors.background,
      textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme).copyWith(
        headlineLarge: GoogleFonts.inter(fontSize: 32, fontWeight: FontWeight.w900, color: AppColors.textPrimary, letterSpacing: -0.5),
        headlineMedium: GoogleFonts.inter(fontSize: 24, fontWeight: FontWeight.w800, color: AppColors.textPrimary, letterSpacing: -0.3),
        titleLarge: GoogleFonts.inter(fontSize: 18, fontWeight: FontWeight.w700, color: AppColors.textPrimary),
        titleMedium: GoogleFonts.inter(fontSize: 15, fontWeight: FontWeight.w600, color: AppColors.textPrimary),
        bodyLarge: GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.w400, color: AppColors.textPrimary, height: 1.5),
        bodyMedium: GoogleFonts.inter(fontSize: 13, fontWeight: FontWeight.w400, color: AppColors.textSecondary),
        bodySmall: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.w500, color: AppColors.textMuted),
        labelLarge: GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.w700, letterSpacing: 0.3),
        labelSmall: GoogleFonts.inter(fontSize: 10, fontWeight: FontWeight.w700, letterSpacing: 1.2, color: AppColors.textMuted),
      ),
      colorScheme: const ColorScheme.dark(
        primary: AppColors.primary,
        secondary: AppColors.accent,
        surface: AppColors.surface,
        error: AppColors.error,
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: AppColors.background,
        elevation: 0,
        scrolledUnderElevation: 0,
        titleTextStyle: GoogleFonts.inter(
          color: AppColors.textPrimary,
          fontSize: 18,
          fontWeight: FontWeight.w700,
        ),
        iconTheme: const IconThemeData(color: AppColors.textPrimary, size: 22),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: AppColors.bottomNavBg,
        selectedItemColor: AppColors.primary,
        unselectedItemColor: AppColors.textMuted,
        type: BottomNavigationBarType.fixed,
        showUnselectedLabels: true,
        selectedLabelStyle: TextStyle(fontSize: 11, fontWeight: FontWeight.w700),
        unselectedLabelStyle: TextStyle(fontSize: 11, fontWeight: FontWeight.w500),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.surface,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppRadius.md),
          borderSide: BorderSide(color: Colors.white.withValues(alpha: 0.08)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppRadius.md),
          borderSide: BorderSide(color: Colors.white.withValues(alpha: 0.08)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppRadius.md),
          borderSide: const BorderSide(color: AppColors.primary, width: 1.5),
        ),
        hintStyle: const TextStyle(color: AppColors.textMuted, fontSize: 14),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 24),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppRadius.lg)),
          elevation: 0,
          shadowColor: AppColors.redGlow,
          textStyle: GoogleFonts.inter(
            fontSize: 15,
            fontWeight: FontWeight.w700,
            letterSpacing: 0.3,
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: AppColors.textPrimary,
          side: BorderSide(color: Colors.white.withValues(alpha: 0.12)),
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 24),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppRadius.lg)),
          textStyle: GoogleFonts.inter(
            fontSize: 15,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      cardTheme: CardThemeData(
        color: AppColors.surface.withValues(alpha: 0.8),
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.xl),
          side: BorderSide(color: Colors.white.withValues(alpha: 0.06)),
        ),
      ),
      dividerTheme: DividerThemeData(
        color: Colors.white.withValues(alpha: 0.06),
        thickness: 0.5,
      ),
      floatingActionButtonTheme: FloatingActionButtonThemeData(
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        elevation: 0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppRadius.lg)),
      ),
      snackBarTheme: SnackBarThemeData(
        backgroundColor: AppColors.surfaceLight,
        contentTextStyle: GoogleFonts.inter(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 13),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppRadius.md)),
      ),
    );
  }
}
