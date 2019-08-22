import React, { Component} from 'react';
import Ecard from '../components/eCard';
import Bar from '../components/echarts/bar';
import Line from '../components/echarts/line';
import Lines from '../components/echarts/lines';
import Map from '../components/echarts/map';
import WordCloud from '../components/wordcloud3d';
import Shuiqiu from '../components/echarts/shuiqiu';

import '../index.css';

// const EchartsDraw = () => {
//     const [count, setCount] = useState(0);
//     useEffect(() => {
//         document.title = `You clicked ${count} times`;
//     });
//     return (
//         <div>
//             <p>You clicked { count } times</p>
//             <button onClick={() => setCount(count + 1 )}>
//             Click me
//             </button>
//         </div>
//     )
// }

export default class EchartsDraw extends Component{

    componentDidMount(){
        console.log(this.props.match.params);
    }

    render(){
        return(
            <div className="echarts-container">
                <Ecard><Bar /></Ecard>
                <Ecard><Line /></Ecard>
                <Ecard><Lines /></Ecard>
                <Ecard><Map /></Ecard>
                <Ecard><Shuiqiu /></Ecard>
                {/* <WordCloud style={{width: 400, height: 400}}/> */}
            </div>
        )
    }
}