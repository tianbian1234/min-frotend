import React, { Component } from 'react';
import Swiper from '../../../node_modules/swiper/dist/js/swiper';
import  '../../../node_modules/swiper/dist/css/swiper.css';
import { TweenMax, TimelineMax, Power4 } from 'gsap';
import './index.scss';

import img1 from '../../images/img1.jpg';
import img2 from '../../images/img2.jpg';
import img3 from '../../images/img3.jpg';
import img4 from '../../images/img4.jpg';


export default class Banner extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){

        let slides = document.getElementsByClassName('swiper-slide');
        var Img = []; var slidesLength;
       
        Array.prototype.forEach.call(slides, (element, index) => {
            Img[index] = new Image();
            Img[index].src = slides[index].getAttribute('data-poster');
            slidesLength = index
            //使用附加文本替换virtualTranslate，避免鼠标滚轮失效
            document.getElementById("txt").innerHTML = `<div class="box">${slides[index].innerHTML}</div>`
        })
  
        let tweenObj = {
            translate: 0
        };
        var canvas = document.getElementById("shows");
        var ctx = canvas.getContext("2d");

        var clientWidth, clientHeight, blockWidth, cutWidth, cutX, cutHeight, cutY;
        
        function resize(swiper) {
            
            clientWidth = document.body.clientWidth
            clientHeight = document.body.clientHeight


            console.log("111111122222", clientWidth, clientHeight)

            // 每一个显示块的宽度
            blockWidth = clientWidth / 5
    
            // 使用的图片大小 720/1280=0.5625	
            // 图片裁剪区域
            if (clientHeight / clientWidth > 0.5625) {
                cutWidth = 720 * clientWidth / clientHeight
                cutX = (1280 - cutWidth) / 2
                cutHeight = 720
                cutY = 0
            } else {
                cutHeight = 1280 * clientHeight / clientWidth
                cutY = (720 - cutHeight) / 2
                cutWidth = 1280
                cutX = 0
            }
    
            canvas.width = clientWidth;
            canvas.height = clientHeight;
    
            draw(swiper);
    
        }

        var tlanslate, percent, n2scale, n1scale, modifer;
        
        function draw(swiper, speed) {
            
            if (typeof(speed) == "undefined") {
                speed = 0.3;
            }
    
            TweenMax.killAll();

            TweenMax.to(tweenObj, speed, {tlanslate: swiper.translate, ease: Power4.easeOut, onUpdate: function() {
    
                    //如果超出显示范围添加黑色背景
                    if (swiper.progress < 0 || swiper.progress > 1) {
                        ctx.fillStyle = "#000000";
                        ctx.fillRect(0, 0, clientWidth, clientHeight);
                    }
    
                    tlanslate = tweenObj.tlanslate
    
                    for (let i = 0; i <= slidesLength; i++) {
                        
                        
                        percent = -tlanslate / clientWidth - i
                        
                        if (Math.abs(percent) <= 1 ) {
                            
                            n2scale = 2 - Math.abs(percent) * 2
                            if (n2scale > 1) {
                                n2scale = 1
                            }
                            n1scale = 1 - Math.abs(percent) * 2
                            if (n1scale < 0) {
                                n1scale = 0
                            }
        
                            //画5个块，裁剪出位移差
                            ctx.drawImage(Img[i], cutX + cutWidth * percent * 0.2 + cutWidth / 5 * Math.abs(percent) * 2, cutY, cutWidth / 5 * n1scale, cutHeight, (clientWidth * i + tlanslate) * 0.6 + blockWidth * (1 - n1scale), 0, blockWidth * n1scale, clientHeight);
                            ctx.drawImage(Img[i], cutX + cutWidth / 5 - cutWidth * percent * 0.1 + cutWidth / 5 - cutWidth / 5 * n2scale, cutY, cutWidth / 5 * n2scale, cutHeight, (clientWidth * i + tlanslate) * 0.6 + blockWidth + blockWidth - blockWidth * n2scale, 0, blockWidth * n2scale, clientHeight);
                            ctx.drawImage(Img[i], cutX + cutWidth / 5 * 2 - cutWidth * percent * 0.4, cutY, cutWidth / 5, cutHeight, (clientWidth * i + tlanslate) * 0.6 + blockWidth * 2, 0, blockWidth, clientHeight);
                            ctx.drawImage(Img[i], cutX + cutWidth / 5 * 3 - cutWidth * percent * 0.1, cutY, cutWidth / 5 * n2scale, cutHeight, (clientWidth * i + tlanslate) * 0.6 + blockWidth * 3, 0, blockWidth * n2scale, clientHeight);
                            ctx.drawImage(Img[i], cutX + cutWidth / 5 * 4 + cutWidth * percent * 0.2, cutY, cutWidth / 5 * n1scale, cutHeight, (clientWidth * i + tlanslate) * 0.6 + blockWidth * 4, 0, blockWidth * n1scale, clientHeight);
                        }
    
                        //设置文字相对位置，右边缩进0.8，左边加大1.2倍
                        modifer = 1
                        if (i > -tlanslate / clientWidth) {
                            modifer = 0.8
                        }
                        if (i < -tlanslate / clientWidth) {
                            modifer = 1.2
                        }

                        swiper.$el.find('.box').eq(i).transform('translate3d(' + (tlanslate / clientWidth + i) * clientWidth * modifer + 'px, 0, 0)');
                    }
    
                }
            })
    
        }
        // swiper启动
        var mySwiper = new Swiper('.swiper-container', {
    		watchSlidesProgress: true,
    		//	virtualTranslate:true,较好的解决方案但会导致滚轮失效
    		mousewheel: true,
    		grabCursor: true,
			autoplay: true,
			speed:700,//限制滚轴时间间隔
    		on: {
    			init: function() {
    				resize(this);
					/*预加载动画*/
					let tl = new TimelineMax();
					tl.to(".tip-bg", 0.5, {width:'100%'})
					  .set(".tiptxt",{autoAlpha:0})
					  .to(".tip-bg", 0.5, {x:'101%'}, "+=0.2")
					  .to(".preload-bg", 0.5, {x:'101%'}, "-=0.1")
					  .set("#preload", {autoAlpha:0})
    			},
    			resize: function() {
    				resize(this);
    			},
    			setTranslate: function() {
    				draw(this, 1);
    			},
    		},
        });
    }

    render(){
        return (
            <div className="banner">
               <div id="preload"><div className="preload-bg"></div><div className="tip"><div className="tip-bg"></div><span className="tiptxt">girls</span></div></div>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                    <div className="swiper-slide" data-poster={img1}>
                        <h2>TuiGirl</h2>
                    </div>
                    <div className="swiper-slide" data-poster={img2}>
                        <h2>MissLeg</h2>
                    </div>
                    <div className="swiper-slide" data-poster={img3}>
                        <h2>IMiss</h2>
                    </div>
                    <div className="swiper-slide" data-poster={img4}>
                        <h2>MFStar</h2>
                    </div>
                </div>
                    <div id="txt"></div>
                </div>
                <canvas id="shows" style={{position: 'absolute', left: 0, top: 0}}></canvas>
            </div>
        )
    }
}