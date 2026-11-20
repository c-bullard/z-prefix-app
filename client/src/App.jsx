import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login';
import Inventory from './components/Inventory.jsx';
import './App.css';

function App() {
  return (
    <div className="main">
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
        </Routes>
        <Routes>
          <Route path="/inventory" element={<Inventory />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
