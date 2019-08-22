import React, { useEffect } from 'react';
import './index.scss';

const data = [
    {key: '刘国栋', value: Math.random()*100},
    {key: '刘翔', value: Math.random()*100},
    {key: '高彦涛', value: Math.random()*100},
    {key: '郑力鹏', value: Math.random()*100},
    {key: '曾侃', value: Math.random()*100},
    {key: '海天盛筵', value: Math.random()*100},
    {key: '结婚', value: Math.random()*100},
    {key: '离婚', value: Math.random()*100},
    {key: '儿子', value: Math.random()*100},
    {key: '串串', value: Math.random()*100},
    {key: '电脑', value: Math.random()*100},
    {key: '手机', value: Math.random()*100},
    {key: '王李丹妮', value: Math.random()*100},
    {key: '三国演义', value: Math.random()*100},
    {key: '水浒传', value: Math.random()*100},
    {key: '西游记', value: Math.random()*100},
    {key: '红楼梦', value: Math.random()*100},
    {key: '唐吉坷德', value: Math.random()*100},
    {key: '汤姆', value: Math.random()*100},
    {key: '杰瑞', value: Math.random()*100},
    {key: '熊大', value: Math.random()*100},
    {key: '光头强', value: Math.random()*100},
    {key: '大白', value: Math.random()*100},
    {key: '傻白甜', value: Math.random()*100},
    {key: '高富帅', value: Math.random()*100},
]
var mcList = [];
var radius = 180;
var sa, ca, sb, cb, sc, cc, oDiv, aA = null, dtr = Math.PI/180;
var distr = true;
var active = false;
var mouseX = 0, mouseY = 0;
var size = 250, tspeed = 20;
var lasta = 1, lastb = 1;
var howElliptical = 1, d = 600;

let update = () => {
    let a,b;
    if(active){
        a = (-Math.min( Math.max( -mouseY, -size), size) / radius) * tspeed;
        b = (Math.min( Math.max( -mouseX, -size ), size ) / radius ) * tspeed;
    }else{
        a = lasta * 1
        b = lastb * 1
    }

    lasta = a;
    lastb = b;

    if(Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01){
        return;
    }

    let c = 0;
    sineCosine(a, b, c);

    for(let j=0; j<mcList.length; j++){
        let rx1=mcList[j].cx;
		let ry1=mcList[j].cy*ca+mcList[j].cz*(-sa);
		let rz1=mcList[j].cy*sa+mcList[j].cz*ca;
		
		let rx2=rx1*cb+rz1*sb;
		let ry2=ry1;
		let rz2=rx1*(-sb)+rz1*cb;
		
		let rx3=rx2*cc+ry2*(-sc);
		let ry3=rx2*sc+ry2*cc;
		let rz3=rz2;
		
		mcList[j].cx=rx3;
		mcList[j].cy=ry3;
		mcList[j].cz=rz3;
		
		let per= d / ( d+rz3 );
		
		mcList[j].x = ( howElliptical*rx3*per ) - ( howElliptical * 2 );
		mcList[j].y=ry3*per;
		mcList[j].scale=per;
        mcList[j].alpha=per;
        
        mcList[j].alpha = (mcList[j].alpha-0.6) * (10 / 6);
    }

    doPosition();
    depthSort();
}

let depthSort = () => {
    var i=0;
	var aTmp=[];
	
	for(i=0;i<aA.length;i++)
	{
		aTmp.push(aA[i]);
	}
	
	aTmp.sort(function (vItem1, vItem2)
		{
			if(vItem1.cz>vItem2.cz)
			{
				return -1;
			}
			else if(vItem1.cz<vItem2.cz)
			{
				return 1;
			}
			else
			{
				return 0;
			}
		}
	);
	
	for(i=0;i<aTmp.length;i++)
	{
		aTmp[i].style.zIndex=i;
	}
}

