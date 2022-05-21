
import React from 'react';
import { Artboard, EraserPanel, ToolSelection, ColorPanel, ZoomPanel } from 'components';
import './App.scss';
import { useRecoilValue } from 'recoil';
import { selectedTool } from 'state';


function App() {
  const tool = useRecoilValue(selectedTool)

  return (
    <div className="App">
      <div className='App__panel App__panel--left'>
        <ToolSelection />
      </div>
      <div className="App__artboard">
        <Artboard />
      </div>
      <div className='App__panel App__panel--right'>
        {tool === 'fill' && <ColorPanel label='Fill Panel' />}
        {tool === 'brush' && <ColorPanel label='Brush Panel' />}
        {tool === 'eraser' && <EraserPanel />}
        {tool === 'zoom' && <ZoomPanel />}
      </div>
    </div>
  );
}

export default App;
