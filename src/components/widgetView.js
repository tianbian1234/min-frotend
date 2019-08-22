import React from 'react';
import Widget from './widget';
import * as R from 'ramda';
import WordCloud from '../components/wordcloud';

const Container = children => {
    return (<div  className="container" style={{width: '100%', height: '100%', position: 'relative'}}>
        {children}
    </div>)
}

const conf = () => ({width: 300, height: 300})

class Test extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            conf: this.props.conf
        }
    }

    sendSize = (width, height) => {
        this.setState({
            conf: {
                width: width,
                height: height
            }
        })
    }

    render(){
        let { conf } = this.state
        return (
            <Widget sendSize={(width, height) => this.sendSize(width, height) } ><WordCloud canvasWH={conf} /></Widget>
        ) 
    }
}


const widget = (conf) => {
        return (<Test conf={conf} />)
}


const DashBoard = R.compose(Container, widget, conf);


export default DashBoard