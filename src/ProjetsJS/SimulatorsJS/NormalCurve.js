import React, { useState, useRef, useEffect } from 'react';

const NormalCurve = () => {
    const canvasRef = useRef(null);
    const [mean, setMean] = useState(0);
    const [sigma, setSigma] = useState(1);
    const [cp, setCp] = useState(0);
    const [cpl, setCpl] = useState(0);
    const [cpu, setCpu] = useState(0);

    const LSL = -3;
    const USL = 3;

    useEffect(() => {
        drawNormalCurve(mean, sigma);
        updateIndices(mean, sigma);
    }, [mean, sigma]);

    const calculateCp = (sigma) => (USL - LSL) / (6 * sigma);
    const calculateCpu = (mean, sigma) => (USL - mean) / (3 * sigma);
    const calculateCpl = (mean, sigma) => (mean - LSL) / (3 * sigma);

    const updateIndices = (mean, sigma) => {
        setCp(calculateCp(sigma).toFixed(2));
        setCpu(calculateCpu(mean, sigma).toFixed(2));
        setCpl(calculateCpl(mean, sigma).toFixed(2));
    };

    const drawNormalCurve = (mean, sigma) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the axes
        ctx.beginPath();
        ctx.moveTo(50, 350);
        ctx.lineTo(750, 350);
        ctx.moveTo(400, 50);
        ctx.lineTo(400, 350);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw the y-axis scale
        for (let i = 0; i <= 1; i += 0.2) {
            let y = 350 - i * 300;
            ctx.moveTo(45, y);
            ctx.lineTo(55, y);
            ctx.stroke();
            ctx.fillText(i.toFixed(1), 20, y + 5);
        }
        
        // Draw the normal curve
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x++) {
            let scaledX = (x - canvas.width / 2) / 50;
            let y = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((scaledX - mean) / sigma, 2));
            let scaledY = 350 - y * 300;
            
            if (x === 0) {
                ctx.moveTo(x, scaledY);
            } else {
                ctx.lineTo(x, scaledY);
            }
        }
        
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw LSL and USL
        let LSLX = 400 + LSL * 50;
        let USLX = 400 + USL * 50;
        
        ctx.beginPath();
        ctx.moveTo(LSLX, 50);
        ctx.lineTo(LSLX, 350);
        ctx.moveTo(USLX, 50);
        ctx.lineTo(USLX, 350);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Label the LSL and USL
        ctx.fillStyle = 'red';
        ctx.font = '14px Arial';
        ctx.fillText('LSL', LSLX - 15, 40);
        ctx.fillText('USL', USLX - 15, 40);
        
        // Color the areas beyond LSL and USL
        ctx.fillStyle = 'red';
        ctx.globalAlpha = 0.5;
        
        for (let x = 0; x <= canvas.width; x++) {
            let scaledX = (x - canvas.width / 2) / 50;
            let y = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((scaledX - mean) / sigma, 2));
            let scaledY = 350 - y * 300;
            
            if (scaledX < LSL || scaledX > USL) {
                ctx.fillRect(x, scaledY, 1, 350 - scaledY);
            }
        }
        
        ctx.globalAlpha = 1.0;
    };

    return (
        <div>
            <canvas ref={canvasRef} width="800" height="400" id="normalCanvas"></canvas>
            <div>
                <label>Mean:</label>
                <input
                    type="range"
                    min="-5"
                    max="5"
                    step="0.1"
                    value={mean}
                    onChange={(e) => setMean(parseFloat(e.target.value))}
                />
                <input
                    type="number"
                    value={mean}
                    onChange={(e) => setMean(parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label>Sigma:</label>
                <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={sigma}
                    onChange={(e) => setSigma(parseFloat(e.target.value))}
                />
                <input
                    type="number"
                    value={sigma}
                    onChange={(e) => setSigma(parseFloat(e.target.value))}
                />
            </div>
            <div>
                <p>Cp: {cp}</p>
                <p>Cpl: {cpl}</p>
                <p>Cpu: {cpu}</p>
            </div>
        </div>
    );
};

export default NormalCurve;
