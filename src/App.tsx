import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import CustomCursor from './components/CustomCursor';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
      <Analytics />
    </div>
  );
}

export default App;
