import 'core-js'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'typeface-roboto';


ReactDOM.render(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Router>
        <App />
    </Router>
    </MuiPickersUtilsProvider>,
        document.getElementById('root'));


serviceWorker.unregister();
