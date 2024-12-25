import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Используем BrowserRouter
import DashboardPage from './pages/Dashboard';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}
