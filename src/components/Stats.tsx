import React from 'react';
import { useSorting } from '../context/SortingContext';

const Stats: React.FC = () => {
    const { stats } = useSorting();

    return (
        <div className="stats-container">
            <div className="stat-item">
                <span className="stat-label">Сравнения:</span>
                <span className="stat-value">{stats.comparisons}</span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Перестановки:</span>
                <span className="stat-value">{stats.swaps}</span>
            </div>
        </div>
    );
};

export default Stats;
