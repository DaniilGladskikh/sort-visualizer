import type { SortingStep } from '../types';

export const mergeSort = (array: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const arr = [...array];

    const merge = (low: number, mid: number, high: number) => {
        const left = arr.slice(low, mid + 1);
        const right = arr.slice(mid + 1, high + 1);
        let i = 0, j = 0, k = low;

        while (i < left.length && j < right.length) {
            steps.push({ type: 'COMPARE', indices: [low + i, mid + 1 + j] });
            if (left[i] <= right[j]) {
                steps.push({ type: 'OVERWRITE', indices: [k], value: left[i] });
                arr[k] = left[i];
                i++;
            } else {
                steps.push({ type: 'OVERWRITE', indices: [k], value: right[j] });
                arr[k] = right[j];
                j++;
            }
            k++;
        }

        while (i < left.length) {
            steps.push({ type: 'OVERWRITE', indices: [k], value: left[i] });
            arr[k] = left[i];
            i++;
            k++;
        }

        while (j < right.length) {
            steps.push({ type: 'OVERWRITE', indices: [k], value: right[j] });
            arr[k] = right[j];
            j++;
            k++;
        }
    };

    const sort = (low: number, high: number) => {
        if (low < high) {
            const mid = Math.floor((low + high) / 2);
            sort(low, mid);
            sort(mid + 1, high);
            merge(low, mid, high);
        }
    };

    sort(0, arr.length - 1);
    return steps;
};

export const heapSort = (array: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const arr = [...array];
    const n = arr.length;

    const heapify = (n: number, i: number) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n) {
            steps.push({ type: 'COMPARE', indices: [left, largest] });
            if (arr[left] > arr[largest]) {
                largest = left;
            }
        }

        if (right < n) {
            steps.push({ type: 'COMPARE', indices: [right, largest] });
            if (arr[right] > arr[largest]) {
                largest = right;
            }
        }

        if (largest !== i) {
            steps.push({ type: 'SWAP', indices: [i, largest] });
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heapify(n, largest);
        }
    };

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        steps.push({ type: 'SWAP', indices: [0, i] });
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(i, 0);
    }

    return steps;
};

export const bubbleSort = (array: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            steps.push({ type: 'COMPARE', indices: [j, j + 1] });
            if (arr[j] > arr[j + 1]) {
                steps.push({ type: 'SWAP', indices: [j, j + 1] });
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return steps;
};

export const quickSort = (array: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const arr = [...array];

    const partition = (low: number, high: number): number => {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            steps.push({ type: 'COMPARE', indices: [j, high] });
            if (arr[j] < pivot) {
                i++;
                steps.push({ type: 'SWAP', indices: [i, j] });
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        steps.push({ type: 'SWAP', indices: [i + 1, high] });
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        return i + 1;
    };

    const sort = (low: number, high: number) => {
        if (low < high) {
            const pi = partition(low, high);
            sort(low, pi - 1);
            sort(pi + 1, high);
        }
    };

    sort(0, arr.length - 1);
    return steps;
};
