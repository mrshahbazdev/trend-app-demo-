@extends('layouts.app')

@section('content')
    <div style="margin-top: 50px; margin-left: 44px; height: calc(100vh - 50px); overflow-y: auto;">
        {{-- Hero Section --}}
        <div class="bg-[#5a3e2b] text-white py-16 px-8 text-center relative">
            <div class="max-w-2xl mx-auto">
                <svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-4">
                    <text x="30" y="28" font-size="22" font-weight="bold" fill="white" font-family="Inter, sans-serif">PEOPLE</text>
                    <text x="30" y="48" font-size="15" fill="white" font-family="Inter, sans-serif">OVER PAPERS</text>
                </svg>
            </div>
        </div>

        {{-- Our Mission --}}
        <div class="max-w-3xl mx-auto px-8 py-12">
            <h2 class="text-2xl font-bold mb-6 text-center">@lang('messages.our_mission')</h2>
            <p class="text-gray-700 leading-relaxed mb-6">
                People Over Papers is a community-driven platform that empowers individuals to report and share information
                about immigration enforcement activity in their communities. Our mission is to provide transparency and
                keep communities informed and safe through real-time reporting and verified information sharing.
            </p>
            <p class="text-gray-700 leading-relaxed mb-8">
                We believe in the power of community and collective action. By sharing information, we help protect
                vulnerable populations and ensure that everyone has access to the knowledge they need to stay safe.
            </p>

            {{-- Social Links --}}
            <div class="flex justify-center gap-6 mb-12">
                <a href="https://facebook.com/peopleoverpapers" target="_blank" class="flex items-center gap-2 text-blue-600 hover:underline">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                </a>
                <a href="https://instagram.com/peopleoverpapers" target="_blank" class="flex items-center gap-2 text-pink-600 hover:underline">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    Instagram
                </a>
                <a href="https://tiktok.com/@people_over_papers" target="_blank" class="flex items-center gap-2 text-gray-800 hover:underline">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                    TikTok
                </a>
            </div>

            {{-- Contact --}}
            <div class="text-center mb-12">
                <a href="mailto:contact@puebloproject.com" class="inline-flex items-center gap-2 px-6 py-3 bg-[#5a3e2b] text-white rounded-lg hover:bg-[#4a3221]">
                    <span class="material-icons">email</span>
                    @lang('messages.contact_us')
                </a>
            </div>

            {{-- Pueblo Project Foundation --}}
            <div class="bg-gray-50 rounded-xl p-8 mb-12">
                <h3 class="text-xl font-bold mb-4 text-center">Pueblo Project Foundation</h3>
                <p class="text-gray-700 leading-relaxed text-center mb-6">
                    A 501(c)(3) nonprofit organization dedicated to providing tools and resources to protect
                    immigrant communities through technology, education, and community engagement.
                </p>
                <div class="flex justify-center gap-4">
                    <a href="https://www.zeffy.com/en-US/donation-form/fuel-the-mission" target="_blank"
                       class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                        @lang('messages.donate')
                    </a>
                    <a href="#" class="px-6 py-3 border-2 border-[#5a3e2b] text-[#5a3e2b] rounded-lg hover:bg-[#5a3e2b] hover:text-white font-medium">
                        @lang('messages.get_involved')
                    </a>
                </div>
            </div>

            {{-- Featured In --}}
            <div class="text-center mb-12">
                <h3 class="text-lg font-semibold mb-6 text-gray-500">@lang('messages.featured_in')</h3>
                <div class="flex flex-wrap justify-center gap-8 items-center text-gray-400">
                    <span class="text-lg font-bold">Univision</span>
                    <span class="text-lg font-bold">MSNBC</span>
                    <span class="text-lg font-bold">Washington Post</span>
                    <span class="text-lg font-bold">Gizmodo</span>
                    <span class="text-lg font-bold">Marie Claire</span>
                    <span class="text-lg font-bold">Boyle Heights Beat</span>
                </div>
            </div>
        </div>
    </div>
@endsection
