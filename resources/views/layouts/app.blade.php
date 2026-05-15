<!DOCTYPE html>
<html lang="{{ $locale ?? 'en' }}" @if(in_array($locale ?? 'en', ['ar', 'ps', 'prs'])) dir="rtl" @endif>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>People Over Papers</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    {{-- Donation Banner --}}
    <div class="donation-banner">
        <a href="https://www.zeffy.com/en-US/donation-form/fuel-the-mission" target="_blank">
            @lang('messages.donation_banner')
        </a>
    </div>

    {{-- Language Selector --}}
    <div class="lang-selector">
        <select onchange="window.location.href = '/' + this.value + window.location.pathname.replace(/^\/[a-z]{2}(-[A-Za-z]+)?/, '')" aria-label="Language">
            @foreach(['en' => 'en', 'es' => 'es', 'ar' => 'ar', 'so' => 'so', 'zh-Hant' => 'zh-Hant', 'zh-Hans' => 'zh-Hans', 'ko' => 'ko', 'tl' => 'tl', 'pt' => 'pt', 'fr' => 'fr', 'ps' => 'ps', 'prs' => 'prs'] as $code => $label)
                <option value="{{ $code }}" {{ ($locale ?? 'en') === $code ? 'selected' : '' }}>{{ $label }}</option>
            @endforeach
        </select>
    </div>

    {{-- Toolbar --}}
    <nav class="toolbar">
        <button title="@lang('messages.view_today')" onclick="window.location.href='/{{ $locale ?? 'en' }}'" class="{{ request()->is($locale ?? 'en') || request()->is(($locale ?? 'en').'/') ? 'active' : '' }}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"/></svg>
        </button>
        <button title="@lang('messages.search_reports')" onclick="window.location.href='/{{ $locale ?? 'en' }}/search/report'">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </button>
        <button title="@lang('messages.search_vehicles')" onclick="window.location.href='/{{ $locale ?? 'en' }}/search/vehicle'">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17h2m10 0h2M5 11l1.5-4.5h11L19 11M3 11h18v6H3z"/><circle cx="7" cy="17" r="1.5"/><circle cx="17" cy="17" r="1.5"/></svg>
        </button>
        <button title="@lang('messages.list_view')" id="toggleListBtn" onclick="document.getElementById('sidebarPanel')?.classList.toggle('hidden')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></svg>
        </button>
        <button title="@lang('messages.add_alert')" onclick="document.getElementById('alertModal')?.classList.remove('hidden')" class="alert-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </button>
        <button title="@lang('messages.about')" onclick="window.location.href='/{{ $locale ?? 'en' }}/info/about'">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        </button>
        <button title="@lang('messages.report_issue')" onclick="document.getElementById('issueModal')?.classList.remove('hidden')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </button>
    </nav>

    {{-- Main Content --}}
    @yield('content')

    {{-- Alert Permission Modal --}}
    <div id="alertModal" class="modal-overlay hidden" onclick="if(event.target===this) this.classList.add('hidden')">
        <div class="modal-content">
            <h2 class="text-lg font-semibold mb-3">@lang('messages.notification_permission')</h2>
            <p class="text-sm text-gray-600 mb-4">@lang('messages.notification_permission_text')</p>
            <div class="flex justify-end gap-3">
                <button onclick="document.getElementById('alertModal').classList.add('hidden')" class="px-4 py-2 text-sm border rounded hover:bg-gray-50">@lang('messages.cancel')</button>
                <button onclick="requestNotificationPermission()" class="px-4 py-2 text-sm bg-[#5a3e2b] text-white rounded hover:bg-[#4a3221]">Ok</button>
            </div>
        </div>
    </div>

    {{-- Report Issue Modal --}}
    <div id="issueModal" class="modal-overlay hidden" onclick="if(event.target===this) this.classList.add('hidden')">
        <div class="modal-content">
            <h2 class="text-lg font-semibold mb-3">@lang('messages.report_issue')</h2>
            <textarea class="w-full border rounded p-3 text-sm" rows="4" placeholder="@lang('messages.describe_issue')"></textarea>
            <div class="flex justify-end gap-3 mt-4">
                <button onclick="document.getElementById('issueModal').classList.add('hidden')" class="px-4 py-2 text-sm border rounded hover:bg-gray-50">@lang('messages.cancel')</button>
                <button class="px-4 py-2 text-sm bg-[#5a3e2b] text-white rounded hover:bg-[#4a3221]">@lang('messages.submit')</button>
            </div>
        </div>
    </div>

    <script>
        function requestNotificationPermission() {
            if ('Notification' in window) {
                Notification.requestPermission().then(function(permission) {
                    document.getElementById('alertModal').classList.add('hidden');
                    if (permission === 'granted') {
                        alert('Notifications enabled!');
                    }
                });
            }
        }
    </script>
</body>
</html>
