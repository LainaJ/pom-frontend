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


// import { Route, Switch } from 'react-router-dom';
ReactDOM.render(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Router>
        <App />
    </Router>
    </MuiPickersUtilsProvider>,
        document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
