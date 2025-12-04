import React, { useEffect, useState } from 'react';
import { useSorting } from '../context/SortingContext';

const Stats: React.FC = () => {
    const { stats, status } = useSorting();
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let interval: number | null = null;

        if (status === 'RUNNING' && stats.startTime) {
            interval = setInterval(() => {
                setElapsedTime(Date.now() - stats.startTime!);
            }, 10);
        } else if (status === 'FINISHED' && stats.startTime && stats.endTime) {
            setElapsedTime(stats.endTime - stats.startTime);
        } else if (status === 'IDLE') {
            setElapsedTime(0);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [status, stats.startTime, stats.endTime]);

    const formatTime = (ms: number): string => {
        return ms.toFixed(0);
    };

    return (
        <div className="stats-container">
            <div className="stat-item">
                <span className="stat-label">Сравнения</span>
                <span className="stat-value">{stats.comparisons}</span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Перестановки</span>
                <span className="stat-value">{stats.swaps}</span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Время (мс)</span>
                <span className="stat-value">{formatTime(elapsedTime)}</span>
            </div>
        </div>
    );
};

export default Stats;
