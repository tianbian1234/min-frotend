import React, { Component } from 'react';

export default class WigetList extends Component{
  
    handleMousedown = (e) => {
        let { onAddWidget } = this.props;
        if(typeof onAddWidget === 'function'){
            onAddWidget(e.target.value);
        }
    }

    render(){
        return(
            <ul style={{margin: 0, padding: 0, float: 'left', width: 100, height: '100%', overflow:'auto'}}>
                <li className="listItem" onMouseDown={this.handleMouseDown} draggable="true" style={{width: '100%', height: 100, background: '#00ff0f'}}>1</li>
            </ul>
        )
    }
}