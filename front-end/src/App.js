import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import SubmitComplaint from "./SubmitComplaint";
import MyComplaints from "./MyComplaints";
import AdminLogin from './adminlogin';
import ComplaintStatus from "./ComplaintStatus";
import AdminDashboard from "./AdminDashboard";
import AdminComplaintDetails from "./AdminComplaintDetails";
import EscalateComplaint from "./EscalateComplaint";
import ReportsExports from "./ReportsExports"; // <- import component


function App() {
  return (
    <Router>
      <Routes>
           <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />  
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit-complaint" element={<SubmitComplaint />} />
        <Route path="/my-complaints" element={<MyComplaints />} />
        <Route path="/adminlogin" element={<AdminLogin/>}/>
       
        <Route path="/complaint-status/:id" element={<ComplaintStatus />} />
       

        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/complaint/:id" element={<AdminComplaintDetails />} />  
          <Route path="/escalate/:complaintId" element={<EscalateComplaint />} />{/* Dynamic ID */}
          


<Route path="/admin/reports" element={<ReportsExports />} />

      </Routes>
    </Router>
  );
}

export default App;
