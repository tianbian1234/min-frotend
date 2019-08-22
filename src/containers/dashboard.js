import React, { Component } from 'react';
import WidgetView from '../components/widgetView';
import WidgetList from '../components/wList';
class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    changewidgetView = (value) => {
        
    }

    render(){
        return(
        <div className='screen' style={{width: '100%', height: '100%', display: 'flex'}}> 
            <WidgetList
                onAddWidget = {this.changewidgetView}
            />
            <WidgetView />
        </div>
        )
    }
}

export default App;