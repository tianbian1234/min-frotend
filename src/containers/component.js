import React, { Component } from 'react';
import Head from '../components_common/head';
import Banner from '../components_common/banner';
import Demo2048 from '../components_common/demo2048';
import DemoPinTu from '../components_common/demoPintu';
import D3Test from '../components_common/d3';

export default class Components extends Component{
    render(){
        return(
            <div className="components">
                {/* <Head /> */}
                {/* <Banner /> */}
                {/* <Demo2048 /> */}
                {/* <DemoPinTu /> */}
                <D3Test />
            </div>
        )
    }
}