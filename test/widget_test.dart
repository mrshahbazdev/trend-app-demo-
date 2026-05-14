import 'package:flutter_test/flutter_test.dart';

import 'package:trendup/main.dart';

void main() {
  testWidgets('App smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const TrendUpApp());
    expect(find.text('TrendUp'), findsWidgets);
  });
}
