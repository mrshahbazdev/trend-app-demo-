@extends('layouts.app')

@section('content')
    {{-- Map Background --}}
    <div id="map" style="position: fixed; top: 50px; left: 424px; right: 0; bottom: 0; z-index: 1;"></div>

    {{-- Vehicle Search Sidebar --}}
    <div class="search-sidebar" x-data="vehicleSearch()">
        <div class="sidebar-header">
            <h2 class="font-semibold text-sm">@lang('messages.search_vehicles')</h2>
            <button onclick="window.location.href='/{{ $locale }}'" class="text-gray-400 hover:text-gray-600">
                <span class="material-icons text-xl">keyboard_backspace</span>
            </button>
        </div>

        <div class="p-4 border-b">
            {{-- Plate Number --}}
            <div class="mb-3">
                <label class="block text-xs text-gray-500 mb-1">@lang('messages.plate_number')</label>
                <input type="text" x-model="plateNumber" class="w-full border rounded p-2 text-sm" placeholder="@lang('messages.enter_plate')">
            </div>

            {{-- Date Range --}}
            <div class="mb-3">
                <label class="block text-xs text-gray-500 mb-1">@lang('messages.date_range')</label>
                <div class="flex gap-2">
                    <input type="date" x-model="dateFrom" class="flex-1 border rounded p-2 text-sm">
                    <input type="date" x-model="dateTo" class="flex-1 border rounded p-2 text-sm">
                </div>
            </div>

            {{-- Area --}}
            <div class="mb-3">
                <label class="block text-xs text-gray-500 mb-1">@lang('messages.area')</label>
                <input type="text" x-model="area" class="w-full border rounded p-2 text-sm" placeholder="@lang('messages.search_placeholder')">
            </div>

            {{-- Sort --}}
            <div class="mb-3">
                <label class="block text-xs text-gray-500 mb-1">@lang('messages.sort')</label>
                <div class="flex items-center gap-3">
                    <label class="flex items-center gap-1 text-sm cursor-pointer">
                        <input type="radio" x-model="sortBy" value="similarity" class="accent-[#5a3e2b]">
                        @lang('messages.similarity')
                    </label>
                </div>
            </div>

            {{-- Search Button --}}
            <button @click="search()" :disabled="!plateNumber.trim()" class="w-full bg-[#5a3e2b] text-white rounded py-2 text-sm font-medium hover:bg-[#4a3221] disabled:opacity-50">
                @lang('messages.search')
            </button>
        </div>

        {{-- Results --}}
        <div class="flex-1 overflow-y-auto">
            <div class="px-4 py-2 border-b flex items-center justify-between text-xs text-gray-500">
                <span>Showing Page <span x-text="page"></span>/<span x-text="totalPages"></span></span>
                <span><span x-text="totalResults"></span> @lang('messages.results')</span>
            </div>

            {{-- Filter Actions --}}
            <div x-show="results.length > 0" class="px-4 py-2 flex items-center gap-4 border-b text-xs">
                <button @click="deselectAll()" class="text-blue-600 hover:underline">@lang('messages.deselect_all')</button>
                <label class="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" x-model="selectedOnly" class="accent-[#5a3e2b]">
                    @lang('messages.selected_only')
                </label>
            </div>

            <div id="vehicleResults">
                <template x-for="vehicle in filteredResults" :key="vehicle.plate_number">
                    <div class="report-card flex items-center gap-3">
                        <div class="flex-1">
                            <div class="font-bold text-sm" x-text="vehicle.plate_number"></div>
                            <div class="text-xs text-gray-500">Numbers of Sightings: <span x-text="vehicle.sightings"></span></div>
                        </div>
                        <button class="text-gray-400 hover:text-gray-600">
                            <span class="material-icons text-lg">info</span>
                        </button>
                        <div x-show="vehicle.photo" class="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                            <img :src="vehicle.photo" class="w-full h-full object-cover" alt="">
                        </div>
                    </div>
                </template>
                <div x-show="filteredResults.length === 0 && searched" class="p-4 text-center text-sm text-gray-500">
                    @lang('messages.no_results')
                </div>
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
        function vehicleSearch() {
            return {
                plateNumber: '',
                dateFrom: '2025-01-22',
                dateTo: new Date().toISOString().split('T')[0],
                area: '',
                sortBy: 'similarity',
                results: [],
                page: 1,
                totalPages: 1,
                totalResults: 0,
                searched: false,
                selectedOnly: false,

                search() {
                    this.searched = true;
                    // Demo results
                    this.results = [
                        { plate_number: this.plateNumber.toUpperCase(), sightings: 1, photo: null, selected: true },
                        { plate_number: this.plateNumber.toUpperCase().substring(0, 3) + 'XXX', sightings: 1, photo: null, selected: true },
                    ];
                    this.totalResults = this.results.length;
                    this.totalPages = 1;
                },

                get filteredResults() {
                    if (this.selectedOnly) return this.results.filter(r => r.selected);
                    return this.results;
                },

                deselectAll() {
                    this.results.forEach(r => r.selected = false);
                }
            };
        }

        document.addEventListener('DOMContentLoaded', function() {
            window.initMap('map');
        });
    </script>
@endsection
