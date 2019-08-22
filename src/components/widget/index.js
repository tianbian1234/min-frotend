import React, { Component } from 'react';
import * as R from 'ramda';
import './index.scss';

export default class Widget extends Component{
    constructor(props){
        super(props)
        this.state = {
            left1: 0,
            top1: 0,
            parentLeft: 0,
            parentTop: 0,
            active: 0
        }
    }

    handleMouseDown = (e) => {
        e.stopPropagation();
        let { left, top } = this.refs.widget.getBoundingClientRect();
        let parentLeft = this.refs.widget.parentNode.getBoundingClientRect().left;
        let parentTop = this.refs.widget.parentNode.getBoundingClientRect().top;
        let scrolLeft = e.clientX - left + parentLeft;
        let scrolTop = e.clientY - top + parentTop;

        this.setState({
            left1: scrolLeft,
            top1: scrolTop,
            parentLeft: parentLeft,
            parentTop: parentTop,
        })
        this.refs.widget.addEventListener("mousemove", this.handleMouseMove, false)
    }

    handleMouseUp = (e) => {
        this.refs.widget.removeEventListener("mousemove", this.handleMouseMove)
    }

    handleMouseMove = () => {
        let { left1, top1 } = this.state;
        let e = window.event;
        if(e.clientX - left1 >= 0 || e.clientY - top1 >= 0){
            this.refs.widget.style.left = (e.clientX - left1)+'px';
            this.refs.widget.style.top = (e.clientY - top1)+'px';
        }
    }

    handleActive = (e) => {
        this.refs.widget.style.border = "2px dashed #00ff00";
        this.setState({
            active: 1
        })
    }
    handleScaleDom = (parentLeft, parentTop, ele, type, e) => {
        let {  left, top, width, height } = ele.getBoundingClientRect();
        let leftNow, topNow, nLeft, nWidth, nHeight, nTop;
        switch(type){
            case 'TL':
                leftNow = left + width; topNow = top + height;
                nLeft = (e.clientY-parentTop) + 'px';
                nTop = (e.clientX-parentLeft) + 'px';
                nHeight = (topNow - e.clientY) + 'px'; 
                nWidth = (leftNow - e.clientX) + 'px';
                break;
            case 'T':
                topNow = top + height;
                console.log("llllllllllll", left);
                nLeft = left + 'px';
                console.log("nnnnnnnnnnnn", nLeft);
                nTop = (e.clientY-parentTop) + 'px';
                nWidth = width + 'px';
                nHeight = (topNow - e.clientY) + 'px'; 
                break;
            case 'TR':
                leftNow = left; topNow = top + height;
                nTop = (e.clientY-parentTop) + 'px';
                nLeft = (left-parentLeft) + 'px';
                nWidth = (topNow - e.clientY) + 'px';
                nHeight = (e.clientX - leftNow) + 'px';
                break;
            case 'R':
                leftNow = left; topNow = top + height;
                nLeft = (left-parentLeft) + 'px';
                nTop = top + 'px';
                nWidth = (e.clientX - leftNow) + 'px';
                nHeight = height + 'px';
                break;
            case 'BR':
                nLeft = (left-parentLeft) + 'px';
                nTop = (top-parentTop) + 'px';
                nWidth = (e.clientX - left) + 'px';
                nHeight = (e.clientY - top) + 'px';
                break;
            case 'B':
                nLeft = left + 'px';
                nTop = (top-parentTop) + 'px';
                nWidth = width + 'px';
                nHeight = (e.clientY - top) + 'px';
                break;
            case 'BL':
                leftNow = left + width;
                nLeft = (e.clientX-parentLeft) + 'px';
                nTop = (top-parentTop) + 'px';
                nWidth = (leftNow - e.clientX) + 'px';
                nHeight = (e.clientY - top) + 'px';
                break;
            case 'L':
                leftNow = left + width;
                nLeft= (e.clientX-parentLeft) + 'px';
                nTop = top + 'px';
                nWidth = (leftNow - e.clientX) + 'px';
                nHeight = height + 'px';
                break;
            default:
                break;
            
        }

        ele.style.left = nLeft;
        ele.style.top = nTop;
        ele.style.width = nWidth;
        ele.style.height = nHeight;

        return { nWidth, nHeight };

    }
    handleScale = (type, e) => {
        e.stopPropagation();
        let { parentLeft, parentTop } = this.state;

        let ControlhandleScaleDom = R.curry(this.handleScaleDom)(parentLeft, parentTop, this.refs.widget)

        console.log("222222", e);

        e.target.onmousemove = (e) => {
            let { nWidth, nHeight } = ControlhandleScaleDom(type, e)
            this.props.sendSize(nWidth, nHeight);
        }
        e.target.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }

    render(){
        let { active } = this.state;
        return(
            <div 
                className="widget-container"
                ref="widget"
                style={{position: 'absolute', cursor: 'move', background: '#cccccc',boxSizing: 'border-box', pading: 10}}
                onMouseDown={this.handleMouseDown}
                onMouseUp = {this.handleMouseUp}
                onClick = { this.handleActive }
            >
            {active === 1 && <div className="fangsuo">
                <span className="resize-handle top_left" onMouseDown={(e) => this.handleScale('TL', e)}></span>
                <span className="resize-handle top" onMouseDown={(e) => this.handleScale('T', e)}></span>
                <span className="resize-handle top_right" onMouseDown={(e) => this.handleScale('TR', e)}></span>
                <span className="resize-handle right" onMouseDown={(e) => this.handleScale('R', e)}></span>
                <span className="resize-handle bottom_right" onMouseDown={(e) => this.handleScale('BR', e)}></span>
                <span className="resize-handle bottom" onMouseDown={(e) => this.handleScale('B', e)}></span>
                <span className="resize-handle bottom_left" onMouseDown={(e) => this.handleScale('BL', e)}></span>
                <span className="resize-handle left" onMouseDown={(e) => this.handleScale('L', e)}></span>
            </div>}
                {this.props.children}
            </div>
        )
    }
} 