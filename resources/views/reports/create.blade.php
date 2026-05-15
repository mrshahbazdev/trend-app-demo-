@extends('layouts.app')

@section('content')
    {{-- Map background --}}
    <div id="map" style="position: fixed; top: 50px; left: 44px; right: 0; bottom: 0; z-index: 1;"></div>

    {{-- Location Selection Modal --}}
    <div id="locationModal" class="modal-overlay" x-data="locationPicker()">
        <div class="modal-content" style="max-width: 600px;">
            <h2 class="text-lg font-semibold mb-4">@lang('messages.select_location')</h2>

            {{-- Tab Selection --}}
            <div class="flex gap-2 mb-4">
                <button @click="mode = 'search'" :class="mode === 'search' ? 'bg-[#5a3e2b] text-white' : 'bg-gray-100'" class="flex-1 py-2 px-4 rounded text-sm font-medium transition">
                    @lang('messages.search_place')
                </button>
                <button @click="mode = 'map'; initPickerMap()" :class="mode === 'map' ? 'bg-[#5a3e2b] text-white' : 'bg-gray-100'" class="flex-1 py-2 px-4 rounded text-sm font-medium transition">
                    @lang('messages.pick_on_map')
                </button>
            </div>

            {{-- Search Mode --}}
            <div x-show="mode === 'search'" class="mb-4">
                <input type="text" x-model="searchQuery" @input.debounce.500ms="searchPlaces()"
                       class="w-full border rounded-lg p-3 text-sm" placeholder="@lang('messages.search_placeholder')">
                <div x-show="searchResults.length > 0" class="mt-2 border rounded-lg max-h-48 overflow-y-auto">
                    <template x-for="result in searchResults" :key="result.place_id">
                        <button @click="selectPlace(result)" class="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 border-b last:border-b-0" x-text="result.display_name"></button>
                    </template>
                </div>
            </div>

            {{-- Map Mode --}}
            <div x-show="mode === 'map'" class="mb-4">
                <div id="pickerMap" style="height: 300px; border-radius: 8px;"></div>
                <p class="text-xs text-gray-500 mt-2">@lang('messages.click_to_place')</p>
            </div>

            {{-- Selected Location --}}
            <div x-show="selectedAddress" class="bg-green-50 p-3 rounded-lg mb-4">
                <p class="text-sm font-medium text-green-800" x-text="selectedAddress"></p>
            </div>

            <div class="flex justify-end gap-3">
                <a href="/{{ $locale }}" class="px-4 py-2 text-sm border rounded hover:bg-gray-50">@lang('messages.cancel')</a>
                <button @click="showReportForm = true; document.getElementById('locationModal').classList.add('hidden'); document.getElementById('reportFormModal').classList.remove('hidden')"
                        :disabled="!selectedAddress" class="px-4 py-2 text-sm bg-[#5a3e2b] text-white rounded hover:bg-[#4a3221] disabled:opacity-50">
                    @lang('messages.next')
                </button>
            </div>
        </div>
    </div>

    {{-- Report Form Modal --}}
    <div id="reportFormModal" class="modal-overlay hidden" x-data="reportForm()">
        <div class="modal-content" style="max-width: 600px; max-height: 90vh;">
            <h2 class="text-lg font-semibold mb-4">@lang('messages.submit_report')</h2>

            <form @submit.prevent="submitReport()">
                {{-- Location --}}
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">@lang('messages.location')</label>
                    <div class="flex items-center gap-2">
                        <input type="text" id="locationField" class="flex-1 border rounded p-2 text-sm bg-gray-50" readonly>
                        <button type="button" onclick="document.getElementById('reportFormModal').classList.add('hidden'); document.getElementById('locationModal').classList.remove('hidden')" class="text-sm text-blue-600 hover:underline">@lang('messages.edit')</button>
                    </div>
                </div>

                {{-- Upload Picture --}}
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">@lang('messages.upload_picture')</label>
                    <div class="border-2 border-dashed rounded-lg p-6 text-center text-gray-400 hover:border-gray-400 transition cursor-pointer" onclick="document.getElementById('fileInput').click()">
                        <span class="material-icons text-3xl mb-2">cloud_upload</span>
                        <p class="text-sm">@lang('messages.drag_drop')</p>
                        <input type="file" id="fileInput" accept="image/*" class="hidden">
                    </div>
                </div>

                {{-- Description --}}
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">@lang('messages.describe_what') <span class="text-red-500">*</span></label>
                    <textarea x-model="description" class="w-full border rounded p-3 text-sm" rows="3" required></textarea>
                </div>

                {{-- Officials Count --}}
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">@lang('messages.how_many_officials') <span class="text-red-500">*</span></label>
                    <select x-model="numOfficials" class="w-full border rounded p-2 text-sm" required>
                        <option value="">--</option>
                        @for($i = 1; $i <= 10; $i++)
                            <option value="{{ $i }}">{{ $i }}</option>
                        @endfor
                        <option value="10+">10+</option>
                    </select>
                </div>

                {{-- Cars Count --}}
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">@lang('messages.how_many_cars')</label>
                    <select x-model="numCars" class="w-full border rounded p-2 text-sm">
                        <option value="unknown">@lang('messages.unknown')</option>
                        @for($i = 0; $i <= 10; $i++)
                            <option value="{{ $i }}">{{ $i }}</option>
                        @endfor
                        <option value="10+">10+</option>
                    </select>
                </div>

                {{-- Activity Types --}}
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">@lang('messages.what_did_you_see') <span class="text-red-500">*</span></label>
                    <div class="flex flex-wrap gap-2">
                        @foreach(['Talking / Questioning', 'Searching', 'Patrol', 'Detaining', 'Canvassing', 'Driving', 'Standing', 'Walking'] as $activity)
                            <label class="chip" :class="{ 'selected bg-[#5a3e2b] text-white border-transparent': activities.includes('{{ $activity }}') }"
                                   @click="toggleActivity('{{ $activity }}')">
                                {{ $activity }}
                            </label>
                        @endforeach
                    </div>
                </div>

                {{-- Agency Types --}}
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">@lang('messages.what_agencies')</label>
                    <div class="flex flex-wrap gap-2">
                        @foreach(['ICE', 'CBP', 'Police', 'Sheriff', 'I Don\'t Know'] as $agency)
                            <label class="chip" :class="{ 'selected bg-blue-600 text-white border-transparent': agencies.includes('{{ $agency }}') }"
                                   @click="toggleAgency('{{ $agency }}')">
                                {{ $agency }}
                            </label>
                        @endforeach
                    </div>
                </div>

                {{-- Clothing --}}
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">@lang('messages.what_wearing')</label>
                    <textarea x-model="clothing" class="w-full border rounded p-3 text-sm" rows="2"></textarea>
                </div>

                {{-- Source Link --}}
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">@lang('messages.source_link')</label>
                    <textarea x-model="sourceLink" class="w-full border rounded p-3 text-sm" rows="1" placeholder="https://..."></textarea>
                </div>

                {{-- Date & Time --}}
                <div class="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">@lang('messages.date')</label>
                        <input type="date" x-model="reportDate" class="w-full border rounded p-2 text-sm">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">@lang('messages.time')</label>
                        <input type="time" x-model="reportTime" class="w-full border rounded p-2 text-sm">
                    </div>
                </div>

                {{-- Actions --}}
                <div class="flex justify-end gap-3">
                    <a href="/{{ $locale }}" class="px-4 py-2 text-sm border rounded hover:bg-gray-50">@lang('messages.cancel')</a>
                    <button type="submit" :disabled="!isValid()" class="px-4 py-2 text-sm bg-[#5a3e2b] text-white rounded hover:bg-[#4a3221] disabled:opacity-50">
                        @lang('messages.submit')
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        function locationPicker() {
            return {
                mode: 'search',
                searchQuery: '',
                searchResults: [],
                selectedAddress: '',
                selectedLat: null,
                selectedLng: null,
                pickerMap: null,
                pickerMarker: null,

                searchPlaces() {
                    if (this.searchQuery.length < 2) return;
                    fetch('/api/geocode?q=' + encodeURIComponent(this.searchQuery))
                        .then(r => r.json())
                        .then(data => { this.searchResults = data; });
                },

                selectPlace(result) {
                    this.selectedAddress = result.display_name;
                    this.selectedLat = parseFloat(result.lat);
                    this.selectedLng = parseFloat(result.lon);
                    this.searchResults = [];
                    document.getElementById('locationField').value = result.display_name;
                },

                initPickerMap() {
                    this.$nextTick(() => {
                        if (!this.pickerMap) {
                            this.pickerMap = window.initMap('pickerMap', { zoom: 10 });
                            this.pickerMap.on('click', (e) => {
                                const { lat, lng } = e.latlng;
                                if (this.pickerMarker) {
                                    this.pickerMarker.setLatLng([lat, lng]);
                                } else {
                                    this.pickerMarker = L.marker([lat, lng], {
                                        icon: window.createMarkerIcon('unreviewed'),
                                    }).addTo(this.pickerMap);
                                }
                                this.selectedLat = lat;
                                this.selectedLng = lng;
                                // Reverse geocode
                                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
                                    .then(r => r.json())
                                    .then(data => {
                                        this.selectedAddress = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                                        document.getElementById('locationField').value = this.selectedAddress;
                                    });
                            });
                        }
                    });
                }
            };
        }

        function reportForm() {
            const now = new Date();
            return {
                description: '',
                numOfficials: '',
                numCars: 'unknown',
                activities: [],
                agencies: [],
                clothing: '',
                sourceLink: '',
                reportDate: now.toISOString().split('T')[0],
                reportTime: now.toTimeString().substring(0, 5),

                toggleActivity(activity) {
                    const idx = this.activities.indexOf(activity);
                    if (idx > -1) this.activities.splice(idx, 1);
                    else this.activities.push(activity);
                },

                toggleAgency(agency) {
                    const idx = this.agencies.indexOf(agency);
                    if (idx > -1) this.agencies.splice(idx, 1);
                    else this.agencies.push(agency);
                },

                isValid() {
                    return this.description.trim() !== '' && this.numOfficials !== '' && this.activities.length > 0;
                },

                submitReport() {
                    alert('Report submitted successfully! (Demo mode)');
                    window.location.href = '/{{ $locale }}';
                }
            };
        }
    </script>
@endsection
