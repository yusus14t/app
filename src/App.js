import { AllRoutes } from './routes';
import './events/index';
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./assets/css/custom.css";
import "./assets/css/mediaqueries.css"

import SnackbarProvider from 'react-simple-snackbar'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <SnackbarProvider>
          <Router>
            <AllRoutes />
          </Router>
        </SnackbarProvider>
    </div>
  );
}

export default App;
