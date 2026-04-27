document.addEventListener('DOMContentLoaded', () => {
    // Mock Data for Routes
    const routesData = [
        { id: '218', name: 'Vijayawada (PNBS) - Guntur', vehicle: 'AP 16 Z 4321', type: 'Palle Velugu', status: 'overcrowded', occupancy: '140%', issue: 'Massive influx of zero-ticket women passengers during evening peak.', recommendation: 'Deploy 2 "Mahila Special" buses immediately from Mangalagiri Depot.' },
        { id: '114', name: 'Tirupati - Tirumala', vehicle: 'AP 03 Z 1122', type: 'Sapthagiri Express', status: 'overcrowded', occupancy: '110%', issue: 'Heavy weekend pilgrim rush detected via toll-gate data.', recommendation: 'Increase frequency: dispatch 1 bus every 2 minutes.' },
        { id: '400K', name: 'Visakhapatnam - Araku Valley', vehicle: 'AP 31 Z 8899', type: 'Ultra Deluxe', status: 'empty', occupancy: '15%', issue: 'Empty return trips during mid-day.', recommendation: 'Delay departure by 45 mins to match tourist checkout times.' },
        { id: '20P', name: 'Rajahmundry - Kakinada', vehicle: 'AP 07 Z 5544', type: 'Express', status: 'normal', occupancy: '75%', issue: 'College student load balanced efficiently.', recommendation: 'Maintain current schedule. Monitor at 4:00 PM.' },
        { id: '17', name: 'Srikakulam - Palasa', vehicle: 'AP 26 Z 7766', type: 'Palle Velugu', status: 'empty', occupancy: '20%', issue: 'Low rural ridership between 1 PM and 3 PM.', recommendation: 'Cancel 1:30 PM trip to save diesel. Merge with 2:30 PM schedule.' }
    ];

    const routeList = document.getElementById('routeList');
    const routeDetails = document.getElementById('routeDetails');

    // Populate Route List
    function renderRoutes() {
        routeList.innerHTML = '';
        routesData.forEach((route, index) => {
            const item = document.createElement('div');
            item.className = 'route-item';
            if (index === 0) item.classList.add('active');
            
            let statusClass = `status-${route.status}`;
            let statusText = route.status.charAt(0).toUpperCase() + route.status.slice(1);

            item.innerHTML = `
                <div>
                    <strong>Route ${route.id}</strong>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">${route.name}</div>
                    <div style="font-size: 0.75rem; color: var(--primary-color); margin-top: 4px;"><span style="opacity: 0.8;">${route.type} | AP ID:</span> ${route.vehicle}</div>
                </div>
                <span class="route-status ${statusClass}">${statusText}</span>
            `;

            item.addEventListener('click', () => {
                document.querySelectorAll('.route-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                showRouteDetails(route);
            });

            routeList.appendChild(item);
        });

        // Show first route by default
        if (routesData.length > 0) {
            showRouteDetails(routesData[0]);
        }
    }

    // Show Route Details
    function showRouteDetails(route) {
        let actionBtnClass = route.status === 'overcrowded' ? 'primary' : 'secondary';
        let actionText = route.status === 'overcrowded' ? 'Deploy Extra Bus' : 'Adjust Schedule';
        if(route.status === 'normal') {
            actionText = 'View Logs';
            actionBtnClass = 'secondary';
        }

        routeDetails.innerHTML = `
            <div class="detail-content fade-in">
                <h3>Route ${route.id}: ${route.name}</h3>
                <p class="detail-stat" style="color: var(--text-secondary); font-size: 0.95rem; margin-top: -10px; margin-bottom: 1.5rem;">🚍 Class: <strong>${route.type}</strong> | Vehicle: <strong>${route.vehicle}</strong></p>
                <p class="detail-stat"><strong>Current Occupancy:</strong> <span style="font-size: 1.5rem; font-weight: bold; color: ${getOccupancyColor(route.status)}">${route.occupancy}</span></p>
                <p class="detail-stat"><strong>System Analysis:</strong> ${route.issue}</p>
                <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(0,0,0,0.3); border-left: 4px solid var(--primary-color); border-radius: 0 8px 8px 0;">
                    <strong>AI Recommendation:</strong><br>
                    ${route.recommendation}
                </div>
                <button class="btn ${actionBtnClass} action-btn" onclick="alert('Action simulated: Request sent to control room for vehicle ${route.vehicle}.')">${actionText}</button>
            </div>
        `;
    }

    function getOccupancyColor(status) {
        if (status === 'overcrowded') return 'var(--alert-color)';
        if (status === 'empty') return 'var(--secondary-color)';
        return 'var(--primary-color)';
    }

    renderRoutes();

    // Feedback Form Handling
    const feedbackForm = document.getElementById('feedbackForm');
    const formSuccess = document.getElementById('formSuccess');
    const feedbackCountEl = document.getElementById('feedbackCount');

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate API Call
            const btn = feedbackForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Submitting...';
            btn.disabled = true;

            setTimeout(() => {
                feedbackForm.reset();
                formSuccess.classList.remove('hidden');
                btn.innerText = originalText;
                btn.disabled = false;

                // Increment feedback count
                let currentCount = parseInt(feedbackCountEl.innerText.replace(',', ''));
                feedbackCountEl.innerText = (currentCount + 1).toLocaleString();

                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
    }
});
