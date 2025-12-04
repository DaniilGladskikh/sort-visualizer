import React from 'react';
import { SortingProvider } from '../context/SortingContext';
import ControlPanel from '../components/ControlPanel';
import Visualizer from '../components/Visualizer';
import Stats from '../components/Stats';

const VisualizerPage: React.FC = () => {
    return (
        <SortingProvider>
            <div className="visualizer-page">
                <ControlPanel />
                <Stats />
                <Visualizer />
            </div>
        </SortingProvider>
    );
};

export default VisualizerPage;
