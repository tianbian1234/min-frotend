import React, { Component } from 'react';

export default class Head extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const getAsync = async function(){
            await new Promise((resolve) => {
                resolve('10010')
            });
        }

        getAsync().then(res => {
            console.log(res)
        })
    }

    render(){
        return(
            <div className="header-box">
                div
            </div>
        )
    }
}