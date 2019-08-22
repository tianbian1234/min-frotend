import React, { Component } from 'react';
import './index.scss';

export default class Demo2048 extends Component{
    constructor(props){
        super(props)
        this.data = null;
        this.ctx = null;
        this.width = null;
        this.height = null;
        this.box_width = null;
        this.margin_width = null;
        this.digital = [];
    }
    componentDidMount(){
        this.ctx = this.container.getContext('2d');

        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;

        this.box_width = this.width*0.8*0.25;
        this.margin_width = this.width*0.2*0.20;

        this.getDigital();

        this.createRandom();
        this.drawBack();
        this.drawDigital();

        window.addEventListener('keydown', (event) => {
            let e = event || window.event;
            // console.log("ffffffff", e.keyCode);
            this.judgeKeyCode(e.keyCode)
        })        

    }
    judgeKeyCode = (keyCode) => {
        if(keyCode === 37){
            for(let i = 0; i < 4; i++){
                let arr = [];
                arr[0] = this.digital[0][i];
                arr[1] = this.digital[1][i];
                arr[2] = this.digital[2][i];
                arr[3] = this.digital[3][i];
                if(!this.checkDigital(arr)){
                    arr=this.changeDigital(arr);
                }
                this.digital[0][i]=arr[0];
                this.digital[1][i]=arr[1];
                this.digital[2][i]=arr[2];
                this.digital[3][i]=arr[3];
            }

            if (false) {
                alert("GAME OVER");
            }else{
                this.ctx.clearRect(0, 0, this.width, this.height);
                this.createRandom();
                this.drawBack();
                this.drawDigital();
            }
        }else if(keyCode === 38){
            for(let i = 0; i < 4; i++){
                let arr = [];
                arr[0] = this.digital[i][0];
                arr[1] = this.digital[i][1];
                arr[2] = this.digital[i][2];
                arr[3] = this.digital[i][3];
                if(!this.checkDigital(arr)){
                    arr=this.changeDigital(arr);
                }
                this.digital[i][0]=arr[0];
                this.digital[i][1]=arr[1];
                this.digital[i][2]=arr[2];
                this.digital[i][3]=arr[3];
            }

            if (false) {
                alert("GAME OVER");
            }else{
                this.ctx.clearRect(0, 0, this.width, this.height);
                this.createRandom();
                this.drawBack();
                this.drawDigital();
            }
        }else if(keyCode === 39){
            for(let i = 0; i < 4; i++){
                let arr = [];
                arr[0] = this.digital[3][i];
                arr[1] = this.digital[2][i];
                arr[2] = this.digital[1][i];
                arr[3] = this.digital[0][i];
                if(!this.checkDigital(arr)){
                    arr=this.changeDigital(arr);
                }
                this.digital[3][i]=arr[0];
                this.digital[2][i]=arr[1];
                this.digital[1][i]=arr[2];
                this.digital[0][i]=arr[3];
            }

            if (false) {
                alert("GAME OVER");
            }else{
                this.ctx.clearRect(0, 0, this.width, this.height);
                this.createRandom();
                this.drawBack();
                this.drawDigital();
            }
        }else if(keyCode === 40){
            for(let i = 0; i < 4; i++){
                let arr = [];
                arr[0] = this.digital[i][3];
                arr[1] = this.digital[i][2];
                arr[2] = this.digital[i][1];
                arr[3] = this.digital[i][0];
                if(!this.checkDigital(arr)){
                    arr=this.changeDigital(arr);
                }
                this.digital[i][3]=arr[0];
                this.digital[i][2]=arr[1];
                this.digital[i][1]=arr[2];
                this.digital[i][0]=arr[3];
            }

            if (false) {
                alert("GAME OVER");
            }else{
                this.ctx.clearRect(0, 0, this.width, this.height);
                this.createRandom();
                this.drawBack();
                this.drawDigital();
            }
        }
    }  

