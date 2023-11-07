import { CssBaseline, GlobalStyles } from '@mui/material';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { router } from './routes';
import { Provider } from 'react-redux';
import store from './hooks/store';
ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Tooltip)


function App() {
  const globalStyles = {
    a: {
      color: "unset",
      textDecoration: "none",
    }
  }
  return (
    <Provider store={store}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  );
}

export default App;
