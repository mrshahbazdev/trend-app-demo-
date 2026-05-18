import 'dart:ui';
import 'dart:math' as math;
import 'package:flutter/material.dart';

class LiveStreamScreen extends StatefulWidget {
  const LiveStreamScreen({super.key});

  @override
  State<LiveStreamScreen> createState() => _LiveStreamScreenState();
}

class _LiveStreamScreenState extends State<LiveStreamScreen> with TickerProviderStateMixin {
  static const _red = Color(0xFFDC2626);
  static const _muted = Color(0xFF94A3B8);
  
  final TextEditingController _msgController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  
  bool _isFollowing = false;
  
  final List<Map<String, String>> _messages = [
    {'user': 'Alex', 'msg': 'This looks amazing! \uD83D\uDD25'},
    {'user': 'Sam_Crypto', 'msg': 'When does the voting start?'},
    {'user': 'Julia', 'msg': 'Love the new interface.'},
    {'user': 'MarketMaker', 'msg': 'Can we see the fee schedule again?'},
    {'user': 'CryptoKing', 'msg': 'WAGMI \uD83D\uDE80\uD83D\uDE80'},
    {'user': 'Alice', 'msg': 'How do I participate in governance?'},
    {'user': 'Bob99', 'msg': 'Wait, did he just say zero fees?'},
  ];

  // For floating hearts animation
  final List<_Heart> _hearts = [];

  void _sendMessage() {
    final text = _msgController.text.trim();
    if (text.isEmpty) return;
    
    setState(() {
      _messages.insert(0, {'user': 'You', 'msg': text});
      _msgController.clear();
    });
    
    _scrollController.animateTo(
      0,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeOut,
    );
  }

  void _addHeart() {
    setState(() {
      _hearts.add(_Heart(
        key: UniqueKey(),
        controller: AnimationController(
          duration: const Duration(seconds: 2),
          vsync: this,
        )..forward().then((_) {
            setState(() {
              _hearts.removeWhere((h) => h.controller.isCompleted);
            });
          }),
        leftPosition: 40.0 + (math.Random().nextDouble() * 40 - 20),
      ));
    });
  }

