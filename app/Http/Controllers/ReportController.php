<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function create(string $locale)
    {
        app()->setLocale($locale);
        return view('reports.create', compact('locale'));
    }

    public function today()
    {
        // Demo data - will be replaced with real DB queries
        return response()->json($this->getDemoReports());
    }

    public function yesterday()
    {
        return response()->json($this->getDemoReports());
    }

    public function show(string $id)
    {
        $reports = collect($this->getDemoReports()['features']);
        $report = $reports->firstWhere('properties.id', (int) $id);
        return response()->json($report ?? ['error' => 'Not found'], $report ? 200 : 404);
    }

    private function getDemoReports(): array
    {
        return [
            'type' => 'FeatureCollection',
            'features' => [
                [
                    'type' => 'Feature',
                    'geometry' => ['type' => 'Point', 'coordinates' => [-74.0060, 40.7128]],
                    'properties' => [
                        'id' => 1,
                        'category' => 'critical',
                        'description' => 'Multiple agents observed conducting operations near courthouse.',
                        'address' => '26 Federal Plaza, New York, NY 10278',
                        'date' => now()->subDay()->format('n/j/y'),
                        'time_submitted' => now()->subDay()->format('g:i A'),
                        'time_occurred' => now()->subDay()->subHours(2)->format('g:i A'),
                        'is_confirmed' => true,
                        'num_officials' => 4,
                        'num_cars' => 2,
                        'activity_types' => ['Detaining', 'Questioning'],
                        'agency_types' => ['ICE'],
                        'vehicles' => [['plate_number' => 'ABC1234', 'state' => 'NY']],
                        'photo' => null,
                    ],
                ],
                [
                    'type' => 'Feature',
                    'geometry' => ['type' => 'Point', 'coordinates' => [-74.0776, 40.7282]],
                    'properties' => [
                        'id' => 2,
                        'category' => 'active',
                        'description' => 'Officers seen questioning individuals at transit hub.',
                        'address' => 'Newark Penn Station, Newark, NJ 07102',
                        'date' => now()->subDay()->format('n/j/y'),
                        'time_submitted' => now()->subDay()->format('g:i A'),
                        'time_occurred' => now()->subDay()->subHours(3)->format('g:i A'),
                        'is_confirmed' => false,
                        'num_officials' => 2,
                        'num_cars' => 1,
                        'activity_types' => ['Talking / Questioning'],
                        'agency_types' => ['I Don\'t Know'],
                        'vehicles' => [],
                        'photo' => null,
                    ],
                ],
                [
                    'type' => 'Feature',
                    'geometry' => ['type' => 'Point', 'coordinates' => [-74.0431, 40.6892]],
                    'properties' => [
                        'id' => 3,
                        'category' => 'observed',
                        'description' => 'Unmarked vehicle parked near community center for extended period.',
                        'address' => '455 Columbia St, Brooklyn, NY 11231',
                        'date' => now()->subDay()->format('n/j/y'),
                        'time_submitted' => now()->subDay()->format('g:i A'),
                        'time_occurred' => now()->subDay()->subHours(5)->format('g:i A'),
                        'is_confirmed' => false,
                        'num_officials' => 1,
                        'num_cars' => 1,
                        'activity_types' => ['Patrol'],
                        'agency_types' => ['I Don\'t Know'],
                        'vehicles' => [['plate_number' => 'LBF3565', 'state' => 'NJ']],
                        'photo' => null,
                    ],
                ],
                [
                    'type' => 'Feature',
                    'geometry' => ['type' => 'Point', 'coordinates' => [-74.1502, 40.7240]],
                    'properties' => [
                        'id' => 4,
                        'category' => 'other',
                        'description' => 'Local police conducting traffic stop, no federal agents confirmed.',
                        'address' => '900 Broad St, Newark, NJ 07102',
                        'date' => now()->subDay()->format('n/j/y'),
                        'time_submitted' => now()->subDay()->format('g:i A'),
                        'time_occurred' => now()->subDay()->subHours(1)->format('g:i A'),
                        'is_confirmed' => false,
                        'num_officials' => 3,
                        'num_cars' => 2,
                        'activity_types' => ['Searching'],
                        'agency_types' => ['Police'],
                        'vehicles' => [],
                        'photo' => null,
                    ],
                ],
                [
                    'type' => 'Feature',
                    'geometry' => ['type' => 'Point', 'coordinates' => [-73.9857, 40.7484]],
                    'properties' => [
                        'id' => 5,
                        'category' => 'critical',
                        'description' => 'Raid reported at residential building. Multiple families affected.',
                        'address' => '350 5th Ave, New York, NY 10118',
                        'date' => now()->subDay()->format('n/j/y'),
                        'time_submitted' => now()->subDay()->format('g:i A'),
                        'time_occurred' => now()->subDay()->subHours(6)->format('g:i A'),
                        'is_confirmed' => true,
                        'num_officials' => 6,
                        'num_cars' => 3,
                        'activity_types' => ['Detaining', 'Searching'],
                        'agency_types' => ['ICE', 'CBP'],
                        'vehicles' => [['plate_number' => 'XYZ9876', 'state' => 'NY'], ['plate_number' => 'DEF4567', 'state' => 'NJ']],
                        'photo' => null,
                    ],
                ],
            ],
        ];
    }
}
