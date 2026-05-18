class MockUser {
  final String name;
  final String handle;
  final String avatar;
  final bool isVerified;
  final bool isOnline;
  final String? walletAddress;
  final String? bio;

  const MockUser({
    required this.name,
    required this.handle,
    required this.avatar,
    this.isVerified = false,
    this.isOnline = false,
    this.walletAddress,
    this.bio,
  });
}

class MockMessage {
  final String sender;
  final String content;
  final String time;
  final bool isMe;
  final String? burnTimer;
  final bool isEncrypted;
  final String? attachment;

  const MockMessage({
    required this.sender,
    required this.content,
    required this.time,
    this.isMe = false,
    this.burnTimer,
    this.isEncrypted = true,
    this.attachment,
  });
}

class MockConversation {
  final MockUser user;
  final String lastMessage;
  final String time;
  final int unreadCount;
  final String? burnTimer;
  final bool isPinned;

  const MockConversation({
    required this.user,
    required this.lastMessage,
    required this.time,
    this.unreadCount = 0,
    this.burnTimer,
    this.isPinned = false,
  });
}

class MockGroup {
  final String name;
  final String icon;
  final int members;
  final String lastMessage;
  final String time;
  final String? burnTimer;
  final int unreadCount;

  const MockGroup({
    required this.name,
    required this.icon,
    required this.members,
    required this.lastMessage,
    required this.time,
    this.burnTimer,
    this.unreadCount = 0,
  });
}

class MockNotification {
  final String title;
  final String description;
  final String time;
  final String type;
  final String icon;

  const MockNotification({
    required this.title,
    required this.description,
    required this.time,
    required this.type,
    required this.icon,
  });
}

class MockCrypto {
  final String name;
  final String symbol;
  final String price;
  final String change;
  final bool isPositive;
  final String marketCap;
  final String volume;

  const MockCrypto({
    required this.name,
    required this.symbol,
    required this.price,
    required this.change,
    required this.isPositive,
    required this.marketCap,
    required this.volume,
  });
}

class MockPost {
  final MockUser user;
  final String content;
  final String time;
  final int likes;
  final int comments;
  final int reposts;
  final String? image;
  final String? burnTimer;

  const MockPost({
    required this.user,
    required this.content,
    required this.time,
    this.likes = 0,
    this.comments = 0,
    this.reposts = 0,
    this.image,
    this.burnTimer,
  });
}

class MockData {
  static const currentUser = MockUser(
    name: 'shahbaz',
    handle: '@shahbazdev',
    avatar: 'S',
    isVerified: true,
    isOnline: true,
    walletAddress: '0x71C...4f92',
    bio: 'Building secure bridges for the digital age. E2EE enthusiast.',
  );

  static const List<MockUser> contacts = [
    MockUser(name: 'Satoshi.sol', handle: '@nakamoto_99', avatar: 'S', isVerified: true, isOnline: true, walletAddress: '0x98f2...77a1'),
    MockUser(name: 'Alex Rivera', handle: '@arivera', avatar: 'A', isVerified: true, isOnline: true, bio: 'Privacy enthusiast'),
    MockUser(name: 'Sarah Connor', handle: '@schen', avatar: 'SC', isVerified: true, isOnline: false),
    MockUser(name: 'Julian Vance', handle: '@julian_v', avatar: 'J', isOnline: false, walletAddress: '0x4a...f2'),
    MockUser(name: 'Marcus Wright', handle: '@mwright', avatar: 'M', isOnline: true),
    MockUser(name: 'Elena Sokolov', handle: '@esokolov', avatar: 'E', isVerified: true, isOnline: false),
    MockUser(name: 'Jordan Smith', handle: '@jsmith', avatar: 'JS', isOnline: true),
    MockUser(name: 'Riley Knox', handle: '@rknox', avatar: 'R', isOnline: false),
    MockUser(name: 'Nina Williams', handle: '@nina_w', avatar: 'N', isOnline: true),
    MockUser(name: 'Thomas Burke', handle: '@tburke', avatar: 'T', isOnline: false),
    MockUser(name: 'Aaron Smith', handle: '@aaron_vault', avatar: 'AS', isOnline: false),
    MockUser(name: 'Alice Johnson', handle: '@alice_crypto', avatar: 'AJ', isVerified: true, isOnline: true),
    MockUser(name: 'Bob Peters', handle: '@bp_nodes', avatar: 'BP', isOnline: false),
    MockUser(name: 'Catherine V', handle: '@cat_verity', avatar: 'CV', isOnline: true),
    MockUser(name: 'David Graham', handle: '@dg_secure', avatar: 'DG', isOnline: false),
  ];

