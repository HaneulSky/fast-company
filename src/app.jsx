import React from "react";
import Users from "./components/layouts/users";
import NavBar from "./components/ui/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import EditUserForm from "./components/ui/editUserForm";

const App = () => {
    return (
        <>
            <NavBar />

            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?/edit" component={EditUserForm} />
                <Route path="/users/:userId?" component={Users} />
                <Redirect to="/" />
            </Switch>
        </>
    );
};

export default App;
