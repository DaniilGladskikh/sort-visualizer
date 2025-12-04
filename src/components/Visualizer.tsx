import React from 'react';
import { useSorting } from '../context/SortingContext';

const Visualizer: React.FC = () => {
    const { array, activeIndices, stepType, status } = useSorting();

    const getBarColor = (index: number) => {
        if (status === 'FINISHED') return 'var(--bar-sorted)';

        if (activeIndices.includes(index)) {
            if (stepType === 'COMPARE') return 'var(--bar-compare)';
            if (stepType === 'SWAP' || stepType === 'OVERWRITE') return 'var(--bar-swap)';
        }

        return 'var(--bar-default)';
    };

    return (
        <div className="visualizer-container">
            <div className="visualizer-bars">
                {array.map((value, idx) => (
                    <div
                        key={idx}
                        className="bar"
                        style={{
                            height: `${value}px`,
                            backgroundColor: getBarColor(idx),
                            width: `${100 / array.length}%`,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Visualizer;
