const modulationSchemes = ['BPSK', 'QPSK', '16-QAM', '64-QAM'];
const channelConditions = ['AWGN', 'Rayleigh'];

// Q-function approximation for BER calculations
function qFunction(x) {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = (x < 0) ? -1 : 1;
    x = Math.abs(x) / Math.sqrt(2);
    const t = 1 / (1 + p * x);
    const erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return 0.5 * (1 - sign * erf);
}

function simulateMCS(modulation, channel, snrRange) {
    return snrRange.map(snrDb => {
        const snr = Math.pow(10, snrDb / 10); // Convert dB to linear scale
        let ber;

        if (channel === 'AWGN') {
            switch (modulation) {
                case 'BPSK':
                    ber = qFunction(Math.sqrt(2 * snr));
                    break;
                case 'QPSK':
                    ber = 2 * qFunction(Math.sqrt(snr));
                    break;
                case '16-QAM':
                    ber = (3 / 4) * qFunction(Math.sqrt(0.2 * snr));
                    break;
                case '64-QAM':
                    ber = (7 / 12) * qFunction(Math.sqrt(0.1 * snr));
                    break;
                default:
                    ber = 0;
            }
        } else { // Rayleigh channel
            switch (modulation) {
                case 'BPSK':
                    ber = 0.5 * (1 - Math.sqrt(snr / (snr + 1)));
                    break;
                case 'QPSK':
                    ber = 0.5 * (1 - Math.sqrt(snr / (snr + 2)));
                    break;
                case '16-QAM':
                    ber = (3 / 8) * (1 - Math.sqrt(snr / (snr + 10)));
                    break;
                case '64-QAM':
                    ber = (7 / 24) * (1 - Math.sqrt(snr / (snr + 42)));
                    break;
                default:
                    ber = 0;
            }
        }

        // Ensure BER stays within realistic bounds
        return {
            snr: snrDb,
            ber: Math.max(Math.min(ber, 1), 1e-6)
        };
    });
}

function drawChart(data) {
    const canvas = document.getElementById('chart');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear previous chart
    ctx.clearRect(0, 0, width, height);

    // Set up margins and chart area
    const margin = { top: 50, right: 50, bottom: 50, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Set canvas background color to black
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    // Draw axes (white color)
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, height - margin.bottom);
    ctx.lineTo(width - margin.right, height - margin.bottom);
    ctx.stroke();

    // Draw grid (light gray lines)
    ctx.strokeStyle = '#555555';
    ctx.lineWidth = 0.5;

    // Vertical grid (SNR)
    for (let i = 0; i <= 20; i += 5) {
        const x = margin.left + (chartWidth * i / 20);
        ctx.beginPath();
        ctx.moveTo(x, margin.top);
        ctx.lineTo(x, height - margin.bottom);
        ctx.stroke();

        // SNR labels (light gray)
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(i.toString(), x, height - margin.bottom + 20);
    }

    // Horizontal grid (BER - log scale)
    const berValues = [1e-6, 1e-5, 1e-4, 1e-3, 1e-2, 1e-1, 1];
    berValues.forEach((ber, i) => {
        const y = margin.top + (chartHeight * (1 - (Math.log10(ber) + 6) / 6));
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(width - margin.right, y);
        ctx.stroke();

        // BER labels (light gray)
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'right';
        ctx.fillText(`1e-${6 - i}`, margin.left - 10, y + 5);
    });

    // Plot data points (blue line)
    ctx.strokeStyle = "#3498db"; // Blue line
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((point, i) => {
        const x = margin.left + (chartWidth * i / data.length);
        const y = margin.top + (chartHeight * (1 - (Math.log10(point.ber) + 6) / 6));
        ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Add axis labels (change to "BER" and "SER")
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    // X-axis label (now 'SER' instead of 'SNR')
    ctx.fillText('Symbol Error Rate (SER)', width / 2, height - 10);
    // Y-axis label (now 'BER')
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Bit Error Rate (BER)', 0, 0);
    ctx.restore();

    // Add chosen modulation and channel information at the top of the chart
    const modulation = document.getElementById('modulation').value;
    const channel = document.getElementById('channel').value;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = '16px Arial';
    ctx.fillText(`Selected Modulation: ${modulation} | Channel: ${channel}`, width / 2, margin.top - 10);
}

function runSimulation() {
    const modulation = document.getElementById('modulation').value;
    const channel = document.getElementById('channel').value;
    const snrRange = Array.from({ length: 21 }, (_, i) => i); // SNR from 0 to 20 dB
    const data = simulateMCS(modulation, channel, snrRange);
    drawChart(data);
}

function runSimulation() {
    const modulation = document.getElementById('modulation').value;
    const channel = document.getElementById('channel').value;
    const snrRange = Array.from({ length: 21 }, (_, i) => i * 2); // SNR from 0 to 40 dB
    
    const berData = simulateMCS(modulation, channel, snrRange);
    drawChart(berData);
}
