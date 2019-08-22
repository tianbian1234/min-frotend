import React, { useEffect, useRef } from 'react';
import echarts from 'echarts';

const Bar = (props) => {
    let drawB = useRef(null);

    useEffect(() => {
        let myChart = echarts.init(drawB.current);
        let data1 = [20, 30, 20, 30, 20, 30, 20, 30, 20, 30];
        let data2 = [9, 30, 9, 60, 70, 20, 59, 20, 49, 20];
        let data3 = [20, 30, 20, 30, 20, 30, 20, 30, 20, 30];
        let datacity = ['济南市', '青岛市', '淄博市', '枣庄', '东营', '烟台市', '潍坊市', '济宁市', '威海市', '泰安市'];
        let option = {
                color: ['#388BFF', '#05C3FA', '#F6931C', '#FFD52E'],
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
            
                    top: '8%',
                    data: ['存量', '新增', '拆除', '整改'],
                },
                grid: { //图表的位置
                    top: '20%',
                    left: '3%',
                    right: '4%',
                    bottom: '5%',
                    containLabel: true
                },
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        formatter: '{value} '
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    show: true
            
                }],
                xAxis: [{
                    type: 'category',
                    axisLabel: {
                        interval: 0,
                        show: true,
                        splitNumber: 15,
                        textStyle: {
                            fontSize: 10,
                            color: '#000'
                        },
            
                    },
                    data: datacity,
                }],
                series: [{
                        name: '存量',
                        type: 'bar',
                        stack: 'sum',
                        barWidth: '20px',
                        data: data1
            
                    },
                    {
                        name: '新增',
                        type: 'bar',
                        barWidth: '20px',
                        stack: 'sum',
                        data: data2,
            
                    },
                    {
                        name: '拆除',
                        type: 'bar',
                        color: '#F6931C',
                        stack: 'sum1',
                        barWidth: '20px',
                        data: data3
            
                    },
                    {
                        name: '整改',
                        type: 'bar',
                        color: '#FFD52E',
                        stack: 'sum1',
                        barWidth: '20px',
                        data: data3
            
                    },
                ]
            };
        myChart.setOption(option)
    })


    return (<div ref={drawB} style={{width: '100%', height: '100%'}}>

    </div>)
}

export default Bar;