import 'package:flutter/material.dart';
import '../widgets/grid_background.dart';
import '../theme/app_theme.dart';

class TodayHubScreen extends StatefulWidget {
  const TodayHubScreen({super.key});
  @override
  State<TodayHubScreen> createState() => _TodayHubScreenState();
}

class _TodayHubScreenState extends State<TodayHubScreen> {
  int _tab = 1; // Default to For You
  int _fyFilter = 0;
  int _bottomIdx = 0;
  int _newsFilter = 0; // 0=Breaking, 1=World, 2=Science, 3=Tech
  int _marketFilter = 0; // 0=Crypto, 1=Categories, 2=Chains, 3=Venues
  final Set<String> _activePulses = {}; // Tracks active pulse chips
  
  
  
  
  

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: GridBackground(
        child: SafeArea(child: Column(children: [
          _header(),
          Expanded(child: [_newsTab(), _forYouTab(), _marketTab()][_tab]),
        ])),
      ),
      bottomNavigationBar: _bottomNav(),
    );
  }

  Widget _header() {
    final labels = ['News', 'For You', 'Market'];
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 14, 16, 12),
      decoration: BoxDecoration(
        color: AppColors.background.withValues(alpha: 0.92),
        border: Border(bottom: BorderSide(color: Colors.white.withValues(alpha: 0.06))),
      ),
      child: Column(children: [
        Row(children: [
          ClipRRect(borderRadius: BorderRadius.circular(10),
            child: Image.asset('assets/images/logo.png', width: 30, height: 30)),
          const SizedBox(width: 10),
          const Text('Today', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: Colors.white, letterSpacing: 0.5)),
          const Spacer(),
          _iconBox(Icons.search_rounded),
          const SizedBox(width: 8),
          GestureDetector(onTap: () => _showNotifications(), child: Stack(children: [
            _iconBox(Icons.notifications_none_rounded),
            Positioned(right: 6, top: 6, child: Container(width: 8, height: 8,
              decoration: BoxDecoration(shape: BoxShape.circle, color: AppColors.primary, border: Border.all(color: AppColors.background, width: 1.5)))),
          ])),
        ]),
        const SizedBox(height: 14),
        Container(
          height: 42, padding: const EdgeInsets.all(3),
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.04),
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: Colors.white.withValues(alpha: 0.06)),
          ),
          child: Row(children: List.generate(3, (i) {
            final on = _tab == i;
            return Expanded(child: GestureDetector(
              onTap: () => setState(() => _tab = i),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                decoration: BoxDecoration(color: on ? AppColors.primary : Colors.transparent, borderRadius: BorderRadius.circular(11)),
                child: Center(child: Text(labels[i], style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: on ? Colors.white : AppColors.textMuted))),
              ),
            ));
          })),
        ),
      ]),
    );
  }

  Widget _iconBox(IconData ic) => Container(
    width: 38, height: 38,
    decoration: BoxDecoration(borderRadius: BorderRadius.circular(12), color: Colors.white.withValues(alpha: 0.05), border: Border.all(color: Colors.white.withValues(alpha: 0.08))),
    child: Icon(ic, size: 18, color: AppColors.textMuted),
  );

  Widget _forYouTab() {
    return ListView(padding: const EdgeInsets.only(bottom: 20), children: [
      _composeSection(),
      _filterTabs(),
      if (_fyFilter == 0 || _fyFilter == 2) ...[
        _pulseStrip(['BTC +2.1%', 'ETH +1.3%', '\$TUP desk', 'Truth desk', 'Quorum 72%']),
      ],
      if (_fyFilter == 0 || _fyFilter == 1) ...[
        _storiesRail(),
      ],
      if (_fyFilter == 0 || _fyFilter == 3) ...[
        _card('Breaking', Icons.bolt_rounded, 'See all', Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          _bigNews('Editors confirm primary sources for bridge closure; city posts match field reports', 'Truth desk  23m'),
          _div(), _newsItem('School board vote: live tally + citation links', '1h'),
          _newsItem('Weather service corrects surge map', '2h'),
          _newsItem('Community picks new moderation council', '3h'),
        ])),
      ],
      if (_fyFilter == 0 || _fyFilter == 1) ...[
        _card('Feed', Icons.dynamic_feed_rounded, 'Filter', Column(children: [
          _post('\$creator', '9m  \$FridayVibes', 'Quick highlight - market psychology in 60 seconds.', 161, 18),
          _div(),
          _post('Julia', '2h  \$LongTerm', 'Bitcoin or Ethereum for long-term investing? Opinions are not protocol votes.', 204, 37),
        ])),
      ],
      if (_fyFilter == 0 || _fyFilter == 2) ...[
        _card('Governance', Icons.how_to_vote_rounded, null, _govWidget()),
        _card('Tickers', Icons.candlestick_chart_rounded, 'Manage', Column(children: [
          _ticker('BTC', '\$67,812', '+2.1%', true), _ticker('ETH', '\$3,057', '+1.3%', true),
          _ticker('SOL', '\$142.18', '-0.6%', false), _ticker('\$TUP', 'Project', '+4.2%', true),
        ])),
      ],
      if (_fyFilter == 0 || _fyFilter == 1 || _fyFilter == 3) ...[
        _card('Live now', Icons.sensors_rounded, 'See all', Column(children: [
          _live('Morning newsroom', 'Truth desk - 2.4k watching'),
          const SizedBox(height: 10),
          _live('Community AMA', 'Governance Q&A - 418 watching'),
        ])),
      ]
    ]);
  }

  Widget _newsTab() {
    final filters = ['Breaking', 'World', 'Science', 'Tech'];
    final hints = [
      'Desk focus: Breaking — tap World, Science, or Tech.',
      'Desk focus: World — global stories from primary sources.',
      'Desk focus: Science — peer-reviewed papers and updates.',
      'Desk focus: Tech — hardware, software, and regulations.'
    ];

    final showWire = _activePulses.isEmpty || _activePulses.contains('Wire · fast');
    final showFactChecks = _activePulses.isEmpty || _activePulses.contains('Fact checks');
    final showLive = _activePulses.contains('Live briefings'); // Only show if explicitly selected

    return ListView(padding: const EdgeInsets.only(bottom: 20), children: [
      _pulseStrip(['Wire · fast', 'Fact checks', 'Live briefings']),
      
      if (showWire)
        _card('Breaking', Icons.bolt_rounded, 'Wire', Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        _bigNews('Agency publishes raw data; newsrooms cross-check video line-by-line', 'World · 8m'),
        _div(),
        if (_newsFilter == 0 || _newsFilter == 2) _newsItem('Science: preprint updated after peer notes', '22m'),
        if (_newsFilter == 0 || _newsFilter == 3) _newsItem('Tech: source links on every alert card', '35m'),
        if (_newsFilter == 0) _newsItem('Markets digest after data print', '28m'),
        if (_newsFilter == 0) _newsItem('Local: cooling centers verified by volunteers', '51m'),
        if (_newsFilter == 1) _newsItem('World: UN summit final draft leaked early', '1h'),
        if (_newsFilter == 1) _newsItem('World: Treaty negotiations hit delay', '2h'),
        const SizedBox(height: 12),
        // Topic Pills
        SingleChildScrollView(scrollDirection: Axis.horizontal, child: Row(children: List.generate(filters.length, (i) {
          final on = _newsFilter == i;
          return Padding(padding: const EdgeInsets.only(right: 8), child: GestureDetector(
            onTap: () {
              setState(() => _newsFilter = i);
              ScaffoldMessenger.of(context).hideCurrentSnackBar();
              ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Topic: ${filters[i]}'), duration: const Duration(seconds: 1), backgroundColor: Colors.black87, behavior: SnackBarBehavior.floating, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))));
            },
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: on ? AppColors.primary.withValues(alpha: 0.12) : Colors.white.withValues(alpha: 0.04),
                border: Border.all(color: on ? AppColors.primary.withValues(alpha: 0.3) : Colors.white.withValues(alpha: 0.08)),
              ),
              child: Text(filters[i], style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: on ? Colors.white : AppColors.textMuted)),
            ),
          ));
        }))),
        const SizedBox(height: 10),
        Text(hints[_newsFilter], style: const TextStyle(fontSize: 10, color: Color(0xFF00E5FF))),
      ])),

      if (showFactChecks)
        _card('Verify & analysis', Icons.verified_rounded, null, Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Container(width: 48, height: 48, decoration: BoxDecoration(borderRadius: BorderRadius.circular(12),
            gradient: const LinearGradient(colors: [AppColors.success, Color(0xFF00E5FF)], begin: Alignment.topLeft, end: Alignment.bottomRight))),
          const SizedBox(width: 12),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Text('Bridge timeline', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: Colors.white)),
            const SizedBox(height: 4),
            Text('PDF vs field video — both pinned · 14m', style: TextStyle(fontSize: 11, color: Colors.white.withValues(alpha: 0.6))),
          ])),
        ]),
        const SizedBox(height: 12),
        const Text('Same verification lane as desktop News — receipts, not vibes. Social reactions stay in For You.', style: TextStyle(fontSize: 11, color: AppColors.textMuted, height: 1.45)),
        const SizedBox(height: 12),
        _div(),
        _newsItem('Election scanners: hash logs published for audit window', '2h'),
        _newsItem('Weather: surge map corrected after crowd-sourced photos', '2h'),
        _newsItem('World: third-party sat confirms line map update', '3h'),
      ])),

      if (showWire)
        _card('Wire list', Icons.list_alt_rounded, 'All', Column(children: [
          _newsItem('Regulator opens comment period on venue risk labels', '12m'),
        _newsItem('Hospitals publish surge capacity; readers add bedside notes', '19m'),
        _newsItem('Open-source tool maps shelter hours vs official PDF', '24m'),
        _newsItem('School district posts raw vote logs; newsroom annotates', '40m'),
        _newsItem('Macro: desk holds chart links to primary releases only', '55m'),
        _newsItem('On-chain: proposal queue frozen during recovery drill', '1h'),
      ])),

      if (showLive)
        _card('Live briefings', Icons.sensors_rounded, 'See all', Column(children: [
          _live('Morning newsroom', 'Truth desk - 2.4k watching'),
          const SizedBox(height: 10),
          _live('Emergency broadcast', 'World News - 12.8k watching'),
        ])),
    ]);
  }

  Widget _marketTab() {
    final megaFilters = ['Cryptocurrencies', 'Categories', 'Chains', 'Venues'];
    return ListView(padding: const EdgeInsets.only(bottom: 20), children: [
      _voteBanner(),
      
      // MegaRow Chips
      SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.fromLTRB(16, 0, 16, 12),
        child: Row(children: List.generate(megaFilters.length, (i) {
          final isOn = _marketFilter == i;
          return Padding(padding: const EdgeInsets.only(right: 8), child: GestureDetector(
            onTap: () {
              setState(() => _marketFilter = i);
              ScaffoldMessenger.of(context).hideCurrentSnackBar();
              ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                content: Text('Filtered by: ${megaFilters[i]}'),
                duration: const Duration(seconds: 1),
                backgroundColor: Colors.black87,
                behavior: SnackBarBehavior.floating,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ));
            },
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: isOn ? Colors.white.withValues(alpha: 0.15) : AppColors.surfaceLight.withValues(alpha: 0.5),
                border: Border.all(color: isOn ? Colors.white.withValues(alpha: 0.3) : Colors.white.withValues(alpha: 0.08)),
              ),
              child: Text(megaFilters[i], style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: isOn ? Colors.white : AppColors.textMuted)),
            ),
          ));
        })),
      ),

      _card('Projects', Icons.token_rounded, null, Column(children: [
        if (_marketFilter == 0 || _marketFilter == 1) _projRow('\$T', 'TrendUp', 'Recovery mode - YES leading', 'Active', true),
        if (_marketFilter == 0 || _marketFilter == 1) const SizedBox(height: 8),
        if (_marketFilter == 0 || _marketFilter == 1) _projRow('PG', 'PENGU', 'Sell-cap proposal - turnout 34%', 'Active', false),
        if (_marketFilter == 0 || _marketFilter == 2) const SizedBox(height: 8),
        if (_marketFilter == 0 || _marketFilter == 2) _projRow('ETH', 'ETH ecosystem', 'Fee tier pilot - review', 'Review', false),
        if (_marketFilter == 0 || _marketFilter == 2) const SizedBox(height: 8),
        if (_marketFilter == 0 || _marketFilter == 2) _projRow('SOL', 'SOL L1', 'Validator set notice', 'Info', false),
        if (_marketFilter == 3) _projRow('UNI', 'Uniswap', 'Venue liquidity report', 'Info', false),
        if (_marketFilter == 3) const SizedBox(height: 8),
        if (_marketFilter == 3) _projRow('AAVE', 'Aave V3', 'Market risk parameters', 'Review', false),
      ])),

      // Missing Recovery Mini Cards
      Container(
        margin: const EdgeInsets.fromLTRB(16, 12, 16, 0),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.primary.withValues(alpha: 0.35)),
          gradient: LinearGradient(colors: [AppColors.primary.withValues(alpha: 0.12), Colors.black.withValues(alpha: 0.5)], begin: Alignment.topLeft, end: Alignment.bottomRight),
        ),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const Text('RECOVERY MODE', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w900, color: Colors.white, letterSpacing: 0.5)),
          const SizedBox(height: 6),
          const Text('Stronger sell protections while markets stabilize — same YES / NO pattern as desktop.', style: TextStyle(fontSize: 11, color: AppColors.textMuted, height: 1.4)),
          const SizedBox(height: 12),
          Row(children: [
            Expanded(child: Container(height: 4, decoration: BoxDecoration(color: const Color(0xFFF97316), borderRadius: BorderRadius.circular(2)))),
            const SizedBox(width: 4),
            Expanded(child: Container(height: 4, decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.2), borderRadius: BorderRadius.circular(2)))),
          ]),
          const SizedBox(height: 12),
          Row(children: [
            Expanded(child: Container(padding: const EdgeInsets.symmetric(vertical: 10), decoration: BoxDecoration(borderRadius: BorderRadius.circular(8), gradient: const LinearGradient(colors: [Color(0xFFF97316), Color(0xFFEA580C)])), child: const Center(child: Text('YES', style: TextStyle(color: Colors.black, fontWeight: FontWeight.w900, fontSize: 13))))),
            const SizedBox(width: 8),
            Expanded(child: Container(padding: const EdgeInsets.symmetric(vertical: 10), decoration: BoxDecoration(borderRadius: BorderRadius.circular(8), color: Colors.white.withValues(alpha: 0.05), border: Border.all(color: Colors.white.withValues(alpha: 0.1))), child: const Center(child: Text('NO', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 13))))),
          ]),
        ]),
      ),

      Container(
        margin: const EdgeInsets.fromLTRB(16, 12, 16, 0),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0xFF6366F1).withValues(alpha: 0.35)),
          gradient: LinearGradient(colors: [const Color(0xFF6366F1).withValues(alpha: 0.12), Colors.black.withValues(alpha: 0.5)], begin: Alignment.topLeft, end: Alignment.bottomRight),
        ),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const Text('CAP CHANGE', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w900, color: Color(0xFFC4B5FD), letterSpacing: 0.5)),
          const SizedBox(height: 6),
          const Text('Raise circulating cap for liquidity program — requires supermajority + timelock in production.', style: TextStyle(fontSize: 11, color: AppColors.textMuted, height: 1.4)),
          const SizedBox(height: 12),
          Row(children: [
            Expanded(flex: 47, child: Container(height: 6, decoration: const BoxDecoration(color: AppColors.success, borderRadius: BorderRadius.horizontal(left: Radius.circular(3))))),
            Expanded(flex: 53, child: Container(height: 6, decoration: const BoxDecoration(color: AppColors.primary, borderRadius: BorderRadius.horizontal(right: Radius.circular(3))))),
          ]),
          const SizedBox(height: 6),
          Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            const Text('For 47%', style: TextStyle(fontSize: 10, color: AppColors.textMuted)),
            const Text('Against 53%', style: TextStyle(fontSize: 10, color: AppColors.textMuted)),
          ]),
        ]),
      ),

      _card('Liquidity snapshot', Icons.water_drop_rounded, 'Read-only', Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        _ticker('Global cap', '\$3.12T', '+1.8%', true),
        _ticker('24h volume', '\$118B', '-3.1%', false),
        _ticker('DEX share', 'All chains', '+0.4%', true),
        _ticker('Stable TVL', 'Tracked', '+0.9%', true),
        const SizedBox(height: 10),
        const Text('Desktop Market trend keeps full tables; here you get the same numbers in a compact stack.', style: TextStyle(fontSize: 10, color: AppColors.textMuted, height: 1.4)),
      ])),

      _card('Fee schedule (mock)', Icons.receipt_long_rounded, 'Desk', Column(children: [
        _feeRow('Tier', 'Maker / Taker', true), _div(),
        _feeRow('Standard', '0.10% / 0.12%', false),
        _feeRow('Proposed', '0.08% / 0.10%', false, hl: true),
        _feeRow('Volume tier A', '0.06% / 0.08%', false),
      ])),
    ]);
  }

  // ========== WIDGETS ==========
  Widget _pulseStrip(List<String> items) => SingleChildScrollView(
    scrollDirection: Axis.horizontal,
    padding: const EdgeInsets.fromLTRB(16, 14, 16, 6),
    child: Row(children: items.map((t) {
      final isActive = _activePulses.contains(t);
      
      Color baseColor = Colors.white;
      if (t.contains('Wire')) baseColor = const Color(0xFF00E5FF); // cyan
      if (t.contains('Live')) baseColor = const Color(0xFFF97316); // hot/orange
      
      return Padding(
        padding: const EdgeInsets.only(right: 8),
        child: GestureDetector(
          onTap: () {
            setState(() {
              if (isActive) {
                _activePulses.remove(t);
              } else {
                _activePulses.add(t);
              }
            });
          },
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20), 
              color: isActive ? baseColor.withValues(alpha: 0.15) : AppColors.surfaceLight.withValues(alpha: 0.7),
              border: Border.all(color: isActive ? baseColor.withValues(alpha: 0.5) : Colors.white.withValues(alpha: 0.08)),
            ),
            child: Text(t, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: isActive ? baseColor : baseColor.withValues(alpha: 0.7))),
          ),
        ),
      );
    }).toList()),
  );

  Widget _storiesRail() {
    final names = ['You', 'Truth desk', '\$creator', 'Markets', 'Live'];
    final rings = [AppColors.textMuted, const Color(0xFF6366f1), const Color(0xFFf97316), AppColors.textMuted, const Color(0xFFa855f7)];
    final icons = [Icons.person, Icons.verified, Icons.star, Icons.show_chart, Icons.play_arrow];
    final initials = ['Y', 'T', 'C', 'M', 'L'];
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 8, 16, 4),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: AppColors.surfaceLight.withValues(alpha: 0.5), borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white.withValues(alpha: 0.06))),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [const Icon(Icons.auto_stories_rounded, size: 14, color: AppColors.primary), const SizedBox(width: 6),
          const Text('Stories', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: Colors.white))]),
        const SizedBox(height: 12),
        SingleChildScrollView(scrollDirection: Axis.horizontal, child: Row(
          children: List.generate(5, (i) => Padding(padding: const EdgeInsets.only(right: 16), child: Column(children: [
            Container(width: 52, height: 52, padding: const EdgeInsets.all(2),
              decoration: BoxDecoration(shape: BoxShape.circle, border: Border.all(color: rings[i], width: 2)),
              child: Container(
                decoration: BoxDecoration(shape: BoxShape.circle, color: rings[i].withValues(alpha: 0.15)),
                child: Center(child: Icon(icons[i], color: rings[i], size: 20)),
              )),
            const SizedBox(height: 6),
            Text(names[i], style: const TextStyle(fontSize: 10, color: AppColors.textMuted)),
          ]))),
        )),
      ]),
    );
  }

  Widget _composeSection() => Container(
    margin: const EdgeInsets.fromLTRB(16, 12, 16, 0),
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(color: AppColors.surfaceLight.withValues(alpha: 0.5), borderRadius: BorderRadius.circular(20),
      border: Border.all(color: Colors.white.withValues(alpha: 0.06))),
    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Row(children: [
        const Text('COMPOSE', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w900, color: Colors.white, letterSpacing: 1)),
      ]),
      const SizedBox(height: 14),
      Row(children: [
        Container(width: 36, height: 36, decoration: BoxDecoration(shape: BoxShape.circle, color: AppColors.primary.withValues(alpha: 0.15)),
          child: const Icon(Icons.person, color: AppColors.primary, size: 18)),
        const SizedBox(width: 10),
        Expanded(child: GestureDetector(
          onTap: () => _openCompose('Post', Icons.edit_rounded, AppColors.primary),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(borderRadius: BorderRadius.circular(12), color: Colors.white.withValues(alpha: 0.04),
              border: Border.all(color: Colors.white.withValues(alpha: 0.06))),
            child: Text('Share anything - \$mentions and \$topics...', style: TextStyle(fontSize: 12, color: Colors.white.withValues(alpha: 0.35))),
          ),
        )),
      ]),
      const SizedBox(height: 12),
      Row(children: [
        _composeBtn('Post', Icons.edit_rounded, AppColors.primary),
        const SizedBox(width: 8),
        _composeBtn('Video', Icons.videocam_rounded, const Color(0xFF6366f1)),
        const SizedBox(width: 8),
        _composeBtn('Go Live', Icons.sensors_rounded, AppColors.success),
        const SizedBox(width: 8),
        _composeBtn('Meeting', Icons.groups_rounded, AppColors.textMuted),
      ]),
    ]),
  );

  Widget _composeBtn(String label, IconData ic, Color c) => Expanded(
    child: GestureDetector(
      onTap: () => _openCompose(label, ic, c),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(borderRadius: BorderRadius.circular(12), color: c.withValues(alpha: 0.1),
          border: Border.all(color: c.withValues(alpha: 0.2))),
        child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
          Icon(ic, size: 14, color: c), const SizedBox(width: 6),
          Text(label, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: c)),
        ]),
      ),
    ),
  );

  Widget _filterTabs() {
    final filters = ['Customize', 'Social', 'Markets', 'Near you'];
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 10, 16, 0),
      child: Row(children: List.generate(filters.length, (i) {
        final on = _fyFilter == i;
        return Padding(padding: const EdgeInsets.only(right: 8), child: GestureDetector(
          onTap: () => setState(() => _fyFilter = i),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              color: on ? AppColors.primary.withValues(alpha: 0.12) : Colors.white.withValues(alpha: 0.04),
              border: Border.all(color: on ? AppColors.primary.withValues(alpha: 0.3) : Colors.white.withValues(alpha: 0.08)),
            ),
            child: Text(filters[i], style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: on ? Colors.white : AppColors.textMuted)),
          ),
        ));
      })),
    );
  }

  Widget _card(String title, IconData icon, String? action, Widget child) => Container(
    margin: const EdgeInsets.fromLTRB(16, 10, 16, 0),
    decoration: BoxDecoration(color: AppColors.surfaceLight.withValues(alpha: 0.5), borderRadius: BorderRadius.circular(20),
      border: Border.all(color: Colors.white.withValues(alpha: 0.06))),
    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Padding(padding: const EdgeInsets.fromLTRB(16, 14, 16, 12),
        child: Row(children: [
          Icon(icon, size: 16, color: AppColors.primary), const SizedBox(width: 8),
          Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: Colors.white)),
          const Spacer(),
          if (action != null) Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(borderRadius: BorderRadius.circular(8), color: AppColors.primary.withValues(alpha: 0.1)),
            child: Text(action, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: AppColors.primary))),
        ])),
      Container(height: 1, color: Colors.white.withValues(alpha: 0.04)),
      Padding(padding: const EdgeInsets.all(16), child: child),
    ]),
  );

  Widget _bigNews(String t, String sub) => Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
    Container(width: 64, height: 64, decoration: BoxDecoration(borderRadius: BorderRadius.circular(14),
      color: AppColors.primary.withValues(alpha: 0.08), border: Border.all(color: AppColors.primary.withValues(alpha: 0.15))),
      child: const Icon(Icons.newspaper_rounded, color: AppColors.primary, size: 22)),
    const SizedBox(width: 12),
    Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text(t, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Colors.white, height: 1.4)),
      const SizedBox(height: 4), Text(sub, style: const TextStyle(fontSize: 11, color: AppColors.textMuted)),
    ])),
  ]);

  Widget _newsItem(String t, String time) => Padding(padding: const EdgeInsets.symmetric(vertical: 7),
    child: Row(children: [
      Container(width: 4, height: 4, decoration: const BoxDecoration(color: AppColors.primary, shape: BoxShape.circle)),
      const SizedBox(width: 10),
      Expanded(child: Text(t, style: const TextStyle(fontSize: 12, color: Colors.white, height: 1.3))),
      const SizedBox(width: 8),
      Text(time, style: const TextStyle(fontSize: 10, color: AppColors.textMuted, fontWeight: FontWeight.w600)),
    ]),
  );

  Widget _post(String user, String meta, String text, int likes, int hearts) => Column(
    crossAxisAlignment: CrossAxisAlignment.start, children: [
      Row(children: [
        Container(width: 36, height: 36, decoration: BoxDecoration(borderRadius: BorderRadius.circular(12),
          color: AppColors.primary.withValues(alpha: 0.1), border: Border.all(color: AppColors.primary.withValues(alpha: 0.15))),
          child: Center(child: Text(user[0], style: const TextStyle(color: AppColors.primary, fontWeight: FontWeight.w800, fontSize: 14)))),
        const SizedBox(width: 10),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(user, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Colors.white)),
          Text(meta, style: const TextStyle(fontSize: 10, color: AppColors.textMuted)),
        ])),
      ]),
      const SizedBox(height: 10),
      Text(text, style: TextStyle(fontSize: 13, color: Colors.white.withValues(alpha: 0.8), height: 1.45)),
      const SizedBox(height: 10),
      Row(children: [_actChip('Like $hearts'), const SizedBox(width: 6), _actChip('Up $likes'), const SizedBox(width: 6), _actChip('Share')]),
    ],
  );

  Widget _actChip(String l) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
    decoration: BoxDecoration(borderRadius: BorderRadius.circular(10), color: Colors.white.withValues(alpha: 0.04),
      border: Border.all(color: Colors.white.withValues(alpha: 0.08))),
    child: Text(l, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: Colors.white)),
  );

  Widget _govWidget() => Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
    const Text('Sell limits poll', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Colors.white)),
    const SizedBox(height: 4),
    const Text('10% / holdings - 6d 23h - quorum 72%', style: TextStyle(fontSize: 11, color: AppColors.textMuted)),
    const SizedBox(height: 12),
    ClipRRect(borderRadius: BorderRadius.circular(6), child: Row(children: [
      Expanded(flex: 54, child: Container(height: 8, color: AppColors.success)),
      Expanded(flex: 46, child: Container(height: 8, color: const Color(0xFF3b82f6).withValues(alpha: 0.5))),
    ])),
    const SizedBox(height: 10),
    Row(children: [
      Expanded(child: _voteChip('Yes 54%', AppColors.success)), const SizedBox(width: 8),
      Expanded(child: _voteChip('No 46%', AppColors.textMuted)),
    ]),
  ]);

  Widget _voteChip(String l, Color c) => Container(
    padding: const EdgeInsets.symmetric(vertical: 10),
    decoration: BoxDecoration(borderRadius: BorderRadius.circular(12), color: c.withValues(alpha: 0.08), border: Border.all(color: c.withValues(alpha: 0.2))),
    child: Center(child: Text(l, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: c))),
  );

  Widget _ticker(String name, String price, String chg, bool pos) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 7),
    child: Row(children: [
      Container(width: 32, height: 32, decoration: BoxDecoration(borderRadius: BorderRadius.circular(10),
        color: Colors.white.withValues(alpha: 0.05), border: Border.all(color: Colors.white.withValues(alpha: 0.08))),
        child: Center(child: Text(name.length > 3 ? name[0] : name, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: Colors.white)))),
      const SizedBox(width: 10),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(name, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Colors.white)),
        Text(price, style: const TextStyle(fontSize: 11, color: AppColors.textMuted)),
      ])),
      Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
        decoration: BoxDecoration(borderRadius: BorderRadius.circular(8), color: (pos ? AppColors.success : AppColors.primary).withValues(alpha: 0.1)),
        child: Text(chg, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: pos ? AppColors.success : AppColors.primary))),
    ]),
  );

  Widget _live(String title, String sub) => Container(
    padding: const EdgeInsets.all(12),
    decoration: BoxDecoration(borderRadius: BorderRadius.circular(14), color: Colors.white.withValues(alpha: 0.03),
      border: Border.all(color: Colors.white.withValues(alpha: 0.06))),
    child: Row(children: [
      Container(width: 48, height: 48, decoration: BoxDecoration(borderRadius: BorderRadius.circular(14), color: AppColors.primary.withValues(alpha: 0.08)),
        child: Center(child: Container(padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
          decoration: BoxDecoration(borderRadius: BorderRadius.circular(6), color: AppColors.primary),
          child: const Text('LIVE', style: TextStyle(fontSize: 8, fontWeight: FontWeight.w900, color: Colors.white))))),
      const SizedBox(width: 12),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Colors.white)),
        const SizedBox(height: 2), Text(sub, style: const TextStyle(fontSize: 11, color: AppColors.textMuted)),
      ])),
      const Icon(Icons.chevron_right_rounded, color: AppColors.textMuted, size: 20),
    ]),
  );

  Widget _voteBanner() => Container(
    margin: const EdgeInsets.fromLTRB(16, 14, 16, 0), padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(borderRadius: BorderRadius.circular(20), color: AppColors.primary.withValues(alpha: 0.06),
      border: Border.all(color: AppColors.primary.withValues(alpha: 0.15))),
    child: Row(children: [
      Container(width: 44, height: 44, decoration: BoxDecoration(borderRadius: BorderRadius.circular(14), color: AppColors.primary.withValues(alpha: 0.1)),
        child: const Icon(Icons.how_to_vote_rounded, color: AppColors.primary, size: 20)),
      const SizedBox(width: 14),
      const Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text('Voting desk', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: Colors.white)),
        SizedBox(height: 4),
        Text('Sell limits, fee tiers, recovery, cap changes', style: TextStyle(fontSize: 11, color: AppColors.textMuted, height: 1.4)),
      ])),
    ]),
  );

  Widget _projRow(String sym, String name, String sub, String pill, bool sel) => Container(
    padding: const EdgeInsets.all(12),
    decoration: BoxDecoration(borderRadius: BorderRadius.circular(14),
      color: sel ? AppColors.primary.withValues(alpha: 0.05) : Colors.white.withValues(alpha: 0.02),
      border: Border.all(color: sel ? AppColors.primary.withValues(alpha: 0.2) : Colors.white.withValues(alpha: 0.06))),
    child: Row(children: [
      Container(width: 40, height: 40, decoration: BoxDecoration(borderRadius: BorderRadius.circular(12),
        color: Colors.white.withValues(alpha: 0.05), border: Border.all(color: Colors.white.withValues(alpha: 0.08))),
        child: Center(child: Text(sym, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w900, color: Colors.white)))),
      const SizedBox(width: 10),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(name, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Colors.white)),
        const SizedBox(height: 2), Text(sub, style: const TextStyle(fontSize: 10, color: AppColors.textMuted)),
      ])),
      Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
        decoration: BoxDecoration(borderRadius: BorderRadius.circular(8), color: AppColors.success.withValues(alpha: 0.1),
          border: Border.all(color: AppColors.success.withValues(alpha: 0.2))),
        child: Text(pill, style: const TextStyle(fontSize: 9, fontWeight: FontWeight.w800, color: AppColors.success))),
    ]),
  );

  Widget _feeRow(String tier, String val, bool hdr, {bool hl = false}) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 6),
    child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
      Text(tier, style: TextStyle(fontSize: 11, fontWeight: hdr ? FontWeight.w800 : FontWeight.w500, color: hdr ? Colors.white : AppColors.textMuted)),
      Text(val, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: hl ? AppColors.success : (hdr ? Colors.white : Colors.white.withValues(alpha: 0.7)))),
    ]),
  );

  Widget _div() => Padding(padding: const EdgeInsets.symmetric(vertical: 8),
    child: Container(height: 1, color: Colors.white.withValues(alpha: 0.04)));

  Widget _bottomNav() {
    final icons = [Icons.home_rounded, Icons.chat_bubble_outline_rounded, Icons.play_circle_outline_rounded, Icons.show_chart_rounded, Icons.person_outline_rounded];
    final labels = ['Home', 'Chats', 'Live', 'Markets', 'Profile'];
    return Container(
      height: 72,
      decoration: BoxDecoration(color: AppColors.background.withValues(alpha: 0.95),
        border: Border(top: BorderSide(color: Colors.white.withValues(alpha: 0.06)))),
      child: Row(children: List.generate(5, (i) {
        final on = _bottomIdx == i;
        return Expanded(child: GestureDetector(
          onTap: () {
            if (i == 0) { setState(() => _bottomIdx = 0); return; }
            setState(() => _bottomIdx = i);
            final routes = ['', '/home', '/livestream', '/market', '/profile'];
            if (routes[i].isNotEmpty) {
              Navigator.pushNamed(context, routes[i]);
              Future.delayed(const Duration(milliseconds: 300), () { if (mounted) setState(() => _bottomIdx = 0); });
            }
          },
          child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
            AnimatedContainer(duration: const Duration(milliseconds: 200),
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
              decoration: BoxDecoration(borderRadius: BorderRadius.circular(12), color: on ? AppColors.primary.withValues(alpha: 0.12) : Colors.transparent),
              child: Icon(icons[i], size: 22, color: on ? AppColors.primary : AppColors.textMuted)),
            const SizedBox(height: 4),
            Text(labels[i], style: TextStyle(fontSize: 10, fontWeight: on ? FontWeight.w800 : FontWeight.w600, color: on ? Colors.white : AppColors.textMuted)),
          ]),
        ));
      })),
    );
  }

  // ========== NOTIFICATION DRAWER ==========
  void _showNotifications() {
    showModalBottomSheet(context: context, backgroundColor: Colors.transparent, isScrollControlled: true,
      builder: (_) => DraggableScrollableSheet(initialChildSize: 0.7, minChildSize: 0.4, maxChildSize: 0.9,
        builder: (_, sc) => Container(
          decoration: BoxDecoration(color: AppColors.background, borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
            border: Border.all(color: Colors.white.withValues(alpha: 0.08))),
          child: Column(children: [
            const SizedBox(height: 12),
            Container(width: 40, height: 4, decoration: BoxDecoration(borderRadius: BorderRadius.circular(2), color: Colors.white.withValues(alpha: 0.2))),
            Padding(padding: const EdgeInsets.fromLTRB(20, 16, 20, 12),
              child: Row(children: [
                const Text('Notifications', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Colors.white)),
                const Spacer(),
                GestureDetector(onTap: () {
                  Navigator.pop(context);
                  Navigator.pushNamed(context, '/notifications');
                }, child: Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(borderRadius: BorderRadius.circular(8), color: AppColors.primary.withValues(alpha: 0.1)),
                  child: const Text('View all', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: AppColors.primary)))),
              ])),
            Container(height: 1, color: Colors.white.withValues(alpha: 0.06)),
            Expanded(child: ListView(controller: sc, padding: const EdgeInsets.all(16), children: [
              _notifItem(Icons.bolt_rounded, 'Breaking News', 'Agency publishes raw data report', '2m', true),
              _notifItem(Icons.how_to_vote_rounded, 'Governance', 'Sell limits poll - quorum reached 72%', '15m', true),
              _notifItem(Icons.trending_up_rounded, 'Market Alert', 'BTC crossed \$68,000 resistance', '32m', true),
              _notifItem(Icons.person_add_rounded, 'New Follower', '\$creator started following you', '1h', false),
              _notifItem(Icons.chat_bubble_rounded, 'Comment', 'Julia replied to your post', '2h', false),
              _notifItem(Icons.sensors_rounded, 'Live Stream', 'Morning newsroom is starting now', '3h', false),
              _notifItem(Icons.verified_rounded, 'Verified', 'Your source was fact-checked', '4h', false),
              _notifItem(Icons.account_balance_wallet_rounded, 'Wallet', 'Deposit confirmed - 0.5 ETH', '5h', false),
            ])),
          ]),
        ),
      ),
    );
  }

  Widget _notifItem(IconData ic, String title, String sub, String time, bool unread) => Container(
    margin: const EdgeInsets.only(bottom: 10), padding: const EdgeInsets.all(14),
    decoration: BoxDecoration(borderRadius: BorderRadius.circular(14),
      color: unread ? AppColors.primary.withValues(alpha: 0.04) : Colors.white.withValues(alpha: 0.02),
      border: Border.all(color: unread ? AppColors.primary.withValues(alpha: 0.12) : Colors.white.withValues(alpha: 0.06))),
    child: Row(children: [
      Container(width: 40, height: 40, decoration: BoxDecoration(borderRadius: BorderRadius.circular(12),
        color: (unread ? AppColors.primary : AppColors.textMuted).withValues(alpha: 0.1)),
        child: Icon(ic, size: 18, color: unread ? AppColors.primary : AppColors.textMuted)),
      const SizedBox(width: 12),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(title, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: unread ? Colors.white : AppColors.textMuted)),
        const SizedBox(height: 2),
        Text(sub, style: TextStyle(fontSize: 11, color: Colors.white.withValues(alpha: 0.5))),
      ])),
      Column(children: [
        Text(time, style: const TextStyle(fontSize: 10, color: AppColors.textMuted, fontWeight: FontWeight.w600)),
        if (unread) ...[const SizedBox(height: 4), Container(width: 6, height: 6, decoration: const BoxDecoration(shape: BoxShape.circle, color: AppColors.primary))],
      ]),
    ]),
  );

  // ========== COMPOSE DIALOGS ==========
  void _openCompose(String type, IconData ic, Color c) {
    final textCtrl = TextEditingController();
    showModalBottomSheet(context: context, backgroundColor: Colors.transparent, isScrollControlled: true,
      builder: (ctx) => Padding(padding: EdgeInsets.only(bottom: MediaQuery.of(ctx).viewInsets.bottom),
        child: Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(color: AppColors.background, borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
            border: Border.all(color: Colors.white.withValues(alpha: 0.08))),
          child: Column(mainAxisSize: MainAxisSize.min, children: [
            Container(width: 40, height: 4, decoration: BoxDecoration(borderRadius: BorderRadius.circular(2), color: Colors.white.withValues(alpha: 0.2))),
            const SizedBox(height: 16),
            Row(children: [
              Icon(ic, color: c, size: 20), const SizedBox(width: 8),
              Text(type, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: c)),
              const Spacer(),
              GestureDetector(onTap: () => Navigator.pop(ctx),
                child: Container(width: 32, height: 32, decoration: BoxDecoration(borderRadius: BorderRadius.circular(10), color: Colors.white.withValues(alpha: 0.05)),
                  child: const Icon(Icons.close, size: 16, color: AppColors.textMuted))),
            ]),
            const SizedBox(height: 16),
            if (type == 'Post') ...[
              Container(
                height: 120, padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(borderRadius: BorderRadius.circular(14), color: Colors.white.withValues(alpha: 0.04),
                  border: Border.all(color: Colors.white.withValues(alpha: 0.08))),
                child: TextField(controller: textCtrl, maxLines: 5, style: const TextStyle(color: Colors.white, fontSize: 13),
                  decoration: InputDecoration(hintText: 'What is on your mind?', hintStyle: TextStyle(color: Colors.white.withValues(alpha: 0.3)), border: InputBorder.none)),
              ),
              const SizedBox(height: 12),
              Row(children: [
                _miniBtn(Icons.image_rounded, 'Photo', c), const SizedBox(width: 8),
                _miniBtn(Icons.gif_rounded, 'GIF', c), const SizedBox(width: 8),
                _miniBtn(Icons.poll_rounded, 'Poll', c), const SizedBox(width: 8),
                _miniBtn(Icons.tag, '\$topic', c),
              ]),
            ] else if (type == 'Video') ...[
              Container(height: 160, decoration: BoxDecoration(borderRadius: BorderRadius.circular(16), color: Colors.white.withValues(alpha: 0.03),
                border: Border.all(color: c.withValues(alpha: 0.2))),
                child: Center(child: Column(mainAxisSize: MainAxisSize.min, children: [
                  Icon(Icons.cloud_upload_rounded, size: 36, color: c), const SizedBox(height: 8),
                  Text('Tap to record or upload', style: TextStyle(fontSize: 13, color: c, fontWeight: FontWeight.w600)),
                  const SizedBox(height: 4),
                  Text('MP4, MOV up to 10min', style: TextStyle(fontSize: 11, color: Colors.white.withValues(alpha: 0.3))),
                ]))),
              const SizedBox(height: 12),
              Container(padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(borderRadius: BorderRadius.circular(12), color: Colors.white.withValues(alpha: 0.04),
                  border: Border.all(color: Colors.white.withValues(alpha: 0.08))),
                child: TextField(controller: textCtrl, style: const TextStyle(color: Colors.white, fontSize: 13),
                  decoration: InputDecoration(hintText: 'Add caption...', hintStyle: TextStyle(color: Colors.white.withValues(alpha: 0.3)), border: InputBorder.none)),
              ),
            ] else if (type == 'Go Live') ...[
              Container(height: 160, decoration: BoxDecoration(borderRadius: BorderRadius.circular(16), color: AppColors.primary.withValues(alpha: 0.04),
                border: Border.all(color: AppColors.primary.withValues(alpha: 0.2))),
                child: Center(child: Column(mainAxisSize: MainAxisSize.min, children: [
                  Container(padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(borderRadius: BorderRadius.circular(8), color: AppColors.primary),
                    child: const Text('LIVE', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900, color: Colors.white))),
                  const SizedBox(height: 12),
                  Text('Camera preview', style: TextStyle(fontSize: 13, color: Colors.white.withValues(alpha: 0.4))),
                ]))),
              const SizedBox(height: 12),
              Container(padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(borderRadius: BorderRadius.circular(12), color: Colors.white.withValues(alpha: 0.04),
                  border: Border.all(color: Colors.white.withValues(alpha: 0.08))),
                child: TextField(controller: textCtrl, style: const TextStyle(color: Colors.white, fontSize: 13),
                  decoration: InputDecoration(hintText: 'Stream title...', hintStyle: TextStyle(color: Colors.white.withValues(alpha: 0.3)), border: InputBorder.none)),
              ),
            ] else ...[
              Container(padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(borderRadius: BorderRadius.circular(12), color: Colors.white.withValues(alpha: 0.04),
                  border: Border.all(color: Colors.white.withValues(alpha: 0.08))),
                child: TextField(controller: textCtrl, style: const TextStyle(color: Colors.white, fontSize: 13),
                  decoration: InputDecoration(hintText: 'Meeting topic...', hintStyle: TextStyle(color: Colors.white.withValues(alpha: 0.3)), border: InputBorder.none)),
              ),
              const SizedBox(height: 12),
              Row(children: [
                _miniBtn(Icons.calendar_today_rounded, 'Schedule', c), const SizedBox(width: 8),
                _miniBtn(Icons.people_rounded, 'Invite', c), const SizedBox(width: 8),
                _miniBtn(Icons.link_rounded, 'Link', c),
              ]),
            ],
            const SizedBox(height: 16),
            SizedBox(width: double.infinity, height: 48,
              child: ElevatedButton(onPressed: () { Navigator.pop(ctx);
                ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                  content: Text('$type ${type == 'Go Live' ? 'started!' : 'published!'}', style: const TextStyle(fontWeight: FontWeight.w600)),
                  backgroundColor: c, behavior: SnackBarBehavior.floating,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12))));},
                style: ElevatedButton.styleFrom(backgroundColor: c, foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14))),
                child: Text(type == 'Go Live' ? 'Go Live Now' : type == 'Meeting' ? 'Create Meeting' : 'Publish $type',
                  style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 14)))),
          ]),
        ),
      ),
    );
  }

  Widget _miniBtn(IconData ic, String l, Color c) => Expanded(child: Container(
    padding: const EdgeInsets.symmetric(vertical: 8),
    decoration: BoxDecoration(borderRadius: BorderRadius.circular(10), color: Colors.white.withValues(alpha: 0.04),
      border: Border.all(color: Colors.white.withValues(alpha: 0.08))),
    child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
      Icon(ic, size: 14, color: c), const SizedBox(width: 4),
      Text(l, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: Colors.white.withValues(alpha: 0.6))),
    ]),
  ));
}
