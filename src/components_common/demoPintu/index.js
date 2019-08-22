import React, { Component } from 'react';
import Block from './block';
import Ima1 from './1.jpg';

export default class DemoPinTu extends Component{
    constructor(props){
        super(props)
        this.ctx = null;
        this.blocks = [];
        this.avw = null;
        this.avH = null;
        this.number = 3;
        this.canvas = null;
    }
    componentDidMount(){
        this.canvas = document.createElement('canvas');

        this.canvas.width = parseInt(this.container.style.width);
        this.canvas.height = parseInt(this.container.style.height);

        this.container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        let img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0, 500, 500);
        }
        img.src = Ima1;

        this.clipImage();
    }

    clipImage = () => {
        this.avW = parseInt(this.container.style.width) / this.number;
        this.avH = parseInt(this.container.style.height) / this.number;

        for(let i = 0; i < this.number; i++){
            for (let j = 0; j < this.number; j++){
                this.blocks[i] = this.blocks[i] || [];
                let canvas = document.createElement("canvas");
                canvas.width = this.avW;
                canvas.height = this.avH;
                canvas.x = j;
                canvas.y = i;
                canvas.map = i + '_' + j;
                canvas.correctMap = i + '_' + j;
                let imageData = this.ctx.getImageData(j * this.avW, i * this.avH, this.avW, this.avH)
                canvas.getContext("2d").putImageData( imageData, 0, 0 );
                if( i === j && j=== (this.number-1) )break;
                // 把canvas放到二维数组blocks中;
                this.blocks[i][j] =  canvas;
            }
        }

        console.log("djdhdhdhdhdh", this.blocks);

        this.renderToDom();
    }
    renderToDom = () =>{
        this.container.innerHTML = "";
        this.maps = {};
        this.doms = [];
        this.instances = [];
        this.blocks.forEach((item, i) => {
            item.forEach((item1, j) => {
                let instances = this.initBlock(item1, j, i, this.avW, this.avH)
                this.instances.push(instances);
                this.maps[i + '_' +j] = true
            })
        })
    }

    initBlock = (canvas, left, top, avW, avH) =>{
        return(<Block
            canvas = {canvas}
            left = {left}
            top = {top}
            avW = {avW}
            avH = {avH}
            />)
    }

    render(){
        return(<div ref={el => this.container = el} style={{width: 500, height: 500}}></div>)
    }
} 