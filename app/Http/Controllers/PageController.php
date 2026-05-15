<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    public function home(string $locale)
    {
        app()->setLocale($locale);
        return view('home', compact('locale'));
    }

    public function about(string $locale)
    {
        app()->setLocale($locale);
        return view('pages.about', compact('locale'));
    }

    public function legal(string $locale)
    {
        app()->setLocale($locale);
        return view('pages.legal', compact('locale'));
    }

    public function terms(string $locale)
    {
        app()->setLocale($locale);
        return view('pages.terms', compact('locale'));
    }
}
