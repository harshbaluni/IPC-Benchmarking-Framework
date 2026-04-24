document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const ipcMechanismSelect = document.getElementById('ipcMechanism');
    const messageSizeInput = document.getElementById('messageSize');
    const iterationsInput = document.getElementById('iterations');
    const runBenchmarkButton = document.getElementById('runBenchmark');
    const latencyDisplay = document.getElementById('latency');
    const throughputDisplay = document.getElementById('throughput');
    const resultsSection = document.getElementById('results');
    const loadingSection = document.getElementById('loading');

    // Function: Simulate IPC and benchmark
    async function runIPCBenchmark(ipcMechanism, messageSize, iterations) {
        let totalTime = 0;
        loadingSection.classList.remove('hidden');
        resultsSection.classList.add('hidden');

        for (let i = 0; i < iterations; i++) {
            const startTime = performance.now();

            // Simulate IPC operation (replace with actual IPC logic)
            await simulateIPC(ipcMechanism, messageSize);

            const endTime = performance.now();
            totalTime += (endTime - startTime);
        }

        const averageLatency = totalTime / iterations;
        const totalBytes = messageSize * iterations;
        const throughput = (totalBytes / (totalTime / 1000));

        latencyDisplay.textContent = averageLatency.toFixed(2);
        throughputDisplay.textContent = throughput.toFixed(2);

        loadingSection.classList.add('hidden');
        resultsSection.classList.remove('hidden');
    }

    // Simulate IPC (replace with actual IPC logic)
    async function simulateIPC(ipcMechanism, messageSize) {
        // Simulate varying delays based on IPC type
        let delay = 0;
        if (ipcMechanism === 'pipe') {
            delay = Math.random() * 5;
        } else if (ipcMechanism === 'sharedMemory') {
            delay = Math.random() * 2;
        } else if (ipcMechanism === 'messageQueue') {
            delay = Math.random() * 3;
        }
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    // Event Listener: Run benchmark button click
    runBenchmarkButton.addEventListener('click', () => {
        const ipcMechanism = ipcMechanismSelect.value;
        const messageSize = parseInt(messageSizeInput.value);
        const iterations = parseInt(iterationsInput.value);

        if (isNaN(messageSize) || isNaN(iterations)) {
            alert('Please enter valid message size and iterations.');
            return;
        }

        runIPCBenchmark(ipcMechanism, messageSize, iterations);
    });
});