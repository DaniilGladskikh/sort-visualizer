import React from 'react';
import { useSorting } from '../context/SortingContext';
import { Play, Pause, RotateCcw, Shuffle } from 'lucide-react';
import type { AlgorithmType } from '../types';

const ControlPanel: React.FC = () => {
    const {
        algorithm,
        status,
        speed,
        setAlgorithm,
        setSpeed,
        generateArray,
        startSorting,
        pauseSorting,
        reset,
    } = useSorting();

    const isRunning = status === 'RUNNING';
    const isPaused = status === 'PAUSED';
    const isFinished = status === 'FINISHED';

    return (
        <div className="control-panel">
            <div className="control-group">
                <button onClick={generateArray} disabled={isRunning || isPaused} className="btn btn-secondary">
                    <Shuffle size={18} /> Сгенерировать новый массив
                </button>
            </div>

            <div className="control-group">
                <label>Алгоритм:</label>
                <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
                    disabled={isRunning || isPaused}
                    className="select"
                >
                    <option value="BUBBLE">Сортировка пузырьком</option>
                    <option value="QUICK">Быстрая сортировка</option>
                    <option value="MERGE">Сортировка слиянием</option>
                    <option value="HEAP">Пирамидальная сортировка</option>
                </select>
            </div>

            <div className="control-group">
                <label>Скорость:</label>
                <input
                    type="range"
                    min="1"
                    max="100"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="slider"
                />
            </div>

            <div className="control-group actions">
                {!isRunning && !isPaused && (
                    <button onClick={startSorting} disabled={isFinished} className="btn btn-primary">
                        <Play size={18} /> Начать сортировку
                    </button>
                )}

                {(isRunning || isPaused) && (
                    <button onClick={pauseSorting} className="btn btn-warning">
                        {isPaused ? <><Play size={18} /> Продолжить</> : <><Pause size={18} /> Пауза</>}
                    </button>
                )}

                <button onClick={reset} disabled={status === 'IDLE'} className="btn btn-danger">
                    <RotateCcw size={18} /> Сброс
                </button>
            </div>
        </div>
    );
};

export default ControlPanel;
