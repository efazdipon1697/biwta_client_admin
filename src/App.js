import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import AuthenticationScreen from './modules/authentication/authentication_screen';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DashboardScreen from './modules/dashboard/dashboard';

const theme = createTheme();

function App() {

  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  return (
    <ThemeProvider theme={theme} >
      <div className="App">
        <BrowserRouter>
          <Routes>
          <Route path='/' element={isLoggedIn ? <DashboardScreen /> : <AuthenticationScreen />} />
          <Route path='/dashboard' element={<DashboardScreen />} />
          <Route path='/authentication' element={<AuthenticationScreen />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
