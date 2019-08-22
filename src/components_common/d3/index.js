import React, { Component } from 'react';

const d3 = window.d3;

export default class D3Test extends Component{

    componentDidMount(){
        // 设置绘图所需的大小
        let width = 800, height = 800;
        // 或者图的svg对象
        let svg = d3.select('.container')
            .append('svg')
            .attr('width', width + 'px')
            .attr('height', height + 'px')
        
        // 球面墨卡托投影. 定义了默认的 projection.clipExtent: 世界被投射到一个正方形上, 裁剪到大约 ±85° 纬度.
        let projection = d3.geoMercator()
            .center([107, 31])
            .scale(400)
        
        // 创建一个新的地理路径生成器。
        let path = d3.geoPath()
            .projection(projection);
        // 添加地图的放置控件
        let mapLayer = svg.append('g')
            .attr('class', 'maplayer')
        console.log("dhdhdhhdhdhdh", d3.json('geojson/CHN.json'));
        // 通过d3.json获取响应的数据，下面就是图形绘制的代码了
        d3.json("geojson/CHN.json").then((data) => {
            console.log("eeeeeeeeee", data);
            mapLayer.selectAll("path").data(data.features)
                .enter().append("path")
                .attr("d", path)
                .attr('vector-effect', 'non-scaling-stroke')
                .style("fill", function() { return "#44aaee" })
            });
    }

    render(){
        return(
            <div className='container' style={{width: 800, height: 800, background: '#fff'}}>
                
            </div>
        )
    }
}