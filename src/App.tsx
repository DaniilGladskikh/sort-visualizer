import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="container"><h1>Sorting Visualizer</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;
