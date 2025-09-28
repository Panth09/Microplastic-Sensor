// script.js

// Data objects
const metricsData = {
    flowRate: 42.5,
    turbidity: 0.85,
    currentCount: 15,
    concentration: 15
};

const trendData = {
    labels: ['13:00', '13:15', '13:30', '13:45', '14:00'],
    data: [12.0, 13.5, 14.0, 15.0, 16.0]
};

const sizeData = {
    labels: ['10-50μm', '50-100μm', '100-200μm', '>200μm'],
    data: [40, 30, 20, 10]
};

const polymerData = {
    labels: ['PE', 'PS', 'Other'],
    data: [15, 15, 70]
};

const sensorPulseData = {
    labels: [0, 20, 40, 60, 80, 100],
    data: [0.0, 0.6, 0.8, 0.7, 0.9, 0.5]
};

// Chart initialization
function initCharts() {
    // Flow Rate Mini Graph
    new Chart(document.getElementById('flow-graph'), {
        type: 'line',
        data: {
            labels: trendData.labels.slice(-5),
            datasets: [{
                data: [40, 41.2, 42.0, 42.3, metricsData.flowRate],
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39, 174, 96, 0.2)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } }
        }
    });

    // Concentration Trend
    new Chart(document.getElementById('concentration-trend'), {
        type: 'line',
        data: {
            labels: trendData.labels,
            datasets: [{
                label: 'Microplastic Concentration (P/L)',
                data: trendData.data,
                borderColor: '#ff5733',
                backgroundColor: 'rgba(255, 87, 51, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: { title: { display: true, text: 'Concentration Trend' } },
            scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Concentration (P/L)' }, min: 12, max: 16 },
                x: { title: { display: true, text: 'Time' } }
            }
        }
    });

    // Size Distribution
    new Chart(document.getElementById('size-distribution'), {
        type: 'bar',
        data: {
            labels: sizeData.labels,
            datasets: [{
                label: 'Particle Count',
                data: sizeData.data,
                backgroundColor: '#3498db',
                borderColor: '#2980b9',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: { title: { display: true, text: 'Size Distribution' } },
            scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Particle Count' }, max: 50 },
                x: { title: { display: true, text: 'Size Range (μm)' } }
            }
        }
    });

    // Polymer Type Breakdown
    new Chart(document.getElementById('polymer-breakdown'), {
        type: 'doughnut',
        data: {
            labels: polymerData.labels,
            datasets: [{
                data: polymerData.data,
                backgroundColor: ['#ff5733', '#2ecc71', '#3498db'],
                borderColor: ['#c0392b', '#27ae60', '#2980b9'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: { title: { display: true, text: 'Polymer Type Breakdown' } }
        }
    });

    // Raw Sensor Pulses
    new Chart(document.getElementById('sensor-pulses'), {
        type: 'line',
        data: {
            labels: sensorPulseData.labels,
            datasets: [{
                label: 'Signal Amplitude',
                data: sensorPulseData.data,
                borderColor: '#ff0000',
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                tension: 0,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: { title: { display: true, text: 'Raw Sensor Pulses (Diagnostic)' } },
            scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Signal Amplitude' }, max: 1 },
                x: { title: { display: true, text: 'Time (ms)' } }
            }
        }
    });
}

// Update metrics
function updateMetrics() {
    metricsData.flowRate += (Math.random() - 0.5) * 0.5;
    metricsData.currentCount = Math.floor(Math.random() * 20 + 10);
    metricsData.concentration = Math.floor(metricsData.currentCount / (metricsData.flowRate / 60 / 1000) * 1000);
    metricsData.turbidity += (Math.random() - 0.5) * 0.02;

    document.getElementById('flow-rate').textContent = `${metricsData.flowRate.toFixed(1)} mL/min`;
    document.getElementById('turbidity').textContent = `${metricsData.turbidity.toFixed(2)} NTU`;
    document.getElementById('current-count').textContent = `${metricsData.currentCount} particles`;
    document.getElementById('concentration').textContent = `${metricsData.concentration.toFixed(0)} P/L`;

    const statuses = ['🟢 Running', '🟡 Maintenance', '🔴 Fault'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    document.getElementById('system-status').textContent = randomStatus;
    document.getElementById('system-status').className = randomStatus.includes('🟢') ? 'system-running' :
                                                       randomStatus.includes('🟡') ? 'system-warning' : 'system-error';

    document.getElementById('connectivity-status').textContent = `MQTT Connected | Last Update: ${new Date().toLocaleTimeString('en-GB')}`;

    const storageUsed = 65 + (Math.random() - 0.5) * 2;
    document.getElementById('storage-progress').style.width = `${storageUsed}%`;
    document.getElementById('storage-status').textContent = `${storageUsed.toFixed(1)}% used (${(storageUsed * 0.032).toFixed(1)} GB / 32 GB)`;

    // Update trend data
    trendData.labels.shift();
    trendData.labels.push(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    trendData.data.shift();
    trendData.data.push(metricsData.concentration);

    // Re-initialize flow-graph chart
    initCharts();
}

// Export data
function exportData(type) {
    const exportData = {
        timestamp: new Date().toISOString(),
        flowRate: metricsData.flowRate,
        turbidity: metricsData.turbidity,
        currentCount: metricsData.currentCount,
        concentration: metricsData.concentration,
        trendData: trendData.data,
        sizeData: sizeData.data,
        polymerData: polymerData.data
    };

    if (type === 'csv') {
        const csv = [
            'Timestamp,Flow Rate (mL/min),Turbidity (NTU),Current Count (particles),Concentration (P/L)',
            `${exportData.timestamp},${exportData.flowRate.toFixed(1)},${exportData.turbidity.toFixed(2)},${exportData.currentCount},${exportData.concentration}`,
            `Trend Data: ${trendData.labels.join(',')}`,
            `Concentration: ${trendData.data.join(',')}`,
            `Size Data: ${sizeData.labels.join(',')}`,
            `Size Counts: ${sizeData.data.join(',')}`,
            `Polymer Data: ${polymerData.labels.join(',')}`,
            `Polymer Counts: ${polymerData.data.join(',')}`
        ].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `microplastics-data-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    } else if (type === 'excel') {
        alert('Excel export requires SheetJS library. Please include xlsx.js for full functionality.');
    }
}

// Generate PDF report
function generateReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('ANVITRA Microplastic Sensor Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);
    doc.text(`Current Concentration: ${metricsData.concentration} P/L`, 20, 40);
    doc.text(`Flow Rate: ${metricsData.flowRate.toFixed(1)} mL/min`, 20, 50);
    doc.text(`Turbidity: ${metricsData.turbidity.toFixed(2)} NTU`, 20, 60);
    doc.text(`Total Particles: ${metricsData.currentCount}`, 20, 70);
    doc.text('Size Distribution:', 20, 90);
    sizeData.labels.forEach((label, i) => {
        doc.text(`${label}: ${sizeData.data[i]} particles`, 30, 100 + i * 10);
    });
    doc.text('Polymer Distribution:', 20, 150);
    polymerData.labels.forEach((label, i) => {
        doc.text(`${label}: ${polymerData.data[i]}%`, 30, 160 + i * 10);
    });
    doc.save(`microplastics-report-${new Date().toISOString().split('T')[0]}.pdf`);
}

// Image modal functions
function showFullImage(img) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    modal.style.display = 'block';
    modalImg.src = img.src;
}

function closeModal() {
    document.getElementById('image-modal').style.display = 'none';
}

// Initialize charts and metrics
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    updateMetrics();
    setInterval(updateMetrics, 5000);
});
