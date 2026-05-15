<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SearchController;

// Redirect root to default locale
Route::get('/', function () {
    return redirect('/' . config('app.locale'));
});

// Locale-prefixed routes
Route::prefix('{locale}')->where(['locale' => '[a-z]{2}(?:-[A-Za-z]+)?'])->group(function () {
    Route::get('/', [PageController::class, 'home'])->name('home');
    Route::get('/search/report', [SearchController::class, 'reports'])->name('search.reports');
    Route::get('/search/vehicle', [SearchController::class, 'vehicles'])->name('search.vehicles');
    Route::get('/location/report', [ReportController::class, 'create'])->name('report.create');
    Route::get('/info/about', [PageController::class, 'about'])->name('info.about');
    Route::get('/info/legal', [PageController::class, 'legal'])->name('info.legal');
    Route::get('/info/terms', [PageController::class, 'terms'])->name('info.terms');
});

// API routes for map data
Route::prefix('api')->group(function () {
    Route::get('/reports/today', [ReportController::class, 'today'])->name('api.reports.today');
    Route::get('/reports/yesterday', [ReportController::class, 'yesterday'])->name('api.reports.yesterday');
    Route::get('/reports/{id}', [ReportController::class, 'show'])->name('api.reports.show');
    Route::get('/search/reports', [SearchController::class, 'apiReports'])->name('api.search.reports');
    Route::get('/search/vehicles', [SearchController::class, 'apiVehicles'])->name('api.search.vehicles');
    Route::get('/geocode', [SearchController::class, 'geocode'])->name('api.geocode');
});
