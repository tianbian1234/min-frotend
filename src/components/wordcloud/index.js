import React, { Component } from 'react';
import echarts from '../../../node_modules/echarts/lib/echarts'
import '../../../node_modules/echarts-wordcloud';

export default class WordCloud extends Component{
    constructor(props){
        super(props)
        this.state = {
            canvasWH: this.props.canvasWH
        }
    }
    drawWordcloud = () => {
        let option ={
            title: {
                text: '词云',//标题
                x: 'center',
                textStyle: {
                    fontSize: 23
                }
         
            },
            backgroundColor: 'rgba(0,0,0,0)',
            tooltip: {
                show: true
            },
            series: [{
                name: '热点分析',//数据提示窗标题
                type: 'wordCloud',
                sizeRange: [6, 66],//画布范围，如果设置太大会出现少词（溢出屏幕）
                rotationRange: [-45, 90],//数据翻转范围
                //shape: 'circle',
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 6
                },
                textStyle: {
                    normal: {
                        color: function() {
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                data: [{
                    name: "数据一",
                    value: 1000
                }, {
                    name: "数据二",
                    value: 520
                },{
                    name: "数据一",
                    value: 1000
                }, {
                    name: "数据二",
                    value: 520
                },{
                    name: "数据一",
                    value: 1000
                }, {
                    name: "数据二",
                    value: 520
                },{
                    name: "数据一",
                    value: 1000
                }, {
                    name: "数据二",
                    value: 520
                }]
            }]
        };
        this.myChart.setOption(option);
    }
    componentDidMount(){
        this.myChart = echarts.init(document.getElementsByClassName('widget-box')[0])
        this.drawWordcloud()
    }

    componentWillReceiveProps(nextProps){
        if(JSON.stringify(this.props.canvasWH) !== JSON.stringify(nextProps.canvasWH)){
            this.setState({
                canvasWH: nextProps.canvasWH
            })
            this.myChart.resize();
        }
    }

    render(){
        return(
            <div className="widget-box" style={{width: '100%', height: '100%'}}>

            </div>
        )
    }
}