let doPosition = () => {
    var l=oDiv.offsetWidth/2;
	var t=oDiv.offsetHeight/2;
	for(var i=0;i<mcList.length;i++)
	{
		aA[i].style.left=mcList[i].cx+l-mcList[i].offsetWidth/2+'px';
		aA[i].style.top=mcList[i].cy+t-mcList[i].offsetHeight/2+'px';
		//aA[i].style.fontSize=Math.ceil(12*mcList[i].scale/2)+8+'px';
		aA[i].style.filter="alpha(opacity="+100*mcList[i].alpha+")";
		aA[i].style.opacity=mcList[i].alpha;
	}
}

let sineCosine = (a, b, c) => {
    sa = Math.sin(a * dtr);
    ca = Math.cos(a * dtr);
    sb = Math.sin(b * dtr);
    cb = Math.cos(b * dtr);
    sc = Math.sin(c * dtr);
    cc = Math.cos(c * dtr);
}

let positionAll = () => {
    let phi = 0;
    let theta = 0;
    let max = mcList.length;
    let i = 0;

    let aTmp = [];
    let oFragment = document.createDocumentFragment()

    for(i=0; i<aA.length; i++){
        aTmp.push(aA[i]);
    }

    aTmp.sort(
        function(){
            return Math.random()< 0.5 ? 1 : -1
        }
    )

    for(i = 0; i<aTmp.length; i++){
        oFragment.appendChild(aTmp[i]);
    }

    oDiv.appendChild(oFragment);

    for(i=1; i< max +1 ; i++){
        if(distr){
            phi = Math.acos(-1 + (2*i-1)/ max);
            theta = Math.sqrt(max*Math.PI)*phi;
        }else{
            phi = Math.random()*(Math.PI);
			theta = Math.random()*(2*Math.PI);
        }

        mcList[i-1].cx = radius * Math.cos(theta)*Math.sin(phi);
		mcList[i-1].cy = radius * Math.sin(theta)*Math.sin(phi);
		mcList[i-1].cz = radius * Math.cos(phi);
		
		aA[i-1].style.left=mcList[i-1].cx+oDiv.offsetWidth/2-mcList[i-1].offsetWidth/2+'px';
		aA[i-1].style.top=mcList[i-1].cy+oDiv.offsetHeight/2-mcList[i-1].offsetHeight/2+'px';

    }

}

const WordCloud = (props) => {

    useEffect(() => {
        let container = document.getElementsByClassName('wordcloud3')[0];
        
        // let { width, height } = container.getBoundingClientRect();

        let items = [];
        data.forEach(item => {
            items.push(`<a href="#" style=font-size:"${item.value}px">${item.key}</a>`)
        })
        // 添加元素到container
        let div = document.createElement('div');
        div.id = 'div1';
        div.style.border = 'solid 2px black';
        div.style.align = 'center';
        div.innerHTML = items.join( "" )
        container.appendChild(div);
    })

    useEffect(() => {
        let oTag = null;
        oDiv = document.getElementById('div1');
        aA = oDiv.getElementsByTagName('a');
        for(let i=0; i< aA.length; i++){
            oTag = {};
            oTag.offsetWidth = aA[i].offsetWidth;
            oTag.offsetHeight = aA[i].offsetHeight;
            mcList.push(oTag);
        }
        
        sineCosine(0, 0, 0)

        positionAll();

        oDiv.onmouseover = function() {
            console.log("33334433344", active);
            active = true;
        }
        oDiv.onmouseout = function() {
            active = false
        }

        oDiv.onmousemove = function(ev) {
            var oEvent = window.event || ev;

            mouseX = oEvent.clientX - (oDiv.offsetLeft + oDiv.offsetWidth/2);
            mouseY = oEvent.clientY - (oDiv.offsetTop + oDiv.offsetHeight/2);

            console.log("333334445566", mouseX, mouseY);

            mouseX /= 5;
            mouseY /= 5;
        };

        setInterval(update, 30);

    })

    return(
        <div style={props.style} className="wordcloud3">
            
        </div>
    )
}

export default WordCloud;