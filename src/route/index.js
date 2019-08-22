import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import App from '../App';
import Amap from '../containers/amap';
import DashBoard from '../containers/dashboard';
import EchartsDraw from '../containers/echarts';
import RxjsTest from '../containers/rxTest';
import Components from '../containers/component';

const BasicRoute = () => (
    <HashRouter>
        <Route exact path="/" component={Components}></Route>
        <Route exact path="/app" component={App}></Route>
        <Route exact path="/amap" component={Amap}></Route>
        <Route exact path="/dashboard" component={DashBoard} />
        <Route path="/echarts" component={EchartsDraw}  />
        <Route path="/rx" component={RxjsTest}  />
    </HashRouter>
)

export default BasicRoute;