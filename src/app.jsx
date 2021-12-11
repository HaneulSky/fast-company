import React from "react";
import Users from "./components/layouts/users";
import NavBar from "./components/ui/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import EditUserForm from "./components/ui/editUserForm";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQuality";
import AuthProvider from "./hooks/useAuth";

const App = () => {
    return (
        <>
            <AuthProvider>
                <NavBar />

                <QualitiesProvider>
                    <ProfessionProvider>
                        <Switch>
                            <Route
                                path="/users/:userId?/edit"
                                component={EditUserForm}
                            />
                            <Route path="/users/:userId?" component={Users} />
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/" exact component={Main} />
                            <Redirect to="/" />
                        </Switch>
                    </ProfessionProvider>
                </QualitiesProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    );
};

export default App;
