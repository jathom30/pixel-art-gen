
import React from 'react';
import { Artboard, BrushPanel, EraserPanel, FillPanel, ToolSelection } from 'components';
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
        {tool === 'fill' && <FillPanel />}
        {tool === 'brush' && <BrushPanel />}
        {tool === 'eraser' && <EraserPanel />}
      </div>
    </div>
  );
}

export default App;
