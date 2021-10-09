import React from "react";
import Users from "./components/layouts/users";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
// import User from "./components/user";

const App = () => {
    return (
        <>
            <NavBar />

            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
            </Switch>
        </>
    );
};

export default App;
