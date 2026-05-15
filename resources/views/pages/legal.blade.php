@extends('layouts.app')

@section('content')
    <div style="margin-top: 50px; margin-left: 44px; height: calc(100vh - 50px); overflow-y: auto;">
        <div class="max-w-3xl mx-auto px-8 py-12">
            <div class="flex items-center gap-4 mb-8">
                <a href="/{{ $locale }}" class="text-gray-400 hover:text-gray-600">
                    <span class="material-icons">arrow_back</span>
                </a>
                <a href="/{{ $locale }}" class="text-gray-400 hover:text-gray-600">
                    <span class="material-icons">map</span>
                </a>
                <h1 class="text-2xl font-bold">Legal</h1>
            </div>

            <div class="prose max-w-none text-gray-700">
                <h2 class="text-lg font-semibold mb-4">Disclaimer</h2>
                <p class="mb-4 leading-relaxed">
                    The information provided on this platform is submitted by community members and is not verified by
                    law enforcement or government agencies. While we strive to moderate and verify reports, we cannot
                    guarantee the accuracy of all information shared on this platform.
                </p>
                <p class="mb-4 leading-relaxed">
                    This platform is designed to be a community resource for sharing information about immigration
                    enforcement activity. The reports shared here should not be taken as legal advice or used as the
                    sole basis for any legal decisions.
                </p>
                <p class="mb-4 leading-relaxed">
                    People Over Papers and Pueblo Project Foundation are not responsible for any actions taken based
                    on information found on this platform. Users are encouraged to verify information independently
                    and consult with legal professionals when necessary.
                </p>
                <p class="mb-4 leading-relaxed">
                    By using this platform, you acknowledge that the information provided is community-sourced and
                    may not be complete or accurate. We encourage responsible use of this tool and respectful
                    interaction with all community members.
                </p>
            </div>
        </div>
    </div>
@endsection
