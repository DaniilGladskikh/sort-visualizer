import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    return (
        <div className="layout">
            <header className="header">
                <div className="container">
                    <h1>Визуализатор алгоритмов сортировки</h1>
                </div>
            </header>
            <main className="main-content">
                <Outlet />
            </main>
            <footer className="footer">
                <div className="container">
                    <p>Визуализатор алгоритмов сортировки © 2025</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
