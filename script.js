document.getElementById('calculate_button').addEventListener('click', ()=> {
    try {
        const A = 0.1;
        const B = 1.0;
        const C = 2.0;
        const E = 0.05;
        const F = 0.7;
        const k = 2 * Math.PI / 0.056;

        const sigmaVvDb = parseFloat(document.getElementById('entry_vv').value);
        const sigmaVhDb = parseFloat(document.getElementById('entry_vh').value);
        const thetaDeg = parseFloat(document.getElementById('entry_theta').value);

        const sigmaVv = Math.pow(10.0, sigmaVvDb / 10);
        const sigmaVh = Math.pow(10.0, sigmaVhDb / 10);
        const theta = Math.toRadians(thetaDeg);
        // const theta =  thetaDeg*(Math.PI/180);
        const epsilon = 10.0; // Simplified for demonstration
        const s = 0.05; // Simplified for demonstration

        const modelSigmaVv = (A / Math.cos(theta)) * Math.pow((epsilon - 1) / (epsilon + 1), B) * Math.exp(-C * Math.cos(theta) * k * s);
        const modelSigmaVh = E * Math.pow(modelSigmaVv, 2 * F);

        const results = `
            sigma_vv (linear scale): ${sigmaVv}
            sigma_vh (linear scale): ${sigmaVh}
            Incidence angle (theta) in radians: ${theta}
            Wave number (k): ${k}
            Optimized dielectric constant (epsilon): ${epsilon}
            Optimized surface roughness (s): ${s}
            Modeled sigma_vv: ${modelSigmaVv}
            Modeled sigma_vh: ${modelSigmaVh}
        `;

        document.getElementById('result').innerText = results;

    } catch (e) {
        document.getElementById('result').innerText = `An error occurred: ${e.message}`;
    }
});

document.getElementById('exit_button').addEventListener('click', function() {
    window.close();
});