import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <div className="hero">
                <BarChart2 size={64} className="hero-icon" />
                <h1>Sorting Visualizer</h1>
                <p>Визуализация работы алгоритмов сортировки в реальном времени.</p>
                <Link to="/visualizer" className="btn btn-primary btn-lg">
                    Начать визуализацию
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
