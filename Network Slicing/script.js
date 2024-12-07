// Network slice parameters
const sliceParameters = {
    eMBB: { maxThroughput: 1000, maxLatency: 100, resourceAllocation: 0.5 },
    URLLC: { maxThroughput: 100, maxLatency: 1, resourceAllocation: 0.3 },
    mMTC: { maxThroughput: 10, maxLatency: 1000, resourceAllocation: 0.2 }
};

let simulationResults = {};

// Function to generate random traffic
function generateRandomTraffic(mean, standardDeviation) {
    // Generate random traffic based on Gaussian distribution
    return Math.max(0, mean + standardDeviation * (Math.random() + Math.random() + Math.random() - 1.5));
}

// Function to simulate network slicing
function performNetworkSlicingSimulation(duration) {
    const results = {
        eMBB: { throughput: [], latency: [], packetLoss: [] },
        URLLC: { throughput: [], latency: [], packetLoss: [] },
        mMTC: { throughput: [], latency: [], packetLoss: [] }
    };

    for (let time = 0; time < duration; time++) {
        for (const sliceType in sliceParameters) {
            const params = sliceParameters[sliceType];
            const trafficLoad = generateRandomTraffic(50, 20);
            const utilization = Math.min(1, (trafficLoad / 100) * params.resourceAllocation);

            results[sliceType].throughput.push(Math.min(params.maxThroughput, params.maxThroughput * utilization));
            results[sliceType].latency.push(params.maxLatency * (1 + utilization));
            results[sliceType].packetLoss.push(Math.max(0, (utilization - 1) * 100));
        }
    }

    return results;
}

// Function to run the simulation
function runSimulation() {
    const simulationDuration = parseInt(document.getElementById('simulationTime').value, 10);
    simulationResults = performNetworkSlicingSimulation(simulationDuration);
    visualizeSimulationResults();
}

// Function to visualize simulation data using Plotly
function visualizeSimulationResults() {
    const chartData = [];
    const sliceColors = { eMBB: 'cyan', URLLC: 'yellow', mMTC: 'magenta' };

    for (const sliceType in simulationResults) {
        const timeAxis = Array.from({ length: simulationResults[sliceType].throughput.length }, (_, i) => i);

        // Add throughput trace
        chartData.push({
            x: timeAxis,
            y: simulationResults[sliceType].throughput,
            type: 'scatter',
            name: `${sliceType} Throughput (Mbps)`,
            line: { color: sliceColors[sliceType] }
        });

        // Add latency trace
        chartData.push({
            x: timeAxis,
            y: simulationResults[sliceType].latency,
            type: 'scatter',
            name: `${sliceType} Latency (ms)`,
            line: { color: sliceColors[sliceType], dash: 'dash' }
        });

        // Add packet loss trace
        chartData.push({
            x: timeAxis,
            y: simulationResults[sliceType].packetLoss,
            type: 'scatter',
            name: `${sliceType} Packet Loss (%)`,
            line: { color: sliceColors[sliceType], dash: 'dot' }
        });
    }

    const layout = {
        title: 'Network Slicing Performance',
        xaxis: { title: 'Time (s)', showgrid: true, gridcolor: '#444' },
        yaxis: { title: 'Performance Metrics', showgrid: true, gridcolor: '#444' },
        paper_bgcolor: '#121212',
        plot_bgcolor: '#121212',
        font: { color: '#f0f0f0' },
        legend: { orientation: 'h', y: -0.3 },
        margin: { t: 50, l: 50, r: 50, b: 70 }
    };

    Plotly.newPlot('trafficChart', chartData, layout);
}

// Initial run to populate the chart
runSimulation();
