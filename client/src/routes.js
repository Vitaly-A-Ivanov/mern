import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from "./pages/CreatePage"
import {DetailPage} from "./pages/DetailPage"
import {AuthPage} from "./pages/AuthPage"

// set of all links to the react pages
export const useRoutes = isAuthenticated => {
    if (isAuthenticated) { // check if user logged in
        return (
            <Switch>
                {/* link to the links page */}
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                {/* link to the create page */}
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                {/* link to the detail page with provided user id*/}
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                {/* redirect  to create page */}
                <Redirect to="/create"/>
            </Switch>
        )
    }
// if not logged in, redirect to login page
    return  (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )

}