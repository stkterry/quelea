import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import Root from "./components/root";
import "./assets/styles/output.css";
require("./assets/libs/canvas_helpers");

const root = document.getElementById("root");
ReactDOM.render(<Root />, root);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
