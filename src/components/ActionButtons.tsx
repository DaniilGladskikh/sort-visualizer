import React from 'react';
import { useSorting } from '../context/SortingContext';
import { Play, Pause, RotateCcw, Shuffle } from 'lucide-react';

const ActionButtons: React.FC = () => {
    const {
        status,
        generateArray,
        startSorting,
        pauseSorting,
        reset,
    } = useSorting();

    const isRunning = status === 'RUNNING';
    const isPaused = status === 'PAUSED';
    const isFinished = status === 'FINISHED';
    const isIdle = status === 'IDLE';

    return (
        <div className="action-buttons">
            {!isRunning && !isPaused && (
                <button onClick={generateArray} className="btn btn-secondary">
                    <Shuffle size={18} /> Новый массив
                </button>
            )}

            {!isRunning && !isPaused && !isFinished && (
                <button onClick={startSorting} className="btn btn-primary">
                    <Play size={18} /> Начать сортировку
                </button>
            )}

            {(isRunning || isPaused) && (
                <button onClick={pauseSorting} className="btn btn-warning">
                    {isPaused ? <><Play size={18} /> Продолжить</> : <><Pause size={18} /> Пауза</>}
                </button>
            )}

            {!isIdle && (
                <button onClick={reset} className="btn btn-danger">
                    <RotateCcw size={18} /> Сброс
                </button>
            )}
        </div>
    );
};

export default ActionButtons;
