import React from 'react';
import { SortingProvider } from '../context/SortingContext';
import ControlPanel from '../components/ControlPanel';
import Visualizer from '../components/Visualizer';
import Stats from '../components/Stats';
import ActionButtons from '../components/ActionButtons';

const VisualizerPage: React.FC = () => {
    return (
        <SortingProvider>
            <div className="visualizer-page">
                <ControlPanel />
                <div className="stats-actions-row">
                    <Stats />
                    <ActionButtons />
                </div>
                <Visualizer />
            </div>
        </SortingProvider>
    );
};

export default VisualizerPage;
