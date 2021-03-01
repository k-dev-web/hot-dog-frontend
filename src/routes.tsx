import React from 'react';
import {Route, Redirect, Switch} from "react-router-dom";
import {HotDogList} from "./pages/HotDogList";


export const UseRoutes = () => {
    return (
        <Switch>
            <Route path="/*" exact>
                <HotDogList></HotDogList>
            </Route>
            <Redirect to="/"></Redirect>
        </Switch>
    )
}