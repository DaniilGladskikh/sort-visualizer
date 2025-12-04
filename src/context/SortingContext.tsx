import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { AlgorithmType, SortingStatus, SortingStats, SortingStep } from '../types';
import { generateRandomArray, wait } from '../utils/helpers';
import * as algorithms from '../utils/algorithms';

interface SortingContextType {
    array: number[];
    algorithm: AlgorithmType;
    status: SortingStatus;
    speed: number;
    stats: SortingStats;
    activeIndices: number[];
    stepType: SortingStep['type'] | null;
    arraySize: number;
    setAlgorithm: (algo: AlgorithmType) => void;
    setSpeed: (speed: number) => void;
    setArraySize: (size: number) => void;
    generateArray: () => void;
    startSorting: () => void;
    pauseSorting: () => void;
    reset: () => void;
}

const SortingContext = createContext<SortingContextType | undefined>(undefined);

export const useSorting = () => {
    const context = useContext(SortingContext);
    if (!context) {
        throw new Error('useSorting must be used within a SortingProvider');
    }
    return context;
};

export const SortingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [array, setArray] = useState<number[]>([]);
    const [algorithm, setAlgorithm] = useState<AlgorithmType>('BUBBLE');
    const [status, setStatus] = useState<SortingStatus>('IDLE');
    const [speed, setSpeed] = useState<number>(50);
    const [stats, setStats] = useState<SortingStats>({
        comparisons: 0,
        swaps: 0,
        startTime: null,
        endTime: null,
    });
    const [activeIndices, setActiveIndices] = useState<number[]>([]);
    const [stepType, setStepType] = useState<SortingStep['type'] | null>(null);
    const [arraySize, setArraySize] = useState<number>(50);

    const statusRef = useRef<SortingStatus>('IDLE');
    const arrayRef = useRef<number[]>([]);

    // Синхронизация рефов
    useEffect(() => {
        statusRef.current = status;
    }, [status]);

    useEffect(() => {
        arrayRef.current = array;
    }, [array]);

    const generateArray = useCallback(() => {
        if (status === 'RUNNING') return;
        const newArray = generateRandomArray(arraySize, 10, 500);
        setArray(newArray);
        setActiveIndices([]);
        setStepType(null);
        setStatus('IDLE');
        statusRef.current = 'IDLE';
        setStats({ comparisons: 0, swaps: 0, startTime: null, endTime: null });
    }, [status, arraySize]);

    useEffect(() => {
        generateArray();
    }, []);

    useEffect(() => {
        if (status === 'IDLE') {
            generateArray();
        }
    }, [arraySize]);

    const getAlgorithmFunction = (algo: AlgorithmType) => {
        switch (algo) {
            case 'BUBBLE': return algorithms.bubbleSort;
            case 'QUICK': return algorithms.quickSort;
            case 'MERGE': return algorithms.mergeSort;
            case 'HEAP': return algorithms.heapSort;
            case 'INSERTION': return algorithms.insertionSort;
            case 'SELECTION': return algorithms.selectionSort;
            case 'SHELL': return algorithms.shellSort;
            case 'COCKTAIL': return algorithms.cocktailShakerSort;
            case 'GNOME': return algorithms.gnomeSort;
            case 'RADIX': return algorithms.radixSort;
            default: return algorithms.bubbleSort;
        }
    };

    const startSorting = async () => {
        if (status === 'RUNNING') return;
        if (status === 'FINISHED') return;

        setStatus('RUNNING');
        statusRef.current = 'RUNNING';
        setStats(prev => ({ ...prev, startTime: Date.now() }));

        const sortFn = getAlgorithmFunction(algorithm);
        const steps = sortFn([...arrayRef.current]);

        let comparisons = 0;
        let swaps = 0;

        for (const step of steps) {
            if ((statusRef.current as SortingStatus) === 'IDLE') break;

            while ((statusRef.current as SortingStatus) === 'PAUSED') {
                await wait(100);
                if ((statusRef.current as SortingStatus) === 'IDLE') return;
            }

            setActiveIndices(step.indices);
            setStepType(step.type);

            await wait(100 - speed + 1);

            if (step.type === 'COMPARE') {
                comparisons++;
            } else if (step.type === 'SWAP') {
                swaps++;
                const [i, j] = step.indices;
                setArray(prev => {
                    const newArr = [...prev];
                    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
                    return newArr;
                });
            } else if (step.type === 'OVERWRITE') {
                swaps++;
                const [i] = step.indices;
                if (step.value !== undefined) {
                    const val = step.value;
                    setArray(prev => {
                        const newArr = [...prev];
                        newArr[i] = val;
                        return newArr;
                    });
                }
            }

            setStats(prev => ({ ...prev, comparisons, swaps }));
        }

        setActiveIndices([]);
        setStepType(null);

        if (statusRef.current === 'RUNNING') {
            setStatus('FINISHED');
            setStats(prev => ({ ...prev, endTime: Date.now() }));
        }
    };

    const pauseSorting = () => {
        if (status === 'RUNNING') {
            setStatus('PAUSED');
        } else if (status === 'PAUSED') {
            setStatus('RUNNING');
        }
    };

    const reset = () => {
        setStatus('IDLE');
        statusRef.current = 'IDLE';
        const newArray = generateRandomArray(arraySize, 10, 500);
        setArray(newArray);
        setActiveIndices([]);
        setStepType(null);
        setStats({ comparisons: 0, swaps: 0, startTime: null, endTime: null });
    };

    return (
        <SortingContext.Provider
            value={{
                array,
                algorithm,
                status,
                speed,
                stats,
                activeIndices,
                stepType,
                arraySize,
                setAlgorithm,
                setSpeed,
                setArraySize,
                generateArray,
                startSorting,
                pauseSorting,
                reset,
            }}
        >
            {children}
        </SortingContext.Provider>
    );
};
