import React, { Component } from 'react';
import {  SliderBar as SliderForGrounp, ScreenListCon } from './containers/index';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import Banner from './components/banner';
import './index.css';
class App extends Component{
  render(){
    
    return(
      <div className='screen'> 
        <DragDropContextProvider backend={HTML5Backend}>
          <SliderForGrounp />
          <ScreenListCon />
        </DragDropContextProvider>
        {/* <Banner /> */}
      </div>
    )
  }
}

export default App;