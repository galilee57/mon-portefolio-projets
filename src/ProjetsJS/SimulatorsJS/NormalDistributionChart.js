import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';

const NormalDistributionChart = () => {
    const [mean1, setMean1] = useState(0);
    const [mean2, setMean2] = useState(0);
    const [sigma1, setSigma1] = useState(1);
    const [sigma2, setSigma2] = useState(1);

    const svgRef = useRef();

    const width = 800;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };

    const normale = (x, mean, sigma) => {
        return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / sigma, 2));
    };

    const generateNormaleData = (mean, sigma) => {
        const data = [];
        for (let x = -10; x <= 10; x += 0.1) {
            data.push({ x: x, y: normale(x, mean, sigma) });
        }
        return data;
    };

    const generateSumData = (data1, data2) => {
        return data1.map((d, i) => ({ x: d.x, y: d.y + data2[i].y }));
    };

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear().domain([-10, 10]).range([0, width]);
        const y = d3.scaleLinear().domain([0, 1.2]).range([height, 0]);

        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y);

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${height})`)
            .call(xAxis);

        svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis);

        const line = d3.line()
            .x(d => x(d.x))
            .y(d => y(d.y));

        const updateChart = () => {
            const normaleData1 = generateNormaleData(mean1, sigma1);
            const normaleData2 = generateNormaleData(mean2, sigma2);
            const sumData = generateSumData(normaleData1, normaleData2);

            const path1 = svg.selectAll('.line1').data([normaleData1]);
            path1.enter().append('path')
                .attr('class', 'line1')
                .merge(path1)
                .attr('d', line)
                .attr('stroke', 'red')
                .attr('stroke-width', 2)
                .attr('fill', 'orange')
                .attr('opacity', 0.4);
            path1.exit().remove();

            const path2 = svg.selectAll('.line2').data([normaleData2]);
            path2.enter().append('path')
                .attr('class', 'line2')
                .merge(path2)
                .attr('d', line)
                .attr('stroke', 'darkblue')
                .attr('stroke-width', 2)
                .attr('fill', 'blue')
                .attr('opacity', 0.4);
            path2.exit().remove();

            const path3 = svg.selectAll('.line3').data([sumData]);
            path3.enter().append('path')
                .attr('class', 'line3')
                .merge(path3)
                .attr('d', line)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
            path3.exit().remove();
        };

        updateChart();

        return () => {
            d3.select(svgRef.current).selectAll('*').remove();
        };
    }, [mean1, mean2, sigma1, sigma2]);

    return (
        <div>
            <div>
                <label>Mean 1:</label>
                <input
                    type="range"
                    min="-7"
                    max="7"
                    step="0.1"
                    value={mean1}
                    onChange={(e) => setMean1(parseFloat(e.target.value))}
                />
                <input
                    type="number"
                    value={mean1}
                    onChange={(e) => setMean1(parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label>Sigma 1:</label>
                <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={sigma1}
                    onChange={(e) => setSigma1(parseFloat(e.target.value))}
                />
                <input
                    type="number"
                    value={sigma1}
                    onChange={(e) => setSigma1(parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label>Mean 2:</label>
                <input
                    type="range"
                    min="-7"
                    max="7"
                    step="0.1"
                    value={mean2}
                    onChange={(e) => setMean2(parseFloat(e.target.value))}
                />
                <input
                    type="number"
                    value={mean2}
                    onChange={(e) => setMean2(parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label>Sigma 2:</label>
                <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={sigma2}
                    onChange={(e) => setSigma2(parseFloat(e.target.value))}
                />
                <input
                    type="number"
                    value={sigma2}
                    onChange={(e) => setSigma2(parseFloat(e.target.value))}
                />
            </div>
            <div id="chart">
                <svg ref={svgRef}></svg>
            </div>
        </div>
    );
};

export default NormalDistributionChart;
