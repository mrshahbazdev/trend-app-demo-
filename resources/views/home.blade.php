@extends('layouts.app')

@section('content')
    {{-- Sidebar Panel --}}
    <div id="sidebarPanel" class="sidebar-panel">
        <div class="sidebar-header">
            <div class="flex items-center gap-2">
                <button onclick="window.scrollTo(0,0)" class="text-gray-400 hover:text-gray-600" title="@lang('messages.scroll_top')">
                    <span class="material-icons text-xl">keyboard_double_arrow_up</span>
                </button>
                <button onclick="loadReports()" class="text-gray-400 hover:text-gray-600" title="@lang('messages.refresh')">
                    <span class="material-icons text-xl">refresh</span>
                </button>
            </div>
            <button onclick="document.getElementById('sidebarPanel').classList.add('hidden')" class="text-gray-400 hover:text-gray-600" title="@lang('messages.close_panel')">
                <span class="material-icons text-xl">keyboard_backspace</span>
            </button>
        </div>

        {{-- Filter Section --}}
        <div class="border-b">
            <button onclick="document.getElementById('filterSection').classList.toggle('hidden')" class="w-full px-4 py-3 flex items-center justify-between text-sm">
                <div class="flex items-center gap-2">
                    <span id="reportCount" class="font-semibold">0 @lang('messages.reports')</span>
                    <span class="text-gray-500 flex items-center gap-1">
                        @lang('messages.filter_by')
                        <span class="material-icons text-base">filter_list</span>
                    </span>
                </div>
                <span class="material-icons text-base text-gray-400">expand_more</span>
            </button>
            <div id="filterSection" class="hidden px-4 pb-3">
                <div class="flex flex-wrap gap-2">
                    <label class="chip critical selected" data-category="critical">
                        <span class="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                        @lang('messages.critical')
                    </label>
                    <label class="chip active-chip selected" data-category="active">
                        <span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                        @lang('messages.active')
                    </label>
                    <label class="chip observed selected" data-category="observed">
                        <span class="w-2.5 h-2.5 rounded-full bg-green-600"></span>
                        @lang('messages.observed')
                    </label>
                    <label class="chip other selected" data-category="other">
                        <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                        @lang('messages.other_category')
                    </label>
                </div>
            </div>
        </div>

        {{-- Report List --}}
        <div class="sidebar-content" id="reportList">
            <div class="no-reports-msg">
                <p>@lang('messages.no_reports_today')</p>
                <a href="#" onclick="loadYesterday()" class="text-blue-500 hover:underline text-sm">@lang('messages.click_yesterday')</a>
            </div>
        </div>
    </div>

    {{-- Map Container --}}
    <div id="map" style="position: fixed; top: 50px; left: 44px; right: 0; bottom: 0; z-index: 1;"></div>

    {{-- Map Legend --}}
    <div class="map-legend" x-data="{ open: true }">
        <div class="map-legend-header" @click="open = !open">
            <span>@lang('messages.report_types')</span>
            <span class="material-icons text-base transition-transform" :class="{ 'rotate-180': !open }">expand_more</span>
        </div>
        <div class="map-legend-body" x-show="open" x-transition>
            <div class="legend-item">
                <span class="legend-dot" style="background: #e53935;"></span>
                <span>@lang('messages.critical')</span>
            </div>
            <div class="legend-item">
                <span class="legend-dot" style="background: #fdd835;"></span>
                <span>@lang('messages.active')</span>
            </div>
            <div class="legend-item">
                <span class="legend-dot" style="background: #43a047;"></span>
                <span>@lang('messages.observed')</span>
            </div>
            <div class="legend-item">
                <span class="legend-dot" style="background: #1e88e5;"></span>
                <span>@lang('messages.other_category')</span>
            </div>
        </div>
    </div>

    {{-- No Reports Message Overlay --}}
    <div id="mapMessage" class="map-message" style="display: none;">
        <p>@lang('messages.no_reports_today')</p>
        <a href="#" onclick="loadYesterday(); document.getElementById('mapMessage').style.display='none';">@lang('messages.click_yesterday')</a>
    </div>

    {{-- Geolocation Button --}}
    <button class="geolocation-btn" onclick="locateUser()" title="@lang('messages.show_location')">
        <span class="material-icons">my_location</span>
    </button>

    {{-- Submit Report Button --}}
    <a href="/{{ $locale }}/location/report" class="submit-report-btn">
        <span class="material-icons">add</span>
        @lang('messages.submit_report')
    </a>

    {{-- Logo --}}
    <div class="map-logo">
        <a href="/{{ $locale }}/info/about">
            <svg width="120" height="40" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                <text x="10" y="28" font-size="18" font-weight="bold" fill="#5a3e2b" font-family="Inter, sans-serif">PEOPLE</text>
                <text x="10" y="48" font-size="13" fill="#5a3e2b" font-family="Inter, sans-serif">OVER PAPERS</text>
            </svg>
        </a>
    </div>

    {{-- Version --}}
    <div class="version-tag">v1.0.0</div>

    {{-- Footer --}}
    <div class="map-footer">
        <div class="flex items-center gap-2">
            <a href="/{{ $locale }}/info/legal">Legal</a>
            <span>-</span>
            <a href="/{{ $locale }}/info/terms">@lang('messages.terms')</a>
        </div>
        <div>
            <a href="https://leafletjs.com" target="_blank">Leaflet</a> | &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const map = window.initMap('map');
            let clusterGroup = null;
            let hasReportsToday = false;

            window.currentMap = map;

            // Load today's reports
            function loadReports() {
                fetch('/api/reports/today')
                    .then(r => r.json())
                    .then(data => {
                        if (data.features && data.features.length > 0) {
                            hasReportsToday = true;
                            clusterGroup = window.loadReportsOnMap(map, data, clusterGroup);
                            updateSidebar(data.features);
                            document.getElementById('mapMessage').style.display = 'none';
                        } else {
                            document.getElementById('mapMessage').style.display = 'block';
                        }
                    })
                    .catch(() => {
                        document.getElementById('mapMessage').style.display = 'block';
                    });
            }

            window.loadYesterday = function() {
                fetch('/api/reports/yesterday')
                    .then(r => r.json())
                    .then(data => {
                        clusterGroup = window.loadReportsOnMap(map, data, clusterGroup);
                        updateSidebar(data.features);
                        document.getElementById('mapMessage').style.display = 'none';
                    });
            };

            window.loadReports = loadReports;

            function updateSidebar(features) {
                const count = features ? features.length : 0;
                document.getElementById('reportCount').textContent = count + ' @lang("messages.reports")';

                const listEl = document.getElementById('reportList');
                if (!features || features.length === 0) {
                    listEl.innerHTML = '<div class="no-reports-msg"><p>@lang("messages.no_reports_today")</p></div>';
                    return;
                }

                let html = '';
                features.forEach(f => {
                    const p = f.properties;
                    const categoryColors = { critical: '#e53935', active: '#fdd835', observed: '#43a047', other: '#1e88e5' };
                    const bgColor = categoryColors[p.category] || '#1e88e5';
                    const textColor = p.category === 'active' ? '#333' : '#fff';
                    html += `
                        <div class="report-card" onclick="flyToReport(${f.geometry.coordinates[1]}, ${f.geometry.coordinates[0]}, ${p.id})">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-xs px-2 py-0.5 rounded" style="background:${bgColor};color:${textColor}">${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</span>
                                <span class="text-xs text-gray-500">${p.date}</span>
                                <span class="text-xs ${p.is_confirmed ? 'text-green-600' : 'text-gray-400'}">${p.is_confirmed ? 'Confirmed' : 'Not Confirmed'}</span>
                            </div>
                            <div class="text-sm text-gray-700 truncate">${p.address}</div>
                            <div class="text-xs text-gray-400 mt-1">Submitted: ${p.time_submitted}</div>
                        </div>
                    `;
                });
                listEl.innerHTML = html;
            }

            window.flyToReport = function(lat, lng, id) {
                map.flyTo([lat, lng], 16);
            };

            window.locateUser = function() {
                map.locate({ setView: true, maxZoom: 16 });
            };

            // Filter chips toggle
            document.querySelectorAll('.chip[data-category]').forEach(chip => {
                chip.addEventListener('click', () => {
                    chip.classList.toggle('selected');
                });
            });

            loadReports();
        });
    </script>
@endsection
