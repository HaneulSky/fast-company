import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Users from "./components/layouts/users";
import Login from "./components/layouts/login";
import LogOut from "./components/layouts/logOut";
import Main from "./components/layouts/main";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);
    return (
        <div>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <Route path="/users/:userId?/:edit?" component={Users} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
            </AuthProvider>

            <ToastContainer />
        </div>
    );
}

export default App;
