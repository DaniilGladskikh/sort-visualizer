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

        // Mark the merged range as sorted
        for (let idx = low; idx <= high; idx++) {
            steps.push({ type: 'SORTED', indices: [idx] });
        }
    };

    const sort = (low: number, high: number) => {
        if (low < high) {
            const mid = Math.floor((low + high) / 2);
            sort(low, mid);
            sort(mid + 1, high);
            merge(low, mid, high);
        } else if (low === high) {
            // Single element is sorted
            steps.push({ type: 'SORTED', indices: [low] });
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
        // Mark the extracted element as sorted
        steps.push({ type: 'SORTED', indices: [i] });
        heapify(i, 0);
    }
    // Mark the root as sorted
    if (n > 0) steps.push({ type: 'SORTED', indices: [0] });

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
        // Mark the last element of this pass as sorted
        steps.push({ type: 'SORTED', indices: [n - i - 1] });
    }
    // Mark the first element as sorted
    if (n > 0) steps.push({ type: 'SORTED', indices: [0] });
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
        // Mark the pivot as sorted
        steps.push({ type: 'SORTED', indices: [i + 1] });
        return i + 1;
    };

    const sort = (low: number, high: number) => {
        if (low < high) {
            const pi = partition(low, high);
            sort(low, pi - 1);
            sort(pi + 1, high);
        } else if (low === high) {
            // Single element is sorted
            steps.push({ type: 'SORTED', indices: [low] });
        }
    };

    sort(0, arr.length - 1);
    return steps;
};

export const insertionSort = (array: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const arr = [...array];
    const n = arr.length;

    // First element is already sorted
    if (n > 0) steps.push({ type: 'SORTED', indices: [0] });

    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;

        steps.push({ type: 'COMPARE', indices: [j, i] });

        while (j >= 0 && arr[j] > key) {
            steps.push({ type: 'COMPARE', indices: [j, i] }); // Visualize comparison
            steps.push({ type: 'OVERWRITE', indices: [j + 1], value: arr[j] });
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        steps.push({ type: 'OVERWRITE', indices: [j + 1], value: key });
        arr[j + 1] = key;
        // Mark the inserted element as sorted
        steps.push({ type: 'SORTED', indices: [j + 1] });
    }
    return steps;
};

export const selectionSort = (array: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            steps.push({ type: 'COMPARE', indices: [minIdx, j] });
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            steps.push({ type: 'SWAP', indices: [i, minIdx] });
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
        // Mark the selected element as sorted
        steps.push({ type: 'SORTED', indices: [i] });
    }
    // Mark the last element as sorted
    if (n > 0) steps.push({ type: 'SORTED', indices: [n - 1] });
    return steps;
};

export const shellSort = (array: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const arr = [...array];
    const n = arr.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j;
            for (j = i; j >= gap; j -= gap) {
                steps.push({ type: 'COMPARE', indices: [j - gap, i] });
                if (arr[j - gap] > temp) {
                    steps.push({ type: 'OVERWRITE', indices: [j], value: arr[j - gap] });
                    arr[j] = arr[j - gap];
                } else {
                    break;
                }
            }
            steps.push({ type: 'OVERWRITE', indices: [j], value: temp });
            arr[j] = temp;
        }
    }
    // Mark all elements as sorted after final pass
    for (let i = 0; i < n; i++) {
        steps.push({ type: 'SORTED', indices: [i] });
    }
    return steps;
};

export const cocktailShakerSort = (array: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const arr = [...array];
    let start = 0;
    let end = arr.length - 1;
    let swapped = true;

    while (swapped) {
        swapped = false;
        for (let i = start; i < end; i++) {
            steps.push({ type: 'COMPARE', indices: [i, i + 1] });
            if (arr[i] > arr[i + 1]) {
                steps.push({ type: 'SWAP', indices: [i, i + 1] });
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }

        if (!swapped) break;
        // Mark the end element as sorted
        steps.push({ type: 'SORTED', indices: [end] });

        swapped = false;
        end--;

        for (let i = end - 1; i >= start; i--) {
            steps.push({ type: 'COMPARE', indices: [i, i + 1] });
            if (arr[i] > arr[i + 1]) {
                steps.push({ type: 'SWAP', indices: [i, i + 1] });
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
        // Mark the start element as sorted
        if (swapped) steps.push({ type: 'SORTED', indices: [start] });
        start++;
    }
    // Mark remaining elements as sorted
    for (let i = start; i <= end; i++) {
        steps.push({ type: 'SORTED', indices: [i] });
    }
    return steps;
};

export const gnomeSort = (array: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const arr = [...array];
    const n = arr.length;
    let index = 0;

    while (index < n) {
        if (index === 0) {
            index++;
        }
        steps.push({ type: 'COMPARE', indices: [index, index - 1] });
        if (arr[index] >= arr[index - 1]) {
            // Mark the previous element as sorted when moving forward
            steps.push({ type: 'SORTED', indices: [index - 1] });
            index++;
        } else {
            steps.push({ type: 'SWAP', indices: [index, index - 1] });
            [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
            index--;
        }
    }
    // Mark the last element as sorted
    if (n > 0) steps.push({ type: 'SORTED', indices: [n - 1] });
    return steps;
};

export const radixSort = (array: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const arr = [...array];

    const getMax = (arr: number[]) => {
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
        }
        return max;
    };

    const countSort = (arr: number[], exp: number) => {
        const n = arr.length;
        const output = new Array(n).fill(0);
        const count = new Array(10).fill(0);

        for (let i = 0; i < n; i++) {
            steps.push({ type: 'COMPARE', indices: [i, i] });
            count[Math.floor(arr[i] / exp) % 10]++;
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (let i = n - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            const targetIndex = count[digit] - 1;
            output[targetIndex] = arr[i];
            count[digit]--;
        }

        for (let i = 0; i < n; i++) {
            steps.push({ type: 'OVERWRITE', indices: [i], value: output[i] });
            arr[i] = output[i];
        }
    };

    const max = getMax(arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countSort(arr, exp);
    }

    // Mark all elements as sorted after final pass
    for (let i = 0; i < arr.length; i++) {
        steps.push({ type: 'SORTED', indices: [i] });
    }

    return steps;
};
