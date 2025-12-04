import React from 'react';
import { useSorting } from '../context/SortingContext';
import type { AlgorithmType } from '../types';
import { Lightbulb } from 'lucide-react';

const descriptions: Record<AlgorithmType, { title: string; description: string; complexity: string }> = {
    BUBBLE: {
        title: 'Сортировка пузырьком (Bubble Sort)',
        description: 'Простой алгоритм, который многократно проходит по списку, сравнивает соседние элементы и меняет их местами, если они стоят в неправильном порядке. Проход по списку повторяется до тех пор, пока перестановки не перестанут быть нужными.',
        complexity: 'O(n²)',
    },
    QUICK: {
        title: 'Быстрая сортировка (Quick Sort)',
        description: 'Эффективный алгоритм "разделяй и властвуй". Он выбирает "опорный" элемент из массива и разделяет остальные элементы на два подмассива: те, что меньше опорного, и те, что больше. Затем подмассивы сортируются рекурсивно.',
        complexity: 'O(n log n)',
    },
    MERGE: {
        title: 'Сортировка слиянием (Merge Sort)',
        description: 'Алгоритм "разделяй и властвуй", который рекурсивно разбивает список на две половинки, сортирует каждую из них, а затем объединяет (сливает) отсортированные половинки в один общий список.',
        complexity: 'O(n log n)',
    },
    HEAP: {
        title: 'Пирамидальная сортировка (Heap Sort)',
        description: 'Алгоритм сортировки, использующий структуру данных "куча" (heap). Сначала массив преобразуется в сортирующее дерево (кучу), затем максимальный элемент извлекается из корня и помещается в конец массива. Процесс повторяется для оставшихся элементов.',
        complexity: 'O(n log n)',
    },
    INSERTION: {
        title: 'Сортировка вставками (Insertion Sort)',
        description: 'Простой алгоритм сортировки, который строит отсортированный массив (или список) по одному элементу за раз. Он намного менее эффективен на больших списках, чем более сложные алгоритмы, такие как быстрая сортировка, пирамидальная сортировка или сортировка слиянием.',
        complexity: 'O(n²)',
    },
    SELECTION: {
        title: 'Сортировка выбором (Selection Sort)',
        description: 'Алгоритм сортировки, который делит входной список на две части: подсписок элементов, уже отсортированных, который строится слева направо в начале (слева) списка, и подсписок элементов, оставшихся для сортировки, которые занимают остальную часть списка.',
        complexity: 'O(n²)',
    },
    SHELL: {
        title: 'Сортировка Шелла (Shell Sort)',
        description: 'Улучшенная версия сортировки вставками. Идея метода состоит в сравнении элементов, стоящих не только рядом, но и на определённом расстоянии друг от друга.',
        complexity: 'O(n log n) - O(n²)',
    },
    COCKTAIL: {
        title: 'Шейкерная сортировка (Cocktail Shaker Sort)',
        description: 'Разновидность пузырьковой сортировки, которая проходит по массиву то слева направо, то справа налево. Это помогает быстрее перемещать элементы в правильные позиции.',
        complexity: 'O(n²)',
    },
    GNOME: {
        title: 'Гномья сортировка (Gnome Sort)',
        description: 'Алгоритм сортировки, похожий на сортировку вставками, но перемещение элементов на свои места осуществляется серией обменов, как в пузырьковой сортировке.',
        complexity: 'O(n²)',
    },
    RADIX: {
        title: 'Поразрядная сортировка (Radix Sort)',
        description: 'Алгоритм сортировки, который не использует сравнения элементов. Он сортирует числа поразрядно, начиная с младших разрядов к старшим (или наоборот).',
        complexity: 'O(nk)',
    },
};

const AlgorithmInfo: React.FC = () => {
    const { algorithm } = useSorting();
    const info = descriptions[algorithm];

    return (
        <div className="algorithm-info">
            <div className="algorithm-header">
                <Lightbulb size={20} className="algorithm-icon" />
                <h3>{info.title}</h3>
            </div>
            <p>{info.description}</p>
            <div className="complexity">
                <span className="complexity-label">Сложность:</span>
                <span className="complexity-badge">{info.complexity}</span>
            </div>
        </div>
    );
};

export default AlgorithmInfo;
