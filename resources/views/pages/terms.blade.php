@extends('layouts.app')

@section('content')
    <div style="margin-top: 50px; margin-left: 44px; height: calc(100vh - 50px); overflow-y: auto;">
        <div class="max-w-3xl mx-auto px-8 py-12">
            <div class="flex items-center gap-4 mb-8">
                <a href="/{{ $locale }}" class="text-gray-400 hover:text-gray-600">
                    <span class="material-icons">arrow_back</span>
                </a>
                <a href="/{{ $locale }}" class="text-gray-400 hover:text-gray-600">
                    <span class="material-icons">map</span>
                </a>
                <h1 class="text-2xl font-bold">@lang('messages.terms_of_service')</h1>
            </div>

            <p class="text-sm text-gray-500 mb-8">Effective Date: October 5, 2025 | Revised: December 12, 2025</p>

            <div class="prose max-w-none text-gray-700 space-y-6">
                <section>
                    <h2 class="text-lg font-semibold">1. Acceptance of Terms</h2>
                    <p class="leading-relaxed">By accessing or using this platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use the Service.</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold">2. Modifications to Terms</h2>
                    <p class="leading-relaxed">We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Continued use of the Service after any modification constitutes acceptance of the revised Terms.</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold">3. Use of Service</h2>
                    <p class="leading-relaxed">The Service provides a platform for community members to share information about immigration enforcement activity. You agree to use the Service only for its intended purpose and in accordance with all applicable laws.</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold">4. Ownership</h2>
                    <p class="leading-relaxed">All content, features, and functionality of the Service are owned by Pueblo Project Foundation and are protected by intellectual property laws.</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold">5. Data Processing</h2>
                    <p class="leading-relaxed">By submitting reports, you consent to the processing of the information you provide. We may store, moderate, and display submitted reports on the platform.</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold">6. Prohibited Conduct</h2>
                    <p class="leading-relaxed">You agree not to submit false or misleading reports, use the Service to harass or endanger others, attempt to gain unauthorized access to the Service, or use the Service for any illegal purpose.</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold">7. Bullying & Harassment Policy</h2>
                    <p class="leading-relaxed">We have zero tolerance for bullying, harassment, or intimidation of any kind on this platform. Reports that target individuals or communities will be removed and may result in permanent bans.</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold">8. User Submissions</h2>
                    <p class="leading-relaxed">By submitting content to the Service, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your submissions in connection with the Service.</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold">9. Privacy & Security</h2>
                    <p class="leading-relaxed">We are committed to protecting your privacy. We collect only the information necessary to operate the Service and do not sell personal data to third parties.</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold">10. Intellectual Property Rights</h2>
                    <p class="leading-relaxed">The Service and its original content are protected by copyright, trademark, and other laws. You may not copy, modify, or distribute any part of the Service without prior written consent.</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold">11. Termination</h2>
                    <p class="leading-relaxed">We reserve the right to terminate or suspend access to the Service at any time, without notice, for any reason.</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold">12. Limitation of Liability</h2>
                    <p class="leading-relaxed">The Service is provided "as is" without warranties of any kind. We shall not be liable for any damages arising from the use of the Service.</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold">13. Disclaimers</h2>
                    <p class="leading-relaxed">We do not warrant the accuracy, completeness, or usefulness of any information on the Service. Use of the Service is at your own risk.</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold">14. Indemnification</h2>
                    <p class="leading-relaxed">You agree to indemnify and hold harmless Pueblo Project Foundation from any claims arising from your use of the Service.</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold">15. Governing Law</h2>
                    <p class="leading-relaxed">These Terms are governed by the laws of the Commonwealth of Massachusetts, without regard to conflict of law principles.</p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold">16. Contact Information</h2>
                    <p class="leading-relaxed">For questions about these Terms, contact us at: <a href="mailto:contact@puebloproject.com" class="text-blue-600 hover:underline">contact@puebloproject.com</a></p>
                </section>

                <section>
                    <h2 class="text-lg font-semibold">17. Miscellaneous</h2>
                    <p class="leading-relaxed">If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect. Our failure to enforce any provision shall not constitute a waiver.</p>
                </section>
            </div>
        </div>
    </div>
@endsection
