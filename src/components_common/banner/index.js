import React, { Component } from 'react';
import './index.scss';
import Image1 from './images/event_1_large.jpg';
import Image2 from './images/event_2_large.jpg';
import Image3 from './images/event_3_large.jpg';
import Image4 from './images/event_4_large.jpg';
import Image5 from './images/event_5_large.jpg';

 const Swiper = window.Swiper;

export default class Banner extends Component{
    constructor(props){
        super(props);
        this.swiper = null;
    }

    componentDidMount(){
        this.swiper = new Swiper(this.container, {
            autoplay: true,//可选选项，自动滑动
        })
    }

    render(){
        return(
            <div className="apple-retai">
                <div className="swiper-container" ref={el => this.container = el}>
                <div className="swiper-wrapper">
                    <div className="swiper-slide">Slide 1</div>
                    <div className="swiper-slide">Slide 2</div>
                    <div className="swiper-slide">Slide 3</div>
                </div>
                <div className="swiper-pagination"></div>
                
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
                
                <div className="swiper-scrollbar"></div>
                </div>
            </div>
        )
    }
} 