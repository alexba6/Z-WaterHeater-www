import React, { FunctionComponent } from 'react'
import { Provider } from 'react-redux'
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

import { store } from './store'

import { TimeSlotPage } from './pages/TimeSlotPage'
import { TemperaturePage } from './pages/Temperature'
import { OutputGroupPage } from "./pages/OutputGroupPage";
import { TempSensorPage } from "./pages/TempSensor"
import { LoginPage } from './pages/Login'
import { ControlPage } from './pages/Control'
import { LogoutPage } from "./pages/Logout";
import { TempLimitSettings } from "./pages/TempLimitSettings";

export const App: FunctionComponent = () => {
    return <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Redirect to='/login'/>
                </Route>
                <Route exact path='/login' component={LoginPage}/>
                <Route exact path='/time-slot' component={TimeSlotPage}/>
                <Route exact path='/output-group' component={OutputGroupPage}/>
                <Route exact path='/temperature' component={TemperaturePage}/>
                <Route exact path='/temp-sensor' component={TempSensorPage}/>
                <Route exact path='/control' component={ControlPage}/>
                <Route exact path='/logout' component={LogoutPage}/>
                <Route exact path='/settings/temp-limit' component={TempLimitSettings}/>
            </Switch>
        </BrowserRouter>
    </Provider>
}