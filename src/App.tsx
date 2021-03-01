import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {UseRoutes} from "./routes";
import './App.css';

import {Provider} from 'react-redux';
import store from "./store";


function App() {
    const routes = UseRoutes();
    return (
        <Provider store={store}>

            <Router>
                <div className="container">
                    {routes}
                </div>
            </Router>
        </Provider>
    );
}

export default App;
