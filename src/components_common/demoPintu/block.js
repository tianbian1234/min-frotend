import React, { Component } from 'react';

export default class Block extends Component{
    constructor(props){
        super(props);
        this.canvas = this.props.canvas;
        this.left = this.props.left;
        this.top = this.props.top;
        this.avW = this.props.avW;
        this.avH = this.props.avH;
    }
    componentDidMount(){
        this.init()
    }

    init = () =>{
        
    }

    render(){
        return(<canvas ref={el => this.canvas = el} ></canvas>)
    }
}