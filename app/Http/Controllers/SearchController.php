<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function reports(string $locale)
    {
        app()->setLocale($locale);
        return view('search.reports', compact('locale'));
    }

    public function vehicles(string $locale)
    {
        app()->setLocale($locale);
        return view('search.vehicles', compact('locale'));
    }

    public function apiReports(Request $request)
    {
        // Demo search results
        return response()->json([
            'total' => 5,
            'page' => 1,
            'total_pages' => 1,
            'results' => [],
        ]);
    }

    public function apiVehicles(Request $request)
    {
        // Demo vehicle search results
        return response()->json([
            'total' => 0,
            'results' => [],
        ]);
    }

    public function geocode(Request $request)
    {
        // Proxy to Nominatim
        $query = $request->get('q', '');
        if (empty($query)) {
            return response()->json([]);
        }

        $url = 'https://nominatim.openstreetmap.org/search?' . http_build_query([
            'q' => $query,
            'format' => 'json',
            'limit' => 5,
            'addressdetails' => 1,
        ]);

        $opts = [
            'http' => [
                'header' => "User-Agent: IceOutClone/1.0\r\n",
            ],
        ];
        $context = stream_context_create($opts);
        $response = file_get_contents($url, false, $context);

        return response()->json(json_decode($response, true) ?? []);
    }
}