  static const List<MockConversation> conversations = [
    MockConversation(
      user: MockUser(name: 'Satoshi.sol', handle: '@nakamoto', avatar: 'S', isOnline: true, isVerified: true),
      lastMessage: 'The liquidity pool is ready for signature...',
      time: '12:45 PM',
      unreadCount: 3,
    ),
    MockConversation(
      user: MockUser(name: 'Alex Rivera', handle: '@arivera', avatar: 'A', isOnline: true, isVerified: true),
      lastMessage: 'Shared a secure image',
      time: 'Yesterday',
    ),
    MockConversation(
      user: MockUser(name: 'TrendUp Security', handle: '@security', avatar: 'T', isOnline: true),
      lastMessage: 'New device binding approval required',
      time: 'Oct 24',
    ),
    MockConversation(
      user: MockUser(name: 'Vault Master', handle: '@vault', avatar: 'V', isOnline: false),
      lastMessage: 'Phrase verification complete.',
      time: 'Oct 23',
    ),
    MockConversation(
      user: MockUser(name: 'Sarah J.', handle: '@sarah_j', avatar: 'SJ', isOnline: false),
      lastMessage: 'Message burned after reading.',
      time: 'Oct 22',
      burnTimer: '24h',
    ),
  ];

  static const List<MockMessage> chatMessages = [
    MockMessage(
      sender: 'stevej',
      content: 'Hey, did you review the protocol-v4 updates? I\'ve pushed the ephemeral key rotation logic.',
      time: '10:24 AM',
      burnTimer: '23h 58m',
    ),
    MockMessage(
      sender: 'Me',
      content: 'Checking it now. The Wallet Connect hook seems a bit more stable with the new provider. Do we need to force re-binding for existing devices?',
      time: '10:25 AM',
      isMe: true,
      burnTimer: '23h 59m',
    ),
    MockMessage(
      sender: 'stevej',
      content: 'Yes, for security compliance.\n1. All nodes must re-verify.\n2. Clear local cache.\n3. Sign new challenge.',
      time: '10:26 AM',
      burnTimer: '23h 59m',
    ),
    MockMessage(
      sender: 'stevej',
      content: 'compliance_report.pdf',
      time: '10:27 AM',
      attachment: '1.2 MB - Encrypted',
      burnTimer: 'Burn on read',
    ),
    MockMessage(
      sender: 'Me',
      content: 'Got it. I\'ll start the migration sequence now. The secure tunnel should be active within 5 minutes.',
      time: '10:28 AM',
      isMe: true,
    ),
  ];

  static const List<MockGroup> groups = [
    MockGroup(name: 'Alpha Core Node', icon: 'A', members: 84, lastMessage: 'Security protocol updated for the next...', time: '14:02', burnTimer: '24h', unreadCount: 4),
    MockGroup(name: 'Treasury Squad', icon: 'T', members: 12, lastMessage: 'Alex: Transaction 0x4f... confirmed', time: 'Yesterday', burnTimer: 'Multi-sig'),
    MockGroup(name: 'Internal Dev Hub', icon: 'I', members: 5, lastMessage: '[Message Expired]', time: 'Mon', burnTimer: 'Burn-on-read'),
    MockGroup(name: 'Cyber Security Research', icon: 'C', members: 12400, lastMessage: 'Daily briefings available', time: 'Today'),
    MockGroup(name: 'TrendUp Global Feed', icon: 'G', members: 45000, lastMessage: 'System Status: All operational', time: 'Today'),
  ];

