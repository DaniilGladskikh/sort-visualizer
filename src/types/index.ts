export type AlgorithmType = 'BUBBLE' | 'QUICK' | 'MERGE' | 'HEAP' | 'INSERTION' | 'SELECTION' | 'SHELL' | 'COCKTAIL' | 'GNOME' | 'RADIX';

export type SortingStatus = 'IDLE' | 'RUNNING' | 'PAUSED' | 'FINISHED';

export type StepType = 'COMPARE' | 'SWAP' | 'OVERWRITE';

export interface SortingStep {
    type: StepType;
    indices: number[]; // Indices involved in the step
    value?: number; // For overwrite steps (merge sort)
}

export interface SortingStats {
    comparisons: number;
    swaps: number;
    startTime: number | null;
    endTime: number | null;
}
