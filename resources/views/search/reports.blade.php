@extends('layouts.app')

@section('content')
    {{-- Map Background --}}
    <div id="map" style="position: fixed; top: 50px; left: 424px; right: 0; bottom: 0; z-index: 1;"></div>

    {{-- Search Sidebar --}}
    <div class="search-sidebar" x-data="reportSearch()">
        <div class="sidebar-header">
            <h2 class="font-semibold text-sm">@lang('messages.search_reports')</h2>
            <button onclick="window.location.href='/{{ $locale }}'" class="text-gray-400 hover:text-gray-600">
                <span class="material-icons text-xl">keyboard_backspace</span>
            </button>
        </div>

        <div class="p-4 border-b overflow-y-auto" style="max-height: 45%;">
            {{-- Date Range --}}
            <div class="mb-3">
                <label class="block text-xs text-gray-500 mb-1">@lang('messages.date_range')</label>
                <div class="flex gap-2">
                    <input type="date" x-model="dateFrom" class="flex-1 border rounded p-2 text-sm">
                    <input type="date" x-model="dateTo" class="flex-1 border rounded p-2 text-sm">
                </div>
            </div>

            {{-- Area Search --}}
            <div class="mb-3">
                <label class="block text-xs text-gray-500 mb-1">@lang('messages.area')</label>
                <input type="text" x-model="area" class="w-full border rounded p-2 text-sm" placeholder="@lang('messages.search_placeholder')">
            </div>

            {{-- Confirmation Toggle --}}
            <div class="mb-3 flex items-center justify-between">
                <span class="text-sm">@lang('messages.confirmed_only')</span>
                <div class="toggle-switch" :class="{ 'active': confirmedOnly }" @click="confirmedOnly = !confirmedOnly"></div>
            </div>

            {{-- Category Filter --}}
            <div class="mb-3">
                <div class="flex flex-wrap gap-2">
                    <label class="chip other" :class="{ 'selected': categories.includes('other') }" @click="toggleCategory('other')">
                        <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                        @lang('messages.other_category')
                    </label>
                    <label class="chip observed" :class="{ 'selected': categories.includes('observed') }" @click="toggleCategory('observed')">
                        <span class="w-2.5 h-2.5 rounded-full bg-green-600"></span>
                        @lang('messages.observed')
                    </label>
                    <label class="chip active-chip" :class="{ 'selected': categories.includes('active') }" @click="toggleCategory('active')">
                        <span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                        @lang('messages.active')
                    </label>
                    <label class="chip critical" :class="{ 'selected': categories.includes('critical') }" @click="toggleCategory('critical')">
                        <span class="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                        @lang('messages.critical')
                    </label>
                </div>
            </div>

            {{-- Sort --}}
            <div class="mb-3 flex items-center gap-2">
                <select x-model="sortBy" class="border rounded p-2 text-sm flex-1">
                    <option value="newest">@lang('messages.newest')</option>
                    <option value="oldest">@lang('messages.oldest')</option>
                </select>
                <span class="material-icons text-gray-400">filter_list</span>
            </div>

            {{-- Search Button --}}
            <button @click="search()" class="w-full bg-[#5a3e2b] text-white rounded py-2 text-sm font-medium hover:bg-[#4a3221]">
                @lang('messages.search')
            </button>
        </div>

        {{-- Results --}}
        <div class="flex-1 overflow-y-auto">
            <div class="px-4 py-2 border-b flex items-center justify-between text-xs text-gray-500">
                <span>Showing Page <span x-text="page"></span>/<span x-text="totalPages"></span></span>
                <span><span x-text="totalResults"></span> @lang('messages.results')</span>
            </div>
            <div id="searchResults">
                <template x-for="report in results" :key="report.id">
                    <div class="report-card" @click="flyTo(report)">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-xs px-2 py-0.5 rounded text-white" :style="'background:' + getCategoryColor(report.category)" x-text="report.category.charAt(0).toUpperCase() + report.category.slice(1)"></span>
                            <span class="text-xs text-gray-500" x-text="report.date"></span>
                            <span class="text-xs" :class="report.is_confirmed ? 'text-green-600' : 'text-gray-400'" x-text="report.is_confirmed ? 'Confirmed' : 'Not Confirmed'"></span>
                        </div>
                        <div class="text-sm text-gray-700 truncate" x-text="report.address"></div>
                        <div class="text-xs text-gray-400 mt-1">Submitted: <span x-text="report.time_submitted"></span></div>
                    </div>
                </template>
                <div x-show="results.length === 0 && searched" class="p-4 text-center text-sm text-gray-500">
                    @lang('messages.no_results')
                </div>
            </div>

            {{-- Pagination --}}
            <div x-show="totalPages > 1" class="flex items-center justify-center gap-4 p-4 border-t">
                <button @click="prevPage()" :disabled="page <= 1" class="text-gray-400 hover:text-gray-600 disabled:opacity-30">
                    <span class="material-icons">chevron_left</span>
                </button>
                <button @click="nextPage()" :disabled="page >= totalPages" class="text-gray-400 hover:text-gray-600 disabled:opacity-30">
                    <span class="material-icons">chevron_right</span>
                </button>
            </div>
        </div>
    </div>

    {{-- Footer --}}
    <div class="map-footer" style="left: 424px;">
        <div class="flex items-center gap-2">
            <a href="/{{ $locale }}/info/legal">Legal</a>
            <span>-</span>
            <a href="/{{ $locale }}/info/terms">@lang('messages.terms')</a>
        </div>
        <div>
            <a href="https://leafletjs.com" target="_blank">Leaflet</a> | &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>
        </div>
    </div>

    <script>
        function reportSearch() {
            const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
            const today = new Date().toISOString().split('T')[0];

            return {
                dateFrom: yesterday,
                dateTo: today,
                area: '',
                confirmedOnly: false,
                categories: ['critical', 'active', 'observed', 'other'],
                sortBy: 'newest',
                results: [],
                page: 1,
                totalPages: 1,
                totalResults: 0,
                searched: false,

                toggleCategory(cat) {
                    const idx = this.categories.indexOf(cat);
                    if (idx > -1) this.categories.splice(idx, 1);
                    else this.categories.push(cat);
                },

                search() {
                    this.searched = true;
                    // Demo: load from yesterday's API
                    fetch('/api/reports/yesterday')
                        .then(r => r.json())
                        .then(data => {
                            if (data.features) {
                                this.results = data.features.map(f => ({
                                    ...f.properties,
                                    lat: f.geometry.coordinates[1],
                                    lng: f.geometry.coordinates[0],
                                }));
                                this.totalResults = this.results.length;
                                this.totalPages = Math.ceil(this.totalResults / 20) || 1;
                                // Update map markers
                                if (window.searchCluster) window.searchCluster.clearLayers();
                                window.searchCluster = window.loadReportsOnMap(window.searchMap, data);
                            }
                        });
                },

                flyTo(report) {
                    if (window.searchMap) window.searchMap.flyTo([report.lat, report.lng], 16);
                },

                getCategoryColor(cat) {
                    return window.categoryColors[cat] || '#1e88e5';
                },

                prevPage() { if (this.page > 1) this.page--; },
                nextPage() { if (this.page < this.totalPages) this.page++; },
            };
        }

        document.addEventListener('DOMContentLoaded', function() {
            window.searchMap = window.initMap('map');
        });
    </script>
@endsection
