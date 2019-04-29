import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import LandOcean from "./components/LandOcean"


ReactDOM.render(
    <Router>
        <LandOcean />
    </Router>
    , document.getElementById('root'));