  static const List<MockNotification> notifications = [
    MockNotification(title: 'stevej sent a message', description: 'Did you check the latest vault encryption update?', time: '2m', type: 'message', icon: 'chat'),
    MockNotification(title: 'Added to Family group', description: 'You were added by @mom', time: '1h', type: 'group', icon: 'group'),
    MockNotification(title: 'Safety number changed for amy', description: 'Peer identity updated. Manual verification recommended.', time: '4h', type: 'security', icon: 'shield'),
    MockNotification(title: 'New device approved', description: 'macOS - Chrome (San Francisco, US)', time: '1d', type: 'device', icon: 'device'),
    MockNotification(title: 'Session expired warning', description: 'Re-authenticate within 12 hours to keep session active.', time: '2d', type: 'warning', icon: 'warning'),
    MockNotification(title: 'Wallet connection active', description: 'TrendUp is now connected to Metamask (0x4f...92e)', time: '3d', type: 'wallet', icon: 'wallet'),
  ];

  static const List<MockCrypto> cryptoData = [
    MockCrypto(name: 'Bitcoin', symbol: 'BTC', price: '\$97,420.50', change: '+2.1%', isPositive: true, marketCap: '\$1.91T', volume: '\$42.8B'),
    MockCrypto(name: 'Ethereum', symbol: 'ETH', price: '\$3,812.24', change: '+1.3%', isPositive: true, marketCap: '\$458.2B', volume: '\$18.1B'),
    MockCrypto(name: 'Solana', symbol: 'SOL', price: '\$178.50', change: '+5.2%', isPositive: true, marketCap: '\$84.1B', volume: '\$6.4B'),
    MockCrypto(name: 'Cardano', symbol: 'ADA', price: '\$0.584', change: '-0.8%', isPositive: false, marketCap: '\$20.7B', volume: '\$420M'),
  ];

  static const List<MockPost> feedPosts = [
    MockPost(
      user: MockUser(name: 'TrendUp Official', handle: '@trendup', avatar: 'T', isVerified: true, isOnline: true),
      content: 'Welcome to the V1 Feed. End-to-end encrypted social interactions are now live. Your data, your keys.',
      time: 'Now',
      likes: 2400,
      comments: 124,
      reposts: 89,
    ),
    MockPost(
      user: MockUser(name: 'AlphaCollector', handle: '@alpha_c', avatar: 'AC', isOnline: true),
      content: 'New proposal for liquidity expansion is now open for voting in the Governance panel. Burn-after-read thread attached for verified members only.',
      time: '2h',
      likes: 45,
      comments: 12,
      reposts: 8,
      burnTimer: '23:14:02',
    ),
    MockPost(
      user: MockUser(name: 'Sarah Jenkins', handle: '@sarah_j', avatar: 'SJ', isOnline: false),
      content: 'Just bridged my wallet to the TrendUp secure vault. The process was seamless. No more worrying about browser extensions being compromised.',
      time: '5h',
      likes: 29,
      comments: 4,
      reposts: 2,
    ),
  ];

  static const List<String> recoveryPhrase = [
    'anchor', 'fossil', 'velvet', 'canyon', 'blaze', 'prism',
    'summit', 'drift', 'ember', 'nexus', 'forge', 'pulse',
  ];

  static const List<Map<String, String>> callHistory = [
    {'name': 'Sarah Jenkins', 'time': 'Today, 2:30 PM', 'type': 'missed', 'avatar': 'SJ'},
    {'name': 'Mike Ross', 'time': 'Today, 11:15 AM', 'duration': '3m 42s', 'type': 'incoming', 'avatar': 'MR'},
    {'name': 'John Doe', 'time': 'Yesterday, 9:45 PM', 'duration': '12m 04s', 'type': 'outgoing', 'avatar': 'JD'},
    {'name': 'Unknown Peer', 'time': 'Oct 24, 6:12 PM', 'type': 'missed', 'avatar': 'UP'},
    {'name': '0x7a...92f1', 'time': 'Oct 22, 11:00 AM', 'duration': '45s', 'type': 'incoming', 'avatar': '0x'},
  ];
}
