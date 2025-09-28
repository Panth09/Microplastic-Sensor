const metricsData = {
    flowRate: 42.5,
    turbidity: 0.85,
    currentCount: 15,
    concentration: 15
};

const trendData = {
    labels: ['13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '01:23'],
    data: [8, 12, 10, 18, 15, 22, 15]
};

const sizeData = {
    labels: ['10-50μm', '50-100μm', '100-200μm', '>200μm'],
    data: [45, 30, 20, 5]
};

const polymerData = {
    labels: ['PE', 'PET', 'PP', 'PS', 'Other'],
    data: [35, 25, 20, 15, 5]
};

const sensorPulseData = {
    labels: trendData.labels,
    datasets: [
        { label: '10° Scattering', data: [0.2, 0.3, 0.25, 0.4, 0.35, 0.5, 0.3], borderColor: '#e74c3c' },
        { label: '90° Scattering', data: [0.15, 0.2, 0.18, 0.3, 0.25, 0.35, 0.22], borderColor: '#3498db' },
        { label: '150° Scattering', data: [0.1, 0.15, 0.12, 0.2, 0.18, 0.25, 0.15], borderColor: '#2ecc71' },
        { label: 'Fluorescence', data: [0.05, 0.08, 0.06, 0.12, 0.1, 0.15, 0.08], borderColor: '#f39c12' }
    ]
};

function initCharts() {
    // Flow Rate Mini Graph
    const flowCtx = document.getElementById('flow-graph').getContext('2d');
    new Chart(flowCtx, {
        type: 'line',
        data: {
            labels: trendData.labels.slice(-5),
            datasets: [{
                data: [40, 41.2, 42.0, 42.3, 42.5],
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39, 174, 96, 0.1)',
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
    const concCtx = document.getElementById('concentration-trend').getContext('2d');
    new Chart(concCtx, {
        type: 'line',
        data: {
            labels: trendData.labels,
            datasets: [{
                label: 'Concentration (P/L)',
                data: trendData.data,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: { title: { display: true, text: 'Concentration vs Time' } },
            scales: { y: { beginAtZero: true } }
        }
    });

    // Size Distribution
    const sizeCtx = document.getElementById('size-distribution').getContext('2d');
    new Chart(sizeCtx, {
        type: 'bar',
        data: {
            labels: sizeData.labels,
            datasets: [{
                label: 'Particle Count',
                data: sizeData.data,
                backgroundColor: ['#3498db', '#2ecc71', '#f39c12', '#e74c3c']
            }]
        },
        options: {
            responsive: true,
            plugins: { title: { display: true, text: 'Size Distribution' } }
        }
    });

    // Polymer Breakdown
    const polyCtx = document.getElementById('polymer-breakdown').getContext('2d');
    new Chart(polyCtx, {
        type: 'doughnut',
        data: {
            labels: polymerData.labels,
            datasets: [{
                data: polymerData.data,
                backgroundColor: ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6']
            }]
        },
        options: {
            responsive: true,
            plugins: { title: { display: true, text: 'Polymer Type Distribution' } }
        }
    });

    // Sensor Pulses
    const pulseCtx = document.getElementById('sensor-pulses').getContext('2d');
    new Chart(pulseCtx, {
        type: 'line',
        data: sensorPulseData,
        options: {
            responsive: true,
            plugins: { title: { display: true, text: 'Raw Sensor Signals' } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

function updateMetrics() {
    metricsData.flowRate += (Math.random() - 0.5) * 0.5;
    metricsData.currentCount = Math.floor(Math.random() * 20 + 10);
    metricsData.concentration = Math.floor(metricsData.currentCount / (metricsData.flowRate / 60 / 1000) * 1000);
    metricsData.turbidity += (Math.random() - 0.5) * 0.02;

    document.getElementById('flow-rate').textContent = `${metricsData.flowRate.toFixed(1)} mL/min`;
    document.getElementById('turbidity').textContent = `${metricsData.turbidity.toFixed(2)} NTU`;
    document.getElementById('current-count').textContent = `${metricsData.currentCount} particles`;
    document.getElementById('concentration').textContent = `${metricsData.concentration.toFixed(0)} P/L`;

    // Update status
    const statuses = ['🟢 Running', '🟡 Maintenance', '🔴 Fault'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    document.getElementById('system-status').textContent = randomStatus;
    document.getElementById('system-status').className = randomStatus.includes('🟢') ? 'system-running' : 
                                                       randomStatus.includes('🟡') ? 'system-warning' : 'system-error';

    // Update connectivity
    document.getElementById('connectivity-status').textContent = `MQTT Connected | Last Update: ${new Date().toLocaleTimeString('en-GB')}`;

    // Update storage
    const storageUsed = 65 + (Math.random() - 0.5) * 2;
    document.getElementById('storage-progress').style.width = `${storageUsed}%`;
    document.getElementById('storage-status').textContent = `${storageUsed.toFixed(1)}% used (${(storageUsed * 0.032).toFixed(1)} GB / 32 GB)`;
}

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
        alert('Excel export requires additional libraries (e.g., xlsx.js).');
    }
}

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

function showFullImage(img) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    modal.style.display = 'block';
    modalImg.src = img.src;
}

function closeModal() {
    document.getElementById('image-modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    updateMetrics();
    setInterval(updateMetrics, 5000);
});