  void _showDummyAction(String action) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: Text('$action menu opened', style: const TextStyle(fontWeight: FontWeight.w600)),
      backgroundColor: Colors.black87, behavior: SnackBarBehavior.floating,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      duration: const Duration(seconds: 1),
    ));
  }

  @override
  void dispose() {
    _msgController.dispose();
    _scrollController.dispose();
    for (var h in _hearts) { h.controller.dispose(); }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // Simulated live video background
          Positioned.fill(
            child: Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [Color(0xFF1E293B), Color(0xFF0F172A), Colors.black],
                ),
              ),
            ),
          ),
          // Dark gradient overlay for readability
          Positioned.fill(
            child: DecoratedBox(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Colors.black.withValues(alpha: 0.6),
                    Colors.transparent,
                    Colors.black.withValues(alpha: 0.2),
                    Colors.black.withValues(alpha: 0.8),
                    Colors.black.withValues(alpha: 0.95),
                  ],
                  stops: const [0.0, 0.2, 0.5, 0.8, 1.0],
                ),
              ),
            ),
          ),
          
          SafeArea(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _topHeader(),
                const Spacer(),
                _chatArea(),
                _bottomInput(),
              ],
            ),
          ),
          
          // Floating Hearts Layer
          ..._hearts.map((h) {
            return AnimatedBuilder(
              animation: h.controller,
              key: h.key,
              builder: (context, child) {
                final progress = h.controller.value;
                return Positioned(
                  bottom: 100 + (progress * 200), // Move up
                  right: h.leftPosition + (math.sin(progress * math.pi * 2) * 20), // Wiggle
                  child: Opacity(
                    opacity: 1.0 - progress, // Fade out
                    child: const Icon(Icons.favorite, color: _red, size: 28),
                  ),
                );
              },
            );
          }),
        ],
      ),
    );
  }

  Widget _topHeader() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Host Info
          Container(
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(
              color: Colors.black.withValues(alpha: 0.4),
              borderRadius: BorderRadius.circular(30),
              border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
            ),
            child: Row(
              children: [
                const CircleAvatar(
                  radius: 18,
                  backgroundColor: _red,
                  child: Text('T', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900)),
                ),
                const SizedBox(width: 8),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Truth desk', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 13)),
                    Row(
                      children: [
                        Container(width: 6, height: 6, decoration: const BoxDecoration(color: _red, shape: BoxShape.circle)),
                        const SizedBox(width: 4),
                        Text('14.2K viewers', style: TextStyle(color: Colors.white.withValues(alpha: 0.8), fontSize: 10, fontWeight: FontWeight.w600)),
                      ],
                    ),
                  ],
                ),
                const SizedBox(width: 12),
                GestureDetector(
                  onTap: () => setState(() => _isFollowing = !_isFollowing),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: _isFollowing ? Colors.white.withValues(alpha: 0.1) : _red, 
                      borderRadius: BorderRadius.circular(20),
                      border: _isFollowing ? Border.all(color: Colors.white.withValues(alpha: 0.2)) : null,
                    ),
                    child: Text(_isFollowing ? 'Following' : 'Follow', 
                      style: TextStyle(color: _isFollowing ? Colors.white : Colors.white, fontSize: 11, fontWeight: FontWeight.w800)),
                  ),
                ),
              ],
            ),
          ),
          const Spacer(),
          // Top right controls
          Column(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
                decoration: BoxDecoration(color: Colors.black.withValues(alpha: 0.4), borderRadius: BorderRadius.circular(8)),
                child: Row(
                  children: [
                    const Icon(Icons.remove_red_eye_rounded, size: 14, color: Colors.white),
                    const SizedBox(width: 4),
                    const Text('14.2K', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w800)),
                  ],
                ),
              ),
              const SizedBox(height: 12),
              GestureDetector(
                onTap: () => Navigator.pop(context),
                child: Container(
                  width: 36, height: 36,
                  decoration: BoxDecoration(shape: BoxShape.circle, color: Colors.black.withValues(alpha: 0.4)),
                  child: const Icon(Icons.close_rounded, color: Colors.white, size: 18),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _chatArea() {
    return Container(
      height: 250,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: ShaderMask(
        shaderCallback: (Rect bounds) {
          return LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Colors.transparent, Colors.white.withValues(alpha: 0.1), Colors.white],
            stops: const [0.0, 0.1, 0.4],
          ).createShader(bounds);
        },
        child: ListView.builder(
          controller: _scrollController,
          reverse: true,
          padding: const EdgeInsets.only(bottom: 8),
          itemCount: _messages.length,
          itemBuilder: (context, index) {
            final msg = _messages[index];
            final isMe = msg['user'] == 'You';
            return Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: 28, height: 28,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: isMe ? _red.withValues(alpha: 0.8) : Colors.primaries[msg['user'].hashCode % Colors.primaries.length].withValues(alpha: 0.8),
                    ),
                    child: Center(
                      child: Text(
                        msg['user']![0],
                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 12),
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          msg['user']!,
                          style: TextStyle(color: Colors.white.withValues(alpha: 0.6), fontSize: 11, fontWeight: FontWeight.w700),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          msg['msg']!,
                          style: const TextStyle(color: Colors.white, fontSize: 13, height: 1.3),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _bottomInput() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
      child: Row(
        children: [
          Expanded(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(24),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
                  ),
                  child: TextField(
                    controller: _msgController,
                    style: const TextStyle(color: Colors.white, fontSize: 13),
                    decoration: const InputDecoration(
                      hintText: 'Add a comment...',
                      hintStyle: TextStyle(color: Colors.white70, fontSize: 13),
                      border: InputBorder.none,
                    ),
                    onSubmitted: (_) => _sendMessage(),
                    textInputAction: TextInputAction.send,
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          _actionIcon(Icons.share_rounded, onTap: () => _showDummyAction('Share')),
          const SizedBox(width: 12),
          _actionIcon(Icons.card_giftcard_rounded, color: const Color(0xFFF59E0B), onTap: () => _showDummyAction('Gift')),
          const SizedBox(width: 12),
          _actionIcon(Icons.favorite_rounded, color: _red, onTap: _addHeart),
        ],
      ),
    );
  }

  Widget _actionIcon(IconData ic, {Color color = Colors.white, VoidCallback? onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 44, height: 44,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: Colors.black.withValues(alpha: 0.4),
          border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
        ),
        child: Icon(ic, color: color, size: 20),
      ),
    );
  }
}

class _Heart {
  final Key key;
  final AnimationController controller;
  final double leftPosition;

  _Heart({required this.key, required this.controller, required this.leftPosition});
}
