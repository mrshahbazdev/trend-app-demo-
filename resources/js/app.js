import L from 'leaflet';
import 'leaflet.markercluster';
import Alpine from 'alpinejs';

// Fix Leaflet default icon path
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

window.Alpine = Alpine;
window.L = L;

// Category colors for markers
window.categoryColors = {
    critical: '#e53935',
    active: '#fdd835',
    observed: '#43a047',
    other: '#1e88e5',
    unreviewed: '#8e24aa',
    rejected: '#757575',
};

// Create custom colored marker icon
window.createMarkerIcon = function(category) {
    const color = window.categoryColors[category] || '#1e88e5';
    const svgIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="42" viewBox="0 0 28 42">
            <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 28 14 28s14-17.5 14-28C28 6.268 21.732 0 14 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
            <circle cx="14" cy="14" r="6" fill="#fff"/>
        </svg>
    `;
    return L.divIcon({
        html: svgIcon,
        className: 'custom-marker',
        iconSize: [28, 42],
        iconAnchor: [14, 42],
        popupAnchor: [0, -42],
    });
};

// Initialize map
window.initMap = function(elementId, options = {}) {
    const defaults = {
        center: [40.7128, -74.0060],
        zoom: 12,
        zoomControl: false,
    };
    const config = { ...defaults, ...options };
    const map = L.map(elementId, config);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(map);

    // Add zoom control to top-right
    L.control.zoom({ position: 'topleft' }).addTo(map);

    return map;
};

// Load reports onto map
window.loadReportsOnMap = function(map, reports, markerClusterGroup) {
    if (!markerClusterGroup) {
        markerClusterGroup = L.markerClusterGroup({
            maxClusterRadius: 50,
            spiderfyOnMaxZoom: true,
        });
        map.addLayer(markerClusterGroup);
    }

    markerClusterGroup.clearLayers();

    if (reports && reports.features) {
        reports.features.forEach(feature => {
            const props = feature.properties;
            const coords = feature.geometry.coordinates;
            const marker = L.marker([coords[1], coords[0]], {
                icon: window.createMarkerIcon(props.category),
            });

            const popupContent = window.createPopupContent(props);
            marker.bindPopup(popupContent, { maxWidth: 360, minWidth: 280 });
            marker.reportData = props;
            markerClusterGroup.addLayer(marker);
        });
    }

    return markerClusterGroup;
};

// Create popup HTML for a report
window.createPopupContent = function(props) {
    const categoryClass = props.category || 'other';
    const categoryLabel = props.category ? props.category.charAt(0).toUpperCase() + props.category.slice(1) : 'Other';
    const confirmedIcon = props.is_confirmed
        ? '<svg class="inline w-4 h-4 text-green-600 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>'
        : '';
    const confirmedText = props.is_confirmed ? 'Confirmed' : 'Not Confirmed';

    let vehiclesHtml = '';
    if (props.vehicles && props.vehicles.length > 0) {
        vehiclesHtml = '<div class="mt-2"><strong class="text-xs text-gray-500">Vehicles:</strong>';
        props.vehicles.forEach(v => {
            vehiclesHtml += `<div class="text-sm font-mono bg-gray-100 px-2 py-1 rounded mt-1">PLATE: ${v.plate_number} ${v.state ? '(' + v.state + ')' : ''}</div>`;
        });
        vehiclesHtml += '</div>';
    }

    let activityHtml = '';
    if (props.activity_types && props.activity_types.length > 0) {
        activityHtml = '<div class="mt-2 flex flex-wrap gap-1">';
        props.activity_types.forEach(a => {
            activityHtml += `<span class="text-xs bg-gray-200 px-2 py-0.5 rounded">${a}</span>`;
        });
        activityHtml += '</div>';
    }

    let agencyHtml = '';
    if (props.agency_types && props.agency_types.length > 0) {
        agencyHtml = '<div class="mt-1 flex flex-wrap gap-1">';
        props.agency_types.forEach(a => {
            agencyHtml += `<span class="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">${a}</span>`;
        });
        agencyHtml += '</div>';
    }

    return `
        <div class="report-popup p-4">
            <div class="flex items-center gap-2 mb-2">
                <span class="category-badge ${categoryClass}">${categoryLabel}</span>
                <span class="text-sm text-gray-500">${props.date || ''}</span>
            </div>
            <div class="flex items-center text-sm mb-2">
                <span class="${props.is_confirmed ? 'text-green-600' : 'text-gray-400'}">${confirmedText}</span>
                ${confirmedIcon}
            </div>
            <div class="text-sm text-gray-600 mb-2">${props.address || 'Address unavailable'}</div>
            ${props.photo ? `<img src="${props.photo}" class="w-full h-32 object-cover rounded mb-2" alt="Report photo">` : ''}
            <p class="text-sm mb-2">${props.description || ''}</p>
            ${activityHtml}
            ${agencyHtml}
            <div class="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-500">
                <div>Officials: ${props.num_officials || '-'}</div>
                <div>Cars: ${props.num_cars || '-'}</div>
            </div>
            ${vehiclesHtml}
            <div class="mt-2 text-xs text-gray-400">
                <div>Submitted: ${props.time_submitted || ''}</div>
                <div>Occurred: ${props.time_occurred || ''}</div>
            </div>
            <div class="mt-3 flex gap-2">
                <button class="text-xs text-blue-600 hover:underline" onclick="navigator.share?.({text: '${(props.description || '').replace(/'/g, "\\'")}', url: window.location.href})">Share</button>
                <button class="text-xs text-red-600 hover:underline">Report Issue</button>
            </div>
        </div>
    `;
};

Alpine.start();
