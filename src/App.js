
import './App.css';
import LoginPage  from './Components/LoginPage';

import DoctorsList from './Components/DoctorsList';
import Appointment from './Components/Appointment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {

  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/doctors" element={<DoctorsList />} />
        <Route path="/appointment/:doc_id" element={<Appointment />}/>
       
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
