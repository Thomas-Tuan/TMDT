import { CssBaseline, GlobalStyles } from '@mui/material';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminRoutes from './routes/AdminRoutes';
import CustomerRoutes from './routes/CustomerRoutes';
ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Tooltip)


function App() {
  const globalStyles = {
    a: {
      color: "unset",
      textDecoration: "none",
    }
  }
  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
