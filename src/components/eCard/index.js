import React, { Component } from 'react';
import './index.scss';

export default class Ecard extends Component{
    render(){
        return(
            <div className="container-card">
                {this.props.children}
            </div>
        )
    }
}