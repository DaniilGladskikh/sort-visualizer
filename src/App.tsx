import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import VisualizerPage from './pages/VisualizerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="visualizer" element={<VisualizerPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
