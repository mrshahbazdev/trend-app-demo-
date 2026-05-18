import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/mock_data.dart';
import '../widgets/bottom_nav.dart';

class MarketScreen extends StatefulWidget {
  const MarketScreen({super.key});

  @override
  State<MarketScreen> createState() => _MarketScreenState();
}

class _MarketScreenState extends State<MarketScreen> {
  int _filterIdx = 0; // 0=All, 1=Favorites, 2=Gainers, 3=Losers
  
  
  
  
  

  @override
  Widget build(BuildContext context) {
    final filters = ['All', 'Favorites', 'Gainers', 'Losers'];
    
    // Simple mock filter logic
    var displayData = MockData.cryptoData;
    if (_filterIdx == 1) {
      displayData = displayData.where((c) => c.symbol == 'BTC' || c.symbol == 'ETH').toList();
    } else if (_filterIdx == 2) {
      displayData = displayData.where((c) => c.isPositive).toList();
    } else if (_filterIdx == 3) {
      displayData = displayData.where((c) => !c.isPositive).toList();
    }

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.background,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Markets', style: TextStyle(fontWeight: FontWeight.w900, color: Colors.white, fontSize: 22, letterSpacing: -0.5)),
        actions: const [],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Premium Market Overview Card
            Container(
              margin: const EdgeInsets.all(16),
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [AppColors.surfaceLight, Colors.black.withValues(alpha: 0.6)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
                boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.2), blurRadius: 20, offset: const Offset(0, 10))],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.auto_graph_rounded, color: AppColors.primary, size: 20),
                      const SizedBox(width: 8),
                      const Text('Market Overview', style: TextStyle(fontWeight: FontWeight.w800, color: Colors.white, fontSize: 16)),
                    ],
                  ),
                  const SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _marketStat('Total Cap', '\$3.42T', '+1.8%', true),
                      Container(width: 1, height: 40, color: Colors.white.withValues(alpha: 0.1)),
                      _marketStat('24h Volume', '\$142B', '-3.2%', false),
                      Container(width: 1, height: 40, color: Colors.white.withValues(alpha: 0.1)),
                      _marketStat('BTC Dom.', '54.2%', '+0.3%', true),
                    ],
                  ),
                ],
              ),
            ),
            
            // Interactive Filters
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: List.generate(filters.length, (i) {
                  final active = _filterIdx == i;
                  return Padding(
                    padding: const EdgeInsets.only(right: 10),
                    child: GestureDetector(
                      onTap: () => setState(() => _filterIdx = i),
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 200),
                        padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
                        decoration: BoxDecoration(
                          color: active ? AppColors.primary.withValues(alpha: 0.15) : Colors.white.withValues(alpha: 0.04),
                          borderRadius: BorderRadius.circular(24),
                          border: Border.all(color: active ? AppColors.primary.withValues(alpha: 0.4) : Colors.white.withValues(alpha: 0.08)),
                        ),
                        child: Text(
                          filters[i], 
                          style: TextStyle(
                            color: active ? Colors.white : AppColors.textMuted, 
                            fontWeight: active ? FontWeight.w800 : FontWeight.w600,
                            fontSize: 13,
                          ),
                        ),
                      ),
                    ),
                  );
                }),
              ),
            ),
            const SizedBox(height: 24),
            
            // Table Header
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Row(
                children: [
                  const Expanded(flex: 3, child: Text('Asset', style: TextStyle(color: AppColors.textMuted, fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 0.5))),
                  const Expanded(flex: 2, child: Text('Price', textAlign: TextAlign.right, style: TextStyle(color: AppColors.textMuted, fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 0.5))),
                  const Expanded(flex: 2, child: Text('24h', textAlign: TextAlign.right, style: TextStyle(color: AppColors.textMuted, fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 0.5))),
                  const Expanded(flex: 2, child: Text('Mkt Cap', textAlign: TextAlign.right, style: TextStyle(color: AppColors.textMuted, fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 0.5))),
                ],
              ),
            ),
            const SizedBox(height: 12),
            Container(height: 1, color: Colors.white.withValues(alpha: 0.04), margin: const EdgeInsets.symmetric(horizontal: 16)),
            const SizedBox(height: 12),
            
            // Data Rows
            if (displayData.isEmpty)
              const Padding(
                padding: EdgeInsets.all(32.0),
                child: Center(child: Text('No assets match this filter.', style: TextStyle(color: AppColors.textMuted))),
              )
            else
              ...displayData.map(_cryptoRow),
            
            const SizedBox(height: 40),
          ],
        ),
      ),
      bottomNavigationBar: const AppBottomNav(currentIndex: 3),
    );
  }

  Widget _marketStat(String label, String value, String change, bool positive) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(color: AppColors.textMuted, fontSize: 11, fontWeight: FontWeight.w600)),
        const SizedBox(height: 6),
        Text(value, style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 18, color: Colors.white, letterSpacing: -0.5)),
        const SizedBox(height: 4),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
          decoration: BoxDecoration(
            color: (positive ? Colors.green : AppColors.primary).withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(4),
          ),
          child: Text(
            change, 
            style: TextStyle(
              color: positive ? Colors.greenAccent : const Color(0xFFFCA5A5), 
              fontSize: 11, 
              fontWeight: FontWeight.w800,
            ),
          ),
        ),
      ],
    );
  }

  Widget _cryptoRow(MockCrypto crypto) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surfaceLight.withValues(alpha: 0.4),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withValues(alpha: 0.04)),
      ),
      child: Row(
        children: [
          Container(
            width: 36, height: 36,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [Colors.white.withValues(alpha: 0.1), Colors.white.withValues(alpha: 0.02)],
                begin: Alignment.topLeft, end: Alignment.bottomRight,
              ),
              shape: BoxShape.circle,
              border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
            ),
            child: Center(child: Text(crypto.symbol[0], style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 14, color: Colors.white))),
          ),
          const SizedBox(width: 12),
          Expanded(
            flex: 3,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(crypto.name, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 14, color: Colors.white)),
                const SizedBox(height: 2),
                Text(crypto.symbol, style: const TextStyle(color: AppColors.textMuted, fontSize: 11, fontWeight: FontWeight.w600)),
              ],
            ),
          ),
          Expanded(
            flex: 2,
            child: Text(crypto.price, textAlign: TextAlign.right, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13, color: Colors.white)),
          ),
          Expanded(
            flex: 2,
            child: Container(
              margin: const EdgeInsets.only(left: 8),
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
              decoration: BoxDecoration(
                color: (crypto.isPositive ? Colors.green : AppColors.primary).withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                crypto.change,
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: crypto.isPositive ? Colors.greenAccent : const Color(0xFFFCA5A5), 
                  fontSize: 12, 
                  fontWeight: FontWeight.w800,
                ),
              ),
            ),
          ),
          Expanded(
            flex: 2,
            child: Text(crypto.marketCap, textAlign: TextAlign.right, style: const TextStyle(color: AppColors.textMuted, fontSize: 12, fontWeight: FontWeight.w600)),
          ),
        ],
      ),
    );
  }
}
