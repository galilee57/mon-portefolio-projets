import React, { useState } from 'react';
import NormalCurve from '../ProjetsJS/SimulatorsJS/NormalCurve';
import NormalDistributionChart from '../ProjetsJS/SimulatorsJS/NormalDistributionChart';

const SimulatorsJS = () => {
    const [selectedChart, setSelectedChart] = useState('NormalCurve');

    const handleChartChange = (event) => {
        setSelectedChart(event.target.value);
    };

    return (
        <div>
            <div>
                <label>Choisissez un graphique : </label>
                <select value={selectedChart} onChange={handleChartChange}>
                    <option value="NormalCurve">Graphique NormalCurve</option>
                    <option value="NormalDistributionChart">Graphique NormalDistributionChart</option>
                </select>
            </div>

            <div>
                {selectedChart === 'NormalCurve' && <NormalCurve />}
                {selectedChart === 'NormalDistributionChart' && <NormalDistributionChart />}
            </div>
        </div>
    );
};

export default SimulatorsJS;