    getDigital = () =>{
        for(let i=0; i < 4; i++){
            this.digital[i] = [];
            for (let j = 0; j < 4; j++){
                this.digital[i][j] = 0;
            }
        }
    }
    // 绘制小方块
    drawRect = (x, y, c) => {
        this.ctx.beginPath();
        this.ctx.fillStyle=c;
        this.ctx.moveTo(x,y);
        this.ctx.arcTo(x+this.box_width,y,x+this.box_width,y+1,this.margin_width*0.7);
        this.ctx.arcTo(x+this.box_width,y+this.box_width,x+this.box_width-1,y+this.box_width,this.margin_width*0.7);
        this.ctx.arcTo(x,y+this.box_width,x,y+this.box_width-1,this.margin_width*0.7);
        this.ctx.arcTo(x,y,x+1,y,this.margin_width*0.7);
        this.ctx.fill();
    }
    // 绘制背景
    drawBack = () => {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#f0d799';
        this.ctx.fillRect(0, 0, this.width, this.height);
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                let c = '';
                if(this.digital[i][j]==0){c="#D7C184 ";}
                if(this.digital[i][j]==2){c="#f5bb82 ";}
                if(this.digital[i][j]==4){c="#DBB280 ";}
                if(this.digital[i][j]==8){c="#E1C57A ";}
                if(this.digital[i][j]==16){c="#E8B173 ";}
                if(this.digital[i][j]==32){c="#F2A769 ";}
                if(this.digital[i][j]==64){c="#e08931 ";}
                if(this.digital[i][j]==128){c="#f27f0c ";}
                if(this.digital[i][j]==256){c="#f76063 ";}
                if(this.digital[i][j]==512){c="#e84648 ";}
                if(this.digital[i][j]==1024){c="#b03133 ";}
                if(this.digital[i][j]==2048){c="#fc080c ";}
                let x=this.margin_width+i*(this.box_width+this.margin_width);
                let y=this.margin_width+j*(this.box_width+this.margin_width);
                this.drawRect(x,y,c);
            }
        }
    }
    // 生成随机数
    createRandom = () => {
        let x = Math.round( Math.random() * 3 )
        let y = Math.round( Math.random() * 3 )

        if(this.digital[x][y] === 0){
            this.digital[x][y] = 2
        }else{
            this.createRandom();
        }

    }
    // 绘制数字
    drawDigital = () => {
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                if(this.digital[i][j] > 0){
                    this.ctx.beginPath();
                    this.ctx.textAlign = 'center';
                    this.ctx.textBaseline = 'middle';
                    this.ctx.fillStyle = 'red';
                    this.ctx.font = '40px Arial';
                    let x = this.margin_width + i * ( this.box_width + this.margin_width ) + this.box_width / 2;
                    let y = this.margin_width + j * ( this.box_width + this.margin_width ) + this.box_width / 2;
                    this.ctx.fillText(this.digital[i][j], x, y);
                }
            }
        }
    }
    // 判断数组是否已经按列排好
    checkDigital = (arr) => {
        var flag=false;
        if (arr[0] === 0 && arr[1] === 0 && arr[2] === 0 && arr[3] === 0||
                arr[0] > 0 && arr[1] === 0 && arr[2] === 0 && arr[3] === 0||
                arr[0] > 0 && arr[1] > 0 && arr[2] === 0 && arr[3] === 0||
                arr[0] > 0 && arr[1] > 0 && arr[2] > 0 && arr[3] === 0||
                arr[0] > 0 && arr[1] > 0 && arr[2] > 0 && arr[3] > 0) {
            flag=true;
        }
        if (arr[0] === arr[1] && arr[0] !== 0 ||
            arr[1] === arr[2] && arr[1] !== 0 ||
            arr[2] === arr[3] && arr[2] !== 0 ||
            arr[3] === arr[4] && arr[3] !== 0
        ) {
            flag=false;
        }
        return flag;
    }

    changeDigital = (arr) => {
        for ( let i = 0; i <3; i++) {
			if (arr[i]==0) {
				var temp=arr[i];
				arr[i]=arr[i+1];
				arr[i+1]=temp;
			}
			if (arr[i]==arr[i+1]&&arr[i]!=0) {
				arr[i]=arr[i]+arr[i+1];
				arr[i+1]=0;
			}		
		}
		if (this.checkDigital(arr)){
			return arr;
		}else{
			return this.changeDigital(arr);
		}
    }




    render(){
        return(
            <canvas ref={el => this.container = el} width="500" height="500"></canvas>
        )
    }
}