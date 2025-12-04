import React from 'react';
import { useSorting } from '../context/SortingContext';
import type { AlgorithmType } from '../types';
import AlgorithmInfo from './AlgorithmInfo';
import { Settings } from 'lucide-react';

const ControlPanel: React.FC = () => {
    const {
        algorithm,
        status,
        speed,
        setAlgorithm,
        setSpeed,
        arraySize,
        setArraySize,
    } = useSorting();

    const isRunning = status === 'RUNNING';
    const isPaused = status === 'PAUSED';

    return (
        <div className="control-panel">
            <div className="control-settings">
                <div className="settings-header">
                    <Settings size={20} className="settings-icon" />
                    <h3>Параметры</h3>
                </div>

                <div className="control-group">
                    <label>Алгоритм</label>
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
                        <option value="INSERTION">Сортировка вставками</option>
                        <option value="SELECTION">Сортировка выбором</option>
                        <option value="SHELL">Сортировка Шелла</option>
                        <option value="COCKTAIL">Шейкерная сортировка</option>
                        <option value="GNOME">Гномья сортировка</option>
                        <option value="RADIX">Поразрядная сортировка</option>
                    </select>
                </div>

                <div className="control-group">
                    <label>Размер массива</label>
                    <select
                        value={arraySize}
                        onChange={(e) => setArraySize(Number(e.target.value))}
                        disabled={isRunning || isPaused}
                        className="select"
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                    </select>
                </div>

                <div className="control-group">
                    <label>Скорость</label>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="slider"
                        title={`Задержка: ${101 - speed} мс`}
                    />
                </div>
            </div>

            <AlgorithmInfo />
        </div>
    );
};

export default ControlPanel;
