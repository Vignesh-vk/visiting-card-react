import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadCard from './components/UploadCard';
import CardsPage from './components/ListDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadCard />} />
        <Route path="/cards" element={<CardsